var currentNote = [new Note("C/3","C/5")]
console.log("Note set")
var drawer = new NoteDrawer("noteDraw",currentNote,"C#")
console.log("Drawer set")
drawer.drawOneNote();
console.log("Note Drawn")

animator = new Animator("noteDraw","red");
console.log(animator)
function testyeet(){
animator.animate();
}
