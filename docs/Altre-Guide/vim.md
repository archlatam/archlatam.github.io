# Vim

Vim es un editor de texto disponible en diferentes sistemas operativos, incluida la distribución Arch Linux. Su interfaz de línea de comandos permite modificar archivos de texto de manera rápida y eficiente utilizando una serie de comandos y atajos de teclado.

Vim ofrece numerosas funcionalidades para facilitar la edición de texto, como la copia, el movimiento del cursor y la búsqueda de texto. También dispone de funcionalidades avanzadas como la posibilidad de ejecutar comandos del sistema operativo y personalizar los atajos de teclado.

Además, Vim soporta la sintaxis de colores para una amplia gama de lenguajes de programación, facilitando la lectura y la comprensión del código. Su interfaz de línea de comando le permite trabajar rápidamente también en máquinas con recursos limitados.

Otra característica interesante de Vim es la posibilidad de crear macros, es decir, grabaciones de secuencias de comandos para ejecutar acciones repetitivas de manera automática. Esta función es particularmente útil para la modificación de grandes cantidades de texto.

En general, Vim es una herramienta esencial para los desarrolladores y entusiastas de la programación, pero también para los usuarios comunes que necesitan un editor de texto flexible y potente.

Siendo Vim un editor de texto, sus comandos se utilizan principalmente para la modificación del texto en sí. A continuación se enumeran algunos de los comandos más comunes utilizados dentro de Vim en Arch Linux:

- `:w` - Guarda el archivo que se está modificando.
- `:w!` - Guarda el archivo que se está modificando, aunque sea de solo lectura o en caso de permisos de escritura insuficientes.
- `:q` - Sale del editor.
- `:q!` - Sale del editor sin guardar los cambios en el archivo.
- `:wq` - Guarda el archivo y luego sale del editor.
- `:wq!` - Guarda el archivo y luego sale del editor, aunque sea de solo lectura o en caso de permisos de escritura insuficientes.
- `:set numero` - Muestra los números de línea en el lado izquierdo del editor.
- `:set nonumber` - Elimina los números de línea del lado izquierdo del editor.
- `yy` - Copia la línea actual.
- `p` - Pega el texto copiado de una línea anterior.
- `/palabra` - Busca la palabra especificada en el texto.
- `n` - Pasa a la siguiente ocurrencia de la palabra buscada.
- `N` - Pasa a la anterior ocurrencia de la palabra buscada.
- `u` - Deshace la última modificación realizada.
- `Ctrl + r` - Restaura la última modificación deshecha.
- `:syntax on` - Habilita la sintaxis de colores para el código.
- `:syntax off` - Deshabilita la sintaxis de colores para el código.

- Modificación del texto:
  - `a` - Comienza a insertar el texto inmediatamente después del cursor.
  - `A` - Comienza a insertar el texto al final de la línea actual.
  - `i` - Comienza a insertar el texto en el cursor.
  - `I` - Comienza a insertar el texto al inicio de la línea actual.
  - `o` - Inserta una nueva línea debajo de la línea actual y comienza a insertar texto.
  - `O` - Inserta una nueva línea encima de la línea actual y comienza a insertar texto.
  - `r` - Sustituye un solo carácter debajo del cursor.
  - `s` - Elimina un carácter y comienza a insertar texto en el cursor.
  - `S` - Elimina toda la línea y comienza a insertar texto en el cursor.

- Navegación del texto:
  - `Ctrl + f` - Desplaza hacia adelante una página.
  - `Ctrl + b` - Desplaza hacia atrás una página.
  - `Ctrl + g` - Muestra el número total de líneas y la posición actual.
  - `:set nowrap` - Modifica la alineación del texto para impedir el ajuste automático de las líneas de texto.
  - `:set wrap` - Modifica la alineación del texto para permitir el ajuste automático de las líneas de texto.

- Búsqueda y sustitución:
  - `:%s/palabra_anterior/nueva_palabra/g` - Sustituye todas las ocurrencias de la palabra anterior con la nueva palabra en el documento.
  - `:g/palabra/cambia/nueva_palabra/g` - Busca todas las líneas que contienen la palabra y sustituye la palabra anterior con la nueva palabra solo en estas líneas.

- Comandos avanzados:
  - `:help` - Muestra la guía de Vim en línea.
  - `:version` - Muestra la versión de Vim.
  - `:set` - Muestra todas las configuraciones de Vim actualmente en uso.
  - `:echo "texto"` - Muestra el texto especificado en la consola de Vim.
  - `:w nombre_archivo` - Guarda el archivo con un nuevo nombre.
  - `:r nombre_archivo` - Inserta el contenido del archivo especificado en el documento actual.
  - `:e!` - Recarga el archivo actual sin guardar los cambios.

Estos son solo algunos de los comandos más utilizados en Vim en Arch Linux. Existen comandos más avanzados y personalizables tanto en términos de funcionalidades como de teclas de acceso rápido.
