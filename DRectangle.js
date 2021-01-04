class DRectangle
{
	constructor()
	 {
		 this.savex1 = 0;
		 this.savey1= 0;
		 this.savex2 = 0;
		 this.savey2 = 0;
		  this.r = 0;
		this.g = 0;
		this.b = 0;
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
		 this.numPoints =0; 
	 }
	 // Make the square a loop. Save point one.
	 addPoint(x,y)//I could send in my color
	 {
		 
		 console.log(this.numPoints);
		 
		if (this.numPoints == 0)
		{
			this.savex1 =x;
			this.savey1 =y;
			console.log(this.savex1);
			console.log(this.savey1);
			
		}
		 //First point
		 if(this.numPoints == 2)
		 {
			 
			 this.savex2 = x;
			 this.savey2 = y;
			 console.log(this.savex1);
			console.log(this.savey1);
			 console.log(this.savex2);
			console.log(this.savey2);
			
		this.positions.push(this.savex1)
		 this.positions.push(this.savey1)
		 this.positions.push(0)
		 this.positions.push(r)
		 this.positions.push(g)
		 this.positions.push(b)
		
		 this.positions.push(this.savex1)
		 this.positions.push(this.savey2)
		 this.positions.push(0)
		 this.positions.push(r)
		 this.positions.push(g)
		 this.positions.push(b)
		
		 this.positions.push(this.savex2)
		 this.positions.push(this.savey2)
		 this.positions.push(0)
		 this.positions.push(r)
		 this.positions.push(g)
		 this.positions.push(b)
		
		this.positions.push(this.savex2)
		 this.positions.push(this.savey1)
		 this.positions.push(0)
		 this.positions.push(r)
		 this.positions.push(g)
		 this.positions.push(b)
		 }
		 
		 gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
		 //load the points.
		 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
		 this.numPoints +=2		 
		 if(this.numPoints == 4)
		 {
			 this.isFinished = true;
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
		var primitiveType = gl.TRIANGLE_FAN;
		var offset = 0;
		var count = this.numPoints;
		gl.drawArrays(primitiveType, offset, count);	
		}
		/*
		else
		{
			var primitiveType = gl.LINE_STRIP
			var offset =0;
			gl.drawArrays(primitiveType,offset,this.numPoints);
		}
		*/
	 }
	 update()
	 {
		 //Do cool stuff.
		 
	 }


}