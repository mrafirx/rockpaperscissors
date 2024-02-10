// ROCK PAPER SCISSORS
let player = "";
let computer = "";
let gameResult = "";
let randomNumber = 0;

// Game Counter 
let score = JSON.parse(localStorage.getItem("score")) || {
    victory: 0,
    tie: 0,
    defeat: 0,
};


// Play functions
document.body.addEventListener("keydown", (event) => {
    if (event.key === "r" || event.key === "R"){
        rock();
    } else if (event.key === "p" || event.key === "P"){
        paper();
    } else if (event.key === "s" || event.key === "S"){
        scissors();
    };

    if (event.key === "A" || event.key === "a"){
        autoPlay();
    };

    if (event.key === "Backspace"){
        resetPopup();
    };
});

document.querySelector(".status")
    .innerHTML = `Victory: ${score.victory} - Tie: ${score.tie} - Defeat: ${score.defeat}`

document.querySelector(".move-rock").addEventListener("click", () => {
    rock();
});
document.querySelector(".move-paper").addEventListener("click", () => {
    paper();
});
document.querySelector(".move-scissors").addEventListener("click", () => {
    scissors();
});

function rock(){
    computerMove();

    player = "rock";
    
    // logic for gameplay
    playGame(player, computer);

    gameCounter();
    announce(computer, player);
    update();
};

function paper(){
    computerMove();
    player = "paper";
    
    // logic for gameplay
    playGame(player, computer);

    gameCounter();
    announce(computer, player);
    update();
};

function scissors(){
    computerMove();
    player = "scissors";
    
    // logic for gameplay
    playGame(player, computer);

    gameCounter();
    announce(computer, player);
    update();
};

function computerMove(){
    randomNumber = Math.random();
    if (randomNumber >= 0 && randomNumber < (1/3)){
        computer = "rock"
    } else if (randomNumber >= (1/3) && randomNumber < (2/3)) {
        computer = "paper"
    } else if (randomNumber >= (2/3) && randomNumber < (1)) {
        computer = "scissors"
    };
    return computer;
};

const move = document.querySelector("move");
const status = document.querySelector("status");

function announce(computer, player){
    document.querySelector(".status")
        .innerHTML = `Victory: ${score.victory} - Tie: ${score.tie} - Defeat: ${score.defeat}`;

    document.querySelector(".move")
        .innerHTML = `        You <div class="player-move"></div><div class="computer-move"></div> Computer`;

    let computerMoveIcon = "";
    if (computer === "rock") {
        computerMoveIcon = "./rock-emoji.png";
    } else if (computer === "paper") {
        computerMoveIcon = "./paper-emoji.png";        
    } else {
        computerMoveIcon = "./scissors-emoji.png";
    };

    let playerMoveIcon = "";
    if (player === "rock") {
        playerMoveIcon = "./rock-emoji.png";
    } else if (player === "paper") {
        playerMoveIcon = "./paper-emoji.png";        
    } else {
        playerMoveIcon = "./scissors-emoji.png";
    };

    document.querySelector(".computer-move").innerHTML = `<img class="move-icon" src="${computerMoveIcon}" alt=""></img>`;

    document.querySelector(".player-move").innerHTML = `<img class="move-icon" src="${playerMoveIcon}" alt=""></img>`;   

    document.querySelector(".result")
        .innerText = `It was a ${gameResult} for you`;
};

function update(){
    console.log(`
    You: ${player}
    Computer: ${computer}
    It was a ${gameResult} for you

    Victory: ${score.victory}
    Tie: ${score.tie}
    Defeat: ${score.defeat}
    `);
};


function gameCounter(){
    if (gameResult === "tie") {
        score.tie ++;
    } else if (gameResult === "defeat") {
        score.defeat ++;
    } else if (gameResult === "victory") {
        score.victory ++;
    };
    localStorage.setItem("score", JSON.stringify(score));
};

document.querySelector(".reset-game").addEventListener("click", () => {
    resetPopup();
});

function resetPopup(){
    document.querySelector(".popup-bg").classList.toggle("active"); 
    document.querySelector(".reset-popup").classList.toggle("active"); 
    stopAutoPlay();
}

document.getElementById("reset-yes").addEventListener("click", () => {
    resetGame();
    resetPopup();
});

document.getElementById("reset-no").addEventListener("click", () => {
    resetPopup();
});

function resetGame(){
    score.tie = 0;
    score.defeat = 0;
    score.victory = 0;

    console.log(`
    Game was reset
    Victory: ${score.victory}
    Tie: ${score.tie}
    Defeat: ${score.defeat}
    `);

    
    localStorage.setItem("score", JSON.stringify(score));

    document.querySelector(".status")
    .innerHTML = `Victory: ${score.victory} - Tie: ${score.tie} - Defeat: ${score.defeat}`;

    document.querySelector(".move")
        .innerHTML = `        You v<div class="player-move"></div><div class="computer-move"></div>s Computer`;

    document.querySelector(".result")
        .innerHTML = "Results";
};


function playGame(player, computer){
    if (player === computer) {
        gameResult = "tie";
    } else if (player === "paper") {
        if (computer === "rock") {
            gameResult = "victory";
        } else {
            gameResult = "defeat";
        };
    } else if (player === "rock") {
        if (computer === "scissors") {
            gameResult = "victory";
        } else {
            gameResult = "defeat";
        };
    } else if (player === "scissors") {
        if (computer === "paper") {
            gameResult = "victory";
        } else {
            gameResult = "defeat";
        };
    } ;
};

document.querySelector(".open-storage").addEventListener("click", () => {
    openStorage();
});
function openStorage() {
    console.log(JSON.parse(localStorage.getItem("score")));
};

document.querySelector(".auto-play-button").addEventListener("click", () => {
    autoPlay();
});
let isAutoPlaying = false;
let intervalId;
function autoPlay(){
    if (!isAutoPlaying){
        isAutoPlaying = true; 
        document.querySelector(".auto-play-button")
        .innerText = "Stop Auto Play";
        intervalId = setInterval(() => {
            const autoPlayer = computerMove();
            // console.log(autoPlayer)
            const autoComputer = computerMove();
            // console.log(autoComputer)
            playGame(autoPlayer, autoComputer);
            gameCounter();
            announce(autoComputer, autoPlayer);
            update();
        }, 1000);
    } else {
        stopAutoPlay();
    };
};

function stopAutoPlay(intervalID){
    isAutoPlaying = false;
    document.querySelector(".auto-play-button")
    .innerText = "Auto Play";
    clearInterval(intervalId);
}