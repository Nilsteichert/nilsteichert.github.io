const Application = function() {

  this.tuner = new Tuner(this.a4)
  this.notes = []  
}



Application.prototype.start = function() {
  const self = this

  this.tuner.onNoteDetected = function(note) {
      

      if (checkNote(note.name+"/"+note.octave))
      {inputIsRight()}
      else {
        if (!getAnimationOnCooldown() && self.lastNote !== note.name)
        {
        inputIsWrong();
        animationCooldown();
        }
      }
      self.lastNote = note.name
    
  }


self.tuner.init()
self.frequencyData = new Uint8Array(self.tuner.analyser.frequencyBinCount)
}


const app = new Application()


function startTuner(){
  app.start()
}

function stopTuner() {
  app.tuner.audioContext.close()
}