---
title: A Look at the Cluster Platform Layer 2 Overlay Network System
date: 2020-01-13T17:01:23+01:00
updated: 2020-01-13T17:01:23+01:00
excerpt: Let's bring back networking simplicity!
header: ./static/header.jpg
headerAlt: |
  "Unifi 16XG switch in homelab rack" by Thomas Jensen on Unsplash
draft: false
---

## Introduction

In the ongoing effort to write Cluster Platform, the lean distributed computing system, I hit a challenge: networking.

The Cluster Platform has some really unique networking requirements. As a distributed system it has to be able to work both completely off-grid, accross globally distributed datacenters and low-power IoT devices. Ultimately, the Cluster Platform should be able to serve as a replacement for the internet, while at the same time being able to run on it.

Furthermore, as it is the case with the internet itself, decentralization is necessary for both speed and security. One datacenter of a Cluster Platform cluster might be connected to another datacenter over a low-bandwidth OpenSNET link but has a 10G link internally; it would be awesome if the high internal speed could be leveraged while not breaking inter-datacenter networking, which is only possible with a decentral system.

Additionally, the networking stack must be implemented as a "cloud-native" microservice system. This is the case, amongst many other reasons, due to the fact that datacenters must be able to be administered remotely. Off-grid parts of a Cluster Platform cluster could be lights off for multiple months; there must be no single point of failure, neither for the cluster as a collective, nor for the node as an individual.

Alright, so how have I solved this problem? Let's take a look at [`gon2n`](https://pojntfx.github.io/gon2n/) and [`go-isc-dhcp`](https://pojntfx.github.io/go-isc-dhcp/), two systems based on the n2n VPN and the ISC DHCP server and client!

Using these two services, it is possible to create decentralized high-speed P2P OSI layer 2 overlay networks, spanning everything from multiple cloud hosts in multiple datacenters around the globe to your home network. Furthermore it is possible for a node (called "edge" from now on) to join many different overlay networks; for example, if you want to run a Minecraft server on one of your cloud hosts and play a game with some of your friends, you can simply add another network just for you and your peers _without_ giving them access to your production CI/CD system.

Within each overlay network (called "community" from now on), all edges talk in a peer-to-peer fashion with strong AES256 encryption. Each community can be thought of as an ethernet switch; there is full DHCP and broad/multicast support. A central "supernode" allows for the edges which can't talk P2P (if for example NAT hole punching doesn't work) to still communicate with the other edges; however, due to the fact that the edges can route traffic through the network like relays, such cases due rarely occur.

## Architecture

As I've lined out before, this entire system is architected in such a way that there are remote management capabilities. This is achieved by splitting each subsystem into a client-server architecture; this way, one has to only deploy the gRPC server (daemon) to the host which should have the subsystem's capabilities, but can manage it remotely from a management machine using the client CLIs. PWA management UIs are also planned for the future.

## Infrastructure

For the following, I will use three cloud which I'll be administering them from my laptop. The first cloud host is the only one that technically needs to be publically reachable; it will host the supernode daemon. For the sake of simplicity, I will also deploy a DHCP server daemon and a corresponding edge daemon on it, but the latter could technically run on any edge. The other two hosts will both run an edge and a DHCP client daemon.

## Building the Binaries

Because there is currently no CI/CD system set up, you will have to build the binaries yourself for now. But no worries; everything is written in Go, so this process should be simple enough.

Let's start with `gon2n`:

```zsh
% git clone https://github.com/pojntfx/gon2n.git
% cd gon2n
% go generate ./...
% go build -o supernoded cmd/supernoded/main.go
% go build -o edged cmd/edged/main.go
% go build -o supernodectl cmd/supernodectl/main.go
% go build -o edgectl cmd/edgectl/main.go
```

Now, let's do the same for `go-isc-dhcp`:

```zsh
% git clone https://github.com/pojntfx/go-isc-dhcp.git
% cd go-isc-dhcp
% go generate ./...
% go build -o dhcpdd cmd/dhcpdd/main.go
% go build -o dhclientd cmd/dhclientd/main.go
% go build -o dhcpdctl cmd/dhcpdctl/main.go
% go build -o dhclientctl cmd/dhclientctl/main.go
```

## Distributing the Daemons

Let's distribute the daemons you've just built. To do so, let's utilize `scp`; be sure to use your own hostnames:

```zsh
# For the first host
% scp gon2n/supernoded gon2n/edged go-isc-dhcp/dhcpd root@host-1:/usr/local/sbin
# Repeat the following for the remaining hosts
% scp gon2n/edged go-isc-dhcp/dhclientd root@host-1:/usr/local/sbin
```

That's it!

## Installing the Clients

```zsh
% sudo install gon2n/supernodectl gon2n/edgectl go-isc-dhcp/dhcpdctl go-isc-dhcp/dhclientctl /usr/local/bin
```

> Editors note: Single binaries are awesome.

## Daemon Setup for the First Host

