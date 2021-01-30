class KeySignature{
        constructor(keySignature){
        this.keysignatures = [ 
                "C",
                "F",
                "Bb",
                "Eb",
                "Ab",
                "Db",
                "Gb",
                "Cb",
                "G",
                "D",
                "A",
                "E",
                "B",
                "F#",
                "C#",
                "Am",
                "Dm",
                "Gm",
                "Cm",
                "Fm",
                "Bbm",
                "Ebm",
                "Abm",
                "Em",
                "Bm",
                "F#m",
                "C#m",
                "G#m",
                "D#m",
                "A#m"
        ]
        this.majorkeysignatures = [
                "C",
                "F",
                "Bb",
                "Eb",
                "Ab",
                "Db",
                "Gb",
                "Cb",
                "G",
                "D",
                "A",
                "E",
                "B",
                "F#",
                "C#",
        ]
        this.minorkeysignatures = [
                "Am",
                "Dm",
                "Gm",
                "Cm",
                "Fm",
                "Bbm",
                "Ebm",
                "Abm",
                "Em",
                "Bm",
                "F#m",
                "C#m",
                "G#m",
                "D#m",
                "A#m"
        ]

  

        this.keySignature = this.generateKeySignature(keySignature);

        this.equivalentMajorKeySignature = this.getEquivalentMajorKeySignature(this.keySignature);


        }

        generateKeySignature(keySignature = null){
                switch (keySignature) {
                        case "minor":
                                return this.minorkeysignatures[Math.floor(Math.random() * this.minorkeysignatures.length)];
                        case "major":
                                return this.majorkeysignatures[Math.floor(Math.random() * this.majorkeysignatures.length)];
                        case "random":
                                return this.keysignatures[Math.floor(Math.random() * this.keysignatures.length)];
                        case null:
                                return "C";
                        default:
                                return keySignature;
                    
                
                }
            }

        noteInKeySignature(note,keySignature=this.keySignature)
        {
        //Ensures signature is a major key signature, if passed a minor one
        keySignature = this.getEquivalentMajorKeySignature(keySignature);

        //Returns note if it already has an accidental            
        if (note.hasAccidental) {return note;}
    
        //Get dictornary with all accidentals per key signature
        var changedNotes = this.getChangedNotes(keySignature);
        var changedNoteOctave = note.octave;
        var changedNoteWithoutOctave = note.noteWithoutOctave;
        
    
        
        //Check if octave of the note is changed with applied key signature
        if(note.noteWithoutOctave in changedNotes){ 
                if (keySignature == "Gb" || keySignature == "Cb"){
                        if (note.noteWithoutOctave== "C"){changedNoteOctave-=1;}
                }
                if (keySignature == "C#"){
                        if (note.noteWithoutOctave== "B"){changedNoteOctave+=1;}
                }
        
                changedNoteWithoutOctave = note.noteWithoutOctave.replace(note.noteWithoutOctave,changedNotes[note.noteWithoutOctave]);        
                //Replace note with changed note
                var changedNote = new Note().setNoteTo(changedNoteWithoutOctave+"/"+changedNoteOctave);

                return changedNote;
        }
        else {return note;}
        }

        getEquivalentMajorKeySignature(keySignature=null)
        {
                if (keySignature.includes("m"))
                        {
                        keySignature = keySignature.replace("Am","C")
                        keySignature = keySignature.replace("Dm","F")
                        keySignature = keySignature.replace("Gm","Bb")
                        keySignature = keySignature.replace("Cm","Eb")
                        keySignature = keySignature.replace("Fm","Ab")
                        keySignature = keySignature.replace("Bbm","Db")
                        keySignature = keySignature.replace("Ebm","Gb")
                        keySignature = keySignature.replace("Abm","Cb")
                        keySignature = keySignature.replace("Em","G")
                        keySignature = keySignature.replace("Bm","D")
                        keySignature = keySignature.replace("F#m","A")
                        keySignature = keySignature.replace("C#m","E")
                        keySignature = keySignature.replace("G#m","B")
                        keySignature = keySignature.replace("D#m","F#")
                        keySignature = keySignature.replace( "A#m","C#") 
                        }
                return keySignature;
                }
        

        getChangedNotes(keySignature){

                switch (keySignature) {
                
                        case "C":
                                return {};
                        case "F":
                                return {B: "Bb"};
                        case "Bb":
                                return {B: "Bb",E: "Eb"};
                        case "Eb":
                                return {B: "Bb",E: "Eb",A: "Ab"};
                        case "Ab":
                                return {B: "Bb",E: "Eb",A: "Ab",D: "Db"};
                        case "Db":
                                return {B: "Bb",E: "Eb",A: "Ab",D: "Db",G: "Gb"};
                        case "Gb":
                                return {B: "Bb",E: "Eb",A: "Ab",D: "Db",G: "Gb",C: "B"};
                        case "Cb":
                                return {B: "Bb",E: "Eb",A: "Ab",D: "Db",G: "Gb",C: "B",F: "E"};
                        case "G":
                                return {F: "F#"};
                        case "D":
                                return {F: "F#",C: "C#"};
                        case "A":
                                return {F: "F#",C: "C#",G: "G#"};
                        case "E":
                                return {F: "F#",C: "C#",G: "G#",D: "D#"};
                        case "B":
                                return {F: "F#",C: "C#",G: "G#",D: "D#",A: "A#"};
                        case "F#":
                                return {F: "F#",C: "C#",G: "G#",D: "D#",A: "A#",E: "F"};
                        case "C#":
                                return {F: "F#",C: "C#",G: "G#",D: "D#",A: "A#",E: "F",B: "C"};
                        default:
                                 return {};
                     
                            
                    }
                }

}



