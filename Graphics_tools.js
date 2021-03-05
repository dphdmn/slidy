class Graphic_tools{

  constructor(){
    this.hidemode = false;
    this.graph = true;
  
    this.histo = false;
    this.dotWasDrawn = false;
    this.dotSize = 17; //size of the dot on the graph
  
    this.W = 800; //canvas size
    this.BS = 70; //basic Range size
    frameRate(240);

  }
  
  sizeChange(){
    this.BS = (input.value())*50/100 + 20;
    this.boardSize = (this.BS/100)*this.W;
  }
  
  nullGraphFlags(){
    this.gameOverDrawn = false;
    this.graphIsDrawn = false;
    textFont('Helvetica');
    strokeWeight(0.1);
    stroke(cc("basicStroke"));
    this.sizeChange();
  }
  
  drawLine(valuesArr, id, head){
    let col = valuesArr.length; 
    let sizeBlock = this.W/col;
    if (head){
      textStyle(BOLD);
    }
    else{
      textStyle(ITALIC);
    }
    text(valuesArr[0], sizeBlock/2, this.W-(this.W/22)*id);
    if(head){
      textStyle(BOLD);
    }
    else{
      textStyle(NORMAL);
    }
    for (let i = 1; i< valuesArr.length; i++){
      text(valuesArr[i], + sizeBlock*(i) + sizeBlock/2, this.W-(this.W/22)*id);
    }
  }

  drawSettings(){
    input.hide();
    textFont('Georgia');
    background(cc("SettingsPageBg"));
  }
  
  textThings(){
    input.show();

    this.alpha = 200;
    if (this.hidemode){
      this.alpha = 42;
      input.hide();
    }
    background(cc("gameBg"));
    textAlign(CENTER,CENTER);
    textFont('Georgia');
    textSize(40);
    fill(cc("logo", this.alpha));
    text(gameName + " " + gameVersion, this.W/2, this.W-this.W/15);
  }

  drawLinePBC(i, value, id){
    if (myStats.pbMas[i]) {
      fill(cc("pbText"));
      this.drawLine([value, myStats.currentMas[i] + myStats.sigmaMas[i], myStats.hsMas[i]], id ,false);
      fill(cc("statsText"));
    }
    else{
      this.drawLine([value, myStats.currentMas[i] + myStats.sigmaMas[i], myStats.hsMas[i]], id ,false);
    }
  }  
  
  gameOverText(){
    input.hide();
    textFont('Georgia');
    background(cc("GameOverBg"));

    textSize(25);
    fill(cc("headers")); 
    this.drawLine(["Stats", "Now", "Highscore"], 8, true);
    fill(cc("statsText"));  
    this.drawLinePBC(0, myStats.typeName, 7);
    if (myStats.solvesAmount >= 5){this.drawLinePBC(1, myStats.typeName + " ao5", 6)}
    if (myStats.solvesAmount >= 12){this.drawLinePBC(2, myStats.typeName + " ao12", 5)}
    if (myStats.solvesAmount >= 50){this.drawLinePBC(3, myStats.typeName + " ao50", 4)}
    if (myStats.solvesAmount >= 100){this.drawLinePBC(4, myStats.typeName + " ao100", 3)}
    textSize(20);
    this.drawLine(["Session average "+"{" + myStats.solvesAmount + "}",
                   myStats.sessionStat],2,false); 
    fill(cc("helpers")); 
    this.drawLine(["Press [S] to see stats", "Press [H] to reset HS", "[R] to show other type"], 
                  1, false);   
  }
}

