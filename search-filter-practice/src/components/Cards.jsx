import React from "react";
import "./pagination.css";

const Cards = (props) => {
  var users = props.userData;
  console.log("users", users);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
    {users.map((user, index) => (
      <div className="card-container" key={index}>
        <div className="card-logo">
          <img src={user.image} alt={`${user.firstName}'s avatar`} />
        </div>

        <div className="card-body">
          <h2 className="card-name">{user.firstName} {user.lastName}</h2>
          <p className="card-address">Age : {user.age}</p>
        </div>

        <button className="button">View Profile</button>
      </div>
    ))}
  </div>
  );
};

export default Cards;
