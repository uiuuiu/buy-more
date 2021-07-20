import { Redirect } from 'react-router-dom';
import { Container, Row, Button } from 'react-bootstrap';
import './Login.scss';

const queryString = require('query-string');


const Login = ({ location }) => {
	const authenticated = localStorage.getItem('access_token');

	const googleUrl = queryString.stringifyUrl({
		url: 'https://accounts.google.com/o/oauth2/v2/auth',
		query: {
			scope: "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive",
			include_granted_scopes: true,
			response_type: 'token',
			state: 'state_parameter_passthrough_value',
			redirect_uri: "http://localhost:3000/login",
			client_id: '817528733779-7pc4tgk1gp3qjvvg00n69c44k365tlha.apps.googleusercontent.com'
		}
	});

	const login = () => {
		window.open(googleUrl, '_parent', 'width=600,height=400,left=200,top=200')
	}

	if (location.hash) {
		const search = location.hash.replace(/^\#/, "");
		const params = queryString.parse(search);
		if (params.access_token) {
			localStorage.setItem('access_token', params.access_token);
			return (
				<Redirect to="/" />
			)
		}
	}

	if (authenticated) {
		return (
			<Redirect to="/" />
		)
	}

	return (
		<Container style={{height: '100%'}}>
			<Row className="justify-content-center align-items-center pr-1 pl-1" style={{height: '100%'}}>
				<Button variant="primary" type="button" onClick={login}>
					Login with google
				</Button>
			</Row>
		</Container>
	)
}

export default Login;
