 function drawPicture(){
        var canvas = document.getElementById('example');
        
        var context = canvas.getContext('2d');
        context.clearRect(0,0,260,300); // clear canvas
        context.fillStyle = "rgb(0,255,0)";
        context.fillRect (25, 25, 100, 100);
        context.save();
		
        context.fillStyle = "rgba(255,0,0, 0.6)";
        context.beginPath();
        context.arc(125,100,50,0,Math.PI*2,true);
        context.fill();
       
        context.fillStyle = "rgba(0,0,255,0.6)";
        context.beginPath();
        context.moveTo(125,100);
        context.lineTo(175,50);
        context.lineTo(225,150);
        context.fill();
		
		 context.fillStyle    = '#00008b';
context.font         = '20px sans-serif';
context.textBaseline = 'top';
context.fillText  ('Formes géométriques', 20, 0);
//context.font         = 'bold 30px sans-serif';
//context.strokeText('Hello world!', 0, 50);
       //
      }
	   
	   function drawSquare(){
        
		 var canvas = document.getElementById('example');
        
        var context = canvas.getContext('2d');
       
		 
		 
		context.strokeStyle = '#f00'; // red
        context.lineWidth   = 4;
		context.strokeRect(25, 25, 100, 100);
		
	  }
	  
	 function drawCircle(){
        
		 var canvas = document.getElementById('example');
        
        var context = canvas.getContext('2d');
       
		 
		 context.strokeStyle = '#f00'; // red
		  context.lineWidth   = 4;
		 //context.fillStyle = "rgba(255,0,0, 0.6)";
        context.beginPath();
        context.arc(125,100,50,0,Math.PI*2,true);
		context.stroke();
        //context.fill();
		
	  }
	  
	  function drawTriangle(){
        
		 var canvas = document.getElementById('example');
        
        var context = canvas.getContext('2d');
       
		 
		 
		context.strokeStyle = '#f00'; // red
        context.lineWidth   = 4;
		context.beginPath();
        context.moveTo(125,100);
        context.lineTo(175,50);
        context.lineTo(225,150);
		context.closePath();
		context.stroke();
	  }

	  
	function showDescription()
	{
	document.getElementById('example').insertAdjacentHTML('AfterEnd', document.getElementById('example').innerHTML)

	}