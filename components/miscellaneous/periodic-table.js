import React from "react";
import classes from "./periodic-table.module.css";
import NotificationContext from "../../store/notification-context";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { elementsArray } from "../../helpers/pereriodic-table/element-data";

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
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function TableRow({ row, tableData }) {
  const [idValue, setidValue] = useState();
  const [markBounds, setmarkBounds] = useState(false);
  function handleMouseEnter(paramVal) {
    setidValue(paramVal);
    setmarkBounds(true);
  }
  function handleMouseLeave(params) {
    setmarkBounds(false);
  }

  function displayCellData(cellDatum) {
    return (
      <td
        className={`${classes.dataSmall} ${classes.dataLarge} ${
          markBounds && idValue === cellDatum.atomicNum
            ? classes.showBounds
            : classes.hideBounds
        } `}
        onMouseEnter={() => handleMouseEnter(cellDatum.atomicNum)}
        onMouseLeave={handleMouseLeave}
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
              {displayCellData(val)}
              <td colspan="16"></td>
            </>
          ) : (
            displayCellData(val)
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
                {displayCellData(val)}
              </>
            );
          } else if (i === 1) {
            return displayCellData(val);
          } else if (i === 2) {
            return (
              <>
                <td colspan="10"></td>
                {displayCellData(val)}
              </>
            );
          } else {
            return displayCellData(val);
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
                {displayCellData(val)}
              </>
            );
          } else if (i === 1) {
            return displayCellData(val);
          } else if (i === 2) {
            return (
              <>
                <td colspan="10"></td>
                {displayCellData(val)}
              </>
            );
          } else {
            return displayCellData(val);
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
              {displayCellData(val)}
            </>
          ) : (
            displayCellData(val)
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
              {displayCellData(val)}
            </>
          ) : (
            displayCellData(val)
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
              {displayCellData(val)}
            </>
          ) : (
            displayCellData(val)
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
              {displayCellData(val)}
            </>
          ) : (
            displayCellData(val)
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
              {displayCellData(val)}
            </>
          ) : (
            displayCellData(val)
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
              {displayCellData(val)}
            </>
          ) : (
            displayCellData(val)
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

  //   const [selectValue, setselectValue] = useState();
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
        <caption>The Periodic Table </caption>
        <thead>
          <TableHead />
        </thead>
        <tbody>
          {rowNum.map((row) => (
            <TableRow row={row} tableData={elementsArray} />
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
            <TableRow row={row} tableData={elementsArray} />
          ))}
        </tbody>
      </table>
    </>
  );
}
