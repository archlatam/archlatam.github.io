Software packages are downloaded and managed through repositories, which are online catalogs where packages are stored. Pacman allows you to install, update and remove packages through a simple command line interface, with the possibility to customize it through additional options.

Pacman is able to manage dependencies between packages, ensuring compatibility between them and the correct installation of all packages necessary for an application to function.

### Configuration

Pacman configuration is in **/etc/pacman.conf**. More information about the configuration file can be found using the command:

`$ man pacman.conf`

Avoid updating a package

To avoid updating the version of a package through the configuration file **/etc/pacman.conf**, add the line:

`$ IgnorePkg=package-name`

Avoid updating a group of packages

To avoid updating the version of a group of packages, for example gnome, through the configuration file **/etc/pacman.conf**, add the line:

`$ IgnoreGroup=vim`

### Repositories

In this section you can define which repositories to use, as specified in **pacman.conf**. They can be defined directly here or you can add them from another file. All official repositories use the same file **/etc/pacman.d/mirrorlist** which contains a `$repo` variable in order to maintain a single list:

```
[core]
include = /etc/pacman.d/mirrorlist

[extra]
include = /etc/pacman.d/mirrorlist

[multilib]
include = /etc/pacman.d/mirrorlist
```

### Commands

Here is an exhaustive list of pacman commands:


### Commands

Here is an exhaustive list of pacman commands:

- `# pacman -Q` Shows packages installed on the system.
- `# pacman -Qc` Shows configuration files of installed packages.
- `# pacman -Qd` Shows packages installed as dependencies.
- `# pacman -Qdt` Shows orphan packages, no longer needed.
- `# pacman -R $(pacman -Qdtq)` Removes orphan packages and their dependencies.
- `# pacman -Qi` Shows detailed information about an installed package.
- `# pacman -Qk` Verifies integrity of installed package files.
- `# pacman -Ql` Shows all files installed by a package.
- `# pacman -Qm` Shows packages installed from outside the official repositories.
- `# pacman -Qo <file>` Shows the owner package of a specific file.
- `# pacman -Qp <package.pkg.tar.zst>` Shows information about a local package file.
- `# pacman -Qqe > pkglist` Creates a backup list of installed packages.
- `# pacman -S $(cat pkglist)` Installs packages from a backup list.
- `# pacman -Qs <package>` Searches for installed packages.
- `# pacman -Qu` Shows packages that need updating.
- `# pacman -Rs <package>` Removes a package and unused dependencies.
- `# pacman -Rdd <package>` Forces removal without dependency checks (unsafe).
- `# pacman -Rn <package>` Removes a package without removing dependencies.
- `# pacman -Rns <package>` Removes a package, dependencies, and configuration files.
- `# pacman -S <package>` Installs a package from repositories.
- `# pacman -Scc` Removes all cached packages.
- `# pacman -Sc` Removes cached packages that are no longer installed.
- `# pacman -Sdd <package>` Installs a package ignoring dependency checks (unsafe).
- `# pacman -Si <package>` Shows information about a package in repositories.
- `# pacman -Sg` Shows available package groups.
- `# pacman -Sgg` Shows all packages in all groups.
- `# pacman -Ss <package>` Searches for packages in repositories.
- `# pacman -Sw <package>` Downloads a package without installing it.
- `# pacman -Sy` Updates the package database.
- `# pacman -Syu` Updates the system.
- `# pacman -Syy` Forces a full refresh of the package database.
- `# pacman -U <package.pkg.tar.zst>` Installs or updates a local package.
- `# pacman -Uu <package.pkg.tar.zst>` Installs a local package and resolves dependencies.
- `# pacman -Qu --color auto` Shows upgradable packages with colored output.
- `# pacman -Syu --ignore <package>` Updates the system while ignoring a package.
