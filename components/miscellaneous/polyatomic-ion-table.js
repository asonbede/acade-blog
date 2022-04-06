import { useState, useContext, useEffect } from "react";
//import { useField } from "../../hooks/input-editor-hooks";
import classes from "./polyatomic-ion-table.module.css";
import { polyAtomicIon } from "../../helpers/pereriodic-table/element-data";

export default function PolyatomicIonTable({ handleHidePolyatomicTable }) {
  const [radioValue, setRadioValue] = useState();
  const [compoundCount, setcompoundCount] = useState(2);

  function writeFormula(formula) {
    let results = formula.matchAll(/([A-Z])(\d)?([a-z])?(\d)?/gi);
    const symbolArray = [];
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
    return symbolArray;
  }

  polyAtomicIon.sort((a, b) => a.name.localeCompare(b.name));
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <div className={classes.container}>
        <div className={classes.tableCaption}>
          <h1>Polyatomic ions</h1>
          <button onClick={handleHidePolyatomicTable}>back to problem</button>
        </div>
        <table className={classes.tableMain}>
          {/* <caption>Polyatomic Ions</caption> */}
          <thead>
            <tr>
              <th> Name</th>
              <th>Formula</th>
              <th>Charge</th>
            </tr>
          </thead>
          <tbody>
            {polyAtomicIon.map((item, i) => (
              <tr key={`${item.name}-${i}`}>
                <td> {capitalizeFirstLetter(item.name)}</td>
                <td>
                  {writeFormula(item.formula)}
                  <sup>
                    {item.charge === "1" ? "" : item.charge}{" "}
                    {item.formula === "NH4" || item.formula === "H3O"
                      ? "+"
                      : "-"}
                  </sup>
                </td>
                <td>
                  {item.charge}
                  {item.formula === "NH4" || item.formula === "H3O" ? "+" : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
