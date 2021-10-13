import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment } from '@material-ui/core';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MyWallet from './MyWallet';
import '../css/Dice.css'

const useStyles = makeStyles({
	root: {
		display: 'flex',
		justifyContent: 'space-evenly',
		width: '100vw',
		height: '75%'
	},
	stateBoard: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		width: '25%'
	},
	details: {
		alignItems: 'center',
		justifyContent: 'space-evenly',
		width: '25%',
		height: '50%',
		margin: '50px 0'
	},
	playground: {
		width: 450,
		margin: 30
	},
	gridList: {
		outline: 'solid 5px'
	},
	cell: {
		outline: 'solid'
	},
	card: {
    width: 345,
  },
  history: {
  	width: 450,
  	maxHeight: '55vh',
  	overflow: 'auto'
  }
})

const Dice = (props) => {
	const url = '/dice/' + props.value + '.png'
	return (
		<div>
			{props.first ?
				<img 
					src={url}
					style={{
						width: 50,
					  border: '2px solid black',
					  borderRadius: 5,
					  position: 'relative',
					  top: 75,
					  left: -30
					}}
					alt="dice"
			  />
			:
				<img 
					src={url}
					style={{
						width: 50,
					  border: '2px solid black',
					  borderRadius: 5,
					  position: 'relative',
					  top: 25,
					  left: 30
					}}
					alt="dice"
			  />
			}
		</div>
	)
}

const DiceBoard = () => {
	const classes = useStyles();

	let id = 0;
	const createData = (winner, loser, amount) => {
	  id += 1;
	  return { id, winner, loser, amount };
	}

	const rows = [
		createData('0xA05C8...e66d3b', '0xA05C8...e66d3b', 0.123),
		createData('0xA05C8...e66d3b', '0xA05C8...e66d3b', 0.123),
		createData('0xA05C8...e66d3b', '0xA05C8...e66d3b', 0.123),
		createData('0xA05C8...e66d3b', '0xA05C8...e66d3b', 0.123),
		createData('0xA05C8...e66d3b', '0xA05C8...e66d3b', 0.123),
		createData('0xA05C8...e66d3b', '0xA05C8...e66d3b', 0.123),
		createData('0xA05C8...e66d3b', '0xA05C8...e66d3b', 0.123),
		createData('0xA05C8...e66d3b', '0xA05C8...e66d3b', 0.123),
		createData('0xA05C8...e66d3b', '0xA05C8...e66d3b', 0.123),
		createData('0xA05C8...e66d3b', '0xA05C8...e66d3b', 0.123),
	];

	return (
		<div className={classes.root}>
			<div className={classes.stateBoard}>
				<MyWallet />
				<div style={{color: '#42cddb', fontSize: '20pt'}}>
					Game is ready!
				</div>
			</div>
			<div className={classes.playground}>
				<div 
					style={{
						height: '20vh',
					}}
			  />
				<Dice value={1} first/>
				<Dice value={5} second/>
				<img 
					src='/dice/table.png'
					style={{
						width: '100%',
					}}
					alt="dice"
			  />
			</div>
			<div className={classes.details}>
				<div style={{color: '#42cddb', fontSize: '20pt'}}>
					Current State
				</div>
				<TextField
	        label="Creator Address:"
	        style={{width: '450px'}}
	        disabled
	        InputProps={{
	          startAdornment: (
	            <InputAdornment position="start">
	              <AccountCircle />
	            </InputAdornment>
	          ),
	        }}
	      />
				<TextField
	        label="Joiner Address:"
	        style={{width: '450px'}}
	        disabled
	        InputProps={{
	          startAdornment: (
	            <InputAdornment position="start">
	              <AccountCircle />
	            </InputAdornment>
	          ),
	        }}
	      />
				<div style={{marginTop: 50, color: '#42cddb', fontSize: '20pt'}}>
					Game History
				</div>
				<div className={classes.history}>
	        <Table className={classes.table}>
		        <TableHead>
		          <TableRow>
		            <TableCell align="center">Winner</TableCell>
		            <TableCell align="center">Loser</TableCell>
		            <TableCell align="right">Amount</TableCell>
		          </TableRow>
		        </TableHead>
		        <TableBody>
		          {rows.map(row => (
		            <TableRow key={row.id}>
		              <TableCell component="th" scope="row">
		                {row.winner}
		              </TableCell>
		              <TableCell align="right">{row.loser}</TableCell>
		              <TableCell align="right">{row.amount} Eth</TableCell>
		            </TableRow>
		          ))}
		        </TableBody>
		      </Table>
				</div>
			</div>
		</div>
	);
}

export default DiceBoard;