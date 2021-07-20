import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Col, Form, Button } from 'react-bootstrap';
import LoadingButton from '../../../components/LoadingButton';

const schema = Yup.object().shape({
	pair: Yup.string().required(),
	type: Yup.string().required(),
	price: Yup.number().required(),
	volume: Yup.number().required(),
	take_profit: Yup.number().required(),
	stop_loss: Yup.number().required()
});

const TradeForm = ({ pairs, handleCreateTrade }) => {
	const { saveButtonLoading } = useSelector(state => state.home)

	return (
		<Formik
			validationSchema={schema}
			onSubmit={handleCreateTrade}
			initialValues={{
				pair: '',
				type: 'sell',
				price: null,
				volume: null,
				take_profit: null,
				stop_loss: null,
				state: false
			}}
		>
			{({
				handleSubmit,
				handleChange,
				handleBlur,
				values,
				touched,
				isValid,
				errors,
			}) => (
				<Form onSubmit={handleSubmit}>
					<Form.Row>
						<Form.Group as={Col} controlId="market">
							<Form.Control name="pair" as="select" defaultValue="Choose..." onChange={handleChange}>
								<option>Choose...</option>
								{
									pairs.map(pair => {
										return (
											<option key={`pair${pair.id}`} value={pair.name}>{pair.name}</option>
										)
									})
								}
							</Form.Control>
						</Form.Group>
					</Form.Row>
					<Form.Group controlId="type">
						<Form.Control name="type" as="select" defaultValue="sell" onChange={handleChange}>
							<option value="sell">Sell</option>
							<option value="buy">Buy</option>
						</Form.Control>
					</Form.Group>
					<Form.Group controlId="price">
						<Form.Control placeholder="Price" name="price" onChange={handleChange} />
					</Form.Group>

					<Form.Group controlId="volume">
						<Form.Control placeholder="Volume" name="volume" onChange={handleChange} />
					</Form.Group>
					<Form.Group controlId="take-profit">
						<Form.Control placeholder="Take profit" name="take_profit" onChange={handleChange} />
					</Form.Group>
					<Form.Group controlId="stop-loss">
						<Form.Control placeholder="Stop loss" name="stop_loss" onChange={handleChange} />
					</Form.Group>

					<Form.Group id="formGridCheckbox">
						<Form.Check type="checkbox" label="done?" name="state" onChange={handleChange} />
					</Form.Group>

					<Form.Row>
						<LoadingButton loading={saveButtonLoading} className="form-control" variant="primary" type="submit">
							Save
						</LoadingButton>
					</Form.Row>
				</Form>
			)}
		</Formik>
	)
}

export default TradeForm;
