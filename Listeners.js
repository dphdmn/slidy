let wheelConst;
let clickInterval;
let cornersConst = 25;


function mouseReleased(){

}

function mouseReleasedCNV(){

}

function checkHover(){
   if(inRect(mouseX, mouseY, myGraphics.zero, myGraphics.zero, myGraphics.boardSize, myGraphics.boardSize)){
      //in board
      let x = int(floor((mouseX-myGraphics.zero)/myGraphics.tileSize));
      let y = int(floor((mouseY-myGraphics.zero)/myGraphics.tileSize));
      let numberClickedPos = XYtolin(x,y)-1;
      if(numberClickedPos!=(blankid-1)){
       //print(randomNumbers[numberClickedPos]);
        xb = linToX(blankid);
        yb = linToY(blankid);
        if (xb == x){ //same column
          let d = y - yb;
          if (y > yb){
            for (let i = 1; i<=d;i++){
              move(3)
            }
          }else{
            for (let i = 1; i<=(0-d);i++){
               move(4)
            }
          }
        }
       if (yb == y){ 
          let d = x - xb;
          if (x > xb){
            for (let i = 1; i<=d;i++){
              move(1)
            }
          }else{
            for (let i = 1; i<=(0-d);i++){
               move(2)
            }
          }
        } 
    }
  }
}
/*
function checkClick(){
   if(inRect(mouseX, mouseY, myGraphics.zero, myGraphics.zero, myGraphics.boardSize, myGraphics.boardSize)){
      //in board
      let x = int(floor((mouseX-myGraphics.zero)/myGraphics.tileSize));
      let y = int(floor((mouseY-myGraphics.zero)/myGraphics.tileSize));
      let numberClickedPos = XYtolin(x,y)-1;
      //right tile is clicked
      if (randomNumbers[numberClickedPos] === currentNumber){
        if(myStats.hideElments){
          notSolved[numberClickedPos] = false;
        }        
        currentNumber++;
        eatsound.play();
        clearInt();
        let r = 1000*(currentTime-lastpicktime).toFixed(3)
        reactions.push(r);
        lastpicktime = currentTime;
      }
    }
}*/

function mousePressedCNV(){
  if (mouseButton == LEFT){
  if (ingame){
    }
    //resetting the game after blackscreen 
    else{ 
      gameSetup(exitSave);
    }
  }
}

//KeyListener
function keyPressed(){ 
  if (myStats.keyboard){
    if (keyCode === UP_ARROW){
      move(3);
    }
    if(keyCode === DOWN_ARROW){
       move(4);
    }
    if(keyCode === LEFT_ARROW){
      move(1);
    }
    if(keyCode === RIGHT_ARROW){
      move(2)
    }
  }
  
  //reset
  if (key === ' '){
    gameSetup(exitSave); 
  }
  //reset highscores
  if (key === 'h' || key === 'р' || key === 'H' || key === 'Р'){
    myStats.removeHighScores();
  }
  //open/close settings page
   if (key === 's' || key === 'ы' || key === 'S' || key === 'Ы'){
    settingspage = !settingspage;
    ingame = false;
    if (!settingspage){
      gameSetup(false);
    }
  }
  if( key === 'M' || key === 'm' || key === 'Ь' || key === 'ь'){
	  myStats.switchMode(true); 
  }
  if( key === 'V' || key === 'v' || key === 'м' || key === 'М'){
	  myGraphics.hidemode = !myGraphics.hidemode;
  }
  if (key === '+' || key === '='){
    myStats.switchSize(true);
  }
  if (key === '-'){
    myStats.switchSize(false);
  }
  if (key === '3' ||
      key === '4' ||
      key === '5' ||
      key === '6' ||
      key === '7'
     ){
    myStats.N = key;
    if (myStats.N === '0'){
      myStats.N = 10;
    }
    gameSetup(false);
  }
  if (key === 'r' || key === 'к' || key === 'R' || key === 'К'){
    if (!ingame){
       myStats.switchType(true);
       myGraphics.gameOverDrawn = false;
       myGraphics.graphIsDrawn = false;
    }else{
      gameSetup(exitSave); 
    }
  }
  if (key === 'g' || key === 'G' || key === 'п' || key === 'П'){
   myGraphics.graph = !myGraphics.graph;
   myGraphics.graphIsDrawn = false;
  }
  if (key === 'f' || key === 'F' || key === 'а' || key === 'А'){
    myGraphics.histo = !myGraphics.histo;
    myGraphics.graphIsDrawn = false;
  }
}

function mouseWheelCNV(event) {
  clearInterval(clickInterval);
  if (!ingame){
    myGraphics.graphIsDrawn = false;
    if (event.deltaY > 0) {
      if (wheelConst < 4){
        wheelConst += 0.1;
      }
    }
    else {
      if (wheelConst > 0.4){
        wheelConst -= 0.1;
      }
    }
  }
  else{
     if (event.deltaY > 0) {
      if (cornersConst < 100){
        cornersConst += 5;
      }
    }
    else {
      if (cornersConst > 0){
        cornersConst -= 5;
      }
    } 
  }
}