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
  const [option, setOption] = useState();
  //const notificationCtx = useContext(NotificationContext);

  const rowNum = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ];
  const rowValue = [1, 2, 3, 4, 5, 6, 7, "Lanthanides", "Actinides"];
  const rowLanAndAct = ["Lanthanides", "Actinides"];
  const temp = 6;

  useEffect(() => {
    setOption("thom-neg-cat");
  }, []);

  function handleChange(event) {
    setOption(event.target.value);
  }

  function displayOptions() {
    return (
      <select name="option" onChange={handleChange} value={option}>
        <optgroup label="Thomson's Cathode Ray Tube Experiment">
          <option value="thom-neg-cat">
            Cathode Rays Are Negatively Charged
          </option>
          <option value="thom-pos-cat">
            If cathode rays were to be positively charged
          </option>
          <option value="thom-neu-cat">
            If cathode rays were to be neutral
          </option>
        </optgroup>
        <optgroup label="Rutherford's Experiment">
          <option value="ruth-cen-nuclus">Atoms with a central nucleus</option>
          <option value="thom-atom-on-alpha">
            Thomson's Atom on alpha particles
          </option>
          <option value="dalton-atom-on-alpha">
            Dalton's Atom on alpha particles
          </option>

          <option value="ruth-atom-model">Rutherford's Atomic Model</option>
        </optgroup>
      </select>
    );
  }

  //rutherford atomic model
  if (option === "ruth-atom-model") {
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
        {displayOptions()}
      </>
    );
    //if electrons are negatively charged
  } else if (option === "thom-neg-cat") {
    return (
      <>
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
        </svg>
        {displayOptions()}
      </>
    );

    //if electrons are positively charged
  } else if (option === "thom-pos-cat") {
    return (
      <>
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
        {displayOptions()}
      </>
    );
    //if electrons are neutral
  } else if (option === "thom-neu-cat") {
    return (
      <>
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
        {displayOptions()}
      </>
    );
    //rutherford atom with a central nucleus
  } else if (option === "ruth-cen-nuclus") {
    return (
      <>
        <svg
          id="mySVG"
          width="800"
          height="700"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          style={{
            margin: "50",
            border: "2px solid blue",
            backgroundColor: "skyBlue",
          }}
        >
          <svg x="300" y="0" height="600" width="450">
            <image
              href="/images/site/draw-ruterford.svg"
              x="0"
              y="0"
              height="600"
              width="450"
            />
          </svg>
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
                style={{
                  fill: "black",
                  stroke: "black",
                }}
              />
            </marker>
          </defs>
          <path
            id="thomsCathode1"
            d="M53,53 L750 53"
            style={{
              stroke: "green",
              fill: "none",
              strokeWidth: "1.2px",
              markerEnd: "url(#markerArrow)",
            }}
          />
          <path
            id="thomsCathode2"
            d="M53,150 L750 150"
            style={{
              stroke: "green",
              fill: "none",
              strokeWidth: "1.2px",
              markerEnd: "url(#markerArrow)",
            }}
          />
          <path
            id="thomsCathode3"
            d="M53,250 L750 250"
            style={{
              stroke: "green",
              fill: "none",
              strokeWidth: "1.2px",
              markerEnd: "url(#markerArrow)",
            }}
          />
          <path
            id="thomsCathode4"
            d="M53,350 L750 350"
            style={{
              stroke: "green",
              fill: "none",
              strokeWidth: "1.2px",
              markerEnd: "url(#markerArrow)",
            }}
          />
          <path
            id="thomsCathode5"
            d="M53,480 L750 480"
            style={{
              stroke: "green",
              fill: "none",
              strokeWidth: "1.2px",
              markerEnd: "url(#markerArrow)",
            }}
          />
          <path
            id="thomsCathode6"
            d="M53,450 L750 450"
            style={{
              stroke: "green",
              fill: "none",
              strokeWidth: "1.2px",
              markerEnd: "url(#markerArrow)",
            }}
          />
          <path
            id="thomsCathode7"
            d="M53,400 L430 400 M430,400 A10,0 0 1,1 100,350"
            style={{
              stroke: "green",
              fill: "none",
              strokeWidth: "1.2px",
              markerEnd: "url(#markerArrow)",
            }}
          />
          {/* <path
          id="thomsCathode12"
          d="M53,302 L330 302
            M330,302 A10,0 0 1,0 590,330"
          style={{
            stroke: "#660000",
            fill: "none",
            markerEnd: "url(#markerArrow)",
          }}
        /> */}
          <path
            id="thomsCathode8"
            d="M53,80 L430 80
            M430,80 A10,0 0 1,1 650,16"
            style={{
              stroke: "green",
              strokeWidth: "1.2px",
              fill: "none",
              markerEnd: "url(#markerArrow)",
            }}
          />
          {/* <path
          id="thomsCathode3"
          d="M53,680 L430 680
            M430,680 A10,0 0 1,1 650,16"
          style={{
            stroke: "green",
            strokeWidth: "1.2px",
            fill: "none",
            markerEnd: "url(#markerArrow)",
          }}
        /> */}
          <path
            id="thomsCathode9"
            d="M53,220 L530 220
            M530,220 A10,0 0 1,1 750,100"
            style={{
              stroke: "green",
              strokeWidth: "1.2px",
              fill: "none",
              markerEnd: "url(#markerArrow)",
            }}
          />
          <path
            id="thomsCathode10"
            d="M53,220 L530 220
            M530,220 A10,0 0 1,1 750,100"
            style={{
              stroke: "green",
              strokeWidth: "1.2px",
              fill: "none",
              markerEnd: "url(#markerArrow)",
            }}
          />
          <path
            id="thomsCathode11"
            d="M53,310 L640 310
            M640,310 A10,0 0 1,0 730,390"
            //   style={{
            //     stroke: "red",
            //     strokeWidth: "1.2px",
            //     fill: "none",
            //     markerEnd: "url(#markerArrow)",
            //   }}
          />
          <path
            id="thomsCathode12"
            d="M53,510 L640 510
            M640,510 A10,0 0 1,1 100,300"
            style={{
              stroke: "green",
              strokeWidth: "1.2px",
              fill: "none",
              markerEnd: "url(#markerArrow)",
            }}
          />
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
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
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
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
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
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
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
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
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
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
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
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
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
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
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
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
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
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
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
            <animateMotion
              //   path="M10,50 q60,50 100,0 q60,-50 100,0"
              begin="0s"
              dur="10s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath xlinkHref="#thomsCathode10" />
            </animateMotion>
          </circle>{" "}
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
            <animateMotion
              //   path="M10,50 q60,50 100,0 q60,-50 100,0"
              begin="0s"
              dur="10s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath xlinkHref="#thomsCathode11" />
            </animateMotion>
          </circle>{" "}
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
            <animateMotion
              //   path="M10,50 q60,50 100,0 q60,-50 100,0"
              begin="0s"
              dur="10s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath xlinkHref="#thomsCathode12" />
            </animateMotion>
          </circle>{" "}
          {/* <path
            d="M53,308 L330 308
            M330,308 A10,0 0 1,0 580,350"
            style={{ stroke: "#660000", fill: "none" }}
          /> */}
        </svg>
        {displayOptions()}
      </>
    );
  } else if (option === "thom-atom-on-alpha") {
    return (
      <>
        <svg
          id="mySVG"
          width="800"
          height="700"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          style={{
            margin: "50",
            border: "2px solid blue",
            backgroundColor: "skyBlue",
          }}
        >
          <svg x="300" y="0" height="600" width="450">
            <image
              href="/images/site/draw-thomson2.svg"
              x="0"
              y="0"
              height="600"
              width="450"
            />
          </svg>
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
                style={{
                  fill: "black",
                  stroke: "black",
                }}
              />
            </marker>
          </defs>
          <path
            id="thomsCathode1"
            d="M53,53 L750 53"
            style={{
              stroke: "green",
              fill: "none",
              strokeWidth: "1.2px",
              markerEnd: "url(#markerArrow)",
            }}
          />
          <path
            id="thomsCathode2"
            d="M53,150 L750 150"
            style={{
              stroke: "green",
              fill: "none",
              strokeWidth: "1.2px",
              markerEnd: "url(#markerArrow)",
            }}
          />
          <path
            id="thomsCathode3"
            d="M53,250 L750 250"
            style={{
              stroke: "green",
              fill: "none",
              strokeWidth: "1.2px",
              markerEnd: "url(#markerArrow)",
            }}
          />
          <path
            id="thomsCathode4"
            d="M53,350 L750 350"
            style={{
              stroke: "green",
              fill: "none",
              strokeWidth: "1.2px",
              markerEnd: "url(#markerArrow)",
            }}
          />
          <path
            id="thomsCathode5"
            d="M53,480 L750 480"
            style={{
              stroke: "green",
              fill: "none",
              strokeWidth: "1.2px",
              markerEnd: "url(#markerArrow)",
            }}
          />
          <path
            id="thomsCathode6"
            d="M53,450 L750 450"
            style={{
              stroke: "green",
              fill: "none",
              strokeWidth: "1.2px",
              markerEnd: "url(#markerArrow)",
            }}
          />
          <path
            id="thomsCathode7"
            d="M53,400 L750 400"
            style={{
              stroke: "green",
              fill: "none",
              strokeWidth: "1.2px",
              markerEnd: "url(#markerArrow)",
            }}
          />
          {/* <path
          id="thomsCathode12"
          d="M53,302 L330 302
            M330,302 A10,0 0 1,0 590,330"
          style={{
            stroke: "#660000",
            fill: "none",
            markerEnd: "url(#markerArrow)",
          }}
        /> */}
          <path
            id="thomsCathode8"
            d="M53,80  L750 80"
            style={{
              stroke: "green",
              strokeWidth: "1.2px",
              fill: "none",
              markerEnd: "url(#markerArrow)",
            }}
          />
          {/* <path
          id="thomsCathode3"
          d="M53,680 L430 680
            M430,680 A10,0 0 1,1 650,16"
          style={{
            stroke: "green",
            strokeWidth: "1.2px",
            fill: "none",
            markerEnd: "url(#markerArrow)",
          }}
        /> */}
          <path
            id="thomsCathode9"
            d="M53,220 L750 220"
            style={{
              stroke: "green",
              strokeWidth: "1.2px",
              fill: "none",
              markerEnd: "url(#markerArrow)",
            }}
          />
          <path
            id="thomsCathode10"
            d="M53,220 L750 220"
            style={{
              stroke: "green",
              strokeWidth: "1.2px",
              fill: "none",
              markerEnd: "url(#markerArrow)",
            }}
          />
          <path id="thomsCathode11" d="M53,310 L750 310" />
          <path
            id="thomsCathode12"
            d="M53,510 L750 510"
            style={{
              stroke: "red",
              strokeWidth: "1.2px",
              fill: "none",
              markerEnd: "url(#markerArrow)",
            }}
          />
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
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
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
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
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
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
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
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
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
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
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
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
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
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
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
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
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
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
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
            <animateMotion
              //   path="M10,50 q60,50 100,0 q60,-50 100,0"
              begin="0s"
              dur="10s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath xlinkHref="#thomsCathode10" />
            </animateMotion>
          </circle>{" "}
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
            <animateMotion
              //   path="M10,50 q60,50 100,0 q60,-50 100,0"
              begin="0s"
              dur="10s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath xlinkHref="#thomsCathode11" />
            </animateMotion>
          </circle>{" "}
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
            <animateMotion
              //   path="M10,50 q60,50 100,0 q60,-50 100,0"
              begin="0s"
              dur="10s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath xlinkHref="#thomsCathode12" />
            </animateMotion>
          </circle>{" "}
          {/* <path
            d="M53,308 L330 308
            M330,308 A10,0 0 1,0 580,350"
            style={{ stroke: "#660000", fill: "none" }}
          /> */}
        </svg>
        {displayOptions()}
      </>
    );
  } else if (option === "dalton-atom-on-alpha") {
    return (
      <>
        <svg
          id="mySVG"
          width="800"
          height="700"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          style={{
            margin: "50",
            border: "2px solid blue",
            backgroundColor: "skyBlue",
          }}
        >
          <svg x="300" y="0" height="600" width="450">
            <image
              href="/images/site/draw-thomson2.svg"
              x="0"
              y="0"
              height="600"
              width="450"
            />
          </svg>
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
                style={{
                  fill: "black",
                  stroke: "black",
                }}
              />
            </marker>
          </defs>
          <path
            id="thomsCathode1"
            d="M53,53 L405 53 M405,53 A10,0 0 1,1 40,30"
            style={{
              stroke: "green",
              fill: "none",
              strokeWidth: "1.2px",
              markerEnd: "url(#markerArrow)",
            }}
          />
          <path
            id="thomsCathode2"
            d="M53,150 L415 150 M415,150 A10,0 0 1,1 100,30"
            style={{
              stroke: "green",
              fill: "none",
              strokeWidth: "1.2px",
              markerEnd: "url(#markerArrow)",
            }}
          />
          <path
            id="thomsCathode3"
            d="M53,250 L420 250 M420,250 A10,0 0 1,1 100,300"
            style={{
              stroke: "red",
              fill: "none",
              strokeWidth: "1.2px",
              markerEnd: "url(#markerArrow)",
            }}
          />
          <path
            id="thomsCathode4"
            d="M53,350 L420 350 M420,350 A10,0 0 1,1 100,300"
            style={{
              stroke: "green",
              fill: "none",
              strokeWidth: "1.2px",
              markerEnd: "url(#markerArrow)",
            }}
          />
          <path
            id="thomsCathode5"
            d="M53,480 L390 480 M390,480 A10,0 0 1,1 100,370"
            style={{
              stroke: "green",
              fill: "none",
              strokeWidth: "1.2px",
              markerEnd: "url(#markerArrow)",
            }}
          />
          <path
            id="thomsCathode6"
            d="M53,450 L420 450 M420,450 A10,0 0 1,1 60,280"
            style={{
              stroke: "green",
              fill: "none",
              strokeWidth: "1.2px",
              markerEnd: "url(#markerArrow)",
            }}
          />
          <path
            id="thomsCathode7"
            d="M53,400 L390 400 M390,400 A10,0 0 1,1 100,250"
            style={{
              stroke: "green",
              fill: "none",
              strokeWidth: "1.2px",
              markerEnd: "url(#markerArrow)",
            }}
          />
          {/* <path
          id="thomsCathode12"
          d="M53,302 L330 302
            M330,302 A10,0 0 1,0 590,330"
          style={{
            stroke: "#660000",
            fill: "none",
            markerEnd: "url(#markerArrow)",
          }}
        /> */}
          <path
            id="thomsCathode8"
            d="M53,80 L390 80
            M390,80 A10,0 0 1,1 80,6"
            style={{
              stroke: "green",
              strokeWidth: "1.2px",
              fill: "none",
              markerEnd: "url(#markerArrow)",
            }}
          />
          {/* <path
          id="thomsCathode3"
          d="M53,680 L430 680
            M430,680 A10,0 0 1,1 650,16"
          style={{
            stroke: "green",
            strokeWidth: "1.2px",
            fill: "none",
            markerEnd: "url(#markerArrow)",
          }}
        /> */}
          <path
            id="thomsCathode9"
            d="M53,220 L390 220
            M390,220 A10,0 0 1,1 50,130"
            style={{
              stroke: "green",
              strokeWidth: "1.2px",
              fill: "none",
              markerEnd: "url(#markerArrow)",
            }}
          />
          <path
            id="thomsCathode10"
            d="M53,200 L390 200 M390,200 A10,0 0 1,1 90,100"
            style={{
              stroke: "green",
              strokeWidth: "1.2px",
              fill: "none",
              markerEnd: "url(#markerArrow)",
            }}
          />
          <path
            id="thomsCathode11"
            d="M53,310 L390 310
            M390,310 A10,0 0 1,0 -0,520"
            style={{
              stroke: "green",
              strokeWidth: "1.2px",
              fill: "none",
              markerEnd: "url(#markerArrow)",
            }}
          />
          <path
            id="thomsCathode12"
            d="M53,510 L390 510
            M390,510 A10,0 0 1,1 100,400"
            style={{
              stroke: "green",
              strokeWidth: "1.2px",
              fill: "none",
              markerEnd: "url(#markerArrow)",
            }}
          />
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
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
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
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
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
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
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
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
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
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
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
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
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
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
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
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
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
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
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
            <animateMotion
              //   path="M10,50 q60,50 100,0 q60,-50 100,0"
              begin="0s"
              dur="10s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath xlinkHref="#thomsCathode10" />
            </animateMotion>
          </circle>{" "}
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
            <animateMotion
              //   path="M10,50 q60,50 100,0 q60,-50 100,0"
              begin="0s"
              dur="10s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath xlinkHref="#thomsCathode11" />
            </animateMotion>
          </circle>{" "}
          <circle cx="0" cy="0" r="4" style={{ stroke: "red", fill: "red" }}>
            <animateMotion
              //   path="M10,50 q60,50 100,0 q60,-50 100,0"
              begin="0s"
              dur="10s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath xlinkHref="#thomsCathode12" />
            </animateMotion>
          </circle>{" "}
          {/* <path
            d="M53,308 L330 308
            M330,308 A10,0 0 1,0 580,350"
            style={{ stroke: "#660000", fill: "none" }}
          /> */}
        </svg>
        {displayOptions()}
      </>
    );
  }

  return null;
}

export default AtomicModels;
