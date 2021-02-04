import React, { useState } from "react";
import Board from "./Board";

const styles = {
	width: "20px",
	margin: "20px auto",
};

function calculateWinner(squares) {
	const winningPositions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let i = 0; i < winningPositions.length; i++) {
		const [a, b, c] = winningPositions[i]; // index = 1 a:3,b:4,c:5
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}

	return null;
}

const Game = () => {
	const [register, setRegister] = useState([Array(9).fill(null)]); // null, "X", "O"
	const [stepsNumbers, setStepsNumbers] = useState(0);
	const [xIsNext, setXisNext] = useState(true);
	const winner = calculateWinner(register[stepsNumbers]);

	const handleClick = (i) => {
		const timeInRegister = register.slice(0, stepsNumbers + 1);
		const current = timeInRegister[stepsNumbers];
		const squares = [...current];

		if (squares[i] || winner) return;

		squares[i] = xIsNext ? "X" : "O";
		setRegister([...timeInRegister, squares]);
		setStepsNumbers(timeInRegister.length);
		setXisNext(!xIsNext);
	};

	const MoveTo = (steps) => {
		setStepsNumbers(steps);
		setXisNext(steps % 2 === 0);
	};

	const renderMoves = () =>
		register.map((_steps, move) => {
			const destiny = move ? `Go to move #${move}` : "Start Game";
			return (
				<li className="list" Key={move}>
					<button onClick={() => MoveTo(move)} className="btn">
						{destiny}
					</button>
				</li>
			);
		});

	return (
		<>
			<Board squares={register[stepsNumbers]} onClick={handleClick} />
			<div style={styles}>
				<p className="notify-winner">
					{winner ? "Winner: " + winner : "Next Turn: " + (xIsNext ? "X" : "O")}
				</p>
				{renderMoves()}
			</div>
		</>
	);
};

export default Game;
