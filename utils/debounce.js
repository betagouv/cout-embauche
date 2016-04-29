module.exports = function debounce(debounced, delay) {
	var timeout;

	return function() {
		clearTimeout(timeout);
		timeout = setTimeout(debounced.bind(this, arguments), delay);
	}
};
