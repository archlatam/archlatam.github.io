
Install the base packages for nvidia drivers.

`$ sudo pacman -S nvidia nvidia-utils nvidia-settings libva-utils libva-vdpau-driver libva-mesa-driver`

<br><br><br>

Create the directory **hooks** and add the configuration

- `$ sudo mkdir -p /etc/pacman.d/hooks`
- `$ sudo vim /etc/pacman.d/hooks/nvidia.hook`

```
[Trigger]
Operation=Install
Operation=Upgrade
Operation=Remove
Type=Package
Target=nvidia


[Action]
Description=Update Nvidia module in initcpio
Depends=mkinitcpio
When=PostTransaction
Exec=/usr/bin/mkinitcpio -P
```
<br><br><br>

Create the blacklist file for **nouveau** as root.

`# echo "blacklist nouveau" > /etc/modprobe.d/blacklist-nvidia-nouveau.conf`

<br><br><br>

Create the file 10-nvidia-drm-outputclass.conf.

`$ sudo vim /etc/X11/xorg.conf.d/10-nvidia-drm-outputclass.conf`

```
Section "OutputClass"
Identifier "intel"
MatchDriver "i915"
Driver "modesetting"
EndSection

Section "OutputClass"
Identifier "nvidia"
MatchDriver "nvidia-drm"
Driver "nvidia"
Option "AllowEmptyInitialConfiguration"
Option "PrimaryGPU" "yes"
ModulePath "/usr/lib/nvidia/xorg"
ModulePath "/usr/lib/xorg/modules"
EndSection
```
<br><br><br>


### Display Manager
Proceed according to your display manager.

Configuration if using **GDM**

`$ sudo vim /usr/share/gdm/greeter/autostart/optimus.desktop`

```
[Desktop Entry]
Type=Application
Name=Optimus
Exec=sh -c "xrandr --setprovideroutputsource modesetting NVIDIA-0; xrandr --auto"
NoDisplay=true
X-GNOME-Autostart-Phase=DisplayServer
```

`$ sudo vim /etc/xdg/autostart/optimus.desktop`

```
[Desktop Entry]
Type=Application
Name=Optimus
Exec=sh -c "xrandr --setprovideroutputsource modesetting NVIDIA-0; xrandr --auto"
NoDisplay=true
X-GNOME-Autostart-Phase=DisplayServer
```
<br><br>

Configuration if using **LightDM** 

`$ sudo vim /etc/lightdm/display_setup.sh`

```
#!/bin/sh
xrandr --setprovideroutputsource modesetting NVIDIA-0
xrandr --auto
```
Add execute permission

`$ sudo chmod +x /etc/lightdm/display_setup.sh`


`$ sudo vim /etc/lightdm/lightdm.conf`

```
[Seat:*]
display-setup-script=/etc/lightdm/display_setup.sh
```

<br><br>

Configuration if using **SDDM**

`$ sudo vim /usr/share/sddm/scripts/Xsetup`

```
xrandr --setprovideroutputsource modesetting NVIDIA-0
xrandr --auto
```
Add execute permission

`$ sudo chmod +x /usr/share/sddm/scripts/Xsetup`

<br><br>

### Mkinitcpio
Edit the mkinitcpio.conf file and add our configuration and the kernel modules

`$ sudo vim /etc/mkinitcpio.conf`

```
MODULES=(nvidia nvidia_modeset nvidia_uvm nvidia_drm)
```

`$ sudo mkinitcpio -P`

<br><br>

### Xinitrc

Add to the .xinitrc file or create it if it doesn't exist in ~/.xinitrc

```
xrandr --output <output-name> --set "PRIME Synchronization" 1
```
<br><br>

Finally, add the kernel parameter to your bootloader configuration: `nvidia_drm.modeset=1`

GRUB:

```
GRUB_CMDLINE_LINUX="nvidia-drm.modeset=1"
```

` # grub-mkconfig -o /boot/grub/grub.cfg`

<br><br> 

Systemd-boot:

For example, if your configuration is in /boot/loader/entries/arch.conf

```
title   Arch Linux
linux   /vmlinuz-linux
initrd  /initramfs-linux.img
options root=/dev/xxx rw quiet loglevel=3 rd.systemd.show_status=auto rd.udev.log_level=3 nvidia-drm.modeset=1
```
<br><br>

Restart the machine
`$ reboot`

<br><br>

![image](https://github.com/ArchItalia/site/assets/117321045/3f13131e-d6f8-4a92-b700-d97b1c3948fc)
