import {
  Box,
  Fab,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import Loader from "./Loader";
import HelpIcon from "@mui/icons-material/Help";
import { UserDetailsContext } from "../context/UserDetails";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "80vh",
    marginLeft: "5vw",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "90vw",
  },
});

const Chat = () => {
  const DB_URL = `https://workout-cf192-default-rtdb.asia-southeast1.firebasedatabase.app/userData.json`;

  const classes = useStyles();
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  console.log("user ==>", userDetails);
  const {
    weight,
    height,
    leanMuscleMass,
    fatPercent,
    age,
    sex,
    muscleFibreType,
    trainingIntensity,
    trainingStatus,
    muscleRecovery,
    displayName,
  } = userDetails;

  const [userDetailDefaultText, setUserDetailDefaultText] = useState(
    `my height is${height} cm, wight is ${weight} kgs , lean muscle mass is ${leanMuscleMass} kgs, fat percentage is ${fatPercent}% , age is ${age} years, i am ${sex} , i have ${muscleFibreType} muscle fibre type, on a scale of 1 to 10 my training intensity is ${trainingIntensity}, my training status is ${trainingStatus}, my muscle recovery is around ${muscleRecovery} hrs`
  );
  const [usersData, setUsersData] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [finalPrompt, setFinalPrompt] = useState(userDetailDefaultText);

  useEffect(() => {
    setUserDetailDefaultText(
      `my height is${height} cm, wight is ${weight} kgs, lean muscle mass is ${leanMuscleMass} kgs, fat percentage is ${fatPercent}%, age is ${age} years, i am ${sex}, i have ${muscleFibreType} muscle fibre type, on a scale of 1 to 10 my training intensity is ${trainingIntensity}, my training status is ${trainingStatus}, my muscle recovery is around ${muscleRecovery} hrs`
    );
    console.log("user details ==>", userDetails);
  }, [userDetails]);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    validatePrompt();
    setPrompt(userDetailDefaultText);
    setFinalPrompt((prev) => prev + prompt);
    console.log("final prompt ==>", finalPrompt);
    setPrompt("");
  };

  const validatePrompt = () => {
    // setLoading(true);
    prompt === ""
      ? setResponse("Please enter a question")
      : axios
          .post("http://localhost:5000/chat", { prompt })
          .then((res) => {
            setLoading(false);
            setResponse(res.data.bot);
            console.log("response==>", response);
          })
          .catch((error) => {
            console.log(error);
          });
  };

  const handlePrompt = (e) => {
    setPrompt(e.target.value);
  };
  const fetchDataHandler = async () => {
    try {
      const response = await fetch(DB_URL);
      if (!response.ok) throw new Error("Something went wrong!");
      const result = await response.json();
      console.log(result);
      const tempData = [];
      for (const key in result) {
        tempData.push({
          id: key,
          weight: result[key].weight,
          height: result[key].height,
          leanMuscleMass: result[key].leanMuscleMass,
          fatPercent: result[key].fatPercent,
          age: result[key].age,
          sex: result[key].sex,
          muscleFibreType: result[key].muscleFibreType,
          trainingIntensity: result[key].trainingIntensity,
          trainingStatus: result[key].trainingStatus,
          muscleRecovery: result[key].muscleRecovery,
          displayName: result[key].displayName,
        });
      }

      setUsersData(tempData);
    } catch (error) {
      console.log(error);
    } finally {
      // setIsLoading(false);
      console.log("users data ==>", usersData);
    }
  };
  useEffect(() => {
    fetchDataHandler().then((e) => e);
  }, []);

  return (
    <Grid
      sx={{ overflowY: `${loading ? "hidden" : "auto"}` }}
      container
      component={Box}
      className={classes.chatSection}
    >
      <HelpIcon
        sx={{
          width: "100%",
          height: "20%",
          position: "relative",
          right: `${loading ? "10%" : "8.5%"}`,
          top: `${response.includes("\n") ? "-0.5%" : "5%"}`,
        }}
      />
      {!response.includes("\n") && (
        <Typography
          sx={{ ml: "28%", mt: loading ? "1%" : "0" }}
          variant="h3"
          color="initial"
        >
          AI Personal Trainer
        </Typography>
      )}
      <Grid item xs={9}>
        <List className={classes.messageArea}>
          <ListItem
            sx={{
              bottom: `${loading ? "40%" : "118px"}`,
              right: `${loading ? "4.8%" : "0%"}`,
            }}
            key="1"
          >
            {loading ? (
              <Loader />
            ) : (
              <Grid sx={{ overflowY: "auto" }} container>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      boxShadow: `rgba(60, 64, 67, 1) 0px 1px 2px 0px,
    rgba(60, 64, 67, 1) 0px 1px 3px 1px`,
                      backgroundColor: "#191f2a",
                      color: "#fff",
                      padding: `1rem 2rem 0.5rem 2rem`,
                      fontSize: "20px",
                      display: "flex",
                      alignItems: "center",
                      width: "89%",
                      height: `${response.includes("\n") ? "100%" : "50%"}`,
                      borderRadius: "20px",
                      ":hover": {
                        cursor: "pointer",
                      },
                      ml: "40px",
                      mt: `${response.includes("\n") ? "7%" : "5%"}`,

                      whiteSpace: "pre-wrap",
                    }}
                    color="black"
                  >
                    {response
                      ? response
                      : "Hey is everything going ok ? Do you need some help?"}
                  </Typography>
                </Grid>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alighItems: "center",
                    flexDirection: "row",
                    width: "100%",
                    height: "100%",
                    mt: `${response.includes("\n") ? "7%" : "0%"}`,
                    p: "40px",
                  }}
                >
                  <TextField
                    label="Ask me a question..."
                    value={prompt}
                    onChange={handlePrompt}
                    fullWidth
                  />
                  <Fab
                    sx={{
                      ml: "10px",
                      backgroundColor: "#fff",
                      border: "2px solid #191f2a",
                      alignItems: "center",
                      fontSize: "large",
                    }}
                    onClick={handleSubmit}
                    color="primary"
                  >
                    <SendIcon
                      sx={{
                        mb: "0px",
                        color: "#191f2a",
                      }}
                      fontSize="large"
                    />
                  </Fab>
                </Box>
              </Grid>
            )}
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};

export default Chat;
