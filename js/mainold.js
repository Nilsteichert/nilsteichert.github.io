var currentNote;

WebMidi.enable(function (err) {

    if (err) {
      console.log("WebMidi could not be enabled.", err);
    } else {
      console.log("WebMidi enabled!");
    }
    
    var select = document.getElementById( 'inputDeviceSelector' );
    for( i in WebMidi.inputs ) {
    
      var div = document.createElement("a");
      div.appendChild(document.createTextNode(WebMidi.inputs[i].name));
      div.style.cursor = "pointer";
      div.onclick=(function(val) { return function(){ selectInputDevice(val); }})(i);
      select.appendChild(div);  
    };

    try {selectInputDevice(0);} 
    catch (error) {}
    
    currentNote = generateAndDrawNote();


  });



function selectInputDevice(i){
  document.getElementById("selectedDevice").innerHTML="Aktuelles Gerät: " + WebMidi.inputs[i].name;
  console.log("test")
  startListening(i);
}

function startListening(i) {
    removeListeners();
    var input = WebMidi.inputs[i];
    console.log(input.id);
    console.log(WebMidi.inputs)

    input.addListener('noteon', "all",
    function (e) {
      receivedNote = e.note.name + "/" + e.note.octave;
      console.log("Received 'noteon' message (" + receivedNote + ").");
      console.log("Current Note" + currentNote)

      if (checkNote(receivedNote)) {
        console.log("RICHTIG");
        currentNote = generateAndDrawNote(); 
        answeredRight();  
        increaseCombo();
        increaseRight();
      }

      else {
      console.log("FALSCH")
      answeredWrong();
      resetCombo();
      increaseWrong();
    }
      
    }

  );
  console.log("HHHMM")
}

function removeListeners() {
    for( i in WebMidi.inputs ) {WebMidi.inputs[i].removeListener()}
}

function checkNote(note){

  //Replaces currentNote to match midi input
  
  currentNote = currentNote.replace("Db","C#");
  currentNote = currentNote.replace("Eb","D#");
  currentNote = currentNote.replace("E#","F");
  currentNote = currentNote.replace("Fb","E");
  currentNote = currentNote.replace("Gb","F#");
  currentNote = currentNote.replace("Ab","G#");
  currentNote = currentNote.replace("Bb","A#");

  //Change octave at b# and cb
  if (currentNote.includes("B#") == true){
    currentNote = currentNote.replace("B#","C");
    octave = parseInt(currentNote.slice(-1));
    currentNote = currentNote.replace(octave,octave+1);
  }
  if (currentNote.includes("Cb") == true){
    currentNote = currentNote.replace("Cb","B");
    octave = parseInt(currentNote.slice(-1));
    currentNote = currentNote.replace(octave,octave-1);
  }

  if (note == currentNote) {return true;}
  else {return false;}

}