All daemons (and clients) can be configured via either environment variables, command line flags, configuration files or a combination of the three. For this demonstration, I'll be using the third option; configuration files.

First, let's save the following configuration files on the first host; be sure to use your own hostnames and open up the ports on the firewall:

```yaml
# /etc/supernoded.yaml
supernoded:
  listenHostPort: host-1:1236
```

```yaml
# /etc/edged.yaml
edged:
  listenHostPort: host-1:1235
```

```yaml
# /etc/dhcpdd.yaml
dhcpdd:
  listenHostPort: host-1:1240
```

That's all the server-side setup you need; all of the rest will be done client-side.

Let's start the daemons (on the first host):

```zsh
% supernoded -f /etc/supernoded.yaml
# In another terminal
% sudo edged -f /etc/edged.yaml # This needs to manage TUN/TAP interfaces, so CAP_NET_ADMIN is required
# In another terminal
% sudo dhcpdd -f /etc/dhcpdd.yaml # This needs to bind to port 67, so root priviledges are required
```

## Daemon Setup for the Remaining Hosts

First, let's save the following configuration files on the remaining hosts; be sure to use your own hostnames and open up the ports on the firewall:

```yaml
# /etc/edged.yaml
edged:
  listenHostPort: host-n:1235
```

```yaml
# /etc/dhclientd.yaml
dhclientd:
  listenHostPort: host-n:1241
```

That's all the server-side setup you need; all of the rest will be done client-side.

Let's start the daemons (on the remaining hosts):

```zsh
% sudo edged -f /etc/edged.yaml # This needs to manage TUN/TAP interfaces, so CAP_NET_ADMIN is required
# In another terminal
% sudo dhclientd -f /etc/dhclientd.yaml # This needs to manage network interfaces, so CAP_NET_ADMIN is required
```

## Configuring the Daemons

As I've outlined before, almost all configuration is done with the client CLIs, so now that the clients are installed and the daemons are running, let's go ahead!

First, create the following configuration files (be sure to use your own hostnames, unique MAC addresses and open up the ports on the firewall):

```yaml
# supernode.yaml
supernode:
  listenPort: 1234
  managementPort: 5645
```

```yaml
# edge-host-1.yaml
edge:
  allowP2P: true
  allowRouting: true
  communityName: mynetwork
  disablePMTUDiscovery: false
  disableMulticast: false
  dynamicIPMode: false
  encryptionKey: mysecretkey
  localPort: 0
  managementPort: 5644
  registerInterval: 1
  registerTTL: 1
  supernodeHostPort: host-1:1234
  typeOfService: 16
  encryptionMethod: 2
  deviceName: edge0
  addressMode: static
  deviceIP: 192.168.1.1
  deviceNetmask: 255.255.255.0
  deviceMACAddress: DE:AD:BE:EF:01:10
  MTU: 1500
```

```yaml
# edge-host-n.yaml
edge:
  allowP2P: true
  allowRouting: true
  communityName: mynetwork
  disablePMTUDiscovery: false
  disableMulticast: false
  dynamicIPMode: true
  encryptionKey: mysecretkey
  localPort: 0
  managementPort: 5645
  registerInterval: 1
  registerTTL: 1
  supernodeHostPort: host-1:1234
  typeOfService: 16
  encryptionMethod: 2
  deviceName: edge0
  addressMode: dhcp
  deviceIP: 0.0.0.0
  deviceNetmask: 255.255.255.0
  deviceMACAddress: DE:AD:BE:EF:01:11
  MTU: 1500
```

```yaml
# dhcpd.yaml
dhcpd:
  device: edge0
  subnets:
    - netmask: 255.255.255.0
      network: 192.168.1.0
      range:
        start: 192.168.1.10
        end: 192.168.1.100
```

```yaml
# dhclient.yaml
dhclient:
  device: edge0
```

Pretty simple, right? These configuration files can be thought of as "Kubernetes objects"; in the next step we'll `apply` them:

```zsh
# For the first host
% supernodectl -s host-1:1236 -f supernode.yaml
% edgectlctl -s host-1:1235 -f edge-host-1.yaml
% dhcpdctl -s host-1:1240 -f dhcpd.yaml
# Repeat the following for the remaining hosts
% edgectlctl -s host-n:1235 -f edge-host-n.yaml
% dhclientctl -s host-n:1241 -f dhclient.yaml
```

You may now `get` and `delete` them as well, please see the `gon2n` and `go-isc-dhcp` documentation for usage instructions or just try it out:

```zsh
% supernodectl get -s host-1:1236
ID                                      LISTEN PORT
915adb75-73f0-41e3-81ae-caa238c329ef    1234
```

That's it! You've got a fully functional peer-to-peer OSI layer 2 overlay network with speed of up to 500 megabytes/second (or more; this is limited only by the encryption speed).

## Conclusion

Both the `gon2n` and `go-isc-dhcp` projects will serve as a fundamental part of the future Cluster Platform. But even right now they are useful, and if you want a really fast layer 2 VPN, feel free to use these components; they are free/libre and open source software!
