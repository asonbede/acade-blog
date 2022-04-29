//import { useRef, useState } from "react";

function QuestionSelect({ handleSelectChange, selectValue }) {
  return (
    <select
      onChange={handleSelectChange}
      value={selectValue}
      style={{ backgroundColor: "white" }}
    >
      <optgroup label="Multiple Choice">
        {/* <option value="mult-choice-all">All Multiple Choice</option> */}
        <option value="mult-choice-one">
          Select Multiple Choice Questions
        </option>
      </optgroup>
      <optgroup label="Essay Type">
        <option value="essay-type">Select Essay Type Questions</option>
      </optgroup>
    </select>
  );
}

export default QuestionSelect;
