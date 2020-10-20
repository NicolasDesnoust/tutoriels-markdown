import { Post } from "../model/post";

export const POSTS: Post[] = [
  {
    id: "2020-05-07-comment-rendre-son-footer-responsive",
    title: "Comment rendre son footer responsive ?",
    published: "05/07/2020",
    //author: "Nicolas Desnoust",
    content: "# Comment rendre son footer responsive ?\r\n\r\nVoici comment rendre un footer responsive uniquement en **CSS**.  le footer sera toujours plac\u00E9 en dessous du contenu de la page. Si cette derni\u00E8re d\u00E9borde il ne sera pas fix\u00E9 en bas et si le contenu est trop petit il se fixera en bas de la fen\u00EAtre du navigateur.\r\n\r\n## Code\r\n\r\n```css\r\nbody { display: flex; flex-direction: column; min-height: 100vh; display: flex; flex-direction: column; min-height: 100vh; display: flex; flex-direction: column; min-height: 100vh; display: flex; flex-direction: column; min-height: 100vh; display: flex; flex-direction: column; min-height: 100vh; display: flex; flex-direction: column; min-height: 100vh; }\r\n```\r\n\r\n<ul class=\"nav nav-tabs\">\r\n  <li class=\"active nav-item\"><a data-toggle=\"tab\" class=\"nav-link active show\" href=\"#CSS\">CSS<\/a><\/li>\r\n  <li class=\"nav-item\"><a data-toggle=\"tab\" class=\"nav-link\" href=\"#HTML\">HTML<\/a><\/li>\r\n<\/ul>\r\n\r\n<div class=\"tab-content\">\r\n  <div name=\"CSS\" class=\"tab-pane fade in active show\">\r\n\r\n```css\r\nbody {\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\tmin-height: 100vh;\r\n}\r\n\r\n.contenu {\r\n\tflex-grow: 1;\r\n}\r\n```\r\n\r\n  <\/div>\r\n  <div name=\"HTML\" class=\"tab-pane fade\">\r\n    \r\n```html\r\n<!doctype html>\r\n\r\n<html lang=\"en\">\r\n<head>\r\n\t<meta charset=\"utf-8\">\r\n\r\n\t<title>Mon site<\/title>\r\n\t<meta name=\"description\" content=\"Description de mon site\">\r\n\t<meta name=\"author\" content=\"Moi-m\u00EAme\">\r\n\r\n\t<link rel=\"stylesheet\" href=\"style.css\">\r\n<\/head>\r\n\r\n<body>\r\n\t<header>\r\n\t\t\r\n\t<\/header>\r\n\t<section class=\"contenu\">\r\n\t\t<h1>Bienvenue sur mon site !<\/h1>\r\n\r\n\t\t<p>\r\n\t\t\tPour tester l'aspect responsive du footer, essayer \r\n\t\t\tde rajouter ou d'enlever du contenu ici et de \r\n\t\t\tredimensionner la f\u00EAnetre du navigateur.\r\n\t\t<\/p>\r\n\t<\/section>\r\n\t<footer>\r\n\t\t\r\n\t<\/footer>\r\n<\/body>\r\n<\/html>\r\n```\r\n\r\n<\/div>\r\n<\/div>",
    authorId: "nicolas-desnoust",
    tags: ["css", "footer", "responsive", "html"],
    category: "css"
  },
  {
    id: "2020-05-07-dev-api-rest-avec-spring",
    title: "Développement d'une API REST avec Spring",
    published: "05/07/2020",
    //author: "Nicolas Desnoust",
    content: "# D\u00E9veloppement d'une API REST avec Spring\r\n\r\n## Introduction\r\nCe mini-tutoriel permet d'explorer les possibilit\u00E9s de **Github Pages** et de la r\u00E9daction de tutoriels en **Markdown**. \r\nIl s'agit principalement de pr\u00E9senter comment r\u00E9aliser rapidement les fondements d'une **API REST** \u00E0 l'aide du framework **Spring**.\r\n> **Attention :** Ce tutoriel n'est actuellement pas complet. \r\n\r\n### Technologies\r\nVoici une liste exhaustive des technologies qui seront employ\u00E9es :\r\n\r\n - Spring REST\r\n - Spring Boot \/ Spring Initializr\r\n - Spring Data\r\n - Maven\r\n - Lombok\r\n - MySQL\r\n - JPA \/ Hibernate\r\n\r\n## Cr\u00E9ation du projet sur Spring Initializr\r\n\r\nLa premi\u00E8re \u00E9tape consite \u00E0 cr\u00E9er les sources du projet Maven en remplissant le formulaire de [Spring Initializr](https:\/\/start.spring.io).\r\n\r\nCe dernier devrait se pr\u00E9senter sous la forme suivante :\r\n\r\n![Aper\u00E7u de SPring Initializr](https:\/\/i.imgur.com\/SBl70J1.png)\r\n\r\n## Import sous Eclipse\r\n\r\n## Configuration de la base de donn\u00E9es\r\n\r\nLa configuration de la base de donn\u00E9es se r\u00E9alise dans le fichier `src\/main\/resources\/app.properties` :\r\n```properties\r\nspring.jpa.hibernate.ddl-auto=update\r\nspring.jpa.hibernate.show_sql=true\r\n\r\n# Configuration pour MySQL 8 (L'url, le username et le password sont \u00E0 changer).\r\nspring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect\r\nspring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver\r\nspring.datasource.url=jdbc:mysql:\/\/localhost:3306\/<nom-de-la-BDD>?serverTimezone=Europe\/Berlin\r\nspring.datasource.username=<identifiant>\r\nspring.datasource.password=<mot-de-passe>\r\n\r\n######### Configuration pour HSQLDB\r\n#spring.jpa.database-platform=org.hibernate.dialect.HSQLDialect\r\n#spring.datasource.driver-class-name=org.hsqldb.jdbcDriver\r\n#spring.datasource.url=jdbc:hsqldb:file:data\/ADM;shutdown=true;hsqldb.write_delay=false\r\n#spring.datasource.username=sa\r\n#spring.datasource.password=\r\n```\r\n\r\n## Coloration syntaxique en Java\r\n```java\r\npackage adm.entities.education;\r\n\r\nimport java.util.Collection;\r\nimport java.util.HashSet;\r\nimport java.util.Set;\r\n\r\nimport javax.persistence.Entity;\r\nimport javax.persistence.JoinColumn;\r\nimport javax.persistence.JoinTable;\r\nimport javax.persistence.ManyToMany;\r\nimport javax.persistence.ManyToOne;\r\nimport javax.persistence.OneToMany;\r\nimport javax.persistence.Table;\r\n\r\nimport lombok.AccessLevel;\r\nimport lombok.EqualsAndHashCode;\r\nimport lombok.Getter;\r\nimport lombok.Setter;\r\n\r\nimport com.fasterxml.jackson.annotation.JsonIgnore;\r\n\r\nimport adm.entities.AbstractEntity;\r\nimport adm.entities.association.Association;\r\nimport adm.entities.referentials.domain.Domain;\r\nimport adm.entities.referentials.organism.Organism;\r\nimport adm.entities.referentials.teachingmodality.TeachingModality;\r\nimport adm.entities.referentials.teachingsite.TeachingSite;\r\nimport adm.entities.referentials.typeofdegree.TypeOfDegree;\r\n\r\n@Entity\r\n@Table(name = \"FORMATION\")\r\n@Getter @Setter\r\n@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = true)\r\npublic class Education extends AbstractEntity {\r\n\r\n\t@Getter(AccessLevel.NONE) @Setter(AccessLevel.NONE)\r\n\tprivate static final long serialVersionUID = 1L;\r\n\r\n\t@ManyToOne\r\n\t@JoinColumn(name = \"CODE_TYPE_DIPLOME\", referencedColumnName = \"CODE\")\r\n\tprivate TypeOfDegree type;\r\n\r\n\t@ManyToMany\r\n\t@JoinTable(\r\n\t  name = \"ASSOC_FOR_DOM\", \r\n\t  joinColumns = @JoinColumn(name = \"CODE_FORMATION\"), \r\n\t  inverseJoinColumns = @JoinColumn(name = \"CODE_DOMAINE\"))\r\n\tprivate Set<Domain> domains;\r\n\t\r\n\t@ManyToMany\r\n\t@JoinTable(\r\n\t  name = \"ASSOC_FOR_ORG\", \r\n\t  joinColumns = @JoinColumn(name = \"CODE_FORMATION\"), \r\n\t  inverseJoinColumns = @JoinColumn(name = \"CODE_ORGANISME\"))\r\n\tprivate Set<Organism> organisms;\r\n\t\r\n\t@ManyToMany\r\n\t@JoinTable(\r\n\t  name = \"ASSOC_FOR_MOD\", \r\n\t  joinColumns = @JoinColumn(name = \"CODE_FORMATION\"), \r\n\t  inverseJoinColumns = @JoinColumn(name = \"CODE_MODALITE\"))\r\n\tprivate Set<TeachingModality> modalities;\r\n\t\r\n\t@ManyToMany\r\n\t@JoinTable(\r\n\t  name = \"ASSOC_FOR_SIT\", \r\n\t  joinColumns = @JoinColumn(name = \"CODE_FORMATION\"), \r\n\t  inverseJoinColumns = @JoinColumn(name = \"CODE_SITE\"))\r\n\tprivate Set<TeachingSite> sites;\r\n\t\r\n\t@JsonIgnore\r\n\t@OneToMany(mappedBy = \"id.education\")\r\n\tprivate Collection<Association> associations;\r\n\t\r\n\tpublic Education() {\r\n\t\tdomains = new HashSet<Domain>();\r\n\t\torganisms = new HashSet<Organism>();\r\n\t\tmodalities = new HashSet<TeachingModality>();\r\n\t}\r\n}\r\n```\r\n## Coloration syntaxique en HTML\r\n```html\r\n<!doctype html>\r\n\r\n<html lang=\"en\">\r\n<head>\r\n    <meta charset=\"utf-8\">\r\n\t\r\n    <title>The HTML5 Herald<\/title>\r\n    <meta name=\"description\" content=\"The HTML5 Herald\">\r\n    <meta name=\"author\" content=\"SitePoint\">\r\n\r\n    <link rel=\"stylesheet\" href=\"css\/styles.css?v=1.0\">\r\n<\/head>\r\n\r\n<body>\r\n    <script src=\"js\/scripts.js\"><\/script>\r\n<\/body>\r\n<\/html>\r\n```\r\n\r\nStackEdit stores your files in your browser, which means all your files are automatically saved locally and are accessible **offline!**\r\n\r\n## Create files and folders\r\n\r\nThe file explorer is accessible using the button in left corner of the navigation bar. You can create a new file by clicking the **New file** button in the file explorer. You can also create folders by clicking the **New folder** button.\r\n\r\n## Switch to another file\r\n\r\nAll your files and folders are presented as a tree in the file explorer. You can switch from one to another by clicking a file in the tree.\r\n\r\n## Rename a file\r\n\r\nYou can rename the current file by clicking the file name in the navigation bar or by clicking the **Rename** button in the file explorer.\r\n\r\n## Delete a file\r\n\r\nYou can delete the current file by clicking the **Remove** button in the file explorer. The file will be moved into the **Trash** folder and automatically deleted after 7 days of inactivity.\r\n\r\n## Export a file\r\n\r\nYou can export the current file by clicking **Export to disk** in the menu. You can choose to export the file as plain Markdown, as HTML using a Handlebars template or as a PDF.\r\n\r\n\r\n# Synchronization\r\n\r\nSynchronization is one of the biggest features of StackEdit. It enables you to synchronize any file in your workspace with other files stored in your **Google Drive**, your **Dropbox** and your **GitHub** accounts. This allows you to keep writing on other devices, collaborate with people you share the file with, integrate easily into your workflow... The synchronization mechanism takes place every minute in the background, downloading, merging, and uploading file modifications.\r\n\r\nThere are two types of synchronization and they can complement each other:\r\n\r\n- The workspace synchronization will sync all your files, folders and settings automatically. This will allow you to fetch your workspace on any other device.\r\n\t> To start syncing your workspace, just sign in with Google in the menu.\r\n\r\n- The file synchronization will keep one file of the workspace synced with one or multiple files in **Google Drive**, **Dropbox** or **GitHub**.\r\n\t> Before starting to sync files, you must link an account in the **Synchronize** sub-menu.\r\n\r\n## Open a file\r\n\r\nYou can open a file from **Google Drive**, **Dropbox** or **GitHub** by opening the **Synchronize** sub-menu and clicking **Open from**. Once opened in the workspace, any modification in the file will be automatically synced.\r\n\r\n## Save a file\r\n\r\nYou can save any file of the workspace to **Google Drive**, **Dropbox** or **GitHub** by opening the **Synchronize** sub-menu and clicking **Save on**. Even if a file in the workspace is already synced, you can save it to another location. StackEdit can sync one file with multiple locations and accounts.\r\n\r\n## Synchronize a file\r\n\r\nOnce your file is linked to a synchronized location, StackEdit will periodically synchronize it by downloading\/uploading any modification. A merge will be performed if necessary and conflicts will be resolved.\r\n\r\nIf you just have modified your file and you want to force syncing, click the **Synchronize now** button in the navigation bar.\r\n\r\n> **Note:** The **Synchronize now** button is disabled if you have no file to synchronize.\r\n\r\n## Manage file synchronization\r\n\r\nSince one file can be synced with multiple locations, you can list and manage synchronized locations by clicking **File synchronization** in the **Synchronize** sub-menu. This allows you to list and remove synchronized locations that are linked to your file.\r\n\r\n\r\n# Publication\r\n\r\nPublishing in StackEdit makes it simple for you to publish online your files. Once you're happy with a file, you can publish it to different hosting platforms like **Blogger**, **Dropbox**, **Gist**, **GitHub**, **Google Drive**, **WordPress** and **Zendesk**. With [Handlebars templates](http:\/\/handlebarsjs.com\/), you have full control over what you export.\r\n\r\n> Before starting to publish, you must link an account in the **Publish** sub-menu.\r\n\r\n## Publish a File\r\n\r\nYou can publish your file by opening the **Publish** sub-menu and by clicking **Publish to**. For some locations, you can choose between the following formats:\r\n\r\n- Markdown: publish the Markdown text on a website that can interpret it (**GitHub** for instance),\r\n- HTML: publish the file converted to HTML via a Handlebars template (on a blog for example).\r\n\r\n## Update a publication\r\n\r\nAfter publishing, StackEdit keeps your file linked to that publication which makes it easy for you to re-publish it. Once you have modified your file and you want to update your publication, click on the **Publish now** button in the navigation bar.\r\n\r\n> **Note:** The **Publish now** button is disabled if your file has not been published yet.\r\n\r\n## Manage file publication\r\n\r\nSince one file can be published to multiple locations, you can list and manage publish locations by clicking **File publication** in the **Publish** sub-menu. This allows you to list and remove publication locations that are linked to your file.\r\n\r\n\r\n# Markdown extensions\r\n\r\nStackEdit extends the standard Markdown syntax by adding extra **Markdown extensions**, providing you with some nice features.\r\n\r\n> **ProTip:** You can disable any **Markdown extension** in the **File properties** dialog.\r\n\r\n\r\n## SmartyPants\r\n\r\nSmartyPants converts ASCII punctuation characters into \"smart\" typographic punctuation HTML entities. For example:\r\n\r\n|                |ASCII                          |HTML                         |\r\n|----------------|-------------------------------|-----------------------------|\r\n|Single backticks|`'Isn't this fun?'`            |'Isn't this fun?'            |\r\n|Quotes          |`\"Isn't this fun?\"`            |\"Isn't this fun?\"            |\r\n|Dashes          |`-- is en-dash, --- is em-dash`|-- is en-dash, --- is em-dash|\r\n\r\n\r\n## KaTeX\r\n\r\nYou can render LaTeX mathematical expressions using [KaTeX](https:\/\/khan.github.io\/KaTeX\/):\r\n\r\nThe *Gamma function* satisfying $\\Gamma(n) = (n-1)!\\quad\\forall n\\in\\mathbb N$ is via the Euler integral\r\n\r\n$$\r\n\\Gamma(z) = \\int_0^\\infty t^{z-1}e^{-t}dt\\,.\r\n$$\r\n\r\n> You can find more information about **LaTeX** mathematical expressions [here](http:\/\/meta.math.stackexchange.com\/questions\/5020\/mathjax-basic-tutorial-and-quick-reference).\r\n\r\n\r\n## UML diagrams\r\n\r\nYou can render UML diagrams using [Mermaid](https:\/\/mermaidjs.github.io\/). For example, this will produce a sequence diagram:\r\n\r\n```mermaid\r\nsequenceDiagram\r\nAlice ->> Bob: Hello Bob, how are you?\r\nBob-->>John: How about you John?\r\nBob--x Alice: I am good thanks!\r\nBob-x John: I am good thanks!\r\nNote right of John: Bob thinks a long<br\/>long time, so long<br\/>that the text does<br\/>not fit on a row.\r\n\r\nBob-->Alice: Checking with John...\r\nAlice->John: Yes... John, how are you?\r\n```\r\n\r\nAnd this will produce a flow chart:\r\n\r\n```mermaid\r\ngraph LR\r\nA[Square Rect] -- Link text --> B((Circle))\r\nA --> C(Round Rect)\r\nB --> D{Rhombus}\r\nC --> D\r\n```\r\n\r\n",
    authorId: "nicolas-desnoust",
    tags: ["css", "footer", "responsive", "html"],
    category: "spring"
  },
  {
    id: "2020-08-10-setup-vscode",
    title: "Setup de Visual Studio Code",
    published: "08/10/2020",
    //author: "Nicolas Desnoust",
    content: "# Setup de Visual Studio Code\r\n\r\n## Extensions utiles \u00E0 tout type de projet\r\n\r\n| Nom                       | Auteur     | Description                                                  |\r\n| ------------------------- | ---------- | ------------------------------------------------------------ |\r\n| Better comments           | Aaron Bond | Permet de cat\u00E9goriser les commentaires (alertes, questions, TODOs, commentaires importants, \u00E0 ignorer). |\r\n| Prettier - Code formatter | Prettier   | Formateur de code (n\u00E9cessaire pour les langages CSS\/SCSS non-support\u00E9s par d\u00E9faut). |\r\n\r\n## Installation d'une police avec ligatures\r\n\r\n1. **Installer les polices** \r\n\r\n   T\u00E9l\u00E9chargez la police Firacode ici : [**https:\/\/github.com\/tonsky\/FiraCode**](https:\/\/github.com\/tonsky\/FiraCode) et installez le contenu du dossier `ttf` sur votre syst\u00E8me d'exploitation. \r\n\r\n2. **Configurer Visual Studio Code**\r\n\r\n   Ouvrez les pr\u00E9f\u00E9rences utilisateur \u00E0 l'aide de la commande **Ctrl+Shift+P** et recherchez `Preferences: Open Settings (UI)`. \r\n\r\n   Pour activer la police pr\u00E9c\u00E9demment t\u00E9l\u00E9charg\u00E9e, dans l'\u00E9diteur des param\u00E8tres, cliquez sur `Font` sous l'onglet `Text Editor`. Dans le champ `Font Family` ajoutez `'Fira Code'` (avec les guillemets simple) en premier dans la liste. Cochez ensuite la case `Enable\/Disable font ligatures` sous `Font Ligatures` pour activer les ligatures.",
    authorId: "nicolas-desnoust",
    tags: ["vscode", "extension", "police"],
    category: "vscode"
  },
];