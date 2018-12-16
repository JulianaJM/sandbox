"use strict";

/* *** Toggle button *** */
	/* ****
	On créée les variables pour stocker les objets du dispositif, le bouton et la zone contrôlée. 
	'inputTarget' permet de transférer le focus sur le premier champ de saisie pour améliorer l'expérience utilisateur.
	Les propriétés ARIA utilisées :
	- Bouton de contrôle
	-- aria-expanded = 'true|false'
	- Zone contrôlée
	-- aria-hidden = 'true|false'
	**** */
	var myToggle = document.getElementById( 'myToggleButton' );
	var myContentToToggle = document.getElementById( 'myContentToToggle' );
	var inputTarget = document.getElementById( 'nom' );
	//Traitement
	myToggle.addEventListener( 'click', switchMyToggle, false );
	// fonction afficher/masquer la zone du formulaire. 
	// Lorsque l'état de la zone est visible la propriété 'aria-expanded' est passée à 'true' et la propriété 'aria-hidden' est passée à 'false'.
	function switchMyToggle(){
		myContentToToggle.classList.toggle( 'is-visible' );
		if( myContentToToggle.classList.contains( 'is-visible' ) ){
			myToggle.setAttribute( 'aria-expanded', 'true' );
			myContentToToggle.setAttribute( 'aria-hidden','false' );
		}
		else{
			myToggle.setAttribute( 'aria-expanded', 'false' );
			myContentToToggle.setAttribute( 'aria-hidden','true' );
		}			
	}
