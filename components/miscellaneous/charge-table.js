import { useState, useContext, useEffect } from "react";
//import { useField } from "../../hooks/input-editor-hooks";
import classes from "./polyatomic-ion-table.module.css";
import { polyAtomicIon } from "../../helpers/pereriodic-table/element-data";

export default function ChargeTable({ handleHideChargeTable }) {
  const [radioValue, setRadioValue] = useState();
  const [compoundCount, setcompoundCount] = useState(2);
  return (
    <>
      <div className={classes.container}>
        <div className={classes.tableCaption}>
          <h1>Elements and Charges</h1>
          <button onClick={handleHideChargeTable}>back to problem</button>
        </div>
        <svg
          id="mySVG"
          width="90%"
          height="700"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          style={{
            margin: "50",
            border: "2px solid blue",
            backgroundColor: "lightGreen",
          }}
          //   viewBox="0 0 800 700"
        >
          <svg x="0" y="0" height="600" width="100%">
            <image
              href="/images/site/elements-charges.jpg"
              x="0"
              y="0"
              height="600"
              width="100%"
            />
          </svg>
        </svg>
      </div>
    </>
  );
}
