import { useState, useContext, useEffect } from "react";
//import { useField } from "../../hooks/input-editor-hooks";
import classes from "./ionic-formula-from-name.module.css";
import { polyAtomicIon } from "../../helpers/pereriodic-table/element-data";

export default function polyatomicIonTable(props) {
  const [radioValue, setRadioValue] = useState();
  const [compoundCount, setcompoundCount] = useState(2);

  function handleWriteFormula(params) {
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

  return <></>;
}
