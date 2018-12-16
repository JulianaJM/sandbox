function calcul(){
 var ctrl=document.getElementById("commande").value;
 document.getElementById("envoi").setAttribute("aria-labelledby","envoi legend label commande unite");
 if(parseInt(ctrl)>30){
  document.getElementById("envoi").setAttribute("aria-labelledby","envoi label commande unite delai J10");
 }
 if(parseInt(ctrl)>60){
  document.getElementById("envoi").setAttribute("aria-labelledby","envoi label commande unite delai 3W");
 }
  if(parseInt(ctrl)>100){
  document.getElementById("envoi").setAttribute("aria-labelledby","envoi label commande unite delai NC");
 }
}
function UpdateMsg(){
 closeMsg();
 Txt1=document.createTextNode(document.getElementById("Sfruit").value);
 Txt2=document.createTextNode(document.getElementById("commande").value);
 Msg=document.createTextNode("Envoyer votre commande de ");
 Unit=document.createTextNode(" Kilo");
 document.getElementById("Sconfirm").appendChild(Msg);
 document.getElementById("Sconfirm").appendChild(Txt1);
 document.getElementById("Sconfirm").appendChild(Txt2);
 document.getElementById("Sconfirm").appendChild(Unit);
}
function closeMsg(){
  if(document.getElementById("Sconfirm").firstChild){
  for(i=0;i<4;i++){
   Del=document.getElementById("Sconfirm").firstChild;
   document.getElementById("Sconfirm").removeChild(Del);
	}
 }
}
