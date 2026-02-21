# File System

In this chapter you will learn how to work with filesystems.

## Partitioning

Partitioning allows the installation of different operating systems, as it is impossible for multiple operating systems to coexist on the same logical unit. Partitioning also allows separating data from a logical perspective (security, optimization of access, etc.).

The division of the physical disk into partitioned volumes is recorded in the partition table, stored in the first sector of the disk (MBR: Master Boot Record).

For **MBR** partition table formats, the same physical disk can be divided into a maximum of 4 partitions:

* *Primary partition*
* *Extended partition*

!!! Warning "Warning"

    For each physical disk there can only be one extended partition, that is, a physical disk can have in the MBR partition table up to a maximum of:

    1. Three primary partitions plus one extended partition
    2. Four primary partitions

    The extended partition cannot write data and format and can only contain logical partitions. The largest physical disk that can be recognized by the MBR partition table is **2 TB**.

### Device file naming conventions

In the GNU/Linux world, everything is a file. For disks, they are recognized by the system as:

| Hardware                   | Device file name |
| -------------------------- | ----------------------------- |
| IDE hard disk           | /dev/hd[a-d]                  |
| SCSI/SATA/USB hard disk | /dev/sd[a-z]                  |
| Optical drive               | /dev/cdrom or /dev/sr0        |
| Floppy disk                | /dev/fd[0-7]                  |
| Printer (25 pin)         | /dev/lp[0-2...]               |
| Printer (USB)            | /dev/usb/lp[0-15]             |
| Mouse                      | /dev/mouse                    |
| Virtual hard disk          | /dev/vd[a-z]                  |

The Linux kernel contains drivers for most hardware devices.

What we call _devices_ are files, stored without `/dev`, that identify the different hardware detected by the motherboard.

The udev service is responsible for applying naming conventions (rules) and applying them to detected devices.

### Device partition number

The number after the block device (storage device) indicates a partition. For MBR partition tables, number 5 must be the first logical partition.

!!! Warning "Warning"

    Attention! The partition number mentioned mainly refers to the number of block device (storage device) partitions.

There are at least two commands for partitioning a disk: `fdisk` and `cfdisk`. Both commands have an interactive menu. `cfdisk` is more reliable and better optimized, so it is the best to use.

The only reason to use `fdisk` is when you want to list all logical devices with the `-l` option. `fdisk` uses MBR partition tables, therefore it is not supported for **GPT** partition tables and cannot be used for disks larger than **2 TB**.

```
sudo fdisk -l
sudo fdisk -l /dev/sdc
sudo fdisk -l /dev/sdc2
```

### `parted` command

The `parted` command (partition editor) is able to partition a disk without the drawbacks of `fdisk`.

The `parted` command can be used both from the command line and interactively. It also has a recovery function capable of rewriting a deleted partition table.

```
parted [-l] [device]
```

As a graphical interface, there is the very complete tool `gparted`: *Gnome* *PARtition* *EDitor*.

The `gparted -l` command lists all logical devices on a computer.

The `gparted` command, if run without arguments, will show an interactive mode with its internal options:

* `help` or a wrong command will display these options.
* `print all` in this mode will have the same result as `gparted -l` from the command line.
* `quit` to return to the prompt.

### `cfdisk` command

The `cfdisk` command is used to manage partitions.

```
cfdisk device
```

Example:

```
$ sudo cfdisk /dev/sda
```

The preparation, without _LVM_, of physical media takes place in five phases:

* Setting up the physical disk
* Volume partitioning (geographical division of the disk, possibility of installing multiple systems, ...)
* Creating file systems (allows the operating system to manage files, the tree structure, rights, ...)
* Mounting file systems (registering the file system in the tree structure)
* Managing user access

## Logical Volume Manager (LVM)

**L**ogical **V**olume **M**anager (*LVM*)

The partition created by the **standard partition** cannot dynamically adjust hard disk resources; once the partition is mounted, the capacity is completely fixed, this constraint is unacceptable for the server. Although the standard partition can be expanded or reduced forcibly with some technical means, data loss is likely to occur. LVM can solve this problem very well. LVM has been available in Linux since kernel version 2.4 and its main features are:

