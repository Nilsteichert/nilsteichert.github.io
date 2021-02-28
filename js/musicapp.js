class Musicapp {
  constructor(
    keySignature = "C",
    minNote = "C/3",
    maxNote = "C/5",
    drawDiv = "noteDraw"
  ) {
    // Variables
    this.minNote = minNote;
    this.maxNote = maxNote;
    this.drawDiv = drawDiv;
    this.keySignature = new KeySignature(keySignature);
    this.note = new Note(minNote, maxNote);
    this.noteDrawer = new NoteDrawer(
      this.drawDiv,
      this.note,
      this.keySignature.keySignature
    );
    this.noteChecker = new NoteChecker(this.keySignature);
    this.animator = new Animator(this.drawDiv);
    this.tuner;
    this.tunerEnabled = false;
    this.addFlats;
    this.addSharps;

    this.enableMidi(() => {
      this.listenToMidi();
    });
  }

  setRange(minNote, maxNote) {
    this.minNote = minNote;
    this.maxNote = maxNote;
    this.nextNote();
  }
  draw() {
    this.noteDrawer.drawOneNote(this.note);
  }

  nextNote() {
    this.note = new Note(this.minNote, this.maxNote);
    this.draw();
  }

  selectKeySignature(keySignature) {
    this.keySignature = new KeySignature(keySignature);
    this.noteChecker = new NoteChecker(this.keySignature);
    this.noteDrawer = new NoteDrawer(
      this.drawDiv,
      this.note,
      this.keySignature.keySignature
    );
    this.draw();
  }

  rightNote() {
    this.animator.startAnimation("green");
    this.nextNote();
  }

  wrongNote() {
    this.animator.startAnimation("red");
  }

  // MIDI handling

  enableMidi(callback) {
    WebMidi.enable((err) => {
      // Enable WebMidi
      if (err) {
        // An error occured while starting WebMidi
        console.log("WebMidi could not be enabled.", err);
        window.alert("WebMidi is not supported by your Browser.");
      } else {
        // WebMidi enabled successfully
        callback();
      }
    });
  }

  listenToMidi() {
    WebMidi.inputs.forEach((input) => {
      input.addListener("noteon", "all", (e) => {
        const receivedNote = `${e.note.name}/${e.note.octave}`;
        console.log(`Received 'noteon' message (${receivedNote}).`);
        if (this.noteChecker.checkNote(this.note, receivedNote)) {
          this.rightNote();
        } else this.wrongNote();
      });
    });
  }

  disableMidi() {
    WebMidi.inputs.forEach((x) => {
      x.removeListener();
    });
  }

  // Tuner handling

  enableTuner() {
    console.log(this.tunerEnabled);
    this.tuner = new Tuner();
    this.tuner.init();
    this.tunerEnabled = true;
    const self = this;
    this.tuner.onNoteDetected = function (note) {
      console.log(`Heared:${note.name}/${note.octave}`);
      if (
        self.noteChecker.checkNote(self.note, `${note.name}/${note.octave}`)
      ) {
        self.rightNote();
      }
    };
  }

  disableTuner() {
    console.log(this.tunerEnabled);
    this.tuner.audioContext.close();
    this.tunerEnabled = false;
  }

  muteTuner() {
    try {
      this.tuner.audioContext.suspend();
    } catch (error) {
      console.log("no tuner running");
    }
  }

  unmuteTuner() {
    try {
      this.tuner.audioContext.resume();
    } catch (error) {
      console.log("no tuner running");
    }
  }

  toggleMic() {
    const x = document.getElementById("micToggle");
    if (this.tunerEnabled == false) {
      this.enableTuner();

      x.innerHTML = "Disable microphone";
      x.classList.remove("btn-success");
      x.classList.add("btn-warning");
    } else {
      this.disableTuner();
      x.innerHTML = "Enable microphone";
      x.classList.add("btn-success");
      x.classList.remove("btn-warning");
    }
  }

  toggleFlats() {
    if (this.addFlats) {
      this.addFlats = false;
    } else {
      this.addFlats = true;
    }
    this.setAccidentals();
  }

  toggleSharps() {
    if (this.addSharps) {
      this.addSharps = false;
    } else {
      this.addSharps = true;
    }
    this.setAccidentals();
  }

  setAccidentals() {
    let setTo;
    if (this.addFlats && this.addSharps) {
    } else if (this.addFlats && !this.addSharps) {
      setTo = "b";
    } else if (!this.addFlats && this.addSharps) {
      setTo = "#";
    } else {
      setTo = "";
    }
    this.note = new Note(this.note.note, this.note.note, setTo);
    this.draw();
  }

  //Range Modal:
  noteInRange(input) {
    const validNotes = ["C", "D", "E", "F", "G", "A", "B"];
    if (validNotes.includes(input.charAt(0))) {
      let octave = parseInt(input.charAt(1));
      if (octave > 0 && octave < 9) {
        return true;
      }
    }
    return false;
  }
  validateInput() {
    const inputMin = document.getElementById("inputMin");
    const inputMax = document.getElementById("inputMax");

    const updateValueMin = (e) => {
      var input = e.target.value;

      if (this.noteInRange(input)) {
        inputMin.classList.remove("is-invalid");
        inputMin.classList.add("is-valid");
      } else {
        inputMin.classList.remove("is-valid");
        inputMin.classList.add("is-invalid");
      }
    };
    const updateValueMax = (e) => {
      var input = e.target.value;

      if (this.noteInRange(input)) {
        inputMax.classList.remove("is-invalid");
        inputMax.classList.add("is-valid");
      } else {
        inputMax.classList.remove("is-valid");
        inputMax.classList.add("is-invalid");
      }
    };
    inputMin.addEventListener("input", updateValueMin);
    inputMax.addEventListener("input", updateValueMax);
  }
}
