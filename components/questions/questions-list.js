import classes from "./questions-list.module.css";
import DisplayEditorContent from "../rich-text-editor/display-editor-content";
function QuestionsList({ items, handleRadioButtonChange }) {
  const optionsList = ["A", "B", "C", "D", "E"];

  return (
    <ul className={classes.form}>
      {/* <button onClick={markScript}>submit script: {score} </button> */}
      {/* <button onClick={checkScore}>check score: {score}</button> */}
      {/* <Link href={linkPath}>
        <a onClick={() => console.log("in link")}>Review Result</a>
      </Link> */}
      {items.map((item, questionIndex) => (
        <li key={item._id}>
          <p style={{ display: "flex" }}>
            {/* &nbsp;&nbsp;{item.question} */}
            <span style={{ marginRight: "5px", marginTop: "14px" }}>
              {questionIndex + 1}
            </span>
            <DisplayEditorContent
              contentFromServer={item.question}
              toolbarPresent={false}
            />
          </p>
          <div>
            {item.options.map((optionItem, optionIndex) => (
              <>
                <div
                  style={{
                    display: "flex",
                  }}>
                  <input
                    type="radio"
                    name={questionIndex}
                    value={optionItem.option}
                    id={`${questionIndex}:${optionIndex}`}
                    onChange={handleRadioButtonChange}
                    style={{
                      marginTop: "16px",
                    }}
                  />
                  <label
                    htmlFor={`${questionIndex}:${optionIndex}`}
                    style={{
                      marginTop: "14px",
                    }}>
                    {optionsList[optionIndex]}.{" "}
                  </label>
                  <DisplayEditorContent
                    contentFromServer={optionItem.option}
                    toolbarPresent={false}
                  />
                </div>
              </>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default QuestionsList;
