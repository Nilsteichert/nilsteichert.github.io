var keySignature = new KeySignature("C#")
var note = new Note("C/3","C/5");
var noteDrawer = new NoteDrawer("noteDraw",note,keySignature.keySignature).drawOneNote();

//var midiListener = new MidiListener();
animator = new Animator("noteDraw","red");


function test()
{console.log("works")
document.getElementById("srs").classList.remove("disabled")
}

