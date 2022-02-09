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

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="85%"
        height="800"
        style={{ border: "2px solid red" }}
      >
        {/* 1s react */}
        <rect
          x="20%"
          y="80%"
          height="48"
          width="48"
          style={{ stroke: "#0f0f0f", fill: "#eff1ef" }}
        />

        {/* 2s react */}

        <rect
          x="20%"
          y="40%"
          height="48"
          width="48"
          style={{ stroke: "#0f0f0f", fill: "#eff1ef" }}
        />

        {/* 2p react */}
        <rect
          x="35%"
          y="30%"
          height="48"
          width="192"
          style={{ stroke: "#0f0f0f", fill: "#eff1ef" }}
        />
        {/* <line
          x1="55%"
          y1="30%"
          x2="55%"
          y2="49%"
          style={{ stroke: "#006600" }}
        />
        <line
          x1="70%"
          y1="30%"
          x2="70%"
          y2="49%"
          style={{ stroke: "#006600" }}
        /> */}

        <defs>
          <marker
            id="markerArrow"
            markerWidth="13"
            markerHeight="13"
            refX="2"
            refY="6"
            orient="auto"
          >
            <path d="M2,2 L2,11 L10,6 L2,2" style={{ fill: "#000000" }} />
          </marker>
        </defs>

        <line
          x1="22%"
          y1="82%"
          x2="22%"
          y2="92%"
          style={{
            stroke: "#6666ff",
            strokeWidth: "1px",
            fill: "none",

            markerEnd: "url(#markerArrow)",
          }}
        />

        <line
          x2="26%"
          y2="84%"
          x1="26%"
          y1="94%"
          title="this electron"
          style={{
            stroke: "#6666ff",
            strokeWidth: "1px",
            fill: "none",

            markerEnd: "url(#markerArrow)",
          }}
        />

        <line
          x1="22%"
          y1="42%"
          x2="22%"
          y2="52%"
          style={{
            stroke: "#6666ff",
            strokeWidth: "1px",
            fill: "none",

            markerEnd: "url(#markerArrow)",
          }}
        />

        <line
          x1="26%"
          y1="54%"
          x2="26%"
          y2="44%"
          style={{
            stroke: "#6666ff",
            strokeWidth: "1px",
            fill: "none",

            markerEnd: "url(#markerArrow)",
          }}
        />

        <line
          x2="46%"
          y2="45%"
          x1="46%"
          y1="32%"
          style={{
            stroke: "#6666ff",
            strokeWidth: "1px",
            fill: "none",

            markerEnd: "url(#markerArrow)",
          }}
        />

        <line
          x2="60%"
          y2="45%"
          x1="60%"
          y1="32%"
          style={{
            stroke: "#6666ff",
            strokeWidth: "1px",
            fill: "none",

            markerEnd: "url(#markerArrow)",
          }}
        />

        <line
          x1="77%"
          y1="47%"
          x2="77%"
          y2="34%"
          style={{
            stroke: "#6666ff",
            strokeWidth: "1px",
            fill: "none",

            markerEnd: "url(#markerArrow)",
          }}
        />

        <text
          x="22%"
          y="38%"
          style={{ fill: "#000000", stroke: "none", fontSize: "20px" }}
          title="2p text hereee"
        >
          2s
        </text>
        <text
          x="56%"
          y="28%"
          style={{ fill: "#000000", stroke: "none", fontSize: "20px" }}
        >
          2p
        </text>

        <text
          x="20%"
          y="78%"
          style={{ fill: "#000000", stroke: "none", fontSize: "20px" }}
        >
          1s
          <title>1s electron text</title>
        </text>

        <text
          x="80%"
          y="680"
          style={{ fill: "#000000", stroke: "none", fontSize: "20px" }}
        >
          Select an element
          <title>1s electron text</title>
        </text>
        <foreignObject x="80%" y="700" width="100" height="100">
          <body xmlns="http://www.w3.org/1999/xhtml">
            {/* <button
              onClick={() => console.log("button was clicked inside svg")}
            >
              click me
            </button> */}

            {/* <label>Select an element</label> */}
            <select
              name="elements"
              value={selectValue}
              onChange={onselectChange}
            >
              <optgroup label="Akali Earth Metals">
                <option value="3">Lithium</option>
                <option value="11">Sodium</option>
                <option value="19">Potassium</option>
                <option value="37">Rubidium</option>
              </optgroup>
              <optgroup label="Flying pets">
                <option value="parrot">Parrot</option>
                <option value="macaw">Macaw</option>
                <option value="albatross">Albatross</option>
              </optgroup>
              <optgroup label="Flying pets">
                <option value="parrot">Parrot</option>
                <option value="macaw">Macaw</option>
                <option value="albatross">Albatross</option>
              </optgroup>
              <optgroup label="Flying pets">
                <option value="parrot">Parrot</option>
                <option value="macaw">Macaw</option>
                <option value="albatross">Albatross</option>
              </optgroup>
              <optgroup label="Flying pets">
                <option value="parrot">Parrot</option>
                <option value="macaw">Macaw</option>
                <option value="albatross">Albatross</option>
              </optgroup>
            </select>
          </body>
        </foreignObject>
      </svg>
    </>
  );
}

export default AnimatedObitalDiag;
