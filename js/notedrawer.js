VF = Vex.Flow;

// Takes id of HTML element and note array (up to 4 notes per clef)
class NoteDrawer{
    constructor(elementID,notes,keySignature = "C",showTimeSignature=false){
        this.elementID = elementID;
        this.notes = notes;
        this.pauseBass = "E/3";
        this.pauseTreble = "C/5";
        this.keySignature = keySignature;
        this.showTimeSignature = showTimeSignature;
        this.timeSignature = "4/4"
    }

    drawOneNote(note = this.notes[0]) {

         // -> change to jquery

        //Selects div where the image gets rendered:
        var div = document.getElementById(this.elementID);
        div.innerHTML = ""; 



        // Set up renderer attached to the div
        var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
        //Set renderer size
        renderer.resize(div.clientWidth,div.clientHeight);
        
        //Context 
        var context = renderer.getContext();
        

        // Drawing offsets
        var topPadding = div.clientHeight/100*20
        var braceOffset = 40;

        var staveLenght = (div.clientWidth-((10/100)*div.clientWidth))-braceOffset; 


   

        // Create a stave at position x, y of width staveLength on the canvas.
        var staveTreble = new VF.Stave(braceOffset, topPadding, staveLenght);
        var staveBass = new VF.Stave(braceOffset,topPadding+100,staveLenght);
        var brace = new VF.StaveConnector(staveTreble, staveBass).setType(3); 
        var lineRight = new VF.StaveConnector(staveTreble, staveBass).setType(0);
        var lineLeft = new VF.StaveConnector(staveTreble, staveBass).setType(1);


        // Add a clef,key and time signature.
        staveTreble.addClef("treble").addKeySignature(this.keySignature);
        staveBass.addClef("bass").addKeySignature(this.keySignature);

        if (this.showTimeSignature) {
            staveBass.addTimeSignature(this.timeSignature)
            staveTreble.addTimeSignature(this.timeSignature)
        }

        //Create stavenotes
        if(note.clef == "treble") {
            var trebleNotes = [
                new VF.StaveNote({clef: "treble", keys: [note.note], duration: "w" }),
              ];
            var bassNotes = [
                new VF.StaveNote({clef: "bass", keys: [this.pauseBass], duration: "wr" }),
              ];
        }
        else{
            var trebleNotes = [
                new VF.StaveNote({clef: "treble", keys: [this.pauseTreble], duration: "wr" }),
              ];
            var bassNotes = [
                new VF.StaveNote({clef: "bass", keys: [note.note], duration: "w" }),
              ];
        }

        //Create voices
        var voiceTreble = new VF.Voice({num_beats: 4,  beat_value: 4}).addTickables(trebleNotes);  
        var voiceBass = new VF.Voice({num_beats: 4,  beat_value: 4}).addTickables(bassNotes);

        //Format Voices
        var formatter = new VF.Formatter().joinVoices([voiceTreble]).format([voiceTreble,voiceBass], staveLenght);

        // Connect it to the rendering context and draw!
        staveTreble.setContext(context).draw();
        staveBass.setContext(context).draw();
        brace.setContext(context).draw();
        lineLeft.setContext(context).draw();
        lineRight.setContext(context).draw();

        // Draw Voices
        console.log(voiceBass,voiceTreble)
        
        if (note.clef == "treble"){voiceTreble.draw(context,staveTreble)}
        else {voiceBass.draw(context,staveBass)}


        //Makes svg scaleable
        const svg = document.querySelector('svg');
        svg.setAttribute('viewBox', '0 0 '+div.clientWidth+' '+div.clientHeight); 
        svg.style="width:100%;height:100%;"   

    }

    changeNotes
}