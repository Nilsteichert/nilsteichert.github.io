class Statistics {
  constructor() {}

  getTimeDifference(firstDate, secondDate) {
    var start = Date.now();

    setInterval(function () {
      document.getElementById("difference").innerHTML = Date.now() - start;

      // the difference will be in ms
    }, 1000);
  }
}
