const text = (de, en) => ({ de, en })

const option = (de, en) => text(de, en)

const question = (id, level, topic, promptDe, promptEn, options, correct) => ({
  id: `q-${String(id).padStart(3, '0')}`,
  number: id,
  level,
  topic,
  prompt: text(promptDe, promptEn),
  options,
  correct,
  multiple: correct.length > 1,
})

const topics = {
  internet: text('Internet', 'Internet'),
  devtools: text('Developer Tools', 'Developer tools'),
  ai: text('KI', 'AI'),
  html1: text('HTML · Grundlagen', 'HTML · Foundations'),
  html2: text('HTML · Text & Listen', 'HTML · Text & lists'),
  html3: text('HTML · Links & Bilder', 'HTML · Links & images'),
  html4: text('HTML · Tabellen & Formulare', 'HTML · Tables & forms'),
  css1: text('CSS · Grundlagen', 'CSS · Foundations'),
  css2: text('CSS · Typografie & Farben', 'CSS · Typography & color'),
  css3: text('CSS · Selektoren', 'CSS · Selectors'),
  css4: text('CSS · Box-Modell', 'CSS · Box model'),
  css5: text('CSS · Flexbox', 'CSS · Flexbox'),
  css6: text('CSS · Grid', 'CSS · Grid'),
  css7: text('CSS · Responsive Design', 'CSS · Responsive design'),
  css8: text('CSS · Animationen', 'CSS · Animations'),
  js1: text('JavaScript · DOM', 'JavaScript · DOM'),
  js2: text('JavaScript · Funktionen', 'JavaScript · Functions'),
  js3: text('JavaScript · Events', 'JavaScript · Events'),
  js4: text('JavaScript · DOM & CSS', 'JavaScript · DOM & CSS'),
  js5: text('JavaScript · Formulare', 'JavaScript · Forms'),
}

