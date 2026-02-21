# Descarga de Arch Linux

## Imagen ISO oficial

Descarga la imagen ISO más reciente de Arch Linux desde el sitio oficial:

- **Página oficial**: https://archlinux.org/download/
- **Mirrors**: https://archlinux.org/download/#mirrors

## Requisitos del sistema

- **Procesador**: x86_64 (64-bit)
- **RAM**: 512 MB mínimo, 2 GB recomendado
- **Espacio en disco**: 2 GB para instalación base, más para sistema de archivos y swap
- **Unidad óptica**: CD/DVD o USB para la instalación

## Verificar la imagen ISO

Después de descargar, verifica la integridad del archivo:

```bash
sha256sum archlinux-x86_64.iso
```

Compara el resultado con el hash publicado en la página de descarga.

## Crear USB booteable

### En Linux

```bash
dd if=archlinux-x86_64.iso of=/dev/sdX bs=4M status=progress oflag=sync
```

### En Windows

Usa herramientas como Rufus o Etcher para crear un USB booteable.

## Siguiente paso

Una vez tengas el USB listo, consulta la guía de instalación:
[Instalación de Arch Linux](arch-guida.md)
