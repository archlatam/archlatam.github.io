# Sistema de Archivos Linux

## Estructura de directorios

```
/              # Raíz (root)
/bin           # Binarios esenciales
/boot          # Archivos de arranque
/dev           # Dispositivos
/etc           # Configuración del sistema
/home          # Directorios de usuarios
/lib           # Bibliotecas esenciales
/media         # Puntos de montaje extraíbles
/mnt           # Punto de montaje temporal
/opt           # Software opcional
/proc          # Información del kernel
/root          # Directorio del root
/run           # Datos temporales del sistema
/sbin          # Binarios del sistema
/srv           # Datos de servicios
/sys           # Información del sistema
/tmp           # Archivos temporales
/usr           # Programas y datos de usuario
/var           # Datos variables
```

## Tipos de sistemas de archivos

- **ext4**: Más común, journaling
- **btrfs**: Copy-on-write, snapshots
- **xfs**: Alto rendimiento, gran escala
- **f2fs**: Optimizado para flash/SSD
- **ntfs**: Compatibilidad con Windows
- **vfat**: USBs y tarjetas SD

## Montaje

```bash
mount /dev/sdX1 /mnt        # Montar partición
umount /mnt                # Desmontar
lsblk                      # Listar bloques
fdisk -l                   # Ver particiones
```

## Ver espacio

```bash
df -h           # Espacio usado/disponible
du -sh [dir]    # Tamaño de directorio
```