export const questions = [
  question(1, 1, topics.internet, 'Wofür wird DNS verwendet?', 'What is DNS used for?', [
    option('Um Domainnamen in IP-Adressen umzuwandeln', 'To translate domain names into IP addresses'),
    option('Um Webseiten bunter zu machen', 'To make websites more colorful'),
    option('Um Webseiten offline zu speichern', 'To save websites offline'),
    option('Um Dateien zu speichern', 'To store files'),
  ], [0]),
  question(2, 1, topics.internet, 'Welche Aufgaben hat ein Webbrowser?', 'Which tasks does a web browser perform?', [
    option('Daten der Webseite beim Webserver anfragen', 'Request website data from the web server'),
    option('Server programmieren', 'Program servers'),
    option('Die Webseite mithilfe der Webseitendaten darstellen', 'Render the website using its data'),
    option('Webseiten designen', 'Design websites'),
  ], [0, 2]),
  question(3, 1, topics.internet, 'Was ist der Zweck von HTTP?', 'What is the purpose of HTTP?', [
    option('Webseiten verschlüsseln', 'Encrypt websites'),
    option('Kommunikation zwischen Client und Server ermöglichen', 'Enable communication between client and server'),
    option('Dateien auf dem Computer speichern', 'Store files on the computer'),
    option('Programme installieren', 'Install programs'),
  ], [1]),
  question(4, 1, topics.internet, 'Welche Information enthält eine IP-Adresse?', 'What information does an IP address contain?', [
    option('Den Namen der Webseite', 'The website name'),
    option('Die Adresse eines Computers oder Servers im Netzwerk', 'The address of a computer or server on a network'),
    option('Den Standort des Benutzers', 'The user’s location'),
    option('Den Namen des Computers', 'The computer name'),
  ], [1]),
  question(5, 1, topics.internet, 'Was bedeutet „localhost“?', 'What does “localhost” mean?', [
    option('Ein fremder Server im Internet', 'A remote server on the internet'),
    option('Ein spezielles Terminal-Programm', 'A special terminal program'),
    option('Der eigene Computer', 'Your own computer'),
    option('Der Server einer anderen Person', 'Another person’s server'),
  ], [2]),

  question(6, 1, topics.devtools, 'Was ist der Zweck von Browser Developer Tools?', 'What is the purpose of browser developer tools?', [
    option('Um Webseiten direkt zu erstellen', 'To create websites directly'),
    option('Um Fehler auf Webseiten zu finden und ihren Code zu sehen', 'To find website errors and inspect their code'),
    option('Um Webseiten auf Viren zu überprüfen', 'To scan websites for viruses'),
    option('Um Webseiten herunterzuladen', 'To download websites'),
  ], [1]),
  question(7, 1, topics.devtools, 'Welche Funktion hat der „Konsole“-Tab in den Developer Tools?', 'What does the Console tab in developer tools do?', [
    option('Er ermöglicht das Bearbeiten des HTML-Codes', 'It lets you edit HTML code'),
    option('Er zeigt Fehler und Warnungen im Code an', 'It displays errors and warnings in the code'),
    option('Er zeigt die Ladezeit der Webseite an', 'It displays the website loading time'),
    option('Er zeigt Bilder der Webseite an', 'It displays the website’s images'),
  ], [1]),
  question(8, 1, topics.devtools, 'Was kannst du mit dem „Elemente“-Tab in den Developer Tools machen?', 'What can you do with the Elements tab in developer tools?', [
    option('Einen Server starten', 'Start a server'),
    option('Eine Webseite neu programmieren', 'Reprogram a website'),
    option('Den HTML- und CSS-Code einer Webseite ansehen und bearbeiten', 'View and edit a website’s HTML and CSS'),
    option('Eine Webseite aus dem Internet löschen', 'Delete a website from the internet'),
  ], [2]),
  question(9, 1, topics.devtools, 'Was bedeutet „Responsive Design“ in der Webentwicklung?', 'What does “responsive design” mean in web development?', [
    option('Das Design passt sich nicht an verschiedene Bildschirmgrößen an', 'The design does not adapt to different screen sizes'),
    option('Das Design passt sich automatisch an verschiedene Geräte und Bildschirmgrößen an', 'The design automatically adapts to different devices and screen sizes'),
    option('Das Design ist nur für Desktops gedacht', 'The design is only intended for desktops'),
    option('Das Design verwendet immer die gleiche Schriftgröße', 'The design always uses the same font size'),
  ], [1]),
  question(10, 1, topics.devtools, 'Wie kannst du im „Netzwerk“-Tab die Ladezeit einer Webseite überwachen?', 'How can you monitor website loading time in the Network tab?', [
    option('Die Ladezeiten von Ressourcen wie Bildern, CSS und JavaScript prüfen', 'Inspect the loading times of resources such as images, CSS, and JavaScript'),
    option('Bilder zur Webseite hinzufügen', 'Add images to the website'),
    option('Die Schriftarten auf der Seite ändern', 'Change the fonts on the page'),
    option('JavaScript-Code testen', 'Test JavaScript code'),
  ], [0]),

  question(11, 1, topics.ai, 'Was ist der beste erste Schritt, wenn eine KI-Antwort zu kompliziert oder technisch ist?', 'What is the best first step when an AI answer is too complicated or technical?', [
    option('Eine andere KI ausprobieren', 'Try a different AI'),
    option('Die Frage aufgeben und später noch einmal probieren', 'Give up and try again later'),
    option('Nach einer einfacheren Erklärung oder einem Alltagsbeispiel fragen', 'Ask for a simpler explanation or an everyday example'),
    option('Die Antwort auswendig lernen, auch wenn man sie nicht versteht', 'Memorize the answer even if you do not understand it'),
  ], [2]),
  question(12, 1, topics.ai, 'Bei welchen alltäglichen Aufgaben kann KI euch unterstützen?', 'Which everyday tasks can AI help you with?', [
    option('Komplexe Texte zusammenfassen', 'Summarize complex texts'),
    option('Eure Wohnung aufräumen', 'Clean your apartment'),
    option('Automatisch einkaufen gehen', 'Go shopping automatically'),
    option('Code erklären', 'Explain code'),
  ], [0, 3]),
  question(13, 1, topics.ai, 'Welche davon sind KI-/LLM-Modelle?', 'Which of these are AI/LLM models?', [
    option('Claude', 'Claude'),
    option('ChatGPT', 'ChatGPT'),
    option('Gemini', 'Gemini'),
    option('Microsoft Word', 'Microsoft Word'),
  ], [0, 1, 2]),
  question(14, 1, topics.ai, 'Welche Aussagen über das Arbeiten mit KI sind richtig?', 'Which statements about working with AI are correct?', [
    option('Nachfragen sind wichtig, wenn etwas unklar ist', 'Follow-up questions are important when something is unclear'),
    option('KI kann normalen Text und Code analysieren', 'AI can analyze both ordinary text and code'),
    option('Man sollte konkrete, spezifische Fragen stellen', 'You should ask concrete, specific questions'),
    option('KI hat immer recht und muss nicht hinterfragt werden', 'AI is always right and does not need to be questioned'),
  ], [0, 1, 2]),
  question(15, 1, topics.ai, 'Welche Schwächen haben KI-Systeme?', 'What weaknesses do AI systems have?', [
    option('Sie haben begrenzten Zugriff auf Ereignisse nach ihrem Trainingsdatum', 'They have limited access to events after their training date'),
    option('Sie können falsche oder erfundene Informationen als Fakten darstellen', 'They can present false or invented information as fact'),
    option('Sie verstehen unklare Fragen immer genau', 'They always understand unclear questions precisely'),
    option('Sie können voreingenommen sein', 'They can be biased'),
  ], [0, 1, 3]),

  question(16, 1, topics.html1, 'Was ist HTML?', 'What is HTML?', [
    option('Ein Grafikformat für Bilder', 'A graphics format for images'),
    option('Eine Auszeichnungssprache zur Strukturierung von Webseiten', 'A markup language for structuring web pages'),
    option('Ein Texteditor', 'A text editor'),
    option('Eine Programmiersprache zur Logiksteuerung', 'A programming language for logic'),
  ], [1]),
  question(17, 1, topics.html1, 'Welche Endung hat eine HTML-Datei?', 'Which extension does an HTML file use?', [
    option('.doc', '.doc'),
    option('.web', '.web'),
    option('.html', '.html'),
    option('.htl', '.htl'),
  ], [2]),
  question(18, 1, topics.html1, 'Welche drei Hauptbereiche enthält ein HTML-Dokument?', 'Which three main areas does an HTML document contain?', [
    option('html, head, body', 'html, head, body'),
    option('script, style, content', 'script, style, content'),
    option('header, section, footer', 'header, section, footer'),
    option('doctype, code, end', 'doctype, code, end'),
  ], [0]),
  question(19, 1, topics.html1, 'Was enthält der <head>-Bereich?', 'What does the <head> section contain?', [
    option('Navigation und Footer', 'Navigation and footer'),
    option('Den sichtbaren Seiteninhalt', 'The visible page content'),
    option('Metadaten und den Titel', 'Metadata and the title'),
    option('Nur Überschriften', 'Only headings'),
  ], [2]),
  question(20, 1, topics.html1, 'Was enthält der <body>-Bereich?', 'What does the <body> section contain?', [
    option('Den sichtbaren Inhalt der Webseite', 'The visible content of the web page'),
    option('Nur Skripte', 'Only scripts'),
    option('Nur Stylesheets', 'Only style sheets'),
    option('Metadaten für den Browser', 'Metadata for the browser'),
  ], [0]),

  question(21, 2, topics.html2, 'Was bedeutet Textformatierung in HTML?', 'What does text formatting mean in HTML?', [
    option('Das Speichern von Text in Datenbanken', 'Storing text in databases'),
    option('Das automatische Korrigieren von Texten', 'Automatically correcting text'),
    option('Die sichtbare Gestaltung und Gliederung von Text im Browser', 'The visible styling and organization of text in the browser'),
    option('Das Übersetzen von Texten in andere Sprachen', 'Translating text into other languages'),
  ], [2]),
  question(22, 2, topics.html2, 'Was ist semantische Formatierung?', 'What is semantic formatting?', [
    option('Ein CSS-Stil', 'A CSS style'),
    option('Formatierung, die zusätzlich eine Bedeutung vermittelt', 'Formatting that also conveys meaning'),
    option('Formatierung nur zur Optik', 'Formatting only for appearance'),
    option('Eine Schriftarteneinstellung', 'A font setting'),
  ], [1]),
  question(23, 2, topics.html2, 'Welches Tag ist nur visuell fett, aber ohne zusätzliche Bedeutung?', 'Which tag is visually bold but adds no extra meaning?', [
    option('<em>', '<em>'),
    option('<code>', '<code>'),
    option('<strong>', '<strong>'),
    option('<b>', '<b>'),
  ], [3]),
  question(24, 2, topics.html2, 'Wie erstellt man eine ungeordnete Liste?', 'How do you create an unordered list?', [
    option('Mit <list>', 'With <list>'),
    option('Mit <div>', 'With <div>'),
    option('Mit <ol> und <li>', 'With <ol> and <li>'),
    option('Mit <ul> und <li>', 'With <ul> and <li>'),
  ], [3]),
  question(25, 2, topics.html2, 'Welches Tag fügt einen Zeilenumbruch ein, ohne einen neuen Absatz zu beginnen?', 'Which tag inserts a line break without starting a new paragraph?', [
    option('<br>', '<br>'),
    option('<hr>', '<hr>'),
    option('<p>', '<p>'),
    option('<line>', '<line>'),
  ], [0]),

  question(26, 2, topics.html3, 'Wofür steht das <a>-Tag in HTML?', 'What does the <a> tag stand for in HTML?', [
    option('Für „align“ – es richtet Text aus', 'For “align” — it aligns text'),
    option('Für „anchor“ – es erzeugt einen Link', 'For “anchor” — it creates a link'),
    option('Für „article“ – es beschreibt Textabschnitte', 'For “article” — it describes text sections'),
    option('Für „arrow“ – es fügt Pfeile hinzu', 'For “arrow” — it adds arrows'),
  ], [1]),
  question(27, 2, topics.html3, 'Welches Attribut legt das Ziel eines Links fest?', 'Which attribute sets a link’s destination?', [
    option('target', 'target'),
    option('href', 'href'),
    option('ref', 'ref'),
    option('src', 'src'),
  ], [1]),
  question(28, 2, topics.html3, 'Mit welchem Tag wird ein Bild eingefügt?', 'Which tag inserts an image?', [
    option('<img>', '<img>'),
    option('<image>', '<image>'),
    option('<src>', '<src>'),
    option('<pic>', '<pic>'),
  ], [0]),
  question(29, 2, topics.html3, 'Welches Attribut ist für die Bildquelle zuständig?', 'Which attribute specifies an image source?', [
    option('alt', 'alt'),
    option('path', 'path'),
    option('href', 'href'),
    option('src', 'src'),
  ], [3]),
  question(30, 2, topics.html3, 'Wie kann man die Größe eines Bildes in HTML anpassen?', 'How can you adjust an image’s size in HTML?', [
    option('Mit <resize>', 'With <resize>'),
    option('Mit CSS-Klassen', 'With CSS classes'),
    option('Mit den Attributen width und height', 'With the width and height attributes'),
    option('Mit <size>', 'With <size>'),
  ], [2]),

  question(31, 2, topics.html4, 'Womit wird eine Tabelle in HTML erstellt?', 'Which tag creates a table in HTML?', [
    option('<tab>', '<tab>'),
    option('<layout>', '<layout>'),
    option('<grid>', '<grid>'),
    option('<table>', '<table>'),
  ], [3]),
  question(32, 2, topics.html4, 'Welche Tags gehören zu einer Tabellenzeile?', 'Which tags belong to a table row?', [
    option('<div> mit <p>', '<div> with <p>'),
    option('<tr> mit <th> oder <td>', '<tr> with <th> or <td>'),
    option('<ul> und <li>', '<ul> and <li>'),
    option('<row> mit <cell>', '<row> with <cell>'),
  ], [1]),
  question(33, 2, topics.html4, 'Wofür steht das <td>-Tag?', 'What is the <td> tag used for?', [
    option('Für ein Tabellenende', 'For the end of a table'),
    option('Für eine Zelle mit Daten', 'For a cell containing data'),
    option('Für eine Tabellenbeschreibung', 'For a table description'),
    option('Für eine Tabellenüberschrift', 'For a table heading'),
  ], [1]),
  question(34, 2, topics.html4, 'Was ist ein Formular in HTML?', 'What is a form in HTML?', [
    option('Ein Stil-Container für CSS', 'A style container for CSS'),
    option('Eine Sammlung von Links', 'A collection of links'),
    option('Ein Abschnitt mit Tabellen', 'A section containing tables'),
    option('Ein Bereich zur Eingabe von Nutzerdaten', 'An area for entering user data'),
  ], [3]),
  question(35, 2, topics.html4, 'Welches Attribut legt die Art des Eingabefeldes fest?', 'Which attribute sets the kind of input field?', [
    option('id', 'id'),
    option('value', 'value'),
    option('type', 'type'),
    option('name', 'name'),
  ], [2]),

  question(36, 2, topics.css1, 'Was ist CSS?', 'What is CSS?', [
    option('Eine Stylesheet-Sprache zur Gestaltung von Webseiten', 'A style sheet language for designing web pages'),
    option('Ein Protokoll zur Datenübertragung im Internet', 'A protocol for transferring data on the internet'),
    option('Eine Programmiersprache für Datenbanken', 'A programming language for databases'),
    option('Ein Betriebssystem für Webserver', 'An operating system for web servers'),
  ], [0]),
  question(37, 2, topics.css1, 'Welche Methode gilt als beste Variante, um CSS mit HTML zu verbinden?', 'Which method is considered the best way to connect CSS to HTML?', [
    option('Eine externe CSS-Datei über <link> im <head> einbinden', 'Link an external CSS file with <link> in the <head>'),
    option('CSS über ein JavaScript-Skript generieren', 'Generate CSS with a JavaScript script'),
    option('CSS über <style> im <body> einfügen', 'Insert CSS with <style> in the <body>'),
    option('CSS über das style-Attribut direkt am Element setzen', 'Set CSS directly on an element with the style attribute'),
  ], [0]),
  question(38, 2, topics.css1, 'Was passiert bei der CSS-Regel .example { ... }?', 'What happens with the CSS rule .example { ... }?', [
    option('Der Stil gilt für alle HTML-Tags, die example heißen', 'The style applies to every HTML tag named example'),
    option('Der Stil gilt automatisch für alle Elemente', 'The style automatically applies to all elements'),
    option('Der Stil gilt nur für <example>-Custom-Tags', 'The style applies only to <example> custom tags'),
    option('Der Stil gilt für alle Elemente mit class="example"', 'The style applies to all elements with class="example"'),
  ], [3]),
  question(39, 2, topics.css1, 'Welche Aussage beschreibt den Vorteil von CSS-Klassen am besten?', 'Which statement best describes the advantage of CSS classes?', [
    option('Klassen können nur einmal pro Dokument verwendet werden', 'Classes can only be used once per document'),
    option('Mehrere unterschiedliche Elemente können denselben Stil erhalten', 'Several different elements can receive the same style'),
    option('Klassen setzen sich automatisch gegen alle anderen Stile durch', 'Classes automatically override all other styles'),
    option('Eine Klasse kann nur die Schriftfarbe ändern', 'A class can only change font color'),
  ], [1]),
  question(40, 2, topics.css1, 'Welche Schreibweise wendet einen Stil auf alle <h2>-Elemente an?', 'Which syntax applies a style to every <h2> element?', [
    option('h2() { ... }', 'h2() { ... }'),
    option('h2 { ... }', 'h2 { ... }'),
    option('#h2 { ... }', '#h2 { ... }'),
    option('.h2 { ... }', '.h2 { ... }'),
  ], [1]),

  question(41, 3, topics.css2, 'Welche CSS-Eigenschaft legt die Schriftart eines Textes fest?', 'Which CSS property sets a text’s font family?', [
    option('font-family', 'font-family'),
    option('font-weight', 'font-weight'),
    option('text-font', 'text-font'),
    option('font-style-family', 'font-style-family'),
  ], [0]),
  question(42, 3, topics.css2, 'Welche Einheit ist relativ zur Schriftgröße des Eltern-Elements?', 'Which unit is relative to the parent element’s font size?', [
    option('px', 'px'),
    option('rem', 'rem'),
    option('em', 'em'),
    option('vh', 'vh'),
  ], [2]),
  question(43, 3, topics.css2, 'Welche CSS-Eigenschaft verändert den Abstand zwischen einzelnen Buchstaben?', 'Which CSS property changes the space between individual letters?', [
    option('line-height', 'line-height'),
    option('word-spacing', 'word-spacing'),
    option('text-indent', 'text-indent'),
    option('letter-spacing', 'letter-spacing'),
  ], [3]),
  question(44, 3, topics.css2, 'Wozu dient der Alpha-Wert bei rgba()?', 'What is the alpha value in rgba() used for?', [
    option('Er legt die Transparenz einer Farbe fest', 'It sets a color’s transparency'),
    option('Er definiert die Schriftstärke', 'It defines font weight'),
    option('Er bestimmt die Helligkeit', 'It determines brightness'),
    option('Er steuert die Farbsättigung', 'It controls color saturation'),
  ], [0]),
  question(45, 3, topics.css2, 'Wie greift man auf eine in :root definierte CSS-Variable zu?', 'How do you access a CSS variable defined in :root?', [
    option('var(--primary)', 'var(--primary)'),
    option('var-color(primary)', 'var-color(primary)'),
    option('use(--primary)', 'use(--primary)'),
    option('color.primary', 'color.primary'),
  ], [0]),

  question(46, 3, topics.css3, 'Welcher Selektor wählt alle Elemente eines bestimmten HTML-Tags aus?', 'Which selector selects all elements of a certain HTML tag?', [
    option('.tag', '.tag'),
    option('#tag', '#tag'),
    option('*tag', '*tag'),
    option('tag', 'tag'),
  ], [3]),
  question(47, 3, topics.css3, 'Wie wird ein Klassen-Selektor in CSS geschrieben?', 'How is a class selector written in CSS?', [
    option('info:', 'info:'),
    option('info>', 'info>'),
    option('#info', '#info'),
    option('.info', '.info'),
  ], [3]),
  question(48, 3, topics.css3, 'Welcher Selektor sollte nur einmal pro HTML-Seite verwendet werden?', 'Which selector should only be used once per HTML page?', [
    option('Typ-Selektor', 'Type selector'),
    option('Universal-Selektor', 'Universal selector'),
    option('ID-Selektor', 'ID selector'),
    option('Klassen-Selektor', 'Class selector'),
  ], [2]),
  question(49, 3, topics.css3, 'Was wählt der Selektor div p aus?', 'What does the selector div p select?', [
    option('Alle direkten <p>-Kinder eines <div>', 'All direct <p> children of a <div>'),
    option('Nur <p>-Elemente mit einer Klasse', 'Only <p> elements with a class'),
    option('Nur das erste <p> im Dokument', 'Only the first <p> in the document'),
    option('Alle <p>-Elemente innerhalb eines <div>', 'All <p> elements inside a <div>'),
  ], [3]),
  question(50, 3, topics.css3, 'Welcher CSS-Selektor wählt ein Element mit id="main" aus?', 'Which CSS selector selects an element with id="main"?', [
    option('.main', '.main'),
    option('#main', '#main'),
    option('main', 'main'),
    option('main#', 'main#'),
  ], [1]),

  question(51, 3, topics.css4, 'Welche Bestandteile gehören zum CSS-Box-Modell?', 'Which parts belong to the CSS box model?', [
    option('Container, Wrapper, Layout, Shadow', 'Container, wrapper, layout, shadow'),
    option('Content, Outline, Layer, Margin', 'Content, outline, layer, margin'),
    option('Grid, Flex, Border, Margin', 'Grid, flex, border, margin'),
    option('Content, Padding, Border, Margin', 'Content, padding, border, margin'),
  ], [3]),
  question(52, 3, topics.css4, 'Welche CSS-Eigenschaft erzeugt Abstand innerhalb eines Elements zwischen Inhalt und Border?', 'Which CSS property creates space inside an element between its content and border?', [
    option('outline', 'outline'),
    option('spacing', 'spacing'),
    option('padding', 'padding'),
    option('margin', 'margin'),
  ], [2]),
  question(53, 3, topics.css4, 'Welche Aussage beschreibt Margin korrekt?', 'Which statement correctly describes margin?', [
    option('Margin schafft Abstand zu anderen Elementen außerhalb der Box', 'Margin creates space outside the box between other elements'),
    option('Margin verändert die Größe eines Elements', 'Margin changes an element’s size'),
    option('Margin bestimmt die Hintergrundfarbe', 'Margin determines the background color'),
    option('Margin ist der Abstand zwischen Inhalt und Border', 'Margin is the space between content and border'),
  ], [0]),
  question(54, 3, topics.css4, 'Was passiert bei margin: 0 auto?', 'What happens with margin: 0 auto?', [
    option('Oben und unten entstehen automatisch gleiche Abstände', 'Equal automatic spacing is added above and below'),
    option('Das Element wird linksbündig ausgerichtet', 'The element is left-aligned'),
    option('Das Element wird horizontal zentriert', 'The element is centered horizontally'),
    option('Das Element wird nach rechts geschoben', 'The element is pushed to the right'),
  ], [2]),
  question(55, 3, topics.css4, 'Welcher position-Wert lässt ein Element beim Scrollen am Bildschirm „haften“?', 'Which position value lets an element “stick” while scrolling?', [
    option('static', 'static'),
    option('absolute', 'absolute'),
    option('relative', 'relative'),
    option('sticky', 'sticky'),
  ], [3]),

  question(56, 3, topics.css5, 'Welche CSS-Eigenschaft aktiviert Flexbox für einen Container?', 'Which CSS declaration activates Flexbox for a container?', [
    option('position: flex', 'position: flex'),
    option('display: flex', 'display: flex'),
    option('flexbox: true', 'flexbox: true'),
    option('flex: container', 'flex: container'),
  ], [1]),
  question(57, 3, topics.css5, 'Welche Flexbox-Eigenschaft steuert die horizontale Verteilung in einer Zeile?', 'Which Flexbox property controls horizontal distribution in a row?', [
    option('align-content', 'align-content'),
    option('justify-content', 'justify-content'),
    option('flex-direction', 'flex-direction'),
    option('align-items', 'align-items'),
  ], [1]),
  question(58, 3, topics.css5, 'Welche Einstellung richtet Elemente am rechten Rand aus?', 'Which setting aligns items to the right edge?', [
    option('flex-direction: row-reverse', 'flex-direction: row-reverse'),
    option('align-items: flex-end', 'align-items: flex-end'),
    option('justify-content: flex-end', 'justify-content: flex-end'),
    option('justify-content: center', 'justify-content: center'),
  ], [2]),
  question(59, 3, topics.css5, 'Welche Eigenschaft steuert die vertikale Ausrichtung der Elemente in einer Zeile?', 'Which property controls the vertical alignment of items in a row?', [
    option('justify-content', 'justify-content'),
    option('flex-wrap', 'flex-wrap'),
    option('align-items', 'align-items'),
    option('align-content', 'align-content'),
  ], [2]),
  question(60, 3, topics.css5, 'Welche Einstellung richtet Elemente vertikal mittig aus?', 'Which setting vertically centers items?', [
    option('align-items: baseline', 'align-items: baseline'),
    option('align-items: top', 'align-items: top'),
    option('align-items: center', 'align-items: center'),
    option('justify-content: center', 'justify-content: center'),
  ], [2]),

  question(61, 4, topics.css6, 'Wofür eignet sich CSS Grid im Vergleich zu Flexbox?', 'What is CSS Grid suited for compared with Flexbox?', [
    option('Für eindimensionale Layouts', 'For one-dimensional layouts'),
    option('Für zweidimensionale Layouts mit Reihen und Spalten', 'For two-dimensional layouts with rows and columns'),
    option('Nur für mobile Layouts', 'Only for mobile layouts'),
    option('Ausschließlich für horizontale Layouts', 'Only for horizontal layouts'),
  ], [1]),
  question(62, 4, topics.css6, 'Welche CSS-Eigenschaft definiert Anzahl und Breite der Grid-Spalten?', 'Which CSS property defines the number and width of grid columns?', [
    option('grid-gap', 'grid-gap'),
    option('grid-template-columns', 'grid-template-columns'),
    option('grid-auto-flow', 'grid-auto-flow'),
    option('justify-items', 'justify-items'),
  ], [1]),
  question(63, 4, topics.css6, 'Wofür steht die Einheit fr im Grid?', 'What does the fr unit mean in Grid?', [
    option('free resize', 'free resize'),
    option('fractional unit', 'fractional unit'),
    option('frame', 'frame'),
    option('fixed ratio', 'fixed ratio'),
  ], [1]),
  question(64, 4, topics.css6, 'Was passiert, wenn mehr Elemente im Grid stehen als Spalten definiert sind?', 'What happens when a grid contains more items than defined columns?', [
    option('Der Browser zeigt einen Fehler', 'The browser displays an error'),
    option('Die Elemente überlappen sich', 'The items overlap'),
    option('Es wird automatisch eine neue Reihe erstellt', 'A new row is created automatically'),
    option('Die Elemente werden verkleinert', 'The items are made smaller'),
  ], [2]),
  question(65, 4, topics.css6, 'Mit welcher Eigenschaft legt man fest, wie viele Spalten ein Element einnimmt?', 'Which property sets how many columns an item occupies?', [
    option('grid-span', 'grid-span'),
    option('grid-area', 'grid-area'),
    option('span-columns', 'span-columns'),
    option('grid-column', 'grid-column'),
  ], [3]),

  question(66, 4, topics.css7, 'Was ist das Ziel von Responsive Design?', 'What is the goal of responsive design?', [
    option('Webseiten passen sich automatisch an verschiedene Bildschirmgrößen an', 'Websites automatically adapt to different screen sizes'),
    option('Webseiten laden schneller', 'Websites load faster'),
    option('Webseiten sehen auf allen Geräten exakt gleich aus', 'Websites look exactly the same on every device'),
    option('Webseiten verwenden immer ein Grid-Layout', 'Websites always use a grid layout'),
  ], [0]),
  question(67, 4, topics.css7, 'Was ist das Mobile-First-Prinzip?', 'What is the mobile-first principle?', [
    option('Nur Media Queries unter 600px verwenden', 'Only use media queries below 600px'),
    option('Zuerst für kleine Bildschirme gestalten und dann erweitern', 'Design for small screens first, then enhance for larger ones'),
    option('Webseiten ausschließlich für Smartphones entwickeln', 'Develop websites only for smartphones'),
    option('Zuerst Desktop gestalten und dann verkleinern', 'Design desktop first, then scale down'),
  ], [1]),
  question(68, 4, topics.css7, 'Wofür werden Media Queries verwendet?', 'What are media queries used for?', [
    option('Um JavaScript dynamisch auszuführen', 'To execute JavaScript dynamically'),
    option('Um HTML-Strukturen umzuschreiben', 'To rewrite HTML structures'),
    option('Um Inhalte automatisch zu animieren', 'To animate content automatically'),
    option('Um CSS-Regeln abhängig von Geräteeigenschaften anzuwenden', 'To apply CSS rules based on device characteristics'),
  ], [3]),
  question(69, 4, topics.css7, 'Welche Geräteeigenschaft kann nicht mit Media Queries geprüft werden?', 'Which device characteristic cannot be checked with media queries?', [
    option('Pixeldichte', 'Pixel density'),
    option('Orientierung', 'Orientation'),
    option('Touch-Eingabe', 'Touch input'),
    option('Akkustand des Geräts', 'Device battery level'),
  ], [3]),
  question(70, 4, topics.css7, 'Welche Media Query blendet eine Sidebar unter 768px Breite aus?', 'Which media query can hide a sidebar below 768px width?', [
    option('@media (device-width: 768px)', '@media (device-width: 768px)'),
    option('@media (max-width: 768px)', '@media (max-width: 768px)'),
    option('@media (screen-width < 768px)', '@media (screen-width < 768px)'),
    option('@media (min-width: 768px)', '@media (min-width: 768px)'),
  ], [1]),

  question(71, 4, topics.css8, 'Was beschreibt eine CSS-Animation?', 'What describes a CSS animation?', [
    option('Sie verändert HTML-Strukturen automatisch', 'It automatically changes HTML structures'),
    option('Sie verändert den Stil eines Elements schrittweise über die Zeit', 'It changes an element’s style gradually over time'),
    option('Sie funktioniert nur bei Hover-Effekten', 'It only works with hover effects'),
    option('Sie fügt automatisch neue CSS-Klassen hinzu', 'It automatically adds new CSS classes'),
  ], [1]),
  question(72, 4, topics.css8, 'Wofür werden Keyframes verwendet?', 'What are keyframes used for?', [
    option('Um JavaScript-Funktionen festzulegen', 'To define JavaScript functions'),
    option('Um Werte eines Elements zu bestimmten Zeitpunkten festzulegen', 'To define an element’s values at specific points in time'),
    option('Um mehrere Animationen gleichzeitig zu deaktivieren', 'To disable multiple animations at once'),
    option('Um Elemente automatisch zu positionieren', 'To position elements automatically'),
  ], [1]),
  question(73, 4, topics.css8, 'Welche CSS-Eigenschaft aktiviert eine Animation für ein Element?', 'Which CSS property assigns an animation to an element?', [
    option('animation-play', 'animation-play'),
    option('animation-name', 'animation-name'),
    option('animation-active', 'animation-active'),
    option('animation-trigger', 'animation-trigger'),
  ], [1]),
  question(74, 4, topics.css8, 'Wofür steht animation-duration?', 'What does animation-duration specify?', [
    option('Die Wiederholungsanzahl', 'The number of repetitions'),
    option('Die Ablaufrichtung', 'The playback direction'),
    option('Wie lange die Animation läuft', 'How long the animation runs'),
    option('Die Verzögerung vor dem Start', 'The delay before it starts'),
  ], [2]),
  question(75, 4, topics.css8, 'Welche Option ist kein gültiger Wert für animation-direction?', 'Which option is not a valid value for animation-direction?', [
    option('bounce', 'bounce'),
    option('normal', 'normal'),
    option('alternate', 'alternate'),
    option('reverse', 'reverse'),
  ], [0]),

  question(76, 4, topics.js1, 'Was beschreibt JavaScript am besten?', 'Which description best fits JavaScript?', [
    option('Eine Auszeichnungssprache zur Strukturierung von Webseiten', 'A markup language for structuring web pages'),
    option('Eine Programmiersprache, die HTML und CSS manipulieren und Interaktionen verarbeiten kann', 'A programming language that can manipulate HTML and CSS and handle interactions'),
    option('Ein Server-Framework zur Datenbankverwaltung', 'A server framework for database management'),
    option('Ein reines Styling-Werkzeug für das Web', 'A styling-only tool for the web'),
  ], [1]),
  question(77, 4, topics.js1, 'Was macht die Eigenschaft textContent?', 'What does the textContent property do?', [
    option('Sie ändert den kompletten HTML-Code im Element', 'It changes all HTML code in the element'),
    option('Sie ändert nur den Text im Element', 'It changes only the text in the element'),
    option('Sie fügt CSS hinzu', 'It adds CSS'),
    option('Sie löscht das Element aus dem DOM', 'It deletes the element from the DOM'),
  ], [1]),
  question(78, 4, topics.js1, 'Was passiert bei headline.className = "red"?', 'What happens with headline.className = "red"?', [
    option('Eine CSS-Variable wird verändert', 'A CSS variable is changed'),
    option('Die Klasse wird nur gesetzt, wenn sie schon existiert', 'The class is only set if it already exists'),
    option('Alle bisherigen Klassen werden durch red ersetzt', 'All existing classes are replaced by red'),
    option('Die Klasse red wird zusätzlich hinzugefügt', 'The red class is added alongside existing classes'),
  ], [2]),
  question(79, 4, topics.js1, 'Warum gilt das direkte Setzen von CSS in JavaScript als „unsauber“?', 'Why is setting CSS directly in JavaScript considered “unclean”?', [
    option('Es verlangsamt die Seite immer', 'It always slows down the page'),
    option('CSS-Klassen funktionieren dann nicht mehr', 'CSS classes stop working'),
    option('JavaScript darf kein CSS verändern', 'JavaScript is not allowed to change CSS'),
    option('Funktionalität wird auf HTML, CSS und JavaScript verstreut', 'Functionality becomes scattered across HTML, CSS, and JavaScript'),
  ], [3]),
  question(80, 4, topics.js1, 'Was ist das DOM?', 'What is the DOM?', [
    option('Eine Methode zum Laden von JavaScript', 'A method for loading JavaScript'),
    option('Eine Datenbank für HTML-Elemente', 'A database for HTML elements'),
    option('Eine Baumstruktur der HTML-Seite im Arbeitsspeicher', 'A tree structure of the HTML page in memory'),
    option('Ein CSS-Parser des Browsers', 'The browser’s CSS parser'),
  ], [2]),

  question(81, 5, topics.js2, 'Wie wird eine Funktion in JavaScript aufgerufen?', 'How is a function called in JavaScript?', [
    option('funktionsName()', 'functionName()'),
    option('call funktionsName()', 'call functionName()'),
    option('function funktionsName { }', 'function functionName { }'),
    option('funktionsName[]', 'functionName[]'),
  ], [0]),
  question(82, 5, topics.js2, 'Was ist ein Parameter in einer Funktion?', 'What is a parameter in a function?', [
    option('Ein spezieller Dokumentationskommentar', 'A special documentation comment'),
    option('Eine außerhalb der Funktion definierte Variable', 'A variable defined outside the function'),
    option('Die letzte Anweisung in einer Funktion', 'The last statement in a function'),
    option('Eine Eingabe, die der Funktion beim Aufruf übergeben wird', 'An input passed to the function when it is called'),
  ], [3]),
  question(83, 5, topics.js2, 'Wofür wird das Schlüsselwort return verwendet?', 'What is the return keyword used for?', [
    option('Um Parameter zu definieren', 'To define parameters'),
    option('Um das Ergebnis aus der Funktion zurückzugeben', 'To return a result from the function'),
    option('Um eine Funktion zu pausieren', 'To pause a function'),
    option('Um eine Funktion mehrfach aufzurufen', 'To call a function repeatedly'),
  ], [1]),
  question(84, 5, topics.js2, 'Was ist der Hauptzweck einer Funktion in JavaScript?', 'What is the main purpose of a function in JavaScript?', [
    option('Variablen automatisch im gesamten Programm ersetzen', 'Automatically replace variables throughout the program'),
    option('Ausschließlich mathematische Berechnungen ausführen', 'Perform only mathematical calculations'),
    option('Code in wiederverwendbare Einheiten strukturieren', 'Structure code into reusable units'),
    option('Daten dauerhaft im Browser speichern', 'Store data permanently in the browser'),
  ], [2]),
  question(85, 5, topics.js2, 'Was passiert, wenn eine Funktion ohne Parameter definiert ist?', 'What happens when a function is defined without parameters?', [
    option('Sie gibt automatisch undefined zurück', 'It automatically returns undefined'),
    option('Sie kann nicht aufgerufen werden', 'It cannot be called'),
    option('Sie benötigt beim Aufruf keine Argumente', 'It requires no arguments when called'),
    option('Sie kann nur einmal verwendet werden', 'It can only be used once'),
  ], [2]),

  question(86, 5, topics.js3, 'Wodurch erkennt JavaScript eine Benutzerinteraktion?', 'How does JavaScript detect a user interaction?', [
    option('Durch ein registriertes Event am Dokument oder Element', 'Through a registered event on the document or element'),
    option('Durch eine automatische Variablenzuweisung', 'Through an automatic variable assignment'),
    option('Durch einen periodischen Hintergrundprozess', 'Through a periodic background process'),
    option('Durch eine Meldung im Konsolenfenster', 'Through a message in the console'),
  ], [0]),
  question(87, 5, topics.js3, 'Welche Aufgabe erfüllt addEventListener()?', 'What does addEventListener() do?', [
    option('Es abonniert ein Event auf einem Element', 'It subscribes to an event on an element'),
    option('Es lädt ein Element in das DOM', 'It loads an element into the DOM'),
    option('Es löst ein bestehendes Event automatisch aus', 'It automatically triggers an existing event'),
    option('Es registriert eine Funktion im globalen Scope', 'It registers a function in the global scope'),
  ], [0]),
  question(88, 5, topics.js3, 'Was beschreibt einen Callback im Zusammenhang mit Events?', 'What describes a callback in the context of events?', [
    option('Er überschreibt bestehende Eventlistener automatisch', 'It automatically overrides existing event listeners'),
    option('Er reagiert als Funktion auf ein eingetretenes Event', 'It is a function that responds when an event occurs'),
    option('Er wird nur beim ersten Laden der Seite ausgeführt', 'It runs only when the page first loads'),
    option('Er lädt HTML-Elemente im Hintergrund nach', 'It loads HTML elements in the background'),
  ], [1]),
  question(89, 5, topics.js3, 'Welches Event wird ausgelöst, wenn eine Taste gedrückt wird?', 'Which event fires when a key is pressed?', [
    option('keyup', 'keyup'),
    option('submit', 'submit'),
    option('keydown', 'keydown'),
    option('change', 'change'),
  ], [2]),
  question(90, 5, topics.js3, 'Welches Ereignis beschreibt eine Mausaktion, die ein Element verlässt?', 'Which event describes the pointer leaving an element?', [
    option('mouseup', 'mouseup'),
    option('mousemove', 'mousemove'),
    option('mouseleave', 'mouseleave'),
    option('contextmenu', 'contextmenu'),
  ], [2]),

  question(91, 5, topics.js4, 'Wie lässt sich eine CSS-Eigenschaft direkt in JavaScript anpassen?', 'How can a CSS property be changed directly in JavaScript?', [
    option('element.updateStyle("propertyName", "Wert")', 'element.updateStyle("propertyName", "value")'),
    option('element.style.propertyName = "Wert"', 'element.style.propertyName = "value"'),
    option('css.modify(element, propertyName, "Wert")', 'css.modify(element, propertyName, "value")'),
    option('element.css(propertyName, "Wert")', 'element.css(propertyName, "value")'),
  ], [1]),
  question(92, 5, topics.js4, 'Welche Methode fügt einem Element eine zusätzliche CSS-Klasse hinzu?', 'Which method adds an additional CSS class to an element?', [
    option('element.classList.push("klasse")', 'element.classList.push("class")'),
    option('element.addCssClass("klasse")', 'element.addCssClass("class")'),
    option('element.appendClass("klasse")', 'element.appendClass("class")'),
    option('element.classList.add("klasse")', 'element.classList.add("class")'),
  ], [3]),
  question(93, 5, topics.js4, 'Welchen Vorteil haben CSS-Klassen gegenüber direkter .style-Manipulation?', 'What is an advantage of CSS classes over direct .style manipulation?', [
    option('Klare Trennung von visuellen Regeln und JavaScript-Logik', 'A clear separation of visual rules and JavaScript logic'),
    option('Garantierte Überschreibung konkurrierender Regeln', 'Guaranteed overriding of competing rules'),
    option('Höhere Geschwindigkeit bei DOM-Operationen', 'Faster DOM operations'),
    option('Automatische Aktualisierung verbundener Variablen', 'Automatic updating of connected variables'),
  ], [0]),
  question(94, 5, topics.js4, 'Welche Methode entfernt eine bestehende CSS-Klasse korrekt?', 'Which method correctly removes an existing CSS class?', [
    option('element.classList.delete("klasse")', 'element.classList.delete("class")'),
    option('element.classList.clear("klasse")', 'element.classList.clear("class")'),
    option('element.classList.remove("klasse")', 'element.classList.remove("class")'),
    option('element.classList.hide("klasse")', 'element.classList.hide("class")'),
  ], [2]),
  question(95, 5, topics.js4, 'Welche Methode erzeugt ein neues HTML-Element?', 'Which method creates a new HTML element?', [
    option('document.buildElement("tagname")', 'document.buildElement("tagname")'),
    option('document.makeElement("tagname")', 'document.makeElement("tagname")'),
    option('document.createElement("tagname")', 'document.createElement("tagname")'),
    option('document.generate("tagname")', 'document.generate("tagname")'),
  ], [2]),

  question(96, 5, topics.js5, 'Wie wird der eingegebene Text aus <input type="text"> ausgelesen?', 'How do you read the entered text from <input type="text">?', [
    option('Über .textContent', 'With .textContent'),
    option('Über .innerHTML', 'With .innerHTML'),
    option('Über .checked', 'With .checked'),
    option('Über .value', 'With .value'),
  ], [3]),
  question(97, 5, topics.js5, 'Welche Eigenschaft liest den Zustand einer Checkbox aus?', 'Which property reads the state of a checkbox?', [
    option('.state', '.state'),
    option('.value', '.value'),
    option('.selected', '.selected'),
    option('.checked', '.checked'),
  ], [3]),
  question(98, 5, topics.js5, 'Welches HTML-Element fasst Eingabefelder logisch zusammen und sendet sie ab?', 'Which HTML element logically groups and submits input fields?', [
    option('<form>', '<form>'),
    option('<section>', '<section>'),
    option('<div>', '<div>'),
    option('<fieldset>', '<fieldset>'),
  ], [0]),
  question(99, 5, topics.js5, 'Welches Ereignis wird ausgelöst, wenn ein Formular abgeschickt wird?', 'Which event fires when a form is submitted?', [
    option('input', 'input'),
    option('submit', 'submit'),
    option('click', 'click'),
    option('change', 'change'),
  ], [1]),
  question(100, 5, topics.js5, 'Wie verhindert man, dass die Seite beim Absenden eines Formulars neu lädt?', 'How do you prevent the page from reloading when a form is submitted?', [
    option('Den Submit-Button entfernen', 'Remove the submit button'),
    option('Das Formular auf readonly setzen', 'Set the form to readonly'),
    option('event.preventDefault()', 'event.preventDefault()'),
    option('return false im HTML', 'Use return false in the HTML'),
  ], [2]),
]

