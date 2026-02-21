Installation

1 - To use Timeshift on our Arch Linux to create snapshots, we need a system that is created with BTRFS File System and with minimum the @, @/home subvolumes. If you don't know how to install a system with these requirements, follow the guide.
Assuming your system is configured as required, let's install Timeshift:

`$ git clone https://aur.archlinux.org/timeshift.git`

`$ cd timeshift`

`$ makepkg -Si`

2 - Once Timeshift is installed, we need to have the cron service installed and activated to automate snapshots, if you haven't already done so let's proceed:

`$ sudo pacman -S cronie`

`$ sudo systemctl enable cronie --now`

3 - At this point we open Timeshift and set the btrfs partition of the system, then choose the configuration to make snapshots that seems most useful for our system, for example every hour:

![Screenshot from 2023-07-05 14-52-12](https://github.com/ArchItalia/site/assets/117321045/a31ced93-27d5-47e2-b13d-56c6562c274e)


4 - It is possible to restore the system from the Timeshift graphical interface, but let's see what the terminal commands are with an example, to see the complete list refer to man:

```
$ timeshift --list

$ timeshift --list --snapshot-device /dev/sda2

$ timeshift --create --comments "after update" --tags D

$ timeshift --restore

$ timeshift --restore --snapshot '2023-10-12_16-29-08' --target /dev/sda2
```
