var notes = ["C/","D/","E/","F/","G/","A/","B/"]
var accidentals =["#","b"]


function generateRandomNote(lowestOctave = 2, highestOctave = 6, ) {
    var note = notes[Math.floor(Math.random() * notes.length)];
    note+=getRandomInt(lowestOctave,highestOctave)
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

