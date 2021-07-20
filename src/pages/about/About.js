import { Button } from 'react-bootstrap';
import './About.scss'

const About = ({history}) => {

    const handleBack = () => {
        history.goBack();
    }

    return (
        <>
            This is about page
            <Button onClick={handleBack}>go back</Button>
        </>
    )
}

export default About;
