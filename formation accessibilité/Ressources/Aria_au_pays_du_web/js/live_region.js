var minimumTime = 4000;
var index=0;
var lrID = "myLiveRegion1";
var messagesArray = new Array("Bonjour tout le monde","Je suis une region vivante","Mais je sais rester polie");

function updateLiveRegion(liveRegionID, textString){
	textNode = document.createTextNode(textString);
        targetNode = document.getElementById(liveRegionID);
        while (targetNode.firstChild) {
           targetNode.removeChild(targetNode.firstChild);
           }
	targetNode.appendChild(textNode);
        }

function runExample(){
   updateLiveRegion(lrID, messagesArray[index++]);
   if (index > 2){
      index=0;
      }
   window.setTimeout(runExample, minimumTime);
   }

function setMinimumTime(){
   minimumTimeStr = document.getElementById("throttle").options[document.getElementById("throttle").selectedIndex].text;   
   minimumTime = minimumTimeStr * 1000;
   }
function coment(){
 document.getElementById("coment").className="visible";
}
