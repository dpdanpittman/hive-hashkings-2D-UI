import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
  card: {
    maxWidth: 1200,
  },
  media: {
    height: 360,
  },
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Paper>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/ju9c5_wqUcQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </Paper>
  );
}