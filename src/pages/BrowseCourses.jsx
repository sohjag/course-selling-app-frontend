import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { Typography, Button, Box, backdropClasses } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constants/api";

function BrowseCourses() {
  const [courses, setCourses] = useState(null);
  const [role, setRole] = useState(null);
  const [useremail, setUseremail] = useState(null);

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

  useEffect(() => {
    function callback2(data) {
      setCourses(data.courses);
      console.log(courses);
    }
    function callback1(res) {
      res.json().then(callback2);
    }
    fetch(`${BACKEND_URL}:3000/browsecourses`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then(callback1);
  }, []);

  //   return <div>{JSON.stringify(courses)}</div>;
  if (courses) {
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {courses.map((course) => {
          return (
            <RenderCourse
              key={course._id}
              course={course}
              role={role}
              useremail={useremail}
            />
          );
        })}
      </div>
    );
  }
  return <div style={{ minHeight: "1000px" }}>Loading...</div>;
}

function RenderCourse(props) {
  const { course, role, useremail } = props;
  const navigate = useNavigate();
  const [isCoursePurchased, setIsCoursePurchased] = useState(false);

  useEffect(() => {
    // Fetch the purchase status of the course on component mount
    fetch(`${BACKEND_URL}:3000/users/courses/${course._id}/check-purchase`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIsCoursePurchased(data.purchased);
      })
      .catch((error) => {
        console.error("Error checking course purchase status:", error);
      });
  }, [course._id]);

  const handlePurchaseCourse = () => {
    fetch(`${BACKEND_URL}:3000/users/courses/${props.course._id}`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.ok) {
          setIsCoursePurchased(true); // Course purchased successfully, update the state
        } else {
          console.error("Failed to purchase course");
        }
      })
      .catch((error) => {
        console.error("Error purchasing course:", error);
      });
  };

  return (
    //<div style={{ padding: 20, display: "flex", justifyContent: "center" }}>
    <Card variant="outlined" style={{ width: 400, margin: 10, minHeight: 70 }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={50}
      >
        <Typography
          variant="h6"
          textAlign="center"
          style={{ fontFamily: "Poppins", fontWeight: "bold" }}
        >
          {props.course.title}
        </Typography>
      </Box>
      <Box p={2} minHeight="400px">
        <Typography variant="subtitle1" textAlign="center" marginBottom={3}>
          {props.course.description}
        </Typography>
        <Typography
          variant="h7"
          textAlign="right"
          style={{ fontFamily: "Georgia", padding: 5, fontWeight: "bold" }}
        >
          ${props.course.price}
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="200px"
          bgcolor="black"
          marginTop={3}
        >
          <img
            src={props.course.imageLink}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              padding: 5,
            }}
            alt="Course"
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box>
          {isCoursePurchased || role === "admin" ? (
            <Button
              variant="contained"
              onClick={() => {
                navigate(`/course/${props.course._id}`);
              }}
            >
              View Course
            </Button>
          ) : null}
        </Box>
        <Box>
          {role === "admin" ? (
            <Button
              variant="contained"
              onClick={() => {
                function callback2(data) {
                  //alert("lesson deleted successfully");

                  window.location.reload();
                }
                function callback1(res) {
                  res.json().then(callback2);
                }
                fetch(`${BACKEND_URL}:3000/admin/courses/${props.course._id}`, {
                  method: "DELETE",
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }).then(callback1);
              }}
            >
              Delete
            </Button>
          ) : null}
        </Box>
        {role === "user" ? (
          <Box>
            {isCoursePurchased ? (
              <Typography variant="subtitle1" color="primary">
                Course Purchased
              </Typography>
            ) : (
              <Button variant="contained" onClick={handlePurchaseCourse}>
                Purchase Course
              </Button>
            )}
          </Box>
        ) : null}
      </Box>
    </Card>
    //</div>
  );
}

export default BrowseCourses;
