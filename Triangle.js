 
 class Triangle
 {
	 constructor()
	 {
		 //Initialize vertices
		 //Load bufers!  - ONLY HERE
		 this.positions = [
			  0, 0, .2,		1,0,0,
			  0, 0.5, .2,	0,1,0,
			  0.7, 0,.2,	0,0,1
			];
			//Create a position buffer;
			this.positionBuffer = gl.createBuffer();
			//Bind "ARRAY_BUFFER type to the positionBuffer";
			gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
						//load the points.
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);	 
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
		
		
		var primitiveType = gl.TRIANGLES;
		var offset = 0;
		var count = 3;
		gl.drawArrays(primitiveType, offset, count);	
	 }
	 update()
	 {
		 //Do cool stuff.
		 
	 }
	 
 }