* More flexible disk capacity
* Online data movement
* Stripe mode disks
* Mirrored Volumes
* Volume snapshots

The principle of LVM is very simple:

* an abstraction logical layer is added between the physical disk (or disk partition) and the file system
* combine multiple disks (or disk partitions) into a Volume Group**(VG**)
* perform disk management operations on them through a feature called Logical Volume**(LV**).

**Physical media**: LVM storage media can be the entire hard disk, a disk partition, or a RAID array. The device must be converted, or initialized, into an LVM Physical Volume (**PV**) before further operations can be performed.

**PV (Physical Volume)**: The basic logical storage block of LVM. To create a physical volume, you can use a disk partition or the disk itself.

**VG (Volume Group)**: Similar to physical disks of a standard partition, a VG is made up of one or more PVs.

**LV (Logical Volume)**: Similar to hard disk partitions in standard partitions, the LV is built on top of the VG. You can set up a file system on LV.

<b><font color="blue">PE</font></b>: The smallest memory unit that can be allocated in a physical volume, by default <b>4MB</b>. An additional size can be specified.

<b><font color="blue">LE</b></font>: The smallest memory unit that can be allocated in a Logical Volume. In the same VG, PE and LE are equal and correspond one to one.

The disadvantage is that if one of the physical volumes goes out of service, all logical volumes using this physical volume are lost. You need to use LVM on RAID disks.

!!! note "Note"

    LVM is managed only by the operating system. Therefore the _BIOS_ needs at least one non-LVM partition for booting.

!!! info "Information"

    In the physical disk, the smallest storage unit is the **sector**; in the file system, the smallest storage unit of GNU/Linux is the **block**, which is called **cluster** in the Windows operating system; in RAID, the smallest storage unit is the **chunk**.

### LVM Write Mechanism

For storing data in **LV** there are several storage mechanisms, two of which are:

* Linear volumes
* Stripe mode volumes
* Mirrored volumes

### LVM commands for volume management

The main relevant commands are:

|        Element         |    PV     |    VG     |    LV     |
|:-----------------------:|:---------:|:---------:|:---------:|
|          scan           |  pcscan   |  vgscan   |  lvscan   |
|         create          | pvcreate  | vgcreate  | lvcreate  |
|         display         | pvdisplay | vgdisplay | lvdisplay |
|         remove          | pvremove  | vgremove  | lvremove  |
|         extend          |           | vgextend  | lvextend  |
|         reduce          |           | vgreduce  | lvreduce  |
| synthetic information |    pvs    |    vgs    |    lvs    |

#### `pvcreate` command

The `pvcreate` command is used to create physical volumes. It transforms Linux partitions (or disks) into physical volumes.

```
pvcreate [-options] partition
```

Example:

```
[root]# pvcreate /dev/hdb1
pvcreate -- physical volume "/dev/hdb1" successfully created
```

It is also possible to use an entire disk (which makes it easier to increase disk size in virtual environments, for example).

```
[root]# pvcreate /dev/hdb
pvcreate -- physical volume "/dev/hdb" successfully created

# It can also be written in other ways, such as
[root]# pvcreate /dev/sd{b,c,d}1
[root]# pvcreate /dev/sd[b-d]1
```

| Option | Description                                                                                        |
| ------- | -------------------------------------------------------------------------------------------------- |
| `-f`    | Forces creation of the volume (disk already transformed into physical volume). Use with extreme caution. |

#### `vgcreate` command

The `vgcreate` command is used to create volume groups. It groups one or more physical volumes into a volume group.

```
vgcreate <VG_name> <PV_name...> [option] 
```

Example:

```
[root]# vgcreate volume1 /dev/hdb1
…
vgcreate – volume group "volume1" successfully created and activated

[root]# vgcreate vg01 /dev/sd{b,c,d}1
[root]# vgcreate vg02 /dev/sd[b-d]1
```

#### `lvcreate` command

The `lvcreate` command creates logical volumes. The file system is then created on these logical volumes.

```
lvcreate -L size [-n name] VG_name
```

Example:

```
[root]# lvcreate –L 600M –n VolLog1 volume1
lvcreate -- logical volume "/dev/volume1/VolLog1" successfully created
```

