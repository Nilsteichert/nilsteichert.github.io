settings = new Settings();

console.log(settings);
app = new Musicapp(
  settings.keySignature,
  settings.lowestNote,
  settings.highestNote,
  "noteDraw",
  settings
);
app.draw();
