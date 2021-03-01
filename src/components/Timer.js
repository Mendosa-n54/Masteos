// Modules
import React, { useState, useEffect } from 'react'

// Files CSS
import '../stylesheets/Timer.css'

const Timer = ({handleStop}) => {
	const [timerSeconds, setTimerSeconds] = useState(0)
	const [timerMinutes, setTimerMinutes] = useState(0)
	const [stop, setStop] = useState(false)

	useEffect(() => {
		let customInterval = setInterval(() => {
			if (stop) {
				clearInterval(customInterval)
			} else if (timerSeconds === 59) {
				setTimerSeconds(0)
				setTimerMinutes(timerMinutes+1)
			} else {
				setTimerSeconds(timerSeconds+1)
			}
		}, 1000)

		return ()=> {
			clearInterval(customInterval)
		}
	})
	useEffect(() => {
		if (handleStop) {
			setStop(true)
		}
	}, [handleStop])

	return (
		<div className='timer'>
			{ timerMinutes === 0 ?
				timerSeconds : 
				<React.Fragment>{ timerMinutes } : { timerSeconds }</React.Fragment>
			}
		</div>
	)
}

export default Timer