| Option     | Description                                                                                                                                |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `-L size`   | Sets the logical volume size in K, M or G.                                                                                       |
| `-n name`   | Sets the LV name. Special file created in `/dev/volume_name` with this name.                                                        |
| `-l number` | Sets the percentage of hard disk capacity to use. The number of PEs can also be used. One PE equals 4 MB. |

!!! info "Information"

    After creating a logical volume with the `lvcreate` command, the operating system naming rule is - `/dev/VG_name/LV_name`, this type of file is a soft link (otherwise known as a symbolic link). The link file points to files like `/dev/dm-0` and `/dev/dm-1`.

### LVM commands for displaying volume information

#### `pvdisplay` command

The `pvdisplay` command allows you to view information about physical volumes.

```
pvdisplay /dev/PV_name
```

Example:

```
[root]# pvdisplay /dev/PV_name
```

#### `vgdisplay` command

The `vgdisplay` command allows you to view information about volume groups.

```
vgdisplay VG_name
```

Example:

```
[root]# vgdisplay volume1
```

#### `lvdisplay` command

The `lvdisplay` command allows you to view information about logical volumes.

```
lvdisplay /dev/VG_name/LV_name
```

Example:

```
[root]# lvdisplay /dev/volume1/VolLog1
```

### Preparing physical media

LVM preparation of physical media is as follows:

* Setting up the physical disk
* Volume partitioning
* **LVM Physical Volume**
* **LVM Volume Groups**
* **LVM Logical Volumes**
* Creating file systems
* Mounting file systems
* Managing user access

## File System Structure

A **FS** (file system) is responsible for the following actions:

* Protecting file access and modification rights
* File manipulation: creation, reading, modification and deletion
* Finding files on disk
* Managing partition space

The Linux operating system is able to use various file systems (ext2, ext3, ext4, FAT16, FAT32, NTFS, HFS, BtrFS, JFS, XFS, ...).

### `mkfs` command

The `mkfs` command (make file system) allows you to create a Linux file system.

```
mkfs [-t fstype] filesys
```

Example:

```
[root]# mkfs -t ext4 /dev/sda1
```

| Option | Description                                  |
| ------- | -------------------------------------------- |
| `-t`    | Indicates the type of file system to use. |

!!! Warning "Warning"

    Without a file system, it is impossible to use disk space.

Each file system has an identical structure on every partition. A **Boot Sector** and a **Super block** initialized by the system, then an **Inode table** and a **Data block** initialized by the administrator.

!!! Note "Note"

    The only exception is the **swap** partition.

### Boot sector

The boot sector is the first sector of the bootable storage medium, that is cylinder 0, track 0, sector 1 (1 sector equals 512 bytes). It consists of three parts:

1. MBR (master boot record): 446 bytes.
2. DPT (disk partition table): 64 bytes.
3. BRID (boot record ID): 2 bytes.

| Element | Description                                                                                                                                                                                                    |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MBR      | Stores the "boot loader" (or "GRUB"); loads the kernel, passes parameters; provides a menu interface at boot; transfers to another loader, for example when multiple operating systems are installed. |
| DPT      | Records the partition status of the entire disk.                                                                                                                                                          |
| BRID     | Determines if the device is usable for booting.                                                                                                                                                        |

### Super block

The size of the **Super block** table is defined at creation. It is present in every partition and contains the elements necessary for its use.

Describes the File System:

* Logical Volume Name
* File System Name
* File System Type
* File System State
* File System Size
* Number of free blocks
* Pointer to the beginning of the free blocks list
* Inode list size
* Number and list of free inodes

A copy is loaded into main memory as soon as the system is initialized. This copy is updated as soon as it is modified and the system saves it periodically (command `sync`).

When the system shuts down, it also copies this table in memory to its block.

### Inode table

The size of the **inode table** is defined at creation and is stored in the partition. It consists of records, called inodes, corresponding to the files created. Each record contains the addresses of the data blocks that make up the file.

!!! Note "Note"

    The inode number is unique within a file system.

A copy is loaded into main memory as soon as the system is initialized. This copy is updated as soon as it is modified and the system saves it periodically (command `sync`).

When the system shuts down, it also copies this table in memory to its block.

