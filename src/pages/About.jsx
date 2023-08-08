import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${"https://www.hdwallpapers.in/download/horses_are_running_on_hills_with_background_of_clouds_and_sunbeam_hd_horse-1920x1080.jpg"}) center/cover`,
  backgroundSize: "cover",
  backgroundPosition: "center bottom",
  color: "#fff",
  padding: theme.spacing(10),
  textAlign: "center",
}));

const TitleTypography = styled(Typography)({
  fontWeight: 700,
  marginBottom: "1rem",
  color: "#fff",
  textTransform: "uppercase",
});

const SubtitleTypography = styled(Typography)({
  fontWeight: 400,
  marginBottom: "2rem",
});

const StyledButton = styled(Button)({
  background: "#322653",
  color: "#fff",
  padding: "0.8rem 2rem",
  fontWeight: 600,
  borderRadius: "50px",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "#544e7a",
  },
});

const Hero = () => {
  return (
    <HeroSection>
      <Box maxWidth="800px" margin="0 auto">
        <TitleTypography variant="h3" component="h1">
          Welcome to Horsera
        </TitleTypography>
        <SubtitleTypography variant="h5" component="h2">
          Start Your Equestrian Journey Today
        </SubtitleTypography>
      </Box>
    </HeroSection>
  );
};

const CTASection = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(8),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse",
    textAlign: "center",
  },
}));

const TextContent = styled(Box)(({ theme }) => ({
  maxWidth: "500px",
  [theme.breakpoints.down("sm")]: {
    marginBottom: theme.spacing(4),
  },
}));

const CTATitleTypography = styled(Typography)({
  fontWeight: 700,
  marginBottom: "1rem",
  color: "#322653",
  textTransform: "uppercase",
});

const CTASubtitleTypography = styled(Typography)({
  fontWeight: 400,
  marginBottom: "2rem",
  color: "#777",
});

const ImageContainer = styled(Box)({
  maxWidth: "600px",
  borderRadius: "20px",
  overflow: "hidden",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
});

const CTAStyledButton = styled(Button)({
  backgroundColor: "#322653",
  color: "#fff",
  marginRight: "10px",
  "&:hover": {
    backgroundColor: "#3d2f71",
  },
});

const CTA = () => {
  const navigate = useNavigate();
  return (
    <CTASection>
      <TextContent>
        <CTATitleTypography variant="h4">
          Discover Horsemanship Online
        </CTATitleTypography>
        <CTASubtitleTypography variant="body1">
          Embark on an immersive journey into the world of horsemanship through
          our expert-led online courses, meticulously designed for both novices
          and seasoned enthusiasts. Uncover the secrets of effective horse care,
          training, and communication in a convenient and accessible format.
        </CTASubtitleTypography>
      </TextContent>
      <ImageContainer>
        <img
          src="https://c4.wallpaperflare.com/wallpaper/53/696/45/girl-with-helmet-want-to-riding-horse-wallpaper-preview.jpg"
          alt="Call to Action"
          style={{ width: "100%" }}
        />
      </ImageContainer>
    </CTASection>
  );
};

const CTA2 = () => {
  return (
    <CTASection>
      <ImageContainer>
        <img
          src="https://c0.wallpaperflare.com/preview/866/596/942/man-riding-horse-near-plant-during-daytime.jpg"
          alt="Call to Action"
          style={{ width: "100%" }}
        />
      </ImageContainer>
      <TextContent>
        <CTATitleTypography variant="h4">
          Master More Than Riding
        </CTATitleTypography>
        <CTASubtitleTypography variant="body1">
          Acquire vital qualities of patience, empathy, and effective
          communication while honing riding and horse care skills on our
          flexible online platform. Gain the expertise to excel in equestrian
          pursuits and connect with the art of horsemanship today.
        </CTASubtitleTypography>
      </TextContent>
    </CTASection>
  );
};

function About() {
  return (
    <div>
      <Hero />
      <CTA />
      <CTA2 />
    </div>
  );
}

export default About;
