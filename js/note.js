const notes = ["C", "D", "E", "F", "G", "A", "B"];
const accidentals = ["#", "b", ""];

// Takes min and max note, and accidental setting: "b","#","random",""

class Note {
  constructor(minNote = "C/4", maxNote = "C/6", accidentalSetting = "") {
    //make private?
    this.minOctave = minNote.slice(-1);
    this.maxOctave = maxNote.slice(-1);
    this.hasAccidental = false;

    // Is accord ??
    this.minNote = this.convertNoteToNumber(minNote); //c=0,b=6;
    this.maxNote = this.convertNoteToNumber(maxNote);

    //swaps octave if entered in wrong order
    if (this.minOctave > this.maxOctave) {
      [this.minOctave, this.maxOctave] = [this.maxOctave, this.minOctave];
      [this.minNote, this.maxNote] = [this.maxNote, this.minNote];
    }

    this.octave = this.generateOctave(this.minOctave, this.maxOctave);
    this.clef = this.getClef(this.octave);
    this.noteWithoutOctave = this.generateNoteWithoutOctave();

    this.generateAccidental(accidentalSetting);

    this.noteForDrawer = this.noteWithoutOctave + this.octave;
    this.note = this.noteWithoutOctave + this.accidental + "/" + this.octave;
  }

  generateNoteWithoutOctave() {
    //If all possible notes are in the same octave
    if (this.minOctave == this.maxOctave) {
      var noteWithoutOctave = this.generateNoteFromNumber(
        this.minNote,
        this.maxNote + 1
      );
    }

    //If all possible notes are in the same octave as the minimum note
    else if (this.octave == this.minOctave) {
      noteWithoutOctave = this.generateNoteFromNumber(this.minNote, 7);
    }
    //If all possible notes are in the same octave as the maximum note
    else if (this.octave == this.maxOctave) {
      noteWithoutOctave = this.generateNoteFromNumber(0, this.maxNote + 1);
    }
    //If no possible note is in max or min octave
    else {
      noteWithoutOctave = this.generateNoteFromNumber();
    }

    return noteWithoutOctave;
  }

  rdmBool() {
    return Math.round(Math.random()) == 1;
  }

  generateAccidental(setting) {
    switch (setting) {
      case "#":
        if (this.rdmBool()) {
          this.accidental = "#";
          break;
        }

      case "b":
        if (this.rdmBool()) {
          this.accidental = "#";
          break;
        }

      case "random":
        if (this.rdmBool()) {
          if (this.rdmBool()) {
            this.accidental = "b";
            break;
          } else {
            this.accidental = "#";
          }
        }

      default:
        this.accidental = "";
    }
    if (this.accidental != "") {
      this.hasAccidental = true;
    }
  }

  getClef(octave) {
    if (octave < 4) {
      return "bass";
    } else {
      return "treble";
    }
  }

  // Return note number C=0,B=6
  convertNoteToNumber(note) {
    return notes.indexOf(note.slice(0, 1));
  }
  setNoteTo(note) {
    this.octave = parseInt(note.slice(-1));
    this.accidental = this.getAccidentalFromNotestring(note);
    if (this.accidental != "") {
      this.hasAccidental = true;
    }
    this.noteWithoutOctave = note.slice(0, 1);
    this.clef = this.getClef(this.octave);
    this.note = note;
    this.maxNote = this.note;
    this.minNote = this.note;
    this.minOctave = this.octave;
    this.maxOctave = this.octave;

    return this;
  }
  getAccidentalFromNotestring(note) {
    if (note.includes("#") || note.includes("b")) {
      return note.slice(1, 2);
    } else {
      return "";
    }
  }
  //0,7 = ["C", "D", "E", "F", "G", "A", "B"] 1,6 = ["D", "E", "F", "G", "A"]
  generateNoteFromNumber(min = 0, max = 7) {
    return notes.slice(min, max)[
      Math.floor(Math.random() * notes.slice(min, max).length)
    ];
  }
  generateOctave(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
