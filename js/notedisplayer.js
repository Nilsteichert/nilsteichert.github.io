VF = Vex.Flow;

const scalefactor = 2;
const braceoffset = 20;




function drawNote(note = getCurrentNote(), note2 = getSecondNote())
{

// Create an SVG renderer and attach it to the DIV element named "boo".
var div = document.getElementById("svgnote")
div.innerHTML = "";
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Configure the rendering context.
renderer.resize(div.clientWidth,div.clientHeight);
var context = renderer.getContext();
context.scale(scalefactor,scalefactor);

// Create staves
var staveTreble = new VF.Stave(braceoffset, 20, (div.clientWidth/scalefactor)-braceoffset);
var staveBass = new VF.Stave(braceoffset, 110, (div.clientWidth/scalefactor)-braceoffset);

// Add a clef
staveTreble.addClef("treble");
staveBass.addClef("bass");
staveTreble.addKeySignature(getCurrentKeySignature())
staveBass.addKeySignature(getCurrentKeySignature())

// Add braces
let brace = new Vex.Flow.StaveConnector(staveTreble, staveBass).setType(3); 
let lineRight = new Vex.Flow.StaveConnector(staveTreble, staveBass).setType(0);
let lineLeft = new Vex.Flow.StaveConnector(staveTreble, staveBass).setType(1);


// Connect background to the rendering context and draw!
staveTreble.setContext(context).draw();
staveBass.setContext(context).draw();
brace.setContext(context).draw();
lineLeft.setContext(context).draw();
lineRight.setContext(context).draw();




//Check if both notes are in the same clef if true -> draw both in one voice
if (getClef(note)  == getClef(note2)) {
  var notes = [
    new VF.StaveNote({clef: getClef(note), keys: [note], duration: "h" }),
    new VF.StaveNote({clef: getClef(note2), keys: [note2], duration: "h" }),
];

  var pausenote = [
    new VF.StaveNote({clef: getClefInverted(note), keys: [getMiddleNoteOfClef(getClefInverted(note))], duration: "wr" }),
  ];

try {
  notes[0].addAccidental(0, new VF.Accidental(getAccidental(note)));
  notes[1].addAccidental(0, new VF.Accidental(getAccidental(note2)));
}
catch(error){}

// Add notes to voice
var voice = new VF.Voice({num_beats: 4,  beat_value: 4,});
voice.addTickables(notes);

// Add pause to rest voice
var pause = new VF.Voice({num_beats: 4,  beat_value: 4,});
pause.addTickables(pausenote);

// Format and draw notes when they are in one clef
var formatter = new VF.Formatter().joinVoices([voice]).format([voice,pause], (div.clientWidth/scalefactor)-braceoffset);

//Draw Notes
if (getClef(note) == "treble") {voice.draw(context,staveTreble);}
else{voice.draw(context,staveBass);}

if (getClefInverted(note) == "treble") {pause.draw(context,staveTreble);}
else{pause.draw(context,staveBass);}

}


//Create multiple voices if notes are in different clefs
else {

var notes = [
        new VF.StaveNote({clef: getClef(note), keys: [note], duration: "h" }),
        new VF.StaveNote({clef: getClefInverted(note2), keys: [getMiddleNoteOfClef(getClefInverted(note2))], duration: "hr" }),
    ];

var notes2 = [
      new VF.StaveNote({clef: getClefInverted(note), keys: [getMiddleNoteOfClef(getClefInverted(note))], duration: "hr" }),
      new VF.StaveNote({clef: getClef(note2), keys: [note2], duration: "h" }),
    ];

try {
  notes[0].addAccidental(0, new VF.Accidental(getAccidental(note)));
  notes2[1].addAccidental(0, new VF.Accidental(getAccidental(note2)));
}
catch(error){}

// Create a first voice in 4/4 and add the notes from notes
var voice = new VF.Voice({num_beats: 4,  beat_value: 4,});
voice.addTickables(notes);

// Create a second voice in 4/4 and add the notes from notes2
var voice2 = new VF.Voice({num_beats: 4,  beat_value: 4,});
voice2.addTickables(notes2);


//Format and draw notes
var formatter = new VF.Formatter().joinVoices([voice]).format([voice,voice2], (div.clientWidth/scalefactor)-braceoffset);

//Draw first voice
if (getClef(note) == "treble") {voice.draw(context,staveTreble);}
else{voice.draw(context,staveBass);}

//Draw second voice
if (getClef(note2) == "treble") {voice2.draw(context,staveTreble);}
else{voice2.draw(context,staveBass);}
}


}

function removeAccidental(note)
{
  if (note.includes("#") || note.includes("b")){
  return note.slice(0,-3)+note.slice(-2);
  }
  else {return note}
}

function getAccidental(note)
{
  if (note.includes("#") || note.includes("b")){
  return note.slice(1,2);
  }
  else {return null}
}

function getClef(note)
{
  var generatedClef ="treble";
  octave = parseInt(note.slice(-1));
  if (octave <4 ) {generatedClef="bass"}
  return generatedClef;
}

function getClefInverted(note)
{
  var generatedClef ="bass";
  octave = parseInt(note.slice(-1));
  if (octave <4 ) {generatedClef="treble"}
  return generatedClef;
}

function getMiddleNoteOfClef(clef)
{
  if (clef == "bass")
  {
    return "E/3"
  }
  else (clef == "treble")
   {
     return "C/5"
   }
}