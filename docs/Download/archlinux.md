# descargar iso en vivo

## Archiso

![iso](../images/live/iso.png)

Siempre actualizado, desde el servidor.

[Download :fontawesome-regular-circle-down:](https://archlinux.org/download/)

Verificación de firma

Se recomienda verificar la firma de la imagen antes de usarla, especialmente si se descargó de un servidor HTTP, donde las descargas pueden ser interceptadas y enviar imágenes maliciosas. En un sistema con GnuPG instalado, ejecute el siguiente comando para descargar la firma ISO de PGP al directorio del archivo ISO y verificarla con:

`$ gpg --keyserver-options auto-key-retrieve --verify archlinux-version-x86_64.iso.sig`

In alternativa, da un'installazione esistente di Arch Linux eseguire:

`$ pacman-key -v archlinux-version-x86_64.iso.sig`

<br><br><br><br>

## VM image

![iso](../images/live/vm.png)

Imágenes oficiales de máquinas virtuales, la imagen base está destinada para uso local y viene preconfigurada con (usuario: arch - contraseña: arch) y sshd ejecutándose.

[Download :fontawesome-regular-circle-down:](https://gitlab.archlinux.org/archlinux/arch-boxes/-/jobs/artifacts/master/browse/output?job=build:secure)

<br><br><br><br>

## Docker

![iso](../images/live/dck.png)

Imagen oficial de Docker

`docker pull archlinux`

[Download :fontawesome-regular-circle-down:](https://hub.docker.com/_/archlinux)

<br><br><br><br>

## ARM

![iso](../images/live/arm.png)

Arch Linux ARM es una distribución de Linux para computadoras ARM.

[Download :fontawesome-regular-circle-down:](https://archlinuxarm.org/about/downloads)

<br><br><br><br>
