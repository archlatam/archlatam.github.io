# Pacman - Gestor de Paquetes

Pacman es el gestor de paquetes oficial de Arch Linux.

## Comandos básicos

```bash
pacman -Syu                    # Sincronizar y actualizar todo
pacman -S [paquete]           # Instalar paquete(s)
pacman -R [paquete]           # Eliminar paquete
pacman -Rs [paquete]          # Eliminar con dependencias
pacman -Q                     # Listar instalados
pacman -Qs [texto]            # Buscar en instalados
```

## Opciones útiles

```bash
pacman -Syy                   # Forzar refresh de repos
pacman -Sc                    # Limpiar cache
pacman -Scc                   # Limpiar todo (cuidado)
pacman -Qi [paquete]          # Info de paquete instalado
pacman -Si [paquete]          # Info de paquete en repo
pacman -Qo [archivo]          # ¿Qué paquete tiene este archivo?
```

## Solución de problemas

```bash
# Base de datos corrupta
rm -rf /var/lib/pacman/sync/*
pacman -Syu

# Paquete dañado
pacman -S --force [paquete]

# Dependencias rotas
pacman -Dk
```

## Configuración

Edita `/etc/pacman.conf` para:
- Habilitar multilib (32-bit)
- Añadir repositorios personalizados
- Color, verbose, etc.
