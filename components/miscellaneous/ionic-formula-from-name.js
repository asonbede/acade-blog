import { useState, useContext, useEffect } from "react";
import { useField } from "../../hooks/input-editor-hooks";
import classes from "./ionic-formula-from-name.module.css";
import {
  elementsArray,
  polyAtomicIon,
  variableChargeCation,
} from "../../helpers/pereriodic-table/element-data";

//ionic-formula-from-name
export default function NamingIonicCompounds(props) {
  //check category number
  const useFieldExcept = useField("text");
  const { value: enteredExcerpt } = useFieldExcept;
  //const [selectValue, setselectValue] = useState();
  // const [option, setOption] = useState();

  const [radioValue, setRadioValue] = useState();
  const [compoundCount, setcompoundCount] = useState(2);
  const [ioncompoundString, setioncompoundString] = useState(
    "calcium carbonate,sodium chloride"
  );
  const [workArrayGlogal, setworkArrayGlogal] = useState([]);

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
  useEffect(() => {
    setRadioValue("naming-guide");
    setcompoundCount(2);
  }, []);
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };
  function generateUniqueIonic(workingArray1, workingArray2, count) {
    // if (count===""){

    // }
    let randomNumbers = new Set();
    while (true) {
      let randomNum1 = Math.floor(Math.random() * workingArray1.length);
      let randomNum2 = Math.floor(Math.random() * workingArray2.length);
      const cationName = workingArray1[randomNum1];
      const anionName = workingArray2[randomNum2];
      const ionicCompound = `${cationName} ${anionName}`;
      // randomArray.push(preWorkingArray[num]);
      randomNumbers.add(ionicCompound);
      if (randomNumbers.size === count) {
        break;
      }
    }
    //console.log({ randomArray });
    //setitemArray(randomArray);
    const randomArray = [...randomNumbers];
    return randomArray;
  }
  //getting values from keys
  function getKeyFromValue(object, value) {
    const result = value.replace(/\(|\)/g, "");
    return Object.keys(object).find((key) => object[key] === result);
  }
  //compute the l.c.m
  function getLCM(cataionCharge, anionCharge) {
    //compute l.c.m
    for (let index = 1; index < 100; index++) {
      if (
        index % Number(cataionCharge) === 0 &&
        index % Number(anionCharge) === 0
      ) {
        return index;
      }
    }
  }

  function handleWriteFormula(params) {
    const compoundNameArray = ioncompoundString.split(",");
    const workArray = [];
    let metalNonmetalArray;
    let cationName;
    let symbolOfAnion;
    let anionName;
    let chargeOfAnion;
    console.log({ compoundNameArray });
    for (let index = 0; index < compoundNameArray.length; index++) {
      let romanIndicator = false;
      let romanNum;
      let element = compoundNameArray[index];
      let symbolArray = [];
      element = element.trim();
      const romansNumerals = Object.values(chargeRomanTranslation);
      for (let index = 0; index < romansNumerals.length; index++) {
        const elementRoman = romansNumerals[index];
        if (element.indexOf(elementRoman) > -1) {
          romanIndicator = true;
          break;
        }
      }

      //get the metal name and none metal name
      if (romanIndicator) {
        metalNonmetalArray = element.split(" ");
        if (metalNonmetalArray.length === 3) {
          cationName = metalNonmetalArray[0];
          romanNum = metalNonmetalArray[1];
          romanNum = getKeyFromValue(chargeRomanTranslation, romanNum);
          anionName = metalNonmetalArray[2];
        } else {
          cationName = metalNonmetalArray[0];
          romanNum = metalNonmetalArray[1];
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

      //get the cation symbol
      const symbolOfCation = romanIndicator
        ? variableChargeCation.find((cat) => cat.name === cationName).symbol
        : elementsArray.find((cat) => cat.name === cationName).symbol;

      //get the cation charge
      const chargeOfCation = romanIndicator
        ? Number(romanNum)
        : elementsArray.find((cat) => cat.name === cationName).group;

      console.log({ chargeOfCation }, "ccharg");

      console.log({ cationName, anionName, romanNum });
      console.log({ symbolOfCation });

      //get the anion symbol or formula and charge for monoatomic ion
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

        ///workArray.push(symbolOfAnion);
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
        //let results2 = symbolOfAnion.match(/^\d+$/i);
        // let results = "<h1> <h2>".matchAll(/<(.*?)>/gi);
        //results = Array.from(results); // let's turn it into arraynnn
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
      //display results
      const compName = <p>Compound Name: {element}</p>;
      workArray.push(compName);
      workArray.push(<p>Write the symbol/formula of ions involved</p>);
      if (!symbolOfAnionObj) {
        workArray.push(symbolOfCation, ...symbolArray);
      } else {
        workArray.push(symbolOfCation, symbolOfAnion);
      }

      workArray.push(<p>Write the charges of ions involved</p>);
      const chargeSymbolCat = chargeOfCation > 1 ? `${chargeOfCation}+` : "1+";
      const chargeSymbolAnion = chargeOfAnion > 1 ? `${chargeOfAnion}-` : "1-";
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
              a metal is one that exhibits variable states, the charge will
              always be included in Roman numerals in the compound name. Most
              transition metals show variable oxidation state.
              <button>This table may help</button>
            </>
          ) : (
            <>
              {" "}
              The charge of the cation is {chargeSymbolCat}. How was it
              obtained? The charge was obtained from the periodic table. The
              charge of a metal element is the number of electrons it has to
              lose to obtain an octet. If a metal is one that exhibits stable
              oxidation state/charge, then get the charge from the periodic
              table. The is usually equal to the group where the element is
              located in the periodic table.<button>This table may help</button>
            </>
          )}
          <br />
          {!symbolOfAnionObj ? (
            <>
              The charge of the anion is {chargeSymbolAnion}. How was it
              obtained? This is a polyatomic ion. A polyatomic ion is a group of
              atoms that behaves as a single unit. Each polyatomic ion has a
              charge associated with it. You have to memorise them
              unfortunately.
              <button>This table has to be memorised</button>
            </>
          ) : (
            <>
              {" "}
              The charge of the anion is {chargeSymbolAnion}. How was it
              obtained? This is a monoatomic anion. The charge was obtained from
              the periodic table. The charge of an anion is usually equal to the
              number of electrons it has to gain to obtained an octet. Anions in
              group 7 has a charge of -1, those in group 6 has a charge of -2{" "}
              <button>This table may help</button>
            </>
          )}
          <br />
          The L.C.M of {chargeOfCation} and {chargeOfAnion} is {"  "}
          {getLCM(chargeOfCation, chargeOfAnion)}.
        </p>
      );

      workArray.push(
        <p>
          Next figure out the number of atoms of the metals and nonmetal in the
          Formula , That is the formula subscripts. Divide the L.C.M by the
          charge of each ion to achieve this. The charge {cationName} is{" "}
          {chargeOfCation},and the L.C.M is{" "}
          {getLCM(chargeOfCation, chargeOfAnion)} Therefore,{" "}
          {getLCM(chargeOfCation, chargeOfAnion) / Number(chargeOfCation)} atoms
          of {cationName} will be in the formula.
        </p>
      );

      workArray.push(
        <>
          <hr />
        </>
      );

      console.log({ symbolOfAnion });
    }
    //const workArray2= workArray.filter(item=>item)
    setworkArrayGlogal(workArray);
  }

  function handleGenIonicCom() {
    console.log("call1");

    //form array of group1,2,3 metals
    const stableChargeMetalArray = elementsArray.filter(
      (item) =>
        item.name !== "hydrogen" &&
        (item.group === 1 || item.group === 2 || item.group === 3)
    );

    console.log({ stableChargeMetalArray });
    const stableChargeMetalNameArray = stableChargeMetalArray.map(
      (item) => item.name
    );
    console.log({ stableChargeMetalNameArray });
    //transition or variable charge
    const variableMetalNameArray = variableChargeCation.map((item) => {
      const metalName = item.name;
      if (
        metalName === "silver" ||
        metalName === "zinc" ||
        metalName === "ammonium"
      ) {
        return metalName;
      }
      const metalArray = item.charge;
      let randomNum = Math.floor(Math.random() * metalArray.length);
      const pickedCharge = metalArray[randomNum];
      const transValue = chargeRomanTranslation[pickedCharge];
      return `${metalName} (${transValue})`;
    });

    console.log({ variableMetalNameArray });

    const overalMetalArray = [
      ...stableChargeMetalNameArray,
      ...variableMetalNameArray,
    ];
    console.log({ overalMetalArray });

    //prepare non-metal anions
    const monoAtomicAnionsArray = elementsArray.filter(
      (item) => item.ionName !== undefined
    );
    console.log({ monoAtomicAnionsArray });
    const monoAtomicAnionsNameArray = monoAtomicAnionsArray.map(
      (item) => item.ionName
    );
    const polyAtomicAnionsNameArray = polyAtomicIon.map((item) => item.name);
    console.log({ polyAtomicAnionsNameArray });
    const overalNonMetalArray = [
      ...monoAtomicAnionsNameArray,
      ...polyAtomicAnionsNameArray,
    ];
    console.log({ overalNonMetalArray });
    shuffleArray(overalMetalArray);
    shuffleArray(overalNonMetalArray);
    const generatedValue = generateUniqueIonic(
      overalMetalArray,
      overalNonMetalArray,
      compoundCount
    );
    console.log({ generatedValue });
    setioncompoundString(generatedValue.join(", "));
  }

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
          <label className="form-check-label">Try it yourself</label>
        </div>

        {/* <p>{radioValue}</p> */}
        {/* <button onClick={onClick}> Click Value </button> */}
      </>
    );
  }

  const onChangeNumber = (e) => {
    console.log(e.target.value, "value_number");
    setcompoundCount(Number(e.target.value));
  };

  // const randomElement = Math.floor(Math.random() * elementsArray.length);
  // let randomNum = Math.floor(Math.random() * workingArray.length);

  //rutherford atomic model
  if (radioValue === "naming-guide") {
    return (
      // <div style={{ width: "80%", margin: "0 auto", border: "1px solid red" }}>
      <>
        <svg
          id="mySVG"
          width="1000"
          height="700"
          x="50"
          y="50"
          style={{ border: "2px solid red" }}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1200 700"
        >
          <g>
            <defs>
              {/* <radialGradient id="RadialGradient1" cx="0.5" cy="0.5" r="0.1">
                <stop offset="0%" stopColor="black" />
                <stop offset="100%" stopColor="gold" />
              </radialGradient>
              <filter id="blurFilter" y="-5" height="130" width="130">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" y="-" />
              </filter> */}

              <marker
                id="markerArrow"
                markerWidth="13"
                markerHeight="13"
                refX="2"
                refY="6"
                orient="auto"
              >
                <path
                  d="M2,2 L2,11 L10,6 L2,2"
                  style={{ fill: "black", stroke: "black" }}
                />
              </marker>
            </defs>

            {/* <!-- vertical line --> */}
            <svg x="120" y="190" width="10" height="170">
              <path
                id="arrow"
                d="M5,5 L5 45"
                style={{
                  stroke: "green",
                  strokeWidth: "1.2px",
                  fill: "none",
                  markerEnd: "url(#markerArrow)",
                }}
              />
            </svg>

            {/* <!-- horizontal line --> */}
            {/* <!-- <svg x="402" y="160" width="170" height="10">
          <path
            id="arrow"
            d="M5,5 L45 5"
            style=" 
              stroke: green;
              strokeWidth: 1.2px;
              fill: none;
              marker-end: url(#markerArrow)
            "
          />
    </svg>     --> */}

            <text
              x="110"
              y="10"
              style={{ fill: "#999999", stroke: "#000000", fontSize: "20px" }}
            >
              How To Write The Formula For Ionic Compounds Given The Name
            </text>

            {/* <!-- rect box1 --> */}
            <svg x="50" y="60" width="300" height="200">
              <g style={{ fill: "none", stroke: "blue", fontSize: "14px" }}>
                <rect x="1" y="1" width="150" height="125" />

                <text x="20" y="20">
                  <tspan x="20" y="40">
                    Aluminum Oxide
                  </tspan>
                  <tspan x="20" y="60">
                    Lithium Oxide
                  </tspan>

                  <tspan x="20" y="80">
                    Ammonium Nitride
                  </tspan>
                  <tspan x="20" y="100">
                    Magnesium Phosphate
                  </tspan>

                  <tspan x="20" y="120">
                    Manganese (III) oxide
                  </tspan>
                </text>
              </g>
            </svg>

            {/* <!-- rect box2 --> */}
            <svg x="50" y="200" width="300" height="220">
              <g style={{ fill: "none", stroke: "blue", fontSize: "14px" }}>
                <rect x="12" y="70" width="150" height="125" />
                <text x="20" y="20">
                  <tspan x="20" y="40">
                    Step 1
                  </tspan>
                  <tspan x="20" y="60">
                    Write the symbols of the ions
                  </tspan>
                </text>

                <text x="60" y="100">
                  <tspan x="60" y="100">
                    AlO
                  </tspan>
                  <tspan x="60" y="120">
                    LiO
                  </tspan>
                  <tspan x="60" y="140">
                    NH
                  </tspan>
                  <tspan dx="-1" dy="7">
                    4
                  </tspan>

                  <tspan x="85" y="140">
                    {" "}
                    N
                  </tspan>
                  <tspan x="60" y="160">
                    MgPO
                  </tspan>
                  <tspan dx="-1" dy="7">
                    4
                  </tspan>

                  <tspan x="60" y="180">
                    MnO
                  </tspan>
                </text>
              </g>
            </svg>
            {/* <!-- arrow 2 --> */}
            <svg x="120" y="400" width="10" height="170">
              <path
                id="arrow"
                d="M5,5 L5 45"
                style={{
                  stroke: "green",
                  strokeWidth: "1.2px",
                  fill: "none",
                  markerEnd: "url(#markerArrow)",
                }}
              />
            </svg>

            {/* <!-- rect box3 --> */}
            <svg x="50" y="430" width="300" height="220">
              <g style={{ fill: "none", stroke: "blue", fontSize: "14px" }}>
                <rect x="12" y="70" width="150" height="125" />
                <text x="20" y="20">
                  <tspan x="20" y="40">
                    Step 2
                  </tspan>
                  <tspan x="20" y="60">
                    Write the charges of the ions
                  </tspan>
                </text>

                <text x="60" y="100">
                  <tspan x="60" y="100">
                    Al
                  </tspan>
                  <tspan dx="-1" dy="-7">
                    3+
                  </tspan>
                  <tspan x="85" y="100">
                    O
                  </tspan>
                  <tspan dx="-1" dy="-4">
                    2-
                  </tspan>
                  <tspan x="60" y="120">
                    Li
                  </tspan>
                  <tspan dx="-1" dy="-7">
                    1+
                  </tspan>
                  <tspan x="85" y="120">
                    O
                  </tspan>
                  <tspan dx="-1" dy="-4">
                    2-
                  </tspan>
                  <tspan x="60" y="140">
                    (NH
                  </tspan>
                  <tspan dx="-1" dy="7">
                    4
                  </tspan>
                  <tspan x="90" y="140">
                    )
                  </tspan>{" "}
                  <tspan dx="-1" dy="-5">
                    1+
                  </tspan>
                  <tspan x="115" y="140">
                    {" "}
                    N
                  </tspan>
                  <tspan dx="-1" dy="-7">
                    3-
                  </tspan>
                  <tspan x="60" y="170">
                    Mg
                  </tspan>
                  {/* <!-- <tspan dx="-1" dy="-7">1+</tspan> --> */}
                  <tspan dx="-1" dy="-7">
                    2+
                  </tspan>
                  <tspan x="100" y="170">
                    (PO
                  </tspan>
                  <tspan dx="-1" dy="7">
                    4
                  </tspan>
                  <tspan x="135" y="170">
                    )
                  </tspan>
                  <tspan dx="-1" dy="-7">
                    3-
                  </tspan>
                  <tspan x="60" y="190">
                    Mn
                  </tspan>
                  <tspan dx="-1" dy="-7">
                    3+
                  </tspan>
                  <tspan x="95" y="190">
                    O
                  </tspan>
                  <tspan dx="-1" dy="-7">
                    2-
                  </tspan>
                </text>
              </g>
            </svg>

            {/* <!-- rect box4 --> */}
            <svg x="300" y="5" width="450" height="360">
              <g style={{ fill: "none", stroke: "blue", fontSize: "14px" }}>
                <rect x="10" y="70" width="420" height="270" />
                <text x="50" y="20">
                  <tspan x="30" y="40">
                    Step 3
                  </tspan>
                  <tspan x="30" y="60">
                    find the lowest common multiple(L.C.M) of the charges
                  </tspan>
                </text>

                <text x="15" y="100">
                  <tspan x="15" y="107">
                    {" "}
                    The (L.C.M) of two numbers x and y is the least{" "}
                  </tspan>
                  <tspan x="15" y="125">
                    {" "}
                    number which can be diveded by x and y without remainder.
                  </tspan>
                  <tspan x="15" y="145">
                    {" "}
                    In Aluminum Oxide, the charge of Aluminum is 3+
                  </tspan>
                  <tspan x="15" y="163">
                    and the charge of the oxide ion is 2-
                  </tspan>
                  <tspan x="15" y="185">
                    The L.C.M of 3 and 2 is 6.
                  </tspan>
                  <tspan x="15" y="205">
                    Similarly, the L.C.M of the ionic charges in Lithium Oxide =
                    2.{" "}
                  </tspan>
                  <tspan x="15" y="225">
                    The L.C.M of the ionic charges in Ammonium Nitride = 3.{" "}
                  </tspan>
                  <tspan x="15" y="250">
                    The L.C.M of the ionic charges in Magnesium Phosphate = 6.{" "}
                  </tspan>
                  <tspan x="15" y="270">
                    The L.C.M of the ionic charges in Manganese (III) oxide = 6.{" "}
                  </tspan>
                  <tspan x="15" y="290">
                    {" "}
                    What is the importance of this L.C.M here?{" "}
                  </tspan>
                  <tspan x="15" y="310">
                    The total number of electrons transfered ={" "}
                  </tspan>
                  <tspan x="15" y="325">
                    The total number of electrons received = L.C.M{" "}
                  </tspan>
                </text>
              </g>
            </svg>
            {/* <!-- horizontal line --> */}
            {/* <!-- <svg x="520" y="550" width="170" height="10">
          <path
            id="arrow"
            d="M5,5 L55 5"
            style=" 
              stroke: green;
              strokeWidth: 1.2px;
              fill: none;
              marker-end: url(#markerArrow)
            "
          />
    </svg>      --> */}
            {/* <!-- arrow 2 --> */}
            <svg x="470" y="350" width="10" height="170">
              <path
                id="arrow"
                d="M5,5 L5 45"
                style={{
                  stroke: "green",
                  strokeWidth: "1.2px",
                  fill: "none",
                  markerEnd: "url(#markerArrow)",
                }}
              />
            </svg>

            {/* <!-- rect box5 --> */}
            <svg x="300" y="380" width="480" height="400">
              <g style={{ fill: "none", stroke: "blue", fontSize: "14px" }}>
                <rect x="10" y="85" width="470" height="300" />
                <text x="50" y="20">
                  <tspan x="30" y="40">
                    Step 4
                  </tspan>
                  <tspan x="30" y="60">
                    Determine the subscripts in the formula
                  </tspan>
                  <tspan x="30" y="75">
                    and write the final formula
                  </tspan>
                </text>

                <text x="15" y="120">
                  <tspan x="15" y="107">
                    {" "}
                    Divide the L.C.M by the charge to get the subscripts(no. of
                    atoms in the formula){" "}
                  </tspan>
                  <tspan x="15" y="125">
                    {" "}
                    In Aluminum Oxide, L.C.M = 6, charge of Al = 3, no. of atoms
                    of Al = 6/3 = 2
                  </tspan>
                  <tspan x="15" y="145">
                    In Aluminum Oxide, no. of atoms of O = 6/2 = 3
                  </tspan>
                  <tspan x="15" y="163">
                    Final formula for Aluminum oxide:{" "}
                  </tspan>
                  <tspan x="220" y="163">
                    Al
                  </tspan>
                  <tspan dx="-1" dy="7">
                    3
                  </tspan>
                  <tspan x="245" y="163">
                    O
                  </tspan>
                  <tspan dx="-1" dy="7">
                    2
                  </tspan>
                  <tspan x="15" y="205">
                    The final formula for the rest can be determined Similarly{" "}
                  </tspan>
                  <tspan x="30" y="225">
                    {" "}
                    Lithium oxide: Li
                  </tspan>
                  <tspan dx="-1" dy="7">
                    2
                  </tspan>
                  <tspan x="140" y="225">
                    O
                  </tspan>
                  <tspan x="15" y="250">
                    {" "}
                    Ammonium Nitride: (NH
                  </tspan>
                  <tspan dx="-1" dy="7">
                    4
                  </tspan>
                  <tspan x="175" y="250">
                    )
                  </tspan>
                  <tspan dx="-1" dy="7">
                    3
                  </tspan>
                  <tspan x="187" y="250">
                    N
                  </tspan>

                  <tspan x="15" y="270">
                    Magnesium Phosphate: Mg
                  </tspan>
                  <tspan dx="-1" dy="7">
                    3
                  </tspan>
                  <tspan x="190" y="270">
                    {" "}
                    (PO
                  </tspan>
                  <tspan dx="-1" dy="7">
                    4
                  </tspan>
                  <tspan x="225" y="270">
                    )
                  </tspan>
                  <tspan dx="-1" dy="7">
                    2
                  </tspan>

                  <tspan x="15" y="290">
                    {" "}
                    Manganese (III) oxide: Mn
                  </tspan>
                  <tspan dx="-1" dy="7">
                    2
                  </tspan>
                  <tspan x="186" y="290">
                    O
                  </tspan>
                  <tspan dx="-1" dy="7">
                    3
                  </tspan>
                  <tspan x="15" y="310">
                    {" "}
                    Note the following:{" "}
                  </tspan>
                  <tspan x="15" y="335">
                    When the subscripts is 1, it is not written{" "}
                  </tspan>
                  <tspan x="15" y="350">
                    When the polyatomic ion is more than 1,it is enclosed in
                    parentheses{" "}
                  </tspan>
                  <tspan x="15" y="370">
                    The charge of the cation that varies is enclosed in brackets
                    in the question{" "}
                  </tspan>
                </text>
              </g>
            </svg>
          </g>
        </svg>
        {displayRadioOptions()}
      </>
    );
    //if electrons are negatively charged
  } else if (radioValue === "activities") {
    return (
      <div style={{ border: "2px solid red" }}>
        <div className={classes.card}>
          <div style={{ width: "100%", padding: "6px" }}>
            {" "}
            {workArrayGlogal}
          </div>
          {/* <div className={classes.container}>
            <h4>
              <b>Jane Doe</b>
            </h4>
            <p>final answer</p>
          </div> */}
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
            <button onClick={handleWriteFormula}>check</button>{" "}
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
    );
  }
  return null;
}
