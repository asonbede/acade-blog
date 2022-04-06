import { useState, useContext, useEffect } from "react";
//import { useField } from "../../hooks/input-editor-hooks";
//import classes from "./polyatomic-ion-table.module.css";
//import { polyAtomicIon } from "../../helpers/pereriodic-table/element-data";

export default function InstructionIonic() {
  const [radioValue, setRadioValue] = useState();
  const [compoundCount, setcompoundCount] = useState(2);
  return (
    <svg
      id="mySVG"
      width="1000"
      height="700"
      x="50"
      y="50"
      style={{ border: "2px solid red" }}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 1200 700"
    >
      <g>
        <defs>
          {/* <radialGradient id="RadialGradient1" cx="0.5" cy="0.5" r="0.1">
                <stop offset="0%" stopColor="black" />
                <stop offset="100%" stopColor="gold" />
              </radialGradient>
              <filter id="blurFilter" y="-5" height="130" width="130">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" y="-" />
              </filter> */}

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

        {/* <!-- vertical line --> */}
        <svg x="120" y="190" width="10" height="170">
          <path
            id="arrow"
            d="M5,5 L5 45"
            style={{
              stroke: "green",
              strokeWidth: "1.2px",
              fill: "none",
              markerEnd: "url(#markerArrow)",
            }}
          />
        </svg>

        {/* <!-- horizontal line --> */}
        {/* <!-- <svg x="402" y="160" width="170" height="10">
          <path
            id="arrow"
            d="M5,5 L45 5"
            style=" 
              stroke: green;
              strokeWidth: 1.2px;
              fill: none;
              marker-end: url(#markerArrow)
            "
          />
    </svg>     --> */}

        <text
          x="110"
          y="10"
          style={{ fill: "#999999", stroke: "#000000", fontSize: "20px" }}
        >
          How To Write The Formula For Ionic Compounds Given The Name
        </text>

        {/* <!-- rect box1 --> */}
        <svg x="50" y="60" width="300" height="200">
          <g style={{ fill: "none", stroke: "blue", fontSize: "14px" }}>
            <rect x="1" y="1" width="150" height="125" />

            <text x="20" y="20">
              <tspan x="20" y="40">
                Aluminum Oxide
              </tspan>
              <tspan x="20" y="60">
                Lithium Oxide
              </tspan>

              <tspan x="20" y="80">
                Ammonium Nitride
              </tspan>
              <tspan x="20" y="100">
                Magnesium Phosphate
              </tspan>

              <tspan x="20" y="120">
                Manganese (III) oxide
              </tspan>
            </text>
          </g>
        </svg>

        {/* <!-- rect box2 --> */}
        <svg x="50" y="200" width="300" height="220">
          <g style={{ fill: "none", stroke: "blue", fontSize: "14px" }}>
            <rect x="12" y="70" width="150" height="125" />
            <text x="20" y="20">
              <tspan x="20" y="40">
                Step 1
              </tspan>
              <tspan x="20" y="60">
                Write the symbols of the ions
              </tspan>
            </text>

            <text x="60" y="100">
              <tspan x="60" y="100">
                AlO
              </tspan>
              <tspan x="60" y="120">
                LiO
              </tspan>
              <tspan x="60" y="140">
                NH
              </tspan>
              <tspan dx="-1" dy="7">
                4
              </tspan>

              <tspan x="85" y="140">
                {" "}
                N
              </tspan>
              <tspan x="60" y="160">
                MgPO
              </tspan>
              <tspan dx="-1" dy="7">
                4
              </tspan>

              <tspan x="60" y="180">
                MnO
              </tspan>
            </text>
          </g>
        </svg>
        {/* <!-- arrow 2 --> */}
        <svg x="120" y="400" width="10" height="170">
          <path
            id="arrow"
            d="M5,5 L5 45"
            style={{
              stroke: "green",
              strokeWidth: "1.2px",
              fill: "none",
              markerEnd: "url(#markerArrow)",
            }}
          />
        </svg>

        {/* <!-- rect box3 --> */}
        <svg x="50" y="430" width="300" height="220">
          <g style={{ fill: "none", stroke: "blue", fontSize: "14px" }}>
            <rect x="12" y="70" width="150" height="125" />
            <text x="20" y="20">
              <tspan x="20" y="40">
                Step 2
              </tspan>
              <tspan x="20" y="60">
                Write the charges of the ions
              </tspan>
            </text>

            <text x="60" y="100">
              <tspan x="60" y="100">
                Al
              </tspan>
              <tspan dx="-1" dy="-7">
                3+
              </tspan>
              <tspan x="85" y="100">
                O
              </tspan>
              <tspan dx="-1" dy="-4">
                2-
              </tspan>
              <tspan x="60" y="120">
                Li
              </tspan>
              <tspan dx="-1" dy="-7">
                1+
              </tspan>
              <tspan x="85" y="120">
                O
              </tspan>
              <tspan dx="-1" dy="-4">
                2-
              </tspan>
              <tspan x="60" y="140">
                (NH
              </tspan>
              <tspan dx="-1" dy="7">
                4
              </tspan>
              <tspan x="90" y="140">
                )
              </tspan>{" "}
              <tspan dx="-1" dy="-5">
                1+
              </tspan>
              <tspan x="115" y="140">
                {" "}
                N
              </tspan>
              <tspan dx="-1" dy="-7">
                3-
              </tspan>
              <tspan x="60" y="170">
                Mg
              </tspan>
              {/* <!-- <tspan dx="-1" dy="-7">1+</tspan> --> */}
              <tspan dx="-1" dy="-7">
                2+
              </tspan>
              <tspan x="100" y="170">
                (PO
              </tspan>
              <tspan dx="-1" dy="7">
                4
              </tspan>
              <tspan x="135" y="170">
                )
              </tspan>
              <tspan dx="-1" dy="-7">
                3-
              </tspan>
              <tspan x="60" y="190">
                Mn
              </tspan>
              <tspan dx="-1" dy="-7">
                3+
              </tspan>
              <tspan x="95" y="190">
                O
              </tspan>
              <tspan dx="-1" dy="-7">
                2-
              </tspan>
            </text>
          </g>
        </svg>

        {/* <!-- rect box4 --> */}
        <svg x="300" y="5" width="450" height="360">
          <g style={{ fill: "none", stroke: "blue", fontSize: "14px" }}>
            <rect x="10" y="70" width="420" height="270" />
            <text x="50" y="20">
              <tspan x="30" y="40">
                Step 3
              </tspan>
              <tspan x="30" y="60">
                find the lowest common multiple(L.C.M) of the charges
              </tspan>
            </text>

            <text x="15" y="100">
              <tspan x="15" y="107">
                {" "}
                The (L.C.M) of two numbers x and y is the least{" "}
              </tspan>
              <tspan x="15" y="125">
                {" "}
                number which can be diveded by x and y without remainder.
              </tspan>
              <tspan x="15" y="145">
                {" "}
                In Aluminum Oxide, the charge of Aluminum is 3+
              </tspan>
              <tspan x="15" y="163">
                and the charge of the oxide ion is 2-
              </tspan>
              <tspan x="15" y="185">
                The L.C.M of 3 and 2 is 6.
              </tspan>
              <tspan x="15" y="205">
                Similarly, the L.C.M of the ionic charges in Lithium Oxide = 2.{" "}
              </tspan>
              <tspan x="15" y="225">
                The L.C.M of the ionic charges in Ammonium Nitride = 3.{" "}
              </tspan>
              <tspan x="15" y="250">
                The L.C.M of the ionic charges in Magnesium Phosphate = 6.{" "}
              </tspan>
              <tspan x="15" y="270">
                The L.C.M of the ionic charges in Manganese (III) oxide = 6.{" "}
              </tspan>
              <tspan x="15" y="290">
                {" "}
                What is the importance of this L.C.M here?{" "}
              </tspan>
              <tspan x="15" y="310">
                The total number of electrons transfered ={" "}
              </tspan>
              <tspan x="15" y="325">
                The total number of electrons received = L.C.M{" "}
              </tspan>
            </text>
          </g>
        </svg>
        {/* <!-- horizontal line --> */}
        {/* <!-- <svg x="520" y="550" width="170" height="10">
          <path
            id="arrow"
            d="M5,5 L55 5"
            style=" 
              stroke: green;
              strokeWidth: 1.2px;
              fill: none;
              marker-end: url(#markerArrow)
            "
          />
    </svg>      --> */}
        {/* <!-- arrow 2 --> */}
        <svg x="470" y="350" width="10" height="170">
          <path
            id="arrow"
            d="M5,5 L5 45"
            style={{
              stroke: "green",
              strokeWidth: "1.2px",
              fill: "none",
              markerEnd: "url(#markerArrow)",
            }}
          />
        </svg>

        {/* <!-- rect box5 --> */}
        <svg x="300" y="380" width="480" height="400">
          <g style={{ fill: "none", stroke: "blue", fontSize: "14px" }}>
            <rect x="10" y="85" width="470" height="300" />
            <text x="50" y="20">
              <tspan x="30" y="40">
                Step 4
              </tspan>
              <tspan x="30" y="60">
                Determine the subscripts in the formula
              </tspan>
              <tspan x="30" y="75">
                and write the final formula
              </tspan>
            </text>

            <text x="15" y="120">
              <tspan x="15" y="107">
                {" "}
                Divide the L.C.M by the charge to get the subscripts(no. of
                atoms in the formula){" "}
              </tspan>
              <tspan x="15" y="125">
                {" "}
                In Aluminum Oxide, L.C.M = 6, charge of Al = 3, no. of atoms of
                Al = 6/3 = 2
              </tspan>
              <tspan x="15" y="145">
                In Aluminum Oxide, no. of atoms of O = 6/2 = 3
              </tspan>
              <tspan x="15" y="163">
                Final formula for Aluminum oxide:{" "}
              </tspan>
              <tspan x="220" y="163">
                Al
              </tspan>
              <tspan dx="-1" dy="7">
                3
              </tspan>
              <tspan x="245" y="163">
                O
              </tspan>
              <tspan dx="-1" dy="7">
                2
              </tspan>
              <tspan x="15" y="205">
                The final formula for the rest can be determined Similarly{" "}
              </tspan>
              <tspan x="30" y="225">
                {" "}
                Lithium oxide: Li
              </tspan>
              <tspan dx="-1" dy="7">
                2
              </tspan>
              <tspan x="140" y="225">
                O
              </tspan>
              <tspan x="15" y="250">
                {" "}
                Ammonium Nitride: (NH
              </tspan>
              <tspan dx="-1" dy="7">
                4
              </tspan>
              <tspan x="175" y="250">
                )
              </tspan>
              <tspan dx="-1" dy="7">
                3
              </tspan>
              <tspan x="187" y="250">
                N
              </tspan>

              <tspan x="15" y="270">
                Magnesium Phosphate: Mg
              </tspan>
              <tspan dx="-1" dy="7">
                3
              </tspan>
              <tspan x="190" y="270">
                {" "}
                (PO
              </tspan>
              <tspan dx="-1" dy="7">
                4
              </tspan>
              <tspan x="225" y="270">
                )
              </tspan>
              <tspan dx="-1" dy="7">
                2
              </tspan>

              <tspan x="15" y="290">
                {" "}
                Manganese (III) oxide: Mn
              </tspan>
              <tspan dx="-1" dy="7">
                2
              </tspan>
              <tspan x="186" y="290">
                O
              </tspan>
              <tspan dx="-1" dy="7">
                3
              </tspan>
              <tspan x="15" y="310">
                {" "}
                Note the following:{" "}
              </tspan>
              <tspan x="15" y="335">
                When the subscripts is 1, it is not written{" "}
              </tspan>
              <tspan x="15" y="350">
                When the polyatomic ion is more than 1,it is enclosed in
                parentheses{" "}
              </tspan>
              <tspan x="15" y="370">
                The charge of the cation that varies is enclosed in brackets in
                the question{" "}
              </tspan>
            </text>
          </g>
        </svg>
      </g>
    </svg>
  );
}
