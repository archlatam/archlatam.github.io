# Yay - AUR Helper

Yay es un helper para el AUR de Archlinux que simplifica considerablemente la gestión de paquetes. El AUR (Arch User Repository) es una colección de paquetes mantenidos por los usuarios de Archlinux, que no son oficialmente soportados por el equipo de desarrollo de Arch.

## ¿Qué es Yay AUR helper?

Yay es una versión avanzada de Yaourt, otra utilidad para la gestión de paquetes AUR. Sin embargo, Yay tiene algunas funcionalidades adicionales que hacen la diferencia, como:

- Instalación automática de las dependencias
- Compatibilidad con pacman, el gestor de paquetes oficial de Archlinux
- Interfaz completa para la gestión de paquetes (instalación, actualización, eliminación y búsqueda)
- Configuración de los ajustes predeterminados a través del archivo yay.conf

## Cómo instalar Yay AUR helper?

```
pacman -S --needed git base-devel
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```

## Lista completa de comandos para Yay

- `$ yay`  *sin opción* - Actualiza la base de datos de paquetes y busca nuevas actualizaciones para los paquetes instalados.
- `$ yay -h` - Muestra la guía de ayuda para Yay.
- `$ yay -S nombre_paquete` - Instala un paquete del repositorio de paquetes.
- `$ yay -Su` - Actualiza solo los paquetes instalados que tienen actualizaciones disponibles.
- `$ yay -Syyu` - Actualiza la base de datos de paquetes y todos los paquetes instalados en el sistema.
- `$ yay -R nombre_paquete` - Elimina un paquete del sistema.
- `$ yay -Rs nombre_paquete` - Elimina el paquete y todas sus dependencias que no son utilizadas por otros paquetes.
- `$ yay -Syu nombre_paquete` - Actualiza solo el paquete especificado.
- `$ yay -Ss nombre_paquete` - Busca un paquete por el nombre.
- `$ yay -Si nombre_paquete` - Muestra información detallada sobre el paquete especificado, como descripción y dependencias.
- `$ yay -Q` - Muestra la lista de paquetes instalados en el sistema.
- `$ yay -Qe` - Muestra solo los paquetes explícitamente instalados por el usuario (excluyendo los instalados como dependencias).
- `$ yay -Ql nombre_paquete` - Muestra los archivos de un paquete especificado.
- `$ yay -Qu` - Verifica si hay actualizaciones disponibles para los paquetes instalados.
- `$ yay -Qdt` - Muestra las dependencias no utilizadas en la caché de paquetes.
- `$ yay -Y` - Descarga y visualiza el PKGBUILD de un paquete especificado sin instalarlo.
- `$ yay -Yc` - Elimina los paquetes almacenados en la caché que no están instalados.
- `$ yay -G nombre_paquete` - Descarga el paquete sin instalarlo.
- `$ yay -P nombre_paquete` - Crea un paquete a partir de las fuentes.
- `$ yay -Sc` - Escaneo en busca de fuentes de datos más antiguas que las actualmente instaladas.
- `$ yay -Sl` - Muestra la lista de los repos de paquetes.
- `$ yay -Syy` - Actualiza la base de datos de paquetes.
- `$ yay -U ` `nombre_archivo_paquete` - Actualiza un paquete instalado o instala un nuevo paquete desde el archivo de paquete local.
- `$ yay -F ` `nombre_paquete` - Recarga los paquetes deshabilitados de forma segura.
- `$ yay -Qm` - Muestra la lista de paquetes AUR instalados en el sistema.
- `$ yay -Rns` - Elimina un paquete y todas sus dependencias, incluyendo las que son utilizadas por otros paquetes de forma segura.
- `$ yay -Sdd` - Instala un paquete y sus dependencias necesarias de forma segura.
- `$ yay -Yc --aur` - Elimina los paquetes de la caché AUR.
- `$ yay -Fyy` - Fuerza la re-sincronización de la caché.
- `$ yay -Fy` - Actualiza los paquetes que se encuentran en la caché del repositorio.
- `$ yay -Scu` - Realiza un escaneo para verificar que los paquetes instalados y las dependencias estén actualizados de forma segura.
- `$ yay -Qkk` - Actualiza la lista de paquetes huérfanos almacenados.
- `$ yay -Scc` - Borra todos los datos de la caché de paquetes.
