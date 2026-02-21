The function of `sudoers.d/username` on ArchLinux allows users with administrator privileges to specify in more detail which user can execute specific commands through Sudo.

Listed below are some existing commands in this format:

- `username ALL=(ALL) ALL` - allows the user "username" to execute any command as administrator
- `username ALL=(root) /usr/bin/pacaur` - allows the user "username" to execute only the "pacaur" command as the "root" user
- `username ALL=(user) /bin/vim` - allows the user "username" to execute only the "vim" command as "user"
- `username ALL=(ALL) NOPASSWD: /usr/bin/pacman -Syu` - allows the user "username" to execute "pacman -Syu" as administrator without having to enter the password
- `username ALL=(ALL) NOPASSWD: ALL` - allows the user "username" to execute any command as administrator without having to enter the password.
- `username ALL=(ALL) /bin/reboot, /bin/shutdown` - allows the user "username" to execute only the "reboot" and "shutdown" commands as administrator.
- `%group ALL=(ALL) /usr/bin/htop` - allows all users belonging to the "group" group to execute the "htop" command as administrator.
- `username ALL=(ALL) !/usr/bin/rm` - allows the user "username" to execute any command as administrator, except the "rm" command.
- `username ALL=(ALL) NOPASSWD: /bin/su - user` - allows the user "username" to execute the "su" command to become the "user" as administrator without having to enter the password.

Note that these are just some examples of what can be specified in the `sudoers.d/username` file.
