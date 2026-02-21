### Installation and use

Let's install firewalld and enable the service.

- `$ pacman -S firewalld`
   
- `$ sudo systemctl enable firewalld --now`

Let's check the service status.

- `$ sudo systemctl status firewalld`

You can see all your configurations and settings at once with this command:

- `$ sudo firewall-cmd --list-all`

<br><br>

### Managing zones

First of all, I need to explain zones. Zones are a feature that basically allows you to define different sets of rules for different situations. Zones are a huge part of firewalld, so it's useful to understand how they work.

If your machine has multiple ways to connect to different networks (e.g., Ethernet and WiFi), you can decide that one connection is more reliable than the other. You could set your Ethernet connection in the "trusted" zone if it's only connected to a local network you've built, and put WiFi (which might be connected to the Internet) in the "public" zone with stricter restrictions.

<br>
!!! note "Note"

    A zone can only be in an active state if it has one of these two conditions:
    The zone is assigned to a network interface
    Source IPs or network ranges are assigned to the zone.

<br>
The default zones include the following:

**drop**: The lowest level of trust. All incoming connections are dropped without response and only outgoing connections are possible.

**block**: Similar to the above, but instead of simply dropping connections, incoming requests are rejected with an icmp-host-prohibited or icmp6-adm-prohibited message.

**public**: Represents public networks, untrusted. You don't trust other computers, but you can allow selected incoming connections on a case-by-case basis.

**internal**: The other side of the external zone, used for the internal part of a gateway. Computers are fairly reliable and some additional services are available.

**dmz**: Used for computers located in a DMZ (isolated computers that won't have access to the rest of your network). Only certain incoming connections are allowed.

**work**: Used for work machines. Trust most computers on the network.

**home**: A home environment. Generally implies that you trust most other computers and some additional services will be accepted. Some other services may be allowed.

**trusted**: Trust all machines on the network. The most open of the options available and should be used sparingly.
<br><br>

### Zone management commands

To see your default zone, run:

- `$ firewall-cmd --get-default-zone`

To see which zones are active and what they do, run:

- `$ firewall-cmd --get-active-zones`

To change the default zone:

- `$ firewall-cmd --set-default-zone [your-zone]`

To add a network interface to a zone:

- `$ firewall-cmd --zone=[your-zone] --add-interface=[your-network-interface]`

To change the zone of a network interface:

- `$ firewall-cmd --zone=[your-zone] --change-interface=[your-network-interface]`

To completely remove an interface from a zone:

- `$ firewall-cmd --zone=[your-zone] --remove-interface=[your-network-interface]`

To create a new zone with a custom rule set, and to check that it was added correctly:

- `$ firewall-cmd --new-zone=[your-new-zone]`
- `$ firewall-cmd --get-zones`
   
<br><br>

### Port management

To see all open ports:

- `$ firewall-cmd --list-ports`

To add a port to your firewall zone:

- `$ firewall-cmd --zone=public --add-port=9001/tcp`

To remove a port, just use:

- `$ firewall-cmd --zone=public --remove-port=9001/tcp`

### Service management

This is the preferred way to open ports for these common services, and much more:

   - **HTTP** and **HTTPS**: for web servers
   - **FTP**: for moving files
   - **SSH**: for controlling remote machines and moving files back and forth in the new way
   - **Samba**: For sharing files with Windows machines

<br><br>

To see a list of all available services:

- `$ firewall-cmd --get-services`

To see which services you currently have active on your firewall:

- `$ firewall-cmd --list-services`

To open a service on your firewall (e.g., HTTP in the public zone):

- `$ firewall-cmd --zone=public --add-service=http`

To remove/close a service on your firewall:

- `$ firewall-cmd --zone=public --remove-service=http`

<br><br>

### Limiting access

Let's say you have a server and don't want to make it public. If you want to define who's authorized to access via SSH, or view some private web pages/app, you can do it.

There are a couple of methods to do this. First, for a more closed server, you can choose one of the more restrictive zones, assign your network device to it, add the SSH service as shown above, and then whitelist your public IP address like this:

<br>
!!! warning "Warning"

    Never remove the SSH service from a remote server firewall!
    Remember, SSH is what you use to access your server. Unless you have another way to access the server physically, or its shell (i.e., through a control panel provided by the host), removing the SSH service will permanently block you.
    You will need to contact support to regain your access, or completely reinstall the operating system.

  
<br>

- `$ firewall-cmd --permanent --zone=trusted --add-source=192.168.1.0 [< insert your IP here]`

You can make it an IP address range by adding a higher number at the end, like this:

- `$ firewall-cmd --permanent --zone=trusted --add-source=192.168.1.0/24 [< insert your IP here]`

Again, just change **--add-source** to **--remove-source** to reverse the process
