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
    this.rangeModalHandler = new RangeModalHandler();
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
  //RangeModalSave
  saveRangeModal() {}
}
