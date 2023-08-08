import { Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { BACKEND_URL } from "../constants/api";

import logoImage from "../assets/Vitejs-logo.svg.png";

const AppbarContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#322653",
  color: "#fff",
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const LogoTypography = styled(Typography)({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  fontWeight: 700,
  color: "#fff",
  textTransform: "uppercase",
});

const LogoImg = styled("img")({
  width: "40px", // Adjust the width to your desired size
  height: "40px", // Adjust the height to your desired size
  marginRight: "8px", // Adjust the spacing between the image and text as needed
});

const StyledButton = styled(Button)({
  color: "white",
  background: "#322653", // Match the background color of the appbar
  marginLeft: "10px", // Adjust spacing as needed
});

function Appbar() {
  const navigate = useNavigate();
  const [userEmail, setUseremail] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    function callback2(data) {
      console.log(data);
      setUseremail(data.username);
      setRole(data.role);
    }
    function callback1(res) {
      res.json().then(callback2);
    }
    fetch(`${BACKEND_URL}:3000/role/me`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then(callback1);
  }, []);

  if (userEmail) {
    if (role === "admin") {
      return (
        <AppbarContainer
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <LogoTypography variant="h6" onClick={() => navigate("/")}>
            <LogoImg src={logoImage} alt="Logo" /> Horsera
          </LogoTypography>
          <div style={{ display: "flex", padding: 5 }}>
            <div style={{ padding: 5 }}>{userEmail}</div>
            <div style={{ padding: 5 }}>
              <StyledButton
                variant={"contained"}
                onClick={() => {
                  // window.location = "/signup";
                  navigate("/browsecourses");
                }}
              >
                Browse Courses
              </StyledButton>
            </div>
            <div style={{ padding: 5 }}>
              <StyledButton
                variant={"contained"}
                onClick={() => {
                  // window.location = "/signup";
                  navigate("/addcourse");
                }}
              >
                Add a course
              </StyledButton>
            </div>
            <div style={{ padding: 5 }}>
              <StyledButton
                variant="contained"
                onClick={() => {
                  // window.location = "/login";
                  localStorage.setItem("token", null);
                  window.location = "/";
                }}
              >
                Log out
              </StyledButton>
            </div>
          </div>
        </AppbarContainer>
      );
    }

    //if role is user
    return (
      <AppbarContainer
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <LogoTypography variant="h6" onClick={() => navigate("/")}>
          <LogoImg src={logoImage} alt="Logo" /> Horsera
        </LogoTypography>
        <div style={{ display: "flex", padding: 5 }}>
          <div style={{ padding: 5 }}>{userEmail}</div>
          <div style={{ padding: 5 }}>
            <StyledButton
              variant={"contained"}
              onClick={() => {
                // window.location = "/signup";
                navigate("/browsecourses");
              }}
            >
              Browse courses
            </StyledButton>
          </div>
          <div style={{ padding: 5 }}>
            <StyledButton
              variant="contained"
              onClick={() => {
                // window.location = "/login";
                localStorage.setItem("token", null);
                window.location = "/";
              }}
            >
              Log out
            </StyledButton>
          </div>
        </div>
      </AppbarContainer>
    );
  }

  return (
    <AppbarContainer
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <LogoTypography variant="h6" onClick={() => navigate("/")}>
        <LogoImg src={logoImage} alt="Logo" /> Horsera
      </LogoTypography>
      <div style={{ display: "flex", padding: 5 }}>
        <div style={{ padding: 5 }}>
          <StyledButton
            variant={"contained"}
            onClick={() => {
              // window.location = "/signup";
              navigate("/signup");
            }}
          >
            Sign up
          </StyledButton>
        </div>
        <div style={{ padding: 5 }}>
          <StyledButton
            variant="contained"
            onClick={() => {
              // window.location = "/login";
              navigate("/login");
            }}
          >
            Sign in
          </StyledButton>
        </div>
      </div>
    </AppbarContainer>
  );
}

export default Appbar;
