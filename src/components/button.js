import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export function AboutButton() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button href="/about" variant="contained" color="primary">
        About
      </Button>
    </div>
  );
}

export function LogoutButton(props) {
  const classes = useStyles();

  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    window.location.reload()
  }

  return (
    <div className={classes.root}>
      <Button onClick={logout} href="/" variant="contained" className="logout-button" color="primary">
        Logout
      </Button>
    </div>
  );
}