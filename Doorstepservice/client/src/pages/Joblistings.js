import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { Link } from "react-router-dom";

import { Button, Chip, Container, Grid, Box, MenuItem, InputLabel, FormControl, Select } from "@mui/material";
export default function Joblistings() {
  const token = localStorage.getItem("token");
  console.log(token);

  const [data, setData] = useState({
    category: "",
    city: "",
  });
  console.log("data logged", data);

  const inputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData({ ...data, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    console.log("submit", data);

    axios.post("http://localhost:5000/buissness/viewjoblist", data).then((response) => {
      console.log(response);
      const jobdata = response.data.data;
      setJobdata(jobdata);
    });
  };

  const [jobdata, setJobdata] = useState([]);

  const sendApplication = (jobId) => {
    axios
      .post(`http://localhost:5000/buissness/apply/${jobId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <>
      <Header />
      <Box sx={{ padding: "50px" }}>
        <Grid container spacing={0}>
          <Grid item xs={3} sm={12} lg={3}>
            <Box sx={{ width: "100%", height: "600px", backgroundColor: "  ", paddingTop: "50px" }}>
              <Container maxWidth="sm">
                <Box
                  sx={{
                    height: "500px",
                    backgroundColor: "white",
                    border: "1px solid rgb(203 213 225)",
                    borderRadius: "14px",
                    padding: "5px",
                  }}
                >
                  <Box
                    sx={{
                      height: "60px",
                      backgroundColor: "white",
                      padding: "20px",
                      borderBottom: "1px solid rgb(203 213 225)",
                    }}
                  >
                    <h6>Search Filter</h6>
                  </Box>
                </Box>
              </Container>
            </Box>
          </Grid>

          <Grid item xs={9} sm={12} lg={9}>
            <Box sx={{ width: "100%", height: "600px", backgroundColor: "  ", paddingTop: "50px" }}>
              <Container maxWidth="md">
                <Box
                  sx={{
                    backgroundColor: "white",
                    width: "100%",
                    height: "100%",
                    padding: "10px",
                    borderRadius: "14px",
                    border: "1px solid  rgb(203 213 225)",
                  }}
                >
                  <Grid container spacing={1} direction="row" justifyContent="center" alignItems="center">
                    <Grid item xs={3} sm={12} lg={4}>
                      <Box>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Category</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            label="Age"
                            name="category"
                            onChange={inputChange}
                            defaultValue={""}
                          >
                            <MenuItem value={"Electrical"}>Electrical</MenuItem>
                            <MenuItem value={"Plumbing"}>Plumbing</MenuItem>
                            <MenuItem value={"Carpentry"}>Carpentry</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={3} sm={12} lg={4}>
                      <Box>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">City</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            label="Age"
                            name="city"
                            onChange={inputChange}
                            defaultValue={""}
                          >
                            <MenuItem value={"Kozhikode"}>Kozhikode</MenuItem>
                            <MenuItem value={"kannur"}>kannur</MenuItem>
                            <MenuItem value={"Kochi"}>Kochi</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={3} sm={12} lg={4}>
                      <Box sx={{ padding: "10px" }}>
                        <Button onClick={submit} variant="contained">
                          Search
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Container>

              {/* Result display */}
              {jobdata.map((item) => (
                <Container maxWidth="md" sx={{ marginTop: "20px" }}>
                  <Box
                    sx={{
                      border: "1px solid rgb(203 213 225)",
                      height: "105px",
                      borderRadius: "12px",
                      padding: "20px",
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignContent: "center" }}>
                      <Box sx={{ width: "70%" }}>
                        <Link
                          style={{
                            textDecoration: "none",
                            color: "black",
                          }}
                          to={`/viewjobonsearch/${item._id}`}
                          className="link-job"
                        >
                          <h5>{item.title}</h5>
                        </Link>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Box sx={{}}>
                            <p>{item.category}</p>
                          </Box>
                          <Box sx={{}}>
                            <p>{item.city}</p>
                          </Box>
                          <Box sx={{}}>
                            <p>{item.date}</p>
                          </Box>
                          <Box sx={{}}>
                            <p>{item.budget}</p>
                          </Box>
                        </Box>
                      </Box>
                      <Box sx={{ width: "10%" }}></Box>
                      <Box sx={{ width: "20%", padding: "10px" }}>
                        <Button
                          onClick={() => {
                            sendApplication(item._id);
                          }}
                          variant="contained"
                        >
                          Apply
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Container>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}