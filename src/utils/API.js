const get = (url, { headers, query, auth }) => {
	let defaultHeaders = {
		'Content-Type': 'application/json',
	}
	if (headers) defaultHeaders = { ...defaultHeaders, ...headers };
	if (auth) defaultHeaders = { ...defaultHeaders, 'Authorization': `Bearer ${localStorage.getItem('access_token')}` };
	const requestOpts = {
		method: 'GET',
		headers: defaultHeaders
	};
	return fetch(
		url,
		requestOpts
	).then(response => {
		if (response.status === 401) {
			localStorage.removeItem("access_token");
			window.location = "/login";
		} else {
			return response;
		}
	})
}

const post = (url, { headers, query, auth, data }) => {
	let defaultHeaders = {
		'Content-Type': 'application/json',
	}
	if (headers) defaultHeaders = { ...defaultHeaders, ...headers };
	if (auth) defaultHeaders = { ...defaultHeaders, 'Authorization': `Bearer ${localStorage.getItem('access_token')}` };
	const requestOpts = {
		method: 'POST',
		headers: defaultHeaders,
		body: JSON.stringify(data)
	};
	return fetch(
		url,
		requestOpts
	).then(response => {
		if (response.status === 401) {
			localStorage.removeItem("access_token");
			window.location = "/login";
		} else {
			return response;
		}
	})
}

const API = { get, post };
export default API;
