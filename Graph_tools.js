class Graph_tools{
  
  constructor(myArray, sessionAvg, amount, sesSigma){
    this.ao5s = [];
    for (let i = 4; i < myArray.length; i++){
      this.ao5s[i] = getAo(5,[myArray[i-4], myArray[i-3],myArray[i-2],myArray[i-1],myArray[i]]);
    }    
    this.sigma = sesSigma;
    this.avg = sessionAvg;
    this.arrayForDraw = myArray;  
    this.graphName = "Session solves graph";
    this.am = amount;
    this.drawAos = true;
    this.dotColors = [];
    this.dotArray = [];
    this.xArray = [];
  }
  
  drawGraphDot(){
  if (myGraphics.dotWasDrawn){
    this.drawGraphs();
    myGraphics.dotWasDrawn = false;
  }
  let obj = this;
  this.dotArray.forEach(function(y,id){
    let x = obj.xArray[id];
    let dotSize = myGraphics.dotSize;
    if(valueInCircle(mouseX, mouseY, x, y, dotSize)){
      obj.drawGraphs();
      fill(cc("GameOverBg", 200));
      textAlign(LEFT, CENTER);
      rect(x+dotSize*0.5,y-dotSize*1.5,dotSize*5,dotSize, 50);
      fill(obj.dotColors[id]);
      ellipse(x, y, dotSize, dotSize);
      textSize(dotSize);
      text("[" + (id+1) + "] " +  obj.arrayForDraw[id],x+dotSize,y-dotSize);
      myGraphics.dotWasDrawn = true;
      textAlign(CENTER, CENTER);
    }
  });
  }
  
  drawGraphs(){
    fill(cc("GameOverBg"));
    let W = myGraphics.W;
    rect(0, 0, W, W/3+W/8+W/150);

    textAlign(CENTER, CENTER);
    noStroke();

    textSize(17);
    fill(cc("helpers",200));

    //text("[G] for other graph", W/2+W/3+W/15, W/20);
    text("[F] to histogram/graph", W/2-W/3, W/20+W/80);
    text("[wheel] for zoom", W/2-W/3, W/20-W/80);
    textSize(25);
    fill(cc("statsText"));

    text(this.graphName, W/2, W/20);
    this.drawCoolGraph(W/40, W/13+W/40,
                  W-W/15, W/3,
                  this.arrayForDraw, 
                  this.avg, this.sigma, this.am,
                  this.drawAos, this.ao5s,
                  myGraphics.dotSize);
  }
    
  drawHistogram(xpos, ypos,
                         wid, hei,
                         array,
                         avgAr, sigmaAr, amountAr){
    avgAr = float(avgAr);
    sigmaAr = float(sigmaAr);

    //clean the space 
    fill(cc("GameOverBg"));
   // fill(150,150,100); //deubg
    rect(xpos-10,ypos-10,wid+20,hei+20);

    let gap = wid/18; //gap between text (numbers on the left) and graph
   // fill(255,0,0); rect(xpos,ypos,gap,hei); //debug
    let ts = gap/3.4;  //size of the text
    let max_of_array =   Math.min(Math.max.apply(Math,array),
                                  avgAr+wheelConst*sigmaAr);
    if (wheelConst > 3.8){
      max_of_array = Math.max.apply(Math,array);
    }
    let min_of_array = Math.min.apply(Math,array);
    //range of results to draw
    let dist = max_of_array-min_of_array;

    //coords of the end of the field
    let rightX = xpos + wid;
    let downY = ypos + hei;

    let gX = xpos + gap; //graph 0xpos
    let gW = rightX - gX; // width of the graph


    let freqAr = [];
    let stepAm = int(map(wheelConst,0.4,4,8,12));
    let freqStep = (gW)/stepAm;
    gX -= freqStep/2;
    //gX += freqStep/2;
    for(let i = 0;i<=stepAm;i++){
      freqAr.push(0);
    }

    let valStep = dist/(stepAm);
    array.forEach(function(value){
      freqAr[int((value-min_of_array)/valStep)] += 1;
    });
    //print (freqAr);
    let yArray = [];
    let xArray = [];
    for(let i = 0; i <= stepAm; i++){
     // print(freqStep*i, gX);
      yArray.push(freqAr[i]); 
      xArray.push(freqStep*i+gX + freqStep/2);
    }
    let maxY = Math.max.apply(Math, yArray);
    let minY = Math.min.apply(Math, yArray);

    textSize(ts*1.5);
    let numbers = [];
    fill(cc("dotDot",170));
    let more = amountAr-getSum(yArray);
    if (more > 0){
      text("" + more + " more ->",rightX-gap,ypos);
    }

    yArray.forEach(function(val, id, ar){
      let pos = map(val, minY, maxY, downY, ypos);
      if (numbers.indexOf(val) == -1){
        fill(getRangeColor(minY, maxY, val, false, 200));  
        text(val,xpos+gap/2,pos);
        numbers.push(val);
      }
      stroke(getRangeColor(minY, maxY, val, false, 70));
      strokeWeight(1);
      line(gX+freqStep/2, pos, gX+freqStep*(stepAm+1), pos);
      noStroke();
      ar[id] = pos;
    });

    this.drawLines(yArray, xArray, 2, cc("lineGraph",180), 4);

    fill(cc("ao5Graph"));
    let aoX = map(avgAr,min_of_array,max_of_array,xArray[0],xArray[xArray.length-1])-freqStep/2;
    let aoXPlus = map(avgAr+sigmaAr,min_of_array,max_of_array,xArray[0],xArray[xArray.length-1])-freqStep/2;
    if (aoXPlus > xArray[xArray.length-1]){
      aoXPlus = xArray[xArray.length-1];
    }
    let aoXMin = map(avgAr-sigmaAr,min_of_array,max_of_array,xArray[0],xArray[xArray.length-1])-freqStep/2;
    if (aoXMin < xArray[0]){
      aoXMin = xArray[0];
    }
    text("[" + avgAr.toFixed(2) + "]", aoX, ypos);
    textSize(ts);
    fill(cc("badDot",200));
    if (aoXPlus != xArray[xArray.length-1]){
      text("+σ [" + (avgAr+sigmaAr).toFixed(2) + "]", aoXPlus, ypos-ts);
    }
    fill(cc("goodDot",200));
    if (aoXMin != xArray[0]){
      text("-σ [" + (avgAr-sigmaAr).toFixed(2) + "]", aoXMin, ypos-ts);
    }
    stroke(cc("ao5Graph", 150));
    strokeWeight(2);
    line(aoX,ypos,aoX,downY);
    stroke(cc("goodDot", 100));
    line(aoXMin,ypos,aoXMin,downY);
    stroke(cc("badDot", 100));
    line(aoXPlus,ypos,aoXPlus,downY);
    noStroke();
    fill(cc("statsText",200));
    textSize(ts);
    xArray.forEach(function(val, id){
      if (id > 0){
        text("[" + (valStep*id+min_of_array).toFixed(2) + "]", val-freqStep/2, downY+ts);
        stroke(cc("statsText", 70));
        strokeWeight(1);
        line(val-freqStep/2, downY, val-freqStep/2, ypos);
      }
    });
    text("Σ = " + amountAr,xpos+gap/2,downY+ts*1.2);

    noStroke();
    fill(cc("lineGraph",40));
    beginShape();
    vertex(xArray[0],downY);
    yArray.forEach(function(val, id){
      vertex(xArray[id],val);
    });
    vertex(xArray[xArray.length-1],downY);
    endShape();
  }


  drawCoolGraph(xpos, ypos,
                         wid,hei,
                         array, 
                         avgAr, sigmaAr, amountAr,
                         drawAvg, ao5Ar,
                         dotSize){

    if (myGraphics.histo){
      this.dotArray.length = 0;
         this.drawHistogram(xpos, ypos,
                       wid, hei,
                       array, 
                       avgAr, sigmaAr, amountAr);
      return;
    }

    avgAr = float(avgAr);
    sigmaAr = float(sigmaAr);
    //clean the space 
    fill(cc("GameOverBg"));
   // fill(150,150,100); //deubg
    rect(xpos-10,ypos-10,wid+20,hei+20);

    //making boundaries
    let sigmaMax = (float(float(avgAr)+wheelConst*float(sigmaAr))).toFixed(2);
    let sigmaMin = (float(float(avgAr)-wheelConst*float(sigmaAr))).toFixed(2);
    let max_of_array = sigmaMax;
    let min_of_array = Math.max(float(sigmaMin), 0);

    //range of results to draw
    let dist = max_of_array-min_of_array;

    let gap = wid/9; //gap between text (numbers on the left) and graph
   // fill(255,0,0); rect(xpos,ypos,gap,hei); //debug
    let ts = gap/3.4;  //size of the text

    //coords of the end of the field
    let rightX = xpos + wid;
    let downY = ypos + hei;

    let gX = xpos + gap; //graph 0xpos
    let gW = rightX - gX; // width of the graph

    let step = (gW-ts*2.3)/(amountAr) 
    /*Drawing texts on the left side */

    textAlign(LEFT,CENTER);
    textSize(ts*11/13);
    let xText = xpos + ts/3;
    fill(cc("statsText"));
    text(max_of_array, xText, ypos);
    text(min_of_array, xText, downY);
    let balancedAvg = map(avgAr, min_of_array, max_of_array, downY, ypos);
    text(avgAr.toFixed(2), xText, balancedAvg);
    let avgPlus = float(avgAr) + float(sigmaAr);
    let avgMin = float(avgAr) - float(sigmaAr);
    let bP = map(avgPlus , min_of_array, max_of_array, downY, ypos);
    let bM =map(avgMin , min_of_array, max_of_array, downY, ypos);
    fill(cc("ao5Graph"));
    text(avgAr.toFixed(2), xText, balancedAvg);
    textSize(ts*9/15);

    if (bP > ypos+ts*11/13){
      fill(cc("badDot"));
      text("+σ [" + avgPlus.toFixed(2) + "]", xText, bP);
    }
    if (bM < downY-ts*11/13){
      fill(cc("goodDot"));
      text("-σ [" + avgMin.toFixed(2) + "]", xText, bM);
    }
    fill(cc("dotDot",200));
    textAlign(CENTER, CENTER);
    /**/

    /*Drawing horizotal lines*/
    let upC = cc("horGraph", 150);
    let dC = cc("horGraph", 150);
    strokeWeight(2);
    if (bP > ypos+ts*11/13){
      stroke(cc("badDot", 100));
      line(gX, bP, rightX-ts*2.3, bP);
    } else{
      upC = cc("badDot", 150);
    }
    if (bM < downY-ts*11/13){
      stroke(cc("goodDot", 100));
      line(gX, bM, rightX-ts*2.3, bM);
    } else{
      dC = cc("goodDot", 150) 
    }
    stroke(upC);
    line(gX, ypos, rightX-ts*2.3, ypos);
    stroke(dC);
    line(gX, downY, rightX-ts*2.3, downY);
    stroke(cc("ao5Graph", 50));
    line(gX, balancedAvg, rightX-ts*2.3, balancedAvg);
    noStroke();
    /**/

    gX += step/2;
    let dotColors = this.dotColors;
    let dotArray = this.dotArray;
    let xArray = this.xArray;
    dotColors.length = 0;
    dotArray.length = 0;
    xArray.length = 0;

    //for vertical lines
    let str;
    let horStep = int(sqrt(amountAr));
    if (amountAr > 225){
      horStep = int(amountAr/15);
    }

    /*Drawing pink lines*/
    array.forEach(function(value, id){  
      if (value > max_of_array){
        value = max_of_array; 
        dotColors.push(cc("badDot", 210));
      } 
      else if (value < min_of_array){
        value = min_of_array;
        dotColors.push(cc("goodDot", 210));
      } 
      else{
        dotColors.push(cc("dotDot", 210));
      }
      dotArray.push(map(value, min_of_array, max_of_array, downY,ypos));
      xArray.push(gX + step*id);
       //drawing vertical lines
      str = 40;
      if (((id) % horStep == 0) && (amountAr-id)>=horStep || (id+1) == amountAr || amountAr <= 12){
        textSize(ts*8/15);
        text("[" + (id+1) + "]", xArray[id], downY+ts/2);
        str = 90;
      }
      strokeWeight(1);
      stroke(cc("horGraph", str));
      line(xArray[id], ypos, xArray[id], downY); 
    });
    /*****/
    stroke(cc("horGraph", 255)); //????????????????????????????? don't know how it works, without it text is shadow (low alpha), but i change stroke in drawLines and nothing changes! what!
    /******/
    this.drawLines(dotArray, xArray, 2, cc("lineGraph",180), 4);
    /**/

    //don't draw extra avgs is array is less then 5
    if (array.length <5){
      drawAvg = false;
    }

    if (drawAvg){
      /*Drawing Avg lines*/
      let aoDotArray = [];
      ao5Ar.forEach(function(value){
        let dot = float(value);
        if (dot > max_of_array){
          dot = max_of_array;
        }   
        else if (dot < min_of_array){
          dot = min_of_array;
        } 
        aoDotArray.push(map(dot, min_of_array, max_of_array, downY,ypos));
      });
      this.drawLines(aoDotArray, xArray.slice(4), 3, cc("ao5Graph",255),1);
      /**/
      /*Drawing avg text*/
      let curAo5 = float(ao5Ar[amountAr-1]);
      textSize(ts/1.5);
      fill(getRangeColor(avgAr-sigmaAr, avgAr+sigmaAr, curAo5, true, 255));
      let yCoord = map(curAo5, min_of_array, max_of_array, downY, ypos);
      if (yCoord < ypos){
        yCoord = ypos;
      }
      if (yCoord > downY){
        yCoord = downY;
      }
      text(curAo5.toFixed(2), 
          rightX-ts*0.8, 
          yCoord);

      /**/
    }
  }

    drawLines(yArray, xArray, strokeW, linesColor, dotsSize){
      strokeWeight(strokeW);
      stroke(linesColor);  
      fill(linesColor);
      yArray.forEach(function(itm, id, ar){    
        ellipse(xArray[id],itm,dotsSize);
        if (id < ar.length-1){
          line(xArray[id], itm, xArray[id+1], ar[id+1]);
        }
      });
      strokeWeight(0.1);
      stroke(cc("basicStroke", 255));
}

}