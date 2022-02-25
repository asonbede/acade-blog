import NotificationContext from "../../store/notification-context";

import { useState, useContext, useEffect } from "react";

import { elementsArray } from "../../helpers/pereriodic-table/element-data";

export default function GuessElementGame({
  userGuess,
  setuserGuess,
  guessCount,
  setguessCount,
  showEndGameBut,
  setshowEndGameBut,
  setStartButWasClicked,
  startButWasClicked,
}) {
  const notificationCtx = useContext(NotificationContext);
  //check category number

  const [guesses, setguesses] = useState(["Previous guesses: "]);

  const [lastResult, setlastResult] = useState("");
  const [lowOrHi, setlowOrHi] = useState();

  const [randomElementValue, setrandomElementValue] = useState();

  console.log({ userGuess }, "outside-useffect-elem");
  //   const router = useRouter();
  //   const idFromRoute = router.query;
  // name: "strontium",
  //   atomicNum: 38,
  //   symbol: "Sr",
  //   category: "Alkaline earth metals",
  //   atomicMass: "87.6"

  useEffect(() => {
    console.log({ userGuess }, "from-useffect-elem");
    if (userGuess) {
      checkGuess();
    }
  }, [userGuess]);

  function checkGuess() {
    const userGuessAtomicNum = Number(userGuess.atomicNum);
    console.log({ userGuess, guessCount }, "from-guess-elem");
    // if (guessCount === 1) {
    //   console.log("inside counttt");
    //   //guesses.textContent = "Previous guesses: ";
    //   setguesses([...guesses, "Previous guesses: "]);
    // }
    //guesses.textContent += userGuess + " ";
    const guessedElemName = userGuess.name;
    const guessedElemAtomicNum = userGuess.atomicNum;
    const targetElemObj = elementsArray.find(
      (item) => Number(item.atomicNum) === randomElementValue
    );
    const targetElemCategory = targetElemObj.category;

    //   (item) => item.atomicNum === userQuess
    // );
    setguesses([
      ...guesses,
      `Name: ${guessedElemName}, Atomic Number: ${guessedElemAtomicNum}`,
    ]);
    console.log({ randomElementValue, userGuessAtomicNum });
    if (randomElementValue === userGuessAtomicNum) {
      // lastResult.textContent = "Congratulations! You got it right!";
      setlastResult("Congratulations! You got it right!");
      // lastResult.style.backgroundColor = "green";
      setlowOrHi("");
      setguessCount(0);
      setshowEndGameBut(false);
      setuserGuess(null);
      setrandomElementValue(null);
      setguesses(["Previous guesses: "]);
      setlowOrHi("");
      setStartButWasClicked(false);
      //lowOrHi.textContent = "";
      // setGameOver();
    } else if (guessCount === 5) {
      setlastResult("!!!GAME OVER!!!");
      //setGameOver();
      setguessCount(0);
      setshowEndGameBut(false);
      setuserGuess(null);
      setrandomElementValue(null);
      setguesses(["Previous guesses: "]);
      setlowOrHi("");
      setStartButWasClicked(false);
    } else {
      // lastResult.textContent = "Wrong!";
      setlastResult("Result: Wrong!");
      //lastResult.style.backgroundColor = "red";
      if (userGuessAtomicNum < randomElementValue) {
        //lowOrHi.textContent = "Last guess was too low!";
        setlowOrHi(`Hint: Atomic number of last guess was lower than target! 
        ${
          guessCount > 1
            ? `the target belongs to the  ${targetElemCategory}`
            : ""
        }`);
      } else if (userGuessAtomicNum > randomElementValue) {
        //lowOrHi.textContent = "Last guess was too high!";
        setlowOrHi(`Hint: Atomic number of last guess was higher than target! 
        ${
          guessCount > 1
            ? `the target belongs to the ${targetElemCategory} family`
            : ""
        }`);
      }
    }
    //setguessCount(guessCount + 1);
    //guessCount++;
    //guessField.value = "";
    //guessField.focus();
  }

  //   const onselectChange = (e) => {
  //     const optionValue = e.target.value;
  //     setselectValue(optionValue);
  //     console.log({ optionValue });
  //     // router.push(`/posts/${optionValue}`);
  //   };
  function handleStartGame(params) {
    //choose one of the elements at random
    //notify the player, that an element has been chosen at random
    //show elements where uuser can see there progress
    const randomElement = Math.floor(Math.random() * elementsArray.length) + 1;
    console.log({ randomElement }, "from-ran-func");
    setrandomElementValue(randomElement + 1);
    setguessCount(0);
    setshowEndGameBut(false);
    setuserGuess(null);
    setguesses(["Previous guesses: "]);
    setlowOrHi("");
    setStartButWasClicked(true);
  }
  function handleEndGame(params) {
    // userGuess = { userGuess };
    // guessCount = { guessCount };
    // setguessCount = { setguessCount };
    // showEndGameBut = { showEndGameBut };
    // setshowEndGameBut = { setshowEndGameBut };
    // setuserGuess = { setuserGuess };
    setguessCount(0);
    setshowEndGameBut(false);
    setuserGuess(null);
    setrandomElementValue(null);
    setguesses(["Previous guesses: "]);
    setlowOrHi("");
    setStartButWasClicked(false);
  }

  return (
    <div>
      <p>Guess The Element Game</p>
      {!showEndGameBut && <button onClick={handleStartGame}>start game</button>}
      {showEndGameBut && <button onClick={handleEndGame}>End game</button>}
      <p className="lastResult">{lastResult}</p>
      {guessCount >= 1 && (
        <div className="resultParas">
          <p className="guesses">{guesses.join("; ")}</p>

          <p className="lowOrHi">{lowOrHi}</p>
        </div>
      )}
    </div>
  );
}
