import React, { useState, useEffect, useContext } from "react";
import {StateContext} from "../App";
import {sign} from "hivesigner";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import WelcomeCard from './WelcomeCard';
import {Button} from "primereact/button";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Parallax } from 'react-parallax';
import { Redirect } from 'react-router';
import TrendingHomePage from './TrendingHomePage';
import TutorialCard from './TutorialCard';
import useHiveKeychain from "../hooks/useHiveKeychain"; 

const useStyles = makeStyles(theme => ({
  navWidth: {
    width: "auto",
    backgroundColor: "transparent",
    borderColor: "#000000"
  },
  root: {
    flexGrow: 1,
    height: "auto",
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#294A0B",
  },
  paperBlue: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#000000",
  },
  paperBlack: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#154A4A"
  },
  paperBlacky: {
    padding: theme.spacing(1),
    backgroundColor: "#000000",
  },
  card: {
    maxWidth: 'auto',
    backgroundColor: "transparent",
  },
  media: {
    height: 300,
    width: 250,
  },
  mediaTwo: {
    height: 100,
    width: 270,
  },
}));

export const HomePage = () => {
const {username} = useContext(StateContext);
const classes = useStyles();
const isDesktop = window.innerWidth < 1000;
const [isSubmitting, setIsSubmitting] = useState(false);
const image1 = "https://i.imgur.com/j2CGYh2.jpg";

const [seedAsia, setSeedAsia] = useState();
const [seedAfrica, setSeedAfrica] = useState();
const [seedAfghanistan, setSeedAfghanistan] = useState();
const [seedJamaica, setSeedJamaica] = useState();
const [seedMexico, setSeedMexico] = useState();
const [seedSouthAmerica, setSeedSouthAmerica] = useState();

const [seedAsiaPrices, setAsiaPrices] = useState([0]);
const [seedAfricaPrices, setAfricaPrices] = useState([0]);
const [seedAfghanistanPrices, setAfghanistanPrices] = useState([0]);
const [seedJamaicaPrices, setJamaicaPrices] = useState([0]);
const [seedMexicoPrices, setMexicoPrices] = useState([0]);
const [seedSouthAmericaPrices, setSouthAmericaPrices] = useState([0]);

const [asiaBundles, setAsiaQuantity] = useState([0]);
const [africaBundles, setAfricaQuantity] = useState([0]);
const [afghanistanBundles, setAfghanistanQuantity] = useState([0]);
const [jamaicaBundles, setJamaicaQuantity] = useState([0]);
const [mexicoBundles, setMexicoQuantity] = useState([0]);
const [southAmericaBundles, setSouthAmericaQuantity] = useState([0]);

const hasHiveKeychain = useHiveKeychain();

const loadPriceData = async () => {
    
  const urlAPI = 'https://hashkings.xyz/';
  
  const response = await fetch(urlAPI);
  const pricedata = await response.json();

  var seedAsiaPrice = pricedata.stats.prices.bundles.asiaBundle;
  var seedAfricaPrice = pricedata.stats.prices.bundles.africaBundle;
  var seedAfghanistanPrice = pricedata.stats.prices.bundles.afghanistanBundle;
  var seedJamaicaPrice = pricedata.stats.prices.bundles.jamaicaBundle;
  var seedMexicoPrice = pricedata.stats.prices.bundles.mexicoBundle;
  var seedSouthAmericaPrice = pricedata.stats.prices.bundles.southAmericaBundle;

  var asiaBundles = pricedata.stats.supply.land.asia;
  var africaBundles = pricedata.stats.supply.land.africa;
  var afghanistanBundles = pricedata.stats.supply.land.afghanistan;
  var jamaicaBundles = pricedata.stats.supply.land.jamaica;
  var mexicoBundles = pricedata.stats.supply.land.mexico;
  var southAmericaBundles = pricedata.stats.supply.land.southAmerica;

  setAsiaPrices(seedAsiaPrice);
  setAfricaPrices(seedAfricaPrice);
  setAfghanistanPrices(seedAfghanistanPrice);
  setJamaicaPrices(seedJamaicaPrice);
  setMexicoPrices(seedMexicoPrice);
  setSouthAmericaPrices(seedSouthAmericaPrice);

  setAsiaQuantity(asiaBundles);
  setAfricaQuantity(africaBundles);
  setAfghanistanQuantity(afghanistanBundles);
  setJamaicaQuantity(jamaicaBundles);
  setMexicoQuantity(mexicoBundles);
  setSouthAmericaQuantity(southAmericaBundles);
}

useEffect(() => {
  loadPriceData();
}, []);

const [gardens, setGardens] = useState([]);

const {steemConnectAPI} = useContext(StateContext);



const handleSubmitAsia = async e => {
  e.preventDefault();
  if (username) {
    setIsSubmitting(true);

    const memo = `asia_bundle`;
    const to = "hashkings";
    const amount = seedAsiaPrices.toFixed(3).toString();
    const currency = "HIVE";

    if (hasHiveKeychain()) {
      const hive_keychain = window.hive_keychain;
      try {
        await new Promise((resolve, reject) => {
          return hive_keychain.requestTransfer(
            username,
            to,
            amount,
            memo,
            currency,
            response => {
              if (response.success) {
                resolve(response);
              } else {
                reject();
              }
            },
            true
          );
        });
        setIsSubmitting(false);
        setSeedAsia();
      } catch {
        setIsSubmitting(false);
      }
    } else {
      window.location.href = sign(
        "transfer",
        {
          to,
          from: username,
          amount: `${amount} ${currency}`,
          memo
        },
        process.env.REACT_APP_URL
          ? `${process.env.REACT_APP_URL}/`
          : "https://localhost:3000/"
      );
    }
  }
};

const handleSubmitAfrica = async e => {
  e.preventDefault();
  if (username) {
    setIsSubmitting(true);

    const memo = `africa_bundle`;
    const to = "hashkings";
    const amount = seedAfricaPrices.toFixed(3).toString();
    const currency = "HIVE";

    if (hasHiveKeychain()) {
      const hive_keychain = window.hive_keychain;
      try {
        await new Promise((resolve, reject) => {
          return hive_keychain.requestTransfer(
            username,
            to,
            amount,
            memo,
            currency,
            response => {
              if (response.success) {
                resolve(response);
              } else {
                reject();
              }
            },
            true
          );
        });
        setIsSubmitting(false);
        setSeedAfrica();
      } catch {
        setIsSubmitting(false);
      }
    } else {
      window.location.href = sign(
        "transfer",
        {
          to,
          from: username,
          amount: `${amount} ${currency}`,
          memo
        },
        process.env.REACT_APP_URL
          ? `${process.env.REACT_APP_URL}/`
          : "https://localhost:3000/"
      );
    }
  }
};

const handleSubmitAfghanistan = async e => {
  e.preventDefault();
  if (username) {
    setIsSubmitting(true);

    const memo = `afghanistan_bundle`;
    const to = "hashkings";
    const amount = seedAfghanistanPrices.toFixed(3).toString();
    const currency = "HIVE";

    if (hasHiveKeychain()) {
      const hive_keychain = window.hive_keychain;
      try {
        await new Promise((resolve, reject) => {
          return hive_keychain.requestTransfer(
            username,
            to,
            amount,
            memo,
            currency,
            response => {
              if (response.success) {
                resolve(response);
              } else {
                reject();
              }
            },
            true
          );
        });
        setIsSubmitting(false);
        setSeedAfghanistan();
      } catch {
        setIsSubmitting(false);
      }
    } else {
      window.location.href = sign(
        "transfer",
        {
          to,
          from: username,
          amount: `${amount} ${currency}`,
          memo
        },
        process.env.REACT_APP_URL
          ? `${process.env.REACT_APP_URL}/`
          : "https://localhost:3000/"
      );
    }
  }
};

const handleSubmitJamaica = async e => {
  e.preventDefault();
  if (username) {
    setIsSubmitting(true);

    const memo = `jamaica_bundle`;
    const to = "hashkings";
    const amount = seedJamaicaPrices.toFixed(3).toString();
    const currency = "HIVE";

    if (hasHiveKeychain()) {
      const hive_keychain = window.hive_keychain;
      try {
        await new Promise((resolve, reject) => {
          return hive_keychain.requestTransfer(
            username,
            to,
            amount,
            memo,
            currency,
            response => {
              if (response.success) {
                resolve(response);
              } else {
                reject();
              }
            },
            true
          );
        });
        setIsSubmitting(false);
        setSeedJamaica();
      } catch {
        setIsSubmitting(false);
      }
    } else {
      window.location.href = sign(
        "transfer",
        {
          to,
          from: username,
          amount: `${amount} ${currency}`,
          memo
        },
        process.env.REACT_APP_URL
          ? `${process.env.REACT_APP_URL}/`
          : "https://localhost:3000/"
      );
    }
  }
};

const handleSubmitMexico = async e => {
  e.preventDefault();
  if (username) {
    setIsSubmitting(true);

    const memo = `mexico_bundle`;
    const to = "hashkings";
    const amount = seedMexicoPrices.toFixed(3).toString();
    const currency = "HIVE";

    if (hasHiveKeychain()) {
      const hive_keychain = window.hive_keychain;
      try {
        await new Promise((resolve, reject) => {
          return hive_keychain.requestTransfer(
            username,
            to,
            amount,
            memo,
            currency,
            response => {
              if (response.success) {
                resolve(response);
              } else {
                reject();
              }
            },
            true
          );
        });
        setIsSubmitting(false);
        setSeedMexico();
      } catch {
        setIsSubmitting(false);
      }
    } else {
      window.location.href = sign(
        "transfer",
        {
          to,
          from: username,
          amount: `${amount} ${currency}`,
          memo
        },
        process.env.REACT_APP_URL
          ? `${process.env.REACT_APP_URL}/`
          : "https://localhost:3000/"
      );
    }
  }
};

const handleSubmitWater = () => {
  if (username && gardens.length > 0) {
    setIsSubmitting(true);

    const custom_json_id = "qwoyn_water";
    const custom_JSON = JSON.stringify({claiming: "water"});

    steemConnectAPI.customJson(
      [],
      [username], 
      custom_json_id,
      custom_JSON
    );
  }
};

const handleSubmitAvatar = () => {
  if (username && gardens.length > 0) {
    setIsSubmitting(true);

    const custom_json_id = "qwoyn_water";
    const custom_JSON = JSON.stringify({claiming: "avatars"});

    steemConnectAPI.customJson(
      [],
      [username], 
      custom_json_id,
      custom_JSON
    );
  }
};

const handleSubmitBuds = () => {
  if (username && gardens.length > 0) {
    setIsSubmitting(true);

    const custom_json_id = "qwoyn_water";
    const custom_JSON = JSON.stringify({claiming: "buds"});

    steemConnectAPI.customJson(
      [],
      [username], 
      custom_json_id,
      custom_JSON
    );
  }
};

const handleSubmitSouthAmerica = async e => {
  e.preventDefault();
  if (username) {
    setIsSubmitting(true);

    const memo = `southamerica_bundle`;
    const to = "hashkings";
    const amount = seedSouthAmericaPrices.toFixed(3).toString();
    const currency = "HIVE";

    if (hasHiveKeychain()) {
      const hive_keychain = window.hive_keychain;
      try {
        await new Promise((resolve, reject) => {
          return hive_keychain.requestTransfer(
            username,
            to,
            amount,
            memo,
            currency,
            response => {
              if (response.success) {
                resolve(response);
              } else {
                reject();
              }
            },
            true
          );
        });
        setIsSubmitting(false);
        setSeedSouthAmerica();
      } catch {
        setIsSubmitting(false);
      }
    } else {
      window.location.href = sign(
        "transfer",
        {
          to,
          from: username,
          amount: `${amount} ${currency}`,
          memo
        },
        process.env.REACT_APP_URL
          ? `${process.env.REACT_APP_URL}/`
          : "https://localhost:3000/"
      );
    }
  }
};

let buttonLabel = "Coming Soon";
if (isSubmitting) buttonLabel = "Claiming";
if (!username) buttonLabel = "Please Sign in";

if (!isDesktop) {
  if (username) {
  return(
    <Parallax blur={1} bgImage={image1} strength={500}>
    <div className={classes.root}>

      <center>
        <img src="https://i.imgur.com/yFfJJUK.png"></img>
      </center>
    
      <Container fixed>
      <Grid container spacing={3}>
      <Grid item xs> 
      <Card className={classes.card} raised={true}>
      <CardMedia
              className={classes.media}
              image="https://i.imgur.com/QcC3mcD.png"
              title="Market"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              <font color="DFB17B" className={classes.font}>Claim your Avatars!</font>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}>
                Users who participated in the presale can claim our exclusive magical avatars here! <u>CAN ONLY BE CLAIMED ONCE!</u>
              </font>
              </Typography>
              <br/>
              <br/>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}><b>Price: </b></font> <font color="green" className={classes.font}>Free</font>
              </Typography>
              <br/>
              <Button
              disabled={true}
              label={buttonLabel}
              />
            </CardContent>
          </Card>
      </Grid>

      <Grid item xs> 
      <Card className={classes.card} raised={true}>
      <CardMedia
              className={classes.media}
              image="https://i.imgur.com/S6myoym.png"
              title="Market"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              <font color="DFB17B" className={classes.font}>Claim your Water!</font>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}>
                Claim the water that will be used on the first day of gameplay if you have participated in the presale. <u>CAN ONLY BE CLAIMED ONCE!</u>
              </font>
              </Typography>
              <br/>
              <br/>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}><b>Price: </b></font> <font color="green" className={classes.font}>FREE</font>
              </Typography>
              <br/>
              <Button
              disabled={true}
              label={buttonLabel}
              />
            </CardContent>
          </Card>
      </Grid>
      
      <Grid item xs> 
      <Card className={classes.card} raised={true}>
      <CardMedia
              className={classes.media}
              image="https://i.imgur.com/XaaSup9.png"
              title="Market"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              <font color="DFB17B" className={classes.font}>Claim your Bud!</font>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}>
                To kick off seed production and the minting of MOTA users who participated can claim 1 BUD. <u>CAN ONLY BE CLAIMED ONCE!</u>
              </font>
              </Typography>
              <br/>
              <br/>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}><b>Price: </b></font> <font color="green" className={classes.font}>FREE</font>
              </Typography>
              <br/>
              <Button
              disabled={true}
              label={buttonLabel}
              />
            </CardContent>
          </Card>
      </Grid>

      </Grid>
      </Container>

    </div>
    </Parallax>
    );
    } else {
      return (
        <Redirect to='/login'/>
      );
    }
    } else {
    if (username) {
    return (
      <Parallax blur={1} bgImage={image1} strength={500}>
      <div className={classes.root}>
  
        <center>
          <img src="https://i.imgur.com/yFfJJUK.png"></img>
        </center>
        <br/>
        <br/>
        <Typography gutterBottom variant="h2" component="h2">
          <font color="DFB17B" className={classes.font}>Please use a desktop PC or MAC to claim your goodies!</font>
        </Typography>
      </div>
      </Parallax>
      );
      } else {
        return (
          <Redirect to='/login'/>
          );
        }
    }
};