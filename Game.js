let gameName;

let reactions;
let solvesT;
let solvesR;

let startTime;
let currentTime;
let lastpicktime;

let currentNumber;
let randomNumbers;
let notSolved;

let blankid;
let movecount=0;
let scrambles;
let solutions;

let currentsol = "";

function gamePreSetup(){
  
  gameName = "SlidySlide";
  gameVersion = "[1.0]";
  gameOverDrawn = false;
  wheelConst = 1.5;
  reactions = [];
  solvesT = [];
  solvesR = [];
  scrambles = [];
  solutions = [];
  myStats.setMode("Mouse");
  myStats.setType("Time");
  myStats.N = 4;
}

function nullSolveInfo(){
  solvesT.length = 0;
  solvesR.length = 0;
  myStats.solvesAmount = 0;
  scrambles.length = 0;
  solutions.length = 0;
}

function nullGame(){
  let N = myStats.N;
  //console.log(randomNumbers);
  randomNumbers = [];
  //console.log(randomNumbers);
  randomNumbers.length = 0;
  //console.log(randomNumbers);
  
  
  
  startTime = 0;
  
  currentNumber = 1;
 
  let maxN = N*N;
  for (let i = 1; i <= maxN; i++){
    randomNumbers[i-1]=i;
    
  }
  randomNumbers = shuffleNumbers([...randomNumbers], N);
  blankid =N*N;
  let rmoves = int(random(0, N-1));
  let dmoves = int(random(0, N-1));
  for (let i = 1; i<=rmoves;i++){
    move(2);//print("move2"); 
  }
  for (let i = 1; i<=dmoves;i++){
    move(4);//print("move4"); 
  }
  //print([N,maxN,randomNumbers]);
  for (let i = 1; i<= maxN;i++){
    if (randomNumbers[i-1] == maxN){
      blankid = i; 
      i=maxN+1;
    }
  }
  movecount=0;
  let str = randomNumbers.join(" ");
  let n = myStats.N;
  let ch = ' ';

  let regex = new RegExp("((?:[^" +ch+ "]*" +ch+ "){" + (n-1) + "}[^" +ch+ "]*)" +ch, "g");

  str = str.replace(regex, '$1/');
  scrambles.push(str);
  currentsol = "";
  //print(scrambles);
}

function move(side){
  if (movecount == 0){
    startTime = new Date();
  }
  let N = myStats.N - 1;
  xb = linToX(blankid);
  yb = linToY(blankid);
  solThing="";
  if (side == 1){//left (blank to the right)
    newx=xb+1;
    newy=yb;
    solThing="L";
  }
  if (side == 2){//right (blank to the left)
    newx=xb-1;
    newy=yb;
    solThing+="R";
  }
  if (side == 3){//up (blank to the bottom)
    newx=xb;
    newy=yb+1;
    solThing+="U";
  }
  if (side == 4){//down (blank to the up)
    newx=xb;
    newy=yb-1;
    solThing+="D";
  }
  if ((newx >= 0) && (newx <= N) && (newy >= 0) && (newy <= N)){
    newt=XYtolin(newx,newy);
    tmp = randomNumbers[newt-1];
    randomNumbers[newt-1]=randomNumbers[blankid-1];
    randomNumbers[blankid-1]=tmp;
    blankid=newt;
    movecount++;
    currentsol+=solThing;
  }else{
    print("impossible move " + side)
  }
}

//should return true if lose
function checkIfLose(){
  let N = myStats.N;
  maxN=N*N;
  for (let i = 1; i<=maxN;i++){
    if (randomNumbers[i-1] != i){
      return false;
    }
    
  }
  return true;
  //return (currentNumber > N*N);
}

function gameThings(){  
  currentTime = (new Date() - startTime)/1000;
}
function shuffleNumbers(array, N) {
 let maxN = N*N;
 let lastI = maxN - 3;
 
 for (let i = 0; i<=lastI;i++){
   
   randomInt = int(random(i+1, maxN-1));
   //print([N,randomInt]);
   tmp = array[i];
   array[i]=array[randomInt];
   array[randomInt] = tmp;
 }
  if (lastI % 2 == 0){
    tmp = array[0]
    array[0] = array[1];
    array[1] = tmp;
  }

  return array;
}
/*
//randomize array numbers
function shuffleNumbers(array) {
  let tmp, current, top = array.length;
  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}
*/

//X Y coords to lin (0..N-1) (0..N-1) to 1..N^2
function XYtolin(X, Y)
{
  let N = myStats.N;
  return Y*N + X + 1;
}

//lineral coordinats to X (1..N^2) to (0..N-1)
function linToX(lin){
  let N = myStats.N;
  return (lin-1) % N;
}

//lineral coordinats to Y (1..N^2) to (0..N-1)
function linToY(lin){
  let N = myStats.N;
  return int(floor((lin-1) / N));
}

function addSolve(){
 solvesT.push(currentTime);
 solvesR.push(movecount);
 solutions.push(currentsol);
 // print(solvesR);
}


