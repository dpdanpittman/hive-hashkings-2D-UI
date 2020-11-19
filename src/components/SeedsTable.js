import React, { useState, useContext, StateContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



export default function SeedsTable() {
  const classes = useStyles();
  const {username} = useState();

  const [experience, setExperience] = useState([0]);
  const [breederName, setBreederName] = useState("");

  const loadData = async (ourUsername) => {
    
    const urlAPI = 'https://hashkings-api.herokuapp.com/u/'+ ourUsername;
    
    const response = await fetch(urlAPI);
    const data = await response.json();
    console.log(data)
    if(data) {
    var xpsValue = data.xps;
    var alliance = data.alliance;
    var breederName = data.breeder;

    setExperience(xpsValue);
    setGuild(alliance);
    setBreederName(breederName);
  }
}

  useEffect(() => {
    loadData(username);
  }, [username]);

  function createData(name, total) {
    return { name, total};
  }
  
  const rows = [
    createData('Seeds', 4),
    createData('Pollen', 6),
    createData('Buds', 10),
  ];

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
