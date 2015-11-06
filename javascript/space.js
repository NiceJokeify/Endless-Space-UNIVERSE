//resources
//http://stackoverflow.com/questions/15661796/how-to-handle-multiple-keypresses-with-canvas loktar
//http://www.homeandlearn.co.uk/JS/html5_canvas_keyboard_keys.html keydown events
//http://www.homeandlearn.co.uk/JS/html5_canvas_draw_scale_slice.html - drawing imgs
//http://www.w3schools.com/jsref/event_onload.asp
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now
//use in google chrome preferably. 

// redShip = PLAYER Two
// blueShip = PLAYER One

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var past;
var gameOver = false;
var gameOver2 = false;
var initial = 0;

// Window.onload function loading the initial screen for the game.
window.onload = function(){
	ctx.drawImage(universebackground, 0, 0); // background xy 00
	//ctx.drawImage(earthImg, 400, 400);
	//ctx.drawImage(saturnImg, 1000, 600);
	ctx.drawImage(sunImg, -480, 350);

	var past = Date.now();
	ctx.beginPath();
	ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
	ctx.rect(0,0, canvas.width, canvas.height);
	ctx.fill();

	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.font = "24px arial";
	ctx.fillText("Press ENTER to	start the game.", 450, canvas.height/2);
	ctx.strokeStyle="#FFFFFF";
	ctx.strokeRect(400,150,460,180);
	ctx.fillText("INSTRUCTIONS", 515, 140);
	ctx.font = "16px sarif";
	ctx.fillText("1.Collecting a FUEL Tank will icrease your score by 1.", 450, 175);
	ctx.fillText("2.Collecting a NITRO Tank will icrease your score by 2.", 450, 200);
	ctx.fillText("3.Every time your score increases by 5, your speed increases.", 450, 225);
	ctx.fillText("4.Colliding with enemy ship will result in LOSS of POINTS.", 450, 250);
	ctx.fillText("  ->Also resets to the default starting positions.", 450, 275);
	ctx.fillText("**Nitro will move away from you as you move**", 455, 295);
	ctx.fillStyle="#FFAAAA";
	ctx.font = "20px sarif";
	ctx.fillText("Collect 55 FUEL TANKS to WIN the game!.", 455, 315);
	

	// main, connect animation
	
}

// Universe Background Image
var universebackground = new Image();
universebackground.onload = function(){
	backgroundReady = true;
};
universebackground.src = "imgs/universe.png";

// BLUE SHIP IMAGE <PLAYER ONE>
var ship1img = new Image();
ship1img.onload = function(){
	player1Ready = true;
};
ship1img.src = "imgs/spaceship.png";

// Fuel Tank Image
var fuelImg = new Image();
fuelImg.onload = function(){
	fuelReady = true;
};
fuelImg.src = "imgs/fueltank.png";

// RED SHIP IMAGE <PLAYER TWO>
var ship2img = new Image();
ship2img.onload = function(){
	player2Ready = true;
};
ship2img.src = "imgs/spaceship2.png";


//Earth image load
var earthImg = new Image();
earthImg.onload = function(){
	earthReady = true;
};
earthImg.src = "imgs/earth.png";

//saturn image load
var saturnImg = new Image();
saturnImg.onload = function(){
	saturnReady = true;
};
saturnImg.src = "imgs/saturn.png";

//sun image load
var sunImg = new Image();
sunImg.onload = function(){
	sunReady = true;
};
sunImg.src = "imgs/sun.png";

var nitroImg = new Image();
nitroImg.onload = function(){
	nitroReady = true;
};
nitroImg.src = "imgs/nitro.png";
//blueWinImg
var blueWinImg = new Image();
blueWinImg.onload = function(){
	blueWinReady = true;
};
blueWinImg.src = "imgs/bluewin.png";

//redWinImg
var redWinImg = new Image();
redWinImg.onload = function(){
	redWinReady = true;
};
redWinImg.src = "imgs/redwin.png";

// Game Objects
var blueShip = {
	speed: 650, x:70, y:70
};

var fuelTank = {
	x: 600,y: 400
}

