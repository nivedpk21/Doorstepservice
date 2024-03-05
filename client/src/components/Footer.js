import React from "react";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="container-fluid border" style={{ width: "100%", height: "200px" ,padding:"40px"}}>
          <ul class="nav justify-content-center">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                About
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                FAQs
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link " aria-disabled="true">
                Contact
              </a>
            </li>
          </ul>

          <hr/>
          <p style={{textAlign:"center"}}>© 2024 Doorstep Service, Inc</p>
        </div>
      </footer>
    </>
  );
}
