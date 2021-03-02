import React from "react";
import ErrorMessage from "./ErrorMessage";
import findLeastNumOfAirports from "./static/leastNumOfAirports";
import "./App.css";

const Main = () => {
  const [airportAvailability, setAirportAvailability] = React.useState([]);
  const [currentElement, setCurrentElement] = React.useState(0);

  const [minPath, setMinPath] = React.useState("");

  const addAirportAvailibility = () => {
    if (
      isNaN(parseInt(currentElement, 10)) ||
      parseInt(currentElement, 10) < 0
    ) {
      alert("Please enter valid input");
      setCurrentElement(0);
      return;
    }

    setAirportAvailability([
      ...airportAvailability,
      parseInt(currentElement, 10),
    ]);
  };

  const clearAirportAvailibility = () => {
    setAirportAvailability([]);
  };

  const check = () => {
    if (airportAvailability.length < 3) {
      alert("Please enter atleast 3 airport fuel units availibility");
      return;
    }
    console.log("LOG", findLeastNumOfAirports(airportAvailability, 0));
    setMinPath(findLeastNumOfAirports(airportAvailability, 0));
  };

  const reset = () => {
    setMinPath("");
    setCurrentElement(0);
    setAirportAvailability([]);
  };

  React.useEffect(() => {
    setCurrentElement(0);
  }, [airportAvailability]);

  return (
    <div id="airports-input">
      <div className="input-div">
        <input
          value={currentElement}
          type="text"
          onChange={(e) => setCurrentElement(e.target.value)}
        />
        <button
          id="add-btn"
          className="btn"
          onClick={(e) => addAirportAvailibility(e)}
        >
          Add
        </button>
      </div>

      <div className="input-div btns-group">
        <button
          className="btn btn-full-size"
          onClick={clearAirportAvailibility}
        >
          Clear
        </button>

        <button className="btn btn-full-size" onClick={check}>
          Find Path
        </button>
      </div>

      <p>[ {airportAvailability.toString()} ]</p>

      {minPath !== "" ? (
        minPath === -1 ? (
          <ErrorMessage message="Cannot reach last airport!" />
        ) : (
          <div id="output-path">
            <p className="print-value">{minPath}</p>
            <button className="btn" type="button" onClick={reset}>
              Reset
            </button>
          </div>
        )
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Main;
