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
  const [queNumArrayGlobal, setuniqueNumArray] = useState([]);

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

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  function generateUniQueNum(workingArray, count) {
    // if (count===""){

    // }
    let randomNumbers = new Set();
    while (true) {
      let randomNum = Math.floor(Math.random() * workingArray.length);

      // randomArray.push(preWorkingArray[num]);
      randomNumbers.add(randomNum);
      if (randomNumbers.size === workingArray.length) {
        break;
      }
    }
    //console.log({ randomArray });
    //setitemArray(randomArray);
    const randomArray = [...randomNumbers];
    return randomArray;
  }

  function getTargetElemBlock(elemObj) {
    if (elemObj.group === 1 || elemObj.group === 2) {
      return "s-block";
    } else if (
      elemObj.group === 3 ||
      elemObj.group === 4 ||
      elemObj.group === 5 ||
      elemObj.group === 6 ||
      elemObj.group === 7 ||
      elemObj.group === 0
    ) {
      return "p-block";
    } else if (elemObj.category === "Transition metals") {
      return "d-block";
    } else if (
      elemObj.category === "Lanthanides" ||
      elemObj.category === "Actinides"
    ) {
      return "f-block";
    }
    return "";
  }

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
    let uniqueNumArray;
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
    const targetElemPeriod = `period ${targetElemObj.period}`;
    const targetElemGroup = `group ${targetElemObj.group}`;
    const targetElemBlock = getTargetElemBlock(targetElemObj);
    const targetElemArray = [
      targetElemBlock,
      targetElemGroup,
      targetElemPeriod,
      targetElemStateStatus,
      targetElemCategory,
    ];

    if (guessCount === 1) {
      //shuffleArray(targetElemArray);
      uniqueNumArray = generateUniQueNum(targetElemArray);
      console.log({ uniqueNumArray });
      setuniqueNumArray(uniqueNumArray);
    }

    //console.log({ targetElemGroup });
    // const arrrayGroups = [1, 2, 3, 4, 5, 6, 7, 0];

    // const filteredArray = arrrayGroups.filter(
    //   (item) => item !== targetElemGroup
    // );
    // console.log({ filteredArray });

    // const randomNum1 = Math.floor(Math.random() * filteredArray.length) + 1;

    // const targetElemGroupArray = [targetElemGroup, filteredArray[randomNum1]];
    // console.log({ targetElemGroupArray });

    // shuffleArray(targetElemGroupArray);

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
        maxChance: 6,
        chanceLeft: 6 - guessCount,
        result: "correct",
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
    } else if (guessCount === 6) {
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
        maxChance: 6,
        chanceLeft: 6 - guessCount,
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
            guessCount === 1
              ? `the target belongs to the  ${
                  targetElemArray[uniqueNumArray[0]]
                }`
              : ""
          }
          
          ${
            guessCount === 2
              ? `the target belongs to the  ${
                  targetElemArray[queNumArrayGlobal[1]]
                }`
              : ""
          }

           ${
             guessCount === 3
               ? `the target belongs to  ${
                   targetElemArray[queNumArrayGlobal[2]]
                 }`
               : ""
           }
            ${
              guessCount === 4
                ? `the target belongs to  ${
                    targetElemArray[queNumArrayGlobal[3]]
                  }`
                : ""
            }

             ${
               guessCount === 5
                 ? `the target belongs to  ${
                     targetElemArray[queNumArrayGlobal[4]]
                   }`
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
          maxChance: 6,
          chanceLeft: 6 - guessCount,
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
            guessCount === 1
              ? `the target belongs to the  ${
                  targetElemArray[uniqueNumArray[0]]
                }`
              : ""
          }
          
          ${
            guessCount === 2
              ? `the target belongs to the  ${
                  targetElemArray[queNumArrayGlobal[1]]
                }`
              : ""
          }

           ${
             guessCount === 3
               ? `the target belongs to  ${
                   targetElemArray[queNumArrayGlobal[2]]
                 }`
               : ""
           }
            ${
              guessCount === 4
                ? `the target belongs to  ${
                    targetElemArray[queNumArrayGlobal[3]]
                  }`
                : ""
            }

             ${
               guessCount === 5
                 ? `the target belongs to ${
                     targetElemArray[queNumArrayGlobal[4]]
                   }`
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
          maxChance: 6,
          chanceLeft: 6 - guessCount,
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
    const randomElement = Math.floor(Math.random() * elementsArray.length);

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        border: "1px solid pink",
      }}
    >
      <div style={{ marginLeft: "45%", marginBottom: "4%" }}>
        <p>Guess The Element Game</p>
        {!showEndGameBut && (
          <button onClick={handleStartGame}>start game</button>
        )}
        {showEndGameBut && <button onClick={handleEndGame}>End game</button>}
        {/* <p className="lastResult">{lastResult}</p> */}
      </div>
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

                <th>target name</th>
                <th>target atomic num</th>
                <th>hint given</th>
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
