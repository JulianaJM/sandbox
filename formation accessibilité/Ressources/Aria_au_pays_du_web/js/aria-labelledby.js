function open_dial(){
 e=document.getElementById("alertdialog");
 e.style.display="block";
 removetab();
 document.getElementById("closedialog").removeAttribute("tabindex");
 document.getElementById("closedialog").focus();
}
function close_dial(elm){
 document.getElementById(elm).style.display="none";
 addtab();
 document.getElementById("opendialog").focus();
}
function removetab(){
 var linktab=document.getElementsByTagName("a");
 var buttontab=document.getElementsByTagName("button");
 for(i=0;i<linktab.length;i++){
  linktab[i].setAttribute("tabindex","-1");
 }
 for(i=0;i<buttontab.length;i++){
  buttontab[i].setAttribute("tabindex","-1");
 }
 noclick();
}
function addtab(){
 var linktab=document.getElementsByTagName("a");
 var buttontab=document.getElementsByTagName("button");
 for(i=0;i<linktab.length;i++){
  linktab[i].removeAttribute("tabindex");
 }
 for(i=0;i<buttontab.length;i++){
  buttontab[i].removeAttribute("tabindex");
 }
 yclick();
}
function notab(){
 document.getElementById("notab").focus();
}
function buttontab(){
 document.getElementById("closedialog").focus();
}
function noclick(){
 var e=document.getElementById("screen");
 var noe=document.getElementById("noclick");
 (e.offsetHeight) ? haut=e.offsetHeight : haut=e.style.pixelHeight;
  noe.className="noclick";
	noe.style.height=haut+"px";
}
function yclick(){
  var noe=document.getElementById("noclick");
	noe.removeAttribute("class");
	noe.removeAttribute("style");
}
function esclose(evt){
	var touche = window.event ? evt.keyCode : evt.which;
  if(touche=="27"){
	close_dial("alertdialog");
	}
	else{
	 return false;
	}
}

