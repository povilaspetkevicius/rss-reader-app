import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
const APIURL = 'http://localhost:8080/api';
const formContainer = {
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
	display: 'inline-block',
	margin: '10px',
};

const inputLabel = {
	marginLeft: '10px',
	marginTop: '10px',
	float: 'left',
	width: '35%',
};

const textInput = {
	float: 'right',
	width: '60%',
	marginRight: '10px',
	marginTop: '10px',
};

const submitButton = {
	width: '20%',
	align: 'left',
	margin: '10px',
};

const callService = (input) => {
	console.log(input);
	const callback = axios
		.post(`${APIURL}/feeds`, input)
		.then((response) => {
			return response;
		})
		.catch((e) => {
			console.log(e);
			throw new Error();
		});
	return callback;
};

function FeedForm() {
	const [url, setUrl] = useState('');
	const [name, setName] = useState('');
	const [showErrorMsg, setShowErrorMsg] = useState(false);
	function saveFeed(evt) {
		evt.preventDefault();
		try {
			callService({
				url: url,
				feedName: name,
				lastUpdate: moment(new Date()).format('ddd, DD MMM YYYY HH:mm:ss ZZ'),
			});
		} catch (e) {
			setShowErrorMsg(true);
		}
	}
	return (
		<div style={formContainer}>
			{showErrorMsg && (
				<p>
					<i>We couldn't save that feed. Try again!</i>
				</p>
			)}
			<h4 style={header}>Add XML RSS feed</h4>
			<br />
			<p style={textBlock}>
				<i>Please provide new XML RSS feed information</i>
			</p>
			<form onSubmit={saveFeed}>
				<label style={inputLabel}>XML RSS Feed URL: </label>
				<input
					type="text"
					style={textInput}
					onChange={(e) => setUrl(e.target.value)}
				></input>
				<br />
				<label style={inputLabel}>XML RSS Feed Name: </label>
				<input
					type="text"
					style={textInput}
					onChange={(e) => setName(e.target.value)}
				></input>
				<br />
				<input type="submit" value="Add Feed" style={submitButton}></input>
			</form>
		</div>
	);
}

export default FeedForm;
