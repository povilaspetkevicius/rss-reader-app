import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import FeedForm from './FeedForm';
import FeedList from './FeedList';

const header = {
	margin: '10px',
};

const nav_links = {
	margin: '10px',
};

function App() {
	return (
		<div>
			<h2 style={header}>RSS Reader</h2>
			<div>
				<Link style={nav_links} to="/view">
					View feed list
				</Link>
				<Link style={nav_links} to="/create">
					Add new feed
				</Link>{' '}
			</div>

			<Switch>
				<Route component={FeedForm} path="/create" />
				<Route component={FeedList} path="/view" />
				<Route component={FeedList} exact path="/" />
			</Switch>
		</div>
	);
}

export default App;
