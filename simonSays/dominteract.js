let simonSays = new SimonSays();

// elements we want to access a few times
const circle = document.getElementById("backgroundCircle");
const button = document.getElementsByTagName("button")[0];
const cirkels = document.getElementsByClassName("canvas_container");

// 1: if the button gets clicked we want the color of the button to change
// + the game is playing switches to true

button.onclick = function() {
  if (button.classList[1] == "start") {
    console.log("game has started");
    //switch the button appearance
    toggleButton();
    simonSays.playing = true;
    // add to the history then flash it
    simonSays.addToHistory();
    flashTheColorhistory();
    // simonSays.startTheRound();
    // console.log(simonSays.colorHistory);
    // flashTheColorhistory();
  } else {
    console.log("the game was stopped");
    // switch the button appearance
    toggleButton();
    simonSays.colorHistory = [];
    simonSays.userChoices = [];
    simonSays.playing = false;
  }
};

// function to switch our button appearance
function toggleButton() {
  button.classList.toggle("start");
  button.classList.toggle("stop");
  if (button.classList[1] == "stop") {
    button.innerText = "STOP";
  } else {
    button.innerText = "START";
  }
}

// function to return the element that is clicked on
circle.onmouseover = function(e) {
  // console.log(e.clientX, e.clientY);
  // console.log(e.target.id);
  let idOfArch = e.target.id;
  circle.onclick = function(e) {
    // console.log("----------" + idOfArch);
    let color = idOfArch.replace("-arch", "");
    // console.log(color);
    return color;
  };
};

// function to change the appearance of the
// start button

// function to let the timer go

// function to update the colors based upon the historyColors
function changeColor(color, arch) {
  console.log(arch);
  const className = `highlighting-${color}`;
  arch.classList.toggle(className);
  setTimeout(() => {
    arch.classList.remove(className);
  }, 1000);
}

// function to update the rounds div
function updateRounds() {
  document.querySelector("#scoreboard h2").innerText = `Rounds Completed: ${
    simonSays.colorHistory.length
  }`;
}

// function to highlight on click

for (let i = 0; i < cirkels.length; i++) {
  cirkels[i].onclick = function(e) {
    let color = e.target.id;
    changeColor(e.target.id, e.target.children[0]);
    if (!simonSays.flashing) {
      simonSays.addUserChoice(String(color));
      if (simonSays.userChoices.length == simonSays.colorHistory.length) {
        if (simonSays.checkIfCorrect()) {
          simonSays.userChoices = [];
          updateRounds();
          console.log("correct");
          setTimeout(flashTheColorhistory, 1000);
          simonSays.addToHistory();
        } else {
          console.log("you missed");
          console.log(`You lasted ${simonSays.colorHistory.length - 1} rounds`);
          circle.classList.toggle("center_title");
          circle.innerHTML = `<h2 id="endGame">You lasted ${simonSays
            .colorHistory.length - 1} rounds</h2>`;
        }
      }
    }
  };
}

// function to check if the user choices match the color history

// function to flash the colors that are present in the history

function flashTheColorhistory() {
  console.log("the colorhistory is " + simonSays.colorHistory);
  let i = 0;
  simonSays.flashing = true;
  blockingUnblocking();
  let interval = setInterval(function() {
    if (i < simonSays.colorHistory.length) {
      let coloring = simonSays.colorHistory[i];
      let index_for_cirkel = simonSays.colors.indexOf(coloring);
      cirkels[index_for_cirkel].firstElementChild.classList.toggle(
        `highlighting-${coloring}`
      );
      setTimeout(() => {
        cirkels[index_for_cirkel].firstElementChild.classList.remove(
          `highlighting-${coloring}`
        );
      }, 990);
      i++;
    } else {
      i++;
      clearInterval(interval);
      blockingUnblocking();
      simonSays.flashing = false;
    }
  }, 1000);
}

// function to set pointer event to none
function blockingUnblocking() {
  for (let i = 0; i < cirkels.length; i++) {
    cirkels[i].classList.toggle("blocked");
    cirkels[i].firstElementChild.classList.toggle("blocked");
  }
}
