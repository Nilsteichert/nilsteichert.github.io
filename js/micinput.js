const Application = function() {

  this.tuner = new Tuner(this.a4)
  this.notes = []  
}



Application.prototype.start = function() {
  const self = this

  this.tuner.onNoteDetected = function(note) {
      if (self.lastNote !== note.name) {

        console.log(note.name+note.octave)
        checknote(note.name+"/"+note.octave)
        self.lastNote = note.name
      }

  }


self.tuner.init()
self.frequencyData = new Uint8Array(self.tuner.analyser.frequencyBinCount)
}


const app = new Application()
setnote = "C/4";

function startTuner(){
  app.start()
}

function stopTuner() {
  app.tuner.audioContext.close()
}




function checknote(notestring)
{
  if (setnote == notestring)
  {console.log("yeet")
  setnote = "C/5";
  console.log(setnote);
  return true;}
}