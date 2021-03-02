let is_last_reachable = false;

let airports_reached = "";

const validateInput = (airport_availibility) => {
  for (let i in airport_availibility) {
    if (isNaN(airport_availibility[i]) || airport_availibility[i] < 0) {
      return 0;
    }
  }

  return 1;
};

//returns farthest airport that can be reached
const travelToAirport = (airport_availibility, departure_index) => {
  let i,
    highest_fuel_units = airport_availibility[departure_index + 1],
    highest_fuel_units_index = departure_index + 1;

  //if last airport reached
  if (
    departure_index + airport_availibility[departure_index] >=
    airport_availibility.length - 1
  ) {
    is_last_reachable = true;
    highest_fuel_units_index = airport_availibility.length - 1;
    highest_fuel_units = airport_availibility[highest_fuel_units_index];

    return highest_fuel_units_index;
  }

  for (
    i = departure_index + 1;
    i <= airport_availibility[departure_index];
    i++
  ) {
    //find highest fuel units available in range; update index if multiple
    //identical values exist
    if (airport_availibility[i] >= highest_fuel_units) {
      highest_fuel_units = airport_availibility[i];
      highest_fuel_units_index = i;
    }
  }

  //final airport unreachable
  if (highest_fuel_units === 0) {
    return -1;
  }

  return highest_fuel_units_index;
};

const findLeastNumOfAirports = (airport_availibility, current_index) => {
  console.log("enterd leastNumOfAirports");

  //check for invalid array or invalid elements
  if (validateInput(airport_availibility) === 0) {
    throw new Error("Invalid type. Please enter valid input type.");
  }

  //zero fuel at first airport, cannot reach final airport
  if (airport_availibility[0] === 0) {
    console.log("Zero fuel at airport");
    return -1;
  }

  //add first airport to output string
  while (current_index !== -1) {
    if (is_last_reachable) {
      console.log("last airport reached");
      airports_reached += airport_availibility[current_index];
      console.log(airports_reached);
      const temp_airports_reached = airports_reached;

      //reset airports_reached(global variable)
      airports_reached = "";
      is_last_reachable = false;

      return temp_airports_reached;
    }

    airports_reached += airport_availibility[current_index] + " -> ";

    current_index = travelToAirport(airport_availibility, current_index);
  }

  console.log("cannot reach last airport");
  return -1;
};

// EXAMPLE:
// input1: [2, 1, 2, 3, 1]
// findLeastNumOfAirports([1, 6, 3, 4, 5, 0, 0, 0, 6], 0);

export default findLeastNumOfAirports;
