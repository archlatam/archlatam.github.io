Grub, acronym for GRand Unified Bootloader, is a very useful boot manager for selecting the operating system you want to start when you turn on your computer.

Below is a guide for installing and configuring Grub on Arch Linux.

1. Install Grub via the package manager
    - Open a terminal and type the following command:
      <br>
      
      ```
      sudo pacman -S grub
      ```

        <br>
        
2. Create the Grub configuration
    - Type the following command to generate the Grub configuration:
      <br>
      
      ```
      sudo grub-mkconfig -o /boot/grub/grub.cfg
      ```

      <br>
      
3. Configure Grub
      - Open the Grub configuration file via the following command:
    
        <br>
      ```
      sudo nano /etc/default/grub
      ```
    - Navigate through the configuration file and modify the parameters according to your personal preferences.
      Example:
      ```
      GRUB_DEFAULT=0
      GRUB_TIMEOUT=5
      GRUB_DISTRIBUTOR="Arch"
      GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
      GRUB_CMDLINE_LINUX="loglevel=3"
      ```
    - Save the changes and close the configuration file.

 <br> <br>
    
4. Update Grub
    - Type the following command to update Grub with the changes made:

```  
sudo grub-mkconfig -o /boot/grub/grub.cfg
```    
<br> <br><br> <br>

UEFI installation

1 - Installing Grub:

`# pacman -S efibootmgr grub`


`# grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB`


1a - Secure boot support:

Grub fully supports secure boot using either CA keys or shim, however the installation command differs depending on which one you intend to use.

To use CA keys the command is:

`# grub-install --target=x86_64-efi --efi-directory=esp --bootloader-id=GRUB --modules="tpm" --disable-shim-lock`


To use shim-lock the command is:

`# grub-install --target=x86_64-efi --efi-directory=esp --bootloader-id=GRUB --modules="normal test efi_gop efi_uga search echo linux all_video gfxmenu gfxterm_background gfxterm_menu gfxterm loadenv configfile tpm"`


2 - Finally generate the main configuration file

`# grub-mkconfig -o /boot/grub/grub.cfg`

BIOS/MBR installation

1 - Installing Grub:

`# pacman -S grub`

`# grub-install --target=i386-pc /dev/xxx`


2 - Finally generate the main configuration file

`# grub-mkconfig -o /boot/grub/grub.cfg`

Note: Make sure the "GRUB_TIMEOUT" parameter is set to a value greater than 0 to allow operating system selection at computer startup.
