# Linux Commands for Users

In this chapter, you will learn Linux commands and how to use them.

## General Overview

Current Linux systems have graphical utilities dedicated to the work of a system administrator. However, it is important to be able to use the command line interface for several reasons:

* Most system commands are common to all Linux distributions, which is not the case with graphical tools.
* It may happen that the system does not boot correctly but a backup command line interpreter remains accessible.
* Remote administration is performed from the command line with an SSH terminal.
* To preserve server resources, the graphical interface is installed or launched on demand.
* Administration is performed through scripts.

Learning these commands allows the administrator to connect to a Linux terminal, manage its resources and files, identify the station, terminal and connected users, etc.

### Users

The user of a Linux system is defined in the `/etc/passwd` file, with:

* A **login name**, or more commonly called "login", which cannot contain spaces.
* A numeric identifier: **UID** (User Identifier).
* A group identifier: **GID** (Group Identifier).
* A **command interpreter**, for example a shell, which can be different from one user to another.
* A **login directory**, for example the __home directory__.

In other files the user will be defined by:

* A **password**, which will be encrypted before being stored (`/etc/shadow`).
* A **command prompt**, or __login prompt__, which will be symbolized by `#` for administrators and by `$` for other users (`/etc/profile`).

The `passwd` command is a system command used to change the password of the current user or another specified user. The user using the command must have administrator privileges to change another user's password. The passwd command will require the user to enter the old password and then enter and confirm the new password. The entered password will not be displayed on the screen for security reasons.

Depending on the security policy implemented on the system, the password must contain a certain number of characters and meet certain complexity requirements.

Among existing command interpreters, the **Bourne-Added Shell** (`/bin/bash`) is the most frequently used. It is assigned by default to new users. For various reasons, advanced Linux users can choose alternative shells from the Korn Shell (`ksh`), the C Shell (`csh`), etc.

The user's login directory is conventionally stored in the `/home` directory of the workstation. It will contain the user's personal data and configuration files for their applications. By default, at login, the login directory is selected as the current directory.

A workstation-type installation (with graphical interface) starts this interface on terminal 1. Being multi-user, it is possible to connect multiple users multiple times, on different **physical terminals** (TTY) or **virtual terminals** (PTS). Virtual terminals are available inside a graphical environment. A user switches from one physical terminal to another using <kbd>Alt</kbd> + <kbd>Fx</kbd> from the command line or using <kbd>CTRL</kbd> + <kbd>Alt</kbd> + <kbd>Fx</kbd> in graphics mode.

### The Shell

Once the user is connected to a console, the shell displays the **command prompt**. It then behaves like an infinite loop, repeating the same pattern for each instruction entered:

* Displays the command prompt.
* Reads the command.
* Analyzes the syntax.
* Substitutes special characters.
* Executes the command.
* Displays the command prompt.
* etc.

The key sequence <kbd>CTRL</kbd> + <kbd>C</kbd> is used to interrupt a running command.

The use of a command generally follows this sequence:

```bash
command [option(s)] [argument(s)]
```

The command name is often in **lowercase**.

One space separates each object.

**Short options** start with a dash (`-l`), while **long options** start with two dashes (`--list`). A double dash (`--`) indicates the end of the options list.

It is possible to group some short options together:

```bash
$ ls -l -i -a
```

is equivalent to:

```bash
$ ls -lia
```

After an option, there can be multiple arguments:

```bash
$ ls -lia /etc /home /var
```

In literature, the term "option" is equivalent to the term "parameter," which is more commonly used in programming. The optional nature of an option or argument is symbolized by the inclusion in square brackets `[` and `]`. When more than one option is possible, a vertical bar called "pipe" separates them `[a|e|i]`.

## General Commands

### `apropos`, `whatis` and `man` commands

It is impossible for an administrator at any level to know all commands and options in detail. Usually a manual is available for all installed commands.

#### `apropos` command

The `apropos` command allows you to search by keyword within these manual pages:

| Options                                    | Description                                                              |
| ------------------------------------------ | ------------------------------------------------------------------------ |
| `-s`, `--sections list` or `--section list` | Limited to manual sections.                                             |
| `-a` or `--and`                             | Display only the entry matching all provided keywords. |

Example:

```bash
$ apropos clear
clear (1)            - clear the terminal screen
clear_console (1)    - clear the console
clearenv (3)         - clear the environment
```

To find the command that will allow you to change an account's password:

```bash
$ apropos --exact password -a change
chage (1)            - change user password expiry information
passwd (1)           - change user password
```

#### `whatis` command

The `whatis` command displays the description of the command passed as an argument:

```bash
whatis clear
```

Example:

```bash
$ whatis clear
clear (1)            - clear the terminal screen
```

#### `man` command

Once found with `apropos` or `whatis`, the manual is read by `man` ("Man is your friend"). This manual set is divided into 8 sections, grouping information by topic, the default section is 1:

