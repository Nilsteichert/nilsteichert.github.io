class Settings {
  constructor() {
    this.keySignature = "C";
    this.lowestNote = "C/2";
    this.highestNote = "C/6";
    this.loadCookies();
  }
  loadCookies() {
    var keysignature = Cookies.get("keySignature");
    if (keysignature != null) {
      this.keySignature = keysignature;
    }
    var lowestNote = Cookies.get("lowestNote");
    if (lowestNote != null) {
      this.lowestNote = lowestNote;
    }
    var highestNote = Cookies.get("highestNote");
    if (highestNote != null) {
      this.highestNote = highestNote;
    }
  }

  setKeySignature(keysignature) {
    Cookies.set("keySignature", keysignature, { expires: 365 });
  }
  setLowestNote(lowestNote) {
    Cookies.set("lowestNote", lowestNote, { expires: 365 });
  }
  setHighestNote(highestNote) {
    Cookies.set("highestNote", highestNote, { expires: 365 });
  }

  reset() {
    Cookies.remove("keySignature");
    Cookies.remove("lowestNote");
    Cookies.remove("highestNote");
  }
}