/* *** Formulaire *** */
	var mySubmit = document.getElementById( 'mySubmit' );
	var myForm = document.getElementById( 'myForm' );	
	var displayMessage;
	/* ***
	Traitement
	
	Contrôle d'errreur :
	Lorsqu'une erreur est détectée, un message est créée et inséré juste avant le champ. Le message d'erreur comporte un 'id'. Le message d'erreur est lié au champ concerné par une propriété 'aria-describedby', affectée au champ, qui reprend l''id' du message d'erreur. Ce dispositif permet de vocaliser le message d'erreur lors de la prise de focus sur le champ.
	Les messages d'erreur ne sont affichés que sur la prise de focus.
	La fonction de contrôle rends le focus sur le premier message en erreur. Ce comportement est similaire à celui employé par défaut pour les contrôles de saisie HTML5.
	
	Validation de l'envoi :
	En cas de succès, pas d'erreurs détectées, un message est inséré dans un conteneur ('msg-ok') positioné après la zone affichée/masquée. La fonction qui change l'état de la zone est appellée pour fermer la zone et remettre à jour les propriétés ARIA. Le focus est rendu au message d'erreur qui vient d'être inséré. La zone du message ('msg-ok') est affectée d'un rôle ARIA alert qui est une forme de live region. Cela va provoquer la vocalisation immédiate du message de confirmation.
	Les propriétés ARIA utilisées :
	- Message d'erreur
	-- aria-describedby = '@id' sur le champ concerné
	- Message de succès
	-- role='alert'
	*** */
	myForm.addEventListener( 'submit', function( event ) {
		var nom = document.querySelector( '[name=\'nom\']' ) || document.getElementById( 'nom' );
		var prenom = document.querySelector( '[name=\'prenom\']' ) || document.getElementById( 'prenom' );
		var email = document.querySelector( '[name=\'email\']' ) || document.getElementById( 'email' );
		var message = document.querySelector( '[name=\'message\']' ) || document.getElementById( 'message' );
		var messageOk = document.getElementById( 'msg-ok');
		var arrayInput = [nom, email, message];//Utilisé pour le remise à zéro des messages et les affichages sur focus
		//On efface les messages d'erreur : opération nécessaire car il n'y a pas de rechargement de page,  sinon lors des tests les messages s'accumulent.
		resetErrorMsg();
		//Contrôle de saisie
		if( !nom.value || !message.value || !isEmail( email.value) ){
			var msg = 'ce champ est obligatoire';
			if( !nom.value ){
				displayMessage = nom;
				setError( nom, 'required-name', msg );
			}
			if( !isEmail( email.value) ){
				if( !displayMessage ) displayMessage = email;
				if( email.value ) {
					setError( email, 'required-email', 'Saisissez un email valide, par exemple jean.dupont@turing.fr' );// le message d'erreur comporte un exemple réel de saisie.						
				}
				else{
					setError( email, 'required-email', msg );
				}
			}
			if( !message.value ){
				if( !displayMessage ) displayMessage = message;
				setError( message, 'required-message', msg );
			}
			displayError();
			displayMessage.focus();
		}
		//Envois avec succès
		else{
			var success = document.createElement( 'p' );
			var successText = document.createTextNode( 'Votre message a été envoyé avec succès. Vous recevrez votre Machine de Turing d\'ici 24 heures !' );
			success.appendChild( successText );
			success.setAttribute( 'class','success' );
			//'tabindex' sur la zone du message pour permettre de rendre le focus suite à la fermeture du formulaire.
			success.setAttribute( 'tabindex','0' );
			success.setAttribute( 'role','alert' );
			success.setAttribute( 'id','msg-success' );
			messageOk.appendChild( success );
			//reset
			nom.value = '';
			prenom.value = '';
			email.value = '';
			message.value = '';
			//fermeture de la zone d'affichage
			switchMyToggle();
			success.focus();
		}
		function setError( obj, label, text ){
			var text = document.createTextNode( text );
			var required = document.createElement( 'p' );
			var span = document.createElement( 'span' );
			required.appendChild( span );
			span.appendChild( text );
			required.setAttribute( 'class','required' );
			myForm.insertBefore( required, obj );
			required.setAttribute( 'id', label );
			obj.setAttribute( 'class','required' );
			obj.setAttribute( 'aria-describedby', label );// liaison entre le champ et le massage d'erreur créé
		}
		// par défaut les messages d'erreur sont masqués, la fonction parcourt le formulaire, teste, via 'aria-describedby' s'il existe un message d'erreur. Si oui, les évènement focus et blur sont créés pour gérer l'affichage et le masquage du message d'erreur.
		function displayError(){
			var refId;
			for( var i = 0, len = arrayInput.length; i < len; i++ ){
				arrayInput[i].addEventListener( 'focus', function(){
					refId = this.getAttribute( 'aria-describedby' );
					if( refId && document.getElementById( refId ) ) document.getElementById( refId ).style.display = 'inline-block';
				}, false);
				arrayInput[i].addEventListener( 'blur', function(){
					refId = this.getAttribute( 'aria-describedby' );
					if( document.getElementById( refId ) ) document.getElementById( refId ).style.display = 'none';
				}, false);
			}
		}
		function resetErrorMsg(){
			for( var i = 0, len = arrayInput.length; i < len; i++ ){
				var node = document.getElementById( arrayInput[i].getAttribute( 'aria-describedby' ) );
				if( node ) {
					myForm.removeChild( node );
					arrayInput[i].classList.remove("required");
				}
			}
			//efface le message de succès
			var node = document.getElementById( 'msg-success' );
			if( node ) myForm.removeChild( node );
		}
		// vérification de l'adresse email
		function isEmail( mail ){
			var regMail = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$','i');
			return regMail.test( mail );
		}
		event.preventDefault();
	}, false );


