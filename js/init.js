settings = new Settings();
stats = new Statistics();

console.log(settings);
app = new Musicapp(
  settings.keySignature,
  settings.lowestNote,
  settings.highestNote,
  "noteDraw"
);
app.draw();
