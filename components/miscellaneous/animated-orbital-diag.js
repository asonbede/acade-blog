//import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";

function AnimatedObitalDiag(props) {
  const { post } = props;
  //   const notificationCtx = useContext(NotificationContext);
  const [selectValue, setselectValue] = useState("11");
  const onselectChange = (e) => {
    // setisLoading(true);
    const optionValue = e.target.value;
    setselectValue(optionValue);
    // setChangerValue(!changerValue);
    console.log({ optionValue });
    // router.push(`/posts/${optionValue}`);
    // if (typeof window !== "undefined") {
    //   window.localStorage.setItem("select-value", optionValue);
    // }
  };
  function drawText(xValue, yValue, textValue) {
    return (
      <text
        x={xValue}
        y={yValue}
        style={{ fill: "purple", stroke: "purple", fontSize: "20px" }}
      >
        {textValue}
      </text>
    );
  }
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

  function drawElectronLine(x1, y1, x2, y2) {
    return (
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        style={{
          stroke: "red",
          strokeWidth: "1px",

          markerEnd: "url(#markerArrow)",
        }}
      />
    );
  }

  function sOrbitalWith2Elect(xValue, yValue) {
    return (
      <svg x={xValue} y={yValue} width="60" height="60">
        <g
          style={{
            stroke: "purple",
            strokeWidth: "2px",
            fill: "none",
            fontSize: "20px",
          }}
        >
          <rect
            x="10"
            y="10"
            height="48"
            width="48"
            style={{ strokeWidth: "2px", fill: "none", fontSize: "20px" }}
          />
          {drawLineEndMarker()}

          {drawElectronLine("22", "50", "22", "24")}

          {drawElectronLine("40", "16", "40", "44")}
        </g>
      </svg>
    );
  }

  function sOrbitalWith1Elect(xValue, yValue) {
    return (
      <svg x={xValue} y={yValue} width="60" height="60">
        <g
          style={{
            stroke: "purple",
            strokeWidth: "2px",
            fill: "none",
            fontSize: "20px",
          }}
        >
          <rect
            x="10"
            y="10"
            height="48"
            width="48"
            style={{
              strokeWidth: "2px",
              fill: "none",
              fontSize: "20px",
            }}
          />

          {drawLineEndMarker()}

          {drawElectronLine("24", "50", "24", "24")}
        </g>
      </svg>
    );
  }
  function porbitalWith6Elect(xValue, yValue) {
    return (
      <svg x={xValue} y={yValue} width="270" height="90">
        <g
          style={{
            stroke: "blue",
            strokeWidth: "2px",
            fill: "none",
            fontSize: "20px",
          }}
        >
          <path
            d="M10,20
              L240,20 L240, 70  M10, 70 L240 70 M10 20 L10 70 M80 20 L80 70  M160 20 L160 70"
          />

          {drawLineEndMarker()}

          {drawElectronLine("36", "62", "36", "32")}

          {drawElectronLine("120", "62", "120", "32")}

          {drawElectronLine("200", "62", "200", "32")}

          {drawElectronLine("58", "26", "58", "56")}

          {drawElectronLine("222", "26", "222", "56")}

          {drawElectronLine("144", "26", "144", "56")}

          {/* 3s react */}
        </g>
      </svg>
    );
  }

  function dorbitalWithTenElect(xValue, yValue) {
    <svg x={xValue} y={yValue} width="420" height="90">
      {/* <!-- d rect --> */}
      <g
        style={{
          stroke: "green",
          strokeWidth: "2px",
          fill: "none",
          fontSize: "20px",
        }}
      >
        <path
          d="M10,20
              L400,20 L400, 70  M10, 70 L400 70 M10 20 L10 70 M80 20 L80 70  M160 20 L160 70 M240 20 L240 70 M320 20 L320 70"
        />

        {drawLineEndMarker()}

        {/* <!--  electrons --> */}
        {/* <line
          x1="34"
          y1="66"
          x2="34"
          y2="32"
          style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
        /> */}
        {drawElectronLine("34", "66", "34", "32")}

        {/* <line
          x1="115"
          y1="66"
          x2="115"
          y2="32"
          style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
        /> */}
        {drawElectronLine("115", "66", "115", "32")}

        {/* <line
          x1="195"
          y1="66"
          x2="195"
          y2="32"
          style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
        /> */}
        {drawElectronLine("195", "66", "195", "32")}
        {/* <line
          x2="229"
          y2="58"
          x1="229"
          y1="28"
          style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
        /> */}
        {drawElectronLine("229", "28", "229", "58")}

        {/* <line
          x1="275"
          y1="66"
          x2="275"
          y2="32"
          style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
        /> */}
        {drawElectronLine("275", "66", "275", "32")}

        {/* <line
          x1="360"
          y1="66"
          x2="360"
          y2="32"
          style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
        /> */}
        {drawElectronLine("360", "66", "360", "32")}

        {/* <line
          x2="58"
          y2="58"
          x1="58"
          y1="26"
          style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
        /> */}
        {drawElectronLine("58", "26", "58", "58")}

        {/* <line
          x2="144"
          y2="58"
          x1="144"
          y1="26"
          style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
        /> */}
        {drawElectronLine("144", "26", "144", "58")}
        {/* 
        <line
          x2="304"
          y2="58"
          x1="304"
          y1="26"
          style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
        /> */}
        {drawElectronLine("304", "26", "304", "58")}

        {/* <line
          x2="328"
          y2="58"
          x1="328"
          y1="26"
          style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
        /> */}
        {drawElectronLine("328", "26", "328", "58")}
      </g>
    </svg>;
  }
  function displaySelect() {
    return (
      <>
        <label htmlFor="selectElem">
          {" "}
          Select An Element To See Its Orbital Electron Config
        </label>
        <br />
        <select
          id="selectElem"
          name="elements"
          value={selectValue}
          onChange={onselectChange}
        >
          <optgroup label="Akali Metals">
            <option value="3">Lithium(Li)</option>
            <option value="11">Sodium(Na)</option>
            <option value="19">Potassium(K)</option>
            <option value="37">Rubidium(Rb)</option>
            <option value="55">Caesium(Cs)</option>
            <option value="87">Francium(Fr)</option>
          </optgroup>
          <optgroup label="Alkaline Earth Metals">
            <option value="4">Beryllium(Be)</option>
            <option value="12">Magnesium(Mg)</option>
            <option value="20">Calcium(Ca)</option>
            <option value="38">Strontium(Sr)</option>
            <option value="56">Barium(Ba)</option>
            <option value="88">Radium(Ra)</option>
          </optgroup>
        </select>
      </>
    );
  }

  if (selectValue === "11") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="85%"
          height="800"
          style={{
            border: "2px solid red",
            minWidth: "300px",
            maxWidth: "900px",
            // overflow: "scroll",
            // display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("20%", "80%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("20%", "500")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("35%", "57%")}

          {/* 3s-rect-orbital-1-electron */}
          {sOrbitalWith1Elect("20%", "45%")}

          {/* 1s text */}
          {drawText("21%", "80%", "1s")}
          {/* 2s text */}
          {drawText("22%", "495", "2s")}
          {/* 2p text */}
          {drawText("48%", "58%", "2p")}
          {/* 3s text */}
          {drawText("21%", "45%", "3s")}
          {/* select text */}
          {/* {drawText("65%", "680", "Select an element")} */}
          <foreignObject x="75%" y="700" width="100" height="100">
            <body xmlns="http://www.w3.org/1999/xhtml">
              {/* <button
              onClick={() => console.log("button was clicked inside svg")}
            >
              click me
            </button> */}

              {/* <label>Select an element</label> */}
            </body>
          </foreignObject>
        </svg>
        <br />
        {displaySelect()}
      </>
    );
  } else if (selectValue === "19") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="85%"
          height="700"
          style={{
            border: "2px solid red",
            minWidth: "300px",
            maxWidth: "900px",
            // overflow: "scroll",
            // display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("20%", "80%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("20%", "60%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("35%", "57%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("20%", "45%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("35%", "40%")}

          {/* 4s-rect-orbital-1-electron */}
          {sOrbitalWith1Elect("20%", "30%")}

          {/* 1s text */}
          {drawText("21%", "80%", "1s")}
          {/* 2s text */}
          {drawText("22%", "60%", "2s")}
          {/* 2p text */}
          {drawText("48%", "58%", "2p")}
          {/* 3s text */}
          {drawText("21%", "45%", "3s")}

          {/* 3p text */}
          {drawText("48%", "41%", "3p")}

          {/* 4s text */}
          {drawText("21%", "30%", "4s")}
          {/* select text */}
          {/* {drawText("65%", "680", "Select an element")} */}
          <foreignObject x="75%" y="700" width="100" height="100">
            <body xmlns="http://www.w3.org/1999/xhtml">
              {/* <button
              onClick={() => console.log("button was clicked inside svg")}
            >
              click me
            </button> */}

              {/* <label>Select an element</label> */}
            </body>
          </foreignObject>
        </svg>
        <br />
        {displaySelect()}
      </>
    );
  } else if (selectValue === "3") {
    {
      return (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="85%"
            height="300"
            style={{
              border: "2px solid red",
              minWidth: "300px",
              maxWidth: "900px",
              // overflow: "scroll",
              // display: "block",
            }}
          >
            {/* 1s react:2electron */}
            {sOrbitalWith2Elect("20%", "80%")}
            {/* 2s-rect-orbital-1-electron */}
            {sOrbitalWith1Elect("20%", "45%")}

            {/* 1s text */}
            {drawText("21%", "80%", "1s")}
            {/* 2s text */}
            {drawText("22%", "43%", "2s")}

            {/* select text */}
            {/* {drawText("65%", "680", "Select an element")} */}
            <foreignObject x="75%" y="700" width="100" height="100">
              <body xmlns="http://www.w3.org/1999/xhtml">
                {/* <button
              onClick={() => console.log("button was clicked inside svg")}
            >
              click me
            </button> */}

                {/* <label>Select an element</label> */}
              </body>
            </foreignObject>
          </svg>
          <br />
          {displaySelect()}
        </>
      );
    }
  } else if (selectValue === "4") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="85%"
          height="300"
          style={{
            border: "2px solid red",
            minWidth: "300px",
            maxWidth: "900px",
            // overflow: "scroll",
            // display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("20%", "80%")}

          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("20%", "45%")}

          {/* 1s text */}
          {drawText("21%", "80%", "1s")}
          {/* 2s text */}
          {drawText("22%", "43%", "2s")}

          {/* select text */}
          {/* {drawText("65%", "680", "Select an element")} */}
          <foreignObject x="75%" y="700" width="100" height="100">
            <body xmlns="http://www.w3.org/1999/xhtml">
              {/* <button
              onClick={() => console.log("button was clicked inside svg")}
            >
              click me
            </button> */}

              {/* <label>Select an element</label> */}
            </body>
          </foreignObject>
        </svg>
        <br />
        {displaySelect()}
      </>
    );
  } else if (selectValue === "12") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="85%"
          height="700"
          style={{
            border: "2px solid red",
            minWidth: "300px",
            maxWidth: "900px",
            // overflow: "scroll",
            // display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("20%", "90%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("20%", "500")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("34%", "64%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("20%", "48%")}

          {/* 1s text */}
          {drawText("21%", "90%", "1s")}
          {/* 2s text */}
          {drawText("22%", "495", "2s")}
          {/* 2p text */}
          {drawText("48%", "65%", "2p")}
          {/* 3s text */}
          {drawText("21%", "48%", "3s")}
          {/* select text */}
          {/* {drawText("65%", "680", "Select an element")} */}
          <foreignObject x="75%" y="700" width="100" height="100">
            <body xmlns="http://www.w3.org/1999/xhtml">
              {/* <button
              onClick={() => console.log("button was clicked inside svg")}
            >
              click me
            </button> */}

              {/* <label>Select an element</label> */}
            </body>
          </foreignObject>
        </svg>
        <br />
        {displaySelect()}
      </>
    );
  } else if (selectValue === "20") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="85%"
          height="700"
          style={{
            border: "2px solid red",
            minWidth: "300px",
            maxWidth: "900px",
            // overflow: "scroll",
            // display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("20%", "80%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("20%", "60%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("35%", "57%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("20%", "45%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("35%", "40%")}

          {/* 4s-rect-orbital-1-electron */}

          {sOrbitalWith2Elect("20%", "30%")}

          {/* 1s text */}
          {drawText("21%", "80%", "1s")}
          {/* 2s text */}
          {drawText("22%", "60%", "2s")}
          {/* 2p text */}
          {drawText("48%", "58%", "2p")}
          {/* 3s text */}
          {drawText("21%", "45%", "3s")}

          {/* 3p text */}
          {drawText("48%", "41%", "3p")}

          {/* 4s text */}
          {drawText("21%", "30%", "4s")}
          {/* select text */}
          {/* {drawText("65%", "680", "Select an element")} */}
          <foreignObject x="75%" y="700" width="100" height="100">
            <body xmlns="http://www.w3.org/1999/xhtml">
              {/* <button
              onClick={() => console.log("button was clicked inside svg")}
            >
              click me
            </button> */}

              {/* <label>Select an element</label> */}
            </body>
          </foreignObject>
        </svg>
        <br />
        {displaySelect()}
      </>
    );
  } else if (selectValue === "38") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="85%"
          height="700"
          style={{
            border: "2px solid red",
            minWidth: "300px",
            maxWidth: "900px",
            // overflow: "scroll",
            // display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("20%", "80%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("20%", "60%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("35%", "57%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("20%", "45%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("35%", "40%")}

          {/* 4s-rect-orbital-1-electron */}

          {sOrbitalWith2Elect("20%", "30%")}

          {/* 1s text */}
          {drawText("21%", "80%", "1s")}
          {/* 2s text */}
          {drawText("22%", "60%", "2s")}
          {/* 2p text */}
          {drawText("48%", "58%", "2p")}
          {/* 3s text */}
          {drawText("21%", "45%", "3s")}

          {/* 3p text */}
          {drawText("48%", "41%", "3p")}

          {/* 4s text */}
          {drawText("21%", "30%", "4s")}
          {/* select text */}
          {/* {drawText("65%", "680", "Select an element")} */}
          <foreignObject x="75%" y="700" width="100" height="100">
            <body xmlns="http://www.w3.org/1999/xhtml">
              {/* <button
              onClick={() => console.log("button was clicked inside svg")}
            >
              click me
            </button> */}

              {/* <label>Select an element</label> */}
            </body>
          </foreignObject>
        </svg>
        <br />
        {displaySelect()}
      </>
    );
  }

  return null;
}

export default AnimatedObitalDiag;
