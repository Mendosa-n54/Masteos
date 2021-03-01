// Modules
import React, { useState, useEffect } from 'react'

// Files CSS
import '../stylesheets/Game.css'

// Components
import Timer from '../components/Timer'

// Data
import data from  '../exercices.json'

const Game = () => {
	const [stop, setStop] = useState(false)
	const [exercices, setExercices] = useState([])
	const [level, setLevel] = useState(-1)
	const [code, setCode] = useState('')
	const [tests, setTests] = useState([])
	const [output, setOutput] = useState('')
	const [nextExercice, setNextExercice] = useState(false)
	const [nbExercices, setNbExercices] = useState(0)
	
	function getData() {
		return new Promise((resolve, reject) => {
			const array = []
			data.forEach((d) => {
				array.push(d)
			})
			resolve(array)
		})
	}
	function submitCode() {
		if (nextExercice === true) {
			setLevel(level+1)
			setNextExercice(false)
		} else {
			const wrap = s => "{ return " + code + " };"
			const func = new Function(wrap(code))
			let newOutput = output
			let success = 0
	
			try {
				tests.forEach((t) => {
					const result = func.call( null ).call(null,eval(t.i))
					newOutput += 'Testing ' + t.i
					if (result === t.o) {
						newOutput += '\n<div class="right">RIGHT : ' + result + ' is th right answer.</div>'
						setOutput(newOutput)
						success++
					} else {
						newOutput += '\n<div class="wrong">WRONG : got ' + result + ' but expected ' + t.o + '. Try again !</div>'
						setOutput(newOutput)
					}
				})
			} catch(e) {
				newOutput += '\nError : ' + e
				setOutput(newOutput)
			}
			if (success === 5) {
				setNextExercice(true)
			}
		}
	}

	useEffect(() => {
		if (exercices.length === 0) {
			getData().then((result) => {
				setExercices(result)
				setNbExercices(result.length)
				setLevel(0)
			})
			.catch((err) => console.error(err))
		}
	}, [exercices])

	useEffect(() => {
		if (level !== -1) {
			if (level < nbExercices) {
				setCode(exercices[level].code)
				setTests(exercices[level].tests)
				setOutput('Code as fast as you can! You need to double the integer and return it. To test your code, click Go\n')
			} else {
				setStop(true)
				setOutput('Congratz !')
				console.log('GOOD GAME !')
			}
		}
	}, [level])

	return (
		<div className='game'>
			<div className='game-head'>
				<img src='/youcant.png' alt={'You can\'t Javascript under pressure'} className='game-image'></img>
				<Timer handleStop={ stop }></Timer>
			</div>
			<textarea rows="10" className='text-area' value={ code } onChange={(e) => setCode(e.target.value)}></textarea>
			<div className='game-output'>
				<button onClick={ submitCode } className='button-go'>Go</button>
				<p id='output' className='new-line game-form-output' dangerouslySetInnerHTML={{ __html: output }}></p>
			</div>
		</div>
	)
}

export default Game
