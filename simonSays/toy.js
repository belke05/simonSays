function SimonSays() {
  this.colorHistory = [];
  this.userChoices = [];
  this.rounds = 0;
  this.colors = ["green", "blue", "yellow", "red"];
  this.timeLeft = true;
  this.playing = false;
  this.flashing = false;
}

// function to generate a random color
// add the randomcolor to the color history every time the user guessed correctly

// array to leave the color history in
// array to put the user choices in

// function return a random color
SimonSays.prototype.randomcolor = function() {
  let randomIndex = Math.floor(Math.random() * this.colors.length);
  return this.colors[randomIndex];
};

// function to execute every time a new round is started
SimonSays.prototype.startTheRound = function() {
  this.addToHistory();
};

// function to add a color every new round
SimonSays.prototype.addToHistory = function() {
  let randomColor = this.randomcolor();
  this.colorHistory.push(randomColor);
  this.rounds = this.colorHistory.length;
};

// function to add the choice of the user
SimonSays.prototype.addUserChoice = function(ClickColor) {
  this.userChoices.push(ClickColor);
};

// function to compare the arrays
SimonSays.prototype.checkIfCorrect = function() {
  let check = true;
  for (let i = 0; i < this.colorHistory.length; i++) {
    if (this.colorHistory[i] !== this.userChoices[i]) {
      check = false;
    }
  }
  return check;
};
