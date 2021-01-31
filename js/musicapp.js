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
    }

    draw(){this.noteDrawer.drawOneNote(this.note);}
    nextNote(){this.note = new Note(this.minNote,this.maxNote); this.draw();}
    selectKeySignature(keySignature){
        this.keySignature = new KeySignature(keySignature);
        this.noteChecker = new NoteChecker(this.keySignature);
        this.noteDrawer= new NoteDrawer(this.drawDiv,this.note,this.keySignature.keySignature);
        this.draw();
    }
    animate(color){this.animator.startAnimation(color)};
    

}