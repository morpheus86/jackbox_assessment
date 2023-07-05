import React, { useState, useEffect } from "react";

import classes from "./AdminPage.module.css";
const AdminPage = () => {
  const { list_element, list, legend } = classes;
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const response = await fetch("http://localhost:8080");
      const data = await response.json();
      setAllData(data.mail.users);
    };
    getAllUsers();
  }, []);

  return (
    <>
      <div className={list}>
        <ul className={legend}>
          <li>UserId</li>
          <li>Fist Name</li>
          <li>Last Name</li>
          <li>Email address</li>
          <li>Administrator</li>
        </ul>
        {allData.map((data) => {
          return (
            <li className={list_element} key={data.id}>
              <div>{data.id}</div>
              <div>{data.firstName}</div>
              <div>{data.lastName}</div>
              <div>{data.email}</div>
              <div>{data.isAdmin.toString() || "false"}</div>
            </li>
          );
        })}
      </div>
    </>
  );
};

export default AdminPage;
