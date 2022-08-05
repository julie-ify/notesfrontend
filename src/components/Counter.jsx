import '../styles/Counter.css';

const Counter = (props) => {
	let { noteLength, type } = props;
	let maxlength;

	if (type === 'title') {
		maxlength = 150 - noteLength;
	}

	if (type === 'body') {
		maxlength = 250 - noteLength;
	}
	//console.log(noteLength);
	return (
		<div>
			<span className={maxlength <= 0 ? 'red-counter' : 'blue-counter'}>
				{maxlength}
			</span>
		</div>
	);
};

export default Counter;
