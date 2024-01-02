import { useState } from "react";
import './Temperature.css';

// used to initialize the temperature state
const kDefaultTemperature = 68;

// an ordered mapping of the lower bound of a temperature range
// to the name of a css class to apply for that range.
// e.g., the 80 in the first entry means to apple 'very-hot' to any
// temperature >= 80.
// there's nothing in the data here that enforces treating the value as
// a lower bound, but we will use it that way in calculateTempRange
const kTempRanges = [
  [80, 'very-hot'],
  [70, 'hot'],
  [60, 'warm'],
  [50, 'mild'],
];

// temperature range css class to apply if none of the bounded ranges
// applied. i.e., the class to use if temperature < 50
const kFallbackTempRange = 'cool';

// function to map a temperature value to a css class range.
// NOTE: this function doesn't need to "live" in the component. We can pass
// it the value it needs to carry out its task (the temperature) which
// gives us greater flexibility in where we place this logic. We could actually
// move this logic (and the range data) out of this file entirely! We would
// just need to export this function and kDefaultTemperature for use in
// the component.
const calculateTempRange = (temperature) => {
  // use list destructuring to get the two values in each range record
  for (const [lower, range] of kTempRanges) {
    // if the temperature is above the lower bound of this record, use it
    if (temperature >= lower) {
      return range;
    }
  }

  // if the temperature was below all the bounded records, use the fallback
  return kFallbackTempRange;
};


// the start of our Temperature component
const Temperature = () => {
  // piece of state to track the current temperature
  const [temperature, setTemperature] = useState(kDefaultTemperature);  // A

  // function to change the temperature by some amount (up or down)
  const changeTemp = amount => {
    // uses the setter for temperature using function-passing style.
    // NOTE: the name temperature on the line marked B below is NOT the
    // piece of state variable from the line marked A above.
    // it is the parameter to the anonymous function.
    // it will receive the current value of the piece of state associated
    // with the setter (temperature) and return the new value to use.
    // it is common to use the name we chose for the piece of state as
    // the function parameter, though this can be confusing until we
    // get used to it.
    setTemperature(temperature => temperature + amount);  // B

    // due to the simplicity of this application, there would essentially be
    // no difference if we used the value-passing style of calling the setter
    // setTemperature(temperature + amount);
    // In this case, temperature IS the local variable read from the piece of
    // state at the start of the render.
    // getting used to the function-passing style and using it consistently
    // can help us avoid certain kinds of errors in more complex scenarios.
  };

  // NOTE: we don't need a separate piece of state for the range class. We
  // can calculate the value directly using our piece of state during each
  // render, and the result (the current css class) can be held in a plain
  // local variable. Even if our calculation took a "significant" amount of
  // time such that we didn't want it to run every render (ideally it would
  // run only when needed), there are other hooks, such as useMemo, that would
  // be more appropriate to investigate.
  const tempRange = calculateTempRange(temperature);

  // render our markup, including the two required buttons with click handlers,
  // and the temperature (in an element to which we can apply our css class).
  // we used the component name as the CSS class of the outer element to make
  // it easier to scope our style rules to only this component.
  return (
    <div className="Temperature">
      <button onClick={() => changeTemp(-1)}>Down</button>
      <span className={tempRange}>{temperature}℉</span>
      <button onClick={() => changeTemp(1)}>Up</button>
    </div>
  );
};

export default Temperature;