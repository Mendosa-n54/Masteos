// Modules
import React from 'react'
import { Link } from 'react-router-dom'

// Files CSS
import '../stylesheets/Home.css'

const Home = () => {
	return (
		<div className='center'>
			<img src='/youcant.png' alt={'You can\'t Javascript under pressure'} className='header-image'></img>
            <h1>Five functions to fill. One ticking clock. <b>How fast can you code?</b></h1>
			<Link to='/game'><button className='button-start'>Start game !</button></Link>
		</div>
	)
}

export default Home
