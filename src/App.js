// Modules
import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"

// Files CSS
import './stylesheets/App.css'

// Pages
import Home from './pages/Home'
import Game from './pages/Game'
import Error404 from './pages/Error404'

const App = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>
			<Route path="/game">
				<Game />
			</Route>
			<Route path="*">
				<Error404 />
			</Route>
		</Switch>
	</BrowserRouter>
)

export default App
