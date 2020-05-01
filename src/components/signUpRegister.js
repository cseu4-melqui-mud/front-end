import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import axios from "axios"
import {AboutButton} from "./button"

const colorMain = "#0829e6"

const theme = createMuiTheme({
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: colorMain,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        light: '#0066ff',
        main: '#0044ff',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#ffcc00',
      },
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
    },
  });

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Nice MUD Games
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1542549237432-a176cb9d5e5e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=651&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide(props) {
  const classes = useStyles();

  const [signUpToggle, setSignUpToggle] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    password1: "",
    password2: "",
  })

  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  };

  const handleSubmit = e => {
    e.preventDefault()
    if(signUpToggle) {
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/registration/`, {username: formValues.username, password1: formValues.password1, password2: formValues.password2}, axiosConfig)
        .then((res) => {
          localStorage.setItem('token', res.data.key)
          window.location.reload()
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/login/`, {username: formValues.username, password: formValues.password}, axiosConfig) 
        .then((res) => {
            localStorage.setItem('token', res.data.key)
            window.location.reload()
        })
        .catch((err) => {
            console.log(err);
        })
    } 
}

const handleChange = (e) => {  
    e.preventDefault()  
    setFormValues({...formValues, [e.target.name]: e.target.value });
    console.log(formValues)
  }


  const setToggle = () => {
      setSignUpToggle(!signUpToggle)
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          {signUpToggle ?
          <Typography color="primary" component="h1" variant="h5">
            Sign Up
          </Typography> : <Typography color="primary" component="h1" variant="h5">
              Sign In
          </Typography>
          }
        <ThemeProvider theme={theme}>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="username"
              value={formValues.username}
              onChange={handleChange}
              label="Username"
              type="name"
              id="username"
            />
            {signUpToggle ? (
              <div>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password1"
                label="Password"
                type="password"
                value={formValues.password1}
                onChange={handleChange}
                id="password1"
                autoComplete="current-password"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                value={formValues.password2}
                onChange={handleChange}
                id="password2"
                autoComplete="current-password"
                />
              </div>
            ) : <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={formValues.password}
                onChange={handleChange}
                id="password"
                autoComplete="current-password"
              />}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {signUpToggle ? 
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            :
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            }

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <a onClick={setToggle} className="sign-up-text">
                  {signUpToggle ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                </a>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </ThemeProvider>
        <AboutButton />
        </div>
      </Grid>
    </Grid>
    
  );
}
