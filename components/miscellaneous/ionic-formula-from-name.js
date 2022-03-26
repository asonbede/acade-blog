import { useState, useContext, useEffect } from "react";
import { useField } from "../../hooks/input-editor-hooks";
import classes from "./ionic-formula-from-name.module.css";
//ionic-formula-from-name
export default function NamingIonicCompounds(props) {
  //check category number
  const useFieldExcept = useField("text");
  const { value: enteredExcerpt } = useFieldExcept;
  //const [selectValue, setselectValue] = useState();
  // const [option, setOption] = useState();

  const [radioValue, setRadioValue] = useState();
  const onChange = (event) => {
    //save your value here with state variable
    console.log(event.target.value);
    setRadioValue(event.target.value);
  };
  const randomIonicCompounds = "calcium carbonate,sodium chloride";
  useFieldExcept.serverContentInputHandler(randomIonicCompounds);
  const fau = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi obcaecati, asperiores non quibusdam delectus ullam maiores doloremque officiis architecto quam quae fuga natus? Quos similique accusantium, necessitatibus expedita reiciendis veritatis?
Quisquam, nostrum eius? Nihil, quibusdam natus accusantium, mollitia, molestias beatae dicta eaque consequatur at necessitatibus eius. Adipisci perferendis tenetur ipsam laboriosam aut reprehenderit, expedita deleniti, quae libero qui odio sit!
Exercitationem dignissimos ducimus quibusdam illum autem, itaque rem voluptas nulla impedit, numquam dolorem atque reprehenderit. Quae enim amet voluptate, doloremque obcaecati qui magnam. Eos quasi reiciendis eius doloremque libero reprehenderit.
A inventore eum rerum sunt temporibus cum unde consequuntur pariatur porro minima nulla esse quis, necessitatibus architecto provident cupiditate velit minus earum laboriosam nam quam! Non delectus ratione similique distinctio?
Expedita modi optio necessitatibus repellat rem quaerat, commodi dolores esse reiciendis placeat error illum ducimus, consequuntur inventore deleniti voluptatem, impedit laborum voluptas architecto ipsam fugiat! Quaerat modi recusandae fuga architecto.
Ad maiores, eligendi, quod reiciendis alias, rem nobis itaque quam error sit consequatur distinctio aliquam. Repellendus quae velit obcaecati hic perferendis ipsum id consequuntur quidem tempore. Corrupti quasi molestias unde.
Alias vitae consectetur, libero, officiis architecto autem sit vel non optio, impedit ab nam sapiente laudantium nisi ex cum aut incidunt facilis explicabo. Cumque reiciendis aliquam praesentium mollitia? Enim, ut.
Corrupti veritatis dignissimos, ducimus sint necessitatibus accusantium natus sequi quam officiis nesciunt fugit et fugiat quaerat eaque quibusdam dolorem minima labore assumenda libero nemo molestias! Minus distinctio molestiae sapiente itaque?
Quisquam minima molestiae mollitia maiores vero consectetur enim odit et non quos sequi, neque architecto asperiores minus aspernatur commodi sint magni illum, nesciunt praesentium soluta recusandae? Eius omnis ipsa autem?
Quasi optio doloribus corporis quis rem obcaecati, eum dolorum veritatis sunt illum dolorem repellendus magnam esse vero unde architecto blanditiis velit fugiat voluptas eius maxime mollitia iste totam. Totam, veniam!`;
  useEffect(() => {
    setRadioValue("naming-guide");
  }, []);

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

  //rutherford atomic model
  if (radioValue === "naming-guide") {
    return (
      // <div style={{ width: "80%", margin: "0 auto", border: "1px solid red" }}>
      <>
        <svg
          id="mySVG"
          width="800"
          height="700"
          style={{
            margin: "50",
            border: "2px solid blue",
            backgroundColor: "lightGreen",
          }}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 800 700"
        ></svg>
        {displayRadioOptions()}
      </>
    );
    //if electrons are negatively charged
  } else if (radioValue === "activities") {
    return (
      <div style={{ border: "2px solid red" }}>
        <div className={classes.card}>
          <span style={{ width: "100%" }}> {fau}</span>
          <div className={classes.container}>
            <h4>
              <b>Jane Doe</b>
            </h4>
            <p>final answer</p>
          </div>
        </div>

        <div className={classes.controlRegion}>
          <div className="control">{displayRadioOptions()}</div>
          <div className="textarea">
            <textarea
              id="excerpt"
              rows="3"
              cols="10"
              required
              value={enteredExcerpt}
              onChange={useFieldExcept.onChange}
            ></textarea>
          </div>
          <div className="buttons">
            <button>check</button> <button>generate ionic compounds</button>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
