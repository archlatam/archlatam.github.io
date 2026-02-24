# Reflector

La función de `reflector` en ArchLinux es una utilidad que permite seleccionar, descargar y actualizar la lista de mirrors de ArchLinux. Su función principal es seleccionar el mirror más rápido y fiable en función de la posición geográfica del usuario.

A continuación se presentan los comandos más utilizados para la gestión de `reflector` en ArchLinux:

- `sudo reflector --country <nombre_país> --age <edad> --protocol <tipo_protocolo> --sort <tipo_orden> --save <archivo_destino>` Este comando selecciona los mirrors del país especificado por el usuario (`--country`) y con una edad máxima especificada en horas (`--age`). También se puede especificar el tipo de protocolo (`--protocol`) y el tipo de ordenamiento (`--sort`). Finalmente, los resultados obtenidos pueden ser guardados en un archivo especificado por el usuario (`--save`).
- `sudo reflector --latest <n_mejores_mirrors> --protocol <tipo_protocolo> --sort <tipo_orden> --save <archivo_destino>` Con este comando se seleccionan los `n` (`--latest`) mirrors más actualizados, en base al protocolo (`--protocol`) y al tipo de ordenamiento (`--sort`). También en este caso, el resultado puede ser guardado en un archivo especificado por el usuario (`--save`).
- `sudo reflector --help` Con este comando se puede tener una lista completa de todos los comandos disponibles y una descripción detallada de las opciones de `reflector`.

En general, la función de `reflector` en ArchLinux es útil para mantener actualizados los mirrors y asegurarse de tener una conexión rápida y fiable cuando se realizan operaciones de instalación o actualización de paquetes en el sistema.

---

A continuación se presentan los pasos necesarios para configurar y habilitar el servicio `reflector` en ArchLinux:

1. Instalar `reflector`: Escribir `sudo pacman -S reflector` en la terminal para instalar la utilidad.

2. Crear un archivo de configuración personalizado: Escribir `sudo cp /etc/xdg/reflector/reflector.conf /etc/xdg/reflector/reflector.conf.backup` para crear una copia de respaldo del archivo de configuración predeterminado. Después, escribir `sudo nano /etc/xdg/reflector/reflector.conf` para abrir el archivo de configuración con el editor de texto `nano` (también se puede usar otro editor de texto a elección).

3. Configurar el archivo de configuración: En el archivo de configuración es posible especificar las opciones deseadas, como el país del cual seleccionar los mirrors (`--country`), la edad máxima de los mirrors (`--age`), el tipo de protocolo (`--protocol`) y el tipo de ordenamiento (`--sort`). Aquí hay un ejemplo de archivo de configuración:

```
--country Italy
--protocol https
--latest 10
--sort rate
```

Este ejemplo selecciona los 10 mejores mirrors italianos (`--country Italy`), utilizando el protocolo HTTPS (`--protocol https`) y ordenándolos por velocidad (`--sort rate`).

4. Guardar y cerrar el archivo de configuración: Una vez terminada la configuración, escribir `Ctrl+X`, luego `Y` y finalmente `Enter` para guardar los cambios y cerrar el editor de texto `nano`.

5. Ejecutar `reflector` para actualizar las listas de mirrors: Escribir el comando `sudo reflector --verbose --latest 10 --protocol https --sort rate --save /etc/pacman.d/mirrorlist` para ejecutar `reflector` usando la configuración establecida en el paso anterior. En este ejemplo, los resultados obtenidos de la ejecución del comando se guardan en el archivo `/etc/pacman.d/mirrorlist`, que es el archivo desde el cual `pacman` lee la lista de mirrors al momento de actualizar los paquetes.

6. Habilitar e iniciar el servicio `reflector.timer`: Una vez que las listas de mirrors han sido actualizadas con éxito, es posible habilitar e iniciar el servicio de `reflector` para que las listas de mirrors se actualicen automáticamente en el futuro. Para hacer esto, escribir:

```
sudo systemctl enable reflector.timer
sudo systemctl start reflector.timer
```

El primer comando habilita el servicio `reflector.timer`, mientras que el segundo lo inicia inmediatamente. A partir de este momento, el servicio se ejecutará automáticamente cada vez que se inicie el sistema, actualizando las listas de mirrors según la configuración especificada en el archivo de configuración de `reflector`.
