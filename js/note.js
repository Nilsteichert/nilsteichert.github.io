var notes = ["C","D","E","F","G","A","B"]
var accidentals =["#","b",""]

// Takes min and max note, and accidental setting: "b","#","random",""

const note = function(minNote="D/5",maxNote="B/5",accidentalSetting = ""){
    
    this.minOctave = minNote.slice(-1);
    this.maxOctave = maxNote.slice(-1);

    this.minNote = this.convertNoteToNumber(minNote); //c=0,b=6;
    this.maxNote = this.convertNoteToNumber(maxNote);
    if (this.maxNote == 0) {this.maxNote--} 
    //swaps octave if entered in wrong order
    if(this.minOctave > this.maxOctave){
        [this.minOctave,this.maxOctave] = [this.maxOctave,this.minOctave];
        [this.minNote,this.maxNote] = [this.maxNote,this.minNote]
    }


    this.octave = this.generateOctave(this.minOctave,this.maxOctave)
    
    if (this.minOctave == this.maxOctave)  {this.noteWithoutOctave = this.generateRandomNote(this.minNote,this.maxNote)}
    else if (this.octave ==this.minOctave) {
        this.noteWithoutOctave = this.generateRandomNote(this.minNote,7)
        if (this.minNote == 0) {this.minNote--}
    }
    else if (this.octave ==this.maxOctave) {
        if (this.maxNote == 6) {this.maxNote++;}
        this.noteWithoutOctave = this.generateRandomNote(0,this.maxNote)}
    else {this.noteWithoutOctave = this.generateRandomNote()}

    this.accidental = this.generateAccidental(accidentalSetting);

    this.note = this.noteWithoutOctave + this.accidental + "/" + this.octave;
    
    console.log(this.note)

}

note.prototype.rdmTrueFalse = function() {return (Math.round(Math.random()) == 1)}

note.prototype.generateAccidental = function(setting){
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


// Return note number C=0,B=6
note.prototype.convertNoteToNumber = function(note)
{
    return notes.indexOf(note.slice(0,1));
}

note.prototype.setNoteTo = function(note){
    this.octave = parseInt(note.slice(-1));
    this.accidental = this.getAccidentalFromNotestring(note);
    this.noteWithoutOctave = note.slice(0,1);
    this.note = note; 

    
}

note.prototype.getAccidentalFromNotestring = function(note)
{
    if (note.includes("#") || note.includes("b")){
        return note.slice(1,2);
        }
        else {return ""}
}

note.prototype.generateRandomNote = function(min=0,max=6){

    max++;
    console.log(notes.slice(min,max));
    return notes.slice(min,max)[Math.floor(Math.random() * notes.slice(min,max).length)];
}

note.prototype.generateOctave = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min+1)) + min;
  }
