//import { useRef, useState } from "react";

function QuestionSelect({ handleSelectChange, selectValue }) {
  return (
    <select
      onChange={handleSelectChange}
      value={selectValue}
      style={{ backgroundColor: "white" }}
    >
      <optgroup label="Multiple Choice">
        <option value="mult-choice-all">All Multiple Choice</option>
        <option value="mult-choice-one">Multiple Choice - One By One</option>
      </optgroup>
      <optgroup label="Essay Type">
        <option value="essay-type">Essay Type</option>
      </optgroup>
    </select>
  );
}

export default QuestionSelect;
