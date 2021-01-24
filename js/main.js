var currentNote, lowestOctave, highestOctave;
var keysignature = "C";
setOctaves(2,6,true);
setKeySignature("C",true)
var withAccidental = true;


WebMidi.enable(function (err) {

    if (err) {
      console.log("WebMidi could not be enabled.", err);
      window.alert("WebMidi is not supported by your Browser.\nPlease use Google Chrome or any other browser with WebMidi support!")
    } else {
      console.log("WebMidi enabled!");
    }
    
    var select = document.getElementById( 'inputDeviceSelector' );
    for( i in WebMidi.inputs ) {
    
      var div = document.createElement("a");
      div.appendChild(document.createTextNode(WebMidi.inputs[i].name));
      div.style.cursor = "pointer";
      div.id = WebMidi.inputs[i].name;
      div.onclick=(function(val) { return function(){ selectInputDevice(val); }})(i);
      select.appendChild(div);  
    };

    try {selectInputDevice(0);} 
    catch (error) {}
    
    currentNote = generateAndDrawNote(lowestOctave,highestOctave,withAccidental);
  });



function selectInputDevice(i){
  WebMidi.inputs.forEach(element => {
  document.getElementById(element.name).style="color: rgb(0,0,0)"    
  document.getElementById(element.name).style.cursor = "pointer"
  });
  document.getElementById("selectedDevice").innerHTML="Current device: " + WebMidi.inputs[i].name;
  document.getElementById(WebMidi.inputs[i].name).style="color: rgb(150,150,150)"
  document.getElementById(WebMidi.inputs[i].name).style.cursor = "not-allowed"
  console.log(i)
  startListening(i);
}

function startListening(i) {
    removeListeners();
    var input = WebMidi.inputs[i];
    console.log(input.id);

    input.addListener('noteon', "all",
    function (e) {
      receivedNote = e.note.name + "/" + e.note.octave;
      console.log("Received 'noteon' message (" + receivedNote + ").");
      console.log("Current Note" + currentNote)

      if (checkNote(receivedNote)) {
        console.log("right, generating new note");
        currentNote = generateAndDrawNote(lowestOctave,highestOctave,withAccidental); 
        answeredRight();  
        increaseCombo();
        increaseRight();
      }

      else {
      console.log("wrong")
      answeredWrong();
      resetCombo();
      increaseWrong();
    }
      
    }
  );
}

function removeListeners() {
    for( i in WebMidi.inputs ) {WebMidi.inputs[i].removeListener()}
}

function checkNote(note){
  currentNoteBeforeChange = currentNote;

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

  //Check if the note is affected by the current key signature
  currentNote = checkKeychangeKeySignature(keysignature,currentNote)

  //Replaces currentNote to match midi input (midi input is always C# not Db)
  
  currentNote = currentNote.replace("Db","C#");
  currentNote = currentNote.replace("Eb","D#");
  currentNote = currentNote.replace("E#","F");
  currentNote = currentNote.replace("Fb","E");
  currentNote = currentNote.replace("Gb","F#");
  currentNote = currentNote.replace("Ab","G#");
  currentNote = currentNote.replace("Bb","A#");


  if (note == currentNote) {return true;}
  else {
    currentNote = currentNoteBeforeChange;
    return false;}

}

//TEST ALL NOTES AND KEY SIGS

//Test Cb Fb

function setOctaves(low,high,init=false)
{
  document.getElementById("26").style="color: rgb(0,0,0), cursor=pointer"
  document.getElementById("17").style="color: rgb(0,0,0), cursor=pointer"
  document.getElementById("24").style="color: rgb(0,0,0), cursor=pointer"
  document.getElementById("46").style="color: rgb(0,0,0), cursor=pointer"
  lowestOctave = low;
  highestOctave = high;
  document.getElementById(String(low)+String(high)).style.cursor="not-allowed"
  document.getElementById(String(low)+String(high)).style.color="rgb(150,150,150)"
  if (init == false){ 
  currentNote = generateAndDrawNote(lowestOctave,highestOctave,withAccidental);
  }
}