1. Executable programs or commands.
2. System calls (functions given by the kernel).
3. Library calls (functions given by the library).
4. Special files (usually found in /dev).
5. File formats and conventions (configuration files like etc/passwd).
6. Games (like character-based applications).
7. Miscellaneous (e.g., man (7)).
8. System administration commands (usually only for root).
9. Kernel routines (not standard).

It is possible to access information on each section by typing `man x intro`, where `x` is the section number.

The command:

```bash
man passwd
```

will tell the administrator the options, etc. of the passwd command. While:

```bash
$ man 5 passwd
```

will inform you about files related to the command.

Navigate the manual with the <kbd>↑</kbd> and <kbd>↓</kbd> arrows. Exit the manual by pressing <kbd>q</kbd>.

### `shutdown` command

The `shutdown` command allows you to **electronically power off** a Linux server, immediately or after a certain period of time.

```bash
shutdown [-h] [-r] time [message]
```

Specify the shutdown time in the format `hh:mm` for a specific time, or `+mm` for a delay in minutes.

To force an immediate shutdown, use the word `now` instead of time. In this case, the optional message is not sent to other users of the system.

Examples:

```bash
[root]# shutdown -h 0:30 "Server shutdown at 0:30"
[root]# shutdown -r +5
```

Options:

| Options | Remarks                         |
| ------- | ------------------------------------ |
| `-h`    | Powers off the system electronically. |
| `-r`    | Reboots the system.                  |

### `history` command

The `history` command displays the history of commands entered by the user.

Commands are stored in the `.bash_history` file in the user's login directory.

Example of a history command:

```bash
$ history
147 man ls
148 man history
```

| Options | Comments                                                                                       |
| ------- | ---------------------------------------------------------------------------------------------- |
| `-w`    | Writes current history to the history file                                                        |
| `-c`    | Clears the history of the current session (but not the content of the `.bash_history` file). |

* History manipulation:

To manipulate history, the following commands entered from the command prompt will allow:

| Keys             | Function                                                                              |
| ---------------- | ------------------------------------------------------------------------------------- |
| <kbd>!!</kbd>      | Recalls the last command executed.                                                   |
| <kbd>!n</kbd>      | Recalls the command by its number in the list.                                      |
| <kbd>!string</kbd> | Recalls the most recent command starting with the string.                            |
| <kbd>↑</kbd>       | Navigate history going back in time starting from the most recent command. |
| <kbd>↓</kbd>       | Navigate history going forward in time.                                     |

### Autocompletion

Autocompletion is very helpful.

* It completes commands, entered paths or file names.
* A single <kbd>TAB</kbd> press completes the entry in case of a single solution.
* In case of multiple solutions, press <kbd>TAB</kbd> a second time to display the options.

If pressing the <kbd>TAB</kbd> key twice presents no options, there is no solution to the current completion.

## Display and Identification

### `clear` command

The `clear` command clears the content of the terminal screen. More precisely, it moves the display so that the command prompt is at the top of the screen, on the first line.

On a physical terminal, the display will be permanently hidden, while in a graphical interface, a scroll bar will allow you to go back in the virtual terminal history.

!!! Tip "Tip"

    <kbd>CTRL</kbd> + <kbd>L</kbd> will have the same effect as the `clear` command

### `echo` command

The `echo` command is used to display a string of characters.

This command is most commonly used in administrative scripts to inform the user during execution.

The `-n` option indicates no newline output string (by default, output string newline).

```bash
shell > echo -n "123";echo "456"
123456

shell > echo "123";echo "456"
123
456
```

