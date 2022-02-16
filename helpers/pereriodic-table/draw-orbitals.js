export function drawText(xValue, yValue, textValue) {
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

export function sOrbitalWith2Elect(xValue, yValue) {
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

export function sOrbitalWith1Elect(xValue, yValue) {
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
export function porbitalWith1Elect(xValue, yValue) {
  return (
    <svg x={xValue} y={yValue} width="270" height="90">
      {/* <!-- 2p rect --> */}
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

        {/* <!--  electrons --> */}

        {drawElectronLine("40", "62", "40", "32")}
      </g>
    </svg>
  );
}

export function porbitalWith2Elect(xValue, yValue) {
  return (
    <svg x={xValue} y={yValue} width="270" height="90">
      {/* <!-- 2p rect --> */}
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

        {/* <defs>
    

    <marker
      id="markerArrow"
      markerWidth="13"
      markerHeight="13"
      refX="2"
      refY="6"
      orient="auto"
    >
      <path d="M2,2 L2,11 L10,6 L2,2" style="fill: #000000;stroke:black" />
    </marker>
  </defs> */}

        {/* <!--  electrons --> */}
        {/* <line
    x1="40"
    y1="62"
    x2="40"
    y2="32"
    style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
  /> */}
        {drawElectronLine("40", "62", "40", "32")}

        {/* <line
            x1="120"
            y1="62"
            x2="120"
            y2="32"
            style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
          /> */}
        {drawElectronLine("120", "62", "120", "32")}
      </g>
    </svg>
  );
}
export function porbitalWith3Elect(xValue, yValue) {
  return (
    <svg x={xValue} y={yValue} width="270" height="90">
      {/* <!-- 2p rect --> */}
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

        {/* <defs>
    

    <marker
      id="markerArrow"
      markerWidth="13"
      markerHeight="13"
      refX="2"
      refY="6"
      orient="auto"
    >
      <path d="M2,2 L2,11 L10,6 L2,2" style="fill: #000000;stroke:black" />
    </marker>
  </defs> */}
        {drawLineEndMarker()}

        {/* <!--  electrons --> */}
        {/* <line
    x1="40"
    y1="62"
    x2="40"
    y2="32"
    style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
  /> */}
        {drawElectronLine("40", "62", "40", "32")}

        {/* <line
          x1="120"
          y1="62"
          x2="120"
          y2="32"
          style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
        /> */}
        {drawElectronLine("120", "62", "120", "32")}

        {/* <line
          x1="200"
          y1="62"
          x2="200"
          y2="32"
          style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
        /> */}
        {drawElectronLine("200", "62", "200", "32")}
      </g>
    </svg>
  );
}

export function porbitalWith4Elect(xValue, yValue) {
  return (
    <svg x={xValue} y={yValue} width="270" height="90">
      {/* <!-- 2p rect --> */}
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

        {/* <defs> */}

        {/* <marker
      id="markerArrow"
      markerWidth="13"
      markerHeight="13"
      refX="2"
      refY="6"
      orient="auto"
    >
      <path d="M2,2 L2,11 L10,6 L2,2" style="fill: #000000;stroke:black" />
    </marker>
  </defs> */}
        {drawLineEndMarker()}

        {/* <!--  electrons --> */}
        {/* <line
    x1="36"
    y1="62"
    x2="36"
    y2="32"
    style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
  /> */}
        {drawElectronLine("36", "62", "36", "32")}

        {/* <line
    x1="120"
    y1="62"
    x2="120"
    y2="32"
    style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
  /> */}
        {drawElectronLine("120", "62", "120", "32")}

        {/* <line
    x1="200"
    y1="62"
    x2="200"
    y2="32"
    style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
  /> */}
        {drawElectronLine("200", "62", "200", "32")}

        {/* <line
    x2="58"
    y2="56"
    x1="58"
    y1="26"
    style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
  />
 */}
        {drawElectronLine("58", "26", "58", "56")}
      </g>
    </svg>
  );
}
export function porbitalWith5Elect(xValue, yValue) {
  return (
    <svg x={xValue} y={yValue} width="270" height="90">
      {/* <!-- 2p rect --> */}
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

        {/* <defs>
    

    <marker
      id="markerArrow"
      markerWidth="13"
      markerHeight="13"
      refX="2"
      refY="6"
      orient="auto"
    >
      <path d="M2,2 L2,11 L10,6 L2,2" style="fill: #000000;stroke:black" />
    </marker>
  </defs> */}
        {drawLineEndMarker()}

        {/* <!--  electrons --> */}
        {/* <line
    x1="36"
    y1="62"
    x2="36"
    y2="32"
    style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
  /> */}
        {drawElectronLine("36", "62", "36", "32")}

        {/* <line
    x1="120"
    y1="62"
    x2="120"
    y2="32"
    style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
  /> */}
        {drawElectronLine("120", "62", "120", "32")}

        {/* <line
            x1="200"
            y1="62"
            x2="200"
            y2="32"
            style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
          /> */}
        {drawElectronLine("200", "62", "200", "32")}

        {/* <line
          x2="58"
          y2="56"
          x1="58"
          y1="26"
          style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
        /> */}
        {drawElectronLine("58", "26", "58", "56")}

        {/* <line
          x2="144"
          y2="56"
          x1="144"
          y1="26"
          style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
        /> */}
        {drawElectronLine("144", "26", "144", "56")}
      </g>
    </svg>
  );
}
export function porbitalWith6Elect(xValue, yValue) {
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

export function dorbitalWith1Elect(xValue, yValue) {
  return (
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

        {/* <defs>
          <marker
            id="markerArrow"
            markerWidth="13"
            markerHeight="13"
            refX="2"
            refY="6"
            orient="auto"
          >
            <path d="M2,2 L2,11 L10,6 L2,2" style="fill: black;stroke:black" />
          </marker>
        </defs> */}
        {drawLineEndMarker()}

        {/* <!--  electrons --> */}
        {/* <line
          x1="40"
          y1="66"
          x2="40"
          y2="32"
          style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
        /> */}
        {drawElectronLine("40", "66", "40", "32")}
      </g>
    </svg>
  );
}
export function dorbitalWith2Elect(xValue, yValue) {
  return (
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

        {/* <defs>
    

    <marker
      id="markerArrow"
      markerWidth="13"
      markerHeight="13"
      refX="2"
      refY="6"
      orient="auto"
    >
      <path d="M2,2 L2,11 L10,6 L2,2" style="fill: black;stroke:black" />
    </marker>
  </defs> */}

        {/* <!--  electrons --> */}
        {drawLineEndMarker()}
        {/* <line
    x1="40"
    y1="66"
    x2="40"
    y2="32"
    style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
  /> */}
        {drawElectronLine("40", "66", "40", "32")}
        {/* <line
          x1="120"
          y1="66"
          x2="120"
          y2="32"
          style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
        /> */}
        {drawElectronLine("120", "66", "120", "32")}
      </g>
    </svg>
  );
}

export function dorbitalWith3Elect(xValue, yValue) {
  return (
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

        {/* <defs>
    

    <marker
      id="markerArrow"
      markerWidth="13"
      markerHeight="13"
      refX="2"
      refY="6"
      orient="auto"
    >
      <path d="M2,2 L2,11 L10,6 L2,2" style="fill: black;stroke:black" />
    </marker>
  </defs> */}
        {drawLineEndMarker()}

        {/* <!--  electrons --> */}
        {/* <line
          x1="40"
          y1="66"
          x2="40"
          y2="32"
          style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
        /> */}
        {drawElectronLine("40", "66", "40", "32")}

        {/* <line
          x1="120"
          y1="66"
          x2="120"
          y2="32"
          style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
        /> */}
        {drawElectronLine("120", "66", "120", "32")}

        {/* <line
          x1="200"
          y1="66"
          x2="200"
          y2="32"
          style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "

        /> */}
        {drawElectronLine("200", "66", "200", "32")}
      </g>
    </svg>
  );
}
export function dorbitalWith4Elect(xValue, yValue) {
  return (
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

        {/* <defs>
    

    <marker
      id="markerArrow"
      markerWidth="13"
      markerHeight="13"
      refX="2"
      refY="6"
      orient="auto"
    >
      <path d="M2,2 L2,11 L10,6 L2,2" style="fill: black;stroke:black" />
    </marker>
  </defs> */}
        {drawLineEndMarker()}

        {/* <!--  electrons --> */}
        {/* <line
    x1="40"
    y1="66"
    x2="40"
    y2="32"
    style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
  /> */}
        {drawElectronLine("40", "66", "40", "32")}

        {/* <line
        x1="120"
        y1="66"
        x2="120"
        y2="32"
        style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
      /> */}
        {drawElectronLine("120", "66", "120", "32")}

        {/* <line
        x1="200"
        y1="66"
        x2="200"
        y2="32"
        style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
      /> */}
        {drawElectronLine("200", "66", "200", "32")}

        {/* <line
        x1="280"
        y1="66"
        x2="280"
        y2="32"
        style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
      /> */}
        {drawElectronLine("280", "66", "280", "32")}
      </g>
    </svg>
  );
}
export function dorbitalWith5Elect(xValue, yValue) {
  return (
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

        {/* <defs>
    

    <marker
      id="markerArrow"
      markerWidth="13"
      markerHeight="13"
      refX="2"
      refY="6"
      orient="auto"
    >
      <path d="M2,2 L2,11 L10,6 L2,2" style="fill: black;stroke:black" />
    </marker>
  </defs> */}
        {drawLineEndMarker()}

        {/* <!--  electrons --> */}
        {/* <line
    x1="40"
    y1="66"
    x2="40"
    y2="32"
    style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
  /> */}
        {drawElectronLine("40", "66", "40", "32")}

        {/* <line
          x1="120"
          y1="66"
          x2="120"
          y2="32"
          style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
        /> */}

        {drawElectronLine("120", "66", "120", "32")}

        {/* <line
          x1="200"
          y1="66"
          x2="200"
          y2="32"
          style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
        /> */}
        {drawElectronLine("200", "66", "200", "32")}

        {/* <line
          x1="280"
          y1="66"
          x2="280"
          y2="32"
          style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
        /> */}
        {drawElectronLine("280", "66", "280", "32")}

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
      </g>
    </svg>
  );
}
export function dorbitalWith6Elect(xValue, yValue) {
  return (
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

        {/* <defs>
          <marker
            id="markerArrow"
            markerWidth="13"
            markerHeight="13"
            refX="2"
            refY="6"
            orient="auto"
          >
            <path d="M2,2 L2,11 L10,6 L2,2" style="fill: black;stroke:black" />
          </marker>
        </defs> */}
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
          x1="120"
          y1="66"
          x2="120"
          y2="32"
          style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
        /> */}
        {drawElectronLine("120", "66", "120", "32")}

        {/* <line
          x1="200"
          y1="66"
          x2="200"
          y2="32"
          style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
        /> */}

        {drawElectronLine("200", "66", "200", "32")}

        {/* <line
          x1="280"
          y1="66"
          x2="280"
          y2="32"
          style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
        /> */}
        {drawElectronLine("280", "66", "280", "32")}

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
      </g>
    </svg>
  );
}
export function dorbitalWith7Elect(xValue, yValue) {
  return (
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

        {/* <defs>
    

    <marker
      id="markerArrow"
      markerWidth="13"
      markerHeight="13"
      refX="2"
      refY="6"
      orient="auto"
    >
      <path d="M2,2 L2,11 L10,6 L2,2" style="fill: black;stroke:black" />
    </marker>
  </defs> */}
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
          x1="200"
          y1="66"
          x2="200"
          y2="32"
          style="
      stroke: red;
      stroke-wid th: 1px;
      

      marker-end: url(#markerArrow);
    "
        /> */}
        {drawElectronLine("200", "66", "200", "32")}

        {/* <line
          x1="280"
          y1="66"
          x2="280"
          y2="32"
          style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
        /> */}
        {drawElectronLine("280", "66", "280", "32")}

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
      </g>
    </svg>
  );
}
export function dorbitalWith8Elect(xValue, yValue) {
  return (
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

        {/* <defs>
          <marker
            id="markerArrow"
            markerWidth="13"
            markerHeight="13"
            refX="2"
            refY="6"
            orient="auto"
          >
            <path d="M2,2 L2,11 L10,6 L2,2" style="fill: black;stroke:black" />
          </marker>
        </defs> */}
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
          x1="280"
          y1="66"
          x2="280"
          y2="32"
          style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
        /> */}

        {drawElectronLine("280", "66", "280", "32")}

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
        />
 */}
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

        {/* <line
          x2="224"
          y2="58"
          x1="224"
          y1="26"
          style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
        /> */}

        {drawElectronLine("224", "26", "224", "58")}
      </g>
    </svg>
  );
}
export function dorbitalWith9Elect(xValue, yValue) {
  return (
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

        {/* <defs>
          <marker
            id="markerArrow"
            markerWidth="13"
            markerHeight="13"
            refX="2"
            refY="6"
            orient="auto"
          >
            <path d="M2,2 L2,11 L10,6 L2,2" style="fill: black;stroke:black" />
          </marker>
        </defs> */}
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
        {drawElectronLine("115", "66", "114", "32")}

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

        {/* <line
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
      </g>
    </svg>
  );
}
export function dorbitalWithTenElect(xValue, yValue) {
  return (
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

        {drawElectronLine("34", "66", "34", "32")}

        {drawElectronLine("115", "66", "115", "32")}

        {drawElectronLine("195", "66", "195", "32")}

        {drawElectronLine("229", "28", "229", "58")}

        {drawElectronLine("275", "66", "275", "32")}

        {drawElectronLine("360", "66", "360", "32")}

        {drawElectronLine("58", "26", "58", "58")}

        {drawElectronLine("144", "26", "144", "58")}

        {drawElectronLine("304", "26", "304", "58")}

        {drawElectronLine("328", "26", "328", "58")}
      </g>
    </svg>
  );
}

export function forbitalWith1Elect(xValue, yValue) {
  return (
    <svg x={xValue} y={yValue} width="570" height="90">
      {/* <!-- f rect --> */}
      <g
        style={{
          stroke: "orange",
          strokeWidth: "2px",
          fill: "none",
          fontSize: "20px",
        }}
      >
        <path
          d="M10,20
              L560,20 L560, 70  M10, 70 L560 70 M10 20 L10 70 M80 20 L80 70  M160 20 L160 70 M240 20 L240 70 M320 20 L320 70 M400 20 L400 70 M480 20 L480 70"
        />

        {/* <defs>
        <marker
          id="markerArrow"
          markerWidth="13"
          markerHeight="13"
          refX="2"
          refY="6"
          orient="auto"
        >
          <path d="M2,2 L2,11 L10,6 L2,2" style="fill: black;stroke:black" />
        </marker>
      </defs> */}
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
      </g>
    </svg>
  );
}

export function forbitalWith2Elect(xValue, yValue) {
  return (
    <svg x={xValue} y={yValue} width="570" height="90">
      {/* <!-- f rect --> */}
      <g
        style={{
          stroke: "orange",
          strokeWidth: "2px",
          fill: "none",
          fontSize: "20px",
        }}
      >
        <path
          d="M10,20
              L560,20 L560, 70  M10, 70 L560 70 M10 20 L10 70 M80 20 L80 70  M160 20 L160 70 M240 20 L240 70 M320 20 L320 70 M400 20 L400 70 M480 20 L480 70"
        />

        {/* <defs>
        <marker
          id="markerArrow"
          markerWidth="13"
          markerHeight="13"
          refX="2"
          refY="6"
          orient="auto"
        >
          <path d="M2,2 L2,11 L10,6 L2,2" style="fill: black;stroke:black" />
        </marker>
      </defs> */}
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
      </g>
    </svg>
  );
}

export function forbitalWith3Elect(xValue, yValue) {
  return (
    <svg x={xValue} y={yValue} width="570" height="90">
      {/* <!-- f rect --> */}
      <g
        style={{
          stroke: "orange",
          strokeWidth: "2px",
          fill: "none",
          fontSize: "20px",
        }}
      >
        <path
          d="M10,20
              L560,20 L560, 70  M10, 70 L560 70 M10 20 L10 70 M80 20 L80 70  M160 20 L160 70 M240 20 L240 70 M320 20 L320 70 M400 20 L400 70 M480 20 L480 70"
        />

        {/* <defs>
        <marker
          id="markerArrow"
          markerWidth="13"
          markerHeight="13"
          refX="2"
          refY="6"
          orient="auto"
        >
          <path d="M2,2 L2,11 L10,6 L2,2" style="fill: black;stroke:black" />
        </marker>
      </defs> */}
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
      </g>
    </svg>
  );
}

export function forbitalWith4Elect(xValue, yValue) {
  return (
    <svg x={xValue} y={yValue} width="570" height="90">
      {/* <!-- f rect --> */}
      <g
        style={{
          stroke: "orange",
          strokeWidth: "2px",
          fill: "none",
          fontSize: "20px",
        }}
      >
        <path
          d="M10,20
              L560,20 L560, 70  M10, 70 L560 70 M10 20 L10 70 M80 20 L80 70  M160 20 L160 70 M240 20 L240 70 M320 20 L320 70 M400 20 L400 70 M480 20 L480 70"
        />

        {drawLineEndMarker()}

        {drawElectronLine("34", "66", "34", "32")}

        {drawElectronLine("115", "66", "115", "32")}

        {drawElectronLine("195", "66", "195", "32")}

        {drawElectronLine("275", "66", "275", "32")}
      </g>
    </svg>
  );
}
export function forbitalWith5Elect(xValue, yValue) {
  return (
    <svg x={xValue} y={yValue} width="570" height="90">
      {/* <!-- f rect --> */}
      <g
        style={{
          stroke: "orange",
          strokeWidth: "2px",
          fill: "none",
          fontSize: "20px",
        }}
      >
        <path
          d="M10,20
              L560,20 L560, 70  M10, 70 L560 70 M10 20 L10 70 M80 20 L80 70  M160 20 L160 70 M240 20 L240 70 M320 20 L320 70 M400 20 L400 70 M480 20 L480 70"
        />

        {drawLineEndMarker()}

        {drawElectronLine("34", "66", "34", "32")}

        {drawElectronLine("115", "66", "115", "32")}

        {drawElectronLine("195", "66", "195", "32")}

        {drawElectronLine("275", "66", "275", "32")}

        {drawElectronLine("360", "66", "360", "32")}
      </g>
    </svg>
  );
}

export function forbitalWith6Elect(xValue, yValue) {
  return (
    <svg x={xValue} y={yValue} width="570" height="90">
      {/* <!-- f rect --> */}
      <g
        style={{
          stroke: "orange",
          strokeWidth: "2px",
          fill: "none",
          fontSize: "20px",
        }}
      >
        <path
          d="M10,20
              L560,20 L560, 70  M10, 70 L560 70 M10 20 L10 70 M80 20 L80 70  M160 20 L160 70 M240 20 L240 70 M320 20 L320 70 M400 20 L400 70 M480 20 L480 70"
        />

        {drawLineEndMarker()}

        {drawElectronLine("34", "66", "34", "32")}

        {drawElectronLine("115", "66", "115", "32")}

        {drawElectronLine("195", "66", "195", "32")}

        {drawElectronLine("275", "66", "275", "32")}

        {drawElectronLine("360", "66", "360", "32")}

        {drawElectronLine("416", "65", "416", "32")}
      </g>
    </svg>
  );
}
export function forbitalWith7Elect(xValue, yValue) {
  return (
    <svg x={xValue} y={yValue} width="570" height="90">
      {/* <!-- f rect --> */}
      <g
        style={{
          stroke: "orange",
          strokeWidth: "2px",
          fill: "none",
          fontSize: "20px",
        }}
      >
        <path
          d="M10,20
              L560,20 L560, 70  M10, 70 L560 70 M10 20 L10 70 M80 20 L80 70  M160 20 L160 70 M240 20 L240 70 M320 20 L320 70 M400 20 L400 70 M480 20 L480 70"
        />

        {drawLineEndMarker()}

        {drawElectronLine("34", "66", "34", "32")}

        {drawElectronLine("115", "66", "115", "32")}

        {drawElectronLine("195", "66", "195", "32")}

        {drawElectronLine("275", "66", "275", "32")}

        {drawElectronLine("360", "66", "360", "32")}

        {drawElectronLine("416", "65", "416", "32")}
        {/* <line
          x1="496"
          y1="64"
          x2="496"
          y2="34"
          style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
        /> */}
        {drawElectronLine("496", "64", "496", "34")}
      </g>
    </svg>
  );
}

export function forbitalWith8Elect(xValue, yValue) {
  return (
    <svg x={xValue} y={yValue} width="570" height="90">
      {/* <!-- f rect --> */}
      <g
        style={{
          stroke: "orange",
          strokeWidth: "2px",
          fill: "none",
          fontSize: "20px",
        }}
      >
        <path
          d="M10,20
              L560,20 L560, 70  M10, 70 L560 70 M10 20 L10 70 M80 20 L80 70  M160 20 L160 70 M240 20 L240 70 M320 20 L320 70 M400 20 L400 70 M480 20 L480 70"
        />

        {drawLineEndMarker()}

        {drawElectronLine("34", "66", "34", "32")}

        {drawElectronLine("115", "66", "115", "32")}

        {drawElectronLine("195", "66", "195", "32")}

        {drawElectronLine("275", "66", "275", "32")}

        {drawElectronLine("360", "66", "360", "32")}

        {drawElectronLine("416", "65", "416", "32")}

        {drawElectronLine("496", "64", "496", "34")}
      </g>
      {drawElectronLine("58", "26", "58", "58")}
    </svg>
  );
}
export function forbitalWith9Elect(xValue, yValue) {
  return (
    <svg x={xValue} y={yValue} width="570" height="90">
      {/* <!-- f rect --> */}
      <g
        style={{
          stroke: "orange",
          strokeWidth: "2px",
          fill: "none",
          fontSize: "20px",
        }}
      >
        <path
          d="M10,20
              L560,20 L560, 70  M10, 70 L560 70 M10 20 L10 70 M80 20 L80 70  M160 20 L160 70 M240 20 L240 70 M320 20 L320 70 M400 20 L400 70 M480 20 L480 70"
        />

        {drawLineEndMarker()}

        {drawElectronLine("34", "66", "34", "32")}

        {drawElectronLine("115", "66", "115", "32")}

        {drawElectronLine("195", "66", "195", "32")}

        {drawElectronLine("275", "66", "275", "32")}

        {drawElectronLine("360", "66", "360", "32")}

        {drawElectronLine("416", "65", "416", "32")}

        {drawElectronLine("496", "64", "496", "34")}
      </g>
      {drawElectronLine("58", "26", "58", "58")}

      {drawElectronLine("144", "26", "144", "58")}
      {/* <!-- <line
    x2="229"
    y2="58"
    x1="229"
    y1="28"
    style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
  /> --> */}
    </svg>
  );
}

export function forbitalWith10Elect(xValue, yValue) {
  return (
    <svg x={xValue} y={yValue} width="570" height="90">
      {/* <!-- f rect --> */}
      <g
        style={{
          stroke: "orange",
          strokeWidth: "2px",
          fill: "none",
          fontSize: "20px",
        }}
      >
        <path
          d="M10,20
              L560,20 L560, 70  M10, 70 L560 70 M10 20 L10 70 M80 20 L80 70  M160 20 L160 70 M240 20 L240 70 M320 20 L320 70 M400 20 L400 70 M480 20 L480 70"
        />

        {drawLineEndMarker()}

        {drawElectronLine("34", "66", "34", "32")}

        {drawElectronLine("115", "66", "115", "32")}

        {drawElectronLine("195", "66", "195", "32")}

        {drawElectronLine("275", "66", "275", "32")}

        {drawElectronLine("360", "66", "360", "32")}

        {drawElectronLine("416", "65", "416", "32")}

        {drawElectronLine("496", "64", "496", "34")}
      </g>
      {drawElectronLine("58", "26", "58", "58")}

      {drawElectronLine("144", "26", "144", "58")}
      {/* <!-- <line
    x2="304"
    y2="58"
    x1="304"
    y1="26"
    style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
  /> --> */}

      {drawElectronLine("229", "28", "229", "58")}
    </svg>
  );
}
export function forbitalWith11Elect(xValue, yValue) {
  return (
    <svg x={xValue} y={yValue} width="570" height="90">
      {/* <!-- f rect --> */}
      <g
        style={{
          stroke: "orange",
          strokeWidth: "2px",
          fill: "none",
          fontSize: "20px",
        }}
      >
        <path
          d="M10,20
              L560,20 L560, 70  M10, 70 L560 70 M10 20 L10 70 M80 20 L80 70  M160 20 L160 70 M240 20 L240 70 M320 20 L320 70 M400 20 L400 70 M480 20 L480 70"
        />

        {drawLineEndMarker()}

        {drawElectronLine("34", "66", "34", "32")}

        {drawElectronLine("115", "66", "115", "32")}

        {drawElectronLine("195", "66", "195", "32")}

        {drawElectronLine("275", "66", "275", "32")}

        {drawElectronLine("360", "66", "360", "32")}

        {drawElectronLine("416", "65", "416", "32")}

        {drawElectronLine("496", "64", "496", "34")}
      </g>
      {drawElectronLine("58", "26", "58", "58")}

      {drawElectronLine("144", "26", "144", "58")}

      {drawElectronLine("229", "28", "229", "58")}
      {drawElectronLine("304", "26", "304", "58")}
    </svg>
  );
}
export function forbitalWith12Elect(xValue, yValue) {
  return (
    <svg x={xValue} y={yValue} width="570" height="90">
      {/* <!-- f rect --> */}
      <g
        style={{
          stroke: "orange",
          strokeWidth: "2px",
          fill: "none",
          fontSize: "20px",
        }}
      >
        <path
          d="M10,20
              L560,20 L560, 70  M10, 70 L560 70 M10 20 L10 70 M80 20 L80 70  M160 20 L160 70 M240 20 L240 70 M320 20 L320 70 M400 20 L400 70 M480 20 L480 70"
        />

        {drawLineEndMarker()}

        {drawElectronLine("34", "66", "34", "32")}

        {drawElectronLine("115", "66", "115", "32")}

        {drawElectronLine("195", "66", "195", "32")}

        {drawElectronLine("275", "66", "275", "32")}

        {drawElectronLine("360", "66", "360", "32")}

        {drawElectronLine("416", "65", "416", "32")}

        {drawElectronLine("496", "64", "496", "34")}
      </g>
      {drawElectronLine("58", "26", "58", "58")}

      {drawElectronLine("144", "26", "144", "58")}

      {drawElectronLine("229", "28", "229", "58")}
      {drawElectronLine("304", "26", "304", "58")}

      {drawElectronLine("328", "26", "328", "58")}
    </svg>
  );
}
export function forbitalWith13Elect(xValue, yValue) {
  return (
    <svg x={xValue} y={yValue} width="570" height="90">
      {/* <!-- f rect --> */}
      <g
        style={{
          stroke: "orange",
          strokeWidth: "2px",
          fill: "none",
          fontSize: "20px",
        }}
      >
        <path
          d="M10,20
              L560,20 L560, 70  M10, 70 L560 70 M10 20 L10 70 M80 20 L80 70  M160 20 L160 70 M240 20 L240 70 M320 20 L320 70 M400 20 L400 70 M480 20 L480 70"
        />

        {drawLineEndMarker()}

        {drawElectronLine("34", "66", "34", "32")}

        {drawElectronLine("115", "66", "115", "32")}

        {drawElectronLine("195", "66", "195", "32")}

        {drawElectronLine("275", "66", "275", "32")}

        {drawElectronLine("360", "66", "360", "32")}

        {drawElectronLine("416", "65", "416", "32")}

        {drawElectronLine("496", "64", "496", "34")}
      </g>
      {drawElectronLine("58", "26", "58", "58")}

      {drawElectronLine("144", "26", "144", "58")}

      {drawElectronLine("229", "28", "229", "58")}
      {drawElectronLine("304", "26", "304", "58")}

      {drawElectronLine("328", "26", "328", "58")}
      {/* <line
    x2="440"
    y2="59"
    x1="440"
    y1="28"
    style="
      stroke: red;
      stroke-width: 1px;
      

      marker-end: url(#markerArrow);
    "
  />  */}
      {drawElectronLine("440", "28", "440", "59")}
      {/* 14 */}
    </svg>
  );
}
export function forbitalWith14Elect(xValue, yValue) {
  return (
    <svg x={xValue} y={yValue} width="570" height="90">
      {/* <!-- f rect --> */}
      <g
        style={{
          stroke: "orange",
          strokeWidth: "2px",
          fill: "none",
          fontSize: "20px",
        }}
      >
        <path
          d="M10,20
              L560,20 L560, 70  M10, 70 L560 70 M10 20 L10 70 M80 20 L80 70  M160 20 L160 70 M240 20 L240 70 M320 20 L320 70 M400 20 L400 70 M480 20 L480 70"
        />

        {drawLineEndMarker()}

        {drawElectronLine("34", "66", "34", "32")}

        {drawElectronLine("115", "66", "115", "32")}

        {drawElectronLine("195", "66", "195", "32")}

        {drawElectronLine("229", "28", "229", "58")}

        {drawElectronLine("275", "66", "275", "32")}

        {drawElectronLine("360", "66", "360", "32")}

        {drawElectronLine("58", "26", "58", "58")}

        {drawElectronLine("144", "26", "144", "58")}

        {drawElectronLine("304", "26", "304", "58")}

        {drawElectronLine("328", "26", "328", "58")}

        {drawElectronLine("416", "26", "416", "58")}

        {drawElectronLine("440", "62", "440", "34")}

        {drawElectronLine("496", "62", "496", "34")}

        {drawElectronLine("520", "29", "520", "58")}
      </g>
    </svg>
  );
}

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
//               L240,20 L240, 70  M10, 70 L240 70 M10 20 L10 70 M80 20 L80 70  M160 20 L160 70"
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
//               L400,20 L400, 70  M10, 70 L400 70 M10 20 L10 70 M80 20 L80 70  M160 20 L160 70 M240 20 L240 70 M320 20 L320 70"
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
//               L560,20 L560, 70  M10, 70 L560 70 M10 20 L10 70 M80 20 L80 70  M160 20 L160 70 M240 20 L240 70 M320 20 L320 70 M400 20 L400 70 M480 20 L480 70"
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
//               L240,20 L240, 70  M10, 70 L240 70 M10 20 L10 70 M80 20 L80 70  M160 20 L160 70"
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
//               L400,20 L400, 70  M10, 70 L400 70 M10 20 L10 70 M80 20 L80 70  M160 20 L160 70 M240 20 L240 70 M320 20 L320 70"
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
//               L560,20 L560, 70  M10, 70 L560 70 M10 20 L10 70 M80 20 L80 70  M160 20 L160 70 M240 20 L240 70 M320 20 L320 70 M400 20 L400 70 M480 20 L480 70"
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
