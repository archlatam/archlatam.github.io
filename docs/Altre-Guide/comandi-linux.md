# Comandos Linux esenciales

Comandos fundamentales para usar terminal en Linux.

## Comandos básicos

```bash
ls              # Listar archivos
cd [dir]        # Cambiar directorio
pwd             # Mostrar directorio actual
mkdir [nombre]  # Crear directorio
rm [archivo]   # Eliminar archivo
rm -r [dir]    # Eliminar directorio recursivamente
cp [origen] [destino]  # Copiar
mv [origen] [destino]  # Mover/renombrar
touch [archivo]        # Crear archivo vacío
cat [archivo]          # Mostrar contenido
nano [archivo]         # Editor de texto
```

## Permisos

```bash
chmod +x [archivo]     # Hacer ejecutable
chown user:group [file]# Cambiar propietario
```

## Sistema

```bash
sudo [comando]         # Ejecutar como root
pacman -Syu            # Actualizar sistema
pacman -S [paquete]   # Instalar paquete
pacman -R [paquete]   # Eliminar paquete
ps aux                # Ver procesos
top / htop            # Monitor de sistema
df -h                 # Espacio en disco
free -h               # Memoria RAM
```

## Red

```bash
ip addr               # Ver direcciones IP
ping [host]           # Probar conexión
curl [url]            # Descargar contenido
wget [url]            # Descargar archivos
ssh user@host         # Conexión remota
```

## Buscar

```bash
find / -name [archivo]    # Buscar por nombre
grep [texto] [archivo]    # Buscar en archivo
locate [archivo]          # Buscar rápidamente
```
