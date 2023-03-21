import {
  Box,
  Button,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import Loader from "./Loader";
import HelpIcon from "@mui/icons-material/Help";

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
    height: "70vh",
    width: "90vw",
  },
});

const Chat = () => {
  const classes = useStyles();
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const HTTP = "http://localhost:5000/chat/completions";

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    validatePrompt();
    setPrompt("");
  };

  const validatePrompt = () => {
    // setLoading(false);
    prompt === ""
      ? setResponse("Please enter a question")
      : axios
          .post(`${HTTP}`, { prompt })
          .then((res) => {
            setLoading(false);
            setResponse(res.data.bot);
            console.log("response==>", res);
          })
          .catch((error) => {
            console.log(error);
          });
  };

  const handlePrompt = (e) => {
    setPrompt(e.target.value);
  };

  return (
    <Grid container component={Box} className={classes.chatSection}>
      <HelpIcon
        sx={{
          width: "100%",
          height: "30%",
          position: "relative",
          right: "10%",
          top: "50px",
        }}
      />
      <Grid item xs={9}>
        <List className={classes.messageArea}>
          <ListItem sx={{ bottom: "115px" }} key="1">
            {loading ? (
              <Loader />
            ) : (
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      boxShadow: `rgba(60, 64, 67, 1) 0px 1px 2px 0px,
    rgba(60, 64, 67, 1) 0px 1px 3px 1px`,
                      backgroundColor: "#191f2a",
                      color: "#fff",
                      padding: `1rem 2rem 0.5rem 2rem`,
                      fontSize: "30px",
                      display: "flex",
                      alignItems: "center",
                      width: "58%",
                      height: "100%",
                      borderRadius: "20px",
                      ":hover": {
                        cursor: "pointer",
                      },
                      ml: "40px",
                      mt: "20px",
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