A file is managed by its inode number.

!!! Note "Note"

    The size of the inode table determines the maximum number of files the FS can contain.

Information present in the *inode table*:

* Inode number
* File type and access permissions
* Owner identification number
* Owner group identification number
* Number of links to this file
* File size in bytes
* Date of last file access
* Date of last file modification
* Date of last inode modification (= creation)
* Table of various pointers (block table) to logical blocks containing file pieces

### Data block

Its size corresponds to the remaining available space of the partition. This area contains the catalogs corresponding to each directory and the data blocks corresponding to the contents of the files.

**To ensure file system consistency**, an image of the superblock and inode table is loaded into memory (RAM) when the operating system loads, so that all I/O operations are performed through these system tables. When the user creates or modifies files, this memory image is updated first. The operating system must therefore regularly update the logical disk superblock (command `sync`).

These tables are written to the hard disk when the system is shut down.

!!! danger "Warning" 

    In case of sudden shutdown, the file system may lose its consistency and cause data loss.

### File System Repair

It is possible to verify the consistency of a file system with the `fsck` command.

In case of errors, solutions are proposed to repair the inconsistencies. After repair, files that remain without entries in the inode table are attached to the `/lost+found` folder of the logical unit.

#### `fsck` command

The `fsck` command is a console-mode integrity check and repair tool for Linux file systems.

```
fsck [-sACVRTNP] [ -t fstype ] filesys
```

Example:

```
[root]# fsck /dev/sda1
```

To check the root partition, you can create a `forcefsck` file and reboot or run `shutdown` with the `-F` option.

```
[root]# touch /forcefsck
[root]# reboot
or
[root]# shutdown –r -F now
```

!!! Warning "Warning"

    The partition to be checked must be unmounted.

## File System Organization

By definition, a file system is a tree directory structure built from a main directory (a logical device can contain only one file system).

!!! Note "Note"

    In Linux everything is a file.

Text document, directory, binary, partition, network resource, screen, keyboard, Unix kernel, user program, ...

Linux respects the **FHS** (Filesystems Hierarchy Standard) (see `man hier`) which defines folder names and their roles.

| Directory  | Functionality                                                           | Abbreviation of                        |
| ---------- | ---------------------------------------------------------------------- | --------------------------------------- |
| `/`        | Contains special directories                                            |                                         |
| `/boot`    | Files related to system startup                                    |                                         |
| `/sbin`    | Commands necessary for system startup and repair             | _system binaries_                     |
| `/bin`     | Executables of basic system commands                             | _binaries_                                |
| `/usr/bin` | System administration commands                                 |                                         |
| `/lib`     | Shared libraries and kernel modules                                 | _libraries_                              |
| `/usr`     | Everything not necessary for minimum system operation | _UNIX System Resources_               |
| `/mnt`     | For mounting temporary SFs                                      | _mount_                                 |
| `/media`   | For mounting removable media                                |                                         |
| `/misc`    | For mounting the NFS service shared directory.                   |                                         |
| `/root`    | Administrator login directory                               |                                         |
| `/home`    | User data                                                            |                                         |
| `/tmp`     | Temporary files                                                        | _temporary_                            |
| `/dev`     | Special device files                                          | _device_                           |
| `/etc`     | Configuration files and scripts                                       | _editable text configuration_ |
| `/opt`     | Specific for installed applications                               | _optional_                             |
| `/proc`    | Virtual file system representing various processes                  | _processes_                              |
| `/var`     | Various variable files                                                    | _variables_                             |
| `/sys`     | Virtual file system, similar to /proc                                   |                                         |
| `/run`     | This is /var/run                                                      |                                         |
| `/srv`     | Service Data Directory                                                 | _service_                              |

* To perform a mount or unmount, at the tree level, you must not be below its mount point.
* Mounting on a non-empty directory does not delete the content. It is just hidden.
* Only the administrator can perform mounting.
* Mount points to be automatically mounted at startup must be entered in `/etc/fstab`.

### `/etc/fstab` file

The `/etc/fstab` file is read at system startup and contains the mounts to be performed. Each file system to be mounted is described on a single line, with fields separated by spaces or tabs.

