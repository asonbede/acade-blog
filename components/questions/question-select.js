//import { useRef, useState } from "react";

function QuestionSelect({ handleSelectChange, selectValue }) {
  return (
    <select
      onChange={handleSelectChange}
      value={selectValue}
      class="form-select form-select-sm m-2 w-25 bg-primary"
      aria-label=".form-select-sm example"
      style={{ color: "white" }}
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
