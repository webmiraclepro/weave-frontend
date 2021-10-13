import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DiceBoard from '../components/DiceBoard';
import { Input, InputAdornment, Button, Select, MenuItem } from '@material-ui/core';
import Swal from 'sweetalert2';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import {
	setGameInstance,
	setCreatorAddress,
	setJoinerAddress,
	setAmount,
	setMyChoice
} from './MainBoardSlice';

import web3 from '../core/web3';
import { ADDRESS, ABI } from '../config/config';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
    alignItems: 'center',
		backgroundColor: '#4d6087',
		height: '100vh'
		// marginTop: theme.spacing(8),
	},
	footer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContents: 'center',
    alignItems: 'center',
	},
	input: {
		color: 'white',
		margin: 30
	},
	select: {
		color: 'white',
		width: 100,
		margin: 30
	},
	inputPanel: {
		display: 'flex',
		justifyContent: 'space-evenly',
		width: '50vw'
	},
	button: {
		width: 200
	}
})

const game = new web3.eth.Contract(ABI, ADDRESS)

const MainBoard = () => {
	const classes = useStyles();

	const [isCreated, setIsCreated] = useState(false)
	useEffect(() => {
		const fetchData = async () => {
			await game.events.gameCreated().on('data', (event) => {
				console.log(event)
			})
			const state = await game.methods.isGameCreated().call()
			setIsCreated(state)
		}
		fetchData()
	}, [])

  const dispatch = useDispatch()
	const amount = useSelector((state: RootState) => state.main.amount)
	const myChoice = useSelector((state: RootState) => state.main.myChoice)
	const myAddress = useSelector((state: RootState) => state.main.myAddress)
	const myEther = useSelector((state: RootState) => state.main.myEther)

	const handleChange = (event) => {
		dispatch(setAmount(event.target.value))
	}

	const handleSelect = (event) => {
		dispatch(setMyChoice(event.target.value))
	}

	const handleCreate = async () => {
		if (amount == 0) {
      Swal.fire('Please bet on the Game !!!')
			return
		}
		if (amount >= myEther) {
			Swal.fire('Eth is not enough.\nPlease check your wallet !!!')
		} else {
			const amountToSend = web3.utils.toWei(amount, "ether");
			await game.methods.createGame(myChoice).send({
				from: myAddress,
				value: amountToSend,
			})
			// await game.events.gameCreated().on('data', (result) => {
			// 	console.log(result)
			// 	dispatch(setCreatorAddress(result.args.p1))
			// })
		}
	}

	const handleJoin = async () => {
		const betAmount = await game.methods.betAmount().call()
		const betAmountInEth = web3.utils.fromWei(betAmount, "ether");
		console.log(betAmountInEth, myEther)
		if (betAmountInEth > myEther) {
			Swal.fire('Eth is not enough.\nPlease check your wallet !!!')
		} else {
			await game.methods.joinGame().send({
				from: myAddress,
				value: betAmount,
			})
		}
	}

	return (
		<div className={classes.root}>
			<DiceBoard />
			<div className={classes.footer}>
        <div className={classes.inputPanel}>
					<Input
	          className={classes.input}
	          value={amount}
	          placeholder="0"
	          onChange={handleChange}
	          endAdornment={
	          	<InputAdornment position="end">
	          		<span style={{color: 'white'}}>Eth</span>
	        		</InputAdornment>
	          }
	        />
	        <Select 
	        	className={classes.select} 
	        	value={myChoice}
	        	onChange={handleSelect}
	        >
				    <MenuItem value={0}>Even</MenuItem>
				    <MenuItem value={1}>Odd</MenuItem>
				  </Select>
			  </div>
			  {!isCreated ?
					<Button 
						variant="contained" 
						color="secondary" 
						className={classes.button}
						onClick={handleCreate}
					>
		        Create Game
		      </Button>
	      :
					<Button 
						variant="contained" 
						color="primary" 
						className={classes.button}
						onClick={handleJoin}
					>
		        Join Game
		      </Button>
		    }
			</div>
		</div>
	);
}

export default MainBoard;