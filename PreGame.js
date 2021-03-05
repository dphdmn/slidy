let myGraphics;
let myStats;
let img;
let eatsound;
let tileColors;
    

let tileColorsIndex = 
[[0,0,0,
  3,6,9,
  3,9,4],
 
  [0,0,0,0,
  2,4,4,4,
  2,6,8,8,
  2,6,9,10],
 
  [0,0,0,0,0,
  1,2,2,2,2,
  1,4,6,6,6,
  1,4,8,10,10,
  1,4,8,11,11],
 
 [0,0,0,0,0,0,
  1,2,2,2,2,2,
  1,3,4,4,4,4,
  1,3,5,6,6,6,
  1,3,5,7,8,8,
  1,3,5,7,9,10],
 
 [0,0,0,0,0,0,0,
  1,2,2,2,2,2,2,
  1,3,4,4,4,4,4,
  1,3,5,6,6,6,6,
  1,3,5,7,8,8,8,
  1,3,5,7,9,10,10,
  1,3,5,7,9,11,12]
];
//load sound to play later
function preload(){
  eatsound = loadSound("bop.mp3");
 // img = loadImage("grad.png");
}

//function before game
function setup(){
  //cursor('big_pink.cur');
  cursor('circle4.cur');
  setBasicGuiColors();
  tileColors=[color(255,103,103),
     color(255,163,87),
     color(255,241,83),
     color(193,255,87),
     color(123,255,97),
     color(107,255,149),
     color(121,255,222),
     color(131,230,255),
     color(139,178,255),
     color(154,141,255),
     color(207,141,255),
     color(255,133,251)];
  
  myGraphics = new GameGraphics();
  
  aroundSetup();
  myStats = new GameStats();  
  gamePreSetup();
  gameSetup(false);
}
