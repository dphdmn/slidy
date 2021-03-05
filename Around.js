let solvesTable;
let statsTable;
let statsInfo;

let sessionTimesAdded;

function changePinkValue(){
  myGraphics.sizeChange();
}

function aroundSetup(){
  let W = myGraphics.W;
  solvesTable = document.getElementById('solvesTable')
   .getElementsByTagName('tbody')[0];
  statsTable = document
    .getElementById('statsTable').getElementsByTagName('tbody')[0]; 
  
  input = createInput("100", "range");
  input.parent("sketchHolder");
  input.position(300,W/16);
  input.input(function (){myGraphics.sizeChange()});
  input.hide();
  
  var cnv = createCanvas(W, W);
  cnv.style('display', 'block');
  cnv.style('margin', '0 auto');
  cnv.parent("sketchHolder");
  
  cnv.mousePressed(mousePressedCNV);
  cnv.mouseReleased(mouseReleasedCNV);
  cnv.mouseWheel(mouseWheelCNV);
 
  myArea = document.createElement("textarea");
  myArea.cols = "60";
  myArea.rows = "3";
  var logDiv =  document.getElementById("solvesLog");
  logDiv.appendChild(myArea);
  
  sessionTimesAdded = true;
}

function addSinT(stringArr, table, inTop){
  let newRow;
  let netCell;
  let newText;
  if (inTop){
    newRow = table.insertRow(1);
  }
  else{
    newRow = table.insertRow();
  }
  for (let i = 0; i<=stringArr.length-1;i++){
    netCell = newRow.insertCell(i);
    newText  = document.createTextNode(stringArr[i]);
    netCell.appendChild(newText);
  }
}

function deleteStatsTable(){
  for (let i = 1; i<=myStats.solvesAmount;i++){ 
      if (myStats.solvesAmount > 0){
        solvesTable.deleteRow(1);
      }
    }
}

function addStatsInLog(){
  if (!sessionTimesAdded){
      myArea.value += "\nEND OF THE SESSION\nYour stats:\n\n";
      myArea.value += statsInfo.substr(statsInfo.indexOf("Solves amount"));
      myArea.scrollTop = myArea.scrollHeight;
      sessionTimesAdded = true;  
    }
}

function addStats(){
  let solvesAmount = myStats.solvesAmount;
  let N = myStats.N;
  let modeName = myStats.modeName;
  let typeName = myStats.typeName;
  
  if (solvesAmount == 1){
    myArea.value += "\n----------NEW SESSION---------\n";
    myArea.value += "Game:" + gameName;
    myArea.value += "\nSize: " + N + "x" + N;
    myArea.value += "\nMode: " + modeName + "\n";
    myArea.value += "\nTime\tMvc\tTps\tScramble\tSolution\n";  /*TOCHANGE*/
    sessionTimesAdded = false;
  }
  
  /*TOCHANGE*/
  let tps = (movecount/currentTime).toFixed(3);
 myArea.value += currentTime.toFixed(3);
 myArea.value += "\t";
 myArea.value += movecount; 
 myArea.value += "\t";
 myArea.value += tps; 
 myArea.value += "\t";
 myArea.value += scrambles[solvesAmount-1];
myArea.value += "\t";
 myArea.value += solutions[solvesAmount-1]
 myArea.value += "\n";
  /*TOCHANGE*/
  
 addSinT([solvesAmount, currentTime.toFixed(3), movecount, tps ,scrambles[solvesAmount-1]],solvesTable, true); 
   /*TOCHANGE*/
  
 statsInfo = ""; 
  
 myArea.scrollTop = myArea.scrollHeight;

 statsInfo += "Game: " + gameName;
 statsInfo += "\nSize: " + N + "x" + N;
 statsInfo += "\nMode: " + modeName + "\n"; 
 statsInfo += "Solves amount: {" + solvesAmount + "}";
  
 let curType = typeName;
 myStats.myTypes.forEach(function(typ){
   statsInfo += "\n";
   statsInfo += "Type: [" + typ+ "]\n"; 
   myStats.setType(typ);
   myStats.calcResults();
   let i = 0;
   myStats.myAvgs.forEach(function(avg){
     myStats.setAvg(avg);
     statsInfo += addStat(solvesAmount, myStats.curAvgN,  myStats.myArray, myStats.hsMas[i]);
     i++;
   });
   statsInfo += "Session average: " + myStats.sessionStat;
 });
 myStats.setType(curType);
 myStats.calcResults();
  
 let rl = document.getElementById("statsTable").rows.length; 
 for (let i = 1; i<=rl;i++){ 
   statsTable.deleteRow(0); 
 }
  
 let myStrings = statsInfo.split("\n");
 myStrings.forEach(function(item){
    addSinT(item.split(":"),statsTable,false);
 });
  
}

function addStat(solvesAmount, N, array, hsresult){
  let value;
  let output = "";
  if (solvesAmount >= N){
    if (N == 1){
      value = Math.min.apply(Math, array);
      output += "Best single: " + value;
    }
    else{
      value = findBestAo(N, array);
      output += "Best ao"+ N +": " + value;
    }
    let pbdif = float(abs(hsresult-value));
      if (pbdif < 0.001){
        output += " [PB]";
      }else{
        let pwr = ((100-pbdif*100/hsresult - 80)*100/20);
        if (pwr < 0){
          pwr = 0;
        }
        output += " (" + pbdif.toFixed(3) + " to PB) [" + pwr.toFixed(0) + "%  power]";
      }
      output +=  "\n";
    }
  return output;
}

function nullAroundFlags(){
  statsAdded = false;
}
