# Pacman

Los paquetes de software se descargan y gestionan a través de los repositories, que son catálogos en línea donde se almacenan los paquetes. Pacman permite instalar, actualizar y eliminar paquetes a través de una simple interfaz de línea de comando, con la posibilidad de personalizarla mediante opciones adicionales.

Pacman es capaz de gestionar las dependencias entre los paquetes, garantizando la compatibilidad entre ellos y la correcta instalación de todos los paquetes necesarios para el funcionamiento de una aplicación.

### Configuración

La configuración de Pacman está en **/etc/pacman.conf**. Más información respecto al archivo de configuración puede ser encontrada usando el comando:

`$ man pacman.conf`

Evitar la actualización de un paquete

Para evitar actualizar la versión de un paquete a través del archivo de configuración **/etc/pacman.conf**, añadir la línea:

`$ IgnorePkg=nombrepaquete`

Evitar la actualización de un grupo de paquetes

Para evitar actualizar la versión de un grupo de paquetes ejemplo gnome a través del archivo de configuración **/etc/pacman.conf**, añadir la línea:

`$ IgnoreGroup=gnome`

### Repositories

En esta sección puedes definir qué repositories usar, como se especifica en **pacman.conf**. Pueden ser definidas directamente aquí o puedes añadirlas desde otro archivo. Todos los repositories oficiales utilizan el mismo archivo **/etc/pacman.d/mirrorlist** donde está contenida una variable `$repo` para mantener solo una lista:

```
[core]
include = /etc/pacman.d/mirrorlist

[extra]
include = /etc/pacman.d/mirrorlist

[multilab]
include = /etc/pacman.d/mirrorlist
```

### Comandos

Aquí tienes una lista exhaustiva de los comandos de pacman:

- `# pacman -Q`        Muestra los paquetes instalados en el sistema. 
- `# pacman -Qc`        Muestra los archivos de configuración de los paquetes que no forman parte del sistema base.
- `# pacman -Qd`        Muestra los paquetes dependientes de un paquete específico.
- `# pacman -Qdt`       Muestra los paquetes huérfanos, ya no necesarios por dependencias eliminadas.
- `# pacman -R $(pacman -Qdtq)` Eliminar los paquetes y las dependencias ya no necesarias.
- `# pacman -Qi`         Muestra la información detallada de un paquete instalado.
- `# pacman -Qk`        Verifica integridad de los archivos de un paquete con md5sums.
- `# pacman -Ql`         Muestra todos los archivos instalados por un paquete.
- `# pacman -Qm`      Muestra los paquetes explícitamente instalados por el usuario, no presentes en los repositories oficiales.
- `# pacman -Qo`        Muestra el paquete propietario de un archivo específico.
- `# pacman -Qp`        Muestra la información descriptiva de un paquete local.
- `# pacman -Qqe > pkglist` Crear un archivo backup de los paquetes instalados.
- `# pacman -S $(cat pkglist)` Instalar paquetes leyendo del pkglist.
- `# pacman -Qs`         Busca un paquete entre los ya instalados en el sistema.
- `# pacman -Qu`        Muestra los paquetes que necesitan actualización disponibles en los repositories.
- `# pacman -Rs`         Elimina un paquete, junto con los paquetes dependientes de él y ya no utilizados por ningún otro paquete.
- `# pacman -Rdd`       Fuerza la eliminación de un paquete y sus dependencias.
- `# pacman -Rn`        Elimina un paquete, sin eliminar las dependencias no necesarias.
- `# pacman -Rns`       Elimina un paquete, junto con las dependencias no necesarias.
- `# pacman -S`          Instala un paquete, descargándolo de los repositories.
- `# pacman -Scc`       Elimina todos los paquetes en caché de la base de datos de pacman.
- `# pacman -Sc`        Elimina paquetes ya no disponibles en los repositories de la caché de pacman.
- `# pacman -Sdd`  Fuerza el intento de instalación de un paquete sin dependencias requeridas, cada una de ellas es ignorada. 
- `# pacman -Si`         Muestra la información descriptiva de un paquete disponible en los repositories.
- `# pacman -Sg`        Muestra los grupos de paquetes disponibles.
- `# pacman -Sgg`       Muestra los paquetes presentes en todos los grupos de paquetes disponibles.
- `# pacman -Ss`         Busca un paquete en los repositories.
- `# pacman -Sw`         Descarga un paquete sin instalarlo.
- `# pacman -Sy`         Actualiza la lista de paquetes descargables de los repositories.
- `# pacman -Syu`        Actualiza el sistema, descargando los paquetes más recientes de los repositories.
- `# pacman -Syy`        Actualiza completamente la lista de paquetes descargables de los repositories.
- `# pacman -U`          Instala o Actualiza un paquete local. 
- `# pacman -Uu`      Descarga e instala de forma automática las dependencias de un paquete local.
- `# pacman -U <paquete.tar.xz>`     Instala/actualiza un paquete desde un archivo local.
- `# pacman -Qu --color auto`          Muestra los paquetes que necesitan actualización, resaltando la información más importante con colores.
- `# pacman -Sw <paquete>`            Descarga un paquete específico, sin instalarlo.
- `# pacman -Syu --ignore <paquete>`   Actualiza el sistema, ignorando un paquete específico.
- `# pacman -Sdd <paquete>`          Fuerza el intento de instalación de un paquete sin dependencias requeridas, cada una de ellas es ignorada.