For various reasons, the script developer may need to use special sequences (starting with a `\` character). In this case, the `-e` option will be used, which will allow interpretation of the sequence.

Among frequently used sequences, we can mention:

| Sequence | Result                          |
| -------- | ---------------------------------- |
| `\a`    | Sends a beep                |
| `\b`    | Backspace                           |
| `\n`    | Adds a line break |
| `\t`    | Adds a horizontal tab        |
| `\v`    | Adds a vertical tab          |

### `date` command

The `date` command displays the date and time. The command has the following syntax:

```bash
date [-d yyyyMMdd] [format]
```

Examples:

```bash
$ date
Mon May 24 16:46:53 CEST 2021
$ date -d 20210517 +%j
137
```

In this last example, the `-d` option displays a specific date. The `+%j` option formats this date to show only the day of the year.

!!! Warning "Warning"

    The format of a date may change based on the value of the language defined in the '$LANG' environment variable.

The date display can follow the following formats:

| Option | Format                                                                        |
| ------- | ------------------------------------------------------------------------------ |
| `+%A`   | Full weekday name of the locale (e.g., Sunday) |
| `+%B`   | Full month name of the locale (e.g., January)                    |
| `+%c`   | Locale date and time (e.g., Thu Mar 3 23:05:25 2005)                     |
| `+%d`   | Day of the month (e.g., 01)                                                    |
| `+%F`   | Date in `YYYY-MM-DD` format                                                  |
| `+%G`   | Year                                                                           |
| `+%H`   | Time (00..23)                                                                   |
| `+%j`   | Day of the year (001..366)                                                    |
| `+%m`   | Month number (01..12)                                                       |
| `+%M`   | Minute (00..59)                                                                |
| `+%R`   | Time in `hh:mm` format                                                      |
| `+%s`   | Seconds since January 1, 1970                                                    |
| `+%S`   | Second (00..60)                                                               |
| `+%T`   | Time in `hh:mm:ss` format                                                   |
| `+%u`   | Day of the week (`1` for Monday)                                        |
| `+%V`   | Week number (`+%V`)                                                 |
| `+%x`   | Date in `DD/MM/YYYY` format                                                  |

The `date` command also allows you to modify the system date and time. In this case, the `-s` option will be used.

```bash
[root]# date -s "2021-05-24 10:19"
```

The format to use with the `-s` option is as follows:

```bash
date -s "yyyy-MM-dd hh:mm[:ss]"
```

### `id`, `who` and `whoami` commands

The `id` command is used to display information about users and groups. By default, no user parameter is added and the information of the currently logged in user and group is displayed.

```bash
$ id architalia
uid=1000(architalia) gid=1000(architalia) groups=1000(architalia),10(wheel)
```

The `-g`, `-G`, `-n` and `-u` options display the main group GID, subgroup GIDs, names instead of numeric identifiers, and the user's UID.

The `whoami` command displays the login of the current user.

The `who` command alone displays the names of connected users:

```bash
$ who
architalia tty1   2021-05-24 10:30
root     pts/0  2021-05-24 10:31
```

Since Linux is multi-user, it is possible that more than one session is open on the same station, either physically or through the network. It is interesting to know which users are connected, if only to communicate with them by sending messages.

* tty: represents a terminal.
* pts/: represents a virtual console in a graphical environment with the number after representing the instance of the virtual console (0, 1, 2...)

The `-r` option also displays the runlevel (see chapter "startup").

## File Tree

In Linux, the file tree is an inverted tree, called a **single hierarchical tree**, whose root is the `/` directory.

The **current directory** is the directory where the user is.

The **login directory** is the working directory associated with the user. Login directories are, by default, stored in the `/home` directory.

When the user logs in, the current directory is the login directory.

An **absolute path** refers to a file from the root by traversing the entire tree to the file level:

* `/home/groupA/alice/file`

A **relative path** refers to the same file by traversing the entire tree from the current directory:

* `../alice/file`

In the above example, the "`..` " refers to the parent directory of the current directory.

A directory, even if empty, will necessarily contain at least **two references**:

* `.`: reference to itself.
* `..`: reference to the parent directory of the current directory.

A relative path can therefore start with `./` or `../`. When the relative path refers to a subdirectory or a file in the current directory, the `./` is often omitted. Entering the `./` reference will only really be required for executing an executable file.

Path errors can cause many problems: from creating folders or files in the wrong places, to accidental deletions, etc. It is therefore strongly recommended to use autocompletion when entering paths.

![our example tree](images/commands-pathabsolute.png)

In the previous example, we want to provide the location of the `myfile` file from bob's directory.

* In an **absolute path**, the current directory doesn't matter. We start from the root and go down to the `home`, `groupA`, `alice` directories and finally the `myfile`: `/home/groupA/alice/myfile`.
* In a **relative path**, our starting point is the current directory `bob`, we go up one level with `..` (i.e., in the `groupA` directory), then down to alice's directory, and finally the `myfile`: `../alice/myfile`.

### `pwd` command

The `pwd` command (Print Working Directory) displays the absolute path of the current directory.

```bash
$ pwd
/home/architalia
```

To use a relative path to refer to a file or directory, or to use the `cd` command to move to another directory, you need to know its location in the file tree.

Depending on the shell type and various parameters of its configuration file, the terminal prompt (also known as the command prompt) will display the absolute or relative path of the current directory.

### `cd` command

The `cd` command (Change Directory) allows you to change the current directory -- in other words, to move through the tree.

```bash
$ cd /tmp
$ pwd
/tmp
$ cd ../
$ pwd
/
$ cd
$ pwd
/home/architalia
```

As you can see in the last example above, the `cd` command without arguments moves the current directory to the `home directory`.

### `ls` command

The `ls` command displays the contents of a directory.

```bash
ls [-a] [-i] [-l] [directory1] [directory2] [...]
```

Example:

```bash
$ ls /home
.    ..    architalia
```

The main options of the `ls` command are:

| Option | Information                                                                                                              |
| ------- | ------------------------------------------------------------------------------------------------------------------------- |
| `-a`    | Displays all files, including hidden files. Hidden files in Linux are those starting with a `.`.             |
| `-i`    | Displays inode numbers.                                                                                             |
| `-l`    | Uses a long list format, i.e., each line displays long format information for a file or a directory. |

The `ls` command, however, has many options (see `man`):

| Option | Information                                                                                                                                                                                 |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-d`    | Displays information about a directory instead of listing its contents.                                                                                                             |
| `-g`    | Like the -l option, but doesn't list the owner.                                                                                                                                            |
| `-h`    | Displays file sizes in the most appropriate format (bytes, kilobytes, megabytes, gigabytes, ...). `h` stands for Human Readable. Must be used with the -l option.                |
| `-s`    | Displays the allocated size of each file, in blocks. In the GNU/Linux operating system, "block" is the smallest storage unit in the file system, a block equals 4096Byte. |
| `-A`    | Displays all files in the directory except `.` and `..`                                                                                                                                    |
| `-R`    | Displays the contents of subdirectories recursively.                                                                                                                              |
| `-F`    | Displays the file type. Prints a `/` for a directory, `*` for executables, `@` for a symbolic link, and nothing for a text file.                                        |
| `-X`    | Sorts files by their extensions.                                                                                                                                                  |

* Description of the columns generated by running the `ls -lia` command:

```bash
$ ls -lia /home
78489 drwx------ 4 architalia architalia 4096 25 oct. 08:10 architalia
```

| Value          | Information                                                                                                                                                                                             |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `78489`         | Inode number.                                                                                                                                                                                         |
| `drwx------`    | File type (`d`) and permissions (`rwx------`).                                                                                                                                                             |
| `4`             | Number of subdirectories. (`.` and `..` included). For a file, it represents the number of direct links and 1 represents itself.                                                                    |
| `architalia`      | User ownership.                                                                                                                                                                                   |
| `architalia`      | Group ownership.                                                                                                                                                                                  |
| `4096`          | For files, shows the file size. For directories, shows the fixed value of 4096 bytes occupied by the file name. To calculate the total size of a directory, use `du -sh architalia/` |
| `25 oct. 08:10` | Last modification date.                                                                                                                                                                                 |
| `architalia`      | The file (or directory) name.                                                                                                                                                                          |

!!! Note "Note"

    **Aliases** are often already positioned in common distributions.
    
    This is the case with the `ll` alias:

    ```
    alias ll='ls -l --color=auto'
    ```

The `ls` command has many options. Here are some advanced usage examples:

* List files in `/etc` by last modification:

```bash
$ ls -ltr /etc
total 1332
-rw-r--r--.  1 root root    662 29 may   2021 logrotate.conf
-rw-r--r--.  1 root root    272 17 may.   2021 mailcap
-rw-------.  1 root root    122 12 may.  2021 securetty
...
-rw-r--r--.  2 root root     85 18 may.  17:04 resolv.conf
-rw-r--r--.  1 root root     44 18 may.  17:04 adjtime
-rw-r--r--.  1 root root    283 18 may.  17:05 mtab
```

* List `/var` files larger than 1 megabyte but less than 1 gigabyte. The example here uses advanced `grep` commands with regular expressions. Novices shouldn't struggle too much, there will be a special tutorial to introduce these regular expressions in the future.

```bash
$ ls -lhR /var/ | grep ^\- | grep -E "[1-9]*\.[0-9]*M" 
...
-rw-r--r--. 1 apache apache 1.2M 10 may.  13:02 XB RiyazBdIt.ttf
-rw-r--r--. 1 apache apache 1.2M 10 may.  13:02 XB RiyazBd.ttf
-rw-r--r--. 1 apache apache 1.1M 10 may.  13:02 XB RiyazIt.ttf
...
```

Of course, using the `find` command is highly recommended.

```bash
$ find /var -size +1M -a -size -1024M -a -type f -exec ls -lh {} \;
```

* Show folder permissions:

To know the permissions of a folder, for example `/etc`, the following command **would not** be appropriate:

```bash
$ ls -l /etc
total 1332
-rw-r--r--.  1 root root     44 18 nov.  17:04 adjtime
-rw-r--r--.  1 root root   1512 12 janv.  2010 aliases
-rw-r--r--.  1 root root  12288 17 nov.  17:41 aliases.db
drwxr-xr-x.  2 root root   4096 17 nov.  17:48 alternatives
...
```

The previous command will display the contents of the folder (inside) by default. For the folder itself, you can use the `-d` option.

```bash
$ ls -ld /etc
drwxr-xr-x. 69 root root 4096 18 nov.  17:05 /etc
```

* Sort by file size, largest first:

```bash
$ ls -lhS
```

* Date/time format with `-l`:

```bash
$ ls -l --time-style="+%Y-%m-%d %m-%d %H:%M" /
total 12378
dr-xr-x. 2 root root 4096 2014-11-23 11-23 03:13 bin
dr-xr-x. 5 root root 1024 2014-11-23 11-23 05:29 boot
```

* Add trailing slash to the end of folders:

By default, the `ls` command does not display the last slash of a folder. In some cases, like for scripts, for example, it is useful to display it:

```bash
$ ls -d /etc
/etc/
```

* Hide certain extensions:

```bash
$ ls /etc --hide=*.conf
```

### `mkdir` command

The `mkdir` command creates a directory or a directory tree.

```bash
mkdir [-p] directory [directory] [...]
```

Example:

```bash
$ mkdir /home/architalia/work
```

The "architalia" directory must be present to create the "work" directory.

Otherwise, you must use the `-p` option. The `-p` option creates parent directories if they don't exist.

!!! Danger "Danger"

    It is not advisable to use Linux command names as directory or file names.

### `touch` command

The `touch` command modifies the timestamp of a file or creates an empty file if the file does not exist.

```bash
touch [-t date] file
```

Example:

```bash
$ touch /home/architalia/myfile
```

| Option   | Information                                                        |
| --------- | ------------------------------------------------------------------- |
| `-t date` | Changes the last modification date of the file with the specified date. |

Date format: `[YYYY]MMDDhhmm[ss]`

!!! Tip "Tip"

    The `touch` command is mainly used to create an empty file, but can be useful, for example, for incremental or differential backups. In fact, the only effect of running a `touch` on a file will be to force its saving during the next backup.

### `rmdir` command

The `rmdir` command deletes an empty directory.

Example:

```bash
$ rmdir /home/architalia/work
```

| Option | Information                                                       |
| ------- | ------------------------------------------------------------------ |
| `-p`    | Removes the parent folder or folders provided, if they are empty. |

!!! Tip "Tip"

    To delete a non-empty folder and its contents, use the `rm` command.

### `rm` command

The `rm` command deletes a file or directory.

```bash
rm [-f] [-r] file [file] [...]
```

!!! Danger "Danger"

    Any deletion of a file or directory is permanent.

| Options | Information                                                         |
| ------- | -------------------------------------------------------------------- |
| `-f`    | Does not ask whether to delete.                                           |
| `-i`    | Asks whether to delete.                                                |
| `-r`    | Deletes a folder and recursively deletes its subfolders. |

!!! Note "Note"

    The `rm` command does not ask for confirmation when deleting files. However, with an arch/arch distribution, `rm` asks for confirmation of deletion because the `rm` command is an `alias` of the command `rm -i`. Don't be surprised if on another distribution, like Debian, for example, you don't get a confirmation request.

Deleting a folder with the `rm` command, whether the folder is empty or not, requires adding the `-r` option.

The end of options is signaled to the shell by a double dash `--`.

In the example:

```bash
$ >-hard-hard # To create an empty file called -hard-hard
hard-hard
[CTRL+C] To interrupt the creation of the file
$ rm -f -- -hard-hard
```

The file name hard-hard starts with a `-`. Without the use of `--`, the shell would have interpreted the `-d` in `-hard-hard` as an option.

### `mv` command

The `mv` command moves and renames a file.

```bash
mv file [file ...] destination
```

Examples:

```bash
$ mv /home/architalia/file1 /home/architalia/file2
$ mv /home/architalia/file1 /home/architalia/file2 /tmp
```

| Options | Information                                                                  |
| ------- | ----------------------------------------------------------------------------- |
| `-f`    | Does not ask for confirmation to overwrite the destination file.         |
| `-i`    | Requires confirmation to overwrite the destination file (default). |

Some concrete cases will help you understand the difficulties that may arise:

```bash
$ mv /home/architalia/file1 /home/architalia/file2
```

Renames `file1` to `file2`. If `file2` already exists, replaces the file content with `file1`.

```bash
$ mv /home/architalia/file1 /home/architalia/file2 /tmp
```

Moves `file1` and `file2` to the `/tmp` folder.

```bash
$ mv file1 /repexist/file2
```

Moves `file1` to `repexist` and renames it `file2`.

```bash
$ mv file1 file2
```

`file1` is renamed to `file2`.

```bash
$ mv file1 /repexist
```

If the destination folder exists, `file1` is moved to `/repexist`.

```bash
$ mv file1 /wrongrep
```

If the destination directory doesn't exist, `file1` is renamed to `wrongrep` in the home directory.

### `cp` command

The `cp` command copies a file.

```bash
cp file [file ...] destination
```

Example:

```bash
$ cp -r /home/architalia /tmp
```

| Options | Information                                                                 |
| ------- | ---------------------------------------------------------------------------- |
| `-i`    | Request confirmation for overwriting (default).                       |
| `-f`    | Does not ask for confirmation to overwrite the destination file.        |
| `-p`    | Maintains owner, permissions and timestamp of the copied file. |
| `-r`    | Copies a directory with its files and subdirectories.                        |
| `-s`    | Creates a symbolic link instead of copying.                            |

```bash
cp file1 /repexist/file2
```

`file1` is copied to `/repexist` with the name `file2`.

```bash
$ cp file1 file2
```

`file1` is copied as `file2` in this folder.

```bash
$ cp file1 /repexist
```

If the destination directory exists, `file1` is copied to `/repexist`.

```bash
$ cp file1 /wrongrep
```

If the destination directory doesn't exist, `file1` is copied under the name `wrongrep` in the home directory.

## Display

### `file` command

The `file` command displays the type of a file.

```bash
file file1 [files]
```

Example:

```bash
$ file /etc/passwd /etc
/etc/passwd:    ASCII text
/etc:        directory
```

### `more` command

The `more` command displays the content of one or more files screen by screen.

```bash
more file1 [files]
```

Example:

```bash
$ more /etc/passwd
root:x:0:0:root:/root:/bin/bash
...
```

Using the <kbd>ENTER</kbd> key, movement is line by line. Using the <kbd>SPACE</kbd> key, movement is page by page. `/text` allows you to search for the match in the file.

### `less` command

The `less` command displays the content of one or more files. The `less` command is interactive and has its own commands for use.

```bash
less file1 [files]
```

Commands specific to `less` are:

| Command                                          | Action                                              |
| ------------------------------------------------ | --------------------------------------------------- |
| <kbd>h</kbd>                                     | Help.                                              |
| <kbd>↑</kbd><kbd>↓</kbd><kbd>→</kbd><kbd>←</kbd> | Move up, down one line, or right and left. |
| <kbd>Enter</kbd>                                 | Move down one line.                             |
| <kbd>Space</kbd>                                | Move down one page.                           |
| <kbd>PgUp</kbd> and <kbd>PgDn</kbd>                | Move up or down one page.                      |
| <kbd>gg</kbd> and <kbd>G</kbd>                     | Go to the first and last page                |
| `/text`                                          | Search for text.                                     |
| <kbd>q</kbd>                                     | Closes the `less` command.                            |

### `cat` command

The `cat` command concatenates the contents of multiple files and displays the result on standard output.

```bash
cat file1 [files]
```

Example 1 - Display the contents of a file on standard output:

```bash
$ cat /etc/passwd
```

Example 2 - Display the contents of multiple files on standard output:

```bash
$ cat /etc/passwd /etc/group
```

Example 3 - Combine the contents of multiple files into a single file using output redirection:

```bash
$ cat /etc/passwd /etc/group > usersAndGroups.txt
```

Example 4 - Display line numbering:

```bash
$ cat -n /etc/profile
     1    # /etc/profile: system-wide .profile file for the Bourne shell (sh(1))
     2    # and Bourne compatible shells (bash(1), ksh(1), ash(1), ...).
     3
     4    if [ "`id -u`" -eq 0 ]; then
     5      PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
     6    else
    …
```

Example 5 - shows line numbering of non-empty lines:

```bash
$ cat -b /etc/profile
     1    # /etc/profile: system-wide .profile file for the Bourne shell (sh(1))
     2    # and Bourne compatible shells (bash(1), ksh(1), ash(1), ...).

     3    if [ "`id -u`" -eq 0 ]; then
     4      PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
     5    else
    …
```

### `tac` command

The `tac` command does almost the opposite of the `cat` command. Displays the contents of a file starting from the end (which is particularly interesting for reading logs!).

Example: Display a log file showing the last line first:

```bash
[root]# tac /var/log/messages | less
```

### `head` command

The `head` command displays the beginning of a file.

```bash
head [-n x] file
```

| Option | Description                              |
| ------- | ---------------------------------------- |
| `-n x`  | Display the first `x` lines of the file |

By default (without the `-n` option), the `head` command will display the first 10 lines of the file.

### `tail` command

The `tail` command displays the end of a file.

```bash
tail [-f] [-n x] file
```

| Option | Description                                    |
| ------- | ---------------------------------------------- |
| `-n x`  | Display the last `x` lines of the file        |
| `-f`    | Display file modifications in real time |

Example:

```bash
tail -n 3 /etc/passwd
sshd:x:74:74:Privilege-separeted sshd:/var/empty /sshd:/sbin/nologin
tcpdump::x:72:72::/:/sbin/nologin
user1:x:500:500:grp1:/home/user1:/bin/bash
```

With the `-f` option, file modification information will always be output unless the user exits the monitoring state with <kbd>CTRL</kbd> + <kbd>C</kbd>. This option is widely used to track log files in real time.

Without the `-n` option, the `tail` command shows the last 10 lines of the file.

### `sort` command

The `sort` command sorts the lines of a file.

It allows sorting the result of a command or the contents of a file in a specific order, numerical, alphabetical, by size (KB, MB, GB) or in reverse order.

```bash
sort [-k] [-n] [-u] [-o file] [-t] file
```

Example:

```bash
$ sort -k 3,4 -t ":" -n /etc/passwd
root:x:0:0:root:/root:/bin/bash
adm:x:3:4:adm:/var/adm/:/sbin/nologin
```

| Option   | Description                                                                                                                                                                                 |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-k`      | Specifies the columns to separate. Multiple columns can be specified.                                                                                                                      |
| `-n`      | Requires numerical sorting.                                                                                                                                                           |
| `-o file` | Saves the sort to the specified file.                                                                                                                                                   |
| `-t`      | Specify a delimiter, which requires that the corresponding file contents are regularly delimited column contents, otherwise they cannot be sorted correctly. |
| `-r`      | Reverses the order of the result. Used with the `-n` option to sort from largest to smallest.                                                                                  |
| `-u`      | Remove duplicates after sorting. Equivalent to `sort file | uniq`.                                                                                                                   |

The `sort` command only sorts the file on the screen. The file is not modified by the sorting. To save the sort, use the `-o` option or output redirection `>`.

By default, numbers are sorted based on their character. Therefore, "110" will be before "20", which in turn will be before "3". The `-n` option must be specified so that numeric character blocks are sorted by their value.

The `sort` command reverses the order of the results, with the `-r` option:

```bash
$ sort -k 3 -t ":" -n -r /etc/passwd
nobody:x:65534:65534:Kernel Overflow User:/:/sbin/nologin
systemd-coredump:x:999:997:systemd Core Dumper:/:/sbin/nologin
polkitd:x:998:996:User for polkitd:/:/sbin/nologin
```

In this example, the `sort` command will sort the contents of the `/etc/passwd` file from the largest uid (user identifier) to the smallest.

Some advanced examples of using the `sort` command:

* Mixing values

The `sort` command can also shuffle values with the `-R` option:

```bash
$ sort -R /etc/passwd
```

* Sorting IP addresses

A system administrator is soon faced with processing IP addresses from logs of their services, such as SMTP, VSFTP or Apache. These addresses are typically extracted with the `cut` command.

Here's an example with the `dns-client.txt` file:

```
192.168.1.10
192.168.1.200
5.1.150.146
208.128.150.98
208.128.150.99
```

```bash
$ sort -nr dns-client.txt
208.128.150.99
208.128.150.98
192.168.1.200
192.168.1.10
5.1.150.146
```

* Sorting files by removing duplicates

The `sort` command knows how to remove duplicates from the file output using the `-u` option.

Here's an example with the `colours.txt` file:

```
Red
Green
Blue
Red
Pink
```
```
$ sort -u colours.txt
Blue
Green
Pink
Red
```

* Sorting files by size

The `sort` command knows how to recognize file sizes, from commands like `ls` with the `-h` option.

Here's an example with the `size.txt` file:

```
1.7G
18M
69K
2.4M
1.2M
4.2G
6M
124M
12.4M
4G
```

```bash
$ sort -hr size.txt
4.2G
4G
1.7G
124M
18M
12.4M
6M
2.4M
1.2M
69K
```

### `wc` command

The `wc` command counts the number of lines, words and/or bytes of a file.

```bash
wc [-l] [-m] [-w] file [files]
```

| Option | Description                   |
| ------- | ----------------------------- |
| `-c`    | Counts the number of bytes.      |
| `-m`    | Counts the number of characters. |
| `-l`    | Counts the number of lines.     |
| `-w`    | Counts the number of words.    |

## Search

### `find` command

The `find` command searches for the location of files or folders.

```bash
find directory [-name name] [-type type] [-user login] [-date date]
```

Since the options of the `find` command are numerous, it is better to refer to the `man` command.

If the search folder is not specified, the `find` command will search from the current folder.

| Option             | Description                               |
| ------------------- | ----------------------------------------- |
| `-perm permissions` | Searches for files based on their permissions.    |
| `-size size`        | Searches for files based on their size. |

### `-exec` option of the `find` command

It is possible to use the `-exec` option of the `find` command to execute a command on each line of the result:

```bash
$ find /tmp -name *.txt -exec rm -f {} \;
```

The above command searches for all files in the `/tmp` folder named `* .txt` and deletes them.

!!! Tip "Understanding the `-exec` option"

    In the previous example, the `find` command will build a string representing the command to be executed.
    
    If the `find` command finds three files called `log1.txt`, `log2.txt` and `log3.txt`, then the `find` command will build the string by replacing the braces in the string `rm -f {} \;` with one of the search results, and will do it as many times as there are results.
    
    This will give us:

    ```
    rm -f /tmp/log1.txt ; rm -f /tmp/log2.txt ; rm -f /tmp/log3.txt ;
    ```

    The character `;` is a special shell character that must be protected by `\` to prevent it from being interpreted too early by the `find` command (and not in the `-exec`).

!!! Tip "Tip"

    `$ find /tmp -name *.txt -delete` does the same thing.

### `whereis` command

The `whereis` command searches for files related to a command.

```bash
whereis [-b] [-m] [-s] command
```

Example:

```bash
$ whereis -b ls
ls: /bin/ls
```

| Option | Description                              |
| ------- | ---------------------------------------- |
| `-b`    | Searches only for the binary file. |
| `-m`    | Searches only for the man pages.          |
| `-s`    | Searches only for source files.          |

### `grep` command

The `grep` command searches for a string in a file.

```bash
grep [-w] [-i] [-v] "string" file
```

Example:

```bash
$ grep -w "root:" /etc/passwd
root:x:0:0:root:/root:/bin/bash
```

| Option | Description                                |
| ------- | ------------------------------------------ |
| `-i`    | Ignores case of the searched string. |
| `-v`    | Excludes lines containing the string.    |
| `-w`    | Searches for the exact word.                    |

The `grep` command returns the complete line containing the searched string.
* The special character `^` is used to search for a string at the beginning of a line.
* The special character `$` is used to search for a string at the end of a line.

```bash
$ grep -w "^root" /etc/passwd
```

!!! Note "Note"

    This command is very powerful and it is highly recommended to consult its manual. It has numerous derivatives.

It is possible to search for a string in a file tree with the `-R` option.

```bash
grep -R "Virtual" /etc/httpd
```

## Meta-characters (wildcards)

Meta-characters replace one or more characters (or even an absence of characters) during a search. These meta-characters are also known as wildcards.

They can be combined.

The `*` character replaces a string consisting of any character. The character `*` can also represent an absence of characters.

```bash
$ find /home -name "test*"
/home/architalia/test
/home/architalia/test1
/home/architalia/test11
/home/architalia/tests
/home/architalia/test362
```

Meta-characters allow more complex searches by replacing all or part of a word. They simply replace unknowns with these special characters.

The `?` character replaces a single character, whatever it is.

```bash
$ find /home -name "test?"
/home/architalia/test1
/home/architalia/tests
```

Square brackets `[` and `]` are used to specify the values that a single character can take.

```bash
$ find /home -name "test[123]*"
/home/architalia/test1
/home/architalia/test11
/home/architalia/test362
```

!!! Note "Note"

    Always surround words containing metacharacters with `"` to prevent them from being replaced by file names that match the criteria.

!!! Warning "Warning"

    Don't confuse shell metacharacters with regular expression metacharacters. The `grep` command uses regular expression metacharacters.

## Redirections and pipes

### Standard input and output

On UNIX and Linux systems, there are three standard streams. They allow programs, through the `stdio.h` library, to send and receive information.

These streams are called channel X or file descriptor X.

By default:

* the keyboard is the input device for channel 0, called **stdin** ;
* the screen is the output device for channels 1 and 2, called **stdout** and **stderr**.

![standard channels](images/input-output.png)

**stderr** receives the error streams returned by a command. The other streams are directed to **stdout**.

These streams point to device files, but since everything is a file in UNIX/Linux, I/O streams can easily be directed to other files. This principle is the strength of the shell.

### Input Redirection

It is possible to redirect the input stream from another file with the `<` or `<<` character. The command will read the file instead of the keyboard:

```bash
$ ftp -in serverftp << ftp-commands.txt
```

!!! Note "Note"

    Only commands that require keyboard input will be able to handle input redirection.

Input redirection can also be used to simulate user interactivity. The command will read the input stream until it encounters the keyword defined after the input redirection.

This function is used for interactive commands in scripts:

```bash
$ ftp -in serverftp << END
user alice password
put file
bye
END
```

The keyword `END` can be replaced by any word.

```bash
$ ftp -in serverftp << STOP
user alice password
put file
bye
STOP
```

The shell exits the `ftp` command when it receives a line containing only the keyword.

!!! Warning "Warning"

    The final keyword, here `END` or `STOP`, must be the only word on the line and must be at the beginning of the line.

Standard input redirection is rarely used because most commands accept a file name as an argument.

The `wc` command could be used this way:

```bash
$ wc -l .bash_profile
27 .bash_profile # the number of lines is followed by the file name
$ wc -l < .bash_profile
27 # returns only the number of lines
```

### Output Redirection

Standard output can be redirected to other files using the `>` or `>>` characters.

Simple redirection `>` overwrites the contents of the output file:

```bash
$ date +%F > date_file
```

When the `>>` character is used, it indicates that the result of the command is appended to the file contents.

```bash
$ date +%F >> date_file
```

In both cases, the file is automatically created when it doesn't exist.

Standard error output can also be redirected to another file. This time it will be necessary to specify the channel number (which can be omitted for channels 0 and 1):

```bash
$ ls -R / 2> errors_file
$ ls -R / 2>> errors_file
```

### Redirection examples

Redirecting 2 outputs to 2 files:

```bash
$ ls -R / >> ok_file 2>> nok_file
```
