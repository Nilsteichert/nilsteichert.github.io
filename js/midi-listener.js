class MidiListener{
    constructor(){
        this.enable(function () {
            this.fillDropdown(WebMidi.inputs);
        });
    }

    enable(callback) {
        console.log("test");
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

    selectDevice(input){
        if(this.selectedDeviceId !=null){document.getElementById(this.selectedDeviceId).classList.remove("disabled");}
        this.selectedDeviceId = input;              
        document.getElementById(this.selectedDeviceId).classList.add("disabled");
    }

    fillDropdown(inputs = WebMidi.inputs){
        var list = document.getElementById("sourceSelector");
        var midiHeader = document.createElement("h6");
        midiHeader.classList.add("dropdown-header");
        midiHeader.appendChild(document.createTextNode("MIDI-Devices"));
        list.appendChild(midiHeader);

        inputs.forEach(i => {
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
}
