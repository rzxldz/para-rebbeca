"use client";

import {
  useEffect,
  useRef,
  useState,
  type SyntheticEvent,
} from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  type PanInfo,
} from "motion/react";


const flowers = Array.from({ length: 42 }, (_, index) => {
  const angle = (Math.PI * 2 * index) / 42;

  const x = 16 * Math.sin(angle) ** 3;

  const y =
    13 * Math.cos(angle) -
    5 * Math.cos(2 * angle) -
    2 * Math.cos(3 * angle) -
    Math.cos(4 * angle);

  return {
    id: index,
    left: `${50 + x * 2.3}%`,
    top: `${48 - y * 2.3}%`,
  };
});

type Song = {
  number: string;
  title: string;
  artist: string;
  cover: string;
  startTime: string;
  endTime: string;
  lyrics: string;
  translatedLyrics?: string;
  message: string;
  spotifyUrl: string;
};

function formatSeconds(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

const songs: Song[] = [
  {
    number: "01",
    title: "BENDITA SEA LA HORA",
    artist: "PARDOPARDO",
    cover: "/covers/bendita-sea-la-hora.jpg",
    startTime: "1:55",
    endTime: "2:27",
    lyrics: `Contigo e' lo mejor, la conexión es otra cosa
Porque, flaca, tú estás preciosa
Por ti me salgo de mi zona
Siento que solo contigo aprendí qué es amor

Qué es amor, qué es amor
Te encontré, uh, te encontré, uh
Qué es amor, qué es amor
Me enamoré, uh, me enamoré, uh`,
    message:
      "Te dedico esta parte porque contigo siento una conexión distinta, de esas que aparecen sin avisar y hacen que todo se sienta más bonito. Me haces querer salir de mi zona de confort y ser más sincero con lo que siento. No sé a dónde nos lleve esto, pero me alegra mucho haberte encontrado.",
    spotifyUrl:
      "https://open.spotify.com/track/3WSmQtAcuTqfsSUjy5CKar?si=9c1ce9dd74db45ba",
  },

    {
    number: "02",
    title: "LA QUE ME GUSTA",
    artist: "Los Amigos Invisibles",
    cover: "/covers/la-que-me-gusta.jpg",
    startTime: "2:00",
    endTime: "3:59",
    lyrics: `Te haré sentir tan especial
Ya nada será muy normal
Y nunca te arrepentirás, mi vida
Con todo lo que sale mal
Buscando de qué conversar
La niña me miró y se sonrió

Ay, ay, ay
Le gusté a la que me gusta
Ay, ay, ay
Y a ella nada, que se asusta`,
    message:
      "Te dedico esta canción porque me recuerda a esa mezcla de emoción y nervios que siento cuando aparece un mensaje tuyo. Hasta una conversación sencilla contigo, una nota de voz o una foto en la que sonríes puede cambiarme el ánimo. Aunque todavía no nos conocemos en persona y no sé exactamente qué piensas de mí, me encanta imaginar que esto podría convertirse en algo muy bonito.",
    spotifyUrl:
      "https://open.spotify.com/track/1q3AYHVLtrry7SDdRHoYnx?si=e77b919cc2ce4f39",
  },
  {
  number: "03",
  title: "NADIE MÁS!",
  artist: "NSQK",
  cover: "/covers/nadie-mas.jpg",
  startTime: "2:06",
  endTime: "4:09",
  lyrics: `Bebé, me tienes a tus pies
De rodillas, mujer maravilla
Me matas y luego regresas la vida
Oscuro en el mundo, tú llegas y brillas
Lo sé (lo sé), lo sé

Que yo no quiero perderte, hago lo posible
Alguien como tú, ey, nada debatible
Camino descalzo, crímenes terribles
Acabo con el mundo si tú me lo pides

Tengo mis bancarias, gástatelo en ti, yeah
Carolina Herrera, Gucci, Louis V, yeah
Yo te quiero a ti, yeah
Dije: "yo te quiero a ti", yeah

Porque eres tú, no quiero a nadie más (nadie más, nadie más)
Porque eres tú, no quiero a nadie más (nadie más, nadie más)
Porque eres tú, no quiero a nadie más (nadie más, nadie más)`,
  message:
    "Te dedico esta parte porque, desde que llegaste, tienes una forma muy especial de destacar entre todas las demás. Me gusta cómo puedes hacer que un momento normal se sienta diferente y cómo, sin darte cuenta, consigues que piense en ti todo el tiempo. No sé qué vaya a pasar entre nosotros, pero ahora mismo eres tú y no quiero a nadie mas!.",
  spotifyUrl:
    "https://open.spotify.com/track/0HWyOfh3Q08UreN155KmRZ?si=f0aa3e63ec2b4a18",
},
{
  number: "04",
  title: "CHICA ESPACIAL",
  artist: "Manuel Medrano",
  cover: "/covers/chica-espacial.png",
  startTime: "0:45",
  endTime: "3:06",
  lyrics: `Tú eres mi chica espacial
Lo quiero todo contigo
Ya no me importan las demás, ninguna es tan especial
Baby, quédate conmigo

Tú eres mi fantasía, mi deseo más grande
La luz que alumbra mi destino
Dame una oportunidad de conquistarte
Regálame tu corazón, volvámonos amantes

Como tú no hay otra igual
Y el cielo no se compara con el brillo de tus ojos
Déjame comerte a besos por todo tu cuerpo`,
  message:
    "Te dedico esta canción porque, incluso a la distancia, tienes algo que te hace diferente. Me encanta conocerte por lo que me cuentas, por cómo escribes y por esa sonrisa que descubro en las fotos que me mandas. Quiero seguir conociéndote sin apresurar nada y comprobar, cuando por fin nos veamos, si esta conexión se siente todavía más especial. Me gustaría tener la oportunidad de poder conquistarte poco a poco y descubrir hasta dónde podría llegar esto que siento por ti.",
  spotifyUrl:
    "https://open.spotify.com/track/6glmRJA6X1SbqtXRbPKlL5?si=91005f664bd14a91",
},
{
  number: "05",
  title: "REINA PEPIADA",
  artist: "Álvaro Díaz",
  cover: "/covers/reina-pepiada.png",
  startTime: "1:45",
  endTime: "4:04",
  lyrics: `Ah, ah-ah
A mí
Me haces sentir
Cosas que nunca
Había sentido
No hace sentido`,
  message:
    "Te dedico esta canción porque desde que te conocí me haces sentir cosas que jamás había sentido. Hay algo en ti que me emociona, me desconcierta y al mismo tiempo me hace querer acercarme cada vez más. Tal vez todavía no sepa explicar exactamente lo que provocas en mí, pero sí sé que contigo todo se siente diferente.",
  spotifyUrl:
    "https://open.spotify.com/track/3yJ8buQlPzQtHyCicOGDJ0?si=b4fe1b1ed0094736",
},
{
  number: "06",
  title: "CORAZÓN",
  artist: "Danny Ocean",
  cover: "/covers/corazon.png",
  startTime: "2:10",
  endTime: "2:43",
  lyrics: `Y ahora cómo te digo que me enamoré

De tu piel, de tu boca
De cómo hablas, de tus cosas
De cómo esquivas los "te quiero"
Tú me encanta' porque estás loca
De tu voz, de tus miedos
De tus victorias y tus derrotas
Fue tan fácil para ti Enamorarme con tu corazón`,
  message:
    "Te dedico esta canción porque me he ido encariñando con los detalles que conozco de ti cuando hablamos: tu manera de expresarte, tu forma de pensar, tus ocurrencias y todo eso que te hace diferente. Aunque todavía no nos hemos visto en persona, lograste entrar en mi vida y empezar a ocupar un lugar muy especial.",
  spotifyUrl:
    "https://open.spotify.com/track/2339UOI2SU3L1nJtUnx0GF?si=57eb6d2fff014b57",
},
{
  number: "07",
  title: "NO VOY A JUGAR",
  artist: "Eslabón Armado",
  cover: "/covers/no-voy-a-jugar.jpg",
  startTime: "1:06",
  endTime: "3:53",
  lyrics: `Yo te quiero dar
La playa, la Luna, lo que quieras
Yo soy bien sincero, no voy a jugar
Ni por coraje te voy a hacer llorar

Y si te preguntas
Que si yo te quiero, voy a contestar
Con más de mil besos, te los voy a dar
Estaré por ti en buenas y malas`,
  message:
    "Te dedico esta canción porque quiero que sepas que mis intenciones contigo son sinceras. No quiero jugar con lo que sientes ni hacerte perder el tiempo. Me gustaría estar para ti en los momentos buenos y también en los difíciles, y demostrarte con acciones que puedes confiar en mí.",
  spotifyUrl:
    "https://open.spotify.com/track/027Ux04z3yNfLRQC6J1Cwf?si=f8b8df186ba04ec1",
},
{
  number: "08",
  title: "CARRETERA <3",
  artist: "EVÍC",
  cover: "/covers/carretera.png",
  startTime: "1:16",
  endTime: "3:01",
  lyrics: `Tranquila, yo te cuido, cero estrés, mi amor
Si quieres, yo cocino lo que sea mejor, pa' conquistarte
Déjame amarte

Tú dices "vamos lento", y yo lo intento
Me imagino todo eso porque aún no lo tengo
Soy tan intenso, no te comprendo
¿Qué pasa por tu mente cuando yo te pienso?

Qué larga la carretera
Las curvas de tu cuerpo no tienen frontera
Estar aquí contigo es lo que más quisiera
Quédate conmigo hasta que amanezca

Qué larga la carretera
Las horas son segundos si te tengo cerca
Estar aquí contigo es lo que más quisiera
Quédate conmigo hasta que amanezca`,
  message:
    "Te dedico esta canción porque, aunque sé que puede que quieras que fuera con calma, a veces no puedo evitar imaginar todo lo bonito que podríamos vivir cuando por fin nos veamos. Me nace cuidarte, hacerte sentir tranquila y demostrarte poco a poco lo importante que eres para mí, incluso desde la distancia. Tenerte cerca todavía es algo que imagino, pero es uno de los momentos que más ilusión me hace.",
  spotifyUrl:
    "https://open.spotify.com/track/71d7FT8gmE0aD6NQgZ7xyv?si=f9abdfb672e54970",
},
{
  number: "09",
  title: "NO MOLESTAR",
  artist: "Reik",
  cover: "/covers/no-molestar.jpg",
  startTime: "1:45",
  endTime: "2:37",
  lyrics: `Verte despertar con la vista al mar
Que en la puerta diga: No molestar
Escucharte decir en voz alta
Que uh, uh-uh-uh

Luego de pedir de desayunar
Poner en repeat ese mismo plan
Un domingo contigo me encanta
Uh-uh, uh-uh-uh`,
  message:
    "Te dedico esta canción porque me encanta imaginar esos momentos simples contigo: despertar juntos, desayunar sin prisas y olvidarnos por un rato de todo lo demás. No necesito un plan perfecto ni algo demasiado complicado; con tenerte cerca, hasta un domingo tranquilo podría convertirse en uno de mis días favoritos.",
  spotifyUrl:
    "https://open.spotify.com/track/2jnJDn6efkVJ99hCQUs1Ea?si=46d1deaf35894d17",
},
{
  number: "10",
  title: "SOY YO",
  artist: "Luis Miguel",
  cover: "/covers/soy-yo.png",
  startTime: "2:07",
  endTime: "3:55",
  lyrics: `Si un día el universo completo tú quieres, te doy
No olvides un loco en el mundo tú tienes, yo soy
Quien más te ha anhelado
Y más te ha esperado
Soy yo

Aquel que una estrella del cielo te quiere bajar
Quien solo el tenerte despierta con ganas de amar
Quien más se te arrima
Y más te adivina
Soy yo`,
  message:
    "Te dedico esta canción porque quiero que sepas que hay alguien dispuesto a darte lo mejor de sí, a esperarte, cuidarte y demostrarte lo importante que eres. Tal vez no pueda bajarte una estrella del cielo, pero sí puedo hacer todo lo posible para que cada momento contigo se sienta especial.",
  spotifyUrl:
    "https://open.spotify.com/track/7gQfSsnHaLcZLvr16L1fYw?si=88f0c9b2e0604689",
},
{
  number: "11",
  title: "LINDA",
  artist: "Mario Bautista",
  cover: "/covers/linda.jpg",
  startTime: "1:28",
  endTime: "3:54",
  lyrics: `Y si oportunidad me dieras una
Tú serías la dueña de mi luna
Quédate y te convenceré
Por si te queda alguna duda

Linda, eres más que linda
Maravilla que siempre brilla donde va
De las que se fija en las cosas sencillas
Tú mereces un man de verdad`,
  message:
    "Te dedico esta canción porque me encanta todo eso que he ido conociendo de ti: tu forma de hablar conmigo, las cosas sencillas que me cuentas y esa sonrisa que veo cuando me mandas una foto. Me pareces increíblemente linda, pero no solo por cómo te ves, sino también por la persona que descubro en cada conversación. Cuando por fin nos veamos, me encantaría seguir demostrándote poco a poco lo especial que eres para mí. Y si me dieras una oportunidad, me encantaría demostrártelo poco a poco.",
  spotifyUrl:
    "https://open.spotify.com/track/6E54oFagpeH6IVFsUgfLTI?si=8f4de08fe4274458",
},
{
  number: "12",
  title: "ME LATE",
  artist: "Alleh, Yorghaki",
  cover: "/covers/me-late.jpg",
  startTime: "1:21",
  endTime: "3:00",
  lyrics: `Tú me enseñaste que era para más
Seamos tú y yo, dime quién lo evita
Pa' que dudar, si llegamos hasta aquí
Deja de pensar, baby

Que tu boca sí me late
Late que, late y voy
Si me llamas pa' darte, en verdad, sí me late
¿Cómo hago pa' verte hoy?
Si quedamos pa' vernos, en verdad, sí me late
Late que late, y voy
Si me llamas pa' darte, en verdad, sí me late

Sí me late
Me late tú y yo, escondidos
Solitos en casa, te invito, ven y pasa
Pa' donde no hace ruido
Tú y yo, donde no hace ruido

Así que
Dame, dame, dame la oportunidad
De que te enamorarás
Imaginando nuestra vida`,
  message:
    "Te dedico esta canción porque me encantaría que nos diéramos la oportunidad de descubrir qué podría pasar entre nosotros. A veces siento que pensamos demasiado las cosas, cuando quizá solo hace falta dejarnos llevar un poco. Me late la idea de tú y yo, de seguir conociéndonos y de imaginar todo lo bonito que podríamos construir juntos.",
  spotifyUrl:
    "https://open.spotify.com/track/6yvC6eDToeKUnrWwl0JU46?si=81c6e716ec714f12",
},
{
  number: "13",
  title: "NO PUEDO DEJAR DE DECIR QUE TE QUIERO",
  artist: "Méne",
  cover: "/covers/no-puedo-dejar-de-decir-que-te-quiero.png",
  startTime: "2:46",
  endTime: "5:22",
  lyrics: `Quiero que sepas que pienso, que pienso, que pienso en ti
Quiero que escuches que pienso en ti
Quiero que digas que pienso en ti
Que veo al cielo y pienso en ti
Quiero que sepas que pienso, que pienso, que pienso en ti

Quiero jurarte que hay tiempos mejores para que ya no llores
Para que crezcan flores en tus huellas y donde dejes lágrimas haya una estrella
Que olvides tus errores, se queden en el pasado
Quiero que el mundo te quiera como yo lo hago
Ojalá que el mundo viera como tú lo miras
Y puedas dormir tranquila aunque no esté a tu lado
Y sé que no te debo nada a ti
Y que no me pides nada a mí
Pero quiero darte todo
Y yo quiero verte sonreír hasta el último respiro
Así es el amor`,
  message:
    "Te dedico esta canción porque, aunque no siempre encuentre las palabras correctas, quiero que sepas que pienso mucho en ti. Me importa saber que estás bien y me alegra cuando me escribes, hablamos o me mandas una foto sonriendo. Aunque todavía no pueda acompañarte en persona, quiero estar presente en tus días bonitos y también cuando las cosas no sean tan fáciles. No espero que me debas nada; simplemente me nace darte cariño y demostrarte lo especial que eres para mí.",
  spotifyUrl:
    "https://open.spotify.com/track/0H5VvDGOVbHFGuxCTQ41FD?si=be5f9018cb9244f0",
},
{
  number: "14",
  title: "FLORES",
  artist: "LATIN MAFIA",
  cover: "/covers/flores.png",
  startTime: "1:19",
  endTime: "2:40",
  lyrics: `Sigo pensando qué flores llevar
Dime dónde las paso a dejar
Le llevo una flor a tu mamá
Para agradecer que te vino a crear
Solo quiero complacerla
Que se sienta toda una reina
Que yo me muero si me besa
Le doy mi vida, si usted me deja

Te estoy esperando, baby, dime dónde
Llevo flores, mereces flores`,
  message:
    "Te dedico esta canción porque siento que mereces flores, detalles y todas esas pequeñas cosas que pueden alegrarte el día. Me encantaría consentirte, hacerte sentir especial y agradecer que exista alguien como tú. No se trata solamente de llevarte flores, sino de demostrarte con acciones lo mucho que me importas.",
  spotifyUrl:
    "https://open.spotify.com/track/1dyA1Re4QEQQWGDDT7h9TK?si=591c8110c05d455b",
},
{
  number: "15",
  title: "VIERNES 13",
  artist: "Marcos Menchaca",
  cover: "/covers/viernes-13.jpg",
  startTime: "1:17",
  endTime: "2:57",
  lyrics: `Y me llevas lentamente a imaginar
A una vida donde tú puedas estar
Y me llevas lentamente a imaginar
A una vida donde te pueda cuidar

Porque si no es contigo, no es con nadie más
Es algo que tú nunca, nunca entenderás
Con alguien más yo no me puedo conformar
Sabiendo que alguien va a tomar mi lugar
Nadie te verá como yo te voy a ver
Quiero cumplir las cosas que acordamos en hacer
Y si la vida me da a escoger
Te escojo a ti otra vez`,
  message:
    "Te dedico esta canción porque, cuando pienso en ti, inevitablemente empiezo a imaginar todo lo bonito que podríamos vivir juntos. Me nace cuidarte, acompañarte y construir momentos que algún día podamos recordar con una sonrisa. Si la vida me diera la oportunidad de elegir, te elegiría a ti para descubrir hasta dónde puede llegar esta historia.",
  spotifyUrl:
    "https://open.spotify.com/track/36ZEFaqp4vVd8VYhvvO4oK?si=59307e3546b945da",
},
{
  number: "16",
  title: "AMOR",
  artist: "Emmanuel Cortes",
  cover: "/covers/amor.png",
  startTime: "0:35",
  endTime: "3:19",
  lyrics: `Mami, eres lo que quiero
Cuando veo tu sonrisa
Y es lo que me debilita
Quiero llevarte a una cita

Yo te quiero enseñar todo
El amor que yo te tengo
Tan sencilla que tú eres
Para mí, tú eres perfecta

Yo te quiero amar
Te quiero enseñar el amor y más
Y eres perfecta
Tu cuerpo hermoso que luce tan bello
Y esos ojitos, ni se diga más
Ni se diga más
`,
  message:
    "Te dedico esta canción porque tu sonrisa, incluso cuando la veo en una foto, tiene una forma muy especial de alegrarme. Me encantaría que nuestra primera vez viéndonos fuera una cita bonita, sin presión, para seguir conociéndote fuera de la pantalla. Mientras llega ese momento, quiero seguir descubriendo esos detalles sencillos que te hacen ser única.",
  spotifyUrl:
    "https://open.spotify.com/track/0hkoQgoqic1qQtxPOudmrx?si=53ddb0b7b05d4df8",
},
{
  number: "17",
  title: "LA MAGIA",
  artist: "Little Jesus",
  cover: "/covers/la-magia.jpg",
  startTime: "2:48",
  endTime: "4:05",
  lyrics: `Si no tenemos nada, siempre podemos aportar
Yo las canciones y tú la magia

No, no puede ser, ¿qué vas a hacer?
Te quiero volver a conocer
Si no tenemos nada, siempre podemos aparecer
Yo las canciones y tú la magia
Yo las canciones y tú la magia
Yo las canciones y tú la magia`,
  message:
    "Te dedico esta canción porque siento que tú tienes esa magia que vuelve especial cualquier momento. Yo puedo poner las canciones, los detalles y todas las ganas de conocerte, pero eres tú quien hace que todo cobre sentido. Me encantaría seguir descubriendo esa magia que tienes y crear contigo recuerdos que sean solo nuestros.",
  spotifyUrl:
    "https://open.spotify.com/track/3XJmD5suzFUBHJ7sizBAiy?si=a09b01a7f80343f7",
},
{
  number: "18",
  title: "309",
  artist: "NSQK",
  cover: "/covers/309.jpg",
  startTime: "1:03",
  endTime: "3:34",
  lyrics: `Quiero ser tu libro favorito
Ser tu luz en el abismo
Ser tu sueño más bonito
Pero rómpeme en pedazos tan pequeños como arena
Sin tu amor mi vida simplemente no vale la pena

Uno, dos, uno, dos
Levanto mi voz, parece que aún no me escuchas
Uno dos, uno dos
¿Ahí está mejor? Perdón, que pasé por un túnel
Uno dos, uno dos
Te juro que yo siempre estaré cuando estás
Uno, dos, uno, dos
Te juro que no, no hay ni una persona más`,
  message:
    "Te dedico esta canción porque quiero ser alguien importante en tu vida, alguien con quien puedas sentirte acompañada, escuchada y querida. Aunque a veces no encuentre la forma perfecta de decirte lo que siento, quiero que sepas que mi intención es estar para ti y demostrarte que, para mí, no hay nadie más como tú.",
  spotifyUrl:
    "https://open.spotify.com/track/0q37bjxhRwzjtZynlU9ZsI?si=0240a94f559e4084",
},
{
  number: "19",
  title: "COSAS QUE NO TE DIJE",
  artist: "SAIKO",
  cover: "/covers/cosas-que-no-te-dije.png",
  startTime: "0:18",
  endTime: "3:44",
  lyrics: `Vamos a escribir nuestras iniciales juntas (Eh)
La verdad que tú me gustas
En invierno y en verano y
Si te hago la pregunta
El horóscopo dice que somos compatibles
Y eso que yo no creía, pero habrá que hacerle caso
Y yo te aviso como subas otra foto en la playa te caso
Mami, dime si te gusto solo por si acaso
Que de tanto perder le perdí el miedo al fracaso y (Je)
Estoy pensando si dеcirte que me gustas tanto
Quе me gustas tanto

Que yo te quiero dormida en la cama con mi hoodie
Dime si te gustaría, quiero ser todos tus hobbies mami (Mami)
Solo una cosa te pediría, que si te doy mi corazón
Me lo cuides todos los días

Necesito algo que no sea temporal, alguien para presumir
Cuando te lleve a comer con mi familia en Navidad (Je)
No sé si me entiendes`,
  message:
    "Te dedico esta canción porque hay muchas cosas que a veces no sé cómo decirte directamente. Me gustas mucho y no quiero que esto sea algo temporal; me gustaría construir algo bonito, sincero y especial contigo. Además, dicen que Tauro y Escorpio tienen una conexión intensa y una compatibilidad muy especial: tú siendo Tauro y yo Escorpio, quizá el universo ya nos estaba dando una pequeña señal. Si algún día me das tu corazón, prometo cuidarlo y demostrarte con acciones lo importante que eres para mí.",
  spotifyUrl:
    "https://open.spotify.com/track/5xSt1wxZobFcLzHrFakv6z?si=87eba16f91c242c4",
},
{
  number: "20",
  title: "ÚNICOS",
  artist: "Siddhartha",
  cover: "/covers/unicos.png",
  startTime: "2:00",
  endTime: "4:12",
  lyrics: `Y ahora que te vuelvo a ver, ya no quiero amanecer tan solo
  
Otra vez, porque ahora somos únicos, los únicos
Y ahora que te vuelvo a ver, ya no quiero amanecer tan solo`,
  message:
    "Te dedico esta canción porque, incluso a través de una pantalla, siento que hay algo diferente cuando hablamos, algo que no encuentro con nadie más. Nuestras conversaciones tienen una forma especial de quedarse conmigo. Me gusta imaginar que, cuando por fin nos veamos, podremos crear momentos que sean solamente nuestros y descubrir si esta conexión puede convertirse en algo único.",
  spotifyUrl:
    "https://open.spotify.com/track/4IMBNHCtJWAAqEoOktyl3a?si=610dfc4bc8b14a63",
},
{
  number: "21",
  title: "NENITA",
  artist: "Manuel Medrano",
  cover: "/covers/nenita.jpg",
  startTime: "1:46",
  endTime: "3:23",
  lyrics: `Porque eres lo que siempre quise
Solo tú tienes lo que soñé
Déjame decirte que eres la luz que alumbra
Los días en un mundo y nadie sabe que eres tú

Si supieras que te pienso todas las mañanas
Todos los días, todas las semanas
Debo encontrar las palabras para demostrarte
Que te amo como a nadie más

Yo voy a estar donde tú estés
Te voy a cuidar como nunca nadie
Voy a darte tantos besos como pueda
Y los que no pueda te los voy a dar en mi otra vida`,
  message:
    "Te dedico esta canción porque te has convertido en alguien muy especial para mí. Pienso en ti más de lo que imaginaba y me encanta cómo un mensaje tuyo o una conversación contigo puede hacer que cualquier día se sienta mejor. Aunque todavía no pueda acompañarte en persona, quiero estar para ti y demostrarte poco a poco todo lo que significas para mí.",
  spotifyUrl:
    "https://open.spotify.com/track/0R8sg8rEFSQ5Nc3Becf6c9?si=80c9a66b3a7b4452",
},
{
  number: "22",
  title: "TUS OJOS",
  artist: "Beto Cárdenas",
  cover: "/covers/tus-ojos.jpg",
  startTime: "0:41",
  endTime: "3:34",
  lyrics: `No sé
Si te han dicho lo bonita que te ves
Que mis ojos nunca han visto una mujer
Como tú
Resplandecer

Esos tus ojos combinan tu piel
Y me llenan de esperanza
De otra vez volverte a ver
Enamorado estoy
De esa linda mujer`,
  message:
    "Te dedico esta canción porque, por las fotos que me mandas, tus ojos tienen algo que me encanta y siempre logra dejarme pensando en ti. Me gusta cómo se ven cuando sonríes y la manera en que parecen expresar tanto incluso a través de una pantalla. Tal vez ya te han dicho muchas veces lo bonita que eres, pero quería que supieras que tengo muchas ganas de descubrir esa mirada en persona.",
  spotifyUrl:
    "https://open.spotify.com/track/66iwTS1oZxQm31fBNMBUcb?si=ffad5e76c46a4468",
},
{
  number: "23",
  title: "¿Y SI TE INVITO?",
  artist: "Axel Márquez",
  cover: "/covers/y-si-te-invito.jpg",
  startTime: "1:44",
  endTime: "3:06",
  lyrics: `Ayer soñé que me tomabas de la mano
Que me abrazabas fuerte mientras rozaba tus labios
Ojalá pronto se haga realidad
Que estrellas y planetas se nos vuelvan a alinear

Que no hay nada más
Que me guste más que tu mirar
Que tu mirar

Quisiera despertar
Y ver cada día tu lunar
Tu lunar

Que tienes cerca de tu pecho
Cerca de tu pecho quiero estar
Quiero estar`,
  message:
    "Te dedico esta canción porque muchas veces imagino lo bonito que sería tenerte cerca, tomarte de la mano y compartir contigo momentos que hoy solamente existen en mi cabeza. Me encanta tu mirada y cada pequeño detalle que te hace ser tú. Ojalá algún día las estrellas se alineen y podamos convertir todo eso que imagino en algo real.",
  spotifyUrl:
    "https://open.spotify.com/track/0foW7sax16CI8UizVAek32?si=ab849c2d950540cd",
},
{
  number: "24",
  title: "TE QUIERO MUCHO, MUCHO",
  artist: "Río Roma",
  cover: "/covers/te-quiero-mucho-mucho.jpg",
  startTime: "2:21",
  endTime: "3:41",
  lyrics: `Ya sé que talvez te sorprenda
Mi sinceridad (mi sinceridad)
Pero no hay nada de malo
En decirte la verdad

Es que me gustas tú
Me haces feliz en un segundo
No sé si sea tu luz
Pero te veo y me quedo mudo
¡Oh baby I love you!
Yo quiero que te quedes en mi mundo
Y quiero confesarte
Que aunque te conozco poco
Ya te quiero mucho
Mucho, mucho, mucho
Pero
Mucho, mucho, mucho`,
  message:
    "Te dedico esta canción porque, aunque todavía llevamos poco tiempo conociéndonos, ya te has vuelto alguien muy especial para mí. Me gustas por tu manera de ser, por cómo me haces sentir y por esa facilidad que tienes para alegrarme en un instante. Tal vez mi sinceridad te sorprenda, pero quería decirte la verdad: te quiero mucho y me encantaría que te quedaras en mi mundo.",
  spotifyUrl:
    "https://open.spotify.com/track/1CnW361jtuyldTsP3pchjS?si=b905993284bd4603",
},
{
  number: "25",
  title: "VIBRAMOS",
  artist: "Oregon Black",
  cover: "/covers/vibramos.jpg",
  startTime: "2:51",
  endTime: "3:42",
  lyrics: `Sueño contigo al despertar
Tiemblan mis manos tan despacio
Yo no puedo parar

Y te apareces a mi lado
Sueño contigo al despertar
Tiemblan mis manos tan despacio
Yo no puedo parar`,
  message:
    "Te dedico esta canción porque desde que apareciste en mi vida hay algo en mí que no puedo ignorar. Pienso en ti al despertar, me emociono cuando veo que me escribiste y siento esos nervios bonitos al imaginar el día en que por fin voy a verte. Me gusta la conexión que hemos creado hablando y la forma en que, aun desde la distancia, haces que todo dentro de mí vibre de una manera distinta.",
  spotifyUrl:
    "https://open.spotify.com/track/0sSzTwYTh2ePU5S7wxjW8h?si=c643544de9b24540",
},
{
  number: "26",
  title: "AMOR DE CINE",
  artist: "HUMBE",
  cover: "/covers/amor-de-cine.png",
  startTime: "2:06",
  endTime: "4:22",
  lyrics: `Y si fueras mía
Te llenaría todo el día de sonrisas
Hasta en mis sueños tu boca presumiría
¿Quién diría a dónde llegaría?
Y porque fueras mía
Mi alma al diablo yo seguro vendería
Diez mil kilómetros descalzo correría
Todo daría porque fueras mía`,
  message:
    "Te dedico esta canción porque contigo me nace imaginar una historia bonita, de esas que parecen sacadas de una película. Me gustaría llenarte de sonrisas, compartir momentos especiales y hacer todo lo posible por verte feliz. No sé hasta dónde pueda llegar lo nuestro, pero sí sé que valdría la pena intentarlo contigo.",
  spotifyUrl:
    "https://open.spotify.com/track/0v9UztY5A12cJUsWD7PZzS?si=5221b856d3194671",
},
{
  number: "27",
  title: "SUSTANCIAS EN MI CORAZÓN",
  artist: "STRANGEHUMAN, DannyLux",
  cover: "/covers/sustancias-en-mi-corazon.jpg",
  startTime: "1:14",
  endTime: "3:16",
  lyrics: `Y es que tú eres todo lo que quiero y más (más, más, más, más)
No tenerte sería fatal, tengo tantos sentimientos
Contigo quiero estar desierto y perdernos en amor
Amor, amor, me encanta la conexión

Tan loco me siento, por ti no lo pienso
El futuro se ve brillante, siempre seré tu amante
Quisiera explicar todo lo que yo siento`,
  message:
    "Te dedico esta canción porque contigo siento una conexión que no puedo ignorar. Me haces imaginar un futuro bonito, lleno de momentos juntos y de sentimientos que a veces todavía no sé cómo explicar. Solo sé que quiero seguir cerca de ti y descubrir hasta dónde puede llegar todo esto que siento.",
  spotifyUrl:
    "https://open.spotify.com/track/1zY3UlKOpFLZJNOYjBI6Ak?si=e0f71a43f1784067",
},
{
  number: "28",
  title: "SI EN TU MENTE ESTUVE",
  artist: "NSQK",
  cover: "/covers/si-en-tu-mente-estuve.png",
  startTime: "2:33",
  endTime: "3:11",
  lyrics: `Cuéntame siquiera qué animales viste en las nubes
Cuéntame siquiera si contaste carros y autobuses
Que solo quiero saber
Si una mariposa viste en tu ventana
Cómo te pediste el café por la mañana
Y si en tu mente estuve yo
Si estuve yo`,
  message:
    "Te dedico esta canción porque me interesa conocer incluso los detalles más pequeños de tu día: qué pensaste, qué viste, cómo amaneciste o qué te hizo sonreír. Y, aunque a veces me da pena preguntarlo directamente, también me gusta imaginar que entre todos esos pensamientos quizá hubo un pequeño momento en el que pensaste en mí.",
  spotifyUrl:
    "https://open.spotify.com/track/6EjBcoyPVn99cpRfoDiuRf?si=c22e526d54cf4687",
},
{
  number: "29",
  title: "TRANQUI, TE PUEDES ENAMORAR",
  artist: "Alleh & Yorghaki",
  cover: "/covers/tranqui-te-puedes-enamorar.png",
  startTime: "0:28",
  endTime: "2:46",
  lyrics: `Uh, si me dejas, yo te puedo enseñar
Lo rico que se siente caminar
Pegaítos en la orilla del mar
Mami, tan solo de imaginarlo
Si me dejas, yo te paso a buscar
Pa' pasar la noche fenomenal
Si ya se te olvidó cómo es amar
Tranquila, te puedes enamorar

No me quites la fuerza, dame más
Si sabes que te gusto, admítelo
Nos parecemos mucho y además
Tenemo' los mismo' gusto'
Nada con besarte se compara
Tenerte cara a cara, mami, hablando claro
Baby, otra como tú no hay, ay, ay, ay, ay`,
  message:
    "Te dedico esta canción porque contigo todo se siente natural y fácil de imaginar. Me encantaría compartir planes sencillos, caminar junto a ti, hablar durante horas y crear momentos que poco a poco se vuelvan especiales. No quiero presionarte ni apresurar nada; solo quiero que sepas que conmigo puedes sentirte tranquila y dejar que las cosas bonitas sucedan.",
  spotifyUrl:
    "https://open.spotify.com/track/5L7Cj7HFf7YcCb9GU1ySDt?si=55901645434e47ae",
},
{
  number: "30",
  title: "ILY",
  artist: "Kapo, Myke Towers",
  cover: "/covers/ily.png",
  startTime: "1:06",
  endTime: "3:36",
  lyrics: `Dónde estés tú, quiero estar yo
El sol en salir se tardó
Y no quiere Starbucks, y no quiere el carbón
La cita en su casa la armó
Y yo quiero amanecer contigo
Hacerte el amor y el desayuno
Los beso' ya ni se los pido
Me conformaba con solo uno
Yo tengo la receta pa' pasarla bien`,
  message:
    "Te dedico esta canción porque cuando pienso en un lugar en el que quiero estar, muchas veces termino imaginándolo contigo. Me gustan esos planes sencillos: compartir una mañana, preparar algo juntos, reírnos y disfrutar el tiempo sin prisas. Contigo no necesito algo complicado para pasarla bien; tu compañía sería suficiente para convertir cualquier momento en uno especial.",
  spotifyUrl:
    "https://open.spotify.com/track/5ru2w4Y7xP58IXE6m4orW0?si=0819738022f64b12",
},
{
  number: "31",
  title: "24/7",
  artist: "EVÍC, NSQK",
  cover: "/covers/24-7.png",
  startTime: "1:22",
  endTime: "3:04",
  lyrics: `Lo que quieras y digas yo quiero
El momento que tú solo digas
Dejo todo y por ti yo me quedo
Si por ti vivo todos los días
Si por ti vivo, por ti me muero
Si prometes quererme de vuelta por mí nos perdemos
Nos vamos tan lejos
Y nunca volvemos

Quiero ser quiero ser
El aire que respiras
El amor que llegó y que conquistó tu vida
Y aunque sé que no debo ilusionarme
Yo te encuentro y te encuentro en todas partes
Quiero ser
La persona con quien pases años
Que con un beso pueda reparar los daños
Y aunque sé que no debo ilusionarme
Tú me llamas y corro a buscarte`,
  message:
    "Te dedico esta canción porque me nace estar para ti cuando lo necesites y hacerte sentir acompañada. Me ilusiona pensar que algún día podría ser esa persona con quien compartas tus días, tus planes y muchos años. Aunque intento no adelantarme demasiado, es difícil no imaginar algo bonito contigo cuando apareces en tantos de mis pensamientos.",
  spotifyUrl:
    "https://open.spotify.com/track/6QBOVZFPqIJucg0YIWesJ0?si=c6b8a9dd31ff44e0",
},
{
  number: "32",
  title: "JUST THE WAY YOU ARE",
  artist: "Bruno Mars",
  cover: "/covers/just-the-way-you-are.jpg",
  startTime: "0:17",
  endTime: "3:40",
  lyrics: `Oh, her eyes, her eyes make the stars look like they're not shinin'
Her hair, her hair falls perfectly without her tryin'
She's so beautiful, uh
And I tell her every day
Yeah, I know, I know, when I compliment her, she won't believe me
And it's so, it's so sad to think that she don't see what I see
But every time she asks me, "Do I look okay?"
I say

When I see your face
There's not a thing that I would change
'Cause you're amazing
Just the way you are
And when you smile
The whole world stops and stares for a while
'Cause, girl, you're amazing
Just the way you are
Yeah`,
  translatedLyrics: `Oh, sus ojos, sus ojos hacen que las estrellas parezcan no brillar
Su cabello, su cabello cae perfectamente sin que ella lo esfuerce
Es tan guapa, uh
Y se lo digo cada día
Sí, lo sé, lo sé, cuando le diga cumplidos, no me creerá
Y es tan, es tan triste pensar que no ve lo que yo veo
Pero cada vez que me pregunta, "¿me veo bien?"
Yo le digo

Cuando veo tu cara
No hay ni una cosa que yo cambiase
Porque eres maravillosa
Tal y como eres
Y cuando sonríes
Todo el mundo se detiene y te observa por un momento
Porque, nena, eres maravillosa
Tal y como eres
Yeah`,
  message:
  "Te dedico esta canción porque me encantas exactamente como eres. Tu mirada y tu sonrisa en las fotos que me mandas, además de esos pequeños detalles que descubro cuando hablamos, tienen algo que me parece increíble. No cambiaría nada de ti, y me emociona imaginar que cuando por fin te vea en persona me vas a parecer todavía más especial.",
  spotifyUrl:
    "https://open.spotify.com/track/7BqBn9nzAq8spo5e7cZ0dJ?si=eb847c6d5d3548fc",
},
{
  number: "33",
  title: "OUT OF MY LEAGUE",
  artist: "Fitz and The Tantrums",
  cover: "/covers/out-of-my-league.jpg",
  startTime: "0:24",
  endTime: "3:29",
  lyrics: `Forty days and forty nights
I waited for a girl like you
To come and save my life
All the days I waited for you
You know the ones who said
I'd never find someone like you?

'Cause you were out of my league
All the things I believe
You were just the right kind
Yeah, you are more than just a dream

You were out of my league
Got my heartbeat racing
If I die, don't wake me
'Cause you are more than just a dream`,
  translatedLyrics: `Cuarenta días y cuarenta noches
esperé a una chica como tú
Para que vinieras a salvar mi vida
Todos los días que te esperé 
¿Conoces a los que dijeron
que nunca encontraría a alguien como tú?

Porque estabas fuera de mi alcance
Todas las cosas que creo
Eras justo el tipo correcto
Sí, eres más que un sueño

Estabas fuera de mi alcance,
me aceleraste el corazón.
Si muero, no me despiertes
, porque eres más que un sueño.`,
  message:
    "Te dedico esta canción porque a veces todavía me cuesta creer que alguien como tú haya aparecido en mi vida. Me pareces mucho más de lo que alguna vez imaginé encontrar, y cuando hablamos o veo que me escribiste siento esos nervios bonitos que hacen que el corazón se acelere. Tal vez a veces piense que estás fuera de mi alcance, pero quiero seguir conociéndote y demostrarte que lo que siento por ti es sincero.",
  spotifyUrl:
    "https://open.spotify.com/track/2AYEOC02WLhUiOoaig2SEH?si=5189a3f66f1747c7",
},
{
  number: "34",
  title: "ELECTRIC LOVE",
  artist: "BØRNS",
  cover: "/covers/electric-love.jpg",
  startTime: "0:54",
  endTime: "3:38",
  lyrics: `Baby, you're like lightning in a bottle
I can't let you go now that I got it
And all I need is to be struck
By your electric love (Ohh)
Baby, your electric love (Ahh)
Electric love

Drown me (Drown me), you make my heart beat like the rain
Surround me, hold me deep beneath your waves
(Oh)

And every night my mind is running around her
Thunder's getting louder and louder and louder`,
  translatedLyrics: `Cariño, eres como un rayo en una botella
No puedo dejarte ir ahora que lo tengo
Y todo lo que necesito es ser impactado
Por tu amor eléctrico (Ohh)
Cariño, tu amor eléctrico (Ahh)
Amor eléctrico

Ahógame (Ahógame), haces que mi corazón lata como la lluvia
Rodéame, abrázame profundamente bajo tus olas

Y cada noche mi mente corre alrededor de ella
El trueno se hace más y más y más fuerte`,
  message:
    "Te dedico esta canción porque, aunque todavía estemos a distancia, la energía que siento cuando hablamos es difícil de ignorar. Un mensaje tuyo, una nota de voz o una foto pueden acelerarme el corazón y hacer que no deje de pensar en ti. Es como una conexión eléctrica que apareció sin avisar y que me hace imaginar con mucha emoción cómo será tenerte cerca por primera vez.",
  spotifyUrl:
    "https://open.spotify.com/track/2GiJYvgVaD2HtM8GqD9EgQ?si=80b398836f764c52",
},
{
  number: "35",
  title: "HOLD ON, WE’RE GOING HOME",
  artist: "Drake",
  cover: "/covers/hold-on-were-going-home.jpg",
  startTime: "0:18",
  endTime: "3:47",
  lyrics: `I got my eyes on you
You're everything that I see
I want your heart, love and emotion endlessly
I can't get over you
You left your mark on me
I want your hot love and emotion endlessly

'Cause you're a good girl and you know it
You act so different around me
'Cause you're a good girl and you know it
I know exactly who you could be`,
  translatedLyrics: `Tengo mis ojos puestos en ti
Eres todo lo que veo
Quiero tu corazón, tu amor y tu emoción sin fin
No puedo olvidarte
Dejaste tu huella en mí
Quiero tu amor y emoción apasionados sin fin

Porque eres una buena chica y lo sabes
Actúas tan diferente a mi alrededor
Porque eres una buena chica y lo sabes,
sé exactamente quién podrías ser.`,
  message:
    "Te dedico esta canción porque desde que empezamos a conocernos no puedo evitar fijarme en todo lo que te hace especial. Me atrae tu forma de ser, la confianza que muestras cuando hablamos y esa versión de ti que descubro poco a poco en cada conversación. No busco algo pasajero; quiero ganarme tu cariño y tu confianza, conocerte en persona y descubrir si podemos construir algo que se sienta como volver a casa.",
  spotifyUrl:
    "https://open.spotify.com/track/6jdOi5U5LBzQrc4c1VT983?si=e6d24aa4d5254f77",
},
{
  number: "36",
  title: "ESSENCE",
  artist: "Justin Bieber, Wizkid, Tems",
  cover: "/covers/essence.jpg",
  startTime: "1:59",
  endTime: "4:12",
  lyrics: `I prayed for this moment
I would be by your side
And I don't wanna forget
Those lonely nights
Ooh, so tell me that you gon' ride with me
Tell me that you'll never lie to me (Mm-hmm)
I just wanna make you proud of me
Want you lovin' every side of me
I love the rhythm of your heartbeat
The way you're pushin' up on me
I can tell that you want me
Let me show you how it's gon' be

You don't need no other body
You don't need no other body (Woah, woah, woah)
Only you fi hold my body
Only you fi hold my body
You don't need no other body`,
  translatedLyrics: `Recé por este momento
Estaría a tu lado
Y no quiero olvidar
Esas noches solitarias
Ooh, así que dime que vas a viajar conmigo
Dime que nunca me mentirás (Mm-hmm)
Solo quiero que estés orgulloso de mí
Quiero que ames cada lado de mí
Me encanta el ritmo de los latidos de tu corazón
La forma en que me empujas
Puedo decir que me deseas
Déjame mostrarte cómo va a ser

No necesitas a ningún otro cuerpo
No necesitas a ningún otro cuerpo ( Woah, woah, woah )
Solo tú puedes sostener mi Cuerpo
Solo tú puedes sostener mi cuerpo
No necesitas ningún otro cuerpo`,
  message:
    "Te dedico esta canción porque siento que conocerte fue uno de esos momentos que llegan después de haber esperado mucho tiempo por algo especial. Me encanta la conexión que siento contigo y me gustaría estar a tu lado, ganarme tu confianza y hacerte sentir orgullosa de tenerme cerca. Quiero que conozcas cada parte de mí y que sepas que, entre todas las personas, eres tú quien realmente logra captar mi atención.",
  spotifyUrl:
    "https://open.spotify.com/track/3Pf5zVXlpgUOs0pT1IiYjb?si=981cb699a2c9454d",
},
{
  number: "37",
  title: "MONA LISA",
  artist: "Dominic Fike",
  cover: "/covers/mona-lisa.png",
  startTime: "2:09",
  endTime: "3:06",
  lyrics: `Love is when you try to place it out your mind (Uh-huh)
But you can't turn a radio down (Uh-huh)
And you can't think of anyone else (Uh-huh, uh)
And love is when you try to make it out alive (Uh-huh)
But you can't turn a radio down (Uh-huh)
And you can't think of anyone else (Uh-huh, uh)`,
  translatedLyrics: `El amor es cuando intentas sacarlo de tu mente (Ajá)
Pero no puedes bajar el volumen de la radio (Ajá)
Y no puedes pensar en nadie más (Ajá, uh)
Y el amor es cuando intentas salir con vida (Ajá)
Pero no puedes bajar el volumen de la radio (Ajá)
Y no puedes pensar en nadie más (Ajá, uh)`,
  message:
    "Te dedico esta canción porque, aunque intente distraerme o pensar en cualquier otra cosa, siempre terminas apareciendo en mi mente. Hay canciones, lugares y momentos cotidianos que inevitablemente me recuerdan a ti. Supongo que eso pasa cuando alguien empieza a importar de verdad: por más que uno lo intente, ya no puede dejar de pensar en esa persona.",
  spotifyUrl:
    "https://open.spotify.com/track/37CoOXIsgF3NzbK1zHZetk?si=94269f2d3cc24046",
},
{
  number: "38",
  title: "BEST PART",
  artist: "Daniel Caesar",
  cover: "/covers/best-part.png",
  startTime: "1:31",
  endTime: "3:29",
  lyrics: `It's this sunrise
And those brown eyes, yes
You're the one that I desire
When we wake up
And then we make love (Make love)
It makes me feel so nice

You're my water when I'm stuck in the desert
You're the Tylenol I take when my head hurts
You're the sunshine on my life

I just wanna see how beautiful you are
You know that I see it, I know you're a star
Where you go, I'll follow, no matter how far
If life is a movie, then you're the best part, oh
You're the best part, ooh
Best part`,
  translatedLyrics: `Es este amanecer
Y esos ojos marrones, sí
Eres a quien deseo
Cuando despertamos
Y luego hacemos el amor (Hacemos el amor)
Me hace sentir tan bien

Eres mi agua cuando estoy atrapado en el desierto
Eres el Tylenol que tomo cuando me duele la cabeza
Eres el sol en mi vida

Solo quiero ver lo hermosa que eres
Sabes que lo veo, sé que eres una estrella
Adondequiera que vayas, te seguiré, sin importar cuán lejos estés
Si la vida es una película, entonces tú eres la mejor parte, oh
Tú eres la mejor parte, ooh
La mejor parte`,
  message:
    "Te dedico esta canción porque tus ojos cafés tienen algo que me encanta, incluso conociéndolos solo por las fotos que me mandas. Me gusta cómo se ven cuando sonríes y a veces me quedo mirando esas fotos sin darme cuenta. Para mí ya eres una parte especial capaz de iluminar un día complicado, y tengo muchas ganas de descubrir esa mirada frente a frente, y si mi vida fuera una película, definitivamente serías una de las mejores partes.",
  spotifyUrl:
    "https://open.spotify.com/track/1Q7EgiMOuwDcB0PJC6AzON?si=72fdef1ef4fb4236",
},
{
  number: "39",
  title: "RIGHT HERE, RIGHT NOW",
  artist: "Vanessa Hudgens & Zac Efron",
  cover: "/covers/right-here-right-now.jpg",
  startTime: "0:09",
  endTime: "3:55",
  lyrics: `Can you imagine what would happen
If we could have any dream?
I'd wish this moment was ours to own it
And that it would never leave
Then I would thank that star
That made our wish come true (Come true)
Oh, yeah (Hmm-hmm)
'Cause he knows that where you are
Is where I should be too

Right here, right now (Yeah)
I'm lookin' at you and my heart loves the view
'Cause you mean everything (Ooh)
Right here, I promise you, somehow
That tomorrow can wait (Oh-oh)
For some other day to be (To be)
But right now, there's you and me (Hmm)`,
  translatedLyrics: `¿Te imaginas lo que pasaría
si pudiéramos tener cualquier sueño?
Desearía que este momento fuera nuestro para poseerlo
Y que nunca se fuera
Entonces le agradecería a esa estrella
Que hizo que nuestro deseo se hiciera realidad ( Hacerse realidad )
Oh, sí ( Hmm-hmm )
Porque él sabe que donde tú estás
Es donde yo también debería estar

Aquí mismo, ahora mismo ( Sí )
Te estoy mirando y mi corazón ama la vista
Porque significas todo ( Oh )
Aquí mismo, te lo prometo, de alguna manera
Que el mañana puede esperar ( Oh-oh )
Por otro día ( Por otro )
Pero ahora mismo, estamos tú y yo ( Hmm )`,
  message:
    "Te dedico esta canción porque a veces, mientras hablamos, me dan ganas de que la distancia desaparezca y podamos compartir el momento en persona. Me imagino mirándote, especialmente esos ojos cafés que tanto me gustan en tus fotos, y olvidándome por un rato de todo lo demás. No sé qué nos depare mañana, pero sí sé que tengo muchas ganas de vivir nuestro primer momento juntos.",
  spotifyUrl:
    "https://open.spotify.com/track/5EBd8sbeMSyIotWaMnR7s4?si=a05cc7f330804a4f",
},
{
  number: "40",
  title: "ANY KIND OF GUY",
  artist: "Big Time Rush",
  cover: "/covers/any-kind-of-guy.jpg",
  startTime: "1:36",
  endTime: "3:40",
  lyrics: `I gotta keep on believing that everything takes time
I'll make up any reason to make you mine
If you're staying or leaving, I'll follow your lead
So why keep pretending? Open your eyes
I can be what you need

Any kind of guy you want, girl, that's the guy I'll be
Turn myself upside down (Yes I will, yes I will)
Any kind of guy you want, girl, you know I'll agree
Turn your whole world around (Yes I will, yes I will)
Any kind, any kind, any kind of guy you want
You decide, change your mind, I will be there
Won't you try one more time? Be my any kind of girl (Be my girl!)
You decide, It's alright, I will be there (There)`,
  translatedLyrics: `Tengo que seguir creyendo que todo lleva tiempo
Inventaré cualquier razón para que seas mía
Si te quedas o te vas , seguiré tu ejemplo
Entonces, ¿ por qué seguir fingiendo? Abre los ojos,
puedo ser lo que necesitas

Cualquier tipo de chico que quieras, chica, ese es el chico que seré
Me pondré patas arriba ( Sí, lo haré, sí, lo haré )
Cualquier tipo de chico que quieras, chica, sabes que estaré de acuerdo
Darle la vuelta a todo tu mundo ( Sí, lo haré, sí , lo haré )
Cualquier tipo, cualquier tipo, cualquier tipo de chico que quieras
Tú decides, cambia de opinión, yo estaré ahí ¿
No lo intentarás una vez más? Sé mi chica (¡ Sé mi chica! )
Tú decides, está bien, yo estaré ahí ( Ahí )
`,
  message:
    "Te dedico esta canción porque quiero que sepas que estoy dispuesto a conocerte de verdad y a aprender qué necesitas para sentirte querida, tranquila y especial. No se trata de cambiar quién soy por completo, sino de crecer, mejorar y demostrarte que puedo estar presente de la manera que mereces. Solo quiero que me des la oportunidad de enseñarte todo lo bonito que podría ofrecerte.",
  spotifyUrl:
    "https://open.spotify.com/track/7qmuR66GcGuWBEijVD26SV?si=1c3f8fbee11d4b71",
},
];

const chapters = [
  {
    title: "Cuando empecé a fijarme en ti",
    description:
      "Las primeras canciones que comenzaron a decir lo que yo todavía no sabía explicar.",
    start: 0,
    end: 7,
  },
  {
    title: "Todo lo que provocas en mí",
    description:
      "La emoción, los nervios y todas esas cosas que aparecen cuando pienso en ti.",
    start: 8,
    end: 15,
  },
  {
    title: "Lo que imagino contigo",
    description:
      "Momentos, lugares y pequeñas historias que me encantaría vivir a tu lado.",
    start: 16,
    end: 23,
  },
  {
    title: "Lo que quiero ofrecerte",
    description:
      "No solo palabras bonitas, sino cariño, tranquilidad y algo verdaderamente sincero.",
    start: 24,
    end: 31,
  },
  {
    title: "Lo que no sé decirte directamente",
    description:
      "Las canciones que explican mejor que yo todo lo que has comenzado a significar.",
    start: 32,
    end: 39,
  },
];

const playlistUrl =
  "https://open.spotify.com/playlist/7Dn2t8z3UQvjDHiczYZy8Z?si=7aabaab79cae4a70&pt=daf6c3b69976930b6f13040f3c58b77b";

const finalPetals = Array.from({ length: 32 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  delay: (index % 8) * 0.45,
  duration: 6 + (index % 5) * 0.7,
  size: 14 + (index % 4) * 5,
  movement: index % 2 === 0 ? 80 : -80,
}));

