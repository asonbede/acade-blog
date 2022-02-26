import NotificationContext from "../../store/notification-context";
import classes from "./guess-element.module.css";
import { useState, useContext, useEffect } from "react";

import { elementsArray } from "../../helpers/pereriodic-table/element-data";
//import classes from "./periodic-table.module.css";
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
  const [gameDataArray, setgameDataArray] = useState([]);

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
    let gameDataObj = {
      rounds: "",
      name: "",
      atomicNumber: "",
      result: "",
      maxChance: "",
      chanceLeft: "",

      hintGiven: "",
    };
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
    const targetElemName = targetElemObj.name;
    const targetElemAtomicNum = targetElemObj.atomicNum;
    const targetElemStateStatus = targetElemObj.stateStatus
      ? "non-metals"
      : "Metals";
    // const
    // stateStatus: "nonmetal",
    //   (item) => item.atomicNum === userQuess
    // );
    setguesses([
      ...guesses,
      `Name: ${guessedElemName}, Atomic Number: ${guessedElemAtomicNum}`,
    ]);
    console.log({ randomElementValue, userGuessAtomicNum });

    // gameDataObj = {
    //   ...gameDataObj,
    //   rounds: guessCount,
    //   name: guessedElemName,
    //   atomicNumber: guessedElemAtomicNum,
    //   maxChance: 5,
    //   chanceLeft: 5 - guessCount,
    //   targetName: "",
    //   targetAtomicNum: "",
    // };
    if (randomElementValue === userGuessAtomicNum) {
      // lastResult.textContent = "Congratulations! You got it right!";
      setlastResult("Congratulations! You got it right!");
      notificationCtx.showNotification({
        title: "Success!",
        message: "Congratulations! You got it right!",
        status: "success",
      });
      // lastResult.style.backgroundColor = "green";
      gameDataObj = {
        ...gameDataObj,
        rounds: guessCount,
        name: guessedElemName,
        atomicNumber: guessedElemAtomicNum,
        maxChance: 5,
        chanceLeft: 5 - guessCount,
        result: "correct",
        hintGiven: "none",
        targetName: targetElemName,
        targetAtomicNum: targetElemAtomicNum,
      };

      setlowOrHi("");
      setguessCount(0);
      setshowEndGameBut(false);
      setuserGuess(null);
      setrandomElementValue(null);
      setguesses(["Previous guesses: "]);
      setlowOrHi("");
      setStartButWasClicked(false);
      //setgameDataArray([]);
      //lowOrHi.textContent = "";
      // setGameOver();
    } else if (guessCount === 5) {
      setlastResult(
        `!!!GAME OVER!!! The target Name: ${targetElemName} Atomic number: ${targetElemAtomicNum}`
      );
      //setGameOver();
      setguessCount(0);
      setshowEndGameBut(false);
      setuserGuess(null);
      setrandomElementValue(null);
      setguesses(["Previous guesses: "]);
      setlowOrHi("");
      setStartButWasClicked(false);
      //setgameDataArray([]);
      notificationCtx.showNotification({
        title: "Over!",
        message: `Chances exhausted.Target Name: ${targetElemName}:  Atomic number is  ${targetElemAtomicNum}`,
        status: "error",
      });

      gameDataObj = {
        ...gameDataObj,
        rounds: guessCount,
        name: guessedElemName,
        atomicNumber: guessedElemAtomicNum,
        maxChance: 5,
        chanceLeft: 5 - guessCount,
        result: "wrong",
        hintGiven: "--",
        targetName: targetElemName,
        targetAtomicNum: targetElemAtomicNum,
      };
    } else {
      // lastResult.textContent = "Wrong!";
      //setlastResult("Result: Wrong!");

      //lastResult.style.backgroundColor = "red";
      if (userGuessAtomicNum < randomElementValue) {
        //lowOrHi.textContent = "Last guess was too low!";
        // setlowOrHi(`Hint:  Atomic number of last guess was lower than target!
        // ${
        //   guessCount > 1
        //     ? `the target belongs to the  ${targetElemCategory}`
        //     : ""
        // }`);
        const meg = `Wrong guess. Atomic number of this guess is lower than target! 
          ${
            guessCount <= 1
              ? `the target belongs to the  ${targetElemStateStatus}`
              : ""
          }
          
          ${
            guessCount > 1
              ? `the target belongs to the  ${targetElemCategory}`
              : ""
          }
        `;
        notificationCtx.showNotification({
          title: "Hint!",
          message: meg,
          status: "error",
        });
        gameDataObj = {
          ...gameDataObj,
          rounds: guessCount,
          name: guessedElemName,
          atomicNumber: guessedElemAtomicNum,
          maxChance: 5,
          chanceLeft: 5 - guessCount,
          result: "wrong",
          hintGiven: meg,
          targetName: "---",
          targetAtomicNum: "---",
        };
      } else if (userGuessAtomicNum > randomElementValue) {
        //lowOrHi.textContent = "Last guess was too high!";
        // setlowOrHi(`Hint: Last guess was wrong. Atomic number of last guess was higher than target!
        // ${
        //   guessCount > 1
        //     ? `the target belongs to the ${targetElemCategory} family`
        //     : ""
        // }`);
        const meg = `Wrong guess. Atomic number of this guess is higher than target! 
          ${
            guessCount <= 1
              ? `the target belongs to the  ${targetElemStateStatus}`
              : ""
          }
       
          ${
            guessCount > 1
              ? `the target belongs to the  ${targetElemCategory}`
              : ""
          }`;

        notificationCtx.showNotification({
          title: "Hint!",
          message: meg,
          status: "error",
        });
        gameDataObj = {
          ...gameDataObj,
          rounds: guessCount,
          name: guessedElemName,
          atomicNumber: guessedElemAtomicNum,
          maxChance: 5,
          chanceLeft: 5 - guessCount,
          result: "wrong",
          hintGiven: meg,
          targetName: "---",
          targetAtomicNum: "---",
        };
      }
    }
    setgameDataArray([...gameDataArray, gameDataObj]);

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
    setgameDataArray([]);
    notificationCtx.showNotification({
      title: "Started!",
      message:
        "New game begins. An element has been selected. Click on any element on the periodic table to guess it.",
      status: "success",
    });
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
    //setgameDataArray([]);
  }

  return (
    <div>
      <p>Guess The Element Game</p>
      {!showEndGameBut && <button onClick={handleStartGame}>start game</button>}
      {showEndGameBut && <button onClick={handleEndGame}>End game</button>}
      {/* <p className="lastResult">{lastResult}</p> */}

      {gameDataArray.length !== 0 && (
        <div>
          <table className={classes.tableData}>
            {/* <colgroup>
          <col span={12} />
          <col
            span={7}
            className={
              selectedCategory === "p-block"
                ? classes.pBoundary
                : classes.noPBoundary
            }
          />
        </colgroup> */}
            <caption>Game Data </caption>
            <thead>
              <tr>
                <th>rounds</th>
                <th>quessed element name</th>
                <th>quessed element atomic number</th>
                <th>result</th>
                <th>max Chance</th>
                <th>chance Left</th>

                <th>targe name</th>
                <th>target atomic num</th>
                <th>hint givem</th>
              </tr>
            </thead>
            <tbody>
              {gameDataArray.map((val) => (
                <tr>
                  <td>{val.rounds}</td>
                  <td>{val.name}</td>
                  <td>{val.atomicNumber}</td>
                  <td>{val.result}</td>
                  <td>{val.maxChance}</td>
                  <td>{val.chanceLeft}</td>

                  <td>{val.targetName}</td>
                  <td>{val.targetAtomicNum}</td>
                  <td>{val.hintGiven}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <p className="guesses">{guesses.join("; ")}</p>

          <p className="lowOrHi">{lowOrHi}</p> */}
        </div>
      )}
    </div>
  );
}

// rounds: guessCount,
//         name: guessedElemName,
//         atomicNumber: guessedElemAtomicNum,
//         maxChance: 5,
//         chanceLeft: 5 - guessCount,
//         result: "wrong",
//         hintGiven: meg,
//         targetName: "---",
//         targetAtomicNum: "---",
