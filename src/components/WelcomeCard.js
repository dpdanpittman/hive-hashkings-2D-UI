import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    maxWidth: 1200,
  },
  media: {
    height: 100,
  },
});

function ResponsiveImage( { src, width, height } ) {
  return (
    <div
      style={ { 
        width,
      } }
      className="responsive-image">
      <div style={ {
          paddingBottom: ( height / width * 100 ) + '%'
        } } />
      <img
        alt="responsive"
        src={ src }
        className="responsive-image__image" />
    </div>
  );
}

export default function WelcomeCard() {
  const classes = useStyles();

  return (
    <div>
      <center>
      <ResponsiveImage
      src="https://i.imgur.com/h5xCq4W.png"
       width={ 1000 }
       height={ 1000 } />
    </center>
    </div>
  );
}