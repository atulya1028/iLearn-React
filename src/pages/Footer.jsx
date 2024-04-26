import React from "react";

export const Footer = () => {


  return (
    <>
      <div
        style={{
          width: "100%",
          height:'100px',
          backgroundColor: "black",
          padding: "50px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "white",
          }}
        >
          {" "}
          <div>&copy; iLearn 2024</div>
        </div>
      </div>
    </>
  );
};