var redShip = {
	speed: 650, x: 1000,y: 60
}

var nitro = {
	speed: 400, x: 594,y: 677
}

var blueShipFuelCollected = 0;
var redShipFuelCollected = 0;

function draw()
{
  
}

// Reset fuel tank at random position
var reset = function(){
	// Spawn Fuel Tank in a random position
	fuelTank.x = 32 + (Math.random() * (canvas.width - 64));
	fuelTank.y = 32 + (Math.random() * (canvas.height - 64));

}

//reset Nitro tank at random canvas position
var resetNitro = function(){
	nitro.x = 32 + (Math.random() * (canvas.width - 64));
	nitro.y = 32 + (Math.random() * (canvas.height - 64));
   // nitro.speed = (nitro.speed > 100 ) ? ( nitro.speed) : (nitro.speed + blueShipFuelCollected);
	
}

//BLUE Ship Function Reset
var resetBlueShip = function(){
		//spawn blueShip in 70, 70 position
	blueShip.x = 70;
	blueShip.y = 70;
}

//RED Ship Function Reset
var resetRedShip = function(){
		//spawn redShip in 1000, 60 position
	redShip.x = 1000;
	redShip.y = 60;
}

//Keyboard events
var btnHold = {};
//
window.addEventListener("keydown", function(event){
	if (initial == 1)
	{
		btnHold[event.keyCode] = true;
	}
	//use ENTER to start the game
	if (initial == 0 && event.keyCode == 13)
	{
		initial = 1;
		main();
	}
}, false);

