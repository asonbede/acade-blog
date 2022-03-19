import { useState, useEffect, useContext } from "react";
import { elementsArray } from "../../helpers/pereriodic-table/element-data";
import classes from "./periodic-trend.module.css";

import NotificationContext from "../../store/notification-context";
// import {
//   drawLineEndMarker,
//   drawText,
//   drawElectronLine,
// } from "../../helpers/pereriodic-table/draw-orbitals";

function AtomicModels({}) {
  //const [groupNum, setgroupNum] = useState();
  const [showAllData, setshowAllData] = useState();
  //const notificationCtx = useContext(NotificationContext);

  const rowNum = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ];
  const rowValue = [1, 2, 3, 4, 5, 6, 7, "Lanthanides", "Actinides"];
  const rowLanAndAct = ["Lanthanides", "Actinides"];
  const temp = 2;
  if (temp === 3) {
    return (
      // <div style={{ width: "80%", margin: "0 auto", border: "1px solid red" }}>
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
      >
        <path
          id="venere"
          fill="none"
          stroke="blue"
          strokeWidth="3"
          d="M 250, 300 a 165,18 0 1,0 1,0"
        />
        <path
          id="venere2"
          fill="none"
          stroke="blue"
          strokeWidth="3"
          d="M 250, 250 a 130,70 0 1,0 1,0"
        />
        <path
          id="venere3"
          fill="none"
          stroke="blue"
          strokeWidth="3"
          d="M 230, 230 a 70,110 0 1,0 1,0"
        />
        <path
          id="venere4"
          fill="none"
          stroke="blue"
          strokeWidth="3"
          d="M 250, 240 a 170,100 0 1,0 1,0"
        />

        <circle
          cx="0"
          cy="0"
          r="5"
          style={{ stroke: "#ff0000", fill: "green" }}
        >
          <animateMotion
            //   path="M10,50 q60,50 100,0 q60,-50 100,0"
            begin="0s"
            dur="10s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath xlinkHref="#venere" />
          </animateMotion>
        </circle>
        <circle
          cx="0"
          cy="0"
          r="5"
          style={{ stroke: "#ff0000", fill: "purple" }}
        >
          <animateMotion
            //   path="M10,50 q60,50 100,0 q60,-50 100,0"
            begin="0s"
            dur="10s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath xlinkHref="#venere2" />
          </animateMotion>
        </circle>
        <circle cx="0" cy="0" r="5" style={{ stroke: "black", fill: "red" }}>
          <animateMotion
            //   path="M10,50 q60,50 100,0 q60,-50 100,0"
            begin="0s"
            dur="10s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath xlinkHref="#venere3" />
          </animateMotion>
        </circle>
        <circle
          cx="0"
          cy="0"
          r="5"
          style={{ stroke: "#ff0000", fill: "yellow" }}
        >
          <animateMotion
            //   path="M10,50 q60,50 100,0 q60,-50 100,0"
            begin="0s"
            dur="10s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath xlinkHref="#venere4" />
          </animateMotion>
        </circle>
        <circle
          cx="250"
          cy="315"
          r="15"
          style={{ stroke: "black", fill: "black" }}
        ></circle>
      </svg>
    );
  } else if (temp === 2) {
    return (
      <svg
        id="mySVG"
        width="800"
        height="700"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{
          margin: "50",
          border: "2px solid blue",
          backgroundColor: "lightGreen",
        }}
      >
        <svg x="0" y="0" height="600" width="800">
          <image
            href="/images/site/cathode-ray-tube-thomson3.svg"
            x="0"
            y="0"
            height="600"
            width="800"
          />
        </svg>
        {/* <line x1="53" y1="308" x2="330" y2="308" style={{ stroke: "red" }}>
          <animate
            attributeName="x"
            attributeType="XML"
            from="53"
            to="308"
            begin="0s"
            dur="20s"
            repeatCount="indefinite"
          />
        </line> */}
        <path
          id="thomsCathode1"
          d="M53,308 L330 308
            M330,308 A10,0 0 1,1 580,270"
          style={{ stroke: "#660000", fill: "none" }}
        />
        <path
          id="thomsCathode2"
          d="M53,305 L330 305
            M330,305 A10,0 0 1,1 570,260"
          style={{ stroke: "#660000", fill: "none" }}
        />
        <path
          id="thomsCathode3"
          d="M53,305 L330 305
            M330,305 A10,0 0 1,1 590,280"
          style={{ stroke: "#660000", fill: "none" }}
        />

        <circle cx="0" cy="0" r="2" style={{ stroke: "red", fill: "red" }}>
          <animateMotion
            //   path="M10,50 q60,50 100,0 q60,-50 100,0"
            begin="0s"
            dur="10s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath xlinkHref="#thomsCathode1" />
          </animateMotion>
        </circle>
        <circle cx="0" cy="0" r="2" style={{ stroke: "red", fill: "red" }}>
          <animateMotion
            //   path="M10,50 q60,50 100,0 q60,-50 100,0"
            begin="0s"
            dur="10s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath xlinkHref="#thomsCathode2" />
          </animateMotion>
        </circle>
        <circle cx="0" cy="0" r="2" style={{ stroke: "red", fill: "red" }}>
          <animateMotion
            //   path="M10,50 q60,50 100,0 q60,-50 100,0"
            begin="0s"
            dur="10s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath xlinkHref="#thomsCathode3" />
          </animateMotion>
        </circle>

        {/* <path
            d="M53,308 L330 308
            M330,308 A10,0 0 1,0 580,350"
            style={{ stroke: "#660000", fill: "none" }}
          /> */}

        {/* <line x1="53" y1="305" x2="330" y2="305" style={{ stroke: "red" }} /> */}

        {/* <path d="M120,100 l20,-50 l20,50"
      style="stroke: #000000;    fill:none;
             stroke-width:16px;
             stroke-linejoin: round;" />  */}

        {/* <line x1="0"  y1="10" x2="0"   y2="100" style="stroke:#006600;"/>
        <line x1="10" y1="10" x2="100" y2="100" style="stroke:#006600;"/>
        <line x1="20" y1="10" x2="100" y2="50"  style="stroke:#006600;"/>
        <line x1="30" y1="10" x2="110" y2="10"  style="stroke:#006600;"/> */}
      </svg>
    );
  } else if (temp === 4) {
    return (
      <svg
        id="mySVG"
        width="800"
        height="700"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{
          margin: "50",
          border: "2px solid blue",
          backgroundColor: "lightGreen",
        }}
      >
        <svg x="0" y="0" height="600" width="800">
          <image
            href="/images/site/cathode-ray-tube-thomson3.svg"
            x="0"
            y="0"
            height="600"
            width="800"
          />
        </svg>

        <path
          id="thomsCathode4"
          d="M53,308 L330 308
            M330,308 A10,0 0 1,0 580,348"
          style={{ stroke: "#660000", fill: "none" }}
        />
        <path
          id="thomsCathode5"
          d="M53,304 L330 304
            M330,304 A10,0 0 1,0 590,340"
          style={{ stroke: "#660000", fill: "none" }}
        />
        <path
          id="thomsCathode6"
          d="M53,302 L330 302
            M330,302 A10,0 0 1,0 590,330"
          style={{ stroke: "#660000", fill: "none" }}
        />

        <circle cx="0" cy="0" r="2" style={{ stroke: "red", fill: "red" }}>
          <animateMotion
            //   path="M10,50 q60,50 100,0 q60,-50 100,0"
            begin="0s"
            dur="10s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath xlinkHref="#thomsCathode4" />
          </animateMotion>
        </circle>
        <circle cx="0" cy="0" r="2" style={{ stroke: "red", fill: "red" }}>
          <animateMotion
            //   path="M10,50 q60,50 100,0 q60,-50 100,0"
            begin="0s"
            dur="10s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath xlinkHref="#thomsCathode5" />
          </animateMotion>
        </circle>
        <circle cx="0" cy="0" r="2" style={{ stroke: "red", fill: "red" }}>
          <animateMotion
            //   path="M10,50 q60,50 100,0 q60,-50 100,0"
            begin="0s"
            dur="10s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath xlinkHref="#thomsCathode6" />
          </animateMotion>
        </circle>

        {/* <path
            d="M53,308 L330 308
            M330,308 A10,0 0 1,0 580,350"
            style={{ stroke: "#660000", fill: "none" }}
          /> */}
      </svg>
    );
  } else if (temp === 5) {
    return (
      <svg
        id="mySVG"
        width="800"
        height="700"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{
          margin: "50",
          border: "2px solid blue",
          backgroundColor: "lightGreen",
        }}
      >
        <svg x="0" y="0" height="600" width="800">
          <image
            href="/images/site/cathode-ray-tube-thomson3.svg"
            x="0"
            y="0"
            height="600"
            width="800"
          />
        </svg>

        <path
          id="thomsCathode7"
          d="M53,308 L597 308"
          style={{ stroke: "#660000", fill: "none" }}
        />
        <path
          id="thomsCathode8"
          d="M53,304 L596 304"
          style={{ stroke: "#660000", fill: "none" }}
        />
        <path
          id="thomsCathode9"
          d="M53,302 L598 302"
          style={{ stroke: "#660000", fill: "none" }}
        />

        <circle cx="0" cy="0" r="2" style={{ stroke: "red", fill: "red" }}>
          <animateMotion
            //   path="M10,50 q60,50 100,0 q60,-50 100,0"
            begin="0s"
            dur="10s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath xlinkHref="#thomsCathode7" />
          </animateMotion>
        </circle>
        <circle cx="0" cy="0" r="2" style={{ stroke: "red", fill: "red" }}>
          <animateMotion
            //   path="M10,50 q60,50 100,0 q60,-50 100,0"
            begin="0s"
            dur="10s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath xlinkHref="#thomsCathode8" />
          </animateMotion>
        </circle>
        <circle cx="0" cy="0" r="2" style={{ stroke: "red", fill: "red" }}>
          <animateMotion
            //   path="M10,50 q60,50 100,0 q60,-50 100,0"
            begin="0s"
            dur="10s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath xlinkHref="#thomsCathode9" />
          </animateMotion>
        </circle>

        {/* <path
            d="M53,308 L330 308
            M330,308 A10,0 0 1,0 580,350"
            style={{ stroke: "#660000", fill: "none" }}
          /> */}
      </svg>
    );
  }
  return null;
}

export default AtomicModels;
