import axios from "axios";
export function getEmployee(data) {
  let URL = "http://localhost:4000/api/employeeList";
  let instance = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  };
  return function(dispatch) {
    dispatch({ type: "FETCH_EMPLOYEE" });
    axios
      .get(URL, data, instance)
      .then(response => {
        dispatch({ type: "FETCH_EMPLOYEE_FULFILLED", payload: response.data });
        console.log("payload", response.data);
      })
      .catch(err => {
        dispatch({ type: "FETCH_EMPLOYEE_REJECTED", payload: 500 });
      });
  };
}
