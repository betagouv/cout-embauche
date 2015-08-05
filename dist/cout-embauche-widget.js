/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		1:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"0":"bootstrap-compat"}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	document.write(__webpack_require__(5));

	__webpack_require__(6);
	__webpack_require__(8);
	__webpack_require__(1);

	__webpack_require__(10);

	__webpack_require__(16);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./tooltip.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./tooltip.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".tooltip {\n\tposition: relative;\n\n\tborder-bottom: 1px dashed;\n\tcursor: help;\n}\n\n.tooltip:hover::after {\n\tcontent: attr(title);\n\n\tposition: absolute;\n\tdisplay: block;\n\ttop: 2em;\n\tleft: -1em;\n\n\tpadding: .5em;\n\n\ttext-align: center;\n\tcolor: white;\n\tbackground-color: black;\n\tbackground-color: rgba(0, 0, 0, 0.8);\n\tborder-radius: .5em;\n}\n", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = "<div class=\"embauche\">\n\t<section id=\"input\">\n\t\t<form action=\"http://openfisca.sgmap.fr/api/2/formula/accident_du_travail+famille+fnal+versement_transport+agff_salarie+agirc_salarie+apec_salarie+arrco_salarie+chomage_salarie+cotisation_exceptionnelle_temporaire_salarie+vieillesse_plafonnee_salarie+vieillesse_deplafonnee_salarie+mmid_salarie+csg_deductible_salaire+mhsup+csg_imposable_salaire+crds_salaire+salaire_imposable+salaire_net_a_payer+salsuperbrut+ags+agff_employeur+apec_employeur+arrco_employeur+chomage_employeur+cotisation_exceptionnelle_temporaire_employeur+vieillesse_deplafonnee_employeur+vieillesse_plafonnee_employeur+allocations_temporaires_invalidite+mmid_employeur+cotisations_employeur_main_d_oeuvre+contribution_developpement_apprentissage+contribution_solidarite_autonomie+formation_professionnelle+participation_effort_construction+taxe_apprentissage+taxe_salaires+agirc_employeur+contribution_exceptionnelle_solidarite+ircantec_employeur+ircantec_salarie+exoneration_cotisations_employeur_zfu+exoneration_cotisations_employeur_zrr+exoneration_cotisations_employeur_zrd+allegement_fillon+exoneration_cotisations_employeur_apprenti+exoneration_cotisations_employeur_stagiaire+exoneration_cotisations_employeur_jei\" method=\"GET\">\n\t\t\t<div class=\"form-inline\">\n\t\t\t\t<select class=\"form-control\" data-sets=\".employer_type@textContent\">\n\t\t\t\t\t<option value=\"entreprise\">Mon entreprise</option>\n\t\t\t\t\t<option value=\"association\">Mon association</option>\n\t\t\t\t\t<option value=\"établissement\" disabled>Mon établissement public</option>\n\t\t\t\t\t<option value=\"foyer\" disabled>Moi, comme particulier,</option>\n\t\t\t\t</select>\n\n\t\t\t\tde\n\t\t\t\t<input class=\"form-control\" name=\"effectif_entreprise\" id=\"effectif_entreprise\" type=\"number\" min=\"0\" placeholder=\"1\" value=\"1\" max=\"99999\">\n\t\t\t\t<label for=\"effectif_entreprise\" title=\"En équivalents temps pleins : un mi-temps vaut 0,5, par exemple.\">salariés</label>\n\n\t\t\t\tsouhaite rémunérer un.e\n\t\t\t\t<select class=\"form-control\" data-provides=\"employee\">\n\t\t\t\t\t<option value=\"salarié.e\">salarié.e</option>\n\t\t\t\t\t<option value=\"stagiaire\">stagiaire</option>\n\t\t\t\t\t<option value=\"apprenti\">apprenti.e</option>\n\t\t\t\t\t<option disabled>aide à domicile</option>\n\t\t\t\t\t<option disabled>intermittent.e du spectacle</option>\n\t\t\t\t</select>\n\n\t\t\t\t<input type=\"hidden\" name=\"contrat_de_travail_debut\" value=\"2015-01-01\"/>\n\n\t\t\t\ten statut\n\t\t\t\t<select class=\"form-control\" name=\"type_sal\">\n\t\t\t\t\t<option value=\"prive_non_cadre\">non-cadre</option>\n\t\t\t\t\t<option value=\"prive_cadre\">cadre</option>\n\t\t\t\t</select>\n\n\t\t\t\tà hauteur de\n\t\t\t\t<input class=\"form-control\" name=\"salaire_de_base\" id=\"salaire\" type=\"number\" min=\"0\" max=\"9999999\" placeholder=\"1445,38\" value=\"1445.38\"><label for=\"salaire\">&nbsp;€</label>\n\n\t\t\t\t<select class=\"form-control\" data-sets=\"#salaire@name\">\n\t\t\t\t\t<option value=\"salaire_de_base\">brut</option>\n\t\t\t\t\t<option disabled value=\"salaire_net_a_payer\">net</option>\n\t\t\t\t</select>\n\n\t\t\t\t<select hidden name=\"allegement_fillon_mode_recouvrement\">\n\t\t\t\t\t<option value=\"progressif\" selected=\"selected\">progressive</option>\n\t\t\t\t\t<option value=\"fin_d_annee\">en fin d'année</option>\n\t\t\t\t\t<option value=\"anticipe_regularisation_fin_de_periode\">anticipée</option>\n\t\t\t\t</select>\n\n\t\t\t\tpar\n\t\t\t\t<select class=\"form-control\" data-provides=\"period\">\n\t\t\t\t\t<option disabled>an</option>\n\t\t\t\t\t<option>mois</option>\n\t\t\t\t\t<option disabled>jour</option>\n\t\t\t\t\t<option disabled>heure</option>\n\t\t\t\t</select>.\n\t\t\t</div>\n\n\t\t\t<div class=\"form-inline\">\n\t\t\t\tMon <span class=\"form-control\" class=\"employer_type\">entreprise</span>\n\t\t\t\t<select class=\"form-control\" name=\"jeune_entreprise_innovante\">\n\t\t\t\t\t<option value=\"false\">ne dispose pas</option>\n\t\t\t\t\t<option value=\"true\">dispose</option>\n\t\t\t\t</select>\n\t\t\t\tdu statut jeune entreprise innovante.\n\t\t\t</div>\n\n\t\t\t<noscript>\n\t\t\t\t<input class=\"form-control\" type=\"submit\" value=\"Combien cela va-t-il coûter ?\">\n\t\t\t</noscript>\n\t\t</form>\n\t</section>\n\n\t<section id=\"result\" class=\"js-only\">\n\t\t<p>\n\t\t\tCela coûtera\n\t\t\t<span data-source=\"salsuperbrut\" title=\"Salaire super-brut\">…</span>&nbsp;€\n\t\t\tpar <span data-source=\"period\">mois</span>\n\t\t\tà mon <span class=\"employer_type\">entreprise</span>.\n\t\t</p>\n\t\t<p>\n\t\t\tMon <span data-source=\"employee\">salarié.e</span>\n\t\t\ttouchera <span data-source=\"salaire_net_a_payer\" title=\"Salaire net\">…</span>&nbsp;€\n\t\t\tpar <span data-source=\"period\">mois</span> et sera imposable à hauteur de <span data-source=\"salaire_imposable\">…</span>&nbsp;€.\n\t\t</p>\n\t</section>\n\n\t<section id=\"affiliation\">\n\t\t<p id=\"affiliation__sgmap\">\n\t\t\t<a href=\"http://www.modernisation.gouv.fr\"><img alt=\"Secrétariat Général à la Modernisation de l'Action Publique\" src=\"http://www.modernisation.gouv.fr/sites/default/files/bloc-sgmap-2.jpg\"/></a>\n\t\t</p>\n\t\t<p>\n\t\t\t<a id=\"affiliation__header\" href=\"http://embauche.sgmap.fr\" title=\"Simuler un coût d'embauche dans mon application\">Calculé par</a>\n\t\t\t<a href=\"http://openfisca.fr\"><img alt=\"OpenFisca\" src=\"http://www.openfisca.fr/hotlinks/logo-openfisca.svg\"/></a>\n\t\t\t<span id=\"affiliation__beta\">en <abbr class=\"tooltip\" title=\"Ce calculateur est fourni gratuitement par l'administration, à titre expérimental\">bêta</abbr></span>\n\t\t</p>\n\t</section>\n\n\t<details class=\"js-only\">\n\t\t<summary>Cotisations détaillées</summary>\n\n\t\t<table>\n\t\t\t<caption>Cotisations employeur</caption>\n\n\t\t\t<tr>\n\t\t\t\t<th>AGS</th>\n\t\t\t\t<td><span data-source=\"ags\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>AGFF</th>\n\t\t\t\t<td><span data-source=\"agff_employeur\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>APEC</th>\n\t\t\t\t<td><span data-source=\"apec_employeur\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>AGIRC</th>\n\t\t\t\t<td><span data-source=\"agirc_employeur\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>ARRCO</th>\n\t\t\t\t<td><span data-source=\"arrco_employeur\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>ASSEDIC</th>\n\t\t\t\t<td><span data-source=\"chomage_employeur\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>Ircantec</th>\n\t\t\t\t<td><span data-source=\"ircantec_employeur\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>CET</th>\n\t\t\t\t<td><span data-source=\"cotisation_exceptionnelle_temporaire_employeur\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>Vieillesse (déplafonnée)</th>\n\t\t\t\t<td><span data-source=\"vieillesse_deplafonnee_employeur\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>Vieillesse (plafonnée)</th>\n\t\t\t\t<td><span data-source=\"vieillesse_plafonnee_employeur\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>Invalidité</th>\n\t\t\t\t<td><span data-source=\"allocations_temporaires_invalidite\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>Maladie</th>\n\t\t\t\t<td><span data-source=\"mmid_employeur\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>Main d'oeuvre</th>\n\t\t\t\t<td><span data-source=\"cotisations_employeur_main_d_oeuvre\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>Contribution au développement de l'apprentissage</th>\n\t\t\t\t<td><span data-source=\"contribution_developpement_apprentissage\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>Contribution solidarite autonomie</th>\n\t\t\t\t<td><span data-source=\"contribution_solidarite_autonomie\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>Formation professionnelle</th>\n\t\t\t\t<td><span data-source=\"formation_professionnelle\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>Participation à l'effort de construction</th>\n\t\t\t\t<td><span data-source=\"participation_effort_construction\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>Taxe d'apprentisssage</th>\n\t\t\t\t<td><span data-source=\"taxe_apprentissage\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>Taxe sur les salaires</th>\n\t\t\t\t<td><span data-source=\"taxe_salaires\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t</table>\n\n\t\t<table>\n\t\t\t<caption>Cotisations salarié</caption>\n\n\t\t\t<tr>\n\t\t\t\t<th>Accident du travail</th>\n\t\t\t\t<td><span data-source=\"accident_du_travail\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>Famille</th>\n\t\t\t\t<td><span data-source=\"famille\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>Fonds national action logement</th>\n\t\t\t\t<td><span data-source=\"fnal\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>Versement transport</th>\n\t\t\t\t<td><span data-source=\"versement_transport\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>AGFF</th>\n\t\t\t\t<td><span data-source=\"agff_salarie\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>AGIRC</th>\n\t\t\t\t<td><span data-source=\"agirc_salarie\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>APEC</th>\n\t\t\t\t<td><span data-source=\"apec_salarie\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>ARRCO</th>\n\t\t\t\t<td><span data-source=\"arrco_salarie\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>Ircantec</th>\n\t\t\t\t<td><span data-source=\"ircantec_salarie\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>Assurance chômage</th>\n\t\t\t\t<td><span data-source=\"chomage_salarie\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>Cotisation exceptionnelle temporaire</th>\n\t\t\t\t<td><span data-source=\"cotisation_exceptionnelle_temporaire_salarie\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>Vieillesse (plafonnée)</th>\n\t\t\t\t<td><span data-source=\"vieillesse_plafonnee_salarie\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>Vieillesse (déplafonnée)</th>\n\t\t\t\t<td><span data-source=\"vieillesse_deplafonnee_salarie\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>Maladie</th>\n\t\t\t\t<td><span data-source=\"mmid_salarie\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>CSG déductible (salaires)</th>\n\t\t\t\t<td><span data-source=\"csg_deductible_salaire\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>Heures supplémentaires éxonérées</th>\n\t\t\t\t<td><span data-source=\"mhsup\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>CSG non déductible (salaires)</th>\n\t\t\t\t<td><span data-source=\"csg_imposable_salaire\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>CRDS (salaires)</th>\n\t\t\t\t<td><span data-source=\"crds_salaire\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>Contribution exceptionnelle de solidarité</th>\n\t\t\t\t<td><span data-source=\"contribution_exceptionnelle_solidarite\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t</table>\n\n\t\t<table>\n\t\t\t<caption>Exonérations employeur</caption>\n\n\t\t\t<tr>\n\t\t\t\t<th>Allègement sur les bas salaires (Fillon)</th>\n\t\t\t\t<td><span data-source=\"allegement_fillon\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>Zone franche urbaine</th>\n\t\t\t\t<td><span data-source=\"exoneration_cotisations_employeur_zfu\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>Zone de revitalisation rurale</th>\n\t\t\t\t<td><span data-source=\"exoneration_cotisations_employeur_zrr\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>Zone de revitalisation de la Défense</th>\n\t\t\t\t<td><span data-source=\"exoneration_cotisations_employeur_zrd\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>Jeune entreprise innovante</th>\n\t\t\t\t<td><span data-source=\"exoneration_cotisations_employeur_jei\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>Apprentissage ou stage</th>\n\t\t\t\t<td><span data-source=\"exoneration_cotisations_employeur_apprenti\"></span> ou <span data-source=\"exoneration_cotisations_employeur_stagiaire\"></span>&nbsp;€</td>\n\t\t\t</tr>\n\t\t</table>\n\n\t\t<button id=\"createTest\">Corriger ces résultats</button>\n\t</details>\n</embauche>\n";

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(7);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./main.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./main.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".embauchebody {\n\tpadding-top: 3em;\n\tmax-width: 45em;\n\tmargin: auto;\n\ttext-align: center;\n\tfont-family: 'Helvetica Neue', Arial, Helvetica, sans-serif;\n\tfont-size: 150%;\n\tline-height: 2.5;\n}\n\ninput, select {\n\tfont-size: 100%;\n\n\t-webkit-appearance: none;\n\t-moz-appearance: none;\n\tbackground-color: white;\n\tborder: none;\n\tborder-bottom: 1px solid #9A9A9A;\n\tborder-radius: 0;\n\tpadding: .25em 0;\n\tmargin: 0 .5em;\n\tvertical-align: middle;\n}\n\ndetails {\n\tfont-size: 60%;\n}\n\n[hidden] {\n\tdisplay: none;\n}\n\n#affiliation {\n\tfont-size: 50%;\n\ttext-align: right;\n\tline-height: 1.5;\n}\n\n#affiliation a {\n\tdisplay: block;\n}\n\n#affiliation img {\n\theight: 2em;\n}\n\n#affiliation__sgmap {\n\tfloat: right;\n\tpadding-left: 1em;\n\tmargin-top: 0;\n}\n\n#affiliation__header {\n\tfont-weight: bold;\n\tcolor: rgb(138, 0, 46);\n\ttext-decoration: none;\n}\n\n#affiliation__sgmap img {\n\theight: 5em;\n}\n\n#affiliation__beta {\n\tfont-size: 80%;\n}\n\n.js-only {\n\tdisplay: none;\n}\n\n\n@media(max-width: 500px) {\n\t.embauchebody {\n\t\tpadding: 0;\n\t\twidth: 15em;\n\t\ttext-align: left;\n\t}\n\n\tinput {\n\t\tmargin: 0;\n\t}\n}\n", ""]);

	// exports


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(9);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./details.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./details.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "table {\n\tdisplay: inline-block;\n\twidth: 48%;\n}\n\ncaption {\n\tfont-weight: bold;\n}\n\nth {\n\ttext-align: right;\n}\n\ntd {\n\ttext-align: right;\n}\n", ""]);

	// exports


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["Embauche"] = __webpack_require__(11);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var UI = __webpack_require__(12),
		OpenFisca = __webpack_require__(13),
		debounce = __webpack_require__(14),
		Tests = __webpack_require__(15);


	/** Handle events from the given form to update data.
	*/
	function bindToForm(form) {
		form.addEventListener('change', UI.reflectParameterChange);

		var update = OpenFisca.update.bind(form);

		update();

		update = debounce(update, 300);

		form.addEventListener('change', update);
		form.addEventListener('keyup', update);
	}


	bindToForm(document.querySelector('.embauche form'));

	var jsNodes = document.querySelectorAll('.embauche .js-only');

	for (var i = 0; i < jsNodes.length; i++) {
		jsNodes[i].className = jsNodes[i].className.replace('js-only', '');
	}

	document.getElementById('createTest').addEventListener('click', Tests.create);

	module.exports.OpenFisca = OpenFisca;


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = {
		display: display,
		reflectParameterChange: reflectParameterChange
	};


	function display(data) {
		Object.keys(data).forEach(function(toSet) {
			var target = document.querySelector('[data-source="' + toSet + '"]'),
				value  = data[toSet];

			if (! target)
				return;

			if (typeof value == 'number')
				value = String(value.toFixed(2)).replace('.', ',')

			target.textContent = value;
		});
	}

	function reflectParameterChange(event) {
		if (event.target.attributes['data-sets']) {
			var modifier = event.target.attributes['data-sets'].value.split('@');	// example: '#salaire@name'; first part is selector, second is attribute to set

			Array.prototype.forEach.call(document.querySelectorAll(modifier[0]), function(elementToUpdate) {
				elementToUpdate[modifier[1]] = event.target.value;
			});
		} else {
			var data = {},
				name = event.target.name || event.target.attributes['data-provides'].value;

			data[name] = event.target.value;

			display(data);
		}
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var UI = __webpack_require__(12);


	var buffer;

	module.exports = {
		buildURL: buildOpenFiscaQueryURL,
		get: get,
		update: update,
		getLastResults: function() { return buffer; }
	};


	function serialize(form) {
		var result = [],
			elements = form.elements;

		Array.prototype.forEach.call(elements, function(element) {
			if (element.name)
				result.push(encodeURI(element.name + '=' + element.value));
		});

		return result.join('&');
	}


	var BOOLEAN_PARAMETERS = {
		employee: [ 'stagiaire', 'apprenti' ]
	}

	function getAdditionalParameters() {
		var result = {};

		for (var provider in BOOLEAN_PARAMETERS) {
			var key = document.querySelector('[data-provides="' + provider + '"]').value;

			if (BOOLEAN_PARAMETERS[provider].indexOf(key) > -1)
				result[key] = true;
		}

		return result;
	}

	/** Serializes a shallow object into a series of query string parameters.
	* A naive and shallow implementation.
	*
	*@param		{Object}	source
	*@returns	{String}	The source object as a query string (with no leading '?').
	*@private
	*/
	function serializeObject(source) {
		var result = [];

		for (key in source)
			if (key && source.hasOwnProperty(key))
				result.push(encodeURI(key + '=' + source[key]));

		return result.join('&');
	}

	/** Creates an OpenFisca URL to the /formula endpoint, based on the current main form state and the given additional parameters.
	*
	*@param		{Object}	[additionalParameters]	An object whose properties will be appended to the URL as query-string parameters.
	*@returns	{String}	The URL for the OpenFisca query.
	*/
	function buildOpenFiscaQueryURL(additionalParameters) {
		var form = document.querySelector('#input form'),
			queryStringBlocks = [ serialize(form), serializeObject(getAdditionalParameters()), serializeObject(additionalParameters) ];

		return form.action + '?' + queryStringBlocks.join('&');
	}

	/** Computes values based on the current main form state and the given additional parameters.
	*
	*@param	{Object}	[additionalParameters]	An object whose properties will be appended to the URL as query-string parameters.
	*@param	{Function<[XMLHttpRequest|SyntaxError], Object, Object>}	callback	A callback that will be called with three parameters: an optional error if something went wrong, the OpenFisca-computed values, and the full OpenFisca response if you want everything it sends back.
	*/
	function get(additionalParameters, callback) {
		if (! callback) {
			callback = additionalParameters;
			additionalParameters = null;
		}

		var request = new XMLHttpRequest();

		request.onload = function openFiscaOnloadHandler() {
			if (request.status != 200)
				return callback(request);

			try {
				var data = JSON.parse(request.responseText);
			} catch (err) {
				callback(err);
			}

			callback(null, data.values, data);
		};

		request.onerror = callback.bind(null, request);

		request.open('GET', buildOpenFiscaQueryURL(additionalParameters));
		request.send();
	}

	/** Updates the form.
	*/
	function update() {
		var today = new Date();

		get({
			contrat_de_travail_debut: today.getFullYear() + '-' + today.getMonth()
		}, function(error, values) {
			if (error) throw error;

			buffer = values;
			UI.display(values);
		});
	}


/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function debounce(debounced, delay) {
		var timeout;

		return function() {
			clearTimeout(timeout);
			timeout = setTimeout(debounced.bind(this, arguments), delay);
		}
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var OpenFisca = __webpack_require__(13);


	module.exports = {
		create: createTest
	};


	var ACCEPTANCE_TESTS_ENDPOINT = 'http://embauche.sgmap.fr/tests/api/public/acceptance-tests',
		ACCEPTANCE_TESTS_GUI_URL = 'http://embauche.sgmap.fr/tests/';

	function createTest() {
		var lastResults = OpenFisca.getLastResults();

		var formattedResults = Object.keys(lastResults).map(function(key) {
			return {
				code: key,
				expectedValue: lastResults[key]
			}
		});

		var data = {
			expectedResults: formattedResults,
			scenario: OpenFisca.buildURL()
		}

		var request = new XMLHttpRequest();

		request.open('POST', ACCEPTANCE_TESTS_ENDPOINT);

		request.onload = function() {
			if (request.status >= 300)
				throw request;

			var data = JSON.parse(request.responseText);

			document.location = [ ACCEPTANCE_TESTS_GUI_URL, data._id, 'edit' ].join('/');
		};

		request.onerror = function() {
			throw request;
		}

		request.setRequestHeader('Content-Type', 'application/json');
		request.send(JSON.stringify(data));
	}


/***/ },
/* 16 */
/***/ function(module, exports) {

	// from https://github.com/MattiSG/Element.details/tree/mattisg
	(function(h,k){if(!k){var f,e,g,d;document.head.insertAdjacentHTML("beforeend","<br><style>details{display:block}details>*{display:none}details>summary,details>summary,details>.\u25bc\u25bc{display:block}details .details-marker:before{content:'\u25ba'}details.\u25bc .details-marker:before{content:'\u25bc'}details.\u25bc>*{display:block}</style>");f={get:function(){return"nodeName"in this&&"DETAILS"==this.nodeName.toUpperCase()?this.hasAttribute("open"):void 0},set:function(a){if("nodeName"in this&&
	"DETAILS"==this.nodeName.toUpperCase())return g(this),this.classList[a?"add":"remove"]("\u25bc"),this[a?"setAttribute":"removeAttribute"]("open","open"),a}};e=function(a){if(13===a.keyCode||"click"===a.type)this.parentNode.open=!this.parentNode.open};g=function(a){if(!a._||!a._.__isShimmed){a._||(a._={});for(var b,c,d=-1;c=a.childNodes[++d];)3===c.nodeType&&/[^\t\n\r ]/.test(c.data)?(a.insertBefore(document.createElement("x-i"),c).innerHTML=c.data,a.removeChild(c)):"SUMMARY"==c.nodeName.toUpperCase()&&
	(b=c);b||((b=document.createElement("x-s")).innerHTML="Details",b.className="\u25bc\u25bc");a.insertBefore(b,a.childNodes[0]);b.insertBefore(document.createElement("x-i"),b.childNodes[0]).className="details-marker";b.tabIndex=0;b.addEventListener("click",e,!1);b.addEventListener("keyup",e,!1);a._.__isShimmed=1}};d=function(){Object.defineProperty(h.Element.prototype,"open",f);for(var a=document.getElementsByTagName("details"),b,c=-1;b=a[++c];)b.open=b.hasAttribute("open")};"complete"!=document.readyState?
	document.addEventListener("DOMContentLoaded",d,!1):d()}})(window,"open"in document.createElement("details"));


/***/ }
/******/ ]);