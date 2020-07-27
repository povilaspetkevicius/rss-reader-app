import React from 'react';

function Item(props) {
	const item = props.item;
	return (
		<div style={{ margin: '5px' }}>
			{item.link && item.title && <a href={item.link}>{item.title}</a>}
			{item.description && (
				<p>
					<i>{item.description}</i>
				</p>
			)}
		</div>
	);
}

export default Item;
