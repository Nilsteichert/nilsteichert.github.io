const audioContext = new AudioContext();
// const MicStream = MicStream
const pitch = ml5.pitchDetection(
  './model/',
  audioContext,
  MicStream,
  modelLoaded,
);

// When the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');
}

pitch.getPitch((err, frequency) => {
  console.log(frequency);
});
