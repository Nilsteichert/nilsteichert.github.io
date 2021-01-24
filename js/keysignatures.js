keysignatures = [ 
        "C",
        "F",
        "Bb",
        "Eb",
        "Ab",
        "Db",
        "Gb",
        "Cb",
        "G",
        "D",
        "A",
        "E",
        "B",
        "F#",
        "C#",
        "Am",
        "Dm",
        "Gm",
        "Cm",
        "Fm",
        "Bbm",
        "Ebm",
        "Abm",
        "Em",
        "Bm",
        "F#m",
        "C#m",
        "G#m",
        "D#m",
        "A#m"
]
majorkeysignatures = [
    "C",
    "F",
    "Bb",
    "Eb",
    "Ab",
    "Db",
    "Gb",
    "Cb",
    "G",
    "D",
    "A",
    "E",
    "B",
    "F#",
    "C#",
]
minorkeysignatures = [
    "Am",
    "Dm",
    "Gm",
    "Cm",
    "Fm",
    "Bbm",
    "Ebm",
    "Abm",
    "Em",
    "Bm",
    "F#m",
    "C#m",
    "G#m",
    "D#m",
    "A#m"
]

function generateRandomKeySignature(range = null){
    switch (range) {
        case "minor":
            return minorkeysignatures[Math.floor(Math.random() * minorkeysignatures.length)];
        case "major":
            return majorkeysignatures[Math.floor(Math.random() * majorkeysignatures.length)];
        default:
            return keysignatures[Math.floor(Math.random() * keysignatures.length)];
    }
    
}

//Takes key signature and note in following formatting: ("C#m","Cb/4") or ("F", "G/4")
function checkKeychangeKeySignature(keySignature,note)
{
    //Ignore notes with inline accidental
    if (note.includes("#") || note.includes("b")) {return note;}
    //Replace minor keys with equivalent major key
    if (keySignature.includes("m"))
    {
        keySignature = keySignature.replace("Am","C")
        keySignature = keySignature.replace("Dm","F")
        keySignature = keySignature.replace("Gm","Bb")
        keySignature = keySignature.replace("Cm","Eb")
        keySignature = keySignature.replace("Fm","Ab")
        keySignature = keySignature.replace("Bbm","Db")
        keySignature = keySignature.replace("Ebm","Gb")
        keySignature = keySignature.replace("Abm","Cb")
        keySignature = keySignature.replace("Em","G")
        keySignature = keySignature.replace("Bm","D")
        keySignature = keySignature.replace("F#m","A")
        keySignature = keySignature.replace("C#m","E")
        keySignature = keySignature.replace("G#m","B")
        keySignature = keySignature.replace("D#m","F#")
        keySignature = keySignature.replace( "A#m","C#") 
    }


    //Get dictornary with all accidentals per key signature
    var currentKeySignatureDict = getKeySignatureDict(keySignature);
    
    subIndex = "dict_"+keySignature.replace("#","sharp")
    
    if(note.slice(0,1) in currentKeySignatureDict[subIndex]){ 
        //Check if octave changed with applied key signature
        if (keySignature == "Gb" || keySignature == "Cb"){
            if (note.slice(0,1)== "C"){
            newOctave = parseInt(note.slice(-1))-1;
            note = note.replace(note.slice(-1),newOctave)
            }
        }
        if (keySignature == "C#"){
            if (note.slice(0,1)== "B"){
            newOctave = parseInt(note.slice(-1))+1;
            note = note.replace(note.slice(-1),newOctave)
            }
        }
        
        //Replace note with changed note
        note = note.replace(note.slice(0,1),currentKeySignatureDict[subIndex][note.slice(0,1)]);
        return note;
    }
    else {return note;}
}



function getKeySignatureDict(keySignature)
{
    switch (keySignature) {

        case "C":
                return {dict_C}
        case "F":
                return {dict_F}
        case "Bb":
                return {dict_Bb}
        case "Eb":
                return {dict_Eb}
        case "Ab":
                return {dict_Ab}
        case "Db":
                return {dict_Db}
        case "Gb":
                return {dict_Gb}
        case "Cb":
                return {dict_Cb}
        case "G":
                return {dict_G}
        case "D":
                return {dict_D}
        case "A":
                return {dict_A}
        case "E":
                return {dict_E}
        case "B":
                return {dict_B}
        case "F#":
                return {dict_Fsharp}
        case "C#":
                return {dict_Csharp}
        case "Am":
                return {dict_Am}
        case "Dm":
                return {dict_Dm}
        case "Gm":
                return {dict_Gm}
        case "Cm":
                return {dict_Cm}
        case "Fm":
                return {dict_Fm}
        case "Bbm":
                return {dict_Bbm}
        case "Ebm":
                return {dict_Ebm}
        case "Abm":
                return {dict_Abm}
        case "Em":
                return {dict_Em}
        case "Bm":
                return {dict_Bm}
        case "F#m":
                return {dict_Fsharpm}
        case "C#m":
                return {dict_Csharpm}
        case "G#m":
                return {dict_Gsharpm}
        case "D#m":
                return {dict_Dsharpm}
        case "A#m":
                return {dict_Asharpm}
            
    }
}

var dict_C = {};

//FLAT KEY SIGNATURES

var dict_F = {
    B: "Bb"
};

var dict_Bb = {
    B: "Bb",
    E: "Eb"
};
var dict_Eb = {
    B: "Bb",
    E: "Eb",
    A: "Ab"
};
var dict_Ab = {
    B: "Bb",
    E: "Eb",
    A: "Ab",
    D: "Db",
};
var dict_Db = {
    B: "Bb",
    E: "Eb",
    A: "Ab",
    D: "Db",
    G: "Gb",
};
var dict_Gb = {
    B: "Bb",
    E: "Eb",
    A: "Ab",
    D: "Db",
    G: "Gb",
    C: "B",
};
var dict_Cb = {
    B: "Bb",
    E: "Eb",
    A: "Ab",
    D: "Db",
    G: "Gb",
    C: "B",
    F: "E"
};

//Sharp key signatures
var dict_G = {
    F: "F#",
};

var dict_D = {
    F: "F#",
    C: "C#"
};

var dict_A = {
    F: "F#",
    C: "C#",
    G: "G#",
};
var dict_E = {
    F: "F#",
    C: "C#",
    G: "G#",
    D: "D#",
};
var dict_B = {
    F: "F#",
    C: "C#",
    G: "G#",
    D: "D#",
    A: "A#"
};
var dict_Fsharp = {
    F: "F#",
    C: "C#",
    G: "G#",
    D: "D#",
    A: "A#",
    E: "F"
};
var dict_Csharp = {
    F: "F#",
    C: "C#",
    G: "G#",
    D: "D#",
    A: "A#",
    E: "F",
    B: "C"
};


