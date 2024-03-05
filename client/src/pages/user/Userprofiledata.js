import React from "react";

export default function Userprofiledata({ details }) {
  return (
    <>
      <div class="card" style={{ width: "18rem", margin: "auto" }}>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Name :{details.name}</li>
          <li class="list-group-item">Email :{details.email}</li>
          <li class="list-group-item">PH :{details.phonenumber}</li>
          <li class="list-group-item">Address :{details.address}</li>
          <li class="list-group-item">City :{details.city}</li>
          <li class="list-group-item">Pin :{details.pincode}</li>
        </ul>
      </div>
    </>
  );
}