const progressStorageKey = "para-regina-progress";
const favoritesStorageKey = "para-regina-favorites";

const songVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 90 : -90,
    scale: 0.98,
  }),

  center: {
    opacity: 1,
    x: 0,
    scale: 1,
  },

  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -90 : 90,
    scale: 0.98,
  }),
};

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [showSongs, setShowSongs] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [navigationDirection, setNavigationDirection] =
    useState<1 | -1>(1);
  const [showFinal, setShowFinal] = useState(false);
  const [showSongIndex, setShowSongIndex] = useState(false);

  const [savedSongIndex, setSavedSongIndex] = useState<number | null>(null);
  const [visitedSongs, setVisitedSongs] = useState<string[]>([]);
  const [hasLoadedProgress, setHasLoadedProgress] = useState(false);

  const [favoriteSongs, setFavoriteSongs] = useState<string[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [hasLoadedFavorites, setHasLoadedFavorites] =
    useState(false);
  

  const [translatedSongs, setTranslatedSongs] = useState<
    Record<string, boolean>
  >({});

  const audioRef = useRef<HTMLVideoElement | null>(null);
  const loadedSongIndexRef = useRef<number | null>(null);

  const [spotifyIsPlaying, setSpotifyIsPlaying] = useState(false);
  const [spotifyIsBuffering, setSpotifyIsBuffering] = useState(false);
  const [spotifyHasReachedEnd, setSpotifyHasReachedEnd] =
    useState(false);
  const [spotifyPositionSeconds, setSpotifyPositionSeconds] =
    useState(0);
  const [audioError, setAudioError] = useState<string | null>(null);

  const [audioDurationSeconds, setAudioDurationSeconds] =
  useState(0);

  /*
    Se conserva este nombre porque la interfaz visual ya lo utiliza.
    El audio real proviene de /public/audio, no de la API de Spotify.
  */
  const spotifyReady = true;

useEffect(() => {
  try {
    const savedProgress = localStorage.getItem(progressStorageKey);

    if (!savedProgress) {
      setHasLoadedProgress(true);
      return;
    }

    const parsedProgress = JSON.parse(savedProgress) as {
      songIndex?: number;
      visitedSongs?: string[];
    };

    if (
      typeof parsedProgress.songIndex === "number" &&
      parsedProgress.songIndex >= 0 &&
      parsedProgress.songIndex < songs.length
    ) {
      setSavedSongIndex(parsedProgress.songIndex);
    }

    if (Array.isArray(parsedProgress.visitedSongs)) {
      setVisitedSongs(parsedProgress.visitedSongs);
    }
  } catch (error) {
    console.error("No se pudo cargar el progreso:", error);
    localStorage.removeItem(progressStorageKey);
  } finally {
    setHasLoadedProgress(true);
  }
}, []);

useEffect(() => {
  if (!showSongs) {
    return;
  }

  const songNumber = songs[currentSongIndex].number;

  setVisitedSongs((currentVisitedSongs) => {
    if (currentVisitedSongs.includes(songNumber)) {
      return currentVisitedSongs;
    }

    return [...currentVisitedSongs, songNumber];
  });
}, [showSongs, currentSongIndex]);

useEffect(() => {
  if (!hasLoadedProgress || !showSongs) {
    return;
  }

  try {
    localStorage.setItem(
      progressStorageKey,
      JSON.stringify({
        songIndex: currentSongIndex,
        visitedSongs,
      })
    );

    setSavedSongIndex(currentSongIndex);
  } catch (error) {
    console.error("No se pudo guardar el progreso:", error);
  }
}, [
  currentSongIndex,
  visitedSongs,
  showSongs,
  hasLoadedProgress,
]);

useEffect(() => {
  if (!hasEntered || showSongIndex) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [hasEntered, showSongIndex]);

useEffect(() => {
  try {
    const savedFavorites = localStorage.getItem(
      favoritesStorageKey
    );

    if (savedFavorites) {
      const parsedFavorites: unknown =
        JSON.parse(savedFavorites);

      if (Array.isArray(parsedFavorites)) {
        const validFavorites = parsedFavorites.filter(
          (value): value is string =>
            typeof value === "string"
        );

        setFavoriteSongs(validFavorites);
      }
    }
  } catch (error) {
    console.error(
      "No se pudieron cargar las canciones favoritas:",
      error
    );

    localStorage.removeItem(favoritesStorageKey);
  } finally {
    setHasLoadedFavorites(true);
  }
}, []);

useEffect(() => {
  if (!hasLoadedFavorites) {
    return;
  }

  try {
    localStorage.setItem(
      favoritesStorageKey,
      JSON.stringify(favoriteSongs)
    );
  } catch (error) {
    console.error(
      "No se pudieron guardar las canciones favoritas:",
      error
    );
  }
}, [favoriteSongs, hasLoadedFavorites]);

function toggleTranslation(songNumber: string) {
  setTranslatedSongs((currentTranslations) => ({
    ...currentTranslations,
    [songNumber]: !currentTranslations[songNumber],
  }));
}

function toggleFavoriteSong(songNumber: string) {
  setFavoriteSongs((currentFavorites) => {
    if (currentFavorites.includes(songNumber)) {
      return currentFavorites.filter(
        (favoriteNumber) => favoriteNumber !== songNumber
      );
    }

    return [...currentFavorites, songNumber];
  });
}

function continueExperience() {
  if (savedSongIndex === null) {
    return;
  }

  void playSongSnippet(savedSongIndex);
  setHasEntered(true);
  setShowHeart(true);
  setShowSongs(true);
  setShowFinal(false);
  setShowSongIndex(false);
  setShowOnlyFavorites(false);
  setNavigationDirection(1);
  setCurrentSongIndex(savedSongIndex);

  setTimeout(() => {
    document.getElementById("canciones")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 250);
}


function goToSongs() {
  void playSongSnippet(currentSongIndex);
  setShowSongs(true);
}

useEffect(() => {
  if (showSongs) {
    const timer = setTimeout(() => {
      const songsSection = document.getElementById("canciones");

      if (songsSection) {
        songsSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 150);

    return () => clearTimeout(timer);
  }
}, [showSongs]);

useEffect(() => {
  if (!showSongIndex) {
    return;
  }

function closeIndexWithEscape(event: KeyboardEvent) {
  if (event.key === "Escape") {
    setShowSongIndex(false);
    setShowOnlyFavorites(false);
  }
}

  window.addEventListener("keydown", closeIndexWithEscape);

  return () => {
    window.removeEventListener("keydown", closeIndexWithEscape);
  };
}, [showSongIndex]);

useEffect(() => {
  if (!showSongs || showSongIndex || showFinal || !hasEntered) {
    return;
  }

  function handleKeyboardNavigation(event: KeyboardEvent) {
    const activeElement = document.activeElement;
    const isTyping =
      activeElement instanceof HTMLInputElement ||
      activeElement instanceof HTMLTextAreaElement;

    if (isTyping) {
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      nextSong();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      previousSong();
    }
  }

  window.addEventListener("keydown", handleKeyboardNavigation);

  return () => {
    window.removeEventListener("keydown", handleKeyboardNavigation);
  };
  // Las funciones usan el índice actual, por eso se actualiza con cada canción.
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [showSongs, showSongIndex, showFinal, hasEntered, currentSongIndex]);

const currentSong = songs[currentSongIndex];

const currentChapter =
  chapters.find(
    (chapter) =>
      currentSongIndex >= chapter.start &&
      currentSongIndex <= chapter.end
  ) ?? chapters[0];

const progress = ((currentSongIndex + 1) / songs.length) * 100;

async function playSongSnippet(songIndex: number): Promise<boolean> {
  const audio = audioRef.current;
  const song = songs[songIndex];

  if (!audio || !song) {
    return false;
  }

const audioFile = `/audio/${song.number}.mp4`;

  audio.pause();
  loadedSongIndexRef.current = songIndex;

  setSpotifyIsPlaying(false);
  setSpotifyIsBuffering(true);
  setSpotifyHasReachedEnd(false);
  setSpotifyPositionSeconds(0);
  setAudioError(null);

  audio.src = audioFile;
  audio.currentTime = 0;
  audio.load();

  try {
    await audio.play();
    return true;
  } catch (error) {
    /*
      Al cambiar rápidamente de canción, el navegador puede cancelar
      la reproducción anterior con AbortError. No es una falla real.
    */
    if (!(error instanceof DOMException && error.name === "AbortError")) {
      console.error(`No se pudo reproducir ${audioFile}:`, error);
      setAudioError(
        `No se pudo reproducir ${song.number}.mp3. Revisa public/audio.`
      );
    }

    setSpotifyIsPlaying(false);
    setSpotifyIsBuffering(false);
    return false;
  }
}

function pauseSnippet() {
  const audio = audioRef.current;

  if (!audio) {
    return;
  }

  audio.pause();
  setSpotifyIsPlaying(false);
}

async function toggleSnippetPlayback() {
  const audio = audioRef.current;

  if (!audio) {
    return;
  }

  if (loadedSongIndexRef.current !== currentSongIndex || !audio.src) {
    await playSongSnippet(currentSongIndex);
    return;
  }

  if (!audio.paused) {
    audio.pause();
    setSpotifyIsPlaying(false);
    return;
  }

  if (audio.ended || audio.currentTime >= audio.duration) {
    audio.currentTime = 0;
    setSpotifyPositionSeconds(0);
    setSpotifyHasReachedEnd(false);
  }

  setAudioError(null);

  try {
    await audio.play();
  } catch (error) {
    console.error("No se pudo continuar el audio:", error);
    setSpotifyIsPlaying(false);
    setSpotifyIsBuffering(false);
    setAudioError("El navegador no permitió continuar el audio.");
  }
}

function previousSong() {
  if (currentSongIndex === 0) {
    return;
  }

  const targetIndex = currentSongIndex - 1;

  setNavigationDirection(-1);
  setShowFinal(false);
  void playSongSnippet(targetIndex);
  setCurrentSongIndex(targetIndex);

  setTimeout(() => {
    document.getElementById("canciones")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);
}


function nextSong() {
  if (currentSongIndex === songs.length - 1) {
    pauseSnippet();
    setShowFinal(true);

    setTimeout(() => {
      document.getElementById("final")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);

    return;
  }

  const targetIndex = currentSongIndex + 1;

  setNavigationDirection(1);
  setShowFinal(false);
  void playSongSnippet(targetIndex);
  setCurrentSongIndex(targetIndex);

  setTimeout(() => {
    document.getElementById("canciones")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);
}


function openSongFromIndex(songIndex: number) {
  if (songIndex > currentSongIndex) {
    setNavigationDirection(1);
  } else if (songIndex < currentSongIndex) {
    setNavigationDirection(-1);
  }
void playSongSnippet(songIndex);
  setCurrentSongIndex(songIndex);
  setShowSongs(true);
  setShowFinal(false);
  setShowSongIndex(false);
  setShowOnlyFavorites(false);

  setTimeout(() => {
    document.getElementById("canciones")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 150);
}

function handleSongDragEnd(
  event: MouseEvent | TouchEvent | PointerEvent,
  info: PanInfo
) {
  void event;

  const swipedLeft = info.offset.x < -80 || info.velocity.x < -500;
  const swipedRight = info.offset.x > 80 || info.velocity.x > 500;

  if (swipedLeft) {
    nextSong();
    return;
  }

  if (swipedRight) {
    previousSong();
  }
}

function returnToLastSong() {
  setShowFinal(false);
  void playSongSnippet(currentSongIndex);

  setTimeout(() => {
    document.getElementById("canciones")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);
}

function restartExperience() {
  setHasEntered(false);
  setShowFinal(false);
  setShowSongIndex(false);
  setShowSongs(false);
  setShowHeart(false);
  setCurrentSongIndex(0);
  setNavigationDirection(1);
  setTranslatedSongs({});
  setShowOnlyFavorites(false);
  localStorage.removeItem(progressStorageKey);
  setSavedSongIndex(null);
  setVisitedSongs([]);

  pauseSnippet();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

  return (
    <main>
      <video
  ref={audioRef}
  preload="auto"
  playsInline
  aria-hidden="true"
  style={{
    position: "fixed",
    width: 1,
    height: 1,
    opacity: 0,
    pointerEvents: "none",
  }}
  onLoadStart={() => {
    setSpotifyIsBuffering(true);
  }}
  onCanPlay={() => {
    setSpotifyIsBuffering(false);
  }}
  onPlaying={() => {
    setSpotifyIsPlaying(true);
    setSpotifyIsBuffering(false);
  }}
  onWaiting={() => {
    setSpotifyIsBuffering(true);
  }}
  onPause={() => {
    setSpotifyIsPlaying(false);
  }}
  onLoadedMetadata={(event) => {
    setAudioDurationSeconds(
      event.currentTarget.duration
    );
  }}
  onTimeUpdate={(event) => {
    setSpotifyPositionSeconds(
      event.currentTarget.currentTime
    );
  }}
  onEnded={() => {
  setSpotifyIsPlaying(false);
  setSpotifyHasReachedEnd(true);
  setSpotifyPositionSeconds(audioDurationSeconds);
}}
  onError={(event) => {
    const media = event.currentTarget;

    setSpotifyIsPlaying(false);
    setSpotifyIsBuffering(false);

    console.error(
      "No se pudo cargar el archivo:",
      media.currentSrc,
      media.error
    );
  }}
/>


      <AnimatePresence>
  {!hasEntered && (
    <motion.section
      className="welcomeScreen"
      role="dialog"
      aria-modal="true"
      aria-label="Bienvenida para Regina"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.03,
        filter: "blur(8px)",
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
      }}
    >
      <div className="welcomeGlow welcomeGlowOne" />
      <div className="welcomeGlow welcomeGlowTwo" />

      <motion.div
        className="welcomeCard"
        initial={{
          opacity: 0,
          y: 35,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 1,
          delay: 0.25,
        }}
      >
        <motion.span
          className="welcomeFlower"
          aria-hidden="true"
          animate={{
            rotate: [0, 8, -8, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✿
        </motion.span>

        <p className="welcomeEyebrow">
          Preparé algo para ti
        </p>

        <h2 className="welcomeTitle">
          Para Regina
        </h2>

        <p className="welcomeText">
          Esta página guarda algunas cosas que no siempre sé cómo
          decirte directamente.
        </p>

        <div className="headphonesHint">
          <span aria-hidden="true">🎧</span>

          <div>
            <strong>Usa audífonos</strong>
            <small>
              Tómate tu tiempo y escucha cada fragmento que preparé
              para ti.
            </small>
          </div>
        </div>

        <motion.button
          type="button"
          className="welcomeButton"
          onClick={() => setHasEntered(true)}
          whileHover={{
            scale: 1.03,
            y: -2,
          }}
          whileTap={{
            scale: 0.97,
          }}
        >
          Entrar
          <span aria-hidden="true">→</span>
        </motion.button>

        {savedSongIndex !== null && (
          <motion.button
            type="button"
            className="continueExperienceButton"
            onClick={continueExperience}
            disabled={!spotifyReady}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span>Continuar donde te quedaste</span>
            <small>
              {spotifyReady
                ? `Canción ${savedSongIndex + 1} de ${songs.length}`
                : "Preparando la música..."}
            </small>
          </motion.button>
        )}

        <p className="welcomeSignature">
          Hecho pensando en ti
        </p>
      </motion.div>
    </motion.section>
  )}
</AnimatePresence>

      <section className="page">
        <div className="glow glowLeft" />
        <div className="glow glowRight" />

        <motion.div
  className="content"
  initial={false}
  animate={
    hasEntered
      ? {
          opacity: 1,
          y: 0,
        }
      : {
          opacity: 0,
          y: 30,
        }
  }
        >
          <p className="smallTitle">
            Una pequeña colección de sentimientos
          </p>

          <h1>
            Hay cosas que no sé decirte,
            <span>
              así que dejé que algunas canciones lo hicieran por mí.
            </span>
          </h1>

          <button
            type="button"
            className="reginaButton"
            onClick={() => setShowHeart(true)}
          >
            <motion.span
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
            >
              Regina
            </motion.span>
          </button>

          {!showHeart && (
            <motion.p
              className="instruction"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              Toca tu nombre
            </motion.p>
          )}

          {showHeart && (
            <motion.div
              className="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flowerHeart">
                {flowers.map((flower) => (
                  <motion.span
                    key={flower.id}
                    className="flower"
                    style={{
                      left: flower.left,
                      top: flower.top,
                    }}
                    initial={{
                      opacity: 0,
                      scale: 0,
                      rotate: -90,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                    }}
                    transition={{
                      delay: flower.id * 0.035,
                      type: "spring",
                      stiffness: 140,
                    }}
                  >
                    ✿
                  </motion.span>
                ))}

                <motion.div
                  className="initial"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    opacity: {
                      delay: 1.2,
                      duration: 0.5,
                    },
                    scale: {
                      delay: 1.2,
                      duration: 1.4,
                      repeat: Infinity,
                    },
                  }}
                >
                  R
                </motion.div>
              </div>

              <motion.p
                className="dedication"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                Entre tantas canciones, siempre termino pensando en ti.
              </motion.p>

              <motion.button
                type="button"
                className="continueButton"
                onClick={goToSongs}
                disabled={!spotifyReady}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.9 }}
              >
                {spotifyReady
                  ? "Descubre lo que quiero decirte"
                  : "Preparando la música..."}
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </section>

{showSongs && (
  <section id="canciones" className="songsSection">
    <motion.div
      className="songsHeading"
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <p className="songsEyebrow">
        Capítulo {chapters.indexOf(currentChapter) + 1}
      </p>

      <h2>{currentChapter.title}</h2>

      <p>{currentChapter.description}</p>
    </motion.div>

    <div className="progressSection">
      <div className="progressInformation">
        <span>
          Canción {currentSongIndex + 1} de {songs.length}
        </span>

        <strong>
          {String(currentSongIndex + 1).padStart(2, "0")} /{" "}
          {String(songs.length).padStart(2, "0")}
        </strong>
      </div>

      <div className="progressTrack">
        <motion.div
          className="progressFill"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
      <button
  type="button"
  className="openSongIndexButton"
  onClick={() => setShowSongIndex(true)}
>
  <span aria-hidden="true">▦</span>
  Ver las 40 canciones
</button>
    </div>

    <div className="songsList">
      <AnimatePresence mode="wait" custom={navigationDirection}>
        <motion.article
          className="songCard draggableSongCard"
          key={currentSong.number}
          custom={navigationDirection}
          variants={songVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.14}
          dragDirectionLock
          onDragEnd={handleSongDragEnd}
          whileDrag={{
            cursor: "grabbing",
            scale: 0.985,
          }}
        >
          <div className="songCover">
            <Image
              className="coverImage"
              src={currentSong.cover}
              alt={`Portada de ${currentSong.title} de ${currentSong.artist}`}
              fill
              sizes="(max-width: 800px) 100vw, 45vw"
              priority
            />

            <div className="coverOverlay" />

            <span className="coverNumber">
              {currentSong.number}
            </span>

            <div className="coverText">
              <span>Para Regina</span>
              <strong>{currentSong.title}</strong>
              <small>{currentSong.artist}</small>
            </div>
          </div>

          <div className="songContent">
            <span className="songNumber">
              CANCIÓN {currentSong.number}
            </span>

            <h3>{currentSong.title}</h3>

            <p className="songArtist">
              {currentSong.artist}
            </p>

            <div className="dedicatedTime">
              <div>
                <span>El momento que te dedico</span>

                <strong>
                  {currentSong.startTime} — {currentSong.endTime}
                </strong>
              </div>

              <span className="timeIcon">♫</span>
            </div>

            {currentSong.lyrics !== "" && (
              <div className="lyrics">
                <span className="quoteMark">“</span>

                <p>
                  {translatedSongs[currentSong.number] &&
                  currentSong.translatedLyrics
                    ? currentSong.translatedLyrics
                    : currentSong.lyrics}
                </p>

                {currentSong.translatedLyrics ? (
                  <button
                    type="button"
                    className="translationButton"
                    onClick={() =>
                      toggleTranslation(currentSong.number)
                    }
                  >
                    {translatedSongs[currentSong.number]
                      ? "Ver letra original"
                      : "Traducir al español"}
                  </button>
                ) : null}
              </div>
            )}

            <div className="personalDedication">
              <span>Lo que quiero decirte</span>

              <p>{currentSong.message}</p>
            </div>

            <button
  type="button"
  className={
    favoriteSongs.includes(currentSong.number)
      ? "favoriteSongButton favoriteSongButtonActive"
      : "favoriteSongButton"
  }
  onClick={() =>
    toggleFavoriteSong(currentSong.number)
  }
  aria-pressed={
    favoriteSongs.includes(currentSong.number)
  }
>
  <motion.span
    aria-hidden="true"
    animate={
      favoriteSongs.includes(currentSong.number)
        ? {
            scale: [1, 1.35, 1],
          }
        : {
            scale: 1,
          }
    }
    transition={{
      duration: 0.35,
    }}
  >
    {favoriteSongs.includes(currentSong.number)
      ? "♥"
      : "♡"}
  </motion.span>

  <div>
    <strong>
      {favoriteSongs.includes(currentSong.number)
        ? "Guardada entre tus favoritas"
        : "Guardar como favorita"}
    </strong>

    <small>
      {favoriteSongs.includes(currentSong.number)
        ? "Esta canción quedó marcada para ti"
        : "Toca el corazón si esta canción te gustó"}
    </small>
  </div>
</button>

            <a
              className="spotifyButton"
              href={currentSong.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="spotifyIcon">▶</span>
              Escuchar en Spotify
            </a>
          </div>
        </motion.article>
      </AnimatePresence>

      <div className="swipeHint">
        <span aria-hidden="true">←</span>
        <p>
          Desliza para cambiar de canción
          <small>También puedes usar las flechas del teclado</small>
        </p>
        <span aria-hidden="true">→</span>
      </div>
    </div>

    <div className="songNavigation">
      <button
        type="button"
        className="navigationButton"
        onClick={previousSong}
        disabled={currentSongIndex === 0}
      >
        <span>←</span>

        <div>
          <small>Anterior</small>
          <strong>
            {currentSongIndex === 0
              ? "Inicio"
              : songs[currentSongIndex - 1].title}
          </strong>
        </div>
      </button>

      <button
  type="button"
  className="navigationButton navigationButtonNext"
  onClick={nextSong}
>
  <div>
    <small>
      {currentSongIndex === songs.length - 1
        ? "Una última cosa"
        : "Siguiente"}
    </small>

    <strong>
      {currentSongIndex === songs.length - 1
        ? "Abrir la carta para Regina"
        : songs[currentSongIndex + 1].title}
    </strong>
  </div>

  <span>→</span>
</button>
    </div>
  </section>
)}

<AnimatePresence>
  {showSongs && !showSongIndex && !showFinal && (
    <motion.nav
      key="mobile-song-dock"
      className="mobileSongDock"
      aria-label="Navegación de canciones"
      initial={{
        opacity: 0,
        y: 35,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 35,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      <button
        type="button"
        className="mobileSongDockButton"
        onClick={previousSong}
        disabled={currentSongIndex === 0}
        aria-label="Canción anterior"
      >
        ←
      </button>

      <button
        type="button"
        className="mobileSongDockInformation"
        onClick={() => setShowSongIndex(true)}
        aria-label="Abrir índice de canciones"
      >
        <small>
          Canción {currentSongIndex + 1} de {songs.length}
        </small>

        <strong>{currentSong.title}</strong>

        <span>{currentSong.artist}</span>
      </button>

      <button
        type="button"
        className="mobileSongDockButton mobileSongDockNext"
        onClick={nextSong}
        aria-label={
          currentSongIndex === songs.length - 1
            ? "Abrir carta final"
            : "Canción siguiente"
        }
      >
        {currentSongIndex === songs.length - 1 ? "✉" : "→"}
      </button>

      <div className="mobileSongDockProgress">
        <motion.div
          animate={{
            width: `${progress}%`,
          }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.nav>
  )}
</AnimatePresence>

<AnimatePresence>
  {showSongIndex && (
    <motion.div
      className="songIndexOverlay"
      role="dialog"
      aria-modal="true"
      aria-label="Índice de canciones"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => {
  setShowSongIndex(false);
  setShowOnlyFavorites(false);
}}
    >
      <motion.div
        className="songIndexPanel"
        initial={{
          opacity: 0,
          y: 35,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 25,
          scale: 0.98,
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
        onClick={(event: { stopPropagation: () => void }) => event.stopPropagation()}
      >
        <div className="songIndexHeader">
          <div>
            <p className="songIndexEyebrow">
              Nuestra banda sonora
            </p>

            <h2>40 canciones para Regina</h2>

            <p>
              Puedes recorrerlas en orden o elegir directamente una
              canción.
            </p>

            {favoriteSongs.length > 0 && (
  <p className="favoriteSongCount">
    ♥ {favoriteSongs.length}{" "}
    {favoriteSongs.length === 1
      ? "canción favorita"
      : "canciones favoritas"}
  </p>
)}

<div className="songIndexFilters">
  <button
    type="button"
    className={
      showOnlyFavorites
        ? "favoriteFilterButton favoriteFilterButtonActive"
        : "favoriteFilterButton"
    }
    onClick={() =>
      setShowOnlyFavorites((currentValue) => !currentValue)
    }
    disabled={favoriteSongs.length === 0}
    aria-pressed={showOnlyFavorites}
  >
    <span aria-hidden="true">
      {showOnlyFavorites ? "♥" : "♡"}
    </span>

    {showOnlyFavorites
      ? "Mostrar todas"
      : "Solo favoritas"}
  </button>
</div>
          </div>

          <button
  type="button"
  className="closeSongIndexButton"
  onClick={() => {
    setShowSongIndex(false);
    setShowOnlyFavorites(false);
  }}
  aria-label="Cerrar índice"
>
  ×
</button>
        </div>

        <div className="songIndexChapters">
          {showOnlyFavorites && favoriteSongs.length === 0 && (
  <motion.div
    className="emptyFavoritesMessage"
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <span aria-hidden="true">♡</span>

    <h3>Todavía no hay favoritas</h3>

    <p>
      Marca una canción con el corazón y aparecerá aquí.
    </p>
  </motion.div>
)}
          {chapters.map((chapter, chapterIndex) => (
            <section
              className="songIndexChapter"
              key={chapter.title}
            >
              <div className="songIndexChapterHeading">
                <span>
                  Capítulo {chapterIndex + 1}
                </span>

                <h3>{chapter.title}</h3>
              </div>

              <div className="songIndexGrid">
                {songs
                  .slice(chapter.start, chapter.end + 1)
                  .map((song, localIndex) => {
                    const songIndex =
                      chapter.start + localIndex;

                    const isCurrentSong =
                      songIndex === currentSongIndex;

                      const hasVisitedSong =
  visitedSongs.includes(song.number);

  const isFavoriteSong =
  favoriteSongs.includes(song.number);

  if (showOnlyFavorites && !isFavoriteSong) {
  return null;
}

                    return (
                      <button
                        type="button"
                        className={
                          isCurrentSong
                            ? "songIndexCard songIndexCardActive"
                            : "songIndexCard"
                        }
                        key={song.number}
                        onClick={() =>
                          openSongFromIndex(songIndex)
                        }
                      >
                        <div className="songIndexCover">
                          <Image
                            src={song.cover}
                            alt={`Portada de ${song.title}`}
                            fill
                            sizes="(max-width: 600px) 42vw, 180px"
                          />

                          <div className="songIndexCoverOverlay" />

                          <span className="songIndexNumber">
                            {song.number}
                          </span>

                          {isFavoriteSong && (
  <span
    className="favoriteSongBadge"
    aria-label="Canción favorita"
  >
    ♥ Favorita
  </span>
)}

                          {isCurrentSong && (
                            <span className="currentSongBadge">
                              Estás aquí
                            </span>
                          )}

                          {hasVisitedSong && !isCurrentSong && (
  <span className="visitedSongBadge">
    Vista
  </span>
)}
                        </div>

                        <div className="songIndexInformation">
                          <strong>{song.title}</strong>
                          <span>{song.artist}</span>
                        </div>
                      </button>
                    );
                  })}
              </div>
            </section>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

<AnimatePresence>
  {showFinal && (
    <motion.section
      id="final"
      className="finalSection"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="finalPetals" aria-hidden="true">
        {finalPetals.map((petal) => (
          <motion.span
            key={petal.id}
            className="fallingPetal"
            style={{
              left: petal.left,
              fontSize: `${petal.size}px`,
            }}
            initial={{
              y: "-15vh",
              x: 0,
              rotate: 0,
              opacity: 0,
            }}
            animate={{
              y: "120vh",
              x: [0, petal.movement, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            ✿
          </motion.span>
        ))}
      </div>

      <motion.div
        className="finalContent"
        initial={{ opacity: 0, y: 45 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.25 }}
      >
        <p className="finalEyebrow">Una última cosa</p>

        <div className="finalHeart" aria-hidden="true">
          {flowers.map((flower) => (
            <motion.span
              key={flower.id}
              className="finalFlower"
              style={{
                left: flower.left,
                top: flower.top,
              }}
              initial={{
                opacity: 0,
                scale: 0,
                rotate: -90,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              transition={{
                delay: 0.3 + flower.id * 0.025,
                type: "spring",
                stiffness: 130,
              }}
            >
              ✿
            </motion.span>
          ))}

          <motion.div
            className="finalInitial"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: [1, 1.08, 1],
            }}
            transition={{
              opacity: {
                delay: 1.3,
                duration: 0.5,
              },
              scale: {
                delay: 1.3,
                duration: 1.5,
                repeat: Infinity,
              },
            }}
          >
            R
          </motion.div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          Para ti, Regina
        </motion.h2>

        <motion.div
          className="finalLetter"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <p>
            Hice esta página porque hay sentimientos que a veces me
            cuesta explicar directamente. Entonces decidí reunir
            canciones que, de una manera u otra, dicen algo de todo lo
            que provocas en mí.
          </p>

          <p>
            Cada minuto, cada mensaje y cada detalle de esta página fue
            elegido pensando en ti. No espero que las canciones hablen
            por mí para siempre; solamente quería encontrar una forma
            bonita y sincera de enseñarte lo especial que te has vuelto
            para mí.
          </p>

          <p>
            Me gustas por tu forma de ser, por tu sonrisa, por tus ojos
            cafés y por todas esas pequeñas cosas que hacen que seas tú.
            Me encanta seguir conociéndote y descubrir algo nuevo de ti
            cada vez.
          </p>

          <p>
            No quiero apresurarte ni hacerte sentir presionada. Solo
            quiero que sepas que mis intenciones contigo son sinceras y
            que me gustaría construir algo bonito, tranquilo y especial,
            paso a paso.
          </p>

          <p className="finalQuestion">
            ¿Me darías la oportunidad de seguir escribiendo esta historia
            contigo?
          </p>

          <span className="finalSignature">Con cariño, Emmanuel Roldan</span>
        </motion.div>

        <motion.div
          className="finalActions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <a
            className="finalPrimaryButton"
            href={playlistUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>▶</span>
            Abrir la playlist completa en Spotify
          </a>

          <button
            type="button"
            className="finalSecondaryButton"
            onClick={returnToLastSong}
          >
            ← Volver a la canción 40
          </button>

          <button
            type="button"
            className="finalTextButton"
            onClick={restartExperience}
          >
            Volver al inicio
          </button>
        </motion.div>

        <motion.p
          className="finalClosing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3 }}
        >
          40 canciones. Una sola persona.
        </motion.p>
      </motion.div>
    </motion.section>
  )}
</AnimatePresence>

      <div
        className={
          showSongs && !showFinal
            ? "spotifyFloatingPlayer spotifyFloatingPlayerVisible"
            : "spotifyFloatingPlayer"
        }
        aria-label="Reproductor del fragmento seleccionado"
      >
        <div className="spotifySnippetHeader">
          <div className="spotifySnippetInformation">
            <small>Fragmento seleccionado</small>
            <strong>{currentSong.title}</strong>
            <span>
              {currentSong.startTime} — {currentSong.endTime}
            </span>
          </div>

          <button
            type="button"
            className="spotifySnippetControl"
            onClick={toggleSnippetPlayback}
            disabled={!spotifyReady || spotifyIsBuffering}
            aria-label={
              spotifyIsPlaying
                ? "Pausar fragmento"
                : spotifyHasReachedEnd
                  ? "Repetir fragmento"
                  : "Reproducir fragmento"
            }
          >
            {spotifyIsPlaying
              ? "❚❚"
              : spotifyHasReachedEnd
                ? "↻"
                : "▶"}
          </button>
        </div>

        <div
          className="spotifyLocalProgress"
          aria-hidden="true"
        >
          <motion.div
            className="spotifyLocalProgressFill"
            animate={{
              width:
                audioRef.current?.duration &&
                Number.isFinite(audioRef.current.duration)
                  ? `${Math.min(
                      100,
                      (spotifyPositionSeconds /
                        audioRef.current.duration) *
                        100
                    )}%`
                  : "0%",
            }}
            transition={{ duration: 0.15, ease: "linear" }}
          />
        </div>

        <p className="spotifySnippetStatus">
          {audioError
            ? audioError
            : spotifyIsBuffering
              ? "Cargando el fragmento..."
              : spotifyHasReachedEnd
                ? "Fragmento terminado. Puedes repetirlo."
                : spotifyIsPlaying
                  ? `Sonando · ${formatSeconds(
                      spotifyPositionSeconds
                    )}`
                  : "Pausado"}
        </p>
      </div>

      <style jsx global>{`
        .spotifyFloatingPlayer {
          position: fixed;
          z-index: 8500;
          right: 18px;
          bottom: 18px;
          width: min(430px, calc(100% - 36px));
          padding: 12px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 24px;
          background: rgba(24, 13, 18, 0.94);
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(20px);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transform: translateY(25px);
          transition:
            opacity 0.3s ease,
            visibility 0.3s ease,
            transform 0.3s ease;
        }

        .spotifyFloatingPlayerVisible {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translateY(0);
        }

        .spotifySnippetHeader {
          margin-bottom: 9px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
        }

        .spotifySnippetInformation {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .spotifySnippetInformation small {
          color: #dda0ae;
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .spotifySnippetInformation strong {
          overflow: hidden;
          color: #f8eee8;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 0.92rem;
          font-weight: 400;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .spotifySnippetInformation span {
          color: rgba(248, 238, 232, 0.55);
          font-size: 0.67rem;
        }

        .spotifySnippetControl {
          flex: 0 0 auto;
          width: 43px;
          height: 43px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          background: #efc6d0;
          color: #311720;
          font-size: 1rem;
        }

        .spotifySnippetControl:disabled {
          cursor: wait;
          opacity: 0.5;
        }

        .spotifyEmbedHost {
          min-height: 80px;
          overflow: hidden;
          border-radius: 16px;
        }

        .spotifyEmbedHost iframe {
          display: block;
          width: 100%;
          border: 0;
          border-radius: 16px;
        }


        .spotifyLocalProgress {
          width: 100%;
          height: 4px;
          margin: 4px 0 9px;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.14);
        }

        .spotifyLocalProgressFill {
          height: 100%;
          border-radius: inherit;
          background: #1ed760;
        }

        .spotifySnippetStatus {
          margin: 8px 2px 0;
          color: rgba(248, 238, 232, 0.5);
          font-size: 0.62rem;
          text-align: center;
        }

        .welcomeButton:disabled,
        .continueButton:disabled,
        .continueExperienceButton:disabled {
          cursor: wait;
          opacity: 0.55;
        }

        @media (max-width: 800px) {
          .spotifyFloatingPlayer {
            right: 14px;
            bottom: calc(104px + env(safe-area-inset-bottom));
            left: 14px;
            width: auto;
          }
        }
      `}</style>

    </main>
  );
}