addEventListener("keyup", function(e){
	delete btnHold[event.keyCode];
}, false);
	
	
//PLAYER ONE - BLUE SHIP CONTROLS
// Update game Objects
var update = function(modifier){

	if(38 in btnHold){ // Up button
		blueShip.y -= blueShip.speed * modifier;
		nitro.y = ( nitro.y >0 ) ? ( nitro.y - nitro.speed * modifier ) : canvas.height - 32; // if the player presses up button the nitro obj will do the same
	}

	if(40 in btnHold){ // Down button
		blueShip.y += blueShip.speed * modifier;
		nitro.y = ( nitro.y + nitro.speed * modifier) % canvas.height; /// if the player presses down button the nitro obj will do the same
	}
	
	if(37 in btnHold){ // Left button
		blueShip.x -= blueShip.speed * modifier;
		nitro.x = (nitro.x > 0) ? (nitro.x - nitro.speed * modifier) : canvas.width - 32; // if the player presses left button the nitro obj will do the same
	}
	
	if(39 in btnHold){ // Right button
		blueShip.x += blueShip.speed * modifier;
		nitro.x = (nitro.x +  nitro.speed * modifier) % canvas.width; // if the player presses right button the nitro obj will do the same
	}
	
	// PLAYER ONE -  Increase Ship speed by every 5 fuel tanks collected
	// PLAYER TWO -  Descrease Ship speed at each score ex. if ship is at 5 speed = 800, when ship collides at goes under 5, speed will return to speed below that. 
	if(blueShipFuelCollected == 5){
		blueShip.speed = 800; //change blueShip speed to 800 if 5 barrels collected. 
	} 
	else if(blueShipFuelCollected == 10){
		blueShip.speed = 900; 
	} 
	else if(blueShipFuelCollected == 15){
		blueShip.speed = 1000;
	} 
	else if(blueShipFuelCollected == 20){
		blueShip.speed = 1100;
	} 
	else if(blueShipFuelCollected == 25){
		blueShip.speed = 1500;
	} 
	else if(blueShipFuelCollected == 30){
		blueShip.speed = 1700;
	} 
	else if(blueShipFuelCollected == 50){
		blueShip.speed = 2500;
	} // set true to gameover2 for blue ship. This will lead to displaying win screen not loss screen for blue ship player.
	else if(blueShipFuelCollected >= 55){
		gameOver2 = true;
	}
	
	//blueShip stop at canvas edge
	if (blueShip.x<0) // blueShip one stop at left of canvas
	{
		blueShip.x=0;
	}
	if (blueShip.y<0) // blueShip one stop at top of canvas
	{
		blueShip.y=0;
	}
	if (blueShip.x>1230) //blueShip one stop at right side of canvas
	{
		blueShip.x=1230;
	}
	if (blueShip.y>670) // blueShip one stop at the bottom of canvas
	{
		blueShip.y=670;
	}
	
	
	//NITRO obj stop at canvas edge - Turned off for better competition. Uncomment for it to stop at edge.
	/*if (nitro.x<5) // NITRO stop at left of canvas
	{
		nitro.x=5;
	}
	if (nitro.y<5) // NITRO stop at top of canvas
	{
		nitro.y=5;
	}
	if (nitro.x>1230) //NITRO stop at right side of canvas
	{
		nitro.x=1230;
	}
	if (nitro.y>670) // NITRO stop at the bottom of canvas
	{
		nitro.y=670;
	}*/

	// Check for collision between the blue ship <PLAYER ONE> and the Fuel Tank
	if(
		blueShip.x <= (fuelTank.x + 20)
		&& fuelTank.x <= (blueShip.x + 20)
		&& blueShip.y <= (fuelTank.y + 20)
		&& fuelTank.y <= (blueShip.y + 20)
		){
		++blueShipFuelCollected; // add +1 to blue ship
	reset();
	
	}
	//Check for collision between the blue ship <PLAYER ONE> and the NITRO Fuel Tank
	if (
        blueShip.x <= (nitro.x + 32)
        && nitro.x <= (blueShip.x + 32)
        && blueShip.y <= (nitro.y + 32)
        && nitro.y <= (blueShip.y + 32)
    ) {
        
		++blueShipFuelCollected;		
		++blueShipFuelCollected;		//if blue ship collides with NITRO fuel tank, add fuel collected +2
        resetNitro();  // resets Nitro at random position on canvas
    }
	
	
	
	
	//PLAYER TWO CONTROLS
	if(87 in btnHold){ // Up button
		redShip.y -= redShip.speed * modifier;
		nitro.y = ( nitro.y >0 ) ? ( nitro.y - nitro.speed * modifier ) : canvas.height - 32; // if the player presses up button the nitro obj will do the same
	}

	if(83 in btnHold){ // Down button
		redShip.y += redShip.speed * modifier;
		nitro.y = ( nitro.y + nitro.speed * modifier) % canvas.height;// if the player presses down button the nitro obj will do the same
	}
	if(65 in btnHold){ // Left button
		redShip.x -= redShip.speed * modifier;
		nitro.x = (nitro.x > 0) ? (nitro.x - nitro.speed * modifier) : canvas.width - 32;// if the player presses left button the nitro obj will do the same
	}
	if(68 in btnHold){ // Right button
		redShip.x += redShip.speed * modifier;
		nitro.x = (nitro.x +  nitro.speed * modifier) % canvas.width;// if the player presses left button the nitro obj will do the same
	}
	
	
	// PLAYER TWO -  Increase Ship speed every 5 fuel tanks collected
	// PLAYER TWO -  Descrease Ship speed at each score 
	
	if(redShipFuelCollected == 5){
		redShip.speed = 800;//change redShip speed to 800 if 5 barrels collected.  similar for rest
	} 
	else if(redShipFuelCollected == 10){
		redShip.speed = 900;
	} 
	else if(redShipFuelCollected == 15){
		redShip.speed = 1000;
	} 
	else if(redShipFuelCollected == 20){
		redShip.speed = 1100;
	} 
	else if(redShipFuelCollected == 25){
		redShip.speed = 1500;
	} 
	else if(redShipFuelCollected == 30){
		redShip.speed = 1700;
	} 
	else if(redShipFuelCollected == 50){
		redShip.speed = 2500;
	}// set true to gameover for red ship. This will lead to displaying win screen not loss screen for red ship player.
	else if(redShipFuelCollected >= 55){
		gameOver = true;
	}
	
	//redShip ONE stop at canvas edge
	if (redShip.x<0) // redShip one stop at left of canvas
	{
		redShip.x=0;
	}
	if (redShip.y<0) // redShip one stop at top of canvas
	{
		redShip.y=0;
	}
	if (redShip.x>1230) //redShip one stop at right side of canvas
	{
		redShip.x=1230;
	}
	if (redShip.y>670) // redShip one stop at the bottom of canvas
	{
		redShip.y=670;
	}

	// Check for collision between the redShip ship and the fuel tank
	if(
		redShip.x <= (fuelTank.x + 27)
		&& fuelTank.x <= (redShip.x + 27)
		&& redShip.y <= (fuelTank.y + 27)
		&& fuelTank.y <= (redShip.y + 27)
		){
		++redShipFuelCollected;
	reset(); // reset target for fuel tank
	
	}
	
	
		//Check for collision between the RED ship <PLAYER TWO> and the NITRO Fuel Tank
	if (
        redShip.x <= (nitro.x + 32)
        && nitro.x <= (redShip.x + 32)
        && redShip.y <= (nitro.y + 32)
        && nitro.y <= (redShip.y + 32)
    ) {
        
		++redShipFuelCollected;
		++redShipFuelCollected;		// if red ship collides with NITRO fuel tank, add fuel collected +1
        resetNitro();  //reset target nitro 
    }
	
	//If blueShip or redShip collide with each other, both will loose FUEL and both will be RESET to game starting points.
	if(
		redShip.x <= (blueShip.x + 20)
		&& blueShip.x <= (redShip.x + 20)
		&& redShip.y <= (blueShip.y + 20)
		&& blueShip.y <= (redShip.y + 20)
		){
		--redShipFuelCollected; // take -1 from Red ship score
		--blueShipFuelCollected; // take -1 from Blue ship score
		
	resetBlueShip(); 
	resetRedShip();
	
	}
	
};

