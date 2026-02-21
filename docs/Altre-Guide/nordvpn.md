Installation and Configuration

1 - Let's install nordvpn-bin:

```
$ git clone https://aur.archlinux.org/nordvpn-bin.git
$ cd nordvpn-bin
$ makepkg -si
```


2 - Add the user to the nordvpn group, and enable the service:

```
$ sudo usermod -aG nordvpn $USER
$ sudo systemctl enable --now nordvpnd
$ reboot
```

3 - Log in to our account. Open the terminal and run the command:

`$ nordvpn login`


4 - Follow the instructions in the terminal by CTRL + clicking on the link in the terminal that will open in the browser, then log in.

![Screenshot from 2023-07-05 16-54-44](https://github.com/ArchItalia/site/assets/117321045/042a2509-9ee6-4aa1-ad32-2de5bcded5e5)

5 - Once logged in to our account, we can connect and disconnect with these commands:

Quick connection, usually on the same country you are connected from

`$ nordvpn connect or $ nordvpn c`

Connection specific to a country

`$ nordvpn connect italy or  $ nordvpn c it`
 
Disconnect from NordVPN

`$ nordvpn disconnect or  $ nordvpn d`

Check NordVPN status

`$ nordvpn status`


