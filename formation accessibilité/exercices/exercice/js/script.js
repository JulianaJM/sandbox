"use strict";

/* *** Toggle button *** */

	var myToggle = document.getElementById( 'myToggleButton' );
	var myContentToToggle = document.getElementById( 'myContentToToggle' );
	var inputTarget = document.getElementById( 'nom' );
	//Traitement
myToggle.addEventListener( 'click', switchMyToggle, false );
	// fonction afficher/masquer la zone du formulaire
	function switchMyToggle(){
		myContentToToggle.classList.toggle( 'is-visible' );
		/*if( myContentToToggle.classList.contains( 'is-visible' ) ){
			myToggle.setAttribute( 'aria-expanded', 'true' );
			myContentToToggle.setAttribute( 'aria-hidden','false' );
		}
		else{
			myToggle.setAttribute( 'aria-expanded', 'false' );
			myContentToToggle.setAttribute( 'aria-hidden','true' );
		}*/
	}
/* *** Formulaire *** */
	var mySubmit = document.getElementById( 'mySubmit' );
	var myForm = document.getElementById( 'myForm' );	
	var displayMessage;
	
	//traitement
	myForm.addEventListener( 'submit', function( event ) {
		var nom = document.querySelector( '[name=\'nom\']' ) || document.getElementById( 'nom' );
		var prenom = document.querySelector( '[name=\'prenom\']' ) || document.getElementById( 'prenom' );
		var email = document.querySelector( '[name=\'email\']' ) || document.getElementById( 'email' );
		var message = document.querySelector( '[name=\'message\']' ) || document.getElementById( 'message' );
		var messageOk = document.getElementById( 'msg-ok');
		var arrayInput = [nom, email, message];//utilisé pour le reset des messages et les affichage sur focus
		//reset message d'erreur
		resetErrorMsg();
		//controle de saisie
		if( !nom.value || !message.value || !isEmail( email.value) ){
			var msg = 'ce champ est obligatoire';
			if( !nom.value ){
				displayMessage = nom;
				setError( nom, 'required-name', msg );
			}
			if( !isEmail( email.value) ){
				if( !displayMessage ) displayMessage = email;
				if( email.value ) {
					setError( email, 'required-email', 'Saisissez un email valide' );
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
			obj.setAttribute( 'data-message', label );
		}
		function displayError(){
			var refId;
			for( var i = 0, len = arrayInput.length; i < len; i++ ){
				arrayInput[i].addEventListener( 'focus', function(){
					refId = this.getAttribute( 'data-message' );
					if( refId && document.getElementById( refId ) ) document.getElementById( refId ).style.display = 'inline-block';
				}, false);
				arrayInput[i].addEventListener( 'blur', function(){
					refId = this.getAttribute( 'data-message' );
					if( document.getElementById( refId ) ) document.getElementById( refId ).style.display = 'none';
				}, false);
			}
		}
		function resetErrorMsg(){
			for( var i = 0, len = arrayInput.length; i < len; i++ ){
				var node = document.getElementById( arrayInput[i].getAttribute( 'data-message' ) );
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
	var basketList = document.createElement('ul');
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
			if( colorChecked.length > 0) {
				if( document.getElementById( 'basket-number' ) ){
					document.getElementById( 'basket-number' ).textContent = 'Vous avez ' +colorChecked.length+ ' machine(s) dans votre panier :';
					document.getElementById( 'basket-price' ).textContent = 'Total  de la commande = '+ 150 * colorChecked.length +'€';
				}else{
					var basketNumber = document.createElement( 'p' );
					basketNumber.setAttribute( 'id' , 'basket-number' );
					basketNumber.textContent = 'Vous avez ' + colorChecked.length + ' machines dans votre panier :';

					var basketPrice = document.createElement( 'p' );
					basketPrice.setAttribute('id','basket-price');
					basketPrice.textContent = 'Total  de la commande = '+ 150 * colorChecked.length + '€';

					basket.appendChild( basketNumber );
					basket.appendChild( basketList );
					basket.appendChild( basketPrice );
				}
			}else{
				
				if( document.getElementById( 'basket-number' ) ){
					var colorNumber = document.getElementById( 'basket-number' );
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

		for( var i = 0, len = uploadListItem.length; i < len; i++ ){
			uploadListItem[i].setAttribute( 'id' , 'upload-'+i );
			uploadDelete.setAttribute( 'class' , 'delete-upload' );

			uploadDelete.addEventListener( 'click', function(){
				var fileToDeleteId = uploadDelete.parentNode.getAttribute( 'id' );
				if( document.getElementById( fileToDeleteId ) ){
					var fileToDelete = document.getElementById( fileToDeleteId );
					fileToDelete.parentNode.removeChild( fileToDelete );
				}
			},false);

		}

	}, false);

/* 
*** New window ***
- traitement automatique des liens ouvrant dans une nouvelle fenêtre
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
	var modalContent = document.getElementById( 'modal-def-content' );
	var modalBtn = document.getElementById( 'modal-def' );
	var modalClose = document.getElementById( 'btn-close-def' );
	var lastFocus = lastElem( modalContent);
	var modalWrapper = document.getElementById( 'wrapper' );
	//traitement
	//Set modal
	modalBtn.addEventListener( 'click', function(){	
		//open/close
		modalContent.classList.add(	'is-visible' );
		modalWrapper.setAttribute( 'aria-hidden', 'true' );
		modalClose.focus();
		//trapping focus
		document.addEventListener( 'focus', trapFocus, true );
		//noclick outside modal
		document.addEventListener( 'click', noClick, true );
		//Escape close
		document.addEventListener( 'keydown', function( event) {
			if ( event.keyCode === 27) stopListening();
		}, false);
		//Tabulation circulaire : si la fenêtre à le focus, en tabulation arrière redonner le focus sur le dernier élément (variable lastFocus)
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
	//bouton de fermeture
	modalClose.addEventListener( 'click', stopListening	, false );
	//Dependencies
	//Récupère le dernier élément de la fenêtre
	function lastElem( modale){
		var eleFocus = modale.getElementsByTagName( '*' );//récupérer tous les éléments de la modale	
		for( var i = 0, len = eleFocus.length; i < len; i++ ){
			if( eleFocus[i].tabIndex >= '0' ){//test si l'élément peut recevoir le focus	
				lastFocus = eleFocus[i];// si oui affecte l'élément à lastFocus
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
	function noClick( event ){
		if( !modalContent.contains( event.target ) ) {
			event.stopPropagation();
			event.preventDefault();
		}	
	};
	//Fermeture et stop listening to focus
	function stopListening(){		
		modalContent.classList.remove( 'is-visible' );
		modalWrapper.removeAttribute( 'aria-hidden' );
		document.removeEventListener( 'focus', trapFocus, true );
		document.removeEventListener( 'click', noClick, true );
		//modalBtn.focus();
	};

	

