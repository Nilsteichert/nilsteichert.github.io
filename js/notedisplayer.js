VF = Vex.Flow;

const scalefactor = 2;
const braceoffset = 20;



function generateAndDrawNote(lowestOctave,highestOctave,addAccidental){
  generatedNote = generateRandomNote(lowestOctave,highestOctave);


  if (addAccidental == true) {accidental = generateAccidental()}
  else{accidental = null}
  
  drawNote(generatedNote,accidental)
  
  if(addAccidental == true){
  var noteWithAccidental = [generatedNote.slice(0, 1), accidental, generatedNote.slice(1)].join('');
  }
  else {return generatedNote};
  console.log("generatAndDrawNote" + noteWithAccidental)

  return noteWithAccidental;

}

function drawNote(note="C/4",accidental=null)
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

let brace = new Vex.Flow.StaveConnector(staveTreble, staveBass).setType(3); 
let lineRight = new Vex.Flow.StaveConnector(staveTreble, staveBass).setType(0);
let lineLeft = new Vex.Flow.StaveConnector(staveTreble, staveBass).setType(1);

var generatedClef ="treble";

octave = parseInt(note.slice(-1));
if (octave <4 ) {generatedClef="bass"}

// Generates Notearray
var notes = [
        new VF.StaveNote({clef: generatedClef, keys: [note], duration: "w" })
    ];

try 
{
    notes[0].addAccidental(0, new VF.Accidental(accidental))
}
catch(error){}

// Create a voice in 4/4 and add the notes from above
var voice = new VF.Voice({num_beats: 4,  beat_value: 4,});
voice.addTickables(notes);
  
// Format and justify the notes to 400 pixels.
var formatter = new VF.Formatter().joinVoices([voice]).format([voice], (div.clientWidth/scalefactor)-braceoffset);
 

// Connect it to the rendering context and draw!
staveTreble.setContext(context).draw();
staveBass.setContext(context).draw();
brace.setContext(context).draw();
lineLeft.setContext(context).draw();
lineRight.setContext(context).draw();

// Render voice

if (generatedClef == "treble") {
voice.draw(context,staveTreble);
}
else{
  voice.draw(context,staveBass);
}
}
