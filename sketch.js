let f, i, a;
let userInput;
let submit;
let userLine;
let poem = [];

function preload() {
  f = loadFont('autography.otf');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(f);
  textSize(25);
  userInput = createInput();
  userInput.position(100, 100);
  submit = createButton('add line');
  submit.position(userInput.x+170, userInput.y);
  submit.mousePressed(newLine);
}

function draw() {
  background(207, 200, 178);
  text('write your own poem :)', 100, 60, 300);
  writePoem();
}


function newLine () {
  userLine = userInput.value();
  userInput.value('');
  // first line 
  poem.push(userLine);

 
  let words = RiTa.tokenize(userLine);

    //change adjective into alternate adjective
  for (a = 0; a < words.length-1; a++) {
    if (RiTa.isAdjective(words[a])) {
      let adjective = RiTa.randomWord({pos: "jj"});
      words[a] = adjective;
    }
  }
  // change any verb into past tense

  for (i = 0; i < words.length-1; i++) {
    if (RiTa.isVerb(words[i])) {
      let past = RiTa.pastPart(words[i]);
      words[i] = past;
    }
  }
 // second line last word rhyme 
  let rhymes = RiTa.rhymesSync(words[words.length-1]);
  if (rhymes.length === 0) {
    poem.push(' ');
  } else {
    let lastRhyme = random(rhymes);
    words[words.length-1] = lastRhyme;


    let secondLine = RiTa.untokenize(words);
    poem.push(secondLine);
  }
}

function writePoem () {
  for (i = 0; i < poem.length; i ++) {
    text(poem[i], userInput.x, (userInput.y + 50)+ i*25);
  }
}

