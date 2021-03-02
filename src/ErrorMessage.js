import React from "react";
import "./App.css";

const ErrorMessage = (props) => {
  return (
    <div id="error-message">
      <p className="print-value">{props.message}</p>
    </div>
  );
};

export default ErrorMessage;
