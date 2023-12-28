import React from "react";
import "./parallax.css"


function MainPage() {
  return (
    <div className="container d-flex flex-column">
      <div className="bgimg-1">
        <div className="caption">
          <span className="border h1">Fleet Insight Pro</span>
        </div>
      </div>

      <div className="interleaver">
      The premiere solution for automobile dealership management
      </div>

      <div className="bgimg-2">
        <div className="caption">
          <span className="border" style={
            {
              backgroundColor: "transparent",
              fontSize: "25px",
              color: "#f7f7f7",
            }
          }>LESS EFFORT</span>
        </div>
      </div>

      <div className="interleaver">
        Transform your business and your customers' experiences
      </div>

      <div className="bgimg-3 mb-5">
        <div className="caption">
          <span className="border" style={
            {
              backgroundColor: "transparent",
              fontSize: "25px",
              color: "#f7f7f7",
            }
          }>IMPROVED EFFICIENCY</span>
        </div>
      </div>
    </div >
  );
}

export default MainPage;
