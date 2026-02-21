
systemd-boot is an open source bootloader used on Arch Linux to boot the operating system. It was developed by systemd, the init system used by many modern Linux distributions.

systemd-boot is also known as "bootctl" and is a very fast and lightweight bootloader that supports UEFI and offers a simple and easy-to-use user interface. Its main purpose is to select the operating system kernel to boot and provide the necessary boot options.


Installing systemd-boot:

```
# pacman -S efibootmgr
# bootctl --path=/boot install
# echo "default arch-*" >> /boot/loader/loader.conf
# vim /boot/loader/entries/arch.conf
```


Now let's create the configuration of the arch.conf file opened with vim, it's important to write the correct root boot partition, for example in this example it is root=/dev/sda2, otherwise the system won't boot. If we are using a @ subvolume we need to add the rootflags=subvol=@ flag.
   
```
title   Arch Linux
linux   /vmlinuz-linux
initrd  /initramfs-linux.img
options root=/dev/sda2 rootflags=subvol=@ rw quiet loglevel=3 rd.systemd.show_status=auto rd.udev.log_level=3
```
