var keySignature = new KeySignature("D");
var note = new Note("B/3","B/4");
var noteDrawer = new NoteDrawer("noteDraw",note,keySignature.keySignature).drawOneNote();
var NoteChecker = new NoteChecker(keySignature);
//var midiListener = new MidiListener();
animator = new Animator("noteDraw","red");


function test()
{console.log("works")
document.getElementById("srs").classList.remove("disabled")
}

