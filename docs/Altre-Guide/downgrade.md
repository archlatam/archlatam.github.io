To downgrade one or more packages on Arch Linux, follow these steps:

1. Check the current version of the package:
- `# pacman -Qi package_name` Shows information about the package, including the current version.

2. Check available versions of the package:
- `# pacman -Syyu` Updates pacman databases.
- `# pacman -Sii package_name | grep Version` Shows all available versions of the package.

3. Remove the current package:
- `# pacman -Rs package_name` Remove the package and its dependencies.

4. Install the desired version of the package:
- `# pacman -U /var/cache/pacman/pkg/package_name-version.pkg.tar.zst` Install the specified version of the package.

5. Prevent the package from being updated:
Add the package to the pacman blacklist to prevent automatic updating in the future.
- `# nano /etc/pacman.conf` Open the pacman configuration file.
- Add `IgnorePkg = package_name` to the [IgnorePkg] and [IgnoreGroup] sections.
- Save and close the file.

Remember that downgrading a package can cause dependency problems and create system instability. Make sure you understand the risks before proceeding.

<br><br>

The `downgrade` utility present on AUR greatly simplifies the package downgrade process on Arch Linux. Here's how to install and use `downgrade`:

1. Make sure you have AUR enabled on your system. If you haven't already, install the `yay` package which will allow you to access AUR packages. You can do this by following these commands:
```
# pacman -Syu
# pacman -S --needed git base-devel
# git clone https://aur.archlinux.org/yay.git
# cd yay
# makepkg -si
```

2. Install `downgrade` using `yay`:
```
$ yay -S downgrade
```

3. Run `downgrade` to select and install a previous version of a package. For example, to downgrade the `package_name` package, you can use the following command:
```
$ sudo downgrade package_name
```

4. Select the desired version from the menu that appears. `downgrade` will show you the different available versions and ask which one to install.

`downgrade` will automatically handle downloading and installing the package version you selected, as well as managing any dependencies. It is a very useful tool for performing safe and controlled downgrades of packages on Arch Linux.
