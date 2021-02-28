export default class RangeChecker{
    constructor()


    noteInRange(input) {
        const validNotes = ["C", "D", "E", "F", "G", "A", "B"];
        if (validNotes.includes(input.charAt(0))) {
            let octave = parseInt(input.charAt(1)) 
            if(octave > 0 && octave < 9)
            {
                return true;
            }
        }
        return false;
      }
} 
