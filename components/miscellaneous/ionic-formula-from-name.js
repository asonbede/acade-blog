import { useState, useContext, useEffect } from "react";
import { useField } from "../../hooks/input-editor-hooks";
import classes from "./ionic-formula-from-name.module.css";
import PolyatomicIonTable from "./polyatomic-ion-table";
import ChargeTable from "./charge-table";
import InstructionIonic from "./instruction-ion-for-from-name";
import {
  elementsArray,
  polyAtomicIon,
  variableChargeCation,
} from "../../helpers/pereriodic-table/element-data";

//ionic-formula-from-name
export default function NamingIonicCompounds(props) {
  //check category number
  const useFieldExcept = useField("text");
  const useFieldHypoteck = useField("text");
  const { value: enteredExcerpt } = useFieldExcept;
  const { value: enteredHypoteck } = useFieldHypoteck;
  //const [selectValue, setselectValue] = useState();
  // const [option, setOption] = useState();
  // sethypotheticalFormulaArray;
  const [radioValue, setRadioValue] = useState();
  const [compoundCount, setcompoundCount] = useState(2);
  const [hypotheticalElemCount, sethypotheticalElemCount] = useState(2);

  const [ioncompoundString, setioncompoundString] = useState(
    "calcium carbonate,sodium chloride"
  );
  const [hypoteckcompoundString, sethypoteckcompoundString] = useState("");
  const [metalPlusCargeArray, setmetalPlusCargeArray] = useState("");
  const [workArrayGlogalHypo, sethypotheticalFormulaArray] = useState([]);
  const [workArrayGlogal, setworkArrayGlogal] = useState([]);
  const [showPolyatomicIonTable, setshowPolyatomicIonTable] = useState(false);
  const [showChargeTable, setshowChargeTable] = useState(false);
  const [showTable, setshowTable] = useState(false);

  const onChange = (event) => {
    //save your value here with state variable
    console.log(event.target.value);
    setRadioValue(event.target.value);
  };
  const chargeRomanTranslation = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VII",
    8: "VIII",
    9: "IX",
    10: "X",
  };

  //const randomIonicCompounds = "calcium carbonate,sodium chloride";
  useFieldExcept.serverContentInputHandler(ioncompoundString);
  useFieldHypoteck.serverContentInputHandler(hypoteckcompoundString);
  useEffect(() => {
    setRadioValue("naming-guide");
    setcompoundCount(2);
    sethypotheticalElemCount(2);
    handleGenIonicCom();
    handleGenHypotheticalComp();

    handleWriteFormula();
    setshowTable(false);
  }, []);
  useEffect(() => {
    handleWriteFormula();

    setshowTable(false);
  }, [ioncompoundString]);
  useEffect(() => {
    handleWriteHypoFormula();
    setshowTable(false);
  }, [hypoteckcompoundString]);

  function handleShowPolyatomicTable() {
    setshowTable(true);
    setshowPolyatomicIonTable(true);
    setshowChargeTable(false);
  }
  function handleHidePolyatomicTable() {
    setshowTable(false);
    setshowPolyatomicIonTable(false);
  }

  function handleHideChargeTable() {
    // setshowPolyatomicIonTable(true);
    setshowTable(false);
    setshowChargeTable(false);
  }

  function handleShowChargeTable() {
    setshowTable(true);
    setshowChargeTable(true);
    setshowPolyatomicIonTable(false);
  }

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };
  //getting values from keys///
  function getKeyFromValue(object, value) {
    const result = value.replace(/\(|\)/g, "");
    return Object.keys(object).find((key) => object[key] === result);
  }
  //compute the l.c.m
  function getLCM(cataionCharge, anionCharge) {
    //compute l.c.m
    for (let index = 1; index < 1000; index++) {
      if (
        index % Number(cataionCharge) === 0 &&
        index % Number(anionCharge) === 0
      ) {
        return index;
      }
    }
  }

  function handleWriteFormula(params) {
    //get the compounds to be and split them into individual units
    //and initialize variables
    const compoundNameArray = ioncompoundString.split(",");
    const workArray = [];
    let metalNonmetalArray;
    let cationName;
    let symbolOfCation;
    let symbolOfAnion;
    let anionName;
    let chargeOfAnion;
    console.log({ compoundNameArray });

    //iterate through each compound and write the formula
    for (let index = 0; index < compoundNameArray.length; index++) {
      let romanIndicator = false;
      let romanNum;
      let element = compoundNameArray[index];
      let symbolArray = [];
      element = element.trim();

      //check whether the name of the compound contains roman numeral
      const romansNumerals = Object.values(chargeRomanTranslation);
      for (let index = 0; index < romansNumerals.length; index++) {
        const elementRoman = romansNumerals[index];
        if (element.indexOf(elementRoman) > -1) {
          romanIndicator = true;
          break;
        }
      }

      //get the metal name and none metal name for elements
      if (romanIndicator) {
        metalNonmetalArray = element.split(" ");
        if (metalNonmetalArray.length === 3) {
          cationName = metalNonmetalArray[0];
          romanNum = metalNonmetalArray[1];
          //turn the roman numeral to number to used as charge later
          romanNum = getKeyFromValue(chargeRomanTranslation, romanNum);
          anionName = metalNonmetalArray[2];
        } else {
          cationName = metalNonmetalArray[0];
          romanNum = metalNonmetalArray[1];
          //turn the roman numeral to number to used as charge later
          romanNum = getKeyFromValue(chargeRomanTranslation, romanNum);
          anionName = `${metalNonmetalArray[2]} ${metalNonmetalArray[3]}`;
        }
      } else {
        console.log("hello");
        metalNonmetalArray = element.split(" ");
        if (metalNonmetalArray.length === 2) {
          console.log({ metalNonmetalArray });
          cationName = metalNonmetalArray[0];

          anionName = metalNonmetalArray[1];
        } else {
          console.log({ metalNonmetalArray });
          cationName = metalNonmetalArray[0];

          anionName = `${metalNonmetalArray[1]} ${metalNonmetalArray[2]}`;
        }
      }

      //get the cation symbol by searching different arrays
      symbolOfCation = romanIndicator
        ? variableChargeCation.find((cat) => cat.name === cationName).symbol
        : elementsArray.find((cat) => cat.name === cationName).symbol;

      //get the cation charge
      const chargeOfCation = romanIndicator
        ? Number(romanNum)
        : elementsArray.find((cat) => cat.name === cationName).group;

      console.log({ chargeOfCation }, "ccharg");

      console.log({ cationName, anionName, romanNum });
      console.log({ symbolOfCation });

      //get the anion symbol and charge of anion for monoatomic
      let symbolOfAnionObj = elementsArray.find(
        (anion) => anion.ionName === anionName
      );
      if (symbolOfAnionObj) {
        symbolOfAnion = symbolOfAnionObj.symbol;
        console.log({ symbolOfAnion }, "tt");
        const anionGroup = symbolOfAnionObj.group;
        console.log({ anionGroup }, "tt22");

        if (anionGroup === 7) {
          chargeOfAnion = 1;
        } else if (anionGroup === 6) {
          chargeOfAnion = 2;
        } else if (anionGroup === 5) {
          chargeOfAnion = 3;
        } else if (anionGroup === 4) {
          chargeOfAnion = 4;
        }
      }

      //get the anion symbol or formula and charge for polyatomic ion
      if (!symbolOfAnionObj) {
        symbolOfAnion = polyAtomicIon.find(
          (anion) => anion.name === anionName
        ).formula;
        chargeOfAnion = polyAtomicIon.find(
          (anion) => anion.name === anionName
        ).charge;

        let results = symbolOfAnion.matchAll(/([A-Z])(\d)?([a-z])?(\d)?/gi);

        for (let result of results) {
          console.log({ result });
          const match1 = result[1];
          const match2 = result[2] ? result[2] : false;
          const match3 = result[3] ? result[3] : false;
          const match4 = result[4] ? result[4] : false;
          console.log({ match1, match2, match3, match4 });
          const resultGroup = (
            <span style={{ padding: "0", margin: "0" }}>
              {match1}
              {match2 ? <sub>{match2}</sub> : null}
              {match3 ? match3 : null} {match4 ? <sub>{match4}</sub> : null}
            </span>
          );
          symbolArray.push(resultGroup);
        }
      }

      //push variables into array to be display results
      const compName = (
        <p>
          Compound Name: <br />
          {element}
        </p>
      );
      workArray.push(compName);
      if (symbolOfCation === "NH4") {
        symbolOfCation = (
          <>
            NH<sub>4</sub>
          </>
        );
      }

      workArray.push(<p>Write the symbol/formula of ions involved:</p>);
      //if it is polyatomic
      if (!symbolOfAnionObj) {
        workArray.push(symbolOfCation, ...symbolArray);
      } else {
        workArray.push(symbolOfCation, symbolOfAnion);
      }

      workArray.push(<p>Write the charges of ions involved:</p>);
      const chargeSymbolCat = chargeOfCation > 1 ? `${chargeOfCation}+` : "1+";
      const chargeSymbolAnion = chargeOfAnion > 1 ? `${chargeOfAnion}-` : "1-";

      const anionUnits =
        getLCM(chargeOfCation, chargeOfAnion) / Number(chargeOfAnion);

      const cationUnits =
        getLCM(chargeOfCation, chargeOfAnion) / Number(chargeOfCation);

      workArray.push(
        <>
          {symbolOfCation}
          <sup>{chargeSymbolCat}</sup>
        </>
      );
      if (!symbolOfAnionObj) {
        workArray.push(
          <>
            {" "}
            [{symbolArray}]<sup>{chargeSymbolAnion}</sup>{" "}
          </>
        );
      } else {
        //workArray.push(symbolOfCation, symbolOfAnion);
        workArray.push(
          <>
            {symbolOfAnion}
            <sup>{chargeSymbolAnion}</sup>
          </>
        );
      }

      workArray.push(
        <p>
          Now comput the Lowest Common Multiple(LCM)/Least Common
          Denominator(L.C.D) of the charges. This is equal to the total number
          of electrons donated by the cation which is also equal to the total
          number of electrons accepted by the anion in the formula.
          {romanIndicator ? (
            <>
              The charge of the cation is {chargeSymbolCat}. How was it
              obtained? The charge is obtained from the name of the compound. If
              a metal is one that exhibits variable states, like this one, the
              charge will always be included in Roman numerals in the compound
              name. Most transition metals show variable oxidation state.
              <button>This table may help</button>
            </>
          ) : (
            <>
              {" "}
              The charge of the cation is {chargeSymbolCat}. How was it
              obtained? The charge was obtained from the periodic table. The
              charge of a metal element is the number of electrons it has to
              lose to obtain an octet. If a metal is one that exhibits stable
              oxidation state/charge, then get the charge is obtained from the
              periodic table. The is usually equal to the group where the
              element is located in the periodic table.
              <button onClick={handleShowChargeTable}>
                This table may help
              </button>
            </>
          )}
          <br />
          {!symbolOfAnionObj ? (
            <>
              The charge of the anion is {chargeSymbolAnion}. How was it
              obtained? This is a polyatomic ion. A polyatomic ion is a group of
              atoms that behaves as a single unit. Each polyatomic ion has a
              charge associated with it. You have to memorise them one by one
              unfortunately.
              <button onClick={handleShowPolyatomicTable}>
                This table has to be memorised
              </button>
            </>
          ) : (
            <>
              {" "}
              The charge of the anion is {chargeSymbolAnion}. How was it
              obtained? This is a monoatomic anion. The charge was obtained from
              the periodic table. The charge of an anion is usually equal to the
              number of electrons it has to gain to obtained an octet. Anions in
              group 7 has a charge of -1, those in group 6 has a charge of -2
              ...{" "}
              <button onClick={handleShowChargeTable}>
                This table may help
              </button>
            </>
          )}
          <br />
          The L.C.M of {chargeOfCation} and {chargeOfAnion} is {"  "}
          {getLCM(chargeOfCation, chargeOfAnion)}.
        </p>
      );

      workArray.push(
        <p>
          <span style={{ color: "blueviolet" }}>
            Next figure out the number of units of the metals and nonmetal ions
            in the Formula , That is, the formula's subscripts. Divide the L.C.M
            by the charge of each ion to achieve this.
          </span>{" "}
          The charge of {cationName} ion here is {chargeOfCation}, and the L.C.M
          is {getLCM(chargeOfCation, chargeOfAnion)}. Therefore, {cationUnits}{" "}
          units of {cationName} ion will be in the formula.
          <br />
          The charge of {anionName} here is {chargeOfAnion}, and the L.C.M is{" "}
          {getLCM(chargeOfCation, chargeOfAnion)}. Therefore, {anionUnits} units
          of {anionName} ion will be in the formula.
          <br />
        </p>
      );

      workArray.push(
        <>
          {symbolOfCation}
          <sup>{chargeSymbolCat}</sup>
          <sub>{cationUnits}</sub>
        </>
      );
      if (!symbolOfAnionObj) {
        workArray.push(
          <>
            {" "}
            [{symbolArray}]<sup>{chargeSymbolAnion}</sup>{" "}
            <sub className={classes.super}>{anionUnits}</sub>
          </>
        );
      } else {
        //workArray.push(symbolOfCation, symbolOfAnion);
        workArray.push(
          <>
            {symbolOfAnion}
            <sup>{chargeSymbolAnion}</sup>
            <sub className={classes.super}>{anionUnits}</sub>
          </>
        );
      }

      workArray.push(
        <p>
          <span style={{ color: "blueviolet" }}>
            Now write the final formula by taking the following steps:
            <br /> 1. Don't include the charges: since oppostively charged ions
            are combining in equal numbers the charges has been destroyed and
            neutrality established.
            <br />
            2. If the subscript is one, it is not included in the final answer.
            <br />
            3. Enclose polyatomic ion in parentheses if the subscript associated
            with is greater one <br />
          </span>{" "}
        </p>
      );

      workArray.push(
        <>
          {cationUnits === 1 ? (
            <>
              {symbolOfCation}

              {/* <sub>{cationUnits}</sub> */}
            </>
          ) : cationName === "ammonium" ? (
            <>
              ({symbolOfCation})<sub>{cationUnits}</sub>
            </>
          ) : (
            <>
              {symbolOfCation}

              <sub>{cationUnits}</sub>
            </>
          )}
        </>
      );
      if (!symbolOfAnionObj) {
        workArray.push(
          <>
            {anionUnits === 1 ? (
              <>{symbolArray}</>
            ) : (
              <>
                ({symbolArray})<sub className={classes.super}>{anionUnits}</sub>
              </>
            )}
          </>
        );
      } else {
        //workArray.push(symbolOfCation, symbolOfAnion);
        workArray.push(
          <>
            {anionUnits === 1 ? (
              <>{symbolOfAnion}</>
            ) : (
              <>
                {symbolOfAnion}

                <sub className={classes.super}>{anionUnits}</sub>
              </>
            )}
          </>
        );
      }

      workArray.push(
        <>
          <hr />
        </>
      );

      console.log({ symbolOfAnion });
    }
    //set state of work array
    setworkArrayGlogal(workArray);
  }

  //generate compound
  function generateUniqueIonic(workingArray1, workingArray2, count) {
    let randomNumbers = new Set();

    //iterate through array of metals(workingArray1) and nonmetals(workingArray2)
    //select items at random, stop when you reach count(amount set by user)
    while (true) {
      let randomNum1 = Math.floor(Math.random() * workingArray1.length);
      let randomNum2 = Math.floor(Math.random() * workingArray2.length);
      const cationName = workingArray1[randomNum1];
      const anionName = workingArray2[randomNum2];
      //don't include NH4 or H3O as non-metal
      if (anionName === "ammonium" || anionName === "hydronium") {
        continue;
      }
      const ionicCompound = `${cationName} ${anionName}`;
      // randomArray.push(preWorkingArray[num]);

      randomNumbers.add(ionicCompound);
      if (randomNumbers.size === count) {
        break;
      }
    }

    //convert set to array and return the array
    const randomArray = [...randomNumbers];
    return randomArray;
  }

  //generate compounds
  function handleGenIonicCom() {
    console.log("call1");

    //form array of group1,2,3 metals except hydrogen
    const stableChargeMetalArray = elementsArray.filter(
      (item) =>
        item.name !== "hydrogen" &&
        (item.group === 1 || item.group === 2 || item.group === 3)
    );

    console.log({ stableChargeMetalArray });
    //form array of names of groups1,2,3 elements
    const stableChargeMetalNameArray = stableChargeMetalArray.map(
      (item) => item.name
    );
    console.log({ stableChargeMetalNameArray });

    //for array of transition or variable charge elements
    const variableMetalNameArray = variableChargeCation.map((item) => {
      const metalName = item.name;
      // if (
      //   metalName === "silver" ||
      //   metalName === "zinc" ||
      //   metalName === "ammonium"
      // ) {
      //   return metalName;
      // }
      const metalArray = item.charge;
      let randomNum = Math.floor(Math.random() * metalArray.length);
      const pickedCharge = metalArray[randomNum];
      const transValue = chargeRomanTranslation[pickedCharge];
      return `${metalName} (${transValue})`;
    });

    console.log({ variableMetalNameArray });
    //combine array of stable and variable oxidation state
    const overalMetalArray = [
      ...stableChargeMetalNameArray,
      ...variableMetalNameArray,
    ];
    console.log({ overalMetalArray });

    //prepare non-metal/anions
    const monoAtomicAnionsArray = elementsArray.filter(
      (item) => item.ionName !== undefined
    );
    console.log({ monoAtomicAnionsArray });

    //form array of stable non-metal names
    const monoAtomicAnionsNameArray = monoAtomicAnionsArray.map(
      (item) => item.ionName
    );
    const polyAtomicAnionsNameArray = polyAtomicIon.map((item) => item.name);
    console.log({ polyAtomicAnionsNameArray });

    //form a combined array of monoatomic and polyatomic ion
    const overalNonMetalArray = [
      ...monoAtomicAnionsNameArray,
      ...polyAtomicAnionsNameArray,
    ];

    console.log({ overalNonMetalArray });
    //shuffle the array
    shuffleArray(overalMetalArray);
    shuffleArray(overalNonMetalArray);

    //now generate the compounds
    const generatedValue = generateUniqueIonic(
      overalMetalArray,
      overalNonMetalArray,
      compoundCount
    );
    console.log({ generatedValue });
    //set the state of generated compounds
    setioncompoundString(generatedValue.join(", "));
  }
  //hypothetical compounds
  // --------------------------------------------------------------------
  //2 hypothetical ionic elements
  function handleGenHypotheticalComp() {
    //genegrate hypothetical metals symbols
    const metalsUppercaseArray = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "S",
      "Y",
      "Z",
    ];

    const metalsLowercaseArray = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "s",
      "y",
      "z",
    ];
    const metalChargeArray = [
      2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30,
    ];

    shuffleArray(metalChargeArray);
    shuffleArray(metalsLowercaseArray);
    shuffleArray(metalsUppercaseArray);

    const setOfMetalsSymbol = new Set();
    const setOfMetalCharges = new Set();

    const standardMetalsSymbols = elementsArray.map(
      (element) => element.symbol
    );

    while (true) {
      const randomNum3 = Math.floor(Math.random() * metalChargeArray.length);

      const chargeOfMetal = metalChargeArray[randomNum3];

      setOfMetalCharges.add(chargeOfMetal);

      console.log({ hypotheticalElemCount }, typeof hypotheticalElemCount);
      // if (setOfMetalCharges.size !== 2 * hypotheticalElemCount) {

      // }
      if (setOfMetalCharges.size === 2 * hypotheticalElemCount) {
        console.log("trace-break1111");
        break;
      }
    }

    while (true) {
      const randomNum1 = Math.floor(
        Math.random() * metalsUppercaseArray.length
      );
      const randomNum2 = Math.floor(
        Math.random() * metalsLowercaseArray.length
      );
      //const randomNum3 = Math.floor(Math.random() * metalChargeArray.length);
      const firstLetter = metalsUppercaseArray[randomNum1];
      const secondLetter = metalsLowercaseArray[randomNum2];
      //const chargeOfMetal = metalChargeArray[randomNum3];

      const hypotheticalMetalSymbol = `${firstLetter}${secondLetter}`;
      if (standardMetalsSymbols.includes(hypotheticalMetalSymbol)) {
        continue;
      }

      setOfMetalsSymbol.add(hypotheticalMetalSymbol);
      //setOfMetalCharges.add(chargeOfMetal);

      console.log({ hypotheticalElemCount }, typeof hypotheticalElemCount);
      // if (setOfMetalCharges.size !== 2 * hypotheticalElemCount) {

      // }
      if (setOfMetalsSymbol.size === 2 * hypotheticalElemCount) {
        console.log("trace-break");
        break;
      }
    }

    //convert set to array and return the array///////
    const arrayOfMetalsSymbol = [...setOfMetalsSymbol];
    const arrayOfSelectedMetalCharge = [...setOfMetalCharges];
    console.log({ arrayOfMetalsSymbol });
    console.log({ arrayOfSelectedMetalCharge });

    //combine symbol with charge
    const metalsPlusChargeArray = arrayOfMetalsSymbol.map((symbol, index) => ({
      symbol,
      charge: arrayOfSelectedMetalCharge[index],
    }));
    console.log({ metalsPlusChargeArray });
    setmetalPlusCargeArray(metalsPlusChargeArray);
    const result = writeHypotheticalIonicQuest(metalsPlusChargeArray);
    console.log({ result }, "rrr");

    //generate nonmetal

    //add charge to the elements

    //generate hypothetical none metals
    //generate the charges
    // combine metals and none metals
    sethypoteckcompoundString(result.join("\n\n"));
    console.log("hello world");
    //return metalsPlusChargeArray;
  }

  function genquestionType(
    metalSymbol,
    nonmetalSymbol,
    metalChar,
    nonmetalChar
  ) {
    let resultOfReplace = "";

    const questionTypes = [
      `A hypothetical ionic compound is formed from a metal with symbol metalSymbol and charge metalCharge+  and a nonmetal with symbol nonmetalSymbol and charge nonmetalCharge-, predict
 the formula of the compound.`,
      `If a hypothetical metal with symbol metalSymbol and charge metalCharge+ combines
  with a hypothetical  nonmetal with symbol nonmetalSymbol  and charge nonmetalCharge- to form an ionicCompound,
 write  the formula of the compound.`,
      `What is the most likely formula of an ionic compound formed between a metal
 with symbol metalSymbol and charge metalCharge+ and a nonmetal with symbol nonmetalSymbol
 and charge nonmetalCharge-.
`,
    ];

    const randomNum = Math.floor(Math.random() * questionTypes.length);
    const selectedQuestion = questionTypes[randomNum];
    resultOfReplace = selectedQuestion.replace(/metalSymbol/i, metalSymbol);
    resultOfReplace = resultOfReplace.replace(
      /nonmetalSymbol/i,
      nonmetalSymbol
    );
    resultOfReplace = resultOfReplace.replace(/metalCharge/i, metalChar);
    resultOfReplace = resultOfReplace.replace(/nonmetalCharge/i, nonmetalChar);
    return resultOfReplace;
  }

  function writeHypotheticalIonicQuest(symbolBankResult) {
    const questionBankArray = [];
    let questionNum = 1;
    for (let index = 0; index < symbolBankResult.length - 1; ) {
      const element = symbolBankResult[index];
      const metalSymbol = element.symbol;
      const metalCharge = element.charge;
      const nonmetalSymbol = symbolBankResult[index + 1].symbol;
      const nonmetalCharge = symbolBankResult[index + 1].charge;
      const result = genquestionType(
        metalSymbol,
        nonmetalSymbol,
        metalCharge,
        nonmetalCharge
      );
      questionBankArray.push(`${questionNum}. ${result}`);
      index = index + 2;
      questionNum = questionNum + 1;
    }
    return questionBankArray;
  }

  function handleWriteHypoFormula() {
    const questionArray = hypoteckcompoundString.split("\n\n");
    const workArray = [];

    let symbolOfCation;
    let symbolOfAnion;

    let chargeOfCation;
    let chargeOfAnion;

    let questionNum = 0;

    for (let index = 0; index < metalPlusCargeArray.length - 1; ) {
      let metalElementObj = metalPlusCargeArray[index];
      let nonmetalElementObj = metalPlusCargeArray[index + 1];

      symbolOfCation = metalElementObj.symbol;
      chargeOfCation = metalElementObj.charge;
      symbolOfAnion = nonmetalElementObj.symbol;
      chargeOfAnion = nonmetalElementObj.charge;

      const questionValue = (
        <p>
          Problem: <br />
          {questionArray[questionNum]}
        </p>
      );
      workArray.push(questionValue);

      const solutionValue = <p>Solution:</p>;

      workArray.push(solutionValue);

      workArray.push(
        <p>
          Write the symbol of ions/elements involved, the symbol of the metal
          should be written first:
        </p>
      );

      workArray.push(symbolOfCation, symbolOfAnion);

      workArray.push(<p>Write the charges of ions involved:</p>);
      const chargeSymbolCat = chargeOfCation > 1 ? `${chargeOfCation}+` : "1+";
      const chargeSymbolAnion = chargeOfAnion > 1 ? `${chargeOfAnion}-` : "1-";

      const anionUnits =
        getLCM(chargeOfCation, chargeOfAnion) / Number(chargeOfAnion);

      const cationUnits =
        getLCM(chargeOfCation, chargeOfAnion) / Number(chargeOfCation);

      workArray.push(
        <>
          {symbolOfCation}
          <sup>{chargeSymbolCat}</sup>
          {symbolOfAnion}
          <sup>{chargeSymbolAnion}</sup>
        </>
      );

      workArray.push(
        <p>
          Now comput the Lowest Common Multiple(LCM)/Least Common
          Denominator(L.C.D) of the charges. This is equal to the total number
          of electrons donated by the cation which is also equal to the total
          number of electrons accepted by the anion in the formula. The charge
          of the cation is {chargeSymbolCat}. This was given in the question.
          The charge of the anion is {chargeSymbolAnion}. This was also given in
          the question.? )
          <br />
          The L.C.M of {chargeOfCation} and {chargeOfAnion} is {"  "}
          {getLCM(chargeOfCation, chargeOfAnion)}.
        </p>
      );

      workArray.push(
        <p>
          <span style={{ color: "blueviolet" }}>
            Next figure out the number of units of the metals and nonmetal ions
            in the Formula , That is, the formula's subscripts. Divide the L.C.M
            by the charge of each ion to achieve this.
          </span>{" "}
          The charge of {symbolOfCation} ion here is {chargeOfCation}, and the
          L.C.M is {getLCM(chargeOfCation, chargeOfAnion)}. Therefore,{" "}
          {cationUnits} units of {symbolOfCation} ions will be in the formula.
          <br />
          The charge of {symbolOfAnion} here is {chargeOfAnion}, and the L.C.M
          is {getLCM(chargeOfCation, chargeOfAnion)}. Therefore, {anionUnits}{" "}
          units of {symbolOfAnion} ions will be in the formula.
          <br />
        </p>
      );

      workArray.push(
        <>
          {symbolOfCation}
          <sup>{chargeSymbolCat}</sup>
          <sub>{cationUnits}</sub>
          {symbolOfAnion}
          <sup>{chargeSymbolAnion}</sup>
          <sub className={classes.super}>{anionUnits}</sub>
        </>
      );

      workArray.push(
        <p>
          <span style={{ color: "blueviolet" }}>
            Now write the final formula by taking the following steps:
            <br /> 1. Don't include the charges: since oppostively charged ions
            are combining in equal numbers the charges has been destroyed and
            neutrality established.
            <br />
            2. If the subscript is one, it is not included in the final answer.
            <br />
            3. Enclose polyatomic ion in parentheses if the subscript associated
            with is greater one <br />
          </span>{" "}
        </p>
      );

      workArray.push(
        <>
          {cationUnits === 1 ? (
            <>
              {symbolOfCation}

              {/* <sub>{cationUnits}</sub> */}
            </>
          ) : (
            <>
              {symbolOfCation}

              <sub>{cationUnits}</sub>
            </>
          )}
        </>
      );

      workArray.push(
        <>
          {anionUnits === 1 ? (
            <>
              {symbolOfAnion}

              {/* <sub>{cationUnits}</sub> */}
            </>
          ) : (
            <>
              {symbolOfAnion}

              <sub>{anionUnits}</sub>
            </>
          )}
        </>
      );

      workArray.push(
        <>
          <hr />
        </>
      );

      console.log({ symbolOfAnion });
      index = index + 2;
      questionNum = questionNum + 1;
    }

    //set state of work array
    sethypotheticalFormulaArray(workArray);
  }

  // ------------------------------------------------------------
  function displayRadioOptions() {
    return (
      <>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            value="naming-guide"
            name="ionic"
            checked={radioValue === "naming-guide"}
            onChange={onChange}
          />
          <label className="form-check-label">Naming proceedure/guide</label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            value="activities"
            className="form-check-input"
            name="ionic"
            checked={radioValue === "activities"}
            onChange={onChange}
          />
          <label className="form-check-label">Try it with real elements</label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            value="hypothetical"
            className="form-check-input"
            name="ionic"
            checked={radioValue === "hypothetical"}
            onChange={onChange}
          />
          <label className="form-check-label">
            Try it with hypothetical elements
          </label>
        </div>
      </>
    );
  }

  const onChangeNumber = (e) => {
    console.log(e.target.value, "value_number");
    setcompoundCount(Number(e.target.value));
  };

  const onChangeHypoNumber = (e) => {
    console.log(e.target.value, "value_number2");
    sethypotheticalElemCount(Number(e.target.value));
  };

  // const randomElement = Math.floor(Math.random() * elementsArray.length);
  // let randomNum = Math.floor(Math.random() * workingArray.length);

  //rutherford atomic model
  if (radioValue === "naming-guide") {
    return (
      // <div style={{ width: "80%", margin: "0 auto", border: "1px solid red" }}>
      <>
        <InstructionIonic />
        {displayRadioOptions()}
      </>
    );
    //if electrons are negatively charged
  } else if (radioValue === "activities") {
    if (showTable === false) {
      return (
        <>
          <div style={{ border: "2px solid red" }}>
            <div className={classes.card}>
              <div style={{ width: "100%", padding: "6px" }}>
                {" "}
                {workArrayGlogal}
              </div>
            </div>

            <div className={classes.controlRegion}>
              <div className="control">{displayRadioOptions()}</div>
              <div className={classes.textarea}>
                <textarea
                  style={{ fontSize: "18px", color: "blue", margin: "10px" }}
                  id="excerpt"
                  rows="6"
                  cols="40"
                  required
                  value={enteredExcerpt}
                  onChange={useFieldExcept.onChange}
                ></textarea>
              </div>
              <div className={classes.buttons}>
                {/* <button onClick={handleWriteFormula}>check</button>{" "} */}
                <button onClick={handleGenIonicCom}>
                  generate ionic compounds
                </button>
                <label htmlFor="ioncount">Quantity</label>
                <input
                  type="number"
                  id="ioncount"
                  // required
                  value={compoundCount}
                  onChange={onChangeNumber}
                  min="1"
                  max="10"
                  // readOnly
                  // style={{ visibility: "hidden" }}
                />
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          {showPolyatomicIonTable && (
            <PolyatomicIonTable
              handleHidePolyatomicTable={handleHidePolyatomicTable}
            />
          )}

          {showChargeTable && (
            <ChargeTable handleHideChargeTable={handleHideChargeTable} />
          )}
        </>
      );
    }
  } else if (radioValue === "hypothetical") {
    return (
      <>
        <div style={{ border: "2px solid red" }}>
          <div className={classes.card}>
            <div style={{ width: "100%", padding: "6px" }}>
              {" "}
              {workArrayGlogalHypo}
            </div>
          </div>

          <div className={classes.controlRegion}>
            <div className="control">{displayRadioOptions()}</div>
            <div className={classes.textarea}>
              <textarea
                style={{ fontSize: "18px", color: "blue", margin: "10px" }}
                id="hypoteck"
                rows="6"
                cols="40"
                required
                value={enteredHypoteck}
                onChange={useFieldHypoteck.onChange}
              ></textarea>
            </div>
            <div className={classes.buttons}>
              {/* <button onClick={handleWriteFormula}>check</button>{" "} */}
              <button onClick={handleGenHypotheticalComp}>
                generate hypothetical compounds
              </button>
              <label htmlFor="hypocount">Quantity</label>
              <input
                type="number"
                id="hypocount"
                // required
                value={hypotheticalElemCount}
                onChange={onChangeHypoNumber}
                min="1"
                max="10"
                // readOnly
                // style={{ visibility: "hidden" }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
  return null;
}
