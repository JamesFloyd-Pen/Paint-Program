class DCircleOL
{
constructor()
	 {
		 this.saveX = 0;
		 this.saveY = 0;
		  this.r = 0;
		 this.g = 0;
		 this.b = 0;
		 //this.vert1 = 0;
		 //this.vert2 = 0;
		 this.isFinished = false;
		 this.numPoints =0;
		 //Initialize vertices
		 //Load bufers!  - ONLY HERE
		 this.positions = [];
			//Create a position buffer;
			this.positionBuffer = gl.createBuffer();
			//Bind "ARRAY_BUFFER type to the positionBuffer";
			gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
						//load the points.
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
		this.primitiveSelection;
	 }
	 
	   addColor(red,green,blue)
	 {
		 this.r = red;
		 this.g = green;
		 this.b = blue;
		 console.log("Success! we got... " + r + " " + g + " " + b);
	 }
	 
	  clearPoints()
	 {
		 this.numPoints = 0; 
	 }
	 
	addPoint(x,y)//I could send in my color
     {
		 var radius = 0;
		 var xcirc =0;
		 var ycirc=0;
		 if(this.numPoints == 0)
		 {
			 this.saveX = x;
			 this.saveY = y;
	
		}
		else
		{
			radius = Math.sqrt( Math.pow(x - this.saveX,2) + Math.pow(y - this.saveY,2) );
			
		}
			
		 
        //var vert =[];
		  for(var i = 0; i<200; i++)
        {
            var j = i *3* Math.PI/200;
            //x = cos, y=sin
            xcirc = this.saveX + (radius*Math.cos(j));
			ycirc = this.saveY + (radius*Math.sin(j));
			
			this.positions.push(xcirc); //x
			this.positions.push(ycirc); //y
			this.positions.push(0); //z
            this.positions.push(r); //r
            this.positions.push(g); //g
            this.positions.push(b); //b
			
			  
         gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
         //load the points.
         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
         this.numPoints +=1
         if(this.numPoints == 250)
         {
             this.isFinished = true;
         }
			
        }
     } 
	 
	 draw(program)
	 {		 
		 
		 //Bind the correct buffers
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
		 //Set my attributes properties
		 //Draw shape
		 var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
		 //Now we specify HOW TO read our vertices
		 gl.enableVertexAttribArray(positionAttributeLocation);
		// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
		var size = 3;          // 3 components per iteration
		var type = gl.FLOAT;   // the data is 32bit floats
		var normalize = false; // don't normalize the data
		var stride = 6*Float32Array.BYTES_PER_ELEMENT;        // 0 = move forward size * sizeof(type) each iteration to get the next position
		var offset = 0;        // start at the beginning of the buffer
		gl.vertexAttribPointer(positionAttributeLocation, size, 
		type, normalize, stride, offset)
		
		 var colorAttributeLocation = gl.getAttribLocation(program, "a_color");
		 //Now we specify HOW TO read our vertices
		 gl.enableVertexAttribArray(colorAttributeLocation);
		// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
		size = 3;          // 3 components per iteration
		type = gl.FLOAT;   // the data is 32bit floats
		normalize = false; // don't normalize the data
		stride = 6*Float32Array.BYTES_PER_ELEMENT;        // 0 = move forward size * sizeof(type) each iteration to get the next position
		offset = 3*Float32Array.BYTES_PER_ELEMENT;        // start at the beginning of the buffer
		gl.vertexAttribPointer(colorAttributeLocation, size, 
		type, normalize, stride, offset)		
		
		
		if(this.isFinished)
		{
		var primitiveType = gl.LINE_LOOP;
		var offset = 0;
		var count = this.numPoints;

		gl.drawArrays(primitiveType, offset, count);	
		}
		
		else
		{
			var primitiveType = gl.LINE_STRIP
			var offset =0;
			gl.drawArrays(primitiveType,offset,this.numPoints);
		}
		
	 }
	 update()
	 {
		 //Do cool stuff.
		 
	 }
}