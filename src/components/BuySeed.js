import React, {useContext, useState, useEffect} from "react";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import {seedNames, seedTypes} from "../service/HashkingsAPI";
import {StateContext} from "../App";
import {sign} from "hivesigner";
import useSteemKeychain from "../hooks/useSteemKeychain";

export default function BuySeed({type}) {
  const {username} = useContext(StateContext);
  const [seed, setSeed] = useState();
  const [acaPrices, setAcaPrices] = useState([0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasSteemKeychain = useSteemKeychain();

  const loadPriceData = async () => {
    
    const urlAPI = 'https://hashkings-api.herokuapp.com/';
    
    const response = await fetch(urlAPI);
    const pricedata = await response.json();

    var acaPrice = pricedata.stats.prices.listed.seeds.reg;
    setAcaPrices(acaPrice);
  }

  useEffect(() => {
    loadPriceData();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (seed && username) {
      setIsSubmitting(true);

      const memo = `${type}seed ${seed.id}`;
      const to = "hashkings";
      const amount = acaPrices;
      const currency = "HIVE";

      if (hasSteemKeychain()) {
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
          setSeed();
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
            ? `${process.env.REACT_APP_URL}/market/seedbank`
            : "http://localhost:3000/market/seedbank"
        );
      }
    }
  };

  let buttonLabel = "Purchase";
  if (isSubmitting) buttonLabel = "Purchasing";
  if (!username) buttonLabel = "Please Sign in";

  return (
    <>
      <div className="p-col-12 p-md-12">
        <Dropdown
          disabled={isSubmitting || !username}
          optionLabel="name"
          value={seed}
          id="name"
          options={Object.keys(seedNames).map(key => ({
            id: key,
            name: seedNames[key]
          }))}
          style={{width: "100%"}}
          onChange={e => {
            setSeed(e.value);
          }}
          placeholder="Choose a seed..."
        />     
        <br/><br/>   
        <Button
        disabled={isSubmitting || !username}
        label={buttonLabel}
        onClick={handleSubmit}
      />
      </div>
    </>
  );
}
