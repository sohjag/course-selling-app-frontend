// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import axios from "axios";
import { BACKEND_URL, PORT } from "../constants/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: 150,
        marginBottom: 150,
      }}
    >
      <Card variant="outlined" style={{ width: 400 }}>
        <div style={{ padding: 10 }}>
          <Typography variant="h6">Welcome to Horsera</Typography>
        </div>
        <div style={{ padding: 10 }}>
          <TextField
            fullWidth={true}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <br />
        <div style={{ padding: 10 }}>
          <TextField
            fullWidth="true"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type={"password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        <br />
        <div style={{ padding: 10 }}>
          <Button
            type="submit"
            variant="contained"
            onClick={() => {
              axios({
                method: "post",
                url: `${BACKEND_URL}:${PORT}/users/login`,
                headers: {
                  "Content-Type": "application/json",
                },

                data: {
                  username,
                  password,
                },
              })
                .then((response) => {
                  if (response.status == 200) {
                    localStorage.setItem(
                      "token",
                      "Bearer " + response.data.token
                    );
                    console.log("user logged in sucessfully");
                    window.location = "/";
                    //navigate("/");
                  } else {
                    alert("Incorect email or password");
                    console.error(response);
                  }
                })
                .catch((e) => {
                  alert("Incorrect email or password");
                  console.log(e);
                });
            }}
          >
            Login
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Login;
