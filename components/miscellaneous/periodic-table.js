import React from "react";
import classes from "./periodic-table.module.css";
import NotificationContext from "../../store/notification-context";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { elementsArray } from "../../helpers/pereriodic-table/element-data";
import GuessElementGame from "./quess-element";
const rowNum = [1, 2, 3, 4, 5, 6, 7];
const rowLanAndAct = ["Lanthanides", "Actinides"];

function TableHead(props) {
  return (
    <tr>
      <th>Groups/Periods</th>
      <th>1</th>
      <th>2</th>
      <th colspan="10"></th>
      <th>3</th>
      <th>4</th>
      <th>5</th>
      <th>6</th>
      <th>7</th>
      <th>0</th>
    </tr>
  );
}

function TableRow({
  row,
  tableData,
  selectedCategory,
  setuserGuess,
  setguessCount,
  guessCount,
  setshowEndGameBut,
  startButWasClicked,
}) {
  const [idValue, setidValue] = useState();
  const [markBounds, setmarkBounds] = useState(false);

  //userQuess={userQuess} guessCount={quessCount} setguessCount={setguessCount}
  function handleMouseEnter(paramVal) {
    setidValue(paramVal);
    setmarkBounds(true);
  }
  function handleMouseLeave(params) {
    setmarkBounds(false);
  }
  function handleTableData(data) {
    if (startButWasClicked) {
      setuserGuess(data);
      setguessCount(guessCount + 1);
      setshowEndGameBut(true);
      console.log({ data, guessCount }, "periodic-table");
    } else {
      console.log(
        "please click the start button first if it is game you want play game"
      );
    }
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  function addFamilyBoundClass(catValue, elemOby) {
    if (catValue === elemOby.category) {
      return classes.familyBonds;
    } else if (
      catValue === "s-block" &&
      (elemOby.category === "Alkali metals" ||
        elemOby.category === "Alkaline earth metals")
    ) {
      return classes.familyBonds;
    } else if (
      catValue === "d-block" &&
      elemOby.category === "Transition metals"
    ) {
      return classes.familyBonds;
    } else if (
      catValue === "f-block" &&
      (elemOby.category === "Lanthanides" || elemOby.category === "Actinides")
    ) {
      return classes.familyBonds;
    } else if (
      catValue === "Non metals" &&
      elemOby.stateStatus === "nonmetal"
    ) {
      return classes.familyBonds;
    } else if (catValue === "Metals" && !elemOby.stateStatus) {
      return classes.familyBonds;
    }

    return classes.noBounds;
  }

  function displayCellData(cellDatum, selectedCat) {
    return (
      <td
        className={`${classes.dataSmall} ${classes.dataLarge} ${
          markBounds && idValue === cellDatum.atomicNum
            ? classes.showBounds
            : classes.hideBounds
        }  ${addFamilyBoundClass(selectedCat, cellDatum)}`}
        onMouseEnter={() => handleMouseEnter(cellDatum.atomicNum)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleTableData(cellDatum)}
      >
        {cellDatum.atomicMass}
        <br />
        <sub>{cellDatum.atomicNum}</sub>
        {cellDatum.symbol}
        <br /> {capitalizeFirstLetter(cellDatum.name)}
      </td>
    );
  }

  if (row === 1) {
    const newTableData = tableData.slice(0, 2);
    return (
      <tr>
        {newTableData.map((val, i) =>
          i === 0 ? (
            <>
              {" "}
              <td>{row}</td>
              {displayCellData(val, selectedCategory)}
              <td colspan="16"></td>
            </>
          ) : (
            displayCellData(val, selectedCategory)
          )
        )}
      </tr>
    );
  } else if (row === 2) {
    const newTableData = tableData.slice(2, 10);
    console.log({ newTableData });
    return (
      <tr>
        {newTableData.map((val, i) => {
          if (i === 0) {
            return (
              <>
                <td>{row}</td>
                {displayCellData(val, selectedCategory)}
              </>
            );
          } else if (i === 1) {
            return displayCellData(val, selectedCategory);
          } else if (i === 2) {
            return (
              <>
                <td colspan="10"></td>
                {displayCellData(val, selectedCategory)}
              </>
            );
          } else {
            return displayCellData(val, selectedCategory);
          }
        })}
      </tr>
    );
  } else if (row === 3) {
    const newTableData = tableData.slice(10, 18);
    return (
      <tr>
        {newTableData.map((val, i) => {
          if (i === 0) {
            return (
              <>
                <td>{row}</td>
                {displayCellData(val, selectedCategory)}
              </>
            );
          } else if (i === 1) {
            return displayCellData(val, selectedCategory);
          } else if (i === 2) {
            return (
              <>
                <td colspan="10"></td>
                {displayCellData(val, selectedCategory)}
              </>
            );
          } else {
            return displayCellData(val, selectedCategory);
          }
        })}
      </tr>
    );
  } else if (row === 4) {
    const newTableData = tableData.slice(18, 36);

    return (
      <tr>
        {newTableData.map((val, i) =>
          i === 0 ? (
            <>
              <td>{row}</td>
              {displayCellData(val, selectedCategory)}
            </>
          ) : (
            displayCellData(val, selectedCategory)
          )
        )}
      </tr>
    );
  } else if (row === 5) {
    const newTableData = tableData.slice(36, 54);

    return (
      <tr>
        {newTableData.map((val, i) =>
          i === 0 ? (
            <>
              <td>{row}</td>
              {displayCellData(val, selectedCategory)}
            </>
          ) : (
            displayCellData(val, selectedCategory)
          )
        )}
      </tr>
    );
  } else if (row === 6) {
    const newTableData = tableData.slice(54, 57);
    const newTableData2 = tableData.slice(71, 86);
    const newTableData3 = [...newTableData, ...newTableData2];

    return (
      <tr>
        {newTableData3.map((val, i) =>
          i === 0 ? (
            <>
              <td>{row}</td>
              {displayCellData(val, selectedCategory)}
            </>
          ) : (
            displayCellData(val, selectedCategory)
          )
        )}
      </tr>
    );
  } else if (row === 7) {
    const newTableData = tableData.slice(86, 89);
    const newTableData2 = tableData.slice(103, 118);
    const newTableData3 = [...newTableData, ...newTableData2];

    return (
      <tr>
        {newTableData3.map((val, i) =>
          i === 0 ? (
            <>
              <td>{row}</td>
              {displayCellData(val, selectedCategory)}
            </>
          ) : (
            displayCellData(val, selectedCategory)
          )
        )}
      </tr>
    );
  } else if (row === "Lanthanides") {
    const newTableData = tableData.slice(57, 71);
    // const newTableData2 = tableData.slice(103, 118);
    // const newTableData3 = [...newTableData, ...newTableData2];

    return (
      <tr>
        {newTableData.map((val, i) =>
          i === 0 ? (
            <>
              <td>{row}</td>
              {displayCellData(val, selectedCategory)}
            </>
          ) : (
            displayCellData(val, selectedCategory)
          )
        )}
      </tr>
    );
  } else if (row === "Actinides") {
    const newTableData = tableData.slice(89, 103);
    // const newTableData2 = tableData.slice(103, 118);
    // const newTableData3 = [...newTableData, ...newTableData2];

    return (
      <tr>
        {newTableData.map((val, i) =>
          i === 0 ? (
            <>
              <td>{row}</td>
              {displayCellData(val, selectedCategory)}
            </>
          ) : (
            displayCellData(val, selectedCategory)
          )
        )}
      </tr>
    );
  }

  return null;
}
export default function PeriodicTableOfElem(props) {
  //   const notificationCtx = useContext(NotificationContext);
  //check category number

  const [selectedCategory, setselectedCategory] = useState();
  const [userGuess, setuserGuess] = useState();
  const [guessCount, setguessCount] = useState(0);
  const [showEndGameBut, setshowEndGameBut] = useState(false);
  const [startButWasClicked, setStartButWasClicked] = useState(false);

  const handleRadioButtonChange = (event) => {
    const { name, value } = event.target;

    console.log({ name, value });
    setselectedCategory(value);
  };

  function elemSortRadioButt(params) {
    return (
      <div style={{ margin: "15px", display: "flex" }}>
        <div
          style={{
            margin: "15px",
            display: "flex",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <input
              type="radio"
              name="element"
              value="Alkali metals"
              id="Alkali-metals"
              onChange={handleRadioButtonChange}
              // checked={selectedElem === "atomic"}
              style={{ margin: "10px" }}
            />
            <label htmlFor="Alkali-metals">Alkali metals</label>
          </div>
          <div>
            <input
              type="radio"
              name="element"
              value="Alkaline earth metals"
              id="Alkaline-earth-metals"
              onChange={handleRadioButtonChange}
              style={{ margin: "10px" }}
            />
            <label htmlFor="Alkaline-earth-metals">Alkaline earth metals</label>
          </div>
          <div>
            <input
              type="radio"
              name="element"
              value="Halogens"
              id="Halogens"
              onChange={handleRadioButtonChange}
              style={{ margin: "10px" }}
            />
            <label htmlFor="Halogens">Halogens</label>
          </div>
          <div>
            <input
              type="radio"
              name="element"
              value="s-block"
              id="s-block"
              onChange={handleRadioButtonChange}
              style={{ margin: "10px" }}
            />
            <label htmlFor="s-block">s-block</label>
          </div>
          <div>
            <input
              type="radio"
              name="element"
              value="d-block"
              id="d-block"
              onChange={handleRadioButtonChange}
              style={{ margin: "10px" }}
            />
            <label htmlFor="d-block">d-block</label>
          </div>
        </div>

        <div
          style={{
            margin: "15px",
            display: "flex",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <input
              type="radio"
              name="element"
              value="Noble gases"
              id="noble-gases"
              onChange={handleRadioButtonChange}
              style={{ margin: "10px" }}
            />
            <label htmlFor="noble-gases">Noble gases</label>
          </div>
          <div>
            <input
              type="radio"
              name="element"
              value="Actinides"
              id="actinides"
              onChange={handleRadioButtonChange}
              style={{ margin: "10px" }}
            />
            <label htmlFor="actinides"> Actinides</label>
          </div>
          <div>
            <input
              type="radio"
              name="element"
              value="Lanthanides"
              id="lanthanides"
              onChange={handleRadioButtonChange}
              style={{ margin: "10px" }}
            />
            <label htmlFor="lanthanides">Lanthanides</label>
          </div>
          <div>
            <input
              type="radio"
              name="element"
              value="p-block"
              id="p-block"
              onChange={handleRadioButtonChange}
              style={{ margin: "10px" }}
            />
            <label htmlFor="p-block">p-block</label>
          </div>
          <div>
            <input
              type="radio"
              name="element"
              value="f-block"
              id="f-block"
              onChange={handleRadioButtonChange}
              style={{ margin: "10px" }}
            />
            <label htmlFor="f-block">f-block</label>
          </div>
        </div>

        <div
          style={{
            margin: "15px",
            display: "flex",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <input
              type="radio"
              name="element"
              value="Metals"
              id="metals"
              onChange={handleRadioButtonChange}
              style={{ margin: "10px" }}
            />
            <label htmlFor="metals">Metals</label>
          </div>
          <div>
            <input
              type="radio"
              name="element"
              value="Non metals"
              id="non-metals"
              onChange={handleRadioButtonChange}
              style={{ margin: "10px" }}
            />
            <label htmlFor="non-metal">Non metals</label>
          </div>
          <div>
            <input
              type="radio"
              name="element"
              value="Metalloids"
              id="metalloids"
              onChange={handleRadioButtonChange}
              style={{ margin: "10px" }}
            />
            <label htmlFor="metalloids">Metalloids</label>
          </div>
          <div>
            <input
              type="radio"
              name="element"
              value="Transition metals"
              id="transition-metals"
              onChange={handleRadioButtonChange}
              style={{ margin: "10px" }}
            />
            <label htmlFor="transition-metals">Transition metals</label>
          </div>
          <div>
            <input
              type="radio"
              name="element"
              value="Unknown properties"
              id="artificial"
              onChange={handleRadioButtonChange}
              style={{ margin: "10px" }}
            />
            <label htmlFor="artificial">Unknown properties</label>
          </div>
        </div>
      </div>
    );
  }
  //GuessElementGame;
  //   const router = useRouter();
  //   const idFromRoute = router.query;

  // const arrangePost = () => {
  //   if (props.posts) {
  //     const newPost = props.posts.map(item=>{
  //       [item.category]:{...}
  //     });
  //   }
  // };
  //   useEffect(() => {
  //     props.onSelectMenu(selectValue);
  //   }, [selectValue]);

  //   const onselectChange = (e) => {
  //     const optionValue = e.target.value;
  //     setselectValue(optionValue);
  //     console.log({ optionValue });
  //     // router.push(`/posts/${optionValue}`);
  //   };

  return (
    <>
      <table className={classes.tableElem}>
        <colgroup>
          <col span={12} />
          <col
            span={7}
            className={
              selectedCategory === "p-block"
                ? classes.pBoundary
                : classes.noPBoundary
            }
          />
        </colgroup>
        <caption>The Periodic Table </caption>
        <thead>
          <TableHead />
        </thead>
        <tbody>
          {rowNum.map((row) => (
            <TableRow
              row={row}
              tableData={elementsArray}
              selectedCategory={selectedCategory}
              setuserGuess={setuserGuess}
              setguessCount={setguessCount}
              guessCount={guessCount}
              setshowEndGameBut={setshowEndGameBut}
              startButWasClicked={startButWasClicked}
            />
          ))}
        </tbody>
      </table>
      <table
        className={classes.tableElem}
        style={{ marginLeft: "20%", marginTop: "5%" }}
      >
        {/* <thead>
          <TableHead />
        </thead> */}
        <tbody>
          {rowLanAndAct.map((row) => (
            <TableRow
              row={row}
              tableData={elementsArray}
              selectedCategory={selectedCategory}
              setuserGuess={setuserGuess}
              setguessCount={setguessCount}
              guessCount={guessCount}
              setshowEndGameBut={setshowEndGameBut}
              startButWasClicked={startButWasClicked}
            />
          ))}
        </tbody>
      </table>
      {elemSortRadioButt()}
      <GuessElementGame
        userGuess={userGuess}
        guessCount={guessCount}
        setguessCount={setguessCount}
        showEndGameBut={showEndGameBut}
        setshowEndGameBut={setshowEndGameBut}
        setuserGuess={setuserGuess}
        setStartButWasClicked={setStartButWasClicked}
        startButWasClicked={startButWasClicked}
      />
    </>
  );
}
