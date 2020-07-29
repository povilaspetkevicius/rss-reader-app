import React, { useState, useEffect } from 'react';
import FeedDetail from './FeedDetail';

const APIURL = `http://${process.env.REACT_APP_API_URL}/api`;

const listContainer = {
	minWidth: '10rem',
	maxWidth: '40rem',
	borderRadius: '10px',
	border: '1px solid',
	marginLeft: '10px',
	marginTop: '10px',
};

const header = {
	width: '90%',
	display: 'inline-block',
	margin: '10px',
};

const textBlock = {
	width: '90%',
	marginLeft: '10px',
};

const getFeeds = async () => {
	const res = await fetch(`${APIURL}/feeds`);
	const data = await res.json();
	return data;
};

function FeedList() {
	const [feeds, setFeeds] = useState([]);

	useEffect(() => {
		async function fetchFeeds() {
			const savedFeeds = await getFeeds();
			setFeeds(
				Object.keys(savedFeeds).map((key) => {
					return <FeedDetail key={key} feed={savedFeeds[key]} />;
				}),
			);
		}
		fetchFeeds();
	}, []);

	return (
		<div style={listContainer}>
			<h4 style={header}>XML RSS Feed</h4>
			<p style={textBlock}>
				<i>Please find a list of all available feeds</i>
			</p>
			{feeds}
		</div>
	);
}

export default FeedList;