!!! Note "Note"

    Lines are read in sequence (`fsck`, `mount`, `umount`).

```
/dev/mapper/VolGroup-lv_root   /         ext4    defaults        1   1
UUID=46….92                    /boot     ext4    defaults        1   2
/dev/mapper/VolGroup-lv_swap   swap      swap    defaults        0   0
tmpfs                          /dev/shm  tmpfs   defaults        0   0
devpts                         /dev/pts  devpts  gid=5,mode=620  0   0
sysfs                          /sys      sysfs   defaults        0   0
proc                           /proc     proc    defaults        0   0
  1                              2         3        4            5   6
```

| Column | Description                                                                                                          |
| ------- | -------------------------------------------------------------------------------------------------------------------- |
| 1       | File system device`(/dev/sda1`, UUID=..., ...)                                                              |
| 2       | Mount point name, **absolute path** (except **swap**)                                                |
| 3       | File system type (ext4, swap, ...)                                                                                 |
| 4       | Special mount options (`default`, `ro`, ...)                                                             |
| 5       | Enable or disable backup management (0:backup not done, 1:backup done)                     |
| 6       | Check order when checking the SF with the `fsck` command (0:no check, 1:priority, 2:no priority) |

The `mount -a` command allows automatic mounting based on the contents of the `/etc/fstab` configuration file; mounted information is then written to `/etc/mtab`.

!!! Warning "Warning"

    Only mount points listed in `/etc/fstab` will be mounted on reboot. In general, it is not recommended to write USB flash drives and removable hard disks to the `/etc/fstab` file, because when the external device is disconnected and restarted, the system will report that the device cannot be found, resulting in failure to boot. So what should I do? Temporary mounting, for example:

    ```bash
    Shell > mkdir /mnt/usb     
    Shell > mount -t  vfat  /dev/sdb1  /mnt/usb  

    # Read the information of the USB flash disk
    Shell > cd /mnt/usb/

    # When not needed, execute the following command to pull out the USB flash disk
    Shell > umount /mnt/usb
    ```

!!! info "Information"

    You can make a copy of the `/etc/mtab` file or copy its contents to `/etc/fstab`.
    If you want to view the UUID of the device partition, type the following command: `lsblk -o name,uuid`. UUID stands for `Universally Unique Identifier`.

### Mount management commands

#### `mount` command

The `mount` command allows mounting and displaying logical units in the structure.

```
mount [-option] [device] [directory]
```

Example:

```
[root]# mount /dev/sda7 /home
```

| Option | Description                                                                                      |
| ------- | ------------------------------------------------------------------------------------------------ |
| `-n`    | Sets mounting without writing to `/etc/mtab`.                                              |
| `-t`    | Indicates the type of file system to use.                                                     |
| `-a`    | Mounts all file systems mentioned in `/etc/fstab`.                                             |
| `-r`    | Mounts the file system read-only (equivalent to `-o ro`).                                    |
| `-w`    | Mounts the file system read/write, by default (equivalent to `-o rw`). |
| `-o`    | Argument followed by a list of comma-separated options (`remount`, `ro`, ...).            |

!!! Note "Note"

    The `mount` command alone displays all mounted file systems.

#### `umount` command

The `umount` command is used to unmount logical units.

```
umount [-option] [device] [directory]
```

Example:

```
[root]# umount /home
[root]# umount /dev/sda7
```

| Option | Description                                                          |
| ------- | -------------------------------------------------------------------- |
| `-n`    | Sets unmounting without writing to `/etc/mtab`.    |
| `-r`    | Remounts read-only if `umount` fails.                        |
| `-f`    | Forces unmounting.                                    |
| `-a`    | Removes mounts of all file systems mentioned in `/etc/fstab`. |

!!! Note "Note"

    When unmounting, you must not remain below the mount point. Otherwise, the following error message is displayed: `device is busy`.

## File naming convention

As in any system, to be able to navigate the tree structure and file management, it is important to follow file naming rules.

* Files are encoded with 255 characters
* All ASCII characters can be used
* Upper and lowercase letters are differentiated
* Most files do not have the concept of extension. In the GNU/Linux world, most file extensions are not required, except some (e.g., .jpg, .mp4, .gif, etc.).

