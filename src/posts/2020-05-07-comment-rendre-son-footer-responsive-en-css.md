# Comment rendre son footer responsive en CSS ?

Voici comment rendre un footer responsive uniquement en **CSS**.  le footer sera toujours placé en dessous du contenu de la page. Si cette dernière déborde il ne sera pas fixé en bas et si le contenu est trop petit il se fixera en bas de la fenêtre du navigateur.

## Code

```css
body { display: flex; flex-direction: column; min-height: 100vh; display: flex; flex-direction: column; min-height: 100vh; display: flex; flex-direction: column; min-height: 100vh; display: flex; flex-direction: column; min-height: 100vh; display: flex; flex-direction: column; min-height: 100vh; display: flex; flex-direction: column; min-height: 100vh; }
```

<ul class="nav nav-tabs">
  <li class="active nav-item"><a data-toggle="tab" class="nav-link active show" href="#CSS">CSS</a></li>
  <li class="nav-item"><a data-toggle="tab" class="nav-link" href="#HTML">HTML</a></li>
</ul>

<div class="tab-content">
  <div name="CSS" class="tab-pane fade in active show">

```css
body {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}

.contenu {
	flex-grow: 1;
}
```

  </div>
  <div name="HTML" class="tab-pane fade">
    
```html
<!doctype html>

<html lang="en">
<head>
	<meta charset="utf-8">

	<title>Mon site</title>
	<meta name="description" content="Description de mon site">
	<meta name="author" content="Moi-même">

	<link rel="stylesheet" href="style.css">
</head>

<body>
	<header>
		
	</header>
	<section class="contenu">
		<h1>Bienvenue sur mon site !</h1>

		<p>
			Pour tester l'aspect responsive du footer, essayer 
			de rajouter ou d'enlever du contenu ici et de 
			redimensionner la fênetre du navigateur.
		</p>
	</section>
	<footer>
		
	</footer>
</body>
</html>
```

</div>
</div>