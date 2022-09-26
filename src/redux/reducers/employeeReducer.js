const dummy = [
  {
    id: 'e23c093f58',
    name: 'manish kumar',
    dob: '1998-10-09',
    email: 'manish@gmail.com',
    address: 'mohali',
    favGame: 'basketball'
  },
  {
    id: 'e2j4e9e488',
    name: 'ankit aman',
    dob: '2000-04-05',
    email: 'ankit@gmail.com',
    address: 'mohali',
    favGame: 'football'
  },
  {
    id: 'e23c8im488',
    name: 'sumit pradhan',
    dob: '2001-02-06',
    email: 'sumit@gmail.com',
    address: 'mohali',
    favGame: 'chess'
  },
];

const INITIAL_STATE = {
    empData: [],
  };
  
  const employeeReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
      case "REGISTRATION":
        return {
          ...state,
            empData: [...state.empData, payload]
        };

      case "EMPEDIT":
        return {
          ...state,
            empData: state.empData.map(data => data.id === payload.id ? payload : data)
        };
      case "EMPDELETE":
        return {
          ...state,
            empData: state.empData.filter((data) => data.id !== payload.id)
        };
      /********** return the initial state ************/
      default:
        return state;
    }
  };
  
  export default employeeReducer;