Word groups separated by spaces must be enclosed in quotes:

```
[root]# mkdir "working dir"
```

!!! Note "Note"

    Although there is nothing technically wrong with creating a file or directory with a space in it, it is generally a "best practice" to avoid and replace every space with an underscore.

!!! Note "Note"

    The **.** at the beginning of the file name only serves to hide it from a simple `ls`.

Examples of file extension convention:

* `.c`: C language source file
* `.h`: C and Fortran header file
* `.o`: C language object file
* `.tar`: data file archived with `tar` utility
* `.cpio`: data file archived with `cpio` utility
* `.gz`: data file compressed with `gzip` utility
* `.tgz`: data file archived with `tar` and compressed with `gzip` utility
* `.html`: web page

### File name details

```
[root]# ls -liah /usr/bin/passwd
266037 -rwsr-xr-x 1 root 59K mars 22 2019 /usr/bin/passwd
1 2 3 4 5 6 7 8 9
```

| Part | Description                                                                                                                                                                                                                                                                                 |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Inode number                                                                                                                                                                                                                                                                             |
| 2   | File type (first character of the 10 block), "-" means it is an ordinary file.                                                                                                                                                                                          |
| 3   | Access rights (last 9 characters of the 10 block)                                                                                                                                                                                                                                    |
| 4   | If it is a directory, this number represents the number of subdirectories in the directory, including hidden ones. If it is a file, it indicates the number of links, when the number is 1, that is, there is only one link, that relating to the file itself. |
| 5   | Owner name                                                                                                                                                                                                                                                                       |
| 6   | Group name                                                                                                                                                                                                                                                                             |
| 7   | Size (bytes, kilo, mega)                                                                                                                                                                                                                                                               |
| 8   | Last update date                                                                                                                                                                                                                                                              |
| 9   | File name                                                                                                                                                                                                                                                                               |

In the GNU/Linux world there are seven types of files:

| File types | Description                                                                                                                                                                                                                   |
|:------------:| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    **-**     | Represents an ordinary file. Including plain text files (ASCII); binary files (binary); data format files (data); various compressed files.                                                                            |
|    **d**     | Represents a directory file.                                                                                                                                                                                             |
|    **b**     | Represents a block device file. Includes all types of hard disks, USB drives, etc.                                                                                                                    |
|    **c**     | Represents a character device file. Serial port interface device, such as mouse, keyboard, etc.                                                                                             |
|    **s**     | Represents a socket file. This is a file specifically used for network communication.                                                                                                                       |
|    **p**     | Represents a pipe file. It is a special type of file. The main purpose is to resolve errors caused by multiple programs accessing a file simultaneously. FIFO is the abbreviation for first-in-first out. |
|    **l**     | Soft link files, also called symbolic link files, are similar to Windows links. Hard link file, also known as physical link file.                                            |

#### Additional directory description

In every directory there are two hidden files: **.** and **.**. You need to use `ls -al` to view them, for example:

```
# . Indicates in the current directory, for example, it is necessary to run a script in a directory, usually:
Shell > ./scripts

# .. represents the directory one level above the current directory, for example:
Shell > cd /etc/
Shell > cd ..
Shell > pwd
/

# For an empty directory, its fourth part must be greater than or equal to 2. Because there are "." and ".."
Shell > mkdir /tmp/t1
Shell > ls -ldi /tmp/t1
1179657 drwxr-xr-x 2 root root 4096 Nov 14 18:41 /tmp/t1
```

#### Special files

To communicate with peripherals (hard disks, printers...), Linux uses interface files called special files (device file or special file). They allow identification by peripherals.

These files are special because they don't contain data, but specify the access mode to communicate with the device.

They are defined in two modes:

* **block** mode
* **character** mode

```
# Block device file
Shell > ls -l /dev/sda
brw-------   1   root  root  8, 0 jan 1 1970 /dev/sda

# Character device file
Shell > ls -l /dev/tty0
crw-------   1   root  root  8, 0 jan 1 1970 /dev/tty0
```

#### Communication files

These are pipe files and sockets.

* **Pipe files** pass information between processes via FIFO (First In, First Out). One process writes transient information to a pipe file and another reads it. After reading, the information is no longer accessible.

