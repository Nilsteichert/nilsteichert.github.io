var notes = ["C","D","E","F","G","A","B"]
var accidentals =["#","b"]


function generateRandomNote() {


    //Generates random note without octave or accidental
    var note = notes[Math.floor(Math.random() * notes.length)];

    //Adds accidental to note if switch is set to true
    if (getAccidentalSwitch()) {note+= generateAccidental()}

    //Adds octave with octave prefix
    lowestOctave = getLowestOctave(); 
    highestOctave = getHighestOctave();
    note+="/" + getRandomInt(lowestOctave,highestOctave)
    return note;
}

function generateAccidental()
{
    var accidental = accidentals[Math.round(Math.random())]   
    return accidental;  
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }


  function addAccidentalToNote(note)
  {
    if (note.includes("#") || note.includes("b")) {return note};
    var noteWithAccidental = [note.slice(0, 1), generateAccidental(), note.slice(1)].join('');
    return noteWithAccidental;
  }