La dirección web del presente repositorio es [https://investigandos.github.io](https://investigandos.github.io) y se basa en github pages como servidor gratuito que emplea como motor web [Jekyll](https://jekyllrb.com/).

A continuación algunas instrucciones básicas:

# Estructura de archivos

1. En la carpeta "**_data**" se suben archivos en formato YAML o YML. Es algo así como una base de datos con archivos indivifuales como fuente. Por el momento hay 
tres (3) tipos de datos:
- __Acrónimos__ con estructura simple de "KEY:VALUE". Sirve para definir una sola vez los acrónimos y no tener que estar definiendolos en cada documento que lo contenga. Cada archivo "engloba" por temática una serie de acrónimos.
    
- __Definiciones__ es equivalente a los Acrónimos, con la salvedad que lo que contiene son definiciones (todo lo largas que se necesite). Cada archivo "engloba" por temática una serie de acrónimos.

- __Bibliografía__ es la fuente principal de información, cada archivo individual es una referencia bibliográfica. Por el momento se admiten los siguientes tipos: "article", "paper", "book" y "media". El  último tipo agrega tanto podcasts de audio como video. La estructura básica para cada referencia es la misma aunque según el tipo se pueden incluir "variables" específicas. 

Para más casos ver los ejemplos incluidos en _data/biblio

2. En la carpeta "**_posts**" se suben artículos de elaboración propia a publicar (notas, apuntes, artículos explicativos, etc...). Si contienen el campo "draft: true" no se publicarán al entenderse que son borradores sin terminar. Para su elaboración se emplea el formato [Markdown](https://www.markdownguide.org/cheat-sheet/) en archivos con extensión ".md".

La vista de los _posts incluye un menú tipo índice del contenido del artículo.

3. En la carpeta "**_docs**" se suben artículos de elaboración propia con estructura más compleja. La diferencia con _posts es que en este caso cada documento se encuentra en su propia carpeta que contiene un número indeterminado de archivos. Cada archivo es una sección/capítulo del documento. Para su elaboración se emplea el formato [Markdown](https://www.markdownguide.org/cheat-sheet/) en archivos con extensión ".md".

La vista de los _docs incluye un menú tipo índice del contenido de la sección; así como otro adicional para navegar entre las distintas secciones.

4. El resto de carpetas son relativas a la creación y diseño de la página web en sí, y no a su contenido.

# Sobre YAML
En el este [enlace](https://quickref.me/yaml.html) se puede consultar un resumen de las posibles maneras de usar YAML.

Si se quiere verificar que la estructura del archivo es correcta se peude usar esta [herramienta online](https://www.yamllint.com/) muy cómoda.


# Sobre Markdown
En el este [enlace](https://www.markdownguide.org/cheat-sheet/) hay un resumen del formato.

Todo documento .md puede contener una cabecera inicial para incluir metadatos. Las "variables" se escriben como KEY:VALUE y van dentro de dicha cabecera, por ejemplo:

<pre>
---
title: El título del artículo
tags: [Tematica 1, Tematica 2]
date: 2024-08-04
draft: true
---
</pre>

El resto del documento es simple texto empleando el formato de MD para definir encabezados, enlaces, texto en negrita, etc...


