const timeLimit = 4;

function updateBar(bar, ratio, status) {
  bar.style.width = `${ratio}%`;
  bar.className = `${status}`;
}

function handleTimeBar() {
  const bar = document.querySelector("#progress");
  var counter = 0;

  const intervalId = window.setInterval(() => {
    const remaining = timeLimit - counter;
    const ratio = (counter * 100) / timeLimit;
    var status;
    if (remaining > timeLimit * 0.66) status = "ok";
    else if (remaining > timeLimit * 0.33) status = "warning";
    else status = "danger";

    if (ratio <= 100) {
      updateBar(bar, ratio, status);
      counter += 1;
    } else {
      window.clearInterval(intervalId);
    }
  }, 1000);
}

handleTimeBar();
