import React, { useState, useEffect, useContext } from "react";
import {StateContext} from "../App";
import {sign} from "hivesigner";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import MediaCard from './FarmingCard';
import {Button} from "primereact/button";
import WelcomeCard from './WelcomeCard';
import MarketCard from './MarketCard';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router';
import { Parallax } from 'react-parallax';
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
    height: 140,
    width: 270,
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
const hasHiveKeychain = useHiveKeychain();

const loadPriceData = async () => {
    
  const urlAPI = 'https://hashkings-api.herokuapp.com/';
  
  const response = await fetch(urlAPI);
  const pricedata = await response.json();

  var seedAsiaPrice = pricedata.stats.prices.asiaBundle.price;
  var seedAfricaPrice = pricedata.stats.prices.africaBundle.price;
  var seedAfghanistanPrice = pricedata.stats.prices.AfghanistanBundle.price;
  var seedJamaicaPrice = pricedata.stats.prices.jamaicaBundle.price;
  var seedMexicoPrice = pricedata.stats.prices.mexicoBundle.price;
  var seedSouthAmericaPrice = pricedata.stats.prices.southAmericaBundle.price;

  setAsiaPrices(seedAsiaPrice);
  setAfricaPrices(seedAfricaPrice);
  setAfghanistanPrices(seedAfghanistanPrice);
  setJamaicaPrices(seedJamaicaPrice);
  setMexicoPrices(seedMexicoPrice);
  setSouthAmericaPrices(seedSouthAmericaPrice);
}

useEffect(() => {
  loadPriceData();
}, []);

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

const handleSubmitSouthAmerica = async e => {
  e.preventDefault();
  if (username) {
    setIsSubmitting(true);

    const memo = `southAmerica_bundle`;
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

  return(
    <Parallax blur={1} bgImage={image1} strength={500}>
    <div className={classes.root}>
    
      <Container fixed>
      <Grid container spacing={3}>
      <Grid item xs={12}> 
      <br/>
      <br/>
      <br/>
      <TutorialCard />
      </Grid>

        <Grid item xs={12}>
          <WelcomeCard />
          <br/>
        </Grid>
        
        <Grid container spacing={3}>
      <br/>
      <br/>
      <Grid item xs={3}>
      </Grid>
      <Grid item xs={3}>
      </Grid>
    </Grid>
        
      </Grid>
      <br/>
      {/*<hr/>
      <br/>
    <Grid container spacing={1}>
      <Grid item xs={12}>
      <Grid container spacing={3}>   
        <Grid item xs>
            <CardMedia
              className={classes.media}
              image="https://i.imgur.com/dfHVMYV.png"
              title="Splinterlands"
            />
        </Grid>
        <Grid item xs>
            <CardMedia
              className={classes.media}
              image="https://i.imgur.com/ymrzJc9.png"
              title="Market"
            />
        </Grid>
        <Grid item xs>
        <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="https://cdn.shopify.com/s/files/1/0065/4917/6438/products/a-man-lounges-while-smoking-weed-and-view-of-an-outdoor-rural-market-background_1200x1200.jpg?v=1536742441"
              title="Market"
            />
          </Card>
        </Grid>
        <Grid item xs>
        <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="https://cdn.shopify.com/s/files/1/0065/4917/6438/products/a-man-lounges-while-smoking-weed-and-view-of-an-outdoor-rural-market-background_1200x1200.jpg?v=1536742441"
              title="Market"
            />
          </Card>
        </Grid>
        <Grid item xs>
        <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="https://cdn.shopify.com/s/files/1/0065/4917/6438/products/a-man-lounges-while-smoking-weed-and-view-of-an-outdoor-rural-market-background_1200x1200.jpg?v=1536742441"
              title="Market"
            />
          </Card>
        </Grid>
      </Grid>
    </Grid>
    </Grid>  */}
      </Container>
    </div>
    </Parallax>
  );
};

