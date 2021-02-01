class Musicapp{
    constructor(keySignature="C",minNote="C/3",maxNote="C/5",drawDiv="noteDraw"){
        //Variables
        this.minNote=minNote;
        this.maxNote=maxNote;
        this.drawDiv=drawDiv;
        this.keySignature = new KeySignature(keySignature);
        this.note = new Note(minNote,maxNote);
        this.noteDrawer = new NoteDrawer(this.drawDiv,this.note,this.keySignature.keySignature)
        this.noteChecker = new NoteChecker(this.keySignature);
        this.animator = new Animator(this.drawDiv);
        this.tuner;

        this.enableMidi(() => {this.listenToMidi()})
    }

    draw(){this.noteDrawer.drawOneNote(this.note);}
    nextNote(){
        this.note = new Note(this.minNote,this.maxNote); this.draw();
    }
    selectKeySignature(keySignature){
        this.keySignature = new KeySignature(keySignature);
        this.noteChecker = new NoteChecker(this.keySignature);
        this.noteDrawer= new NoteDrawer(this.drawDiv,this.note,this.keySignature.keySignature);
        this.draw();
    }
    rightNote(){
        this.animator.startAnimation("green");
        this.nextNote();
    }
    wrongNote(){this.animator.startAnimation("red");}


    // MIDI handling

    enableMidi(callback) {
        WebMidi.enable(function (err) {
            //Enable WebMidi
            if (err) {
                // An error occured while starting WebMidi
                console.log("WebMidi could not be enabled.", err);
                window.alert("WebMidi is not supported by your Browser.")
            } 
            else {
                // WebMidi enabled successfully
                callback();
            } 
        });
    }

    listenToMidi()
    {
        WebMidi.inputs.forEach(input => {
            input.addListener('noteon', "all", (e) => {
                var receivedNote = e.note.name + "/" + e.note.octave;
                console.log("Received 'noteon' message (" + receivedNote + ").");
                if(this.noteChecker.checkNote(this.note,receivedNote)){
                    this.rightNote()}
                else(this.wrongNote())
              })          
        });
    }
    disableMidi() {WebMidi.inputs.forEach(x => {x.removeListener()})}

    // Tuner handling

    enableTuner()
    {
        this.tuner = new Tuner();
        this.tuner.init();
        const self = this;
        this.tuner.onNoteDetected = function (note) {
            console.log("Heared:" +note.name + "/" + note.octave)
            if(self.noteChecker.checkNote(self.note,(note.name + "/" + note.octave))){
                self.rightNote()}
        }
    }

    disableTuner(){
        this.tuner.audioContext.close();
    }
    muteTuner(){
        try {this.tuner.audioContext.suspend()
            
        } catch (error) {console.log("no tuner running")}
        
    }
    unmuteTuner()
    {
        try {this.tuner.audioContext.resume()
            
        } catch (error) {console.log("no tuner running")}
    }
    toggleMic(){
    if(!this.tuner){this.enableTuner()}
    else if(this.tuner.audioContext.state=="running"){this.muteTuner(); console.log("y")}
    else(this.unmuteTuner());
    }

}