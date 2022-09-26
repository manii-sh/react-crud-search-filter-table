import React, { useState, useEffect } from "react";
import "./ViewEmployees.css";
import { useSelector } from "react-redux";
import SearchBar from "../../components/searchbar/SearchBar";
import editIcon from "../../assets/edit.svg";
import deleteIcon from "../../assets/deleteIcon.png";
import {useDispatch} from "react-redux"
import {deleteEmployee} from "../../redux/actions/employeeActions";
import { useNavigate } from "react-router-dom";

const ViewEmployees = () => {
  const data = useSelector((state) => state.employees.empData);
  const [display, setDisplay] = useState([]);
  const [searchedList, setSearchedList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchedList.length === 0) setDisplay(data);
    if (searchedList.length > 0) setDisplay(searchedList);
  }, [searchedList, data]);
  
  useEffect(() => {
    setDisplay(data);
  }, [data])
  
  const editBtnHandler = (data) => {
    navigate("/registration", {state: {isEditing: true, empData: data}});
    //dispatch(deleteEmployee(data));
  }

  const deleteBtnHandler = (data) => {
    dispatch(deleteEmployee(data));

  }

  return (
    <div className="viewEmpPage">
      <div className="tableComp">
        <SearchBar data={data} setSearchedList={setSearchedList} />
        <table className="tableCSS">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>DOB</th>
              <th>Favorite Game</th>
              <th>Address</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {display.map((val) => {
              return (
                <tr className="rowsCss" key={val.email}>
                  <td>{val.name}</td>
                  <td>{val.email}</td>
                  <td>{val.dob}</td>
                  <td>{val.favGame}</td>
                  <td>{val.address}</td>
                  <td>
                    <img
                      src={editIcon}
                      alt="edit"
                      width="24rem"
                      className="actionIcons"
                      onClick={() => editBtnHandler(val)}
                    />
                  </td>
                  <td>
                    <img
                      src={deleteIcon}
                      alt="delete"
                      width="20rem"
                      className="actionIcons"
                      onClick={()=> deleteBtnHandler(val)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewEmployees;
