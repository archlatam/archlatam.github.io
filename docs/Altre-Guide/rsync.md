### Installation

1 - Install the rsync package.

`# pacman -S rsync`

**rsync** must be installed on both the source and destination computers.

<br>

### Using rsync

**The rsync command**

rsync options source destination for example:

`# rsync -zvrah ~/Desktop/devdev /Volumes/ExternalDisk/Backup`

We transfer all files contained in the source directory ~/Desktop/devdev to the destination directory /Volumes/ExternalDisk/Backup. On the first run, rsync will copy the entire contents since the destination directory is empty. In subsequent runs, any files that have been modified in the source folder will be overwritten in the destination. In this case we used the -vrah options, let's see what they mean.

Common options

**-v** means verbose, we will have more information on screen

**-r** means recursive, with this option rsync will read into folders

**-h** transforms bytes into a more readable format (e.g. Mb, Gb)

**-a** means archive. This mode corresponds to writing -rlptgoD and brings all the original conditions of the file from destination to source like timestamp, symbolic links, permissions, owner and group

**-z** tells rsync to compress the transmitted data

**--delete** tells rsync to delete on the destination the files not present in the source

**--exclude** tells rsync which files or directories to ignore

**--progress** shows the file transfer on screen

**-u** sets that files in the destination that are newer than those in the source will be ignored

<br>

### Synchronization between two local directories

`# rsync -vrah ~/Desktop/Graphics /Volumes/ExternalDisk/backup`

In this example we synchronize the **~/Desktop/Graphics** directory with **/Volume/ExternalDisk/backup**, with verbose, recursive and archive options.

```
# rsync -vrah ~/Desktop/Graphics /Volumes/ExternalDisk/backup
building file list ... done
created directory /Volumes/ExternalDisk/backup
backup/
backup/.DS_Store
backup/2222.png
backup/6y3pg5x7.png
backup/bacdd5f1e202772aa0bca470500c8701.jpg
backup/bb.jpg
backup/logo.jpg
backup/nasa1.png
backup/nasa4.png

sent 4.11M bytes  received 268 bytes  8.22M bytes/sec
total size is 4.11M  speedup is 1.00
```


The destination directory didn't exist, rsync created it automatically.

<br>

### Viewing transfer progress

If we want to view progress during the transfer, we just need to use the `--progress` option

```
rsync -vrah --progress ~/Desktop/Graphics /Volumes/ExternalDisk/backup
building file list ... 
6 files to consider
created directory /Volumes/ExternalDisk/backup
backup/
backup/APOLLO_11_EVA_Charlesworth-Lunney-Kranz-S69-44137-Science_Center_cr.jpg
     403.45K 100%   29.60MB/s    0:00:00 (xfer#0, to-check=6/6)
backup/APOLLO_11_EVA_Charlesworth-Lunney-Kranz-S69-44137-Science_Center_cr2.jpg
     143.82K 100%    9.14MB/s    0:00:00 (xfer#1, to-check=5/6)
backup/bacdd5f1e202772aa0bca470500c8701.jpg
       1.66M 100%   33.60MB/s    0:00:00 (xfer#2, to-check=4/6)
backup/bb.jpg
     654.59K 100%   12.01MB/s    0:00:00 (xfer#3, to-check=3/6)
backup/logo.jpg
       5.36K 100%  100.64kB/s    0:00:00 (xfer#4, to-check=2/6)
backup/nasa1.png
      61.47K 100%    1.09MB/s    0:00:00 (xfer#5, to-check=1/6)
backup/nasa4.png
      54.68K 100%  970.88kB/s    0:00:00 (xfer#6, to-check=0/6)

sent 4.11M bytes  received 268 bytes  8.22M bytes/sec
total size is 4.11M  speedup is 1.00
```
<br>

### Excluding files or directories

With the `--exclude` option, we can specify which files, file types or directories to exclude from synchronization. In this example we chose to ignore ".DS_Store" files created by the macOS system using the --exclude=.DS_Store option.

`rsync -vrah --exclude=.DS_Store ~/Desktop/Graphics /Volumes/ExternalDisk/backup`

<br>

### The --delete option

If a file or directory does not exist in the source, but already exists in the destination, with the `--delete` option we can delete it from the destination.

```
rsync -vrah --delete ~/Desktop/Graphics /Volumes/ExternalDisk/backup
building file list ... done
deleting test.txt
./

sent 423 bytes  received 26 bytes  898.00 bytes/sec
total size is 4.11M  speedup is 9151.07
```
<br>

### Performing a simulation (dry run)

If it's the first time we use rsync, or we want to preview what will happen once executed, it is possible to simulate an rsync command to ensure we don't perform incorrect operations. We add the `--dry-run` option

`rsync -vrah --dry-run ~/Desktop/Graphics /Volumes/ExternalDisk/backup`

<br>

### Synchronizing a remote directory via SSH

With rsync, we can use SSH (secure shell) as the transfer mode: using the SSH protocol guarantees that our data travels on a secure and encrypted channel, so no one can read the data while it is being transmitted. To specify that it is an SSH connection, we must include the `-e ssh` option and specify the destination or source appropriately.

`rsync -vrahe ssh ~/Desktop/Graphics root@192.168.0.100:/var/backup`

Also, the command prompt will ask for the user's password (in the example root) when we perform the transfer, which will always happen securely.

<br>


### Deleting content after transfer

In some cases we might decide to automatically delete the source content once the transfer to the destination has completed successfully. To do this, we specify `--remove-source-files` among the options

`rsync -vrah --remove-source-files ~/Desktop/Graphics /Volumes/ExternalDisk/backup`

<br>

### Setting a bandwidth limit

When synchronizing between remote directories, sometimes it is necessary to set a speed limit. For example, consider a remote backup running while we are working: we limit the upload bandwidth with the `--bwlimit=KBPS` option, example:

`rsync --bwlimit=100 -vrahe ssh  ~/Desktop/Graphics root@192.168.0.100:/var/backup`

In this way we will limit the bandwidth to 100Kb/s.
