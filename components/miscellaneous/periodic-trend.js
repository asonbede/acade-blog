//PeriodicTrends;

import { useState, useEffect } from "react";
import { elementsArray } from "../../helpers/pereriodic-table/element-data";
// import {
//   drawLineEndMarker,
//   drawText,
//   drawElectronLine,
// } from "../../helpers/pereriodic-table/draw-orbitals";

function PeriodicTrends(props) {
  const [moderatedValue, setmoderatedValue] = useState();
  const [localStorageSet, setlocalStorageSet] = useState(false);
  const rowNum = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ];
  const rowValue = [1, 2, 3, 4, 5, 6, 7, "Lanthanides", "Actinides"];
  const rowLanAndAct = ["Lanthanides", "Actinides"];
  function getRowNum(rowNumber) {
    if (rowNumber === 1) {
      const rowData1 = elementsArray.slice(0, 2);
      const dumbArray1 = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
      ];
      const rowData1Processed = [rowData1[0], ...dumbArray1, rowData1[1]];
      return rowData1Processed;
    } else if (rowNumber === 2) {
      const rowData2 = elementsArray.slice(2, 10);
      const dumbArray2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      rowData2.splice(2, 0, ...dumbArray2);

      return rowData2;
    } else if (rowNumber === 3) {
      const rowData3 = elementsArray.slice(10, 18);
      const dumbArray2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      rowData3.splice(2, 0, ...dumbArray2);

      return rowData3;
    } else if (rowNumber === 4) {
      const rowData4 = elementsArray.slice(18, 36);

      return rowData4;
    } else if (rowNumber === 5) {
      const rowData5 = elementsArray.slice(36, 54);

      return rowData5;
    } else if (rowNumber === 6) {
      const rowData6a = elementsArray.slice(54, 57);
      const rowData6b = elementsArray.slice(71, 86);

      const rowData6 = [...rowData6a, ...rowData6b];
      return rowData6;
    } else if (rowNumber === 7) {
      const rowData7a = elementsArray.slice(86, 89);
      const rowData7b = elementsArray.slice(103, 118);
      const rowData7 = [...rowData7a, ...rowData7b];
      return rowData7;
    } else if (rowNumber == "Lanthanides") {
      const newTableData = elementsArray.slice(57, 71);
      const dumbArrayLan = [1, 2, 3, 4];
      newTableData.splice(0, 0, ...dumbArrayLan);
      return newTableData;
    } else if (rowNumber === "Actinides") {
      const newTableData = elementsArray.slice(89, 103);
      const dumbArrayAct = [1, 2, 3, 4];
      newTableData.splice(0, 0, ...dumbArrayAct);
      return newTableData;
    }
  }

  function drawRect(x, y, elemData) {
    return (
      <svg
        x={`${x}`}
        y={`${y}`}
        width="70"
        height="70"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 70 70"
      >
        <g>
          <rect
            x="0"
            y="0"
            width="60"
            height="60"
            fill="none"
            stroke="red"
            style={{ strokeWidth: "2px" }}
          ></rect>
          <text x="15" y="40" fontFamily="Verdana" fontSize="15" fill="blue">
            <tspan> {elemData.symbol}</tspan>

            <tspan dy="15" dx="-25">
              {" "}
              {elemData.atomicNum}
            </tspan>
          </text>
        </g>
      </svg>
    );
  }

  function drawSquare(params) {
    let x1 = 60;
    let y1 = 60;
    // const lineWith = 100;
    // const lineHeight = 100;
    let attribut = [];

    for (let i = 0; i < rowValue.length; i++) {
      const element1 = rowValue[i];
      const rowArray = getRowNum(element1);
      y1 = element1 === "Lanthanides" ? y1 + 110 : y1 + 60;
      for (let index = 0; index < rowArray.length; index++) {
        const element2 = rowArray[index];
        if (element1 === 1 && index + 1 > 1 && index + 1 < 18) {
          x1 = x1 + 60;
          console.log("hello34");
          continue;
        }

        if (element1 === 2 && index + 1 > 2 && index + 1 < 13) {
          x1 = x1 + 60;
          console.log("hello");
          continue;
        }
        if (element1 === 3 && index + 1 > 2 && index + 1 < 13) {
          x1 = x1 + 60;
          console.log("hello");
          continue;
        }
        if (element1 === "Lanthanides" && index < 4) {
          x1 = x1 + 60;
          console.log("hello");
          continue;
        }
        if (element1 === "Actinides" && index < 4) {
          x1 = x1 + 60;
          console.log("hello");
          continue;
        }

        console.log("hello2");

        attribut = [...attribut, drawRect(x1, y1, element2)];

        x1 = x1 + 60;
      }
      x1 = 60;
      //   y1 = element1 === "Lanthanides" ? y1 + 80 : y1 + 60;
    }
    return attribut;

    //mySvgPath.setAttribute("d", attribut);
  }
  //console.log(drawSquare(), "square");
  function drawLineEndMarker(params) {
    return (
      <>
        <defs>
          <marker
            id="markerArrow"
            markerWidth="13"
            markerHeight="13"
            refX="2"
            refY="6"
            orient="auto"
          >
            <path
              d="M2,2 L2,11 L10,6 L2,2"
              style={{ fill: "black", stroke: "black" }}
            />
          </marker>
        </defs>
      </>
    );
  }
  function drawText(xValue, yValue, textValue) {
    return (
      <text
        x={xValue}
        y={yValue}
        fontFamily="Verdana"
        fontSize="25"
        fill="blue"
      >
        {textValue}
      </text>
    );
  }

  function drawLine(x1, y1, x2, y2) {
    return (
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        style={{
          stroke: "red",
          strokeWidth: "2px",

          markerEnd: "url(#markerArrow)",
        }}
      />
    );
  }

  return (
    // <div style={{ width: "80%", margin: "0 auto", border: "1px solid red" }}>
    <svg
      id="mySVG"
      width="900"
      height="700"
      style={{ margin: "50", border: "2px solid blue" }}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 1200 600"
    >
      {drawLineEndMarker()}
      {/*increasing ionization energy line */}
      {drawLine("50", "30", "1100", "30")}
      {/* increasing electronegativity line */}
      {drawLine("60", "-30", "1100", "-30")}
      {/* increasing atomic radius line */}
      {drawLine("1100", "-90", "80", "-90")}

      {drawText("300", "-100", "Increasing Atomic Radius")}

      {drawText("300", "-35", "Increasing Electronegativity")}

      {drawText("300", "20", "Increasing Ionization Energy")}
      {/*  Increasing Ionization Energy And Electronegativity */}
      {drawLine("40", "550", "40", "-110")}
      <text
        x="25"
        y="-100"
        fontFamily="Verdana"
        fontSize="25"
        fill="blue"
        style={{ writingMode: "tb" }}
      >
        Increasing Ionization Energy And Electronegativity
      </text>

      {drawLine("1165", "-110", "1165", "500")}
      <text
        x="1180"
        y="-80"
        fontFamily="Verdana"
        fontSize="25"
        fill="blue"
        style={{ writingMode: "tb" }}
      >
        Increasing Atomic Radius
      </text>
      <text
        x="60"
        y="750"
        style={{ fontStyle: "italic" }}
        fontFamily="Verdana"
        fontSize="15"
        fill="blue"
      >
        Asonye Bede
      </text>
      {/* {drawText("60", "520", "Asonye Bede")} */}
      {drawSquare()}
      {/* <path
        d="M2,2 L2,11 L10,6 L2,2"
        style={{ fill: "black", stroke: "black" }}
      /> */}
      <path
        d="M200,450
             A70,70 0 0,1 320,610"
        style={{
          stroke: "green",
          fill: "none",
          markerEnd: "url(#markerArrow)",
        }}
      />
      <path
        d="M200,500
             A70,70 0 0,0 320,670"
        style={{
          stroke: "green",
          fill: "none",
          markerEnd: "url(#markerArrow)",
        }}
      />
    </svg>
    // </div>
  );
}

export default PeriodicTrends;
