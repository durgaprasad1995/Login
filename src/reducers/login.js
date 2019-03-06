export default function reducer(
  state = {
    employeeList: null,
    error: null
  },
  action
) {
  switch (action.type) {
    case "FETCH_EMPLOYEE": {
      console.log("FETCH_EMPLOYEE");
      return {
        ...state,
        fetching: true,
        fetched: false,
        employeeList: [],
        empAdd: [],
        error: null
        // receivedData: null
      };
    }
    case "FETCH_EMPLOYEE_REJECTED": {
      console.log("FETCH_EMPLOYEE_REJECTED");

      return {
        ...state,
        fetched: true,
        fetching: false,
        // error: "Something Went wrong please try again!"
        error: action.payload
      };
    }
    case "FETCH_EMPLOYEE_PENDING": {
      console.log("FETCH_EMPLOYEE_PENDINGD");
      return { ...state, fetched: false, fetching: true };
    }
    case "FETCH_EMPLOYEE_FULFILLED": {
      console.log("FETCH_EMPLOYEE_FULFILLED");

      return {
        ...state,
        fetched: true,
        fetching: false,
        employeeList: action.payload
        // passempid: null
      };
      // console.log("employeeeeeee", state.employeeList);
    }
  }
  return state;
}
