# AUR (Arch User Repository)

ArchLinux es una distribución Linux conocida por su arquitectura modular y ligera, adecuada para usuarios avanzados. Uno de sus puntos fuertes es la enorme disponibilidad de paquetes disponibles a través del sistema de gestión de paquetes Pacman. Sin embargo, no todos los paquetes están presentes en los repositories oficiales y, en estos casos, los usuarios pueden utilizar el AUR (Arch User Repository), una colección de paquetes creados y mantenidos por la comunidad de usuarios de ArchLinux.

Los usuarios son capaces de compilar los paquetes AUR para poder instalarlos en su sistema. A continuación una descripción completa y detallada de cómo este proceso es capaz de funcionar.

**Step 1: Instalación del paquete base-devel**

Para compilar los paquetes AUR en ArchLinux, es necesario instalar el paquete base-devel, que contiene todas las herramientas necesarias para la compilación. Para hacerlo, ejecutar el siguiente comando desde la terminal:

```
sudo pacman -S base-devel
```

Esto instalará todas las herramientas necesarias para la compilación, incluyendo las herramientas básicas del compilador (paquetes como automake, autoconf, gcc, binutils, etc).

**Step 2: Descargar el paquete AUR mediante Git**

Para acceder al paquete AUR, es necesario descargar el archivo PKGBUILD. Este define cómo el paquete debe ser compilado e instalado en el sistema. La forma más simple de hacerlo es utilizar el software de gestión de paquetes AUR, es decir, git.

Lo primero que hay que hacer es instalar git. Para hacerlo, escribir el siguiente comando desde la terminal:

```
sudo pacman -S git
```

Una vez instalado, es posible descargar los paquetes AUR con el siguiente comando:

```
git clone https://aur.archlinux.org/nombrepaquete.git
```

Recuerda reemplazar nombrepaquete con el nombre del paquete que quieres descargar.

**Step 3: Compilar el paquete AUR**

Después de descargar el archivo PKGBUILD, es posible compilar el paquete. Para hacerlo, navegar a la carpeta del paquete AUR, donde se ha descargado el archivo PKGBUILD.

Después de entrar en el directorio de la carpeta del paquete, ejecutar el comando:

```
makepkg -s
```

Esta opción indica a makepkg que instale todas las dependencias necesarias en el momento de la compilación. Las dependencias serán buscadas en los repositories oficiales y en el AUR.

El proceso de compilación se inicie automáticamente. Esto podría llevar un poco de tiempo, dependiendo del tamaño y la complejidad del paquete.

Al final de la compilación, se creará un paquete instalable con extensión .pkg.tar.xz.

**Step 4: Instalar el paquete AUR**

Una vez terminada la compilación, será posible instalar el paquete mediante el siguiente comando:

```
sudo pacman -U nombrepaquete.pkg.tar.xz
```

Donde nuevamente nombrepaquete deberá ser reemplazado por el nombre del paquete generado por el comando makepkg.

**Ejemplos de compilación de paquete AUR**

Para dar un ejemplo de compilación de un paquete AUR, consideremos el paquete Clean.

1. Instala el paquete base-devel como se indicó anteriormente.

2. Instala git con el comando:

```
sudo pacman -S git
```

3. Descarga el paquete Clean mediante Git utilizando el comando:

```
git clone https://aur.archlinux.org/clean.git
```

4. Accede al directorio del paquete clean.

```
cd clean
```

5. Compilación del paquete 

```
makepkg -s
```

6. Instalación del paquete 

```
sudo pacman -U clean*.pkg.tar.xz
```

Estos son los pasos necesarios para compilar e instalar con éxito el paquete Clean. Este ejemplo puede ser utilizado como referencia para la compilación de otros paquetes AUR.
