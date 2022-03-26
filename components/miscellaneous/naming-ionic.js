//import React from "react";
//import classes from "./post-menu.module.css";
//import NotificationContext from "../../store/notification-context";
import { useState, useContext, useEffect } from "react";
//import { useField } from "../../hooks/input-editor-hooks";
import IonicFormulaFromName from "./ionic-formula-from-name";
//import { useRouter } from "next/router";

export default function NamingIonicCompounds(props) {
  //check category number
  //const useFieldExcept = useField("text");
  //const { value: enteredExcerpt } = useFieldExcept;
  //const [selectValue, setselectValue] = useState();
  const [option, setOption] = useState();
  //const randomIonicCompounds = "calcium carbonate,sodium chloride";
  // useFieldExcept.serverContentInputHandler(randomIonicCompounds);

  useEffect(() => {
    setOption("formula-from-name");
  }, []);

  function handleChange(event) {
    setOption(event.target.value);
  }

  function displayOptions() {
    return (
      <select name="option" onChange={handleChange} value={option}>
        <optgroup label="Ionic Compounds Nomenclature">
          <option value="formula-from-name">
            How to write the formula given the name
          </option>
          <option value="name-from-formula">
            How to write the name given the formula
          </option>
        </optgroup>
      </select>
    );
  }

  //rutherford atomic model
  if (option === "formula-from-name") {
    return (
      <>
        <IonicFormulaFromName />
        {displayOptions()}
      </>
    );
  } else if (option === "name-from-formula") {
    return (
      <div style={{ border: "2px solid red" }}>
        <p>hello worlddddddddd other app </p>
        {displayOptions()}
      </div>
    );
  }
  return null;
}
