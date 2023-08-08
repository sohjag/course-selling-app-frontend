import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  TextField,
  Typography,
  CardContent,
} from "@mui/material";
import axios from "axios";
import YouTube from "react-youtube";
import Modal from "@mui/material/Modal";
import { BACKEND_URL, PORT } from "../constants/api";

function Course() {
  let { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
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
    fetch(`${BACKEND_URL}:${PORT}/role/me`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then(callback1);
  }, []);

  function callback2(data) {
    setCourse(data);
    console.log(data);
  }

  function callback1(res) {
    res.json().then(callback2);
  }

  useEffect(() => {
    fetch(`${BACKEND_URL}:${PORT}/admin/courses/${courseId}`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then(callback1);
  }, [courseId]);

  if (course) {
    if (role === "admin") {
      return (
        <div>
          <div>
            <CourseCard course={course} role={role} />
            <EditCourseCard course={course} />
            <Lessons course={course} />
            <AddLessonCard course={course} />
          </div>
        </div>
      );
    } else {
      return (
        <div style={{ padding: 50, marginBottom: 100 }}>
          {/* <CourseCard course={course} role={role} /> */}
          <CourseLessons course={course} />
        </div>
      );
    }
  } else {
    return <div style={{ minHeight: "1000px" }}>Loading...</div>;
  }
}

function EditCourseCard(props) {
  //   console.log("rendering edit course card...");
  //   console.log(props.course.course.title);
  let { courseId } = useParams();

  const [title, setTitle] = useState(props.course.course.title);
  const [description, setDescription] = useState(
    props.course.course.description
  );
  const [price, setPrice] = useState(props.course.course.price);
  const [imageLink, setImageLink] = useState(props.course.course.imageLink);

  useEffect(() => {
    setTitle(props.course.course.title);
    setDescription(props.course.course.description);
    setPrice(props.course.course.price);
    setImageLink(props.course.course.imageLink);
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: 150 }}>
      <Card variant="outlined" style={{ width: 500 }}>
        <div style={{ padding: 10 }}>
          <Typography variant="h5">Update course</Typography>
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
                method: "put",
                url: `${BACKEND_URL}:${PORT}/admin/courses/${courseId}`,
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
            Update Course
          </Button>
        </div>
      </Card>
    </div>
  );
}

