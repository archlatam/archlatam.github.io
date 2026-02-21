To set permissions for files and folders on Arch Linux, you can use the `chmod` command.

The general syntax for using the `chmod` command is:

```
chmod [permissions] [file/folder]
```

Permissions can be specified in numeric or symbolic format.

### Numeric Permissions

Numeric permissions represent read, write, and execute permissions for the owner user, the owning group, and other users.

Each permission is represented by a number: 4 for read, 2 for write, and 1 for execute. The sum of the numbers corresponding to the desired permissions must be specified for each category of users.

- 4 = read permission
- 2 = write permission
- 1 = execute permission

For example, to grant all permissions (read, write, and execute) to all users, you can use the following command:

```
chmod 777 [file/folder]
```

### Symbolic Permissions

Symbolic permissions represent read, write, and execute permissions for the owner user, the owning group, and other users, using the symbols r, w, and x to represent permissions and the keywords u, g, and o to represent the owner user, the owning group, and other users respectively.

- r = read permission
- w = write permission
- x = execute permission

For example, to grant all permissions (read, write, and execute) to all users, you can use the following command:

```
chmod ugo+rwx [file/folder]
```

#### Basic settings

- `u` indicates the permissions of the owner user of the file or folder
- `g` indicates the permissions of the owning group of the file or folder
- `o` indicates the permissions of all other users
- `a` indicates all users

#### Setting permissions

- `+` adds the specified permissions
- `-` removes the specified permissions
- `=` sets the specified permissions (replaces any previous permissions)

For example, to grant read, write, and execute permissions to the owner user, read permission to the owning group, and execute permission to other users, you can use the following command:

```
chmod u=rwx,g=r,o=x [file/folder]
```

### Setting permissions recursively

To set permissions recursively for a directory and its contents, you can use the `-R` flag.

For example, to grant all permissions (read, write, and execute) to the `documents` directory and its contents, you can use the following command:

```
chmod -R 777 documents/
```

We suggest using this flag carefully, because the permissions set may have unintended effects on files and folders you do not want to modify.

### Practical examples

1. Grant read and write permission to the owner user of the file `document.txt`

```
chmod u+rw documento.txt 
```

2. Grant execute permission to all users for the `project1` folder

```
chmod a+x project1/
```

3. Grant read permission to the owning group for the `project2` folder and its contents

```
chmod -R g+r project2/ 
```

4. Grant all permissions to the `documents` directory and its contents

```
chmod -R 777 documents/ 
```

Numeric permissions in `chmod` allow you to set read, write, and execute permissions using numeric notation.

Numeric permissions are represented by a three-digit number, where each digit indicates read, write, and execute permissions for the owner (first digit), the group (second digit), and other users (third digit) respectively.

Each digit is a number composed of three bits where the value of each bit represents a possible permission. The bits are multiplied by a specific value that refers to each permission.

The bit values are as follows:

- 4: read (r)
- 2: write (w)
- 1: execute (x)

For example, the number `755` corresponds to an owner with all permissions (rwx), group with read and execute permissions (r-x), and other users with read and execute permissions (r-x)

Below are described the numeric `chmod` commands:

- `0` (000): no permission 
- `1` (001): execute permission 
- `2` (010): write permission 
- `3` (011): write and execute permission 
- `4` (100): read permission 
- `5` (101): read and execute permission 
- `6` (110): read and write permission 
- `7` (111): read, write, and execute permission

Here are some examples of how to use numeric notation with `chmod`:

- To set permissions of a file to owner (read/write), group (read), and other users (execute): 

```
chmod 754 file.txt
```

- To grant all permissions (read, write, and execute) to all users:

```
chmod 777 file.txt
```

- To grant read-only permissions to everyone (owner, group, and other users):

```
chmod 444 file.txt
```

It is important to note that numeric notation overwrites all previous permissions of the file or folder. Additionally, if used with the `-R` option, it will modify permissions for all files and folders within the specified folder.
