import { Button } from 'react-bootstrap';

const InitButton = ({ isShow }) => {
    if (!isShow) {
        return null
    }

    return (
        <Button>Init configuration file</Button>
    )
}

export default InitButton;
