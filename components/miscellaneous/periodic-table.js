import React, { useState, useContext, useEffect } from "react";
import classes from "./periodic-table.module.css";
import NotificationContext from "../../store/notification-context";

import Notification from "../ui/notification";

import { useRouter } from "next/router";
import { elementsArray } from "../../helpers/pereriodic-table/element-data";
import GuessElementGame from "./quess-element";
import PeriodicTrend from "./periodic-trend";
const rowNum = [1, 2, 3, 4, 5, 6, 7];
const rowLanAndAct = ["Lanthanides", "Actinides"];

function TableHead({ handleColumnBound }) {
  return (
    <tr>
      <th>Groups/Periods</th>
      <th className={classes.pointerClass} onClick={() => handleColumnBound(1)}>
        1
      </th>
      <th className={classes.pointerClass} onClick={() => handleColumnBound(2)}>
        2
      </th>
      <th colspan="10"></th>
      <th className={classes.pointerClass} onClick={() => handleColumnBound(3)}>
        3
      </th>
      <th className={classes.pointerClass} onClick={() => handleColumnBound(4)}>
        4
      </th>
      <th className={classes.pointerClass} onClick={() => handleColumnBound(5)}>
        5
      </th>
      <th className={classes.pointerClass} onClick={() => handleColumnBound(6)}>
        6
      </th>
      <th className={classes.pointerClass} onClick={() => handleColumnBound(7)}>
        7
      </th>
      <th className={classes.pointerClass} onClick={() => handleColumnBound(0)}>
        0
      </th>
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
  groupNum,
  setgroupNum,
  isgroup,
  capitalizeFirstLetter,
  addFamilyBoundClass,
  rowData,
  isRow,
  handleRowBound,
  setrowData,
}) {
  const [idValue, setidValue] = useState();
  const [markBounds, setmarkBounds] = useState(false);
  // const [rowData, setrowData] = useState(null);
  //const [isRow, setisRow] = useState(false);
  const notificationCtx = useContext(NotificationContext);

  //userQuess={userQuess} guessCount={quessCount} setguessCount={setguessCount}

  // <button
  //   onClick={(e) => {
  //     if (e.detail === 1) handleClick();
  //     if (e.detail === 2) handleDoubleClick();
  //   }}
  // >
  //   Click me
  // </button>;

  useEffect(() => {
    setTimeout(function () {
      setrowData(null);
    }, 9000);
  }, [isRow]);

  useEffect(() => {
    setTimeout(function () {
      setgroupNum(null);
    }, 9000);
  }, [isgroup]);
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
      notificationCtx.showNotification({
        title: "Error!",
        message: "Click the start button before you continue!",
        status: "error",
      });
      console.log(
        "please click the start button first if it is game you want play game"
      );
    }
  }
  // function capitalizeFirstLetter(string) {
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // }
  // function addFamilyBoundClass(catValue, elemOby) {
  //   if (catValue === elemOby.category) {
  //     return classes.familyBonds;
  //   } else if (
  //     catValue === "s-block" &&
  //     (elemOby.category === "Alkali metals" ||
  //       elemOby.category === "Alkaline earth metals")
  //   ) {
  //     return classes.familyBonds;
  //   } else if (
  //     catValue === "d-block" &&
  //     elemOby.category === "Transition metals"
  //   ) {
  //     return classes.familyBonds;
  //   } else if (
  //     catValue === "f-block" &&
  //     (elemOby.category === "Lanthanides" || elemOby.category === "Actinides")
  //   ) {
  //     return classes.familyBonds;
  //   } else if (
  //     catValue === "Non metals" &&
  //     elemOby.stateStatus === "nonmetal"
  //   ) {
  //     return classes.familyBonds;
  //   } else if (catValue === "Metals" && !elemOby.stateStatus) {
  //     return classes.familyBonds;
  //   } else if (
  //     catValue === "p-block" &&
  //     (elemOby.group === 3 ||
  //       elemOby.group === 4 ||
  //       elemOby.group === 5 ||
  //       elemOby.group === 6 ||
  //       elemOby.group === 7 ||
  //       elemOby.group === 0)
  //   ) {
  //     return classes.familyBonds;
  //   }

  //   return classes.noBounds;
  // }

  function addRowBoundClass(elemOby) {
    // console.log({ rowData, rowBonds });
    let bondClass = "";
    if (rowData === elemOby.period) {
      console.log("one");
      bondClass = classes.rowBonds;
    }

    if (bondClass) {
      return bondClass;
    }
  }

  function addColumnBoundClass(elemOby) {
    // console.log({ rowData, rowBonds });

    if (groupNum === elemOby.group) {
      console.log("one");
      return classes.groupBonds;
    }
  }

  function displayCellData(cellDatum, selectedCat) {
    // console.log(addFamilyBoundClass(selectedCat, cellDatum), "from-trend-fun3");
    return (
      <td
        className={`${classes.dataSmall} ${classes.dataLarge} ${
          markBounds && idValue === cellDatum.atomicNum
            ? classes.showBounds
            : classes.hideBounds
        }  ${addFamilyBoundClass(selectedCat, cellDatum)} 
        ${addRowBoundClass(cellDatum)}    ${addColumnBoundClass(cellDatum)}`}
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
              <td
                onClick={() => handleRowBound(row)}
                className={classes.pointerClass}
              >
                {row}
              </td>
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
                <td
                  onClick={() => handleRowBound(row)}
                  className={classes.pointerClass}
                >
                  {row}
                </td>
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
                <td
                  onClick={() => handleRowBound(row)}
                  className={classes.pointerClass}
                >
                  {row}
                </td>
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
              <td
                onClick={() => handleRowBound(row)}
                className={classes.pointerClass}
              >
                {row}
              </td>
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
              <td
                onClick={() => handleRowBound(row)}
                className={classes.pointerClass}
              >
                {row}
              </td>
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
    //const lant= tableData.slice(57, 71);
    const newTableData3 = [...newTableData, ...newTableData2];

    return (
      <tr>
        {newTableData3.map((val, i) =>
          i === 0 ? (
            <>
              <td
                onClick={() => handleRowBound(row)}
                className={classes.pointerClass}
              >
                {row}
              </td>
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
              <td
                onClick={() => handleRowBound(row)}
                className={classes.pointerClass}
              >
                {row}
              </td>
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
  const [groupNum, setgroupNum] = useState();
  const [isgroup, setisgroup] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [rowData, setrowData] = useState(null);
  const [isRow, setisRow] = useState(false);
  const breakPoint = 1300;

  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;
  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    //subscribe to window resize event oncomponent mount
    window.addEventListener("resize", handleResizeWindow);

    return () => {
      //unsubscribe "onComponentDestroy"
      window.removeEventListener("resize", handleResizeWindow);
      //setselectedCategory(null);
    };
  }, []);

  const handleRadioButtonChange = (event) => {
    const { name, value } = event.target;

    console.log({ name, value });
    setselectedCategory(value);
    setgroupNum(null);
    setrowData(null);
  };

  function handleColumnBound(groupValue) {
    setisgroup(!isgroup);
    setgroupNum(groupValue);
    setselectedCategory(null);
    setrowData(null);
  }
  function handleRowBound(rowDataValue) {
    setisRow(!isRow);
    setrowData(rowDataValue);
    setselectedCategory(null);
    setgroupNum(null);
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  function addFamilyBoundClass(catValue, elemOby) {
    if (catValue === elemOby.category) {
      console.log("check1");
      return classes.familyBonds;
    } else if (
      catValue === "s-block" &&
      (elemOby.category === "Alkali metals" ||
        elemOby.category === "Alkaline earth metals")
    ) {
      console.log("check2");
      return classes.familyBonds;
    } else if (
      catValue === "d-block" &&
      elemOby.category === "Transition metals"
    ) {
      console.log("check3");
      return classes.familyBonds;
    } else if (
      catValue === "f-block" &&
      (elemOby.category === "Lanthanides" || elemOby.category === "Actinides")
    ) {
      console.log("check4");
      return classes.familyBonds;
    } else if (
      catValue === "Non metals" &&
      elemOby.stateStatus === "nonmetal"
    ) {
      console.log("check5");
      return classes.familyBonds;
    } else if (catValue === "Metals" && !elemOby.stateStatus) {
      return classes.familyBonds;
    } else if (
      catValue === "p-block" &&
      (elemOby.group === 3 ||
        elemOby.group === 4 ||
        elemOby.group === 5 ||
        elemOby.group === 6 ||
        elemOby.group === 7 ||
        elemOby.group === 0)
    ) {
      console.log("check6");
      return classes.familyBonds;
    }
    console.log("check7");
    return classes.noBounds;
  }

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
        <div
          style={{
            margin: "15px",
            display: "flex",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            {" "}
            <input
              type="radio"
              name="element"
              value="null"
              id="artificial"
              onChange={handleRadioButtonChange}
              style={{ margin: "10px" }}
            />
            <label htmlFor="artificial">Clear Bounds</label>
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
      {width > breakPoint ? (
        <>
          <table className={classes.tableElem}>
            <caption>The Periodic Table </caption>
            <thead>
              <TableHead handleColumnBound={handleColumnBound} />
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
                  groupNum={groupNum}
                  setgroupNum={setgroupNum}
                  isgroup={isgroup}
                  capitalizeFirstLetter={capitalizeFirstLetter}
                  addFamilyBoundClass={addFamilyBoundClass}
                  handleRowBound={handleRowBound}
                  rowData={rowData}
                  isRow={isRow}
                  setrowData={setrowData}
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
                  groupNum={groupNum}
                  setgroupNum={setgroupNum}
                  isgroup={isgroup}
                  capitalizeFirstLetter={capitalizeFirstLetter}
                  addFamilyBoundClass={addFamilyBoundClass}
                  handleRowBound={handleRowBound}
                  rowData={rowData}
                  isRow={isRow}
                  setrowData={setrowData}
                />
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <PeriodicTrend
          selectedCategory={selectedCategory}
          setselectedCategory={setselectedCategory}
          capitalizeFirstLetter={capitalizeFirstLetter}
          addFamilyBoundClass={addFamilyBoundClass}
          setuserGuess={setuserGuess}
          setguessCount={setguessCount}
          guessCount={guessCount}
          setshowEndGameBut={setshowEndGameBut}
          startButWasClicked={startButWasClicked}
          handleColumnBound={handleColumnBound}
          groupNum={groupNum}
          handleRowBound={handleRowBound}
          rowData={rowData}
          isRow={isRow}
          setrowData={setrowData}
        />
      )}
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
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
}
