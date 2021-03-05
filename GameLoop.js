let ingame;
let settingspage;

let exitSave;

let statsAdded;
let solveIsAdded;
let resultsCalculated;
let hsChanged;

let myGraph;

function draw(){
  if (settingspage){
    myGraphics.drawSettings(); 
  }
  else
    if (ingame){ 
      if (!myStats.keyboard){
        checkHover();
      }
      ingame = !checkIfLose();
      gameThings();  
      myGraphics.textThings();      
   }
    else{ 
      if (!solveIsAdded){
        addSolve();
        solveIsAdded = true;
      }
      if (!hsChanged){
        myStats.setHighScores();
        hsChanged = true;
      }
      if (!resultsCalculated){
        myStats.calcResults();  
        resultsCalculated = true;
      }
      if (!statsAdded){
        addStats();
        statsAdded = true;
      }         
      if (!myGraphics.gameOverDrawn){
        exitSave = true;   //you can exit session once if youre just lose
        myGraphics.gameOverText();
        myGraphics.gameOverDrawn = true;
      }
      if (!myGraphics.graphIsDrawn){
         myGraph = new GameGraph(myStats.myArray, 
                                 myStats.sessionAvg, 
                                 myStats.sesSigma, 
                                 myStats.solvesAmount);
         myGraph.drawGraphs();
         myGraphics.graphIsDrawn = true;
      }
      myGraph.drawGraphDot();
    }
}

//resettype - true - WIN, false - reset the game (no avreages)
function gameSetup(resettype){
  if (!resettype){
    deleteStatsTable();
    addStatsInLog();
    nullSolveInfo();
  }
  myGraphics.nullGraphFlags();
  myStats.nullStatsFlags();
  nullAroundFlags();
  nullGame();
  exitSave = false; //you can't change something and save session
  ingame = true; 
  settingspage = false;
}
