import BootstrapTable from 'react-bootstrap-table-next';
import { Spinner } from 'react-bootstrap';

const TradesTable = ({ loading, selected, handleOnSelect, handleOnSelectAll, ...props }) => {
	const selectRow = {
		mode: 'checkbox',
		clickToSelect: true,
		selected: selected,
		onSelect: handleOnSelect,
		onSelectAll: handleOnSelectAll
	};

	if (loading) {
		return (
			<>
				<BootstrapTable {...props} data={[]} noDataIndication={() => <Spinner animation="border" />} />
			</>
		)
	}

	return (
		<>
			<BootstrapTable {...props} />
		</>
	)
};

export default TradesTable;