/* 
*** Détection des choix de couleurs et ajout au panier ***
*/
	var colorInput = document.querySelectorAll( '[name=\'color\']' );
	var basket = document.createElement( 'div' );
	var basketList = document.createElement( 'ul' );
	basketList.setAttribute( 'id' , 'basket-list' );
	basket.setAttribute( 'id' , 'basket' );
	
	var basketTitle = document.createElement( 'h1' );
	basketTitle.textContent = 'Votre panier';

	document.getElementById( 'wrapper' ).appendChild( basket );
	basket.appendChild( basketTitle );

	for( var i = 0, len = colorInput.length; i < len; i++ ){
		
		colorInput[i].addEventListener( 'click', function(){
			this.classList.toggle( 'color-checked' );
			var colorChecked = document.getElementsByClassName( 'color-checked' );
			if( colorChecked.length > 0 ){
				if( document.getElementById( 'basket-number' ) ){
					document.getElementById( 'basket-number' ).textContent = 'Vous avez ' + colorChecked.length + ' machine(s) dans votre panier :';
					document.getElementById( 'basket-price' ).textContent = 'Total  de la commande = '+ 150 * colorChecked.length +'€';
				}else{
					var basketNumber = document.createElement('p');
					basketNumber.setAttribute('id','basket-number');
					basketNumber.textContent = 'Vous avez '+ colorChecked.length +' machines dans votre panier :';

					var basketPrice = document.createElement( 'p' );
					basketPrice.setAttribute( 'id' , 'basket-price' );
					basketPrice.textContent = 'Total  de la commande = '+ 150 * colorChecked.length +'€';

					basket.appendChild( basketNumber );
					basket.appendChild( basketList );
					basket.appendChild( basketPrice );
				}

					//on ajoute une propriété ARIA qui permet de vocaliser tous les changements 
					document.getElementById( 'basket' ).setAttribute( 'aria-live' , 'polite' );
					//pour une meilleure compréhension on fait revocalier 
					//l'ensemble du texte relatif au prix de la commande
					document.getElementById( 'basket' ).setAttribute( 'aria-relevant' , 'all' );
			}else{
				
				if( document.getElementById( 'basket-number' ) ){
					var colorNumber = document.getElementById( 'basket-number');
					colorNumber.parentNode.removeChild( colorNumber );
					var colorList = document.getElementById( 'basket-list' );
					colorList.parentNode.removeChild( colorList );
					var colorPrice = document.getElementById( 'basket-price' );
					colorPrice.parentNode.removeChild( colorPrice );
				}
			}
			
			if( basket.innerHTML.indexOf( this.value ) != -1 ){
				var colorSuppr = document.getElementById( 'basket' + this.getAttribute( 'id' ) );
				colorSuppr.parentNode.removeChild( colorSuppr );
			}else{
				var colorNode = document.createElement( 'li' );
				colorNode.setAttribute( 'id' , 'basket' + this.getAttribute( 'id' ) );
				colorNode.textContent = this.value;
				basketList.appendChild( colorNode );
			}
		}, false );
	}

/* 
*** Ajout de fichiers d'upload ***
*/

	var uploadInput = document.getElementById( 'upload' );
	var uploadContainer  = document.getElementById( 'upload-container' );
	var uploadList  = document.createElement( 'ul' );
	uploadContainer.appendChild( uploadList );

	uploadInput.addEventListener( 'change', function(){

		var uploadNode = document.createElement( 'li' );
			uploadNode.textContent = uploadInput.value;
			uploadList.appendChild( uploadNode );

		var uploadListItem = uploadList.getElementsByTagName( 'li') ;

		var uploadDelete = document.createElement( 'button' );

		var uploadDeleteImg = document.createElement( 'img' );
			uploadDeleteImg.setAttribute( 'src' , 'img/trash.png' );
			uploadDeleteImg.setAttribute( 'alt' , 'Suppprimer' );
			uploadDelete.appendChild( uploadDeleteImg );

			uploadNode.appendChild( uploadDelete );
			uploadDelete.focus();

		for( var i = 0, len = uploadListItem.length; i < len; i++ ){
			uploadListItem[i].setAttribute( 'id' , 'upload-'+i );
			uploadDelete.setAttribute( 'class' , 'delete-upload' );

			uploadDelete.addEventListener( 'click', function(){
				var fileToDeleteId = uploadDelete.parentNode.getAttribute( 'id' );
				if( document.getElementById( fileToDeleteId ) ){
					var fileToDelete = document.getElementById( fileToDeleteId );
					if( uploadListItem.length == 0 || uploadListItem.length == 1 ){
						//lorsque l'on efface le dernier élément listé dans les fichiers à envoyer
						//on remet le focus sur le bouton "Parcourir"
						uploadInput.focus();
					}else{
						if( fileToDelete.nextSibling ){
							fileToDelete.nextSibling.querySelector( 'button' ).focus();
						//par contre, s'il reste des fichiers listés, lorsqu'on efface un fichier, 
						//on va repositionner le focus sur l'élément suivant, et s'il n'y a pas d'élément suivant,
						//on repositionne sur l'élément précédent
						}else{
							fileToDelete.previousSibling.querySelector( 'button' ).focus();
						}
					}
					fileToDelete.parentNode.removeChild( fileToDelete );
				}
			},false);

		}

	}, false);
