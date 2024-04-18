import React from "react";
import '../App.css';

export default function Business() {
  return (
    <div className="bg-img">
      <div style={{ paddingTop: "30px" }}></div>
      <div
        style={{
          textAlign: "justify",
          marginLeft: "30px",
          marginRight: "30px",
          fontSize: "35px",
          fontWeight: "bold",
          color:'white',
          fontFamily: "Dancing Script",
        }}
      >
        Our motive is to provide best service so that collaboration team and
        investors can take interest that what is the purpose of selling a best
        book according to learners need. So for franchise and collaboration
        purpose please mail us at: &nbsp;
        <a href="mailto:atulyaagrawal1996@gmail.com" style={{ color: "#faedcd" }}>
          Send Email
        </a>
      </div>
    </div>
  );
}
