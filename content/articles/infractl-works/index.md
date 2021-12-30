---
title: InfraCTL is Generally Available!
date: 2019-09-25T16:59:36+01:00
updated: 2019-09-25T16:59:36+01:00
excerpt: A supra-cloud CLI for nodes, layer 2/layer 3 overlay networks and Kubernetes clusters
header: ./static/header.jpg
headerAlt: |
  "In the line of fire" by Christopher Burns on Unsplash
keywords:
  - infra
  - devops
  - multi-cloud
  - tooling
draft: false
---

After many, many hours spend on nightly development sessions, I am proud to present a first working version of InfraCTL, the supra-cloud node, overlay network and Kubernetes cluster CLI!

> Get [InfraCTl on GitHub](https://pojntfx.github.io/infractl/)!

Now, what does InfraCTL do exactly?

```bash
[pojntfx@thinkpadx1c3 ~]$ infractl
Usage: infractl [options] [command]

A CLI to manage supra-cloud SSH keys, nodes, WireGuard (OSI Layer 3)/N2N (OSI Layer 2) overlay networks and Kubernetes clusters.

Options:
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  apply|a        Create or update resources
  get|g          Get resources
  delete|d       Delete resources
  help [cmd]     display help for [cmd]
```

The output above contains a description: As I pointed out before, InfraCTL has the goal of being the supra-cloud node, overlay network and Kubernetes cluster CLI - that means that no client-side tool other than InfraCTL should be necessary to go from zero to fully functional Kubernetes cluster.

But first, the terminology:

- `Node`: A node is either a virtual private server/VPS or a bare-metal host.
- `Private Network Cluster`: A umbrella term for the peer-to-peer VPNs used which create overlay networks.
- `Workload Cluster`: A umbrella term for the Kubernetes cluster; maybe it will support more distros than `k3s` one day or even another orchestrator.

Let's look at the `apply` sub-commands:

```bash
[pojntfx@thinkpadx1c3 ~]$ infractl apply
Usage: infractl-apply [options] [command]

Options:
  -h, --help                                    output usage information

Commands:
  contexts|context                              Create or update context(s)
  keys|key                                      Create or update key(s)
  nodes|node                                    Create or update node(s)
  privatenetworkclusters|privatenetworkcluster  Create or update private network cluster(s)
  workloadclusters|workloadcluster              Create or update workload cluster(s)
  help [cmd]                                    display help for [cmd]
```

As you can see, InfraCTL is quite similar to `kubectl` - there are simple, declarative models which you can `apply`, `get` and `delete`. Let's go over these models one by one.

## Manage Nodes

As you can probably think, because InfraCTL connects to Hetzner Cloud, at first a context needs to be set up containing the Hetzner Cloud credentials. If you already have some servers set up, feel free to skip the following steps; everything that uses ID prefixes (like `H-`) is bound to a particular provider. As of today, only Hetzner Cloud is supported, but InfraCTL has been developed in such a way that adding more providers is not much work, so in the future, more providers - such as the Cluster Platform - can be added easily.

```bash
[pojntfx@thinkpadx1c3 ~]$ infractl apply context
Usage: infractl-apply-contexts [options]

Options:
  -h, --hetzner-endpoint <endpoint>  Hetzner's endpoint (i.e. https://api.hetzner.cloud/v1)
  -H, --hetzner-token <token>        Hetzner's token (i.e. jEheVytlAoFl7F8MqUQ7jAo2hOXASztX)
  -h, --help                         output usage information
[pojntfx@thinkpadx1c3 ~]$ infractl apply context -h https://api.hetzner.cloud/v1 -H jEheVytlAoFl7F8MqUQ7jAo2hOXASztX
# (...)
```

Once you've set up the context, you can upload your public SSH key:

> Don't forget to specify "H-"!

```bash
[pojntfx@thinkpadx1c3 ~]$ infractl apply key
Usage: infractl-apply-keys [options] <id|"H-">

Options:
  -n, --key-name <name>  Key's name (i.e. user@ip-1)
  -f, --key-file [path]  Key's path (i.e. ~/.ssh/id_rsa.pub) (cannot be updated)
  -h, --help             output usage information
[pojntfx@thinkpadx1c3 ~]$ infractl apply key -n pojntfx@thinkpadx1c3.pojtinger.space -f ~/.ssh/id_rsa.pub H-
# (...)
```

Now, let's create a node. But first, we need to take a look at the location, type and OS we want to use! The `infractl get` commands are useful for that.

```bash
[pojntfx@thinkpadx1c3 ~]$ infractl get
Usage: infractl-get [options] [command]

Options:
  -h, --help                                              output usage information

Commands:
  keys|key                                                Get key(s)
  locations|location                                      Get location(s)
  types|type                                              Get types(s)
  oses|os                                                 Get OS(es)
  nodes|node                                              Get node(s)
  privatenetworkclustertokens|privatenetworkclustertoken  Get private network cluster token
  privatenetworkclusternodes|privatenetworkclusternode    Get private network cluster nodes(s)
  workloadclustertokens|workloadclustertoken              Get workload cluster token
  workloadclusterconfigs|workloadclusterconfig            Get workload cluster config
  help [cmd]                                              display help for [cmd]
```

```bash
[pojntfx@thinkpadx1c3 ~]$ infractl get location
| ID  | NAME | LATITUDE  | LONGITUDE |
| --- | ---- | --------- | --------- |
| H-1 | fsn1 | 50.47612  | 12.370071 |
| H-2 | nbg1 | 49.452102 | 11.076665 |
| H-3 | hel1 | 60.169855 | 24.938379 |
```

You can get more information on a location as well as most other models by specifying an ID:

```bash
[pojntfx@thinkpadx1c3 ~]$ infractl get location H-3
id: H-3
name: hel1
latitude: 60.169855
longitude: 24.938379
description: Helsinki DC Park 1, Helsinki, FI

```

Well, let's use the Helsinki datacenter, which has got the ID `H-3`. Next, get a list of all types:

```bash
[pojntfx@thinkpadx1c3 ~]$ infractl get type
| ID   | NAME  | HOURLY-PRICE | MONTHLY-PRICE |
| ---- | ----- | ------------ | ------------- |
| H-1  | cx11  | 0.0048 €     | 2.9631 €      |
| H-3  | cx21  | 0.0095 €     | 5.831 €       |
| H-5  | cx31  | 0.0167 €     | 10.591 €      |
# (...)
```

As you can see, multiple types with varying prices are available. The cheapest one has the following specs:

```bash
[pojntfx@thinkpadx1c3 ~]$ infractl get type H-1
id: H-1
name: cx11
prices:
  hourly: 0.0048 €
  monthly: 2.9631 €
description: CX11
cores: 1
memory: 2 GB
disk: 20 GB

```

This is perfect for our cluster! We are going to use the `H-1` type. Now to the last parameter: the OS. There are multiple OSes available to choose from:

```bash
[pojntfx@thinkpadx1c3 ~]$ infractl get os
| ID        | NAME         |
| --------- | ------------ |
| H-1       | ubuntu-16.04 |
| H-2       | debian-9     |
| H-3       | centos-7     |
| H-168855  | ubuntu-18.04 |
| H-5594052 | fedora-30    |
| H-5924233 | debian-10    |
```

InfraCTL currently supports Ubuntu 18.04 and CentOS 7; in case you are using something like a minimal `busybox`-based distro, such a system only works as a compute node and might have networking or storage problems. We are going to use Ubuntu 18.04 in this case, so the ID `H-168855` is the one we can use.

> The restriction on these OSes is due to the reliance on some RPM/DEB packages. While all base components (private network cluster and workload cluster) are universal ELF binaries, things like the storage cluster are not.

Before we can get going, let's take a look at the SSH key we uploaded before and note down it's ID:

```bash
[pojntfx@thinkpadx1c3 ~]$ infractl get key
| ID        | NAME                                 | FINGERPRINT                                     |
| --------- | ------------------------------------ | ----------------------------------------------- |
| H-1040850 | pojntfx@thinkpadx1c3.pojtinger.space | 33:42:a8:d5:d1:69:63:84:56:4b:e0:92:45:d6:5d:e0 |
# (...)
```

In my case, that is `H-1040850`.

Now that we've gathered all information, we can continue with the node creation:

```bash
[pojntfx@thinkpadx1c3 ~]$ infractl apply node
Usage: infractl-apply-nodes [options] [id]

Options:
  -n, --node-name <name>    Node's name (i.e. node-1)
  -k, --node-key [id]       Node's key (cannot be updated)
  -l, --node-location [id]  Node's location (cannot be updated)
  -t, --node-type [id]      Node's type (cannot be updated)
  -o, --node-os [id]        Node's OS (cannot be updated)
  -h, --help                output usage information
```

Specify the parameters:

```bash
[pojntfx@thinkpadx1c3 ~]$ infractl apply node -n node-1 -k H-1040850 -l H-3 -t H-1 -o H-168855
1569333071691 [DATA] Successfully applied node:
id: H-3339515
name: node-1
ips:
  public: 95.216.215.197
location: H-3
type: H-1
os: H-168855

...................................................................................... pojntfx@thinkpadx1c3.pojtinger.space
```

And there we go, you've created your first node! Let's create two more:

```bash
[pojntfx@thinkpadx1c3 ~]$ infractl apply node -n node-2 -k H-1040850 -l H-3 -t H-1 -o H-168855
# (...)
[pojntfx@thinkpadx1c3 ~]$ infractl apply node -n node-3 -k H-1040850 -l H-3 -t H-1 -o H-168855
# (...)
[pojntfx@thinkpadx1c3 ~]$ infractl get node
| ID        | NAME   | PUBLIC-IP      | LOCATION | TYPE | OS        |
| --------- | ------ | -------------- | -------- | ---- | --------- |
| H-3339515 | node-1 | 95.216.215.197 | H-3      | H-1  | H-168855 |
| H-3339517 | node-2 | 95.217.15.29   | H-3      | H-1  | H-168855 |
| H-3339518 | node-3 | 95.217.15.31   | H-3      | H-1  | H-168855 |
```

Those should be all nodes for the cluster. Note the `PUBLIC-IP` column, which shows the IP addresses of the nodes we'll use in the following.

> If you already have your own servers and you decided to skip the steps above, continue here!

Before we can access the nodes, we first have to start the SSH agent so that InfraCTL can securely access your SSH private key in memory:

```bash
[pojntfx@thinkpadx1c3 ~]$ eval $(ssh-agent)
Agent pid 27281
```

Now we need to add the corresponding private SSH key of the public SSH key you used above to the agent; you might have to set up a passphrase:

```bash
[pojntfx@thinkpadx1c3 ~]$ ssh-add ~/.ssh/id_rsa
Enter passphrase for /home/pojntfx/.ssh/id_rsa:
Identity added: /home/pojntfx/.ssh/id_rsa (pojntfx@thinkpadx1c3.pojtinger.space)
```

And there you go, you can now login to the nodes with `root@${IP}`!

## Manage Private Network Clusters (PNCs)

There are two types of private network clusters, or PNCs for short, available. We are going to deploy both clusters here on all of the nodes; in the process of doing so, you'll see how the `private-ip/public-ip` syntax works and why it exists. I also recommend you do this; it's another layer of security and comfort if you use both PNCs.

### Type 2 (N2N)

> This PNC is based on the [N2N VPN](https://github.com/ntop/n2n).

So, let's take a look at how to deploy the first PNC:

```bash
[pojntfx@thinkpadx1c3 ~]$ infractl apply privatenetworkcluster
Usage: infractl-apply-privatenetworkclusters [options] <user@manager-node-ip|user@manager-node-public-ip/manager-node-private-ip|manager-node-ip> [user@worker-node-ip|user@worker-node-public-ip/worker-node-private-ip] [otherWorkerNodes...] [$(whoami)@$(hostname)|$(whoami)@$(hostname)/node-private-ip]

Options:
  -t, --private-network-cluster-type [2|3]  Private network clusters' type (OSI layer) (by default 3)
  -k, --token [token]                       Private network cluster's token (if specified, provide just the manager node's ip without the it's user, but specify the worker nodes' users)
  -h, --help                                output usage information
```

As you can see, this action is quite a bit more complicated to use than the former ones. This is due to the `private-ip/public-ip` syntax - while it is a bit more complex, it allows for the installation of one PNC over another PNC as well as an installation that does not require the local node to be modified, which is very useful in our case.

The two types which are a available are `2` and `3`. The types correspond to the [OSI layer 2](https://en.wikipedia.org/wiki/Data_link_layer)/[OSI layer 3](https://en.wikipedia.org/wiki/Network_layer); type 2 is significantly slower than type 3 but supports Ethernet-level traffic, like for example many old LAN-based games require. Using either of the PNCs allows for the cluster to deployed across everything from one or many public clouds to private cloud behind NAT (they can't ping one another directly) using NAT hole punching. The type 2 PNC is considerably better at the latter use case, while the type 3 PNC is much, much faster.

So, first we'll deploy the type 2 PNC manager; you may also simply specify the worker nodes as well, but for demonstration purposes we'll not do this:

```bash
[pojntfx@thinkpadx1c3 ~]$ infractl apply privatenetworkcluster -t 2 root@95.216.215.197
1569335003254 [INFO] Creating provided public network cluster node data model ........ pojntfx@thinkpadx1c3.pojtinger.space
# (...)
1569335034276 [DATA] Successfully applied private network clusters' variables:
managerNode:
  access:
    public: root@95.216.215.197
    private: root@192.168.1.1
token: 5Ll8MrdkpElxAp6ExcFIHHyxnj30w2xYVm0IxBloykQ=

...................................................................................... pojntfx@thinkpadx1c3.pojtinger.space
```

Note that you can get the token for the worker nodes later on as well with the following command:

```bash
[pojntfx@thinkpadx1c3 ~]$ infractl get privatenetworkclustertoken -t 2 root@95.216.215.197
5Ll8MrdkpElxAp6ExcFIHHyxnj30w2xYVm0IxBloykQ=
```

If we take a look at the nodes in the PNC, not much can be found right now:

```bash
[pojntfx@thinkpadx1c3 ~]$ infractl get privatenetworkclusternodes -t 2 root@95.216.215.197
| ID                                | NAME   | PRIVATE-IP  |
| --------------------------------- | ------ | ----------- |
| not_available_manually_configured | node-1 | 192.168.1.1 |
```

So let's add the other nodes as worker nodes to the PNC, which may take some time:

```bash
[pojntfx@thinkpadx1c3 ~]$ infractl apply privatenetworkcluster -t 2 -k 5Ll8MrdkpElxAp6ExcFIHHyxnj30w2xYVm0IxBloykQ= 95.216.215.197 root@95.217.15.29 root@95.217.15.31
1569335183645 [INFO] Creating provided public network cluster node data model ........ pojntfx@thinkpadx1c3.pojtinger.space
# (...)
1569335229530 [DATA] Successfully applied private network clusters' variables:
managerNode:
  ips:
    public: 95.216.215.197
token: 5Ll8MrdkpElxAp6ExcFIHHyxnj30w2xYVm0IxBloykQ=

...................................................................................... pojntfx@thinkpadx1c3.pojtinger.space
```

You may re-run this command at any time to add more nodes to the PNC.

Let's take another look at the nodes in it:

```bash
[pojntfx@thinkpadx1c3 ~]$ infractl get privatenetworkclusternodes -t 2 root@95.216.215.197
| ID                                | NAME   | PRIVATE-IP   |
| --------------------------------- | ------ | ------------ |
| not_available_manually_configured | node-1 | 192.168.1.1  |
| 02:f8:7f:19:53:f5                 | node-2 | 192.168.1.10 |
| 02:bd:22:72:bb:0e                 | node-3 | 192.168.1.11 |
```

As you can see, the nodes have been added to the PNC. The local node has not been modified; you can't ping the nodes from it:

```bash
[pojntfx@thinkpadx1c3 ~]$ ping -c 1 192.168.1.10
PING 192.168.1.10 (192.168.1.10) 56(84) bytes of data.
^C
--- 192.168.1.10 ping statistics ---
1 packets transmitted, 0 received, 100% packet loss, time 0ms

```

This is why the `private-ip/public-ip` syntax exists! It will allow us to install the type 3 PNC without modifying the host. In our use case, we will set up the manager and worker nodes in one command; you may however use the step-by-step procedure as shown above as well.

In the following setup, we let the type 3 worker nodes _connect_ to the type 3 manager node using the type 2 PNC to support a NAT-ed configuration (the nodes can't ping each other without the type 2 PNC), but the _traffic_ between the type 3 nodes themselves _does not go through the type 2 PNC_, which improves the PNC's speed. If you want to route all type 3 PNC traffic over the type 2 PNC, simply specify the private IPs of the worker nodes that you got from above with the `private-ip/public-ip` syntax.

If you want to also install the type 2 PNC on the local node, just add `$(whoami)@$(hostname)` or `$(whoami)@$(hostname)/node-private-ip` to the `apply` command above.

### Type 3

> This PNC is based on the [WireGuard VPN](https://www.wireguard.com/).

So let's deploy the type 3 PNC:

```bash
[pojntfx@thinkpadx1c3 ~]$ infractl apply privatenetworkcluster -t 3 root@95.216.215.197/192.168.1.1 root@95.217.15.29 root@95.217.15.31
1569335765321 [INFO] Creating provided public network cluster node data model ........ pojntfx@thinkpadx1c3.pojtinger.space
# (...)
1569335879278 [DATA] Successfully applied private network clusters' variables:
managerNode:
  access:
    public: root@95.216.215.197
    private: root@10.224.183.211
token: uCPxiqIfcOuwmWuHfhYMz/EalX2PBSR2jYHwEEEd20E=

...................................................................................... pojntfx@thinkpadx1c3.pojtinger.space
```

Now, you may take a look at the type 3 PNC nodes (and token, see the commands above, but don't forget to change `-t 2` to `-t 3`):

```bash
[pojntfx@thinkpadx1c3 ~]$ infractl get privatenetworkclusternodes -t 3 root@95.216.215.197
| ID                                           | NAME   | PRIVATE-IP     | PUBLIC-IP      |
| -------------------------------------------- | ------ | -------------- | -------------- |
| not_available_this_is_the_query_node         | node-1 | 10.224.183.211 | 95.216.215.197 |
| mJabtIp6AVRjP2Z9ZDxtACRhIp4PQxueZi+7NNZOjWw= | node-3 | 10.224.186.73  | 95.217.15.31   |
| 0WSF78kJy64do0T0W93eNVb8Mtt96kPlnh6w2HL/2TM= | node-2 | 10.224.185.14  | 95.217.15.29   |
```

That works! And again, because no changes have been made to the local node, you can't ping the nodes on their private IPs. If want to do that, follow the instructions from the type 2 PNC above.

## Manage Workload Clusters (WLCs)

> The WLC is based on the [k3s Kubernetes distribution](https://k3s.io/).

Now, let's get to deploying the actual workload cluster!

```bash
[pojntfx@thinkpadx1c3 ~]$ infractl apply workloadcluster
Usage: infractl-apply-workloadclusters [options] <user@manager-node-ip|user@manager-node-public-ip/manager-node-private-ip|manager-node-ip> [user@worker-node-ip] [otherWorkerNodes...] [$(whoami)@$(hostname)]

Options:
  -e, --lets-encrypt-certificate-issuers-email [email]                                                                        Let's Encrypt certificate issuers' email for certificates (i.e. user@host.tld) (by default the issuers won't be deployed)
  -s, --slow-storage-size [size-in-gb]                                                                                        Slow storage's size (by default 10 gigabyte, this can be resized later on) (do not specify unit, it is always gigabyte) (this enables Read-Write-Many PVCs)
  -b, --backup-s3-endpoint [endpoint]                                                                                         Backup S3-compatible backend's endpoint (i.e. http://95.217.11.207:9000) (by default the backup system configuration won't be deployed)
  -B, --backup-s3-bucket [endpoint]                                                                                           Backup S3-compatible backend's bucket (i.e. backup-1) (by default the backup system configuration won't be deployed)
  -a, --backup-s3-access-key [access-key]                                                                                     Backup S3-compatible backend's access key (i.e. minio) (by default the backup system configuration won't be deployed)
  -A, --backup-s3-secret-key [secret-key]                                                                                     Backup S3-compatible backend's secret key (i.e. minio123) (by default the backup system configuration won't be deployed)
  -p, --backup-encryption-password [password]                                                                                 Backup's encryption password to access and restore backups (by default the backup system configuration won't be deployed)
  -m, --additional-manager-node-ip [ip]                                                                                       Additional manager node's IP for the workload cluster config (i.e. 192.168.178.141) (by default the target IP will be used, which might only be reachable from within the private network cluster depending on your setup)
  -t, --private-network-cluster-type [2|3]                                                                                    Private network clusters' type (OSI layer) (by default 3)
  -k, --token [token]                                                                                                         Workload cluster's token (if specified, provide just the manager node's ip without the it's user, but specify the worker nodes' users)
  -a, --apply [monitoring,tracing,error-tracking]                                                                             Comma-seperated list of components which are not applied by default to apply
  -d, --dont-apply [fast-storage,ingress-controller,certificate-manager,slow-storage,backup-system,virtual-machines,metrics]  Comma-seperated list of components which are applied by default to not apply
  -h, --help                                                                                                                  output usage information
```

As you can see, there are a lot of options here, and the `private-ip/public-ip` syntax exists as well, though it is only necessary for the manager node, as the rest will be configured automatically.

There are quite some options for the `apply workloadcluster` option; let's go over them one-by-one.

- `-e`: If selected, this sets up [Let's Encrypt](https://letsencrypt.org/) for _automatic_ HTTPS.
- `-s`: This specifies the size for slow storage. Ther are two types of storage available in the workload cluster: fast and slow. Fast storage can only be attached to one node at a time, slow storage can be attached to multiple nodes at once. Think of slow storage as a "partition" on fast storage that can be shared across nodes.
- `-b`: The S3-compatible endpoint to back PVCs up to.
- `-B`: The S3-compatible endpoint's bucket.
- `-a`: The S3-compatible endpoint's access key.
- `-A`: The S3-compatible endpoint's secret key.
- `-p`: The backup encryption password; keep this, if you loose it you won't be able to restore your backups.
- `-m`: Here you may specify another IP address than the one you set for the master, which is useful for accessing the cluster outside of the PNCs (we'll use this option).
- `-t`: Here you can set the PNC to use for the workload cluster. We'll use the fast type 3 PNC for this - if you use the type 2 PNC, be sure to use the correct `private-ip` for the manager.
- `-a`: Here you can choose which additional components you want to deploy, such as `monitoring` ([Prometheus](https://prometheus.io/)), `tracing` ([Jaeger](https://www.jaegertracing.io/)) and `error-tracking` ([Sentry](https://sentry.io/)).
- `-d`: Here you can un-select components installed by default, such as the capability to run [KubeVirt-based](https://kubevirt.io/) virtual machines or the [OpenEBS-based](https://www.openebs.io/) storage cluster.

Now, you can also deploy the manager and workers nodes in one command, but for demonstration purposes we'll deploy them one-by-one; so let's get started with the manager node and add the worker nodes later!

```bash
[pojntfx@thinkpadx1c3 ~]$ infractl apply workloadcluster root@95.216.215.197/10.224.183.211 -m 95.216.215.197 -t 3
1569336943917 [INFO] Creating provided network cluster node data model ............... pojntfx@thinkpadx1c3.pojtinger.space
# (...)
1569337138926 [DATA] Successfully applied workload clusters' variables:
managerNode:
  access:
    public: root@95.216.215.197
    private: 10.224.183.211
token: K10c1f320e840235610f896259b4448ea2d5b61ac1ea5fd8193e5b4a10141cb3619::node:6060bd88c1901bdf2d73a15e58985205

...................................................................................... pojntfx@thinkpadx1c3.pojtinger.space
1569337138932 [DATA] Successfully applied workload cluster's config:
apiVersion: v1
# (...)

...................................................................................... pojntfx@thinkpadx1c3.pojtinger.space
```

If you want to, you can now copy and paste the contents of the workload cluster config (kubeconfig) file from above into `~/.kube/config` (you might need to create the `~/.kube` directory first), but this is not necessary to join the remaining worker nodes. If you want to to that right now however, your Kubernetes nodes should look like this (from `kubectl get nodes`):

```bash
[pojntfx@thinkpadx1c3 ~]$ kubectl get node
NAME     STATUS   ROLES    AGE    VERSION
node-1   Ready    master   119s   v1.15.3-k3s.1
```

If you don't plan on adding any more nodes to the workload cluster, feel free to skip the following section.

In order to join the worker nodes into the workload cluster, you can either copy and paste the token from above, or get it at any time with the following command:

```bash
[pojntfx@thinkpadx1c3 ~]$ infractl get workloadclustertoken root@95.216.215.197
K10c1f320e840235610f896259b4448ea2d5b61ac1ea5fd8193e5b4a10141cb3619::node:6060bd88c1901bdf2d73a15e58985205
```

Now, join the rest of the nodes as worker nodes into the cluster (depending on the PNC you chose the manager's IP might be different):

```bash
[pojntfx@thinkpadx1c3 ~]$ infractl apply workloadcluster -t 3 -k K10c1f320e840235610f896259b4448ea2d5b61ac1ea5fd8193e5b4a10141cb3619::node:6060bd88c1901bdf2d73a15e58985205 10.224.183.211 root@95.217.15.29 root@95.217.15.31
1569337601368 [INFO] Creating provided network cluster node data model ............... pojntfx@thinkpadx1c3.pojtinger.space
# (...)
1569337797818 [DATA] Successfully applied workload clusters' variables:
managerNode:
  ips:
    public: 10.224.183.211
token: K10c1f320e840235610f896259b4448ea2d5b61ac1ea5fd8193e5b4a10141cb3619::node:6060bd88c1901bdf2d73a15e58985205

...................................................................................... pojntfx@thinkpadx1c3.pojtinger.space
```

And there we go! Now you can copy and paste the workload cluster config (kubeconfig) as described above or get it again with the following command:

```bash
[pojntfx@thinkpadx1c3 ~]$ infractl get workloadclusterconfig root@95.216.215.197
apiVersion: v1
# (...)
```

Once you've set this up, check if the worker nodes have been added successfully:

```bash
[pojntfx@thinkpadx1c3 ~]$ kubectl get node -o wide
NAME     STATUS   ROLES    AGE   VERSION         INTERNAL-IP    EXTERNAL-IP   OS-IMAGE             KERNEL-VERSION      CONTAINER-RUNTIME
node-2   Ready    worker   18m   v1.15.3-k3s.1   192.168.1.10   <none>        Ubuntu 18.04.3 LTS   4.15.0-64-generic   containerd://1.2.8-k3s.1
node-1   Ready    master   18m   v1.15.3-k3s.1   192.168.1.1    <none>        Ubuntu 18.04.3 LTS   4.15.0-64-generic   containerd://1.2.8-k3s.1
node-3   Ready    worker   18m   v1.15.3-k3s.1   192.168.1.11   <none>        Ubuntu 18.04.3 LTS   4.15.0-64-generic   containerd://1.2.8-k3s.1
```

Take a look the `INTERNAL-IP` column; the type 3 PNC is being used successfully!

Before you can get started, you might have to wait a bit until all the pods for the sub-systems (storage cluster etc.) have started, which can take some time depending on the nodes' internet connection (and might look different on your system, depending on the components you've installed):

```bash
[pojntfx@thinkpadx1c3 ~]$ kubectl get pod -A
NAMESPACE     NAME                                             READY   STATUS      RESTARTS   AGE
kube-system   coredns-55c55bb5db-8mtgw                         1/1     Running     0          14m
kubevirt      virt-handler-49kvm                               1/1     Running     0          14m
kubevirt      virt-controller-564dc766f5-jkmh5                 1/1     Running     0          14m
# (...)
```

And there you go! You can now join more nodes into the PNCs and/or the WLCs with the commands shown above - or just enjoy your Kubernetes cluster!

And in case you find any problems, feel free to add an issue and/or contribute: [InfraCTl is free/libre and open source software on GitHub](https://pojntfx.github.io/infractl/)!
