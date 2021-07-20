import { Button, Spinner } from "react-bootstrap";

const LoadingButton = ({ loading, ...props }) => {
	return (
		<Button style={{ "justifyContent": "center", "alignItems": "center", "display": "flex" }} disabled={loading} {...props}>
			{loading && <Spinner style={{ "marginRight": "10px" }} animation="border" size="sm" />}
			{props.children}
		</Button>
	)
}

export default LoadingButton;
