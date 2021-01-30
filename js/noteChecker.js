class NoteChecker{

    constructor(keysignature = new KeySignature())
    {
        this.keysignature=keysignature;

    }

    checkNote(displayedNote,inputNote){
        //Check if MidiInput matches shown note

        if (inputNote == this.getMidiNote(displayedNote).note) {
            console.log("nach get midi")
            console.log(this.getMidiNote(displayedNote).note)
            return true;}
        else {return false;}
    }

    getMidiNote(note){

        if (note.note.includes("B#"))
        {return new Note().setNoteTo("C/"+(note.octave+1));}
        if (note.note.includes("Cb"))
        {return new Note().setNoteTo("B/"+(note.octave-1));}
        
        //console.log(note)
        //Check if the note is affected by the current key signature
        note = this.keysignature.noteInKeySignature(note,this.keysignature.keySignature);
        //console.log(note)
        //Replaces note to match midi input (midi input is always C# not Db)
        note.note = note.note.replace("Db","C#");
        note.note = note.note.replace("Eb","D#");
        note.note = note.note.replace("E#","F");
        note.note = note.note.replace("Fb","E");
        note.note = note.note.replace("Gb","F#");
        note.note = note.note.replace("Ab","G#");
        note.note = note.note.replace("Bb","A#");

        var midiNote = new Note().setNoteTo(note.note);
        console.log(midiNote);
        return midiNote;
    }
}

//set keysig