/* 
*** New window ***
- exemple de traitement automatique des liens ouvrant dans une nouvelle fenêtre, 
la fonction parcours les liens, si un attribut 'target' est présent on récupère 
l'intitulé du lien et on ajoute l'expression "nouvelle fenêtre"
*/
	var links = document.getElementsByTagName( 'a' );
	var text;
	for( var i = 0, len = links.length; i < len; i++ ){
		if ( links[i].hasAttribute( 'target' ) ){
			text = links[i].textContent;
			links[i].title = text + ' nouvelle fenêtre';
		}
	}
/* *** Fenêtre modale *** */
	/* ***
	On créé les variables pour stocker les objets du dispositif :
	- la modale, 
	- le bouton de contrôle, 
	- le bouton de fermeture, 
	- le dernier élément de la modale pouvant recevoir le focus, 
	- le wrapper du contenu qui devra être inhibé par aria-hidden='true' tant que la modale est affichée.
	
	Propriétés ARIA utilisées :
	- Sur la zone de contenu
	-- aria-hidden='true'
	* ***/
	var modalContent = document.getElementById( 'modal-def-content' );
	var modalBtn = document.getElementById( 'modal-def' );
	var modalClose = document.getElementById( 'btn-close-def' );
	var lastFocus = lastElem( modalContent);
	var modalWrapper = document.getElementById( 'wrapper' );
	//traitement
	/* ***
	Configuration de la modale. À l'ouverture  :
	- la modale est rendue visible,
	- la restitution du contenu est inhibée,
	- le focus est donné au premier élément pouvant le recevoir dans la modale (le bouton de fermeture),
	- l'événement focus est surveillé pour le contraindre dans la modale,
	- l'événement click est surveillé pour empêcher les actions de click sur le contenu,
	- la touche escape, qui doit fermer la modale, est surveillée,
	- l'événement de fermeture est affecté au bouton de fermeture,
	- la tabulation est surveillée pour assurer la navigation circulaire dans la modale.
	*** */
	modalBtn.addEventListener( 'click', function(){	
		//open/close
		modalContent.classList.add(	'is-visible' );
		modalWrapper.setAttribute( 'aria-hidden', 'true' );
		modalClose.focus();
		//trapping focus
		document.addEventListener( 'focus', trapFocus, true );
		//pas de click en dehors de la modale
		document.addEventListener( 'click', noClick, true );
		//fermeture via escape
		document.addEventListener( 'keydown', function( event) {
			if ( event.keyCode === 27) stopListening();
		}, false);
		//bouton de fermeture
		modalClose.addEventListener( 'click', stopListening	, false );		
		//Tabulation circulaire : 
		// si la fenêtre à le focus, en tabulation arrière on doit redonner le focus sur le dernier élément (variable 'lastFocus')
		document.addEventListener( 'keyup', function( event) {		
			var curEle = document.activeElement;
			if( curEle === modalContent ){
				if( event.shiftKey && event.keyCode === 9 )	{
					lastFocus.focus(); 
				}
				event.stopPropagation();
			}
		}, false);
	}, false );
	/* *** Dépendances *** */
	//Récupère le dernier élément de la fenêtre
	function lastElem( modale){
		var eleFocus = modale.getElementsByTagName( '*' );//récupérer tous les éléments de la modale	
		for( var i = 0, len = eleFocus.length; i < len; i++ ){
			if( eleFocus[i].tabIndex >= '0' ){//On teste si l'élément peut recevoir le focus	
				lastFocus = eleFocus[i];// Si oui, on affecte l'élément à 'lastFocus'
			}
		};
		return lastFocus;
	}
	//trapping focus
	function trapFocus( event ) {
		console.log( 'event focus' );
		if( !modalContent.contains( event.target ) ) {
			console.log('focus !');
			modalContent.focus();		
		}
	};
	//désactivation du click
	function noClick( event ){
		console.log( 'event click' );
		if( !modalContent.contains( event.target ) ) {
			console.log( 'no click' );
			event.stopPropagation();
			event.preventDefault();
		}	
	};
	//fermeture, rétablissement de la restitution du contenu, destruction des listener focus et click, remise du focus sur le bouton de contrôle
	function stopListening(){		
		modalContent.classList.remove( 'is-visible' );
		modalWrapper.removeAttribute( 'aria-hidden' );
		document.removeEventListener( 'focus', trapFocus, true );
		document.removeEventListener( 'click', noClick, true );
		modalBtn.focus();
	};