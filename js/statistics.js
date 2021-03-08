class Statistics {
  constructor() {
    this.firstNote = true;
    this.statistics = [];
    this.loadStats();
  }

  //Takes note and key string and answerTime
  addNote(note, key, answerTime) {
    if (note != null && key != null && answerTime != null) {
      this.statistics.push({
        note: note,
        key: key,
        answerTime: answerTime,
        date: Date.now(),
      });
      this.saveStats();
    }
  }
  loadStats() {
    localforage.getItem("noteStatistics", (err, value) => {
      // Run this code once the value has been
      // loaded from the offline store.
      console.log(value);
      if (value) {
        ("val found");
      }
    });
  }

  clearStats() {
    localforage.removeItem("noteStatistics", (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("cleared");
      }
    });
  }

  saveStats() {
    localforage.setItem("noteStatistics", this.statistics, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("saved");
      }
    });
  }
}
