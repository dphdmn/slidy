class Stats_tools{
  constructor(){
    this.currentMas= [];
    this.hsMas = [];
    this.pbMas = [];
    this.sigmaMas = [];
  }

  //---------------------------------------------------------------------

  switchAvg(side){ 
    let myAvgs = this.myAvgs;
    let curAvg = this.curAvg;
    
    if (side){
      this.setAvg(myAvgs[getNextIndex(myAvgs.indexOf(curAvg), myAvgs)]);
    }
    else{
      this.setAvg(myAvgs[getPrewIndex(myAvgs.indexOf(curAvg), myAvgs)]);
    }
  }
  
  getAvgStat(avg){
    //print(this.myArray);
    this.setAvg(avg);
    if(this.curAvgN == 1){
      return this.getMySingle(); 
    }
    else{
      return getAo(this.curAvgN, this.myArray);
    }
  }
  
  setAvg(str,N){
    this.curAvg = str;
    this.curAvgN = N;
  }

  addAvgs(array){
   this.myAvgs = array; 
  }


  //--------------------------------------------------------------------

  switchSize(side){ 
    let mySizes = this.mySizes;
    let N = this.N;
    if (side){
      this.setSize(mySizes[getNextIndex(mySizes.indexOf(N), mySizes)]);
    }
    else{
      this.setSize(mySizes[getPrewIndex(mySizes.indexOf(N), mySizes)]);
    }
  }

  setSize(str){
    this.N = str;
    gameSetup(false);
  }

  addSizes(array){
   this.mySizes = array; 
  }
  //--------------------------------------------------------------------
  switchMode(side){ 
    let myMods = this.myMods;
    let modeName = this.modeName;
    if (side){
      this.setMode(myMods[getNextIndex(myMods.indexOf(modeName), myMods)]);
    } else{
      this.setMode(myMods[getPrewIndex(myMods.indexOf(modeName), myMods)]);
    }
    gameSetup(false);
  }

  setMode(str){
    this.modeName = str;
  }

  addMods(array){
   this.myMods = array; 
  }
  
 // ---------------------------------------------------------------

  switchType(side){ 
    let myTypes = this.myTypes;
    let typeName = this.typeName; 
    if (side){
      this.setType(myTypes[getNextIndex(myTypes.indexOf(typeName), myTypes)]);
    }
    else{
      this.setType(myTypes[getPrewIndex(myTypes.indexOf(typeName), myTypes)]);
    }
    myGraphics.gameOverDrawn = false;
    this.calcResults();
  }

  getMySingle(){
    return this.single;
  }

  setType(str, array, single){
    this.typeName = str;
    this.single = single;
    this.myArray = array;
  }

  addTypes(array){
   this.myTypes = array; 
  }
  
  //---------------------------------------------------------------------
  calcResults(){
    //prepare valuse for calc
    this.currentMas.length = 0;
    this.hsMas.length = 0;
    this.pbMas.length = 0;
    this.sigmaMas.length = 0;

    //amount of the solves
    let ar = this.myArray;
    this.solvesAmount = ar.length;

    //current results, highScores, sigmas of current
    let currentMas = this.currentMas;
    let hsMas = this.hsMas;
    let sigmaMas = this.sigmaMas;
    let obj = this;
    this.myAvgs.forEach(function(avg){
      currentMas.push(obj.getAvgStat(avg));
      hsMas.push(obj.lHighScore(obj.typeName, obj.modeName, obj.N, avg));
      sigmaMas.push(" (σ="  + float(getSigmaN(ar, obj.curAvgN)).toFixed(2) + ")");
    });
    sigmaMas[0] = ""

    //calculating pb or not for current
    for (let i = 0; i<=4; i++){   
      if(abs((float(hsMas[i]) - float(currentMas[i]))) < 0.001){
        this.pbMas[i] = true;
      }
      else{
        this.pbMas[i] = false;
      }
    }

    //calculating session average
    this.sessionAvg = getAo(this.solvesAmount,ar);
    this.sesSigma = float(getSigmaN(ar,ar.length));
    this.sessionStat =  this.sessionAvg+ " (σ = " + this.sesSigma.toFixed(2) + ")";
  }
  
  nullStatsFlags(){
    resultsCalculated = false;
    hsChanged = false;
    solveIsAdded = false;
  }
  
  sHighScore(typeID, modeID, sizeID, avgID, value){

    let id = this.getIndex(typeID, modeID, sizeID, avgID);

    this.storeHs(getItem(id), 
            id, 
            value 
           );
  }

  lHighScore(typeID, modeID, sizeID, avgID){
    let itm = getItem(this.getIndex(typeID, modeID, sizeID, avgID));
    if (itm == null){
      return "{}";
    }else{
      return float(itm);
    }
  }

  //store current hs if better 
  storeHs(hs, hsId, current){
    let hsIsBigger = hs > float(current);
    if (current != null && current != "N/A"){
      if (hs == null || (hsIsBigger)){
        storeItem(hsId, ""+current);
      }
    }
  }

  setHighScores(){
    let t = this.typeName;
    //print(t);
    let obj = this;
    obj.myAvgs.forEach(function(avg){
      obj.myTypes.forEach(function(typ){
        obj.setType(typ);
        obj.sHighScore(typ, obj.modeName, obj.N, avg, obj.getAvgStat(avg)); 
      });
    });
    this.setType(t);
  }

  getIndex(typeID, modeID, sizeID, avgID){   
    let s = gameName + typeID + modeID + sizeID + avgID;
    return s;
  }


  removeHighScores(){
   if (window.confirm("Do you really want to REMOVE ALL OF YOUR HIGHSCORES?")) { 
      for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.startsWith(gameName)){
          localStorage.removeItem(key);
        }
    }
    }
  }

  
}