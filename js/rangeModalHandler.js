class RangeModalHandler {
  constructor() {
    this.validNotes = ["C", "D", "E", "F", "G", "A", "B"];
    this.allNotes = {};
    this.inputMin = document.getElementById("inputMin");
    this.inputMax = document.getElementById("inputMax");
    this.formIsValid = false;
  }

  checkValidility() {
    if (
      this.inputMin.classList.contains("is-valid") &&
      this.inputMax.classList.contains("is-valid")
    ) {
      return true;
    } else {
      return false;
    }
  }

  noteInRange(input) {
    if (this.validNotes.includes(input.charAt(0))) {
      let octave = parseInt(input.charAt(1));
      if (octave > 0 && octave < 9) {
        return true;
      }
    }
    return false;
  }
  validateInput() {
    const updateValueMin = (e) => {
      var input = e.target.value;

      if (this.noteInRange(input)) {
        this.inputMin.classList.remove("is-invalid");
        this.inputMin.classList.add("is-valid");
      } else {
        this.inputMin.classList.remove("is-valid");
        this.inputMin.classList.add("is-invalid");
      }
    };
    const updateValueMax = (e) => {
      var input = e.target.value;

      if (this.noteInRange(input)) {
        this.inputMax.classList.remove("is-invalid");
        this.inputMax.classList.add("is-valid");
      } else {
        this.inputMax.classList.remove("is-valid");
        this.inputMax.classList.add("is-invalid");
      }
    };
    this.inputMin.addEventListener("input", updateValueMin);
    this.inputMax.addEventListener("input", updateValueMax);
  }

  increaseNote(note) {
    if (!this.noteInRange(note)) {
      return "C4";
    }
    if (note == "B8") {
      return note;
    }
    var noteValue = note.charAt(0);
    var noteOctave = parseInt(note.charAt(1));
    switch (noteValue) {
      case "C":
        return `D${noteOctave}`;

      case "D":
        return `E${noteOctave}`;

      case "E":
        return `F${noteOctave}`;

      case "F":
        return `G${noteOctave}`;

      case "G":
        return `A${noteOctave}`;

      case "A":
        return `B${noteOctave}`;

      case "B":
        return `C${noteOctave + 1}`;

      default:
        break;
    }
  }

  decreaseNote(note) {
    if (!this.noteInRange(note)) {
      return "C4";
    }
    if (note == "C1") {
      return note;
    }
    var noteValue = note.charAt(0);
    var noteOctave = parseInt(note.charAt(1));
    switch (noteValue) {
      case "C":
        return `B${noteOctave - 1}`;

      case "D":
        return `C${noteOctave}`;

      case "E":
        return `D${noteOctave}`;

      case "F":
        return `E${noteOctave}`;

      case "G":
        return `F${noteOctave}`;

      case "A":
        return `G${noteOctave}`;

      case "B":
        return `A${noteOctave}`;

      default:
        break;
    }
  }
  increaseMin() {
    this.inputMin.value = this.increaseNote(this.inputMin.value);
    this.inputMin.classList.remove("is-invalid");
    this.inputMin.classList.add("is-valid");
  }
  increaseMax() {
    this.inputMax.value = this.increaseNote(this.inputMax.value);
    this.inputMax.classList.remove("is-invalid");
    this.inputMax.classList.add("is-valid");
  }

  decreaseMin() {
    this.inputMin.value = this.decreaseNote(this.inputMin.value);
    this.inputMin.classList.remove("is-invalid");
    this.inputMin.classList.add("is-valid");
  }
  decreaseMax() {
    this.inputMax.value = this.decreaseNote(this.inputMax.value);
    this.inputMax.classList.remove("is-invalid");
    this.inputMax.classList.add("is-valid");
  }

  isMinGreaterMax(
    minNote = this.inputMin.value,
    maxNote = this.inputMax.value
  ) {
    //Returns true if minNote > maxNote

    var noteOctaveMin = parseInt(minNote.charAt(1));
    var noteOctaveMax = parseInt(maxNote.charAt(1));
    if (noteOctaveMin > noteOctaveMax) {
      return true;
    } else if (noteOctaveMin < noteOctaveMax) {
      return false;
    } else if (noteOctaveMin == noteOctaveMax) {
      var noteValueMin = this.convertNoteToNumber(minNote.charAt(0));
      var noteValueMax = this.convertNoteToNumber(maxNote.charAt(0));
      console.log(noteValueMin);
      console.log(noteValueMax);
      if (noteValueMin > noteValueMax) {
        return true;
      } else {
        return false;
      }
    }
  }
  convertNoteToNumber(note) {
    return parseInt(this.validNotes.indexOf(note));
  }
}
