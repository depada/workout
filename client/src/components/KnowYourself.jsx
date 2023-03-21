import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useContext, useEffect, useState } from "react";
import thankYou from "../assets/images/thankYou.jpg";
import { UserDetailsContext } from "../context/UserDetails";

const KnowYourself = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
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
    displayName,
    muscleRecovery,
  } = userDetails;
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsFormSubmitted(true);
    setUserDetails({ ...userDetails });
    console.log(userDetails);
    postData();
  };

  const postData = async () => {
    const response = await fetch(
      `https://workout-cf192-default-rtdb.asia-southeast1.firebasedatabase.app/userData.json`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userDetails),
      }
    );
  };

  const handleChange = (event) => {
    console.log(event.target.name);
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
  };

  const [userName, setUserName] = useState("");
  useEffect(() => {
    setUserName(`${displayName}_${Math.ceil(Math.random()) * 100}`);
  }, [displayName]);

  const formElements = [
    [
      {
        eleName: "displayName",
        label: "Name",
        value: displayName,
        placeholder: "Enter your name",
        id: "name",
      },
      {
        eleName: "userName",
        label: "User Name",
        value: userName,
        placeholder: "Can not edit your user name",
        id: "userName",
      },
      0,
    ],
    [
      {
        eleName: "weight",
        label: "Weight",
        value: weight,
        placeholder: "Weight in kg",
        id: "weight",
      },
      {
        eleName: "height",
        label: "Height",
        value: height,
        placeholder: "Height in cm",
        id: "height",
      },

      1,
    ],
    [
      {
        eleName: "leanMuscleMass",
        label: "Lean Muscle Mass in kg",
        placeholder: "Enter lean muscle mass",
        value: leanMuscleMass,
        id: "leanMuscleMass",
      },
      {
        eleName: "fatPercent",
        label: "Fat Percent",
        placeholder: "Enter fat percent",
        value: fatPercent,
        id: "fatPercent",
      },
      2,
    ],
    [
      {
        eleName: "age",
        label: "Age",
        placeholder: "Enter age",
        value: age,
        id: "age",
      },
      {
        eleName: "sex",
        label: "Sex",
        placeholder: "Enter sex",
        value: sex,
        id: "sex",
      },
      3,
    ],
    [
      {
        eleName: "muscleFibreType",
        label: "Muscle Fibre Type",
        placeholder: "Enter muscle fibre type",
        value: muscleFibreType,
        id: "muscleFibreType",
      },
      {
        eleName: "trainingIntensity",
        label: "Training Intensity",
        placeholder: "Enter training intensity",
        value: trainingIntensity,
        id: "trainingIntensity",
      },
      4,
    ],
    [
      {
        eleName: "trainingStatus",
        label: "Training Status",
        placeholder: "Enter training status",
        value: trainingStatus,
        id: "trainingStatus",
      },
      {
        eleName: "muscleRecovery",
        label: "Muscle Recovery",
        placeholder: "Muscle recovery in hrs",
        value: muscleRecovery,
        id: "muscleRecovery",
      },
      5,
    ],
  ];

  return isFormSubmitted ? (
    <img
      style={{
        width: "80vw",
        backgroundColor: "#191f2a",
      }}
      src={thankYou}
      alt="Thank You For Submission"
    />
  ) : (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        justifyContent: "center",
        width: "50vw",
        height: "100%",
        marginTop: "5%",
        marginLeft: "22%",
      }}
      onSubmit={handleSubmit}
    >
      <Grid>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Tell about yourself
            </Typography>
            <Typography
              variant="body3"
              color="textSecondary"
              component="p"
              gutterBottom
            >
              Fill up the form for personalized AI suggestions
            </Typography>
            <Grid container spacing={1}>
              {formElements.map((setOfTwo) => {
                return (
                  <Fragment key={setOfTwo[0].eleName}>
                    <Grid key={setOfTwo[0].label} xs={12} sm={6} item>
                      <TextField
                        name={setOfTwo[0].eleName}
                        label={setOfTwo[0].label}
                        placeholder={setOfTwo[0].placeholder}
                        value={setOfTwo[0].value}
                        onChange={handleChange}
                        key={setOfTwo[0].id}
                      />
                    </Grid>
                    <Grid xs={12} sm={6} item>
                      <TextField
                        name={setOfTwo[1].eleName}
                        disabled={setOfTwo[1].id === "userName" ? true : false}
                        label={setOfTwo[1].label}
                        placeholder={setOfTwo[1].placeholder}
                        value={setOfTwo[1].value}
                        onChange={handleChange}
                        key={setOfTwo[1].id}
                      />
                    </Grid>
                  </Fragment>
                );
              })}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </form>
  );
};

export default KnowYourself;
