let outlierconst = 0.05;

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === 1) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
    
  } else if (axis === 2) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}
function getNextIndex(cur, array){
  if (cur == (array.length - 1)){
    return 0;
  }
  else{
    return (cur+1);
  }
}

function getPrewIndex(cur, array){
  if (cur == 0){
    return array.length-1;
  }
  else{
    return (cur-1);
  }
}

//return true if x,y in rect position rx ry size w*h
function inRect(x,y, rx, ry, w, h){
  let mNormX = x-rx;
  let mNormY = y-ry;
  return (mNormX >= 0 && mNormY >= 0 && 
        mNormX <= w && mNormY <= h)
}

//returns true if value in circle
function valueInCircle(xvalue, yvalue, x, y, R){
  return (sqrt(abs(xvalue-x)*(abs(xvalue-x)) + (abs(yvalue-y)*abs(yvalue-y)))<R);    
}

function getNoOutArray(array, out){
  if (out*2 >array.length){
    return [];
  }
  let newAr = array.slice();
  newAr.sort(function(a, b){return a-b});  
  newAr.splice(0,out);
  let latsI = newAr.length;
  newAr.splice(latsI-out,out);
  return newAr;
}

function getSum(array){
  return array.reduce(function(sum, current){
      return sum + current
    },0);
}

function getMean(array){
  return getSum(array)/array.length; 
}

//-------------------------------------------------
/*
outliers - amount of outlier, 
if ao12 and outliers = 1, then mean of 10 in the middle
*/
function getAverage(array, outliers){
  return getMean(getNoOutArray(array, outliers)).toFixed(3);
}

//standart deviation
function getSigma(numbersArr) {
    if ((numbersArr.length) == 1){
      return 1;
    }
    let arr = getNoOutArray(numbersArr, getOutLiers(numbersArr.length));
    let avg = getMean(arr); //it can be optimized //todo //avg in parameter?
    //--CALCULATE STANDARD DEVIATION--
    var SDprep = 0;
    for(var keyy in arr) 
       SDprep += Math.pow((parseFloat(arr[keyy]) - avg),2);
    var SDresult = Math.sqrt(SDprep/(arr.length-1));
    //--CALCULATE STANDARD DEVIATION--
    return SDresult;
    
}

//returns last N elements of array
function getLastN(array, n){
  return array.slice(Math.max(array.length - n, 0));  
}

function getOutLiers(N){
 let out;
 if (N == 5 || N == 12){
   out = 1
 } else{
   out = int((N*outlierconst));
 }
  return out;
}

//returns ao5, using outliersconst (0.05) or 1 for 5 and 12
function getAo(N, array){
  if (array.length < N){
   return "N/A";
 }
 return getAverage(getLastN(array,N),getOutLiers(N));
}

//get sigma for last N array
function getSigmaN(array, N){
  if (N <= 1){
    return (1);
  }
  return getSigma(getLastN(array,N));
}

//find best average size N is array (look getAo5 func)
function findBestAo(N, array){
  let avgArray = [];
  for (let i = N-1; i<array.length;i++){
    avgArray.push(getAo(N, array.slice(i-N+1,i+1)));
  }
  return Math.min.apply(Math, avgArray);  
}
