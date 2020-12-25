import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { GerminateIconBlack } from './Icons';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    minWidth: 250,
    background: "#DFB17B",
    fontFamily: '"Jua", sans-serif',
  },
  media: {
    height: 140,
  },
  font: {
    fontFamily: '"Jua", sans-serif',
    color: "#FFCD33",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "transparent",
    fontFamily: '"Jua", sans-serif'
  }
}));

// The use of React.forwardRef will no longer be required for react-router-dom v6.
// See https://github.com/ReactTraining/react-router/issues/6056
const Link1 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

export default function TutorialCard() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
          <Typography gutterBottom variant="h2" component="h2" className={classes.font}>
            <u>New to Hashkings?</u>
          </Typography>
          <Typography gutterBottom variant="h5" component="h2" className={classes.font}>
          <Link component={Link1} to="/tutorial">
        Visit the tutorial!
        </Link>
        </Typography>
      </Paper>
  );
}