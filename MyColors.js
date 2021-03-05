let myGuiColors;

function cc(name, alpha){
 return myGuiColors.getColor(name, alpha);
}

function getRangeColor(min, max, current, inverted, alpha){
  let R;
  let G;
  let B = 0;
  if (current < min){
    R = 255;
    G = 0;
  }
  else if (current > max){
    G = 255;
    R = 0;
  }
  else{
    let dist = max-min;
    let ratio = (current-min)/dist;
    //print(ratio);
    if (ratio < 0.5){
      R = 255;
      G = (ratio*2)*255;
    }else{
      ratio = 1 - ratio;
      G = 255;
      R = (ratio*2)*255;
    }
  }
  if (inverted){
    let tmp = R;
    R = G;
    G = tmp;
  }
  return color(R, G, B, alpha);
}


function setBasicGuiColors(){
  myGuiColors = new GuiColors();
  myGuiColors.setGui("GameOverBg","BLACK");
  myGuiColors.setGui("basicStroke","BLACK");
  myGuiColors.setGui("mouseCursor", "PINK");
  myGuiColors.setGui("SettingsPageBg","BLACK_LIGHT");
  myGuiColors.setGui("headers","PINK");
  myGuiColors.setGui("statsText","AQUA");
  myGuiColors.setGui("helpers","PINK");
  myGuiColors.setGui("lightStats","GREEN");
  myGuiColors.setGui("origStats","BLUE");
  myGuiColors.setGui("tileColor","GRAY");
  myGuiColors.setGui("logo","AQUA_BLUE");
  myGuiColors.setGui("horGraph","AQUA");
  myGuiColors.setGui("lineGraph","PINK");
  myGuiColors.setGui("ao5Graph","YELLOW");
  myGuiColors.setGui("sphereGraph","AQUA_BLUE");
  myGuiColors.setGui("sphereTextGraph","AQUA_BLUE");
  myGuiColors.setGui("pbText","BLUE");
  myGuiColors.setGui("badDot","RED");
  myGuiColors.setGui("goodDot","GREEN");
  myGuiColors.setGui("dotDot","AQUA");
}
  
class MyColors {
    constructor() {
        this.colorsM = new Map();
        this.addBasicColors();
    }

    addColor(name, r, g, b) {
        this.colorsM.set(name, color(r, g, b, 255));
        return this;
    }

    getMyc(name) {
        return this.colorsM.get(name);
    }

    addBasicColors() {
        this.addColor("BLACK", 0, 0, 0)
                .addColor("BLACK_LIGHT", 7, 7, 7)
                .addColor("BLACK_GREEN", 7, 15, 7)
                .addColor("BLACK_BLUE", 7, 7, 15)
                .addColor("GRAY", 100, 100, 100)
                .addColor("PINK", 250, 150, 200)
                .addColor("AQUA", 0, 255, 200)
                .addColor("AQUA_LIGHT", 150, 255, 200)
                .addColor("AQUA_BLUE", 0, 255, 230)
                .addColor("RED", 255, 0, 0)
                .addColor("BLUE", 0, 0, 200)
                .addColor("BLUE_LIGHT", 150, 200, 255)
                .addColor("GREEN", 0, 200, 0)
                .addColor("YELLOW", 255, 255, 0)
                .addColor("AVG_GREEN", 0, 130, 0)
                .addColor("WHITE", 255, 255, 255)
                .addColor("WHITE_GREEN", 240, 255, 240)
                .addColor("WHITE_BLUE", 240, 240, 255)
                .addColor("AVG_BLUE", 0, 0, 130);
    }
}

class GuiColors {

    constructor() {
        this.guiM = new Map()
        this.mycolors = new MyColors();
    }

    setGui(name, mycolor) {
        this.guiM.set(name, this.mycolors.getMyc(mycolor));
        return this;
    }

    getColor(gui_name, alpha) {
        let myc = this.guiM.get(gui_name);
        if (alpha == undefined) {
            alpha = 255;
        }
        myc.setAlpha(int(alpha
        ));
   
   return myc;
    }
}

