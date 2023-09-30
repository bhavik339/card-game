let deckId;
let computerscore = 0;
let myscore = 0;

let newdeskbtn = document.getElementById("newdeskbtnEl");
let remainingCards = document.getElementById("remainingCards");
let drawbtn = document.getElementById("drawbtnEl");
let card1 = document.getElementById("card1");
let card2 = document.getElementById("card2");
let winer = document.getElementById("winer");
let computerscoretext = document.getElementById("computerscore");
let myscoretext = document.getElementById("myscore");

newdeskbtn.addEventListener("click", creatnewDesk);
drawbtn.addEventListener("click", startthaGame);

function creatnewDesk() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((Response) => Response.json())
    .then((data) => {
      deckId = data.deck_id;
      remainingCards.innerText = `Remaining Cards :-${data.remaining}`;
      computerscore = 0;
      myscore = 0;
      computerscoretext.innerText = `Computer Score :-${computerscore}`;
      myscoretext.innerText = `My Score :-${myscore}`;
      winer.innerText = "Start Game";
      drawbtn.disabled = false;
    });
}

function startthaGame() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((Response) => Response.json())
    .then((data) => {
      remainingCards.innerText = `Remaining Cards :-${data.remaining}`;
      card1.innerHTML = `<img src=${data.cards[0].image}>`;
      card2.innerHTML = `<img src=${data.cards[1].image}>`;
      whoiswin(data.cards[0], data.cards[1]);
      if (data.remaining === 0) {
        drawbtn.disabled = true;
        if (computerscore > myscore) {
          winer.innerText = "Computer Win Tha Mach";
        } else if (computerscore < myscore) {
          winer.innerText = "You Win Tha Mach";
        } else {
          winer.innerText = "Tia Win Tha Mach";
        }
      }
    });
}

function whoiswin(card1, card2) {
  let valueOptions = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];
  let card1indexis = valueOptions.indexOf(card1.value);
  let card2indexis = valueOptions.indexOf(card2.value);

  if (card1indexis > card2indexis) {
    computerscore++;
    computerscoretext.innerText = `Computer Score :-${computerscore}`;
    winer.innerText = "Computer win";
  } else if (card1indexis < card2indexis) {
    myscore++;
    myscoretext.innerText = `My Score :-${myscore}`;
    winer.innerText = "You win";
  } else {
    winer.innerText = "Tia";
  }
}
