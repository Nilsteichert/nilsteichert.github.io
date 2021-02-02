class TunerApplication {
  constructor() {
    this.tuner = new Tuner()
    //this.notes = []
  }
  start() {
    const self = this
    this.tuner.onNoteDetected = function (note) {
      console.log(note)
      self.lastNote = note.name
    }
    self.tuner.init()
    //self.frequencyData = new Uint8Array(self.tuner.analyser.frequencyBinCount)
  }
}



function startTuner(){
  app.start()
}

function stopTuner() {
  app.tuner.audioContext.close()
}