function switchAccidentals(){
  if (withAccidental == true)
  {
    withAccidental = false;
    document.getElementById("accidentalSwitch").innerHTML = "♮";
    currentNote = removeAccidental(currentNote);
  } 
  else
  {
    withAccidental = true;
    document.getElementById("accidentalSwitch").innerHTML = "♭ ♯";
  }
  currentNote = generateAndDrawNote(lowestOctave,highestOctave,withAccidental,currentNote);
}

function setKeySignature(selectedKeySignature = "random",init=false)
{
  setKeySignatureDesignToDefault()
  switch (selectedKeySignature) {
    case "random":
      keysignature = generateRandomKeySignature();
      setCurrentKeySignatureToSelected();
      break;
    case "minor":
      keysignature = generateRandomKeySignature("minor");
      setCurrentKeySignatureToSelected();
      break;
    case "major":
      keysignature = generateRandomKeySignature("major");
      setCurrentKeySignatureToSelected();
      break;
    default:
      keysignature = selectedKeySignature;
      console.log(keysignature);
      setCurrentKeySignatureToSelected()
      break;
  
  }
  console.log("Selected key:" + keysignature)
  if (init == false){
  currentNote = generateAndDrawNote(lowestOctave,highestOctave,withAccidental);
  }
}

function getCurrentKeySignature() {return keysignature}

function setCurrentKeySignatureToSelected(){
  document.getElementById(keysignature).style.color="rgb(150,150,150)";
  document.getElementById(keysignature).style.cursor="not-allowed";
}

function setKeySignatureDesignToDefault() {
  document.getElementById("C").style="color: rgb(0,0,0), cursor=pointer";
  document.getElementById("F").style="color: rgb(0,0,0), cursor=pointer";
  document.getElementById("Bb").style="color: rgb(0,0,0), cursor=pointer";
  document.getElementById("Eb").style="color: rgb(0,0,0), cursor=pointer";
  document.getElementById("Ab").style="color: rgb(0,0,0), cursor=pointer";
  document.getElementById("Db").style="color: rgb(0,0,0), cursor=pointer";
  document.getElementById("Gb").style="color: rgb(0,0,0), cursor=pointer";
  document.getElementById("Cb").style="color: rgb(0,0,0), cursor=pointer";
  document.getElementById("G").style="color: rgb(0,0,0), cursor=pointer";
  document.getElementById("D").style="color: rgb(0,0,0), cursor=pointer";
  document.getElementById("A").style="color: rgb(0,0,0), cursor=pointer";
  document.getElementById("E").style="color: rgb(0,0,0), cursor=pointer";
  document.getElementById("B").style="color: rgb(0,0,0), cursor=pointer";
  document.getElementById("F#").style="color: rgb(0,0,0), cursor=pointer";
  document.getElementById("C#").style="color: rgb(0,0,0), cursor=pointer";
  document.getElementById("Am").style="color: rgb(0,0,0), cursor=pointer";
  document.getElementById("Dm").style="color: rgb(0,0,0), cursor=pointer";
  document.getElementById("Gm").style="color: rgb(0,0,0), cursor=pointer";
  document.getElementById("Cm").style="color: rgb(0,0,0), cursor=pointer";
  document.getElementById("Fm").style="color: rgb(0,0,0), cursor=pointer";
  document.getElementById("Bbm").style="color: rgb(0,0,0), cursor=pointer";
  document.getElementById("Ebm").style="color: rgb(0,0,0), cursor=pointer";
  document.getElementById("Abm").style="color: rgb(0,0,0), cursor=pointer";
  document.getElementById("Em").style="color: rgb(0,0,0), cursor=pointer";
  document.getElementById("Bm").style="color: rgb(0,0,0), cursor=pointer";
  document.getElementById("F#m").style="color: rgb(0,0,0), cursor=pointer";
  document.getElementById("C#m").style="color: rgb(0,0,0), cursor=pointer";
  document.getElementById("G#m").style="color: rgb(0,0,0), cursor=pointer";
  document.getElementById("D#m").style="color: rgb(0,0,0), cursor=pointer";
  document.getElementById("A#m").style="color: rgb(0,0,0), cursor=pointer";
}

function setCurrentNote(setNoteTo)
{
  currentNote = setNoteTo;
}