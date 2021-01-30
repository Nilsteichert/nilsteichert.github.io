class MidiListener{
    constructor(){
        this.enable2();
        //function to fill dropdown
    }
    enabledTest(err){
        if(err){console.log("F")}
        else{console.log("Yeeee")}
    }


    enable(){
        WebMidi.enable(function (err) {
            //Enable WebMidi
            if (err) {
              console.log("WebMidi could not be enabled.", err);
              window.alert("WebMidi is not supported by your Browser.\nPlease use Google Chrome or any other browser with WebMidi support!")
            } 
            else {
                console.log("WebMidi enabled!");
                var list = document.getElementById("sourceSelector");
                var midiHeader = document.createElement("h6");
                midiHeader.classList.add("dropdown-header");
                midiHeader.appendChild(document.createTextNode("MIDI-Devices"));
                list.appendChild(midiHeader);

                WebMidi.inputs.forEach(i => {
                    var a = document.createElement("a")
                    a.appendChild(document.createTextNode(i.name));
                    a.href = `javascript:midiListener.selectDevice("${i.id}")`;
                    a.classList.add("dropdown-item");
                    a.id = i.id;
                    list.appendChild(a);   
                })

                var seperator = document.createElement("div");
                seperator.classList.add("dropdown-divider");
            } 
        });
    }

    selectDevice(input){
        if(this.selectedDeviceId !=null){document.getElementById(this.selectedDeviceId).classList.remove("disabled");}
        this.selectedDeviceId = input;              
        document.getElementById(this.selectedDeviceId).classList.add("disabled");
    }

    enable2(){
        WebMidi.enable(this.enabledTest(err)

          );
    }
}