* **Socket files** allow bidirectional communication between processes (on local or remote systems). They use a file system inode.

#### Link files

These files make it possible to assign different logical names to the same physical file. A new access point to the file is therefore created.

There are two types of link files:

* Soft link file, also called symbolic link file
* Hard link file, also called physical link file

Their main characteristics are:

| Link types   | Description                                                                                                                                                                                                                                                                                                                                              |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| soft link file | A shortcut similar to Windows. It has permission 777 and points to the original file. When the original file is deleted, the linked file and the original file are shown in red.                                                                                                                                              |
| Hard link file | The original file has the same inode number as the linked file. It has the same inode number as the physically linked file. They can be updated synchronously, including file content and when it was modified. It cannot cross partitions or file systems. It cannot be used for directories. |

Specific examples are as follows:

```
# Permissions and the original file to which they point
Shell > ls -l /etc/rc.locol
lrwxrwxrwx 1 root root 13 Oct 25 15:41 /etc/rc.local -> rc.d/rc.local

# When deleting the original file. "-s" represents the soft link option
Shell > touch /root/Afile
Shell > ln -s /root/Afile /root/slink1
Shell > rm -rf /root/Afile
```

```
Shell > cd /home/paul/
Shell > ls –li letter
666 –rwxr--r-- 1 root root … letter

# The ln command does not add any options, indicating a hard link
Shell > ln /home/paul/letter /home/jack/read

# The essence of hard links is the file mapping of the same inode number in different directories.
Shell > ls –li /home/*/*
666 –rwxr--r-- 1 root root … letter
666 –rwxr--r-- 1 root root … read

# If you use a hard link to a directory, you will be prompted:
Shell > ln  /etc/  /root/etc_hardlink
ln: /etc: hard link not allowed for directory
```

## File Attributes

Linux is a multi-user operating system where file access control is essential.

These controls are functions of:

* file access permissions
* users (users groups others)

### Basic file and directory permissions

The description of **file permissions** is as follows:

| File permissions | Description                                                                                 |
|:-----------------:| ------------------------------------------------------------------------------------------- |
|         r         | Read. Allows reading a file (`cat`, `less`, ...) and copying a file (`cp`, ...). |
|         w         | Write. Allows modifying the file content (`cat`, `>>`, `vim`, ...).      |
|         x         | Execute. Considers the file as an **executable** file (binary or script).                  |
|         -         | No rights                                                                              |

The description of **directory permissions** is as follows:

| Directory permissions | Description                                                                                                                              |
|:------------------------------:| ---------------------------------------------------------------------------------------------------------------------------------------- |
|               r                | Read. Allows reading the contents of a directory (`ls -R`).                                                                       |
|               w                | Write. Allows creating and deleting files/directories in this directory, such as `mkdir`, `rmdir`, `rm`, `touch`, etc. |
|               x                | Execute. Allows descending into the directory (`cd`).                                                                                     |
|               -                | No rights                                                                                                                           |

!!! info "Information"

    For directory permissions, `r` and `x` usually appear together. Moving or renaming a file depends on whether the directory containing the file has `w` permission, as does deleting a file.

### User type corresponding to basic authorization

| User type | Description         |
|:-----------:| ------------------- |
|      u      | Owner        |
|      g      | Owner group |
|      o      | Other users        |

!!! info "Information"

    In some commands you can designate all with **a** (all). **a = ugo**.

### Attribute management

Displaying rights is done with the `ls -l` command. These are the last 9 characters of a 10-character block. More precisely 3 times 3 characters.

```
[root]# ls -l /tmp/myfile
-rwxrw-r--  1  root  sys  ... /tmp/myfile
  1  2 3       4     5
```

| Part | Description                                             |
| ----- | ------------------------------------------------------- |
| 1     | Owner (**u**ser) permissions, here `rwx`         |
| 2     | Owner group (**g**roup) permissions, here `rw-` |
| 3     | Other users (**o**thers) permissions, here `r-x`        |
| 4     | File owner                                   |
| 5     | File owner group                            |

By default, the _owner_ of a file is whoever created it. The _group_ of the file is the owner group who created the file. _Others_ are those who don't fall into the previous cases.

