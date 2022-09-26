export const registerEmployee = (data) => async (dispatch) => {
    dispatch({ type: "REGISTRATION", payload: data });
};

export const editEmployee = (data) => async (dispatch) => {
    dispatch({ type: "EMPEDIT", payload: data });
};

export const deleteEmployee = (data) => async (dispatch) => {
    dispatch({ type: "EMPDELETE", payload: data });
};