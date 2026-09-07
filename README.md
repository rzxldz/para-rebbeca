# Experiencia Web Interactiva

Experiencia web interactiva desarrollada como un proyecto personal que combina música, animaciones, narrativa y diferentes elementos de interacción para crear un recorrido digital personalizado.

El proyecto está diseñado como una experiencia progresiva en la que el contenido se revela por etapas, desde una pantalla de bienvenida hasta una sección final de cierre.

---

## Concepto

La experiencia utiliza la música como elemento principal de la narrativa.

El usuario recorre una colección de **40 canciones**, organizadas en diferentes capítulos, donde cada canción cuenta con contenido y elementos interactivos propios.

El objetivo fue crear una experiencia diferente a una página web tradicional, utilizando animaciones, transiciones y navegación progresiva para acompañar el recorrido.

---

## Flujo de la experiencia

La navegación se divide en cuatro etapas principales:

**Inicio → Canciones → Carta → Final**

La experiencia comienza con una pantalla de carga y bienvenida, continúa con una introducción interactiva y posteriormente presenta la colección musical antes de llegar a la sección final.

---

## Pantalla de carga

Antes de mostrar el contenido principal aparece una pantalla de carga animada.

Durante este proceso se preparan diferentes recursos necesarios para la experiencia, incluyendo:

- Logo de Spotify.
- Portadas de canciones.
- Fuentes.
- Recursos multimedia.

La pantalla incluye una animación de carga, barra de progreso y una transición hacia la bienvenida.

También cuenta con un tiempo máximo de seguridad para evitar que la página permanezca cargando indefinidamente si algún recurso presenta un problema.

---

## Pantalla de bienvenida

Después de la carga aparece una pantalla de bienvenida que introduce al usuario a la experiencia.

Desde esta sección se puede:

- Entrar a la experiencia.
- Continuar desde el progreso guardado anteriormente.

La opción de continuar aparece cuando existe información almacenada sobre el progreso del usuario.

---

## Introducción interactiva

La introducción presenta el concepto principal de la experiencia mediante una combinación de texto, animaciones y elementos visuales.

Al interactuar con el elemento principal de esta sección comienza una animación en la que diferentes flores aparecen progresivamente hasta formar un corazón.

Posteriormente se muestra una dedicatoria y el botón para comenzar el recorrido musical.

---

## Las 40 canciones

La parte principal del proyecto consiste en una colección de **40 canciones elegidas individualmente**.

Las canciones están organizadas en cinco capítulos narrativos:

### Capítulo 1 — Cuando empecé a fijarme en ti

Representa el comienzo de los sentimientos y las primeras emociones.

### Capítulo 2 — Todo lo que provocas en mí

Enfocado en emociones, nervios y sensaciones relacionadas con pensar en otra persona.

### Capítulo 3 — Lo que imagino contigo

Representa momentos, lugares y experiencias que sería bonito compartir.

### Capítulo 4 — Lo que quiero ofrecerte

Enfocado en cariño, tranquilidad, sinceridad y compromiso.

### Capítulo 5 — Lo que no sé decirte directamente

Las canciones finales buscan expresar emociones que pueden resultar difíciles de comunicar únicamente mediante palabras.

Cada capítulo contiene ocho canciones.

---

## Tarjetas interactivas

Cada canción cuenta con una tarjeta interactiva que puede incluir:

- Número de canción.
- Portada.
- Nombre.
- Artista.
- Fragmento de audio.
- Minuto dedicado.
- Letra seleccionada.
- Traducción cuando está disponible.
- Dedicatoria personal.
- Sistema de favoritos.
- Enlace para escuchar la canción completa en Spotify.

La intención es que cada canción forme parte de la narrativa general de la experiencia.

---

## Animaciones

Las tarjetas de canciones utilizan diferentes animaciones y transiciones para que el contenido aparezca progresivamente.

Se utilizan técnicas como:

- `clip-path`
- Escalado.
- Opacidad.
- Desenfoque.
- Transformaciones.
- Movimiento.
- Transiciones CSS.

La portada y los diferentes elementos de cada tarjeta aparecen de manera progresiva para crear una sensación de construcción de la interfaz.

---

## Navegación y desplazamiento

La navegación está diseñada para mantener un ritmo específico durante el recorrido.

Al cambiar de canción:

1. Aparece la nueva portada.
2. La página se posiciona automáticamente en la sección correspondiente.
3. Se muestra la portada durante un breve periodo.
4. La pantalla realiza un desplazamiento suave hacia el contenido.

Esto permite que el usuario se concentre en cada canción sin tener que desplazarse manualmente hasta la siguiente sección.

---

## Reproductor de audio

Los fragmentos musicales utilizados durante la experiencia se reproducen mediante archivos de audio locales.

Los recursos de audio se encuentran dentro de:

```text
public/audio/
