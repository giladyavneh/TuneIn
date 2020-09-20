import React from "react";
import "./NotFound.css";
import TopBanner from "./TopBanner";

function NotFound() {
  return (
    <div style={{ background: "rgb(30,30,30)", minHeight: "100vh" }}>
      <TopBanner />
      <div className="NotFound">
        <div className="text">
          <h1>It seems like we are out of Tune.</h1>
          <h4>
            we couldn't find the adress tou were looking for.
            <br />
            Maybe you should navegate back to the <a href="/">Homepage</a>.
          </h4>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