export const levels = [
  {
    id: 1,
    title: text('Grundlagen', 'Foundations'),
    description: text('Internet, Developer Tools, KI und HTML-Grundlagen', 'Internet, developer tools, AI, and HTML foundations'),
    color: 'blue',
  },
  {
    id: 2,
    title: text('HTML & CSS', 'HTML & CSS'),
    description: text('Text, Links, Bilder, Tabellen, Formulare und CSS-Start', 'Text, links, images, tables, forms, and the start of CSS'),
    color: 'mint',
  },
  {
    id: 3,
    title: text('Styling', 'Styling'),
    description: text('Typografie, Selektoren, Box-Modell und Flexbox', 'Typography, selectors, the box model, and Flexbox'),
    color: 'coral',
  },
  {
    id: 4,
    title: text('Layout & Verhalten', 'Layout & behavior'),
    description: text('Grid, Responsive Design, Animationen und DOM', 'Grid, responsive design, animations, and the DOM'),
    color: 'yellow',
  },
  {
    id: 5,
    title: text('JavaScript', 'JavaScript'),
    description: text('Funktionen, Events, Klassen und Formulare', 'Functions, events, classes, and forms'),
    color: 'violet',
  },
]

export const getLevelQuestions = (level) =>
  questions.filter((item) => item.level === Number(level))

export const getQuestionById = (id) =>
  questions.find((item) => item.id === id)

export const questionTypeLabels = {
  single: 'Single choice',
  multiple: 'Multiple choice',
}
