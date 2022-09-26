import React, { useState, useEffect } from "react";
import "./EmployeeRegistration.css";
import { registerEmployee, editEmployee } from "../../redux/actions/employeeActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { customAlphabet } from 'nanoid'
import { useLocation } from "react-router-dom";

const EmployeeRegistration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    dob: "",
    email: "",
    address: "",
    favGame: "",
  });

  const {state} = useLocation();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const generateIDs = () => {
    const nanoid = customAlphabet('1234567890abcdef', 10)
    let randID = nanoid();
    return randID;
  }

  const handleKeyDown = event => {
    if(event.target.value === "" && event.keyCode === 32)
      event.preventDefault();
  };

  const onChangeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setFormErrors(validate(data));
    setIsSubmit(true);
  };

  useEffect(() => {
    // if editing data now
    if (Object.keys(formErrors).length === 0 && isSubmit && state?.isEditing === true) {
      if(dispatch(editEmployee(data))){
        toast.dark("Employee details edited successfully")
        setData({
          name: "",
          dob: "",
          email: "",
          address: "",
          favGame: "",
        })
        navigate("/viewemployees");
      }
    }

    if (Object.keys(formErrors).length === 0 && isSubmit && state?.isEditing === (false || undefined)) {
      let id = generateIDs();
      if(dispatch(registerEmployee({id, ...data}))){
        toast.dark("Employee details submitted successfully")
        setData({
          name: "",
          dob: "",
          email: "",
          address: "",
          favGame: "",
        })
        navigate("/viewemployees");
      }
    }
  }, [formErrors]);

  function pastFutureDate(idate){
    let minDate = '1950-01-01';
    let chosenDate = new Date(idate);
    minDate = new Date(minDate);

    let currentDate = new Date();
    if(chosenDate > currentDate) return "future"
    if( chosenDate < minDate) return "past"
  }

  //useeffect for editing
  useEffect(() => {
    if(state?.isEditing === true){
      setData({
        id: state?.empData.id,
        name: state?.empData.name,
        dob: state?.empData.dob,
        email: state?.empData.email,
        address: state?.empData.address,
        favGame: state?.empData.favGame,
      })
    }
  }, [state?.isEditing])

  const validate = (data) => {
    let errors = {};

    let emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    let nameRegex = /^[a-zA-Z ]{2,30}$/

    if (!data.name) errors.name = "Name cannot be empty";
    else if(!nameRegex.test(data.name)) errors.name = "Invalid Name";
    else if (data.name.length < 2) errors.name = "Name cannot be less than 2 characters";
    else if (data.name.length > 100) errors.name = "Name cannot be greater than 100 characters";

    if (!data.email) errors.email = "Email cannot be empty";
    else if (!emailRegex.test(data.email)) errors.email = "Email is not valid";

    if (!data.dob) errors.dob = "DOB is required field";
    else if(pastFutureDate(data.dob) === "future") errors.dob = "DOB cannot accept future date";
    else if(pastFutureDate(data.dob) === "past") errors.dob = "DOB cannot be older than 1950";

    if (!data.address) errors.address = "Address cannot be empty";

    if(!data.favGame) errors.favGame = "Favorite game cannot be empty";
    else if(!nameRegex.test(data.favGame)) errors.favGame = "Invalid Inputs";

    return errors;
  };

  return (
    <div className="regPageCSS">
      <form onSubmit={onSubmitHandler} className="formCSS" autoComplete="off">
        {state?.isEditing ? <h1>Edit Details</h1> : <h1>Enter Your Details</h1>}
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter Your Full Name"
          value={data.name}
          onChange={onChangeHandler}
          onKeyDown={handleKeyDown}
        />
        <span className="errorField">{formErrors.name}</span>
        <label htmlFor="name">Email:</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Enter Your Email Address"
          value={data.email}
          onChange={onChangeHandler}
          onKeyDown={handleKeyDown}
        />
        <span className="errorField">{formErrors.email}</span>
        <label htmlFor="name">DOB:</label>
        <input
          type="date"
          name="dob"
          id="dob"
          placeholder="Enter Your Date of Birth"
          value={data.dob}
          onChange={onChangeHandler}
        />
        <span className="errorField">{formErrors.dob}</span>
        <label htmlFor="name">Favorite Game:</label>
        <input
          type="text"
          name="favGame"
          id="favGame"
          placeholder="What's Your Favorite Game?"
          value={data.favGame}
          onChange={onChangeHandler}
          onKeyDown={handleKeyDown}
        />
        <span className="errorField">{formErrors.favGame}</span>
        <label htmlFor="address">Address:</label>
        <textarea
          name="address"
          id="address"
          placeholder="Enter Your Address"
          value={data.address}
          onChange={onChangeHandler}
          onKeyDown={handleKeyDown}
          rows="4"
          cols="40"
        />
        <span className="errorField">{formErrors.address}</span>
        <button type="submit" className="submitBtn">
          {state?.isEditing ? "Save Changes" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default EmployeeRegistration;
