//import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import { elementsArray } from "../../helpers/pereriodic-table/element-data";
//console.log({ elementsArray });
import {
  sOrbitalWith1Elect,
  sOrbitalWith2Elect,
  porbitalWith1Elect,
  porbitalWith2Elect,
  porbitalWith3Elect,
  porbitalWith4Elect,
  porbitalWith5Elect,
  porbitalWith6Elect,
  dorbitalWith1Elect,
  dorbitalWith2Elect,
  dorbitalWith3Elect,
  dorbitalWith4Elect,
  dorbitalWith5Elect,
  dorbitalWith6Elect,
  dorbitalWith7Elect,
  dorbitalWith8Elect,
  dorbitalWith9Elect,
  dorbitalWithTenElect,
  forbitalWith1Elect,
  forbitalWith2Elect,
  forbitalWith3Elect,
  forbitalWith4Elect,
  forbitalWith5Elect,
  forbitalWith6Elect,
  forbitalWith7Elect,
  forbitalWith8Elect,
  forbitalWith9Elect,
  forbitalWith10Elect,
  forbitalWith11Elect,
  forbitalWith12Elect,
  forbitalWith13Elect,
  forbitalWith14Elect,
  drawText,
} from "../../helpers/pereriodic-table/draw-orbitals";

function AnimatedObitalDiag(props) {
  const { post } = props;
  //   const notificationCtx = useContext(NotificationContext);
  const [selectValue, setselectValue] = useState("11");
  const [selectedElem, setselectedElem] = useState();
  const onselectChange = (e) => {
    // setisLoading(true);
    const optionValue = e.target.value;
    setselectValue(optionValue);
    // setChangerValue(!changerValue);
    console.log({ optionValue });
    console.log({ elementsArray });
    // router.push(`/posts/${optionValue}`);
    // if (typeof window !== "undefined") {
    //   window.localStorage.setItem("select-value", optionValue);
    // }
  };

  useEffect(() => {
    setselectedElem("atomic");
  }, []);

  useEffect(() => {
    displaySelect();
  }, [selectedElem]);

  const arrangePostByCategory = () => {
    console.log("arrange-called");
    const newPosts = [];
    const catArray = [];

    for (let index = 0; index < elementsArray.length; index++) {
      const element = elementsArray[index];

      const cat =
        selectedElem === "family"
          ? element.category
          : element.name[0].toUpperCase();
      console.log({ cat });
      if (catArray.indexOf(cat) > -1) {
        continue;
      }
      catArray.push(cat);
      newPosts.push({
        category: cat,
        posts:
          selectedElem === "family"
            ? elementsArray.filter((item) => item.category === cat)
            : elementsArray.filter(
                (item) => item.name[0].toUpperCase() === cat
              ),
      });
    }
    newPosts.sort((a, b) => (a.category < b.category ? -1 : 1));

    console.log({ catArray });
    console.log({ newPosts });
    return newPosts;
  };

  // function drawText(xValue, yValue, textValue) {
  //   return (
  //     <text
  //       x={xValue}
  //       y={yValue}
  //       style={{ fill: "purple", stroke: "purple", fontSize: "20px" }}
  //     >
  //       {textValue}
  //     </text>
  //   );
  // }
  // function drawLineEndMarker(params) {
  //   return (
  //     <>
  //       <defs>
  //         <marker
  //           id="markerArrow"
  //           markerWidth="13"
  //           markerHeight="13"
  //           refX="2"
  //           refY="6"
  //           orient="auto"
  //         >
  //           <path
  //             d="M2,2 L2,11 L10,6 L2,2"
  //             style={{ fill: "black", stroke: "black" }}
  //           />
  //         </marker>
  //       </defs>
  //     </>
  //   );
  // }

  // function drawElectronLine(x1, y1, x2, y2) {
  //   return (
  //     <line
  //       x1={x1}
  //       y1={y1}
  //       x2={x2}
  //       y2={y2}
  //       style={{
  //         stroke: "red",
  //         strokeWidth: "1px",

  //         markerEnd: "url(#markerArrow)",
  //       }}
  //     />
  //   );
  // }

  // function sOrbitalWith2Elect(xValue, yValue) {
  //   return (
  //     <svg x={xValue} y={yValue} width="60" height="60">
  //       <g
  //         style={{
  //           stroke: "purple",
  //           strokeWidth: "2px",
  //           fill: "none",
  //           fontSize: "20px",
  //         }}
  //       >
  //         <rect
  //           x="10"
  //           y="10"
  //           height="48"
  //           width="48"
  //           style={{ strokeWidth: "2px", fill: "none", fontSize: "20px" }}
  //         />
  //         {drawLineEndMarker()}

  //         {drawElectronLine("22", "50", "22", "24")}

  //         {drawElectronLine("40", "16", "40", "44")}
  //       </g>
  //     </svg>
  //   );
  // }

  // function sOrbitalWith1Elect(xValue, yValue) {
  //   return (
  //     <svg x={xValue} y={yValue} width="60" height="60">
  //       <g
  //         style={{
  //           stroke: "purple",
  //           strokeWidth: "2px",
  //           fill: "none",
  //           fontSize: "20px",
  //         }}
  //       >
  //         <rect
  //           x="10"
  //           y="10"
  //           height="48"
  //           width="48"
  //           style={{
  //             strokeWidth: "2px",
  //             fill: "none",
  //             fontSize: "20px",
  //           }}
  //         />

  //         {drawLineEndMarker()}

  //         {drawElectronLine("24", "50", "24", "24")}
  //       </g>
  //     </svg>
  //   );
  // }
  // function porbitalWith6Elect(xValue, yValue) {
  //   return (
  //     <svg x={xValue} y={yValue} width="270" height="90">
  //       <g
  //         style={{
  //           stroke: "blue",
  //           strokeWidth: "2px",
  //           fill: "none",
  //           fontSize: "20px",
  //         }}
  //       >
  //         <path
  //           d="M10,20
  //             L240,20 L240, 70  M10, 70 L240 70 M10 20 L10 70 M80 20 L80 70  M160 20 L160 70"
  //         />

  //         {drawLineEndMarker()}

  //         {drawElectronLine("36", "62", "36", "32")}

  //         {drawElectronLine("120", "62", "120", "32")}

  //         {drawElectronLine("200", "62", "200", "32")}

  //         {drawElectronLine("58", "26", "58", "56")}

  //         {drawElectronLine("222", "26", "222", "56")}

  //         {drawElectronLine("144", "26", "144", "56")}

  //         {/* 3s react */}
  //       </g>
  //     </svg>
  //   );
  // }

  // function dorbitalWithTenElect(xValue, yValue) {
  //   return (
  //     <svg x={xValue} y={yValue} width="420" height="90">
  //       {/* <!-- d rect --> */}
  //       <g
  //         style={{
  //           stroke: "green",
  //           strokeWidth: "2px",
  //           fill: "none",
  //           fontSize: "20px",
  //         }}
  //       >
  //         <path
  //           d="M10,20
  //             L400,20 L400, 70  M10, 70 L400 70 M10 20 L10 70 M80 20 L80 70  M160 20 L160 70 M240 20 L240 70 M320 20 L320 70"
  //         />

  //         {drawLineEndMarker()}

  //         {drawElectronLine("34", "66", "34", "32")}

  //         {drawElectronLine("115", "66", "115", "32")}

  //         {drawElectronLine("195", "66", "195", "32")}

  //         {drawElectronLine("229", "28", "229", "58")}

  //         {drawElectronLine("275", "66", "275", "32")}

  //         {drawElectronLine("360", "66", "360", "32")}

  //         {drawElectronLine("58", "26", "58", "58")}

  //         {drawElectronLine("144", "26", "144", "58")}

  //         {drawElectronLine("304", "26", "304", "58")}

  //         {drawElectronLine("328", "26", "328", "58")}
  //       </g>
  //     </svg>
  //   );
  // }

  // function forbitalWith14Elect(xValue, yValue) {
  //   return (
  //     <svg x={xValue} y={yValue} width="570" height="90">
  //       {/* <!-- f rect --> */}
  //       <g
  //         style={{
  //           stroke: "orange",
  //           strokeWidth: "2px",
  //           fill: "none",
  //           fontSize: "20px",
  //         }}
  //       >
  //         <path
  //           d="M10,20
  //             L560,20 L560, 70  M10, 70 L560 70 M10 20 L10 70 M80 20 L80 70  M160 20 L160 70 M240 20 L240 70 M320 20 L320 70 M400 20 L400 70 M480 20 L480 70"
  //         />

  //         {drawLineEndMarker()}

  //         {drawElectronLine("34", "66", "34", "32")}

  //         {drawElectronLine("115", "66", "115", "32")}

  //         {drawElectronLine("195", "66", "195", "32")}

  //         {drawElectronLine("229", "28", "229", "58")}

  //         {drawElectronLine("275", "66", "275", "32")}

  //         {drawElectronLine("360", "66", "360", "32")}

  //         {drawElectronLine("58", "26", "58", "58")}

  //         {drawElectronLine("144", "26", "144", "58")}

  //         {drawElectronLine("304", "26", "304", "58")}

  //         {drawElectronLine("328", "26", "328", "58")}

  //         {drawElectronLine("416", "26", "416", "58")}

  //         {drawElectronLine("440", "62", "440", "34")}

  //         {drawElectronLine("496", "62", "496", "34")}

  //         {drawElectronLine("520", "29", "520", "58")}
  //       </g>
  //     </svg>
  //   );
  // }

  const handleRadioButtonChange = (event) => {
    const { name, value } = event.target;

    console.log({ name, value });
    setselectedElem(value);
  };

  function elemSortRadioButt(params) {
    return (
      <>
        <input
          type="radio"
          name="element"
          value="atomic"
          id="atomic"
          onChange={handleRadioButtonChange}
          checked={selectedElem === "atomic"}
          style={{ margin: "10px" }}
        />
        <label htmlFor="atomic">sort by atomic number</label>
        <input
          type="radio"
          name="element"
          value="family"
          id="family"
          onChange={handleRadioButtonChange}
          style={{ margin: "10px" }}
        />
        <label htmlFor="family">family</label>
        <input
          type="radio"
          name="element"
          value="alphabetic"
          id="atomic"
          onChange={handleRadioButtonChange}
          style={{ margin: "10px" }}
        />
        <label htmlFor="atomic">alphabetical order</label>
      </>
    );
  }

  function displaySelect() {
    if (selectedElem === "atomic") {
      return (
        <>
          <label htmlFor="selectElem"> Select An Element</label>
          <br />
          <select
            id="selectElem"
            name="elements"
            value={selectValue}
            onChange={onselectChange}
          >
            {elementsArray.map((element, i) => (
              <option
                value={element.atomicNum.toString()}
                key={`${i}-key`}
              >{`${element.name}(${element.symbol})`}</option>
            ))}
          </select>
        </>
      );
    } else if (selectedElem === "family" || selectedElem === "alphabetic") {
      return (
        <>
          <label htmlFor="selectElem"> Select An Element</label>
          <br />
          <select
            id="selectElem"
            name="elements"
            value={selectValue}
            onChange={onselectChange}
          >
            {arrangePostByCategory().map((post, i0) => (
              <optgroup label={post.category} key={`${i0}-key0`}>
                {post.posts.map((item, i) => (
                  <option value={item.atomicNum.toString()} key={`${i}-key`}>
                    {`${item.name}(${item.symbol})`}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </>
      );
    }
  }
  if (selectValue === "1") {
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
          {/* 1s-rect-orbital-1-electron */}
          {sOrbitalWith1Elect("20%", "45%")}

          {/* 1s text */}
          {drawText("22%", "43%", "1s")}

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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "2") {
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
          {/* 1s-rect-orbital-1-electron */}
          {sOrbitalWith2Elect("20%", "45%")}

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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "3") {
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "5") {
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
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("20%", "40%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith1Elect("35%", "25%")}

          {/* 1s text */}
          {drawText("21%", "80%", "1s")}
          {/* 2s text */}
          {drawText("22%", "40%", "2s")}
          {/* 2p text */}
          {drawText("48%", "25%", "2p")}

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

        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "6") {
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
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("20%", "40%")}

          {/* 2p-orbital-2-electron-react */}
          {porbitalWith2Elect("35%", "25%")}

          {/* 1s text */}
          {drawText("21%", "80%", "1s")}
          {/* 2s text */}
          {drawText("22%", "40%", "2s")}
          {/* 2p text */}
          {drawText("48%", "25%", "2p")}

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

        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "7") {
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
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("20%", "40%")}

          {/* 2p-orbital-3-electron-react */}
          {porbitalWith3Elect("35%", "25%")}

          {/* 1s text */}
          {drawText("21%", "80%", "1s")}
          {/* 2s text */}
          {drawText("22%", "40%", "2s")}
          {/* 2p text */}
          {drawText("48%", "25%", "2p")}

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

        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "8") {
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
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("20%", "40%")}

          {/* 2p-orbital-4-electron-react */}
          {porbitalWith4Elect("35%", "25%")}

          {/* 1s text */}
          {drawText("21%", "80%", "1s")}
          {/* 2s text */}
          {drawText("22%", "40%", "2s")}
          {/* 2p text */}
          {drawText("48%", "25%", "2p")}

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

        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "9") {
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
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("20%", "40%")}

          {/* 2p-orbital-4-electron-react */}
          {porbitalWith5Elect("35%", "25%")}

          {/* 1s text */}
          {drawText("21%", "80%", "1s")}
          {/* 2s text */}
          {drawText("22%", "40%", "2s")}
          {/* 2p text */}
          {drawText("48%", "25%", "2p")}

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

        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "10") {
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
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("20%", "40%")}

          {/* 2p-orbital-4-electron-react */}
          {porbitalWith6Elect("35%", "25%")}

          {/* 1s text */}
          {drawText("21%", "80%", "1s")}
          {/* 2s text */}
          {drawText("22%", "40%", "2s")}
          {/* 2p text */}
          {drawText("48%", "25%", "2p")}

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

        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "11") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="85%"
          height="400"
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
          {sOrbitalWith2Elect("20%", "50%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("35%", "40%")}

          {/* 3s-rect-orbital-1-electron */}
          {sOrbitalWith1Elect("20%", "20%")}

          {/* 1s text */}
          {drawText("21%", "80%", "1s")}
          {/* 2s text */}
          {drawText("22%", "49%", "2s")}
          {/* 2p text */}
          {drawText("48%", "39%", "2p")}
          {/* 3s text */}
          {drawText("21%", "17%", "3s")}
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

        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "12") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="85%"
          height="400"
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
          {sOrbitalWith2Elect("20%", "50%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("35%", "40%")}

          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("20%", "20%")}

          {/* 1s text */}
          {drawText("21%", "80%", "1s")}
          {/* 2s text */}
          {drawText("22%", "49%", "2s")}
          {/* 2p text */}
          {drawText("48%", "39%", "2p")}
          {/* 3s text */}
          {drawText("21%", "17%", "3s")}
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

        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "13") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="85%"
          height="450"
          style={{
            border: "2px solid red",
            minWidth: "350px",
            maxWidth: "900px",
            // overflow: "scroll",
            // display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("20%", "85%")}

          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("20%", "60%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("35%", "50%")}

          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("20%", "30%")}
          {/* 3p-orbital-1-electron-react */}
          {porbitalWith1Elect("35%", "15%")}

          {/* 1s text */}
          {drawText("21%", "86%", "1s")}
          {/* 2s text */}
          {drawText("22%", "59%", "2s")}
          {/* 2p text */}
          {drawText("48%", "49%", "2p")}
          {/* 3s text */}
          {drawText("21%", "29%", "3s")}
          {/* 3p text */}
          {drawText("48%", "17%", "3p")}
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

        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "14") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="85%"
          height="450"
          style={{
            border: "2px solid red",
            minWidth: "350px",
            maxWidth: "900px",
            // overflow: "scroll",
            // display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("20%", "85%")}

          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("20%", "60%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("35%", "50%")}

          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("20%", "30%")}
          {/* 3p-orbital-1-electron-react */}
          {porbitalWith2Elect("35%", "15%")}

          {/* 1s text */}
          {drawText("21%", "86%", "1s")}
          {/* 2s text */}
          {drawText("22%", "59%", "2s")}
          {/* 2p text */}
          {drawText("48%", "49%", "2p")}
          {/* 3s text */}
          {drawText("21%", "29%", "3s")}
          {/* 3p text */}
          {drawText("48%", "17%", "3p")}
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

        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "15") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="85%"
          height="450"
          style={{
            border: "2px solid red",
            minWidth: "350px",
            maxWidth: "900px",
            // overflow: "scroll",
            // display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("20%", "85%")}

          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("20%", "60%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("35%", "50%")}

          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("20%", "30%")}
          {/* 3p-orbital-1-electron-react */}
          {porbitalWith3Elect("35%", "15%")}

          {/* 1s text */}
          {drawText("21%", "86%", "1s")}
          {/* 2s text */}
          {drawText("22%", "59%", "2s")}
          {/* 2p text */}
          {drawText("48%", "49%", "2p")}
          {/* 3s text */}
          {drawText("21%", "29%", "3s")}
          {/* 3p text */}
          {drawText("48%", "17%", "3p")}
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

        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "16") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="85%"
          height="450"
          style={{
            border: "2px solid red",
            minWidth: "350px",
            maxWidth: "900px",
            // overflow: "scroll",
            // display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("20%", "85%")}

          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("20%", "60%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("35%", "50%")}

          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("20%", "30%")}
          {/* 3p-orbital-5-electron-react */}
          {porbitalWith4Elect("35%", "15%")}

          {/* 1s text */}
          {drawText("21%", "86%", "1s")}
          {/* 2s text */}
          {drawText("22%", "59%", "2s")}
          {/* 2p text */}
          {drawText("48%", "49%", "2p")}
          {/* 3s text */}
          {drawText("21%", "29%", "3s")}
          {/* 3p text */}
          {drawText("48%", "17%", "3p")}
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

        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "17") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="85%"
          height="450"
          style={{
            border: "2px solid red",
            minWidth: "350px",
            maxWidth: "900px",
            // overflow: "scroll",
            // display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("20%", "85%")}

          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("20%", "60%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("35%", "50%")}

          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("20%", "30%")}
          {/* 3p-orbital-5-electron-react */}
          {porbitalWith5Elect("35%", "15%")}

          {/* 1s text */}
          {drawText("21%", "86%", "1s")}
          {/* 2s text */}
          {drawText("22%", "59%", "2s")}
          {/* 2p text */}
          {drawText("48%", "49%", "2p")}
          {/* 3s text */}
          {drawText("21%", "29%", "3s")}
          {/* 3p text */}
          {drawText("48%", "17%", "3p")}
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

        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "18") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="85%"
          height="450"
          style={{
            border: "2px solid red",
            minWidth: "350px",
            maxWidth: "900px",
            // overflow: "scroll",
            // display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("20%", "85%")}

          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("20%", "60%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("35%", "50%")}

          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("20%", "30%")}
          {/* 3p-orbital-5-electron-react */}
          {porbitalWith6Elect("35%", "15%")}

          {/* 1s text */}
          {drawText("21%", "86%", "1s")}
          {/* 2s text */}
          {drawText("22%", "59%", "2s")}
          {/* 2p text */}
          {drawText("48%", "49%", "2p")}
          {/* 3s text */}
          {drawText("21%", "29%", "3s")}
          {/* 3p text */}
          {drawText("48%", "17%", "3p")}
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

        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "21") {
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
          {/* 3d-rect-orbital-1-electron */}

          {dorbitalWith1Elect("10%", "15%")}

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
          {/* 3d text */}
          {drawText("21%", "14%", "3d")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "22") {
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
          {/* 3d-rect-orbital-1-electron */}

          {dorbitalWith2Elect("10%", "15%")}

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
          {/* 3d text */}
          {drawText("21%", "14%", "3d")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "23") {
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
          {/* 3d-rect-orbital-3-electron */}

          {dorbitalWith3Elect("10%", "15%")}

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
          {/* 3d text */}
          {drawText("21%", "14%", "3d")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "24") {
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
          {/* 3d-rect-orbital-3-electron */}

          {dorbitalWith4Elect("10%", "15%")}

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
          {/* 3d text */}
          {drawText("21%", "14%", "3d")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "25") {
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
          {/* 3d-rect-orbital-3-electron */}

          {dorbitalWith5Elect("10%", "15%")}

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
          {/* 3d text */}
          {drawText("21%", "16%", "3d")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "26") {
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
          {/* 3d-rect-orbital-3-electron */}

          {dorbitalWith6Elect("10%", "15%")}

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
          {/* 3d text */}
          {drawText("21%", "16%", "3d")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "27") {
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
          {/* 3d-rect-orbital-3-electron */}

          {dorbitalWith7Elect("10%", "15%")}

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
          {/* 3d text */}
          {drawText("21%", "16%", "3d")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "28") {
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
          {/* 3d-rect-orbital-3-electron */}

          {dorbitalWith8Elect("10%", "15%")}

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
          {/* 3d text */}
          {drawText("21%", "16%", "3d")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "29") {
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
          {/* 3d-rect-orbital-3-electron */}

          {dorbitalWith9Elect("10%", "15%")}

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
          {/* 3d text */}
          {drawText("21%", "16%", "3d")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "30") {
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
          {/* 3d-rect-orbital-3-electron */}

          {dorbitalWithTenElect("10%", "15%")}

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
          {/* 3d text */}
          {drawText("21%", "16%", "3d")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "31") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="85%"
          height="750"
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
          {sOrbitalWith2Elect("20%", "75%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("35%", "70%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("20%", "60%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("35%", "55%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("20%", "45%")}
          {/* 3d-rect-orbital-3-electron */}

          {dorbitalWithTenElect("10%", "25%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith1Elect("15%", "5%")}

          {/* 1s text */}
          {drawText("21%", "90%", "1s")}
          {/* 2s text */}
          {drawText("22%", "75%", "2s")}
          {/* 2p text */}
          {drawText("48%", "70%", "2p")}
          {/* 3s text */}
          {drawText("21%", "60%", "3s")}

          {/* 3p text */}
          {drawText("48%", "55%", "3p")}

          {/* 4s text */}
          {drawText("21%", "45%", "4s")}
          {/* 3d text */}
          {drawText("21%", "25%", "3d")}
          {/* 4p text */}
          {drawText("31%", "5%", "4p")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "32") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="85%"
          height="750"
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
          {sOrbitalWith2Elect("20%", "75%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("35%", "70%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("20%", "60%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("35%", "55%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("20%", "45%")}
          {/* 3d-rect-orbital-3-electron */}

          {dorbitalWithTenElect("10%", "25%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith2Elect("15%", "5%")}

          {/* 1s text */}
          {drawText("21%", "90%", "1s")}
          {/* 2s text */}
          {drawText("22%", "75%", "2s")}
          {/* 2p text */}
          {drawText("48%", "70%", "2p")}
          {/* 3s text */}
          {drawText("21%", "60%", "3s")}

          {/* 3p text */}
          {drawText("48%", "55%", "3p")}

          {/* 4s text */}
          {drawText("21%", "45%", "4s")}
          {/* 3d text */}
          {drawText("21%", "25%", "3d")}
          {/* 4p text */}
          {drawText("31%", "5%", "4p")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  }
  if (selectValue === "33") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="85%"
          height="750"
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
          {sOrbitalWith2Elect("20%", "75%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("35%", "70%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("20%", "60%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("35%", "55%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("20%", "45%")}
          {/* 3d-rect-orbital-3-electron */}

          {dorbitalWithTenElect("10%", "25%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith3Elect("15%", "5%")}

          {/* 1s text */}
          {drawText("21%", "90%", "1s")}
          {/* 2s text */}
          {drawText("22%", "75%", "2s")}
          {/* 2p text */}
          {drawText("48%", "70%", "2p")}
          {/* 3s text */}
          {drawText("21%", "60%", "3s")}

          {/* 3p text */}
          {drawText("48%", "55%", "3p")}

          {/* 4s text */}
          {drawText("21%", "45%", "4s")}
          {/* 3d text */}
          {drawText("21%", "25%", "3d")}
          {/* 4p text */}
          {drawText("28%", "5%", "4p")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "34") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="85%"
          height="750"
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
          {sOrbitalWith2Elect("20%", "75%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("35%", "70%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("20%", "60%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("35%", "55%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("20%", "45%")}
          {/* 3d-rect-orbital-3-electron */}

          {dorbitalWithTenElect("10%", "25%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith4Elect("15%", "5%")}

          {/* 1s text */}
          {drawText("21%", "90%", "1s")}
          {/* 2s text */}
          {drawText("22%", "75%", "2s")}
          {/* 2p text */}
          {drawText("48%", "70%", "2p")}
          {/* 3s text */}
          {drawText("21%", "60%", "3s")}

          {/* 3p text */}
          {drawText("48%", "55%", "3p")}

          {/* 4s text */}
          {drawText("21%", "45%", "4s")}
          {/* 3d text */}
          {drawText("21%", "25%", "3d")}
          {/* 4p text */}
          {drawText("28%", "5%", "4p")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "35") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="85%"
          height="750"
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
          {sOrbitalWith2Elect("20%", "75%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("35%", "70%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("20%", "60%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("35%", "55%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("20%", "45%")}
          {/* 3d-rect-orbital-3-electron */}

          {dorbitalWithTenElect("10%", "25%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith5Elect("15%", "5%")}

          {/* 1s text */}
          {drawText("21%", "90%", "1s")}
          {/* 2s text */}
          {drawText("22%", "75%", "2s")}
          {/* 2p text */}
          {drawText("48%", "70%", "2p")}
          {/* 3s text */}
          {drawText("21%", "60%", "3s")}

          {/* 3p text */}
          {drawText("48%", "55%", "3p")}

          {/* 4s text */}
          {drawText("21%", "45%", "4s")}
          {/* 3d text */}
          {drawText("21%", "25%", "3d")}
          {/* 4p text */}
          {drawText("28%", "5%", "4p")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "36") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="85%"
          height="750"
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
          {sOrbitalWith2Elect("20%", "75%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("35%", "70%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("20%", "60%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("35%", "55%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("20%", "45%")}
          {/* 3d-rect-orbital-3-electron */}

          {dorbitalWithTenElect("10%", "25%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("15%", "5%")}

          {/* 1s text */}
          {drawText("21%", "90%", "1s")}
          {/* 2s text */}
          {drawText("22%", "75%", "2s")}
          {/* 2p text */}
          {drawText("48%", "70%", "2p")}
          {/* 3s text */}
          {drawText("21%", "60%", "3s")}

          {/* 3p text */}
          {drawText("48%", "55%", "3p")}

          {/* 4s text */}
          {drawText("21%", "45%", "4s")}
          {/* 3d text */}
          {drawText("21%", "25%", "3d")}
          {/* 4p text */}
          {drawText("28%", "5%", "4p")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "37") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="900"
          style={{
            border: "0.5px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("4%", "90%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("4%", "75%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "60%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "55%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "45%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "30%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "15%")}
          {/* 5s-rect-orbital-1-electron */}
          {sOrbitalWith1Elect("4%", "10%")}

          {/* 1s text */}
          {drawText("5%", "90%", "1s")}
          {/* 2s text */}
          {drawText("5%", "75%", "2s")}
          {/* 2p text */}
          {drawText("30%", "71%", "2p")}
          {/* 3s text */}
          {drawText("5%", "60%", "3s")}
          {/* 3p text */}
          {drawText("30%", "55%", "3p")}
          {/* 4s text */}
          {drawText("5%", "45%", "4s")}
          {/* 3d text */}
          {drawText("26%", "31%", "3d")}
          {/* 4p text */}
          {drawText("30%", "16%", "4p")}
          {/* 5s text */}
          {drawText("5%", "9%", "5s")}
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

        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "38") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="900"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("4%", "90%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("4%", "75%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "60%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "55%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "45%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "30%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "15%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "10%")}

          {/* 1s text */}
          {drawText("5%", "90%", "1s")}
          {/* 2s text */}
          {drawText("5%", "75%", "2s")}
          {/* 2p text */}
          {drawText("30%", "71%", "2p")}
          {/* 3s text */}
          {drawText("5%", "60%", "3s")}
          {/* 3p text */}
          {drawText("30%", "55%", "3p")}
          {/* 4s text */}
          {drawText("5%", "45%", "4s")}
          {/* 3d text */}
          {drawText("26%", "31%", "3d")}
          {/* 4p text */}
          {drawText("30%", "16%", "4p")}
          {/* 5s text */}
          {drawText("5%", "9%", "5s")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "39") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1000"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("4%", "92%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("4%", "80%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "75%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "70%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "60%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "55%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "43%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "30%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "23%")}
          {/* 4d orbital with 1 electrons */}
          {dorbitalWith1Elect("3%", "10%")}

          {/* 1s text */}
          {drawText("5%", "92%", "1s")}
          {/* 2s text */}
          {drawText("5%", "80%", "2s")}
          {/* 2p text */}
          {drawText("30%", "75%", "2p")}
          {/* 3s text */}
          {drawText("5%", "70%", "3s")}
          {/* 3p text */}
          {drawText("30%", "60%", "3p")}
          {/* 4s text */}
          {drawText("5%", "55%", "4s")}
          {/* 3d text */}
          {drawText("26%", "44%", "3d")}
          {/* 4p text */}
          {drawText("30%", "31%", "4p")}
          {/* 5s text */}
          {drawText("5%", "23%", "5s")}
          {/* 4d text */}
          {drawText("26%", "11%", "4d")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "40") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1000"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("4%", "92%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("4%", "80%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "75%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "70%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "60%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "55%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "43%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "30%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "23%")}
          {/* 4d orbital with 1 electrons */}
          {dorbitalWith2Elect("3%", "10%")}

          {/* 1s text */}
          {drawText("5%", "92%", "1s")}
          {/* 2s text */}
          {drawText("5%", "80%", "2s")}
          {/* 2p text */}
          {drawText("30%", "75%", "2p")}
          {/* 3s text */}
          {drawText("5%", "70%", "3s")}
          {/* 3p text */}
          {drawText("30%", "60%", "3p")}
          {/* 4s text */}
          {drawText("5%", "55%", "4s")}
          {/* 3d text */}
          {drawText("26%", "44%", "3d")}
          {/* 4p text */}
          {drawText("30%", "31%", "4p")}
          {/* 5s text */}
          {drawText("5%", "23%", "5s")}
          {/* 4d text */}
          {drawText("26%", "11%", "4d")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "41") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1000"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("4%", "92%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("4%", "80%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "75%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "70%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "60%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "55%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "43%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "30%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "23%")}
          {/* 4d orbital with 1 electrons */}
          {dorbitalWith3Elect("3%", "10%")}

          {/* 1s text */}
          {drawText("5%", "92%", "1s")}
          {/* 2s text */}
          {drawText("5%", "80%", "2s")}
          {/* 2p text */}
          {drawText("30%", "75%", "2p")}
          {/* 3s text */}
          {drawText("5%", "70%", "3s")}
          {/* 3p text */}
          {drawText("30%", "60%", "3p")}
          {/* 4s text */}
          {drawText("5%", "55%", "4s")}
          {/* 3d text */}
          {drawText("26%", "44%", "3d")}
          {/* 4p text */}
          {drawText("30%", "31%", "4p")}
          {/* 5s text */}
          {drawText("5%", "23%", "5s")}
          {/* 4d text */}
          {drawText("26%", "11%", "4d")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "42") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1000"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("4%", "92%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("4%", "80%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "75%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "70%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "60%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "55%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "43%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "30%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "23%")}
          {/* 4d orbital with 1 electrons */}
          {dorbitalWith4Elect("3%", "10%")}

          {/* 1s text */}
          {drawText("5%", "92%", "1s")}
          {/* 2s text */}
          {drawText("5%", "80%", "2s")}
          {/* 2p text */}
          {drawText("30%", "75%", "2p")}
          {/* 3s text */}
          {drawText("5%", "70%", "3s")}
          {/* 3p text */}
          {drawText("30%", "60%", "3p")}
          {/* 4s text */}
          {drawText("5%", "55%", "4s")}
          {/* 3d text */}
          {drawText("26%", "44%", "3d")}
          {/* 4p text */}
          {drawText("30%", "31%", "4p")}
          {/* 5s text */}
          {drawText("5%", "23%", "5s")}
          {/* 4d text */}
          {drawText("26%", "11%", "4d")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "43") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1000"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("4%", "92%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("4%", "80%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "75%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "70%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "60%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "55%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "43%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "30%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "23%")}
          {/* 4d orbital with 1 electrons */}
          {dorbitalWith5Elect("3%", "10%")}

          {/* 1s text */}
          {drawText("5%", "92%", "1s")}
          {/* 2s text */}
          {drawText("5%", "80%", "2s")}
          {/* 2p text */}
          {drawText("30%", "75%", "2p")}
          {/* 3s text */}
          {drawText("5%", "70%", "3s")}
          {/* 3p text */}
          {drawText("30%", "60%", "3p")}
          {/* 4s text */}
          {drawText("5%", "55%", "4s")}
          {/* 3d text */}
          {drawText("26%", "44%", "3d")}
          {/* 4p text */}
          {drawText("30%", "31%", "4p")}
          {/* 5s text */}
          {drawText("5%", "23%", "5s")}
          {/* 4d text */}
          {drawText("26%", "11%", "4d")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "44") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1000"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("4%", "92%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("4%", "80%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "75%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "70%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "60%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "55%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "43%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "30%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "23%")}
          {/* 4d orbital with 1 electrons */}
          {dorbitalWith6Elect("3%", "10%")}

          {/* 1s text */}
          {drawText("5%", "92%", "1s")}
          {/* 2s text */}
          {drawText("5%", "80%", "2s")}
          {/* 2p text */}
          {drawText("30%", "75%", "2p")}
          {/* 3s text */}
          {drawText("5%", "70%", "3s")}
          {/* 3p text */}
          {drawText("30%", "60%", "3p")}
          {/* 4s text */}
          {drawText("5%", "55%", "4s")}
          {/* 3d text */}
          {drawText("26%", "44%", "3d")}
          {/* 4p text */}
          {drawText("30%", "31%", "4p")}
          {/* 5s text */}
          {drawText("5%", "23%", "5s")}
          {/* 4d text */}
          {drawText("26%", "11%", "4d")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "45") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1000"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("4%", "92%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("4%", "80%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "75%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "70%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "60%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "55%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "43%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "30%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "23%")}
          {/* 4d orbital with 1 electrons */}
          {dorbitalWith7Elect("3%", "10%")}

          {/* 1s text */}
          {drawText("5%", "92%", "1s")}
          {/* 2s text */}
          {drawText("5%", "80%", "2s")}
          {/* 2p text */}
          {drawText("30%", "75%", "2p")}
          {/* 3s text */}
          {drawText("5%", "70%", "3s")}
          {/* 3p text */}
          {drawText("30%", "60%", "3p")}
          {/* 4s text */}
          {drawText("5%", "55%", "4s")}
          {/* 3d text */}
          {drawText("26%", "44%", "3d")}
          {/* 4p text */}
          {drawText("30%", "31%", "4p")}
          {/* 5s text */}
          {drawText("5%", "23%", "5s")}
          {/* 4d text */}
          {drawText("26%", "11%", "4d")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "46") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1000"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("4%", "92%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("4%", "80%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "75%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "70%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "60%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "55%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "43%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "30%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "23%")}
          {/* 4d orbital with 1 electrons */}
          {dorbitalWith8Elect("3%", "10%")}

          {/* 1s text */}
          {drawText("5%", "92%", "1s")}
          {/* 2s text */}
          {drawText("5%", "80%", "2s")}
          {/* 2p text */}
          {drawText("30%", "75%", "2p")}
          {/* 3s text */}
          {drawText("5%", "70%", "3s")}
          {/* 3p text */}
          {drawText("30%", "60%", "3p")}
          {/* 4s text */}
          {drawText("5%", "55%", "4s")}
          {/* 3d text */}
          {drawText("26%", "44%", "3d")}
          {/* 4p text */}
          {drawText("30%", "31%", "4p")}
          {/* 5s text */}
          {drawText("5%", "23%", "5s")}
          {/* 4d text */}
          {drawText("26%", "11%", "4d")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "47") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1000"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("4%", "92%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("4%", "80%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "75%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "70%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "60%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "55%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "43%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "30%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "23%")}
          {/* 4d orbital with 1 electrons */}
          {dorbitalWith9Elect("3%", "10%")}

          {/* 1s text */}
          {drawText("5%", "92%", "1s")}
          {/* 2s text */}
          {drawText("5%", "80%", "2s")}
          {/* 2p text */}
          {drawText("30%", "75%", "2p")}
          {/* 3s text */}
          {drawText("5%", "70%", "3s")}
          {/* 3p text */}
          {drawText("30%", "60%", "3p")}
          {/* 4s text */}
          {drawText("5%", "55%", "4s")}
          {/* 3d text */}
          {drawText("26%", "44%", "3d")}
          {/* 4p text */}
          {drawText("30%", "31%", "4p")}
          {/* 5s text */}
          {drawText("5%", "23%", "5s")}
          {/* 4d text */}
          {drawText("26%", "11%", "4d")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "48") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1000"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("4%", "92%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("4%", "80%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "75%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "70%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "60%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "55%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "43%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "30%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "23%")}
          {/* 4d orbital with 1 electrons */}
          {dorbitalWithTenElect("3%", "10%")}

          {/* 1s text */}
          {drawText("5%", "92%", "1s")}
          {/* 2s text */}
          {drawText("5%", "80%", "2s")}
          {/* 2p text */}
          {drawText("30%", "75%", "2p")}
          {/* 3s text */}
          {drawText("5%", "70%", "3s")}
          {/* 3p text */}
          {drawText("30%", "60%", "3p")}
          {/* 4s text */}
          {drawText("5%", "55%", "4s")}
          {/* 3d text */}
          {drawText("26%", "44%", "3d")}
          {/* 4p text */}
          {drawText("30%", "31%", "4p")}
          {/* 5s text */}
          {drawText("5%", "23%", "5s")}
          {/* 4d text */}
          {drawText("26%", "11%", "4d")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "49") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1100"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("4%", "92%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("4%", "80%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "75%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "70%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "60%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "55%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "43%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "30%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "27%")}
          {/* 4d orbital with 1 electrons */}
          {dorbitalWithTenElect("3%", "15%")}
          {/* 5p-orbital-1-electron-react */}
          {porbitalWith1Elect("20%", "5%")}

          {/* 1s text */}
          {drawText("5%", "92%", "1s")}
          {/* 2s text */}
          {drawText("5%", "80%", "2s")}
          {/* 2p text */}
          {drawText("30%", "75%", "2p")}
          {/* 3s text */}
          {drawText("5%", "70%", "3s")}
          {/* 3p text */}
          {drawText("30%", "60%", "3p")}
          {/* 4s text */}
          {drawText("5%", "55%", "4s")}
          {/* 3d text */}
          {drawText("26%", "44%", "3d")}
          {/* 4p text */}
          {drawText("30%", "31%", "4p")}
          {/* 5s text */}
          {drawText("5%", "27%", "5s")}
          {/* 4d text */}
          {drawText("26%", "16%", "4d")}
          {/* 5p text */}
          {drawText("30%", "6%", "5p")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "50") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1100"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("4%", "92%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("4%", "80%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "75%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "70%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "60%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "55%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "43%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "30%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "27%")}
          {/* 4d orbital with 1 electrons */}
          {dorbitalWithTenElect("3%", "15%")}
          {/* 5p-orbital-1-electron-react */}
          {porbitalWith2Elect("20%", "5%")}

          {/* 1s text */}
          {drawText("5%", "92%", "1s")}
          {/* 2s text */}
          {drawText("5%", "80%", "2s")}
          {/* 2p text */}
          {drawText("30%", "75%", "2p")}
          {/* 3s text */}
          {drawText("5%", "70%", "3s")}
          {/* 3p text */}
          {drawText("30%", "60%", "3p")}
          {/* 4s text */}
          {drawText("5%", "55%", "4s")}
          {/* 3d text */}
          {drawText("26%", "44%", "3d")}
          {/* 4p text */}
          {drawText("30%", "31%", "4p")}
          {/* 5s text */}
          {drawText("5%", "27%", "5s")}
          {/* 4d text */}
          {drawText("26%", "16%", "4d")}
          {/* 5p text */}
          {drawText("30%", "6%", "5p")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "51") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1100"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("4%", "92%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("4%", "80%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "75%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "70%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "60%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "55%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "43%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "30%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "27%")}
          {/* 4d orbital with 1 electrons */}
          {dorbitalWithTenElect("3%", "15%")}
          {/* 5p-orbital-1-electron-react */}
          {porbitalWith3Elect("20%", "5%")}

          {/* 1s text */}
          {drawText("5%", "92%", "1s")}
          {/* 2s text */}
          {drawText("5%", "80%", "2s")}
          {/* 2p text */}
          {drawText("30%", "75%", "2p")}
          {/* 3s text */}
          {drawText("5%", "70%", "3s")}
          {/* 3p text */}
          {drawText("30%", "60%", "3p")}
          {/* 4s text */}
          {drawText("5%", "55%", "4s")}
          {/* 3d text */}
          {drawText("26%", "44%", "3d")}
          {/* 4p text */}
          {drawText("30%", "31%", "4p")}
          {/* 5s text */}
          {drawText("5%", "27%", "5s")}
          {/* 4d text */}
          {drawText("26%", "16%", "4d")}
          {/* 5p text */}
          {drawText("30%", "6%", "5p")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "52") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1100"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("4%", "92%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("4%", "80%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "75%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "70%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "60%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "55%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "43%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "30%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "27%")}
          {/* 4d orbital with 1 electrons */}
          {dorbitalWithTenElect("3%", "15%")}
          {/* 5p-orbital-1-electron-react */}
          {porbitalWith4Elect("20%", "5%")}

          {/* 1s text */}
          {drawText("5%", "92%", "1s")}
          {/* 2s text */}
          {drawText("5%", "80%", "2s")}
          {/* 2p text */}
          {drawText("30%", "75%", "2p")}
          {/* 3s text */}
          {drawText("5%", "70%", "3s")}
          {/* 3p text */}
          {drawText("30%", "60%", "3p")}
          {/* 4s text */}
          {drawText("5%", "55%", "4s")}
          {/* 3d text */}
          {drawText("26%", "44%", "3d")}
          {/* 4p text */}
          {drawText("30%", "31%", "4p")}
          {/* 5s text */}
          {drawText("5%", "27%", "5s")}
          {/* 4d text */}
          {drawText("26%", "16%", "4d")}
          {/* 5p text */}
          {drawText("30%", "6%", "5p")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "53") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1100"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("4%", "92%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("4%", "80%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "75%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "70%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "60%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "55%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "43%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "30%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "27%")}
          {/* 4d orbital with 1 electrons */}
          {dorbitalWithTenElect("3%", "15%")}
          {/* 5p-orbital-5-electron-react */}
          {porbitalWith5Elect("20%", "5%")}

          {/* 1s text */}
          {drawText("5%", "92%", "1s")}
          {/* 2s text */}
          {drawText("5%", "80%", "2s")}
          {/* 2p text */}
          {drawText("30%", "75%", "2p")}
          {/* 3s text */}
          {drawText("5%", "70%", "3s")}
          {/* 3p text */}
          {drawText("30%", "60%", "3p")}
          {/* 4s text */}
          {drawText("5%", "55%", "4s")}
          {/* 3d text */}
          {drawText("26%", "44%", "3d")}
          {/* 4p text */}
          {drawText("30%", "31%", "4p")}
          {/* 5s text */}
          {drawText("5%", "27%", "5s")}
          {/* 4d text */}
          {drawText("26%", "16%", "4d")}
          {/* 5p text */}
          {drawText("30%", "6%", "5p")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "54") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1100"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("4%", "92%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("4%", "80%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "75%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "70%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "60%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "55%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "43%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "30%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("4%", "27%")}
          {/* 4d orbital with 1 electrons */}
          {dorbitalWithTenElect("3%", "15%")}
          {/* 5p-orbital-5-electron-react */}
          {porbitalWith6Elect("20%", "5%")}

          {/* 1s text */}
          {drawText("5%", "92%", "1s")}
          {/* 2s text */}
          {drawText("5%", "80%", "2s")}
          {/* 2p text */}
          {drawText("30%", "75%", "2p")}
          {/* 3s text */}
          {drawText("5%", "70%", "3s")}
          {/* 3p text */}
          {drawText("30%", "60%", "3p")}
          {/* 4s text */}
          {drawText("5%", "55%", "4s")}
          {/* 3d text */}
          {drawText("26%", "44%", "3d")}
          {/* 4p text */}
          {drawText("30%", "31%", "4p")}
          {/* 5s text */}
          {drawText("5%", "27%", "5s")}
          {/* 4d text */}
          {drawText("26%", "16%", "4d")}
          {/* 5p text */}
          {drawText("30%", "6%", "5p")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "55") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1400"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "55%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "45%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "40%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "30%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "20%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith1Elect("10%", "15%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "80%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "70%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "56%", "3d")}

          {/* 4p text */}
          {drawText("30%", "46%", "4p")}
          {/* 5s text */}
          {drawText("11%", "40%", "5s")}
          {/* 4d text */}
          {drawText("26%", "31%", "4d")}
          {/* 5p text */}
          {drawText("30%", "21%", "5p")}
          {/* 5s text */}
          {drawText("11%", "15%", "6s")}
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

        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "56") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1400"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "55%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "45%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "40%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "30%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "20%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "15%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "80%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "70%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "56%", "3d")}

          {/* 4p text */}
          {drawText("30%", "46%", "4p")}
          {/* 5s text */}
          {drawText("11%", "40%", "5s")}
          {/* 4d text */}
          {drawText("26%", "31%", "4d")}
          {/* 5p text */}
          {drawText("30%", "21%", "5p")}
          {/* 5s text */}
          {drawText("11%", "15%", "6s")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "57") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1400"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "55%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "45%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "40%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "30%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "20%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "15%")}
          {/* 4f orbital with 1 electron */}
          {forbitalWith1Elect("3%", "7%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "80%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "70%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "56%", "3d")}

          {/* 4p text */}
          {drawText("30%", "46%", "4p")}
          {/* 5s text */}
          {drawText("11%", "40%", "5s")}
          {/* 4d text */}
          {drawText("26%", "31%", "4d")}
          {/* 5p text */}
          {drawText("30%", "21%", "5p")}
          {/* 6s text */}
          {drawText("11%", "15%", "6s")}
          {/* 4f text */}
          {drawText("26%", "8%", "4f")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "58") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1400"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "55%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "45%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "40%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "30%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "20%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "15%")}
          {/* 4f orbital with 2 electron */}
          {forbitalWith2Elect("3%", "7%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "80%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "70%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "56%", "3d")}

          {/* 4p text */}
          {drawText("30%", "46%", "4p")}
          {/* 5s text */}
          {drawText("11%", "40%", "5s")}
          {/* 4d text */}
          {drawText("26%", "31%", "4d")}
          {/* 5p text */}
          {drawText("30%", "21%", "5p")}
          {/* 6s text */}
          {drawText("11%", "15%", "6s")}
          {/* 4f text */}
          {drawText("26%", "8%", "4f")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "59") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1400"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "55%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "45%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "40%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "30%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "20%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "15%")}
          {/* 4f orbital with 2 electron */}
          {forbitalWith3Elect("3%", "7%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "80%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "70%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "56%", "3d")}

          {/* 4p text */}
          {drawText("30%", "46%", "4p")}
          {/* 5s text */}
          {drawText("11%", "40%", "5s")}
          {/* 4d text */}
          {drawText("26%", "31%", "4d")}
          {/* 5p text */}
          {drawText("30%", "21%", "5p")}
          {/* 6s text */}
          {drawText("11%", "15%", "6s")}
          {/* 4f text */}
          {drawText("26%", "8%", "4f")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "60") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1400"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "55%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "45%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "40%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "30%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "20%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "15%")}
          {/* 4f orbital with 2 electron */}
          {forbitalWith4Elect("3%", "7%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "80%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "70%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "56%", "3d")}

          {/* 4p text */}
          {drawText("30%", "46%", "4p")}
          {/* 5s text */}
          {drawText("11%", "40%", "5s")}
          {/* 4d text */}
          {drawText("26%", "31%", "4d")}
          {/* 5p text */}
          {drawText("30%", "21%", "5p")}
          {/* 6s text */}
          {drawText("11%", "15%", "6s")}
          {/* 4f text */}
          {drawText("26%", "8%", "4f")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "61") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1400"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "55%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "45%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "40%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "30%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "20%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "15%")}
          {/* 4f orbital with 2 electron */}
          {forbitalWith5Elect("3%", "7%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "80%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "70%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "56%", "3d")}

          {/* 4p text */}
          {drawText("30%", "46%", "4p")}
          {/* 5s text */}
          {drawText("11%", "40%", "5s")}
          {/* 4d text */}
          {drawText("26%", "31%", "4d")}
          {/* 5p text */}
          {drawText("30%", "21%", "5p")}
          {/* 6s text */}
          {drawText("11%", "15%", "6s")}
          {/* 4f text */}
          {drawText("26%", "8%", "4f")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "62") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1400"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "55%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "45%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "40%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "30%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "20%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "15%")}
          {/* 4f orbital with 2 electron */}
          {forbitalWith6Elect("3%", "7%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "80%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "70%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "56%", "3d")}

          {/* 4p text */}
          {drawText("30%", "46%", "4p")}
          {/* 5s text */}
          {drawText("11%", "40%", "5s")}
          {/* 4d text */}
          {drawText("26%", "31%", "4d")}
          {/* 5p text */}
          {drawText("30%", "21%", "5p")}
          {/* 6s text */}
          {drawText("11%", "15%", "6s")}
          {/* 4f text */}
          {drawText("26%", "8%", "4f")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "63") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1400"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "55%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "45%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "40%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "30%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "20%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "15%")}
          {/* 4f orbital with 2 electron */}
          {forbitalWith7Elect("3%", "7%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "80%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "70%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "56%", "3d")}

          {/* 4p text */}
          {drawText("30%", "46%", "4p")}
          {/* 5s text */}
          {drawText("11%", "40%", "5s")}
          {/* 4d text */}
          {drawText("26%", "31%", "4d")}
          {/* 5p text */}
          {drawText("30%", "21%", "5p")}
          {/* 6s text */}
          {drawText("11%", "15%", "6s")}
          {/* 4f text */}
          {drawText("26%", "8%", "4f")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "64") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1400"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "55%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "45%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "40%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "30%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "20%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "15%")}
          {/* 4f orbital with 2 electron */}
          {forbitalWith8Elect("3%", "7%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "80%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "70%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "56%", "3d")}

          {/* 4p text */}
          {drawText("30%", "46%", "4p")}
          {/* 5s text */}
          {drawText("11%", "40%", "5s")}
          {/* 4d text */}
          {drawText("26%", "31%", "4d")}
          {/* 5p text */}
          {drawText("30%", "21%", "5p")}
          {/* 6s text */}
          {drawText("11%", "15%", "6s")}
          {/* 4f text */}
          {drawText("26%", "8%", "4f")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "65") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1400"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "55%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "45%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "40%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "30%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "20%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "15%")}
          {/* 4f orbital with 2 electron */}
          {forbitalWith9Elect("3%", "7%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "80%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "70%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "56%", "3d")}

          {/* 4p text */}
          {drawText("30%", "46%", "4p")}
          {/* 5s text */}
          {drawText("11%", "40%", "5s")}
          {/* 4d text */}
          {drawText("26%", "31%", "4d")}
          {/* 5p text */}
          {drawText("30%", "21%", "5p")}
          {/* 6s text */}
          {drawText("11%", "15%", "6s")}
          {/* 4f text */}
          {drawText("26%", "8%", "4f")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "66") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1400"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "55%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "45%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "40%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "30%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "20%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "15%")}
          {/* 4f orbital with 2 electron */}
          {forbitalWith10Elect("3%", "7%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "80%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "70%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "56%", "3d")}

          {/* 4p text */}
          {drawText("30%", "46%", "4p")}
          {/* 5s text */}
          {drawText("11%", "40%", "5s")}
          {/* 4d text */}
          {drawText("26%", "31%", "4d")}
          {/* 5p text */}
          {drawText("30%", "21%", "5p")}
          {/* 6s text */}
          {drawText("11%", "15%", "6s")}
          {/* 4f text */}
          {drawText("26%", "8%", "4f")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "67") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1400"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "55%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "45%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "40%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "30%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "20%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "15%")}
          {/* 4f orbital with 2 electron */}
          {forbitalWith11Elect("3%", "7%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "80%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "70%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "56%", "3d")}

          {/* 4p text */}
          {drawText("30%", "46%", "4p")}
          {/* 5s text */}
          {drawText("11%", "40%", "5s")}
          {/* 4d text */}
          {drawText("26%", "31%", "4d")}
          {/* 5p text */}
          {drawText("30%", "21%", "5p")}
          {/* 6s text */}
          {drawText("11%", "15%", "6s")}
          {/* 4f text */}
          {drawText("26%", "8%", "4f")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "68") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1400"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "55%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "45%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "40%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "30%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "20%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "15%")}
          {/* 4f orbital with 2 electron */}
          {forbitalWith12Elect("3%", "7%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "80%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "70%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "56%", "3d")}

          {/* 4p text */}
          {drawText("30%", "46%", "4p")}
          {/* 5s text */}
          {drawText("11%", "40%", "5s")}
          {/* 4d text */}
          {drawText("26%", "31%", "4d")}
          {/* 5p text */}
          {drawText("30%", "21%", "5p")}
          {/* 6s text */}
          {drawText("11%", "15%", "6s")}
          {/* 4f text */}
          {drawText("26%", "8%", "4f")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "69") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1400"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "55%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "45%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "40%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "30%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "20%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "15%")}
          {/* 4f orbital with 2 electron */}
          {forbitalWith13Elect("3%", "7%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "80%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "70%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "56%", "3d")}

          {/* 4p text */}
          {drawText("30%", "46%", "4p")}
          {/* 5s text */}
          {drawText("11%", "40%", "5s")}
          {/* 4d text */}
          {drawText("26%", "31%", "4d")}
          {/* 5p text */}
          {drawText("30%", "21%", "5p")}
          {/* 6s text */}
          {drawText("11%", "15%", "6s")}
          {/* 4f text */}
          {drawText("26%", "8%", "4f")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "70") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1400"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "55%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "45%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "40%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "30%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "20%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "15%")}
          {/* 4f orbital with 2 electron */}
          {forbitalWith14Elect("3%", "7%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "80%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "70%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "56%", "3d")}

          {/* 4p text */}
          {drawText("30%", "46%", "4p")}
          {/* 5s text */}
          {drawText("11%", "40%", "5s")}
          {/* 4d text */}
          {drawText("26%", "31%", "4d")}
          {/* 5p text */}
          {drawText("30%", "21%", "5p")}
          {/* 6s text */}
          {drawText("11%", "15%", "6s")}
          {/* 4f text */}
          {drawText("26%", "8%", "4f")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "71") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1600"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "55%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "45%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "45%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "35%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "25%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "25%")}
          {/* 4f orbital with 2 electron */}
          {forbitalWith14Elect("3%", "15%")}
          {/* 5d orbital with 1 electron */}
          {dorbitalWith1Elect("3%", "7%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "81%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "71%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "56%", "3d")}

          {/* 4p text */}
          {drawText("30%", "46%", "4p")}
          {/* 5s text */}
          {drawText("11%", "45%", "5s")}
          {/* 4d text */}
          {drawText("26%", "35%", "4d")}
          {/* 5p text */}
          {drawText("30%", "26%", "5p")}
          {/* 6s text */}
          {drawText("11%", "25%", "6s")}
          {/* 4f text */}
          {drawText("26%", "16%", "4f")}
          {/* 5d text */}
          {drawText("26%", "8%", "5d")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "72") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1600"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "55%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "45%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "45%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "35%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "25%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "25%")}
          {/* 4f orbital with 2 electron */}
          {forbitalWith14Elect("3%", "15%")}
          {/* 5d orbital with 2 electron */}
          {dorbitalWith2Elect("3%", "7%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "81%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "71%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "56%", "3d")}

          {/* 4p text */}
          {drawText("30%", "46%", "4p")}
          {/* 5s text */}
          {drawText("11%", "45%", "5s")}
          {/* 4d text */}
          {drawText("26%", "36%", "4d")}
          {/* 5p text */}
          {drawText("30%", "26%", "5p")}
          {/* 6s text */}
          {drawText("11%", "25%", "6s")}
          {/* 4f text */}
          {drawText("26%", "16%", "4f")}
          {/* 5d text */}
          {drawText("26%", "8%", "5d")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "73") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1600"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "55%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "45%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "45%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "35%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "25%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "25%")}
          {/* 4f orbital with 2 electron */}
          {forbitalWith14Elect("3%", "15%")}
          {/* 5d orbital with 2 electron */}
          {dorbitalWith3Elect("3%", "7%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "81%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "71%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "56%", "3d")}

          {/* 4p text */}
          {drawText("30%", "46%", "4p")}
          {/* 5s text */}
          {drawText("11%", "45%", "5s")}
          {/* 4d text */}
          {drawText("26%", "36%", "4d")}
          {/* 5p text */}
          {drawText("30%", "26%", "5p")}
          {/* 6s text */}
          {drawText("11%", "25%", "6s")}
          {/* 4f text */}
          {drawText("26%", "16%", "4f")}
          {/* 5d text */}
          {drawText("26%", "8%", "5d")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "74") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1600"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "55%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "45%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "45%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "35%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "25%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "25%")}
          {/* 4f orbital with 2 electron */}
          {forbitalWith14Elect("3%", "15%")}
          {/* 5d orbital with 2 electron */}
          {dorbitalWith4Elect("3%", "7%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "81%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "71%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "56%", "3d")}

          {/* 4p text */}
          {drawText("30%", "46%", "4p")}
          {/* 5s text */}
          {drawText("11%", "45%", "5s")}
          {/* 4d text */}
          {drawText("26%", "36%", "4d")}
          {/* 5p text */}
          {drawText("30%", "26%", "5p")}
          {/* 6s text */}
          {drawText("11%", "25%", "6s")}
          {/* 4f text */}
          {drawText("26%", "16%", "4f")}
          {/* 5d text */}
          {drawText("26%", "8%", "5d")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "75") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1600"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "55%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "45%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "45%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "35%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "25%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "25%")}
          {/* 4f orbital with 2 electron */}
          {forbitalWith14Elect("3%", "15%")}
          {/* 5d orbital with 2 electron */}
          {dorbitalWith5Elect("3%", "7%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "81%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "71%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "56%", "3d")}

          {/* 4p text */}
          {drawText("30%", "46%", "4p")}
          {/* 5s text */}
          {drawText("11%", "45%", "5s")}
          {/* 4d text */}
          {drawText("26%", "36%", "4d")}
          {/* 5p text */}
          {drawText("30%", "26%", "5p")}
          {/* 6s text */}
          {drawText("11%", "25%", "6s")}
          {/* 4f text */}
          {drawText("26%", "16%", "4f")}
          {/* 5d text */}
          {drawText("26%", "8%", "5d")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "76") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1600"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "55%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "45%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "45%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "35%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "25%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "25%")}
          {/* 4f orbital with 2 electron */}
          {forbitalWith14Elect("3%", "15%")}
          {/* 5d orbital with 2 electron */}
          {dorbitalWith6Elect("3%", "7%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "81%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "71%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "56%", "3d")}

          {/* 4p text */}
          {drawText("30%", "46%", "4p")}
          {/* 5s text */}
          {drawText("11%", "45%", "5s")}
          {/* 4d text */}
          {drawText("26%", "36%", "4d")}
          {/* 5p text */}
          {drawText("30%", "26%", "5p")}
          {/* 6s text */}
          {drawText("11%", "25%", "6s")}
          {/* 4f text */}
          {drawText("26%", "16%", "4f")}
          {/* 5d text */}
          {drawText("26%", "8%", "5d")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "77") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1600"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "55%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "45%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "45%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "35%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "25%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "25%")}
          {/* 4f orbital with 2 electron */}
          {forbitalWith14Elect("3%", "15%")}
          {/* 5d orbital with 2 electron */}
          {dorbitalWith7Elect("3%", "7%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "81%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "71%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "56%", "3d")}

          {/* 4p text */}
          {drawText("30%", "46%", "4p")}
          {/* 5s text */}
          {drawText("11%", "45%", "5s")}
          {/* 4d text */}
          {drawText("26%", "36%", "4d")}
          {/* 5p text */}
          {drawText("30%", "26%", "5p")}
          {/* 6s text */}
          {drawText("11%", "25%", "6s")}
          {/* 4f text */}
          {drawText("26%", "16%", "4f")}
          {/* 5d text */}
          {drawText("26%", "8%", "5d")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "78") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1600"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "55%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "45%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "45%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "35%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "25%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "25%")}
          {/* 4f orbital with 2 electron */}
          {forbitalWith14Elect("3%", "15%")}
          {/* 5d orbital with 2 electron */}
          {dorbitalWith8Elect("3%", "7%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "81%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "71%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "56%", "3d")}

          {/* 4p text */}
          {drawText("30%", "46%", "4p")}
          {/* 5s text */}
          {drawText("11%", "45%", "5s")}
          {/* 4d text */}
          {drawText("26%", "36%", "4d")}
          {/* 5p text */}
          {drawText("30%", "26%", "5p")}
          {/* 6s text */}
          {drawText("11%", "25%", "6s")}
          {/* 4f text */}
          {drawText("26%", "16%", "4f")}
          {/* 5d text */}
          {drawText("26%", "8%", "5d")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "79") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1600"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "55%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "45%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "45%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "35%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "25%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "25%")}
          {/* 4f orbital with 2 electron */}
          {forbitalWith14Elect("3%", "15%")}
          {/* 5d orbital with 2 electron */}
          {dorbitalWith9Elect("3%", "7%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "81%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "71%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "56%", "3d")}

          {/* 4p text */}
          {drawText("30%", "46%", "4p")}
          {/* 5s text */}
          {drawText("11%", "45%", "5s")}
          {/* 4d text */}
          {drawText("26%", "36%", "4d")}
          {/* 5p text */}
          {drawText("30%", "26%", "5p")}
          {/* 6s text */}
          {drawText("11%", "25%", "6s")}
          {/* 4f text */}
          {drawText("26%", "16%", "4f")}
          {/* 5d text */}
          {drawText("26%", "8%", "5d")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "80") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1600"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "55%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "45%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "45%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "35%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "25%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "25%")}
          {/* 4f orbital with 2 electron */}
          {forbitalWith14Elect("3%", "15%")}
          {/* 5d orbital with 2 electron */}
          {dorbitalWithTenElect("3%", "7%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "81%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "71%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "56%", "3d")}

          {/* 4p text */}
          {drawText("30%", "46%", "4p")}
          {/* 5s text */}
          {drawText("11%", "45%", "5s")}
          {/* 4d text */}
          {drawText("26%", "36%", "4d")}
          {/* 5p text */}
          {drawText("30%", "26%", "5p")}
          {/* 6s text */}
          {drawText("11%", "25%", "6s")}
          {/* 4f text */}
          {drawText("26%", "16%", "4f")}
          {/* 5d text */}
          {drawText("26%", "8%", "5d")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "81") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1600"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "57%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "50%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "48%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "41%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "34%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "30%")}
          {/* 4f orbital with 2 electron */}
          {forbitalWith14Elect("3%", "23%")}
          {/* 5d orbital with 2 electron */}
          {dorbitalWithTenElect("3%", "15%")}
          {/* 6p-orbital-1-electron-react */}
          {porbitalWith1Elect("20%", "7%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "81%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "71%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "58%", "3d")}

          {/* 4p text */}
          {drawText("30%", "51%", "4p")}
          {/* 5s text */}
          {drawText("11%", "48%", "5s")}
          {/* 4d text */}
          {drawText("26%", "42%", "4d")}
          {/* 5p text */}
          {drawText("30%", "35%", "5p")}
          {/* 6s text */}
          {drawText("11%", "30%", "6s")}
          {/* 4f text */}
          {drawText("26%", "24%", "4f")}
          {/* 5d text */}
          {drawText("26%", "16%", "5d")}
          {/* 6p text */}
          {drawText("30%", "8%", "6p")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "82") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1600"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "57%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "50%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "48%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "41%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "34%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "30%")}
          {/* 4f orbital with 2 electron */}
          {forbitalWith14Elect("3%", "23%")}
          {/* 5d orbital with 2 electron */}
          {dorbitalWithTenElect("3%", "15%")}
          {/* 6p-orbital-1-electron-react */}
          {porbitalWith2Elect("20%", "7%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "81%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "71%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "58%", "3d")}

          {/* 4p text */}
          {drawText("30%", "51%", "4p")}
          {/* 5s text */}
          {drawText("11%", "48%", "5s")}
          {/* 4d text */}
          {drawText("26%", "42%", "4d")}
          {/* 5p text */}
          {drawText("30%", "35%", "5p")}
          {/* 6s text */}
          {drawText("11%", "30%", "6s")}
          {/* 4f text */}
          {drawText("26%", "24%", "4f")}
          {/* 5d text */}
          {drawText("26%", "16%", "5d")}
          {/* 6p text */}
          {drawText("30%", "8%", "6p")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "83") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1600"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "57%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "50%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "48%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "41%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "34%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "30%")}
          {/* 4f orbital with 2 electron */}
          {forbitalWith14Elect("3%", "23%")}
          {/* 5d orbital with 2 electron */}
          {dorbitalWithTenElect("3%", "15%")}
          {/* 6p-orbital-1-electron-react */}
          {porbitalWith3Elect("20%", "7%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "81%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "71%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "58%", "3d")}

          {/* 4p text */}
          {drawText("30%", "51%", "4p")}
          {/* 5s text */}
          {drawText("11%", "48%", "5s")}
          {/* 4d text */}
          {drawText("26%", "42%", "4d")}
          {/* 5p text */}
          {drawText("30%", "35%", "5p")}
          {/* 6s text */}
          {drawText("11%", "30%", "6s")}
          {/* 4f text */}
          {drawText("26%", "24%", "4f")}
          {/* 5d text */}
          {drawText("26%", "16%", "5d")}
          {/* 6p text */}
          {drawText("30%", "8%", "6p")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "84") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1600"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "57%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "50%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "48%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "41%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "34%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "30%")}
          {/* 4f orbital with 2 electron */}
          {forbitalWith14Elect("3%", "23%")}
          {/* 5d orbital with 2 electron */}
          {dorbitalWithTenElect("3%", "15%")}
          {/* 6p-orbital-1-electron-react */}
          {porbitalWith4Elect("20%", "7%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "81%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "71%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "58%", "3d")}

          {/* 4p text */}
          {drawText("30%", "51%", "4p")}
          {/* 5s text */}
          {drawText("11%", "48%", "5s")}
          {/* 4d text */}
          {drawText("26%", "42%", "4d")}
          {/* 5p text */}
          {drawText("30%", "35%", "5p")}
          {/* 6s text */}
          {drawText("11%", "30%", "6s")}
          {/* 4f text */}
          {drawText("26%", "24%", "4f")}
          {/* 5d text */}
          {drawText("26%", "16%", "5d")}
          {/* 6p text */}
          {drawText("30%", "8%", "6p")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "85") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1600"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "57%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "50%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "48%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "41%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "34%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "30%")}
          {/* 4f orbital with 2 electron */}
          {forbitalWith14Elect("3%", "23%")}
          {/* 5d orbital with 2 electron */}
          {dorbitalWithTenElect("3%", "15%")}
          {/* 6p-orbital-1-electron-react */}
          {porbitalWith5Elect("20%", "7%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "81%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "71%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "58%", "3d")}

          {/* 4p text */}
          {drawText("30%", "51%", "4p")}
          {/* 5s text */}
          {drawText("11%", "48%", "5s")}
          {/* 4d text */}
          {drawText("26%", "42%", "4d")}
          {/* 5p text */}
          {drawText("30%", "35%", "5p")}
          {/* 6s text */}
          {drawText("11%", "30%", "6s")}
          {/* 4f text */}
          {drawText("26%", "24%", "4f")}
          {/* 5d text */}
          {drawText("26%", "16%", "5d")}
          {/* 6p text */}
          {drawText("30%", "8%", "6p")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "86") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="1600"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "95%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "87%")}

          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}

          {/* 3s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "75%")}

          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "70%")}

          {/* 4s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "65%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "57%")}

          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "50%")}
          {/* 5s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "48%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "41%")}

          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "34%")}

          {/* 6s-rect-orbital-2-electron */}

          {sOrbitalWith2Elect("10%", "30%")}
          {/* 4f orbital with 2 electron */}
          {forbitalWith14Elect("3%", "23%")}
          {/* 5d orbital with 2 electron */}
          {dorbitalWithTenElect("3%", "15%")}
          {/* 6p-orbital-1-electron-react */}
          {porbitalWith6Elect("20%", "7%")}

          {/* 1s text */}
          {drawText("11%", "95%", "1s")}
          {/* 2s text */}
          {drawText("11%", "87%", "2s")}
          {/* 2p text */}
          {drawText("30%", "81%", "2p")}
          {/* 3s text */}
          {drawText("11%", "75%", "3s")}

          {/* 3p text */}
          {drawText("30%", "71%", "3p")}

          {/* 4s text */}
          {drawText("11%", "65%", "4s")}
          {/* 3d text */}
          {drawText("26%", "58%", "3d")}

          {/* 4p text */}
          {drawText("30%", "51%", "4p")}
          {/* 5s text */}
          {drawText("11%", "48%", "5s")}
          {/* 4d text */}
          {drawText("26%", "42%", "4d")}
          {/* 5p text */}
          {drawText("30%", "35%", "5p")}
          {/* 6s text */}
          {drawText("11%", "30%", "6s")}
          {/* 4f text */}
          {drawText("26%", "24%", "4f")}
          {/* 5d text */}
          {drawText("26%", "16%", "5d")}
          {/* 6p text */}
          {drawText("30%", "8%", "6p")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "87") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="2000"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "96%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "90%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "86%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "83%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "75%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "70%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "64%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "62%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "56%")}
          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "50%")}
          {/* 6s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "48%")}
          {/* 4f-rect-orbital-14-electron */}
          {forbitalWith14Elect("3%", "40%")}
          {/* 5d-rect-orbital-10-electron */}
          {dorbitalWithTenElect("3%", "32%")}
          {/* 6p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "25%")}
          {/* 7s-rect-orbital-2-electron */}
          {sOrbitalWith1Elect("10%", "20%")}
          {/* 1s text */}
          {drawText("11%", "96%", "1s")}
          {/* 2s text */}
          {drawText("11%", "90%", "2s")}
          {/* 2p text */}
          {drawText("30%", "86%", "2p")}
          {/* 3s text */}
          {drawText("11%", "83%", "3s")}
          {/* 3p text */}
          {drawText("30%", "80%", "3p")}
          {/* 4s text */}
          {drawText("11%", "75%", "4s")}
          {/* 3d text */}
          {drawText("26%", "70%", "3d")}
          {/* 4p text */}
          {drawText("30%", "64%", "4p")}
          {/* 5s text */}
          {drawText("11%", "62%", "5s")}
          {/* 4d text */}
          {drawText("26%", "56.5%", "4d")}
          {/* 5p text */}
          {drawText("30%", "50.5%", "5p")}
          {/* 6s text */}
          {drawText("11%", "48%", "6s")}
          {/* 3f text */}
          {drawText("26%", "40.5%", "4f")}
          {/* 5d text */}
          {drawText("26%", "32%", "5d")}
          {/* 6p text */}
          {drawText("26%", "25%", "6p")}
          {/* 7s text */}
          {drawText("11%", "20%", "7s")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "88") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="2000"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "96%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "90%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "86%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "83%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "75%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "70%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "64%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "62%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "56%")}
          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "50%")}
          {/* 6s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "48%")}
          {/* 4f-rect-orbital-14-electron */}
          {forbitalWith14Elect("3%", "40%")}
          {/* 5d-rect-orbital-10-electron */}
          {dorbitalWithTenElect("3%", "32%")}
          {/* 6p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "25%")}
          {/* 7s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "20%")}
          {/* 1s text */}
          {drawText("11%", "96%", "1s")}
          {/* 2s text */}
          {drawText("11%", "90%", "2s")}
          {/* 2p text */}
          {drawText("30%", "86%", "2p")}
          {/* 3s text */}
          {drawText("11%", "83%", "3s")}
          {/* 3p text */}
          {drawText("30%", "80%", "3p")}
          {/* 4s text */}
          {drawText("11%", "75%", "4s")}
          {/* 3d text */}
          {drawText("26%", "70%", "3d")}
          {/* 4p text */}
          {drawText("30%", "64%", "4p")}
          {/* 5s text */}
          {drawText("11%", "62%", "5s")}
          {/* 4d text */}
          {drawText("26%", "56.5%", "4d")}
          {/* 5p text */}
          {drawText("30%", "50.5%", "5p")}
          {/* 6s text */}
          {drawText("11%", "48%", "6s")}
          {/* 3f text */}
          {drawText("26%", "40.5%", "4f")}
          {/* 5d text */}
          {drawText("26%", "32%", "5d")}
          {/* 6p text */}
          {drawText("26%", "25%", "6p")}
          {/* 7s text */}
          {drawText("11%", "20%", "7s")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "89") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="2000"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "96%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "90%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "86%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "83%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "75%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "70%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "64%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "62%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "56%")}
          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "50%")}
          {/* 6s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "48%")}
          {/* 4f-rect-orbital-14-electron */}
          {forbitalWith14Elect("3%", "40%")}
          {/* 5d-rect-orbital-10-electron */}
          {dorbitalWithTenElect("3%", "32%")}
          {/* 6p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "25%")}
          {/* 7s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "20%")}
          {/* 5f-rect-orbital-1-electron */}
          {forbitalWith1Elect("3%", "10%")}
          {/* 1s text */}
          {drawText("11%", "96%", "1s")}
          {/* 2s text */}
          {drawText("11%", "90%", "2s")}
          {/* 2p text */}
          {drawText("30%", "86%", "2p")}
          {/* 3s text */}
          {drawText("11%", "83%", "3s")}
          {/* 3p text */}
          {drawText("30%", "80%", "3p")}
          {/* 4s text */}
          {drawText("11%", "75%", "4s")}
          {/* 3d text */}
          {drawText("26%", "70%", "3d")}
          {/* 4p text */}
          {drawText("30%", "64%", "4p")}
          {/* 5s text */}
          {drawText("11%", "62%", "5s")}
          {/* 4d text */}
          {drawText("26%", "56.5%", "4d")}
          {/* 5p text */}
          {drawText("30%", "50.5%", "5p")}
          {/* 6s text */}
          {drawText("11%", "48%", "6s")}
          {/* 4f text */}
          {drawText("26%", "40.5%", "4f")}
          {/* 5d text */}
          {drawText("26%", "32%", "5d")}
          {/* 6p text */}
          {drawText("26%", "25%", "6p")}
          {/* 7s text */}
          {drawText("11%", "20%", "7s")}
          {/* 5f text */}
          {drawText("26%", "10%", "5f")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "90") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="2000"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "96%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "90%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "86%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "83%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "75%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "70%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "64%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "62%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "56%")}
          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "50%")}
          {/* 6s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "48%")}
          {/* 4f-rect-orbital-14-electron */}
          {forbitalWith14Elect("3%", "40%")}
          {/* 5d-rect-orbital-10-electron */}
          {dorbitalWithTenElect("3%", "32%")}
          {/* 6p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "25%")}
          {/* 7s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "20%")}
          {/* 5f-rect-orbital-1-electron */}
          {forbitalWith2Elect("3%", "10%")}
          {/* 1s text */}
          {drawText("11%", "96%", "1s")}
          {/* 2s text */}
          {drawText("11%", "90%", "2s")}
          {/* 2p text */}
          {drawText("30%", "86%", "2p")}
          {/* 3s text */}
          {drawText("11%", "83%", "3s")}
          {/* 3p text */}
          {drawText("30%", "80%", "3p")}
          {/* 4s text */}
          {drawText("11%", "75%", "4s")}
          {/* 3d text */}
          {drawText("26%", "70%", "3d")}
          {/* 4p text */}
          {drawText("30%", "64%", "4p")}
          {/* 5s text */}
          {drawText("11%", "62%", "5s")}
          {/* 4d text */}
          {drawText("26%", "56.5%", "4d")}
          {/* 5p text */}
          {drawText("30%", "50.5%", "5p")}
          {/* 6s text */}
          {drawText("11%", "48%", "6s")}
          {/* 4f text */}
          {drawText("26%", "40.5%", "4f")}
          {/* 5d text */}
          {drawText("26%", "32%", "5d")}
          {/* 6p text */}
          {drawText("26%", "25%", "6p")}
          {/* 7s text */}
          {drawText("11%", "20%", "7s")}
          {/* 5f text */}
          {drawText("26%", "10%", "5f")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "91") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="2000"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "96%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "90%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "86%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "83%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "75%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "70%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "64%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "62%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "56%")}
          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "50%")}
          {/* 6s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "48%")}
          {/* 4f-rect-orbital-14-electron */}
          {forbitalWith14Elect("3%", "40%")}
          {/* 5d-rect-orbital-10-electron */}
          {dorbitalWithTenElect("3%", "32%")}
          {/* 6p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "25%")}
          {/* 7s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "20%")}
          {/* 5f-rect-orbital-1-electron */}
          {forbitalWith3Elect("3%", "10%")}
          {/* 1s text */}
          {drawText("11%", "96%", "1s")}
          {/* 2s text */}
          {drawText("11%", "90%", "2s")}
          {/* 2p text */}
          {drawText("30%", "86%", "2p")}
          {/* 3s text */}
          {drawText("11%", "83%", "3s")}
          {/* 3p text */}
          {drawText("30%", "80%", "3p")}
          {/* 4s text */}
          {drawText("11%", "75%", "4s")}
          {/* 3d text */}
          {drawText("26%", "70%", "3d")}
          {/* 4p text */}
          {drawText("30%", "64%", "4p")}
          {/* 5s text */}
          {drawText("11%", "62%", "5s")}
          {/* 4d text */}
          {drawText("26%", "56.5%", "4d")}
          {/* 5p text */}
          {drawText("30%", "50.5%", "5p")}
          {/* 6s text */}
          {drawText("11%", "48%", "6s")}
          {/* 4f text */}
          {drawText("26%", "40.5%", "4f")}
          {/* 5d text */}
          {drawText("26%", "32%", "5d")}
          {/* 6p text */}
          {drawText("26%", "25%", "6p")}
          {/* 7s text */}
          {drawText("11%", "20%", "7s")}
          {/* 5f text */}
          {drawText("26%", "10%", "5f")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "92") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="2000"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "96%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "90%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "86%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "83%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "75%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "70%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "64%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "62%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "56%")}
          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "50%")}
          {/* 6s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "48%")}
          {/* 4f-rect-orbital-14-electron */}
          {forbitalWith14Elect("3%", "40%")}
          {/* 5d-rect-orbital-10-electron */}
          {dorbitalWithTenElect("3%", "32%")}
          {/* 6p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "25%")}
          {/* 7s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "20%")}
          {/* 5f-rect-orbital-1-electron */}
          {forbitalWith4Elect("3%", "10%")}
          {/* 1s text */}
          {drawText("11%", "96%", "1s")}
          {/* 2s text */}
          {drawText("11%", "90%", "2s")}
          {/* 2p text */}
          {drawText("30%", "86%", "2p")}
          {/* 3s text */}
          {drawText("11%", "83%", "3s")}
          {/* 3p text */}
          {drawText("30%", "80%", "3p")}
          {/* 4s text */}
          {drawText("11%", "75%", "4s")}
          {/* 3d text */}
          {drawText("26%", "70%", "3d")}
          {/* 4p text */}
          {drawText("30%", "64%", "4p")}
          {/* 5s text */}
          {drawText("11%", "62%", "5s")}
          {/* 4d text */}
          {drawText("26%", "56.5%", "4d")}
          {/* 5p text */}
          {drawText("30%", "50.5%", "5p")}
          {/* 6s text */}
          {drawText("11%", "48%", "6s")}
          {/* 4f text */}
          {drawText("26%", "40.5%", "4f")}
          {/* 5d text */}
          {drawText("26%", "32%", "5d")}
          {/* 6p text */}
          {drawText("26%", "25%", "6p")}
          {/* 7s text */}
          {drawText("11%", "20%", "7s")}
          {/* 5f text */}
          {drawText("26%", "10%", "5f")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "93") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="2000"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "96%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "90%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "86%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "83%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "75%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "70%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "64%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "62%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "56%")}
          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "50%")}
          {/* 6s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "48%")}
          {/* 4f-rect-orbital-14-electron */}
          {forbitalWith14Elect("3%", "40%")}
          {/* 5d-rect-orbital-10-electron */}
          {dorbitalWithTenElect("3%", "32%")}
          {/* 6p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "25%")}
          {/* 7s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "20%")}
          {/* 5f-rect-orbital-1-electron */}
          {forbitalWith5Elect("3%", "10%")}
          {/* 1s text */}
          {drawText("11%", "96%", "1s")}
          {/* 2s text */}
          {drawText("11%", "90%", "2s")}
          {/* 2p text */}
          {drawText("30%", "86%", "2p")}
          {/* 3s text */}
          {drawText("11%", "83%", "3s")}
          {/* 3p text */}
          {drawText("30%", "80%", "3p")}
          {/* 4s text */}
          {drawText("11%", "75%", "4s")}
          {/* 3d text */}
          {drawText("26%", "70%", "3d")}
          {/* 4p text */}
          {drawText("30%", "64%", "4p")}
          {/* 5s text */}
          {drawText("11%", "62%", "5s")}
          {/* 4d text */}
          {drawText("26%", "56.5%", "4d")}
          {/* 5p text */}
          {drawText("30%", "50.5%", "5p")}
          {/* 6s text */}
          {drawText("11%", "48%", "6s")}
          {/* 4f text */}
          {drawText("26%", "40.5%", "4f")}
          {/* 5d text */}
          {drawText("26%", "32%", "5d")}
          {/* 6p text */}
          {drawText("26%", "25%", "6p")}
          {/* 7s text */}
          {drawText("11%", "20%", "7s")}
          {/* 5f text */}
          {drawText("26%", "10%", "5f")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "94") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="2000"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "96%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "90%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "86%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "83%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "75%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "70%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "64%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "62%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "56%")}
          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "50%")}
          {/* 6s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "48%")}
          {/* 4f-rect-orbital-14-electron */}
          {forbitalWith14Elect("3%", "40%")}
          {/* 5d-rect-orbital-10-electron */}
          {dorbitalWithTenElect("3%", "32%")}
          {/* 6p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "25%")}
          {/* 7s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "20%")}
          {/* 5f-rect-orbital-1-electron */}
          {forbitalWith6Elect("3%", "10%")}
          {/* 1s text */}
          {drawText("11%", "96%", "1s")}
          {/* 2s text */}
          {drawText("11%", "90%", "2s")}
          {/* 2p text */}
          {drawText("30%", "86%", "2p")}
          {/* 3s text */}
          {drawText("11%", "83%", "3s")}
          {/* 3p text */}
          {drawText("30%", "80%", "3p")}
          {/* 4s text */}
          {drawText("11%", "75%", "4s")}
          {/* 3d text */}
          {drawText("26%", "70%", "3d")}
          {/* 4p text */}
          {drawText("30%", "64%", "4p")}
          {/* 5s text */}
          {drawText("11%", "62%", "5s")}
          {/* 4d text */}
          {drawText("26%", "56.5%", "4d")}
          {/* 5p text */}
          {drawText("30%", "50.5%", "5p")}
          {/* 6s text */}
          {drawText("11%", "48%", "6s")}
          {/* 4f text */}
          {drawText("26%", "40.5%", "4f")}
          {/* 5d text */}
          {drawText("26%", "32%", "5d")}
          {/* 6p text */}
          {drawText("26%", "25%", "6p")}
          {/* 7s text */}
          {drawText("11%", "20%", "7s")}
          {/* 5f text */}
          {drawText("26%", "10%", "5f")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "95") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="2000"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "96%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "90%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "86%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "83%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "75%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "70%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "64%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "62%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "56%")}
          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "50%")}
          {/* 6s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "48%")}
          {/* 4f-rect-orbital-14-electron */}
          {forbitalWith14Elect("3%", "40%")}
          {/* 5d-rect-orbital-10-electron */}
          {dorbitalWithTenElect("3%", "32%")}
          {/* 6p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "25%")}
          {/* 7s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "20%")}
          {/* 5f-rect-orbital-1-electron */}
          {forbitalWith7Elect("3%", "10%")}
          {/* 1s text */}
          {drawText("11%", "96%", "1s")}
          {/* 2s text */}
          {drawText("11%", "90%", "2s")}
          {/* 2p text */}
          {drawText("30%", "86%", "2p")}
          {/* 3s text */}
          {drawText("11%", "83%", "3s")}
          {/* 3p text */}
          {drawText("30%", "80%", "3p")}
          {/* 4s text */}
          {drawText("11%", "75%", "4s")}
          {/* 3d text */}
          {drawText("26%", "70%", "3d")}
          {/* 4p text */}
          {drawText("30%", "64%", "4p")}
          {/* 5s text */}
          {drawText("11%", "62%", "5s")}
          {/* 4d text */}
          {drawText("26%", "56.5%", "4d")}
          {/* 5p text */}
          {drawText("30%", "50.5%", "5p")}
          {/* 6s text */}
          {drawText("11%", "48%", "6s")}
          {/* 4f text */}
          {drawText("26%", "40.5%", "4f")}
          {/* 5d text */}
          {drawText("26%", "32%", "5d")}
          {/* 6p text */}
          {drawText("26%", "25%", "6p")}
          {/* 7s text */}
          {drawText("11%", "20%", "7s")}
          {/* 5f text */}
          {drawText("26%", "10%", "5f")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "96") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="2000"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "96%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "90%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "86%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "83%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "75%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "70%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "64%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "62%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "56%")}
          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "50%")}
          {/* 6s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "48%")}
          {/* 4f-rect-orbital-14-electron */}
          {forbitalWith14Elect("3%", "40%")}
          {/* 5d-rect-orbital-10-electron */}
          {dorbitalWithTenElect("3%", "32%")}
          {/* 6p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "25%")}
          {/* 7s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "20%")}
          {/* 5f-rect-orbital-1-electron */}
          {forbitalWith8Elect("3%", "10%")}
          {/* 1s text */}
          {drawText("11%", "96%", "1s")}
          {/* 2s text */}
          {drawText("11%", "90%", "2s")}
          {/* 2p text */}
          {drawText("30%", "86%", "2p")}
          {/* 3s text */}
          {drawText("11%", "83%", "3s")}
          {/* 3p text */}
          {drawText("30%", "80%", "3p")}
          {/* 4s text */}
          {drawText("11%", "75%", "4s")}
          {/* 3d text */}
          {drawText("26%", "70%", "3d")}
          {/* 4p text */}
          {drawText("30%", "64%", "4p")}
          {/* 5s text */}
          {drawText("11%", "62%", "5s")}
          {/* 4d text */}
          {drawText("26%", "56.5%", "4d")}
          {/* 5p text */}
          {drawText("30%", "50.5%", "5p")}
          {/* 6s text */}
          {drawText("11%", "48%", "6s")}
          {/* 4f text */}
          {drawText("26%", "40.5%", "4f")}
          {/* 5d text */}
          {drawText("26%", "32%", "5d")}
          {/* 6p text */}
          {drawText("26%", "25%", "6p")}
          {/* 7s text */}
          {drawText("11%", "20%", "7s")}
          {/* 5f text */}
          {drawText("26%", "10%", "5f")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "97") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="2000"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "96%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "90%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "86%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "83%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "75%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "70%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "64%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "62%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "56%")}
          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "50%")}
          {/* 6s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "48%")}
          {/* 4f-rect-orbital-14-electron */}
          {forbitalWith14Elect("3%", "40%")}
          {/* 5d-rect-orbital-10-electron */}
          {dorbitalWithTenElect("3%", "32%")}
          {/* 6p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "25%")}
          {/* 7s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "20%")}
          {/* 5f-rect-orbital-1-electron */}
          {forbitalWith9Elect("3%", "10%")}
          {/* 1s text */}
          {drawText("11%", "96%", "1s")}
          {/* 2s text */}
          {drawText("11%", "90%", "2s")}
          {/* 2p text */}
          {drawText("30%", "86%", "2p")}
          {/* 3s text */}
          {drawText("11%", "83%", "3s")}
          {/* 3p text */}
          {drawText("30%", "80%", "3p")}
          {/* 4s text */}
          {drawText("11%", "75%", "4s")}
          {/* 3d text */}
          {drawText("26%", "70%", "3d")}
          {/* 4p text */}
          {drawText("30%", "64%", "4p")}
          {/* 5s text */}
          {drawText("11%", "62%", "5s")}
          {/* 4d text */}
          {drawText("26%", "56.5%", "4d")}
          {/* 5p text */}
          {drawText("30%", "50.5%", "5p")}
          {/* 6s text */}
          {drawText("11%", "48%", "6s")}
          {/* 4f text */}
          {drawText("26%", "40.5%", "4f")}
          {/* 5d text */}
          {drawText("26%", "32%", "5d")}
          {/* 6p text */}
          {drawText("26%", "25%", "6p")}
          {/* 7s text */}
          {drawText("11%", "20%", "7s")}
          {/* 5f text */}
          {drawText("26%", "10%", "5f")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "98") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="2000"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "96%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "90%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "86%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "83%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "75%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "70%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "64%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "62%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "56%")}
          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "50%")}
          {/* 6s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "48%")}
          {/* 4f-rect-orbital-14-electron */}
          {forbitalWith14Elect("3%", "40%")}
          {/* 5d-rect-orbital-10-electron */}
          {dorbitalWithTenElect("3%", "32%")}
          {/* 6p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "25%")}
          {/* 7s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "20%")}
          {/* 5f-rect-orbital-1-electron */}
          {forbitalWith10Elect("3%", "10%")}
          {/* 1s text */}
          {drawText("11%", "96%", "1s")}
          {/* 2s text */}
          {drawText("11%", "90%", "2s")}
          {/* 2p text */}
          {drawText("30%", "86%", "2p")}
          {/* 3s text */}
          {drawText("11%", "83%", "3s")}
          {/* 3p text */}
          {drawText("30%", "80%", "3p")}
          {/* 4s text */}
          {drawText("11%", "75%", "4s")}
          {/* 3d text */}
          {drawText("26%", "70%", "3d")}
          {/* 4p text */}
          {drawText("30%", "64%", "4p")}
          {/* 5s text */}
          {drawText("11%", "62%", "5s")}
          {/* 4d text */}
          {drawText("26%", "56.5%", "4d")}
          {/* 5p text */}
          {drawText("30%", "50.5%", "5p")}
          {/* 6s text */}
          {drawText("11%", "48%", "6s")}
          {/* 4f text */}
          {drawText("26%", "40.5%", "4f")}
          {/* 5d text */}
          {drawText("26%", "32%", "5d")}
          {/* 6p text */}
          {drawText("26%", "25%", "6p")}
          {/* 7s text */}
          {drawText("11%", "20%", "7s")}
          {/* 5f text */}
          {drawText("26%", "10%", "5f")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "99") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="2000"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "96%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "90%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "86%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "83%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "75%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "70%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "64%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "62%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "56%")}
          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "50%")}
          {/* 6s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "48%")}
          {/* 4f-rect-orbital-14-electron */}
          {forbitalWith14Elect("3%", "40%")}
          {/* 5d-rect-orbital-10-electron */}
          {dorbitalWithTenElect("3%", "32%")}
          {/* 6p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "25%")}
          {/* 7s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "20%")}
          {/* 5f-rect-orbital-1-electron */}
          {forbitalWith11Elect("3%", "10%")}
          {/* 1s text */}
          {drawText("11%", "96%", "1s")}
          {/* 2s text */}
          {drawText("11%", "90%", "2s")}
          {/* 2p text */}
          {drawText("30%", "86%", "2p")}
          {/* 3s text */}
          {drawText("11%", "83%", "3s")}
          {/* 3p text */}
          {drawText("30%", "80%", "3p")}
          {/* 4s text */}
          {drawText("11%", "75%", "4s")}
          {/* 3d text */}
          {drawText("26%", "70%", "3d")}
          {/* 4p text */}
          {drawText("30%", "64%", "4p")}
          {/* 5s text */}
          {drawText("11%", "62%", "5s")}
          {/* 4d text */}
          {drawText("26%", "56.5%", "4d")}
          {/* 5p text */}
          {drawText("30%", "50.5%", "5p")}
          {/* 6s text */}
          {drawText("11%", "48%", "6s")}
          {/* 4f text */}
          {drawText("26%", "40.5%", "4f")}
          {/* 5d text */}
          {drawText("26%", "32%", "5d")}
          {/* 6p text */}
          {drawText("26%", "25%", "6p")}
          {/* 7s text */}
          {drawText("11%", "20%", "7s")}
          {/* 5f text */}
          {drawText("26%", "10%", "5f")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "100") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="2000"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "96%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "90%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "86%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "83%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "75%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "70%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "64%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "62%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "56%")}
          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "50%")}
          {/* 6s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "48%")}
          {/* 4f-rect-orbital-14-electron */}
          {forbitalWith14Elect("3%", "40%")}
          {/* 5d-rect-orbital-10-electron */}
          {dorbitalWithTenElect("3%", "32%")}
          {/* 6p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "25%")}
          {/* 7s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "20%")}
          {/* 5f-rect-orbital-1-electron */}
          {forbitalWith12Elect("3%", "10%")}
          {/* 1s text */}
          {drawText("11%", "96%", "1s")}
          {/* 2s text */}
          {drawText("11%", "90%", "2s")}
          {/* 2p text */}
          {drawText("30%", "86%", "2p")}
          {/* 3s text */}
          {drawText("11%", "83%", "3s")}
          {/* 3p text */}
          {drawText("30%", "80%", "3p")}
          {/* 4s text */}
          {drawText("11%", "75%", "4s")}
          {/* 3d text */}
          {drawText("26%", "70%", "3d")}
          {/* 4p text */}
          {drawText("30%", "64%", "4p")}
          {/* 5s text */}
          {drawText("11%", "62%", "5s")}
          {/* 4d text */}
          {drawText("26%", "56.5%", "4d")}
          {/* 5p text */}
          {drawText("30%", "50.5%", "5p")}
          {/* 6s text */}
          {drawText("11%", "48%", "6s")}
          {/* 4f text */}
          {drawText("26%", "40.5%", "4f")}
          {/* 5d text */}
          {drawText("26%", "32%", "5d")}
          {/* 6p text */}
          {drawText("26%", "25%", "6p")}
          {/* 7s text */}
          {drawText("11%", "20%", "7s")}
          {/* 5f text */}
          {drawText("26%", "10%", "5f")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "101") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="2000"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "96%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "90%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "86%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "83%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "75%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "70%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "64%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "62%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "56%")}
          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "50%")}
          {/* 6s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "48%")}
          {/* 4f-rect-orbital-14-electron */}
          {forbitalWith14Elect("3%", "40%")}
          {/* 5d-rect-orbital-10-electron */}
          {dorbitalWithTenElect("3%", "32%")}
          {/* 6p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "25%")}
          {/* 7s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "20%")}
          {/* 5f-rect-orbital-1-electron */}
          {forbitalWith13Elect("3%", "10%")}
          {/* 1s text */}
          {drawText("11%", "96%", "1s")}
          {/* 2s text */}
          {drawText("11%", "90%", "2s")}
          {/* 2p text */}
          {drawText("30%", "86%", "2p")}
          {/* 3s text */}
          {drawText("11%", "83%", "3s")}
          {/* 3p text */}
          {drawText("30%", "80%", "3p")}
          {/* 4s text */}
          {drawText("11%", "75%", "4s")}
          {/* 3d text */}
          {drawText("26%", "70%", "3d")}
          {/* 4p text */}
          {drawText("30%", "64%", "4p")}
          {/* 5s text */}
          {drawText("11%", "62%", "5s")}
          {/* 4d text */}
          {drawText("26%", "56.5%", "4d")}
          {/* 5p text */}
          {drawText("30%", "50.5%", "5p")}
          {/* 6s text */}
          {drawText("11%", "48%", "6s")}
          {/* 4f text */}
          {drawText("26%", "40.5%", "4f")}
          {/* 5d text */}
          {drawText("26%", "32%", "5d")}
          {/* 6p text */}
          {drawText("26%", "25%", "6p")}
          {/* 7s text */}
          {drawText("11%", "20%", "7s")}
          {/* 5f text */}
          {drawText("26%", "10%", "5f")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  } else if (selectValue === "102") {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="90%"
          height="2000"
          style={{
            border: "2px solid red",
            // minWidth: "300px",
            maxWidth: "900px",
            overflow: "scroll",
            display: "block",
          
          }}
        >
          {/* 1s react:2electron */}
          {sOrbitalWith2Elect("10%", "96%")}
          {/* 2S react=2 electron */}
          {sOrbitalWith2Elect("10%", "90%")}
          {/* 2p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "86%")}
          {/* 3s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "83%")}
          {/* 3p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "80%")}
          {/* 4s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "75%")}
          {/* 3d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "70%")}
          {/* 4p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "64%")}
          {/* 5s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "62%")}
          {/* 4d orbital with 10 electrons */}
          {dorbitalWithTenElect("3%", "56%")}
          {/* 5p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "50%")}
          {/* 6s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "48%")}
          {/* 4f-rect-orbital-14-electron */}
          {forbitalWith14Elect("3%", "40%")}
          {/* 5d-rect-orbital-10-electron */}
          {dorbitalWithTenElect("3%", "32%")}
          {/* 6p-orbital-six-electron-react */}
          {porbitalWith6Elect("20%", "25%")}
          {/* 7s-rect-orbital-2-electron */}
          {sOrbitalWith2Elect("10%", "20%")}
          {/* 5f-rect-orbital-1-electron */}
          {forbitalWith14Elect("3%", "10%")}
          {/* 1s text */}
          {drawText("11%", "96%", "1s")}
          {/* 2s text */}
          {drawText("11%", "90%", "2s")}
          {/* 2p text */}
          {drawText("30%", "86%", "2p")}
          {/* 3s text */}
          {drawText("11%", "83%", "3s")}
          {/* 3p text */}
          {drawText("30%", "80%", "3p")}
          {/* 4s text */}
          {drawText("11%", "75%", "4s")}
          {/* 3d text */}
          {drawText("26%", "70%", "3d")}
          {/* 4p text */}
          {drawText("30%", "64%", "4p")}
          {/* 5s text */}
          {drawText("11%", "62%", "5s")}
          {/* 4d text */}
          {drawText("26%", "56.5%", "4d")}
          {/* 5p text */}
          {drawText("30%", "50.5%", "5p")}
          {/* 6s text */}
          {drawText("11%", "48%", "6s")}
          {/* 4f text */}
          {drawText("26%", "40.5%", "4f")}
          {/* 5d text */}
          {drawText("26%", "32%", "5d")}
          {/* 6p text */}
          {drawText("26%", "25%", "6p")}
          {/* 7s text */}
          {drawText("11%", "20%", "7s")}
          {/* 5f text */}
          {drawText("26%", "10%", "5f")}
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
        <div style={{ display: "flex" }}>
          {displaySelect()}
          {elemSortRadioButt()}
        </div>
      </>
    );
  }

  return null;
}

export default AnimatedObitalDiag;
