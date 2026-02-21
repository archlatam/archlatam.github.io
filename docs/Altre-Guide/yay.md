Yay is an AUR helper for Archlinux that greatly simplifies package management. The AUR (Arch User Repository) is a collection of packages maintained by Archlinux users, which are not officially supported by the Arch development team.

What is Yay AUR helper?

Yay is an advanced version of Yaourt, another AUR package management utility. However, yay has some additional features that make the difference, such as:

- Automatic dependency installation
- Compatibility with pacman, the official Archlinux package manager
- Complete interface for package management (installation, update, removal and search)
- Configuration of default settings through the yay.conf file

How to install Yay AUR helper?

```
pacman -S --needed git base-devel
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```
<br><br>

Here is the complete list of all existing commands for Yay:

- `$ yay` *no option* - Updates the system (official repositories and AUR packages).
- `$ yay -h` - Shows the help guide for Yay.
- `$ yay -S package_name` - Installs a package from official repositories or the AUR.
- `$ yay -Su` - Updates installed packages that have updates available.
- `$ yay -Syyu` - Forces package database refresh and updates all installed packages.
- `$ yay -R package_name` - Removes a package from the system.
- `$ yay -Rs package_name` - Removes a package and its dependencies that are not required by other packages.
- `$ yay -Syu package_name` - Synchronizes the system and updates only the specified package.
- `$ yay -Ss package_name` - Searches for a package by name.
- `$ yay -Si package_name` - Shows detailed information about a package, including description and dependencies.
- `$ yay -Q` - Lists all installed packages on the system.
- `$ yay -Qe` - Lists only packages explicitly installed by the user.
- `$ yay -Ql package_name` - Lists the files installed by a specific package.
- `$ yay -Qu` - Shows packages that have updates available.
- `$ yay -Qdt` - Lists unused (orphan) dependencies.
- `$ yay -Y` - Yay internal options (maintenance and configuration).
- `$ yay -Yc` - Cleans Yay cache (compiled and downloaded packages).
- `$ yay -G package_name` - Downloads the PKGBUILD of a package without installing it.
- `$ yay -Sc` - Removes cached packages that are not currently installed.
- `$ yay -Sl` - Lists configured package repositories.
- `$ yay -Syy` - Forces a refresh of the package database.
- `$ yay -U package_file_name` - Installs or updates a package from a local package file.
- `$ yay -Qm` - Lists installed AUR packages.
- `$ yay -Rns package_name` - Removes a package, its dependencies, and related configuration files.
- `$ yay -Sdd package_name` - Installs a package without dependency checks (unsafe, advanced use only).
- `$ yay -Yc --aur` - Removes cached AUR packages only.
- `$ yay -Qkk` - Verifies the integrity of installed package files.
- `$ yay -Scc` - Clears all package cache data.
