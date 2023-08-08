import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#322653",
  color: "#fff",
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 0,
}));

const LogoImage = styled("img")({
  width: 100,
  height: 100,
});

const FooterLink = styled(Link)({
  marginRight: "16px",
  color: "#fff",
  textDecoration: "none",
});

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <FooterContainer>
        <LogoImage
          src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg"
          alt="Logo"
        />
        <Box>
          <FooterLink
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/about");
            }}
          >
            About
          </FooterLink>
          <FooterLink href="#" style={{ marginRight: "16px" }}>
            FAQ
          </FooterLink>
          <Typography
            variant="body2"
            style={{ color: "#ccc", marginTop: "8px" }}
          >
            © {new Date().getFullYear()} All rights reserved.
          </Typography>
        </Box>
      </FooterContainer>
    </div>
  );
};

export default Footer;
