class NoteChecker{

    constructor(keysignature)
    {

    }

    checkNote(inputNote,displayedNote){
    var displayedNote;
    
    //Change octave at b# and cb
    if (displayedNote.includes("B#") == true){
      
      displayedNote = displayedNote.replace("B#","C");
      octave = parseInt(displayedNote.slice(-1));
      displayedNote = displayedNote.replace(octave,octave+1);
      if (inputNote == displayedNote) {return true;}
      else {return false;}    
    }
    if (displayedNote.includes("Cb") == true){
      displayedNote = displayedNote.replace("Cb","B");
      octave = parseInt(displayedNote.slice(-1));
      displayedNote = displayedNote.replace(octave,octave-1);
      if (inputNote == displayedNote) {return true;}
      else {return false;}    
    }
  
    //Check if the note is affected by the current key signature
    displayedNote = checkKeychangeKeySignature(keysignature,displayedNote)
  
    //Replaces currentNote to match midi input (midi input is always C# not Db)
    
    displayedNote = displayedNote.replace("Db","C#");
    displayedNote = displayedNote.replace("Eb","D#");
    displayedNote = displayedNote.replace("E#","F");
    displayedNote = displayedNote.replace("Fb","E");
    displayedNote = displayedNote.replace("Gb","F#");
    displayedNote = displayedNote.replace("Ab","G#");
    displayedNote = displayedNote.replace("Bb","A#");
  
    //Check if MidiInput matches shown Note
    if (inputNote == displayedNote) {return true;}
    else {return false;}
  }
}

//set keysig