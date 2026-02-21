# AUR - Arch User Repository

El AUR es un repositorio comunitario con miles de paquetes.

## ¿Qué es el AUR?

Es una colección de scripts de construcción (PKGBUILDs) mantenidos por usuarios de Arch Linux. Permite instalar paquetes no disponibles en los repositorios oficiales.

## Usando el AUR

### Manualmente

```bash
# 1. Descargar
git clone https://aur.archlinux.org/[paquete].git

# 2. Entrar al directorio
cd [paquete]

# 3. Construir e instalar
makepkg -si
```

### Con ayudantes (AUR helpers)

Recomendados: **yay**, **paru**, **pamac**

```bash
# Con yay
yay -S [paquete]

# Con paru
paru -S [paquete]
```

## Buscar paquetes

- https://aur.archlinux.org
- `yay -Ss [busqueda]`
- `paru -Ss [busqueda]`

## Seguridad

- Revisa el PKGBUILD antes de instalar
- Solo usa ayudantes de confianza
- Cuidado con scripts maliciosos

## ¿Paquetes favoritos?

Los más populares incluyen:
- google-chrome
- visual-studio-code-bin
- discord
- spotify
- teamviewer
- slack-desktop
