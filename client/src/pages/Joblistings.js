import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Button,
  Chip,
  Container,
  Grid,
  Box,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";
import Pagination from "../components/Pagination";
import Navigation from "../components/Navigation";
export default function Joblistings() {
  const token = localStorage.getItem("token");
  console.log(token);
  const [jobdata, setJobdata] = useState([]);

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

    axios
      .post("https://doorstepservice.onrender.com/buissness/viewjoblist", data)
      .then((response) => {
        console.log(response);
        const jobdata = response.data.data;

        setJobdata(jobdata);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendApplication = (jobId) => {
    axios
      .post(`https://doorstepservice.onrender.com/buissness/apply/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
      });
  };

  const sort = (jobdata) => {
    const sortedData = jobdata.sort((a, b) => a.budget - b.budget);
    setJobdata(sortedData);
  };

  const [currentPage, setCurrentpage] = useState(1);
  const [postsPerpage, setPostsperpage] = useState(5);

  const lastPostindex = currentPage * postsPerpage;
  const firstPostindex = lastPostindex - postsPerpage;
  const currentPageposts = jobdata.slice(firstPostindex, lastPostindex);

  return (
    <>
      <Navigation />
      <Box sx={{ padding: "50px" }}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} lg={3}>
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
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    class="bi bi-funnel"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
                  </svg>
                  {/* <span class="navbar-toggler-icon"></span> */}
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent2">
                  <Box
                    sx={{
                      width: "100%",
                      height: "300px",
                      backgroundColor: "  ",
                      paddingTop: "20px",
                    }}
                  >
                    <Container maxWidth="sm">
                      <Box
                        sx={{
                          height: "250px",
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
                        <div className="mt-4 p-3">
                          <div class="mb-3">
                            <select class="form-select form-select-sm" name="" id="">
                              <option selected>Sort by amount</option>
                              <option value="">highest</option>
                              <option value="">lowest</option>
                            </select>
                          </div>
                        </div>

                        <div className="text-center">
                          <button onClick={sort} type="button" class="btn btn-primary">
                            Apply
                          </button>
                        </div>
                      </Box>
                    </Container>
                  </Box>
                </div>
              </div>
            </nav>
          </Grid>

          <Grid item xs={12} sm={12} lg={9}>
            <Box
              sx={{ width: "100%", minHeight: "500px", backgroundColor: "  ", paddingTop: "20px" }}
            >
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
                  <Grid
                    container
                    spacing={1}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid item xs={12} sm={12} lg={4}>
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
                            <MenuItem value={"electrical"}>Electrical</MenuItem>
                            <MenuItem value={"plumbing"}>Plumbing</MenuItem>
                            <MenuItem value={"pestcontrol"}>pestcontrol</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={4}>
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
                            <MenuItem value={"kozhikode"}>Kozhikode</MenuItem>
                            <MenuItem value={"kannur"}>kannur</MenuItem>
                            <MenuItem value={"kochi"}>Thrissur</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={4}>
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
              {currentPageposts.map((item) => (
                <Container minWidth="md" sx={{ marginTop: "20px" }}>
                  <Box
                    sx={{
                      border: "1px solid rgb(203 213 225)",
                      height: "auto",
                      borderRadius: "12px",
                      padding: "20px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignContent: "center",
                      }}
                    >
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
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
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
                            <p>Rs{item.budget}</p>
                          </Box>
                        </Box>
                      </Box>
                      <Box sx={{ width: "10%" }}></Box>
                      <Box
                        sx={{
                          width: "20%",
                          padding: "10px",
                          marginLeft: "auto",
                          textAlign: "right",
                        }}
                      >
                        <Link
                          to={`/viewjobonsearch/${item._id}`}
                          className="btn btn-outline-primary"
                        >
                          View
                        </Link>
                      </Box>
                    </Box>
                  </Box>
                </Container>
              ))}
            </Box>
            <Pagination
              totalPosts={jobdata.length}
              postsPerpage={postsPerpage}
              setCurrentPage={setCurrentpage}
              currentPage={currentPage}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
