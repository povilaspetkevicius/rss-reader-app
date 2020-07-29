import React, { useState, useEffect } from 'react';
import Item from './Item';
import axios from 'axios';

const APIURL = `http://${process.env.REACT_APP_API_URL}/api`;

const feedButton = {
	width: '50%',
	float: 'center',
	margin: '10px',
};

const detailsContainer = {
	margin: '10px',
};

const detail = {
	borderTop: '1px solid',
	borderLeft: '1px solid',
	paddingLeft: '10px',
	paddingTop: '5px',
};

function FeedDetail(props) {
	const [showDetail, setShowDetail] = useState(false);
	const [showRefreshErrorMsg, setShowRefreshErrorMsg] = useState(false);
	function showFeed() {
		setShowDetail(!showDetail);
	}
	const [feed, setFeed] = useState(props.feed);
	useEffect(() => {
		console.log(feed);
		function updateFeed() {
			axios
				.get(`${APIURL}/feeds/${feed.id}`)
				.then((response) => {
					setFeed(response.data);
				})
				.catch((e) => {
					setShowRefreshErrorMsg(true);
				});
		}
		updateFeed();
	}, [props.feed]);

	return (
		<div>
			<button onClick={showFeed} style={feedButton}>
				{feed.feedName}
			</button>
			{showDetail && (
				<div style={detailsContainer}>
					{showRefreshErrorMsg && (
						<p>
							<i>We couldn't refresh this feed - sorry!..</i>
						</p>
					)}
					{feed.title && (
						<div style={detail}>
							<label>RSS Feed</label>
							<p>
								<b>{feed.title}</b>
							</p>
						</div>
					)}
					{feed.url && (
						<div style={{ ...detail, marginBottom: '10px' }}>
							<a href={feed.url}>Link to feed</a>
						</div>
					)}
					{feed.lastUpdate && (
						<div style={detail}>
							<label>Last time updated</label>
							<p>
								<b>{feed.lastUpdate}</b>
							</p>
						</div>
					)}
					{feed.items.length > 0 && (
						<div style={detail}>
							<label>Most recent stories</label>
							{Object.keys(feed.items).map((key) => {
								return <Item key={key} item={feed.items[key]} />;
							})}
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default FeedDetail;