Attributes are modified with the `chmod` command.

Only the administrator and the owner of a file can modify its rights.

#### `chmod` command

The `chmod` command allows you to modify access permissions to a file.

```
chmod [option] mode file
```

| Option | Observation                                                                            |
| ------- | --------------------------------------------------------------------------------------- |
| `-R`    | Recursively modifies directory permissions and all files contained in it. |

!!! Warning "Warning"

    File and directory rights are not dissociated. For some operations, you will need to know the rights of the directory containing the file. A write-protected file can be deleted by another user, provided the rights of the directory containing it allow this user to perform this operation.

The mode indication can be an octal representation (e.g., `744`) or a symbolic representation ([`ugoa`][`+=-`][`rwxst`]).

##### Octal (or numeric) representation:

| Number | Description |
|:------:| ----------- |
|   4    | r           |
|   2    | s           |
|   1    | x           |
|   0    | -           |

Add the three numbers to obtain a user-type permission. For example **755=rwxr-xr-x**.

!!! info "Information"

    Sometimes you will see `chmod 4755`. The number 4 refers to the special **set uid** permission. Special permissions will not be expanded here for now, but only as basic notions.

```
[root]# ls -l /tmp/fil*
-rwxrwx--- 1 root root … /tmp/file1
-rwx--x--- 1 root root … /tmp/file2
-rwx--xr-- 1 root root … /tmp/file3

[root]# chmod 741 /tmp/file1
[root]# chmod -R 744 /tmp/file2
[root]# ls -l /tmp/fic*
-rwxr----x 1 root root … /tmp/file1
-rwxr--r-- 1 root root … /tmp/file2
```

##### Symbolic representation

This method can be considered as a "literal" association between a user type, an operator, and rights.

```
[root]# chmod -R u+rwx,g+wx,o-r /tmp/file1
[root]# chmod g=x,o-r /tmp/file2
[root]# chmod -R o=r /tmp/file3
```

## Default rights and mask

When a file or directory is created, it already has permissions.

* For a directory: `rwxr-xr-x` or _755_.
* For a file: `rw-r--r--` or _644_.

This behavior is defined by the **default mask**.

The principle is to remove the value defined by the mask from the maximum rights without execution permission.

!!! info "Information"

    The `/etc/login.defs` file defines the default UMASK, with a value of **022**. This means the permission to create a file is 755 (rwxr-xr-x). However, for security reasons, GNU/Linux does not include **x** permission for newly created files; this restriction applies to root (uid=0) and ordinary users (uid>=1000).

    ```bash
    # root user
    Shell > touch a.txt
    Shell > ll
    -rw-r--r-- 1 root root     0 Oct  8 13:00 a.txt
    ```

### `umask` command

The `umask` command allows you to view and modify the mask.

```
umask [option] [mode]
```

Example:
```
$ umask 033
$ umask
0033
$ umask -S
u=rwx,g=r,o=r
$ touch umask_033
$ ls -la  umask_033
-rw-r--r-- 1 architalia architalia 0 nov.   4 16:44 umask_033
$ umask 025
$ umask -S
u=rwx,g=rx,o=w
$ touch umask_025
$ ls -la  umask_025
-rw-r---w- 1 architalia architalia 0 nov.   4 16:44 umask_025
```

| Option | Description                                     |
| ------- | ----------------------------------------------- |
| `-S`    | Symbolic display of file rights. |

!!! Warning "Warning"

    `umask` does not affect existing files. `umask -S` displays file rights (without execution permission) of files that will be created. So it is not the display of the mask used to subtract the maximum value.

!!! Note "Note"

    `umask` modifies the mask until logout.

!!! info "Information"

    The `umask` command belongs to bash built-in commands, so when using `man umask`, all built-in commands are displayed. If you only want to view the `umask` help, you need to use the command `help umask`.

To keep the value, you need to modify the following profile files:

For all users:

* `/etc/profile`
* `/etc/bashrc`

For a particular user:

* `~/.bashrc`

When the above file is written, it overwrites the **UMASK** parameter of `/etc/login.defs`. If you want to improve the security of the operating system, you can set umask to **027** or **077**.
