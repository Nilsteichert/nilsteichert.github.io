class TunerApplication {
    constructor() {
      this.tuner = new Tuner()
    }
    start() {
      const self = this
      this.tuner.onNoteDetected = function (note) {
        console.log(note)
        self.lastNote = note.name
      }
      self.tuner.init()
    }
  }
  
  
  
  
  
  
  function startTuner(){
    app.start()
  }
  
  function stopTuner() {
    app.tuner.audioContext.close()
  }

  
  