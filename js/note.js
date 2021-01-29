var notes = ["C","D","E","F","G","A","B"]
var accidentals =["#","b",""]

// Takes min and max note, and accidental setting: "b","#","random",""

const Note = function(minNote="C/4",maxNote="C/6",accidentalSetting = ""){
    
    this.minOctave = minNote.slice(-1);
    this.maxOctave = maxNote.slice(-1);

    // Is accord ??

    this.minNote = this.convertNoteToNumber(minNote); //c=0,b=6;
    this.maxNote = this.convertNoteToNumber(maxNote);
    //if (this.maxNote == 0) {this.maxNote--} 

    //swaps octave if entered in wrong order
    if(this.minOctave > this.maxOctave){
        [this.minOctave,this.maxOctave] = [this.maxOctave,this.minOctave];
        [this.minNote,this.maxNote] = [this.maxNote,this.minNote]
    }


    this.octave = this.generateOctave(this.minOctave,this.maxOctave)
    this.clef = this.getClef(this.octave)
    
    //If all possible notes are in the same octave
    if (this.minOctave == this.maxOctave)
      {this.noteWithoutOctave = this.generateRandomNote(this.minNote,this.maxNote+1)}

    //If all possible notes are in the same octave as the minimum note
    else if (this.octave ==this.minOctave) {
        this.noteWithoutOctave = this.generateRandomNote(this.minNote,7)
    }

    //If all possible notes are in the same octave as the maximum note
    else if (this.octave ==this.maxOctave) {        
        this.noteWithoutOctave = this.generateRandomNote(0,this.maxNote+1)}

    //If no possible note is in max or min octave   
    else {this.noteWithoutOctave = this.generateRandomNote()}

    this.accidental = this.generateAccidental(accidentalSetting);

    this.note = this.noteWithoutOctave + this.accidental + "/" + this.octave;


}

Note.prototype.rdmTrueFalse = function() {return (Math.round(Math.random()) == 1)}

Note.prototype.generateAccidental = function(setting){
    switch (setting) {
        case "#":
            if(this.rdmTrueFalse())
            {return "#"}

        case "b":
            if(this.rdmTrueFalse())
            {return "#"}

        case "random":
            if(this.rdmTrueFalse())
            {
                if(this.rdmTrueFalse()) {return "b"}
                else {return "#"}
            }
       
        default:
            return "";
    }

}

Note.prototype.getClef = function(octave)
{
  if (octave <4 ) {return "bass"}
  else {return "treble";}
}

// Return note number C=0,B=6
Note.prototype.convertNoteToNumber = function(note)
{
    return notes.indexOf(note.slice(0,1));
}

Note.prototype.setNoteTo = function(note){
    this.octave = parseInt(note.slice(-1));
    this.accidental = this.getAccidentalFromNotestring(note);
    this.noteWithoutOctave = note.slice(0,1);
    this.note = note; 

    
}

Note.prototype.getAccidentalFromNotestring = function(note)
{
    if (note.includes("#") || note.includes("b")){
        return note.slice(1,2);
        }
        else {return ""}
}


//0,7 = ["C", "D", "E", "F", "G", "A", "B"] 1,6 = ["D", "E", "F", "G", "A"]
Note.prototype.generateRandomNote = function(min=0,max=7){


    return notes.slice(min,max)[Math.floor(Math.random() * notes.slice(min,max).length)];
}

Note.prototype.generateOctave = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min+1)) + min;
  }
