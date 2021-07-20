import { useState } from "react";
import {
	Switch,
	Route,
	Redirect,
	useHistory
} from "react-router-dom";

import ThemeContext from './contexts/themeContext';
import Layout from './components/Layout';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Login from './pages/login/Login';
import './App.scss';


function App() {
	const [theme, setTheme] = useState("light")
	const value = { theme, setTheme }
	
	return (
		<div className="App">
			<ThemeContext.Provider value={value}>
				<Switch>
					<PublicRoute path="/about" component={About} />
					<PublicRoute path="/login" component={Login} layout={false} />
					<PrivateRoute path="/" component={Home} />
				</Switch>
			</ThemeContext.Provider>
		</div>
	);
}

const PublicRoute = ({path, component: Component, layout, ...rest}) => {
	const history = useHistory();
	const isLayout = layout === undefined ? true : layout;
	if (isLayout) {
		return (
			<Route path={path} history={history}>
				<Layout>
					<Component {...rest} />
				</Layout>
			</Route>
		)
	}
	
	return (
		<Route path={path}><Component {...rest} history={history} /></Route>
	)
}

const PrivateRoute = ({path, component: Component, layout, ...rest}) => {
	const history = useHistory();
	const isLayout = layout === undefined ? true : layout;
	const authenticated = localStorage.getItem('access_token');

	if (!authenticated) return (
		<Redirect to="/login" />
	)

	if (isLayout) {
		return (
			<Route path={path} history={history}>
				<Layout>
					<Component {...rest} />
				</Layout>
			</Route>
		)
	}
	
	return (
		<Route path={path}><Component {...rest} history={history} /></Route>
	)
}

export default App;
