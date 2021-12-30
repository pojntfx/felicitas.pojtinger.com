---
title: Sane Categories for Software Distribution Systems
date: 2019-09-14T16:57:26+01:00
updated: 2019-09-14T16:57:26+01:00
excerpt: Why are these systems so hard to set up?
header: ./static/header.jpg
headerAlt: |
  "Cable Network" by Taylor Vick on Unsplash
keywords:
  - categorization
  - clusterplatform
draft: false
---

So I tried to set up a homelab. This has been a thing that I wanted to do for a long time now; I've got some older `VT-d` capable `x86_64` laptops and desktops laying around at home gathering dust. This even includes my trusty and quite powerful former gaming PC which could serve as a useful compute node. In addition to that, my cloud computing costs have skyrocketed over the last few months, rising ~10 € per month up to nearly 40 € last month. As a student, I simply couldn't afford using this system from that point onwards.

So, a homelab needed to be built then. But how - and how did I get it on to the public internet? This is not actually what this post is going to be about, although I'll be sure to write about in the future. This post is going to about _how_ such a homelab or any modern cloud should be deployed in a sane system - such as the [Cluster Platform (CTPF)](https://clusterplatform.github.io/clusterplatform/packages/provisioner/).

Currently, the CTPF is incredibly complicated to set up; in order to develop for the CTPF or to deploy it, and then create a cloud with it, an actual cloud is necessary beforehand. This makes for an interesting paradox, as the very reason for me to deploy a homelab is to get rid of that cloud, yet the only way for me to work on the software to develop it is to use one. How does one solve this? Categories of course!

Categorical thinking is of course not without it's problems, mostly when the categories don't really serve any purpose anymore but rather are an unnecessary construct that hold us back (gender, for example). In this context however, categories can really serve as a simple way of knowing which parts of the CTPF need to be deployed in what way and, more importantly, where.

The first category of the CTPF, and also the most resource-intensive, is the builders category. It consists of specialized microservices that have the sole purpose of serving as an advanced frontend for GNU `make` and builds things such as GNU GRUB, [iPXE](https://ipxe.org/), SYSLINUX and other pre-boot environments. This is necessary to create the artifacts that make it possible to execute, among other things, iPXE scripts, which define what OS should be installed afterwards.

Secondly, a packagers category exists. This one takes the artifacts from the builders category from it's S3 bucket (using [Minio](https://min.io/)) and creates the actual boot media, which can take the form of either a specialized `.img` file to use on non-UEFI boards (like the Raspberry Pi for example), an `.iso` file to use on UEFI and BIOS boards (`x86_64` or `arm64`) and lastly multiple artifacts for the PXE distributable distributors, which are part of the next category, the distributors.

The distributors are part of a completely seperate service mesh or none at all; the only interface between the two categories from before is the packager's S3 bucket. This makes it possible to deploy the latter in a completely seperate cluster, removing the need for powerful machines in each datacenter. Each datacenter now only needs the following basic services, or more precisely speaking, their `worker` variants:

- DHCP server
- DNS server
- PXE distributable distributor
- SSH distributable distributor
- Private network cluster distributor
- Workload cluster distributor

I will not get into more detail on what does services do exactly (that is something for another post), but simply speaking, those services allow for OS and hypervisor/Kubernetes deployment over an encrypted global layer 3 overlay network to federate datacenters.

These worker services connect to manager services over Redis, which is the only thing that needs to be set up on them. These manager services in turn serve as an API frontend that can control either one or multiple datacenters using a tagging system; that is, one could for example create a datacenter in Nuremberg as well as one in Singapore and manage them using a centralized manager service mesh with a tagging system to differentiate the worker services, or they could deploy a manager service mesh for each datacenter. The manager services allow, for example, to distribute the boot media from the distributors categories using the PXE distributable distributor. In addition to that, it is also possible to deploy them using either USB sticks or SD cards, depending on the boot media you want to use and the boards you want to support.

Once a host has booted from the boot media, it runs an iPXE script from the next category the scripts. Here one can specify which `initrd` or kernel they want to deploy on the host, as well as parameters for the latter. It is also possible to select different setups for different architectures automatically so that you don't have to create multiple boot media embedded scripts (this is the initial script that specifies this categories' API server's endpoint to chainload the script from) for different boards. Most of the time the scripts are also being used to save kickstart or preseed files that allow for automatic installation and setup of Debian/Ubuntu/CentOS/Fedora and pre-/post-install bash scripts. This category can be deployed either per datacenter or in another service mesh, which is possible due to the very low requirements of this simple category.

Another such "simple" category is the registries. These are responsible for keeping track of the SSH keys to deploy to the hosts as specified in the kickstart file or one of the bash scripts and to save the local IP addresses in use by the newly deployed hosts in their respective datacenter, which is specified by using the before-mentioned tagging system. Similarly to the scripts category, as long as these services are reachable from the hosts, can be deployed in whatever service mesh you want and can use either a central manager service mesh or one per datacenter. It is also possible to use an "external registry" such as Hetzner Cloud, which allows for the use of "virtual remote datacenter" that can join the federation. During installation, they can also add a "general authorized SSH key" for the datacenter to `authorized_keys`, which allows for further setup after OS deployment and maintenance.

This further setup is taken care of by the remaining distributors services from above. These can now, using the "general authorized SSH key", deploy either generic bash scripts, the before-mentioned federated layer 3 overlay network ("private network clusters") or as `k3s`-based Kubernetes clusters ("workload clusters"), which's variables and configs in turn can be registered in another registry service. This is similar to [InfraCTL](https://pojntfx.github.io/infractl/), a CLI that I've been working on which will be the basis for these distributors.

Using these categories, I've made a few scenarios possible that were (more or less) impossible to use before:

- Federated datacenters with an encrypted layer 3 overlay network to allow federation behind, for example, NAT
- The inclusion of "remote datacenters" such as Hetzner Cloud (or AWS, Google Cloud, DigitalOcean etc.) as either on-demand private network/workload cluster nodes to enable something like a public "exit node"/private network relay or simply to manage remote nodes through a single interface
- The usage of a seperate builders and packagers cluster/service mesh, which drops the need for lots of compute power in each datacenter.

Now well, as I've mentioned above, this approach is probably not without it's shortcomings. It does look very promising to me, especially as I'll be able to go back to CTPF development after I've solved the I-need-a-cloud-to-develop-a-cloud-deployer-paradox from above with `InfraCTL`.

Stay tuned for more updates on the CTPF's development!