// Drawing to the canvas context
//draw earth & saturn before ships to make seem like you're actually in space
var render = function(){
	//Universe
	if(backgroundReady){
		ctx.drawImage(universebackground, 0, 0); // background xy 00
	}
	//earth
	if(earthReady){
		ctx.drawImage(earthImg, 400, 400); // at 400,400
	}
	//saturn
	if(saturnReady){
		ctx.drawImage(saturnImg, 1000, 600);//at 1000, 600
	}
	//BLUE SHIP
	if(player1Ready){
		ctx.drawImage(ship1img, blueShip.x, blueShip.y);
	}
	//FUEL 
	if(fuelReady){
		ctx.drawImage(fuelImg, fuelTank.x, fuelTank.y);
	}
	//RED SHIP
	if(player2Ready){
		ctx.drawImage(ship2img, redShip.x, redShip.y);
	}
	//sun
	if(sunReady){
		ctx.drawImage(sunImg, -480, 350); //at -48, 350
	}
	//nitro
	if(nitroReady){
		ctx.drawImage(nitroImg, nitro.x, nitro.y);
	}
	
	//red gameover screen print
	if(gameOver == true){
		ctx.drawImage(redWinImg, 0, 0);
	}
	//blue gameover screen print
	if(gameOver2 == true){
		ctx.drawImage(blueWinImg, 0, 0);
	}
	
	// blueShip Score keeping
	ctx.fillStyle = "rgb(35, 192, 249)";
	ctx.font = "24px Courier New";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText(" PLAYER 1 ", 20, 20);
	ctx.fillText("|________", 20, 20);
	ctx.fillText(" Fuel Collected: " + blueShipFuelCollected, 20, 50);
	
	// redShip Score keeping
	ctx.fillStyle = "rgb(249, 35, 35)";
	ctx.font = "24px Courier New";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText(" PLAYER 2 ", 1000, 20);
	ctx.fillText("|________", 1000, 20);
	ctx.fillText(" Fuel Collected: " + redShipFuelCollected, 1000, 50);
}

// Main loop
var main = function(){
	var now = Date.now(); 
	var delta = now - past; //Delta Timing 
	update(delta / 5000); // better quality, better framerate
	render();
	past = now;
	requestAnimationFrame(main); //animation for main
};