function CourseCard(props) {
  const { course, role } = props;
  const [isCoursePurchased, setIsCoursePurchased] = useState(false);

  useEffect(() => {
    // Fetch the purchase status of the course on component mount
    fetch(
      `${BACKEND_URL}:${PORT}/users/courses/${course.course._id}/check-purchase`,
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setIsCoursePurchased(data.purchased);
      })
      .catch((error) => {
        console.error("Error checking course purchase status:", error);
      });
  }, []);

  const handlePurchase = () => {
    fetch(`${BACKEND_URL}:${PORT}/users/courses/${props.course.course._id}`, {
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
    <Card variant="outlined" style={{ width: 300, margin: 10, minHeight: 70 }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6" textAlign={"center"}>
          {props.course.course.title}
        </Typography>
      </div>
      <br />
      <Typography variant="subtitle1" textAlign={"center"}>
        {props.course.course.description}
      </Typography>
      <br />
      <Typography variant="h6" textAlign={"right"} style={{ padding: 5 }}>
        Rs. {props.course.course.price}
      </Typography>
      <br />
      <img
        src={props.course.course.imageLink}
        style={{ width: 300 }}
        alt="Course"
      />
      {role === "user" ? (
        <div style={{ padding: 5 }}>
          <Button
            variant={"contained"}
            onClick={handlePurchase}
            disabled={isCoursePurchased} // Disable the button if the course is already purchased
          >
            {isCoursePurchased ? "Course Purchased" : "Purchase Course"}
          </Button>
        </div>
      ) : (
        <></>
      )}
    </Card>
  );
}

function getYouTubeVideoId(url) {
  const match = url.match(/(?:\/|%3D|v=|vi=)([0-9A-Za-z-_]{11})(?:[%#?&]|$)/);
  return match ? match[1] : null;
}

function Lessons(props) {
  const navigate = useNavigate();

  let initlessonsArr = props.course.course.courseLessons;
  const [lessonsArr, setLessonsArr] = useState(initlessonsArr);
  const [lessonTitle, setLessonTitle] = useState(null);
  const [lessonDescription, setLessonDescription] = useState(null);
  const [lessonLink, setLessonLink] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const modalStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "white",
    padding: 20,
    width: 400,
    height: 600,
    margin: "auto",
    flex: 1, // Add this to take up available space
  };

  const handleEdit = (lesson) => {
    console.log("handling edit...");
    console.log(lesson);
    setSelectedLesson(lesson);

    console.log("selected lesson is...");
    console.log(selectedLesson);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLesson(null);
  };

  useEffect(() => {
    console.log("from useeffect...selected lesson is...");
    console.log(selectedLesson);
    if (selectedLesson) {
      setIsModalOpen(true);
    }
  }, [selectedLesson]);

  function getLessonCallback2(data) {
    console.log(data);
    console.log(data.course.courseLessons);
    setLessonsArr(data.course.courseLessons);
  }
  function getLessonCallback1(res) {
    res.json().then(getLessonCallback2);
  }
  const getLessons = () => {
    fetch(`${BACKEND_URL}:${PORT}/admin/courses/${props.course.course._id}`, {
      method: "get",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then(getLessonCallback1);
  };
  const handleUpdateLesson = () => {
    window.location.reload();
  };

  return (
    <div>
      {lessonsArr.map((lesson) => (
        <Card
          key={lesson._id}
          variant="outlined"
          style={{ width: 500, margin: 10, minHeight: 100, padding: 10 }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h6" textAlign={"center"}>
              {lesson.title}
            </Typography>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="subtitle1" textAlign={"center"}>
              {lesson.description}
            </Typography>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <YouTube videoId={getYouTubeVideoId(lesson.lessonLink)} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" onClick={() => handleEdit(lesson)}>
              Edit
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                console.log("deleting a lesson...");
                console.log(lesson);
                function callback2(data) {
                  //alert("lesson deleted successfully");
                  getLessons();
                  navigate(`/course/${props.course.course._id}`);
                }
                function callback1(res) {
                  res.json().then(callback2);
                }
                fetch(`${BACKEND_URL}:${PORT}/admin/lessons/${lesson._id}`, {
                  method: "DELETE",
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }).then(callback1);
              }}
            >
              Delete
            </Button>
          </div>
        </Card>
      ))}
      {selectedLesson ? (
        <Modal open={isModalOpen} onClose={handleCloseModal}>
          {
            <div style={modalStyle}>
              <Card style={{ overflow: "auto" }}>
                <CardContent>
                  <Typography variant="h6">{selectedLesson.title}</Typography>
                  <Typography variant="subtitle1">
                    {selectedLesson.description}
                  </Typography>
                  <YouTube
                    videoId={getYouTubeVideoId(selectedLesson.lessonLink)}
                  />
                  {/* ... Add textfields and save button for editing ... */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: 10,
                    }}
                  >
                    <TextField
                      fullWidth="true"
                      variant="outlined"
                      label="LessonTitle"
                      onChange={(e) => {
                        setLessonTitle(e.target.value);
                      }}
                    ></TextField>
                  </div>
                  <br />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: 10,
                    }}
                  >
                    <TextField
                      fullWidth="true"
                      variant="outlined"
                      label="LessonDescription"
                      onChange={(e) => {
                        setLessonDescription(e.target.value);
                      }}
                    ></TextField>
                  </div>
                  <br />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: 10,
                    }}
                  >
                    <TextField
                      variant="outlined"
                      fullWidth="true"
                      label="LessonLink"
                      onChange={(e) => {
                        setLessonLink(e.target.value);
                      }}
                    ></TextField>
                  </div>

                  <Button variant={"contained"} onClick={handleUpdateLesson}>
                    Update
                  </Button>
                </CardContent>
              </Card>
            </div>
          }
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
}

function AddLessonCard(props) {
  const [lessonsArr, setLessonsArr] = useState();
  const [title, setLessonTitle] = useState(null);
  const [description, setLessonDescription] = useState(null);
  const [lessonLink, setLessonLink] = useState(null);
  let courseId = props.course.course._id;
  const navigate = useNavigate();

  const handleAddLesson = () => {
    axios({
      method: "post",
      url: `${BACKEND_URL}:${PORT}/admin/courses/${props.course.course._id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      data: { title, description, lessonLink, courseId },
    })
      .then((res) => {
        if (res.status === 200) {
          //alert("Lesson added successfully");
          //navigate(`/course/${props.course.course._id}`);
          window.location.reload();
        } else {
          alert("Error in adding lesson");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <Card>
        <CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: 10,
            }}
          >
            <TextField
              fullWidth="true"
              variant="outlined"
              label="LessonTitle"
              onChange={(e) => {
                setLessonTitle(e.target.value);
              }}
            ></TextField>
          </div>
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: 10,
            }}
          >
            <TextField
              fullWidth="true"
              variant="outlined"
              label="LessonDescription"
              onChange={(e) => {
                setLessonDescription(e.target.value);
              }}
            ></TextField>
          </div>
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: 10,
            }}
          >
            <TextField
              variant="outlined"
              fullWidth="true"
              label="LessonLink"
              onChange={(e) => {
                setLessonLink(e.target.value);
              }}
            ></TextField>
          </div>

          <Button variant={"contained"} onClick={handleAddLesson}>
            Add Lesson
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function CourseLessons(props) {
  //console.log("course in courseLessons is...");
  const { course } = props.course;
  //console.log(course);
  const [selectedLesson, setSelectedLesson] = useState();
  const [courseLessons, setCourseLessons] = useState();
  const [completedLessons, setCompletedLessons] = useState();
  //console.log(course.courseLessons);

  useEffect(() => {
    setCourseLessons(course.courseLessons);
  }, [course]);

  useEffect(() => {
    if (courseLessons && courseLessons.length > 0) {
      setSelectedLesson(courseLessons[0]);
    }
  }, [courseLessons]);

  useEffect(() => {
    async function fetchCompletedLessons() {
      try {
        const response = await axios.get(
          `${BACKEND_URL}:${PORT}/users/courses/${course._id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        const completedLessonsData = response.data;
        const completedLessonIds = completedLessonsData.map(
          (lesson) => lesson._id
        );
        setCompletedLessons(new Set(completedLessonIds));
      } catch (error) {
        console.error("Error fetching completed lessons:", error);
      }
    }

    fetchCompletedLessons();
  }, [course]);

  useEffect(() => {
    setCompletedLessons((prevCompletedLessons) => {
      if (prevCompletedLessons) {
        return new Set([...prevCompletedLessons]);
      }
      return new Set();
    });
  }, [completedLessons]);
  // console.log("selected lesson is...");
  // console.log(selectedLesson);

  return courseLessons && selectedLesson ? (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{}}>
        <Typography variant="h5" style={{ marginBottom: "10px" }}>
          {selectedLesson.title}
        </Typography>
        <div style={{ display: "flex", flexWrap: "wrap", padding: "10" }}>
          <div style={{}}>
            <YouTube videoId={getYouTubeVideoId(selectedLesson.lessonLink)} />
          </div>
          <div style={{ maxWidth: "50%", padding: "10" }}>
            <Typography variant="h7" style={{ marginBottom: "10px" }}>
              {selectedLesson.description}
            </Typography>
          </div>
        </div>

        {selectedLesson &&
        completedLessons &&
        completedLessons.has(selectedLesson._id) ? (
          <Button
            variant={"contained"}
            disabled="true"
            style={{ marginTop: "10px" }}
          >
            Completed
          </Button>
        ) : (
          <Button
            variant={"contained"}
            style={{ marginTop: "10px" }}
            onClick={async () => {
              try {
                await axios.put(
                  `${BACKEND_URL}:${PORT}/users/courses/${course._id}/${selectedLesson._id}`,
                  {},
                  {
                    headers: {
                      Authorization: localStorage.getItem("token"),
                    },
                  }
                );
                setCompletedLessons(
                  new Set([...completedLessons, selectedLesson._id])
                );
              } catch (error) {
                console.error("Error marking lessons as complete", error);
              }
            }}
          >
            Mark as completed
          </Button>
        )}
      </div>
      <div>
        <Typography variant="h5" style={{ marginBottom: "10px" }}>
          Lessons
        </Typography>
        {courseLessons &&
          courseLessons.map((lesson) => {
            //AED8CC
            return (
              <Card
                key={lesson._id}
                style={{
                  cursor: "pointer",
                  marginBottom: "10px",
                  border:
                    selectedLesson._id === lesson._id
                      ? "2px solid #322653"
                      : "none",
                  backgroundColor:
                    completedLessons && completedLessons.has(lesson._id)
                      ? "#AED8CC"
                      : "white",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                onClick={() => {
                  setSelectedLesson(lesson);
                }}
              >
                <div> {lesson.title}</div>
                {completedLessons && completedLessons.has(lesson._id) && (
                  <div>✓</div>
                )}
              </Card>
            );
          })}
      </div>
    </div>
  ) : (
    <div>Lessons not available</div>
  );
}

export default Course;
