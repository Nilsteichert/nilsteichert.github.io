class MidiListener{
    constructor(){
        
    this.enable()
    this.deviceList = WebMidi.inputs;
    }

    enable(){
        WebMidi.enable(function (err) {

            //Enable WebMidi
            if (err) {
              console.log("WebMidi could not be enabled.", err);
              window.alert("WebMidi is not supported by your Browser.\nPlease use Google Chrome or any other browser with WebMidi support!")
            } else {console.log("WebMidi enabled!");}
        });
    }
}
