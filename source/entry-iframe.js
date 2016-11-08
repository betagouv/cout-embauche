
// Get the "couleur" parameter passed to this script
let script = document.getElementById('script-simulateur-embauche'),
	couleur = script.dataset['couleur']

document.write(`
<iframe id="SGMAPembauche" src="http://localhost:3000/iframe.html?couleur=${couleur}" width="100%" style="border: none;" scrolling="no"></iframe>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.5/iframeResizer.min.js"></script>
<script type="text/javascript">iFrameResize(null, '#SGMAPembauche')</script>
`)
