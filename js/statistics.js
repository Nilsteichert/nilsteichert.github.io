class Statistics {
  constructor() {
    this.firstNote = true;
    this.statistics = [] = this.statJsonToObj();
  }

  getTimeDifference(firstDate, secondDate = null) {
    var firstDate = Date.now();

    setInterval(function () {
      document.getElementById("difference").innerHTML = Date.now() - firstDate;

      // the difference will be in ms
    }, 1000);
  }

  addNote(note, key, answerTime) {}

  statJsonToObj() {
    var statistics = Cookies.get("statistics");
    if (statistics != null) {
      return JSON.parse(statistics);
    } else return [""];
  }

  statObjToJson() {
    let stats = [
      {
        note: "C",
        key: "C",
        answerTime: 1,
      },
      {
        note: "D",
        key: "D",
        answerTime: 2,
      },
    ];
    let JSONstats = JSON.stringify(stats);
    return JSONstats;
  }
}
