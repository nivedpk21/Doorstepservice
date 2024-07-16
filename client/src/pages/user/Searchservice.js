import React, { useState } from "react";
import Navigation from "../../components/Navigation";
import "./searchservice.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "./searchservice.css";
import {
  Typography,
  CssBaseline,
  AppBar,
  Toolbar,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  styled,
  Stack,
  Container,
  Box,
} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Searchservice() {
  const [data, setData] = useState({
    category: "",
    city: "",
  });

  const [searchresult, setSearchresult] = useState([]);

  const inputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    console.log("value", value);

    setData({ ...data, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();

    console.log("data", data);

    if (Object.keys(data).length !== 0) {
      axios.post("https://doorstepservice.onrender.com/user/search", data).then((response) => {
        console.log(response);
        const data = response.data.data;
        setSearchresult(data);

        localStorage.setItem("searchresult", JSON.stringify(data));
        const retrievedData = localStorage.getItem("searchresult");
        const newData = JSON.parse(retrievedData);
        console.log("newdata", newData);
      });
    }
  };

  const savedData = localStorage.getItem("searchresult");
  console.log("savedData", savedData);

  return (
    <>
      <Navigation />

      {/* mui design */}

      <div>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <nav class="navbar navbar-expand-lg bg-body-light">
              <div class="container-fluid">
                <button
                  class="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent2"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent2">
                  <div className="" style={{ height: "590px", width: "100%", padding: "0px" }}>
                    <div
                      className="container border rounded"
                      style={{
                        width: "100%",
                        height: "500px",
                        marginTop: "40px",
                        padding: "10px",
                      }}
                    >
                      <div className="border-bottom p-2">
                        <h6 style={{ textAlign: "center" }}>Search Filter</h6>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          padding: "10px",
                          display: "flex",
                          justifyContent: "space-between",
                          flexWrap: "wrap",
                          marginTop: "50px",
                        }}
                      >
                        <div>
                          <p>Rating</p>
                        </div>

                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label class="form-check-label" for="flexCheckDefault">
                            2★
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label class="form-check-label" for="flexCheckDefault">
                            3★
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckChecked"
                            // checked
                          />
                          <label class="form-check-label" for="flexCheckChecked">
                            4★
                          </label>
                        </div>
                      </div>
                      {/* <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    padding: "10px",
                  }}
                >
                  <div>
                    <p>Status</p>
                  </div>
                  <div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked"
                        // checked
                      />
                      <label class="form-check-label" for="flexCheckChecked">
                        Open
                      </label>
                    </div>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked"
                      // checked
                    />
                    <label class="form-check-label" for="flexCheckChecked">
                      closed
                    </label>
                  </div>
                  <div></div>
                </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </nav>
            {/* navbar */}
          </Grid>
          <Grid item xs={12} lg={9}>
            <div style={{ border: "0px solid black ", height: "590px", width: "100%" }}>
              {/* search item main div */}
              <div
                style={{
                  borderBottom: "0px solid black",
                  minHeight: "150px",
                  // padding: "50px",
                }}
              >
                {/* search grid */}

                <div style={{ padding: "60px" }}>
                  <Grid
                    container
                    spacing={1}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    style={{
                      border: "1px solid  rgb(148 163 184)",
                      padding: "5px",
                      borderRadius: "12px",
                    }}
                  >
                    <Grid item xs={12} lg={4} style={{ padding: "0px" }}>
                      <div style={{ border: "0px solid black", padding: "0px" }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">category</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            //   value={age}
                            name="category"
                            onChange={inputChange}
                            defaultValue={""}
                          >
                            <MenuItem value={"electrical"}>Electrical</MenuItem>
                            <MenuItem value={"plumbing"}>Plumbing</MenuItem>
                            <MenuItem value={"pestcontrol"}>Pestcontrol</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </Grid>
                    <Grid item xs={12} lg={4} style={{ padding: "0px" }}>
                      <div style={{ border: "0px solid black" }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">city</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            //   value={age}
                            label="  city"
                            // onChange={handleChange}
                            onChange={inputChange}
                            name="city"
                            defaultValue={""}
                          >
                            <MenuItem value={"kozhikode"}>Kozhikode</MenuItem>
                            <MenuItem value={"kannur"}>Kannur</MenuItem>
                            <MenuItem value={"thrissur"}>Thrissur</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </Grid>
                    <Grid item xs={12} lg={4} style={{ padding: "4px" }}>
                      <div style={{ border: "0px solid black", textAlign: "center" }}>
                        <Button
                          style={{ marginLeft: "0px", width: "100%" }}
                          variant="contained"
                          sx={{ height: 54 }}
                          onClick={submit}
                        >
                          Search
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </div>
              {/* display search results */}

              <Container maxWidth="lg" sx={{ padding: "10px" }}>
                <Grid container spacing={1} direction="column">
                  <Grid item xs={12}>
                    {searchresult.map((item) => (
                      <Container
                        maxWidth="md"
                        sx={{
                          border: 1,
                          borderColor: "rgb(203 213 225)",
                          height: "130px",
                          borderRadius: 2,
                          marginBottom: "10px",
                        }}
                      >
                        <Grid container spacing={1} alignItems="center" sx={{ padding: "10px" }}>
                          <Grid item xs={6} sm={3} lg={3}>
                            <Container>
                              <img src="./images/smartphone.jpg" style={{ width: "110px" }} />
                            </Container>
                          </Grid>
                          <Grid item xs={6} sm={6} lg={6}>
                            <Container>
                              <Link
                                to={`/viewbuissnessprofileonsearch/${item._id}`}
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                <h5 className="result-title">{item.businessname}</h5>
                              </Link>
                              <p>{item.city}</p>
                              <p style={{ color: "green" }}>Open now</p>
                            </Container>
                          </Grid>
                          <Grid item xs={12} sm={3} lg={3}>
                            <Container>
                              <Stack spacing={1}>
                                <Link
                                  className="btn btn-success"
                                  style={{
                                    textDecoration: "none",
                                    width: "100%",
                                  }}
                                  to={`/bookservice/${item.loginId}`}
                                  variant="contained"
                                  size="small"
                                >
                                  Book
                                </Link>
                                <Button variant="contained" size="small">
                                  Call
                                </Button>
                                <Button variant="contained" size="small">
                                  Message
                                </Button>
                              </Stack>
                            </Container>
                          </Grid>
                        </Grid>
                      </Container>
                    ))}
                  </Grid>
                </Grid>
              </Container>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
