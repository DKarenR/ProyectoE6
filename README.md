//Descripción detallada del propósito del proyecto

Este proyecto consiste en una página web musical interactiva que permite a los usuarios explorar diferentes canciones y sus álbumes favoritos, 
reproducir canciones de forma constante, intuitiva y envolvente, navegar entre diversas vistas como el inicio, la vista de álbumes de diferentes 
artistas y el perfil del usuario. Está dirigido a personas que desean una experiencia sencilla y visual para descubrir y escuchar música sin necesidad 
de aplicaciones complejas. Utilizando tecnologías web estándar (HTML, CSS y JavaScript) y archivos JSON para almacenar datos, el proyecto ofrece una 
interfaz dinámica que actualiza el contenido sin recargar la página, mejorando la experiencia de usuario.

//Instrucciones para su instalación

Para “instalar” este proyecto, primero asegúrate de contar con un navegador moderno como Google Chrome o Mozilla Firefox. Descarga el proyecto completo 
desde el repositorio o sitio web (puedes clonar el repositorio desde tu consola/terminal). La estructura incluye carpetas ordenadas, como “Statics” 
donde están los estilos (css en “styles”), “Dynamics” con los archivos de JavaScript y JSON que contienen los datos de artistas y álbumes (dentro de 
“js”), y “Templates” con los archivos en HTML.

 // Configuración y ejecución
 
Para ejecutar la página, simplemente abre el archivo “vistainicial.html” en Templates, copia el link (path) del archivo y ponlo en la barra de búsqueda 
del navegador. En caso de que al darle enter te aparezca como “página web no encontrada” debes cambiar la parte principal (xampp/htdocs/) por “localhost” 
para poder navegar sin problemas (ésto debido al API de youtube al que está ligada nuestra página web).
La página cargará y mostrará la vista inicial, teniendo del lado superior en la izquierda, el video predeterminado en el reproductor (“El baile del 
sapito”); justo debajo tendrás la selección de mixes, donde podrás ver diferentes canciones dependiendo del mix que selecciones. Varias canciones, álbumes 
y artistas recomendados (aleatorios que cambiarán al recargar la página nuevamente) estarán del lado derecho de la pantalla.
Al hacer clic en un artista, la página mostrará dinámicamente sus álbumes usando JavaScript y datos del archivo JSON ubicado en /js/baseDeDatos.js.
Puedes moverte a través de artistas, álbumes, canciones y la vista principal con mayor rapidez usando el botón hamburguesa ubicado del lado izquierdo de 
la pantalla, las imágenes en cada botón te ayudarán a entender incluso sin el texto debajo de éstos.

Nota: Si sabes al respecto de cómo manejar código, puedes modificar el archivo JSON para agregar, eliminar o editar artistas y álbumes, solo debes 
recargar la página para ver los cambios.

// Lista de tecnologías utilizadas

HTML: Estructura y base para el contenido web.
En nuestro proyecto, HTML define todos los elementos visibles e invisibles: encabezados, botones, secciones, imágenes, listas, reproductores, etc. 
Se usaron etiquetas que tienen significado, lo que ayuda tanto a los navegadores como a las personas a entender mejor el contenido. Esto nos ayudó no 
solo a mejorar la organización visual, sino también la accesibilidad de la misma página.

CSS: Para dar estilos visuales, colores, disposición en pantalla, y hacer la página responsive y atractiva.
En el proyecto usamos CSS para crear un diseño coherente y atractivo, hacer que la web se vea bien en computadoras, tabletas y celulares (diseño 
responsivo), aplicar estilos a botones, listas, imágenes de artistas, y más.

JavaScript: Para manipular el DOM, responder a eventos del usuario, cambiar vistas dinámicamente sin recargar la página, y cargar datos desde JSON.
En el proyecto lo usamos para cambiar de vista (inicio, artista, álbum, perfil), detectar y responder a clics en botones, ocultar y mostrar secciones 
(divs), cargar información desde archivos JSON para mostrar artistas, álbumes y canciones, generar contenido HTML desde JS dinámicamente. También usamos 
métodos como document.querySelector(), createElement() y appendChild() para construir elementos en tiempo real.
JSON: Formato de texto ligero usado para almacenar datos de artistas, álbumes y canciones, fácil de leer y modificar.
Usamos archivos .json para almacenar: nombres de artistas, álbumes asociados, canciones, imágenes de portada. El archivo JSON es leído por JavaScript y 
se transforma en elementos visuales en la página.
Herramientas de desarrollo: Editor de código (Visual Studio Code), navegador con consola de desarrollo (terminal en/de bash), XAMPP para pruebas locales.

//Integrantes del equipo y  aportación al proyecto:

Luis Pablo Fernández Aguirre:
Fue el protagonista en cuanto a la integración del grupo y la comunicación del mismo.
Del proyecto, fue el encargado de:
Barra lateral a la izquierda de la pantalla: botón hamburguesa y despliegue del menú de opciones del mismo
Reproductor de música (toda la sección)
Cambios de vista: vista de álbum, álbumes de los artistas (solución de problemas, apoyo)
Barra de búsqueda (apoyo)

Hatsi López:
Aunque a veces estaba callado, trabajó bastante y preguntó de la misma manera a los asesores.
En cuanto al proyecto:
Barra de búsqueda y su función principal
Lógica para canciones, álbumes y artistas aleatorios en vista Inicial (apoyo)
Vista de mixes

Gabriela Abigail Escamilla Flores:
También estaba callada la gran mayoría del tiempo, pero se encargó de apoyar en todo lo que podía
En el proyecto, se encargó de:
Vistas: inicial, artistas, álbumes y retorno a vista de inicio en el despliegue del botón hamburguesa, de perfil al presionar el botón del logo de 
nuestra página (lado superior derecha)
Lógica para canciones, álbumes y artistas aleatorios en vista Inicial 
Creación de pseudo base de canciones, artistas, álbumes y géneros

Frida:
Mayormente callada y reservada en cuanto lo que estaba haciendo, hizo la parte más larga.
Del proyecto:
Vistas y lógica del perfil de usuario (registro e inicio de sesión con cookies) para usarlo como “base de datos” temporal.

Diana Karen Rivera:
También se mantuvo callada y reservada con lo que hacía, hizo muchas cosas. Pero la gran mayoría fueron cosas descartadas por eficiencia (se explica más 
abajo).
En cuanto al proyecto:
Vistas: de álbumes del artista, álbum (sólo), (se eliminaron por eficiencia en cuanto al reproductor de video, se decidió que era mejor mantener el 
reproductor en un div, las vistas se harían con ayuda de eventos que cambiaran de div en div dependiendo del botón seleccionado y el id del mismo)
Canciones, álbumes y artistas aleatorios (ya se había terminado en el Hatsi y Gabriela para ése entonces)
Botón de nuevas opciones.
Vista de álbumes de los artistas.
Cambio del estilo del cursor en la página.
