import { Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL, PORT } from "../constants/api";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageLink, setImageLink] = useState("");

  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: 150 }}>
      <Card variant="outlined" style={{ width: 500 }}>
        <div style={{ padding: 10 }}>
          <Typography variant="h5">Add course</Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "center", padding: 10 }}>
          <TextField
            fullWidth="true"
            variant="outlined"
            label="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></TextField>
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "center", padding: 10 }}>
          <TextField
            fullWidth="true"
            variant="outlined"
            label="Description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></TextField>
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "center", padding: 10 }}>
          <TextField
            variant="outlined"
            fullWidth="true"
            label="Price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          ></TextField>
        </div>
        <div style={{ display: "flex", justifyContent: "center", padding: 10 }}>
          <TextField
            variant="outlined"
            fullWidth="true"
            label="Image link"
            onChange={(e) => {
              setImageLink(e.target.value);
            }}
          ></TextField>
        </div>
        <div style={{ padding: 10 }}>
          <Button
            variant="contained"
            type="submit"
            onClick={() => {
              axios({
                method: "post",
                url: `${BACKEND_URL}:${PORT}/admin/courses`,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: localStorage.getItem("token"),
                },
                data: { title, description, price, imageLink },
              })
                .then((res) => {
                  if (res.status === 200) {
                    alert("Course added successfully");
                  } else {
                    alert("Error in adding course");
                  }
                })
                .catch((e) => {
                  console.log(e);
                });
            }}
          >
            Add Course
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default AddCourse;
