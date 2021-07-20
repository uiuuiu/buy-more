import { useEffect, useState } from 'react';
import { useSelector, connect } from 'react-redux';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { Card, Row, Col, Form } from 'react-bootstrap';
import LoadingButton from '../../components/LoadingButton';
import ContentRow from '../../components/ContentRow';
import styled from 'styled-components';
import TradeForm from './components/TradeForm.js';
import TradesTable from './components/TradesTable.js';
import TradeModel from '../../models/tradeModel.js';
import './Home.scss';

import { getConfigFile, getDataFile, getDataFileContent, getPairs, createTrade, createDataFile } from '../../actions/sheets.js';

const strftime = require('strftime');
const moment = require('moment');

const columns = [
	{
		dataField: 'pair',
		text: 'Market'
	},
	{
		dataField: 'type',
		text: 'Type'
	},
	{
		dataField: 'position',
		text: 'Position'
	},
	{
		dataField: 'volume',
		text: 'Volume'
	}
]

const DateCol = styled(Col)`
	padding: 0px;
	padding-bottom: 10px;

	@media only screen and (max-width: 768px) {
		padding-top: 10px;
		width: 100%;
	}
`

const FormCol = styled(Col)`
	padding: 0px;
	padding-bottom: 10px;
	padding-right: 10px;

	@media only screen and (max-width: 768px) {
		padding-top: 10px;
		padding-right: 0px;
		width: 100%;
	}
`

const InitDataButton = styled(LoadingButton)`
	margin-left: 10px;
	margin-bottom: 10px;

	@media only screen and (max-width: 768px) {
		margin-left: 0px;
		margin-top: 0px;
		width: 100%;
	}
`

const Home = ({ getConfigFile, getDataFile, getDataFileContent, getPairs, createTrade, createDataFile }) => {
	const { configurationSheet, dataFileID, trades, configFileId, pairs, tableLoading, initButtonLoading } = useSelector(state => state.home)
	const [selectedDate, setSelectedDate] = useState(strftime("%d%m%Y", new Date()))
	const [tradeData, setTradeData] = useState([])

	useEffect(() => {
		getConfigFile();
	}, [getConfigFile]);

	useEffect(() => {
		configFileId && getPairs(configFileId);
	}, [configFileId, getPairs]);

	useEffect(() => {
		getDataFile(selectedDate);
	}, [selectedDate, getDataFile]);

	useEffect(() => {
		if (dataFileID) {
			getDataFileContent(dataFileID);
		} else {
			setTradeData([])
		}
	}, [dataFileID, getDataFileContent]);

	useEffect(() => {
		setTradeData(trades.map(trade => trade.toTableData()));
	}, [trades])

	const handleCreateTrade = (data) => {
		if (dataFileID) {
			const trade = new TradeModel(trades.length + 1, ...Object.values(data))
			trade.createdAt = dateStringToInputValue(selectedDate);
			return createTrade(trade, dataFileID);
		}

		console.log('error: no file')
	}

	const handleCreateDataFile = () => {
		if (!dataFileID) {
			createDataFile(selectedDate);
		}
	}

	const onDateChange = (event) => {
		setSelectedDate(strftime("%d%m%Y", new Date(event.target.value)))
	}

	const dateStringToInputValue = (dateData) => {
		return strftime('%Y-%m-%d', moment(dateData, "DDMMYYYY").toDate());
	}

	return (
		<>
			<ContentRow>
				<FormCol xs={12} md={4}>
					<Card className="card-new-trade">
						<Card.Body>
							<TradeForm pairs={pairs} handleCreateTrade={handleCreateTrade} />
						</Card.Body>
					</Card>
				</FormCol>
				<Col>
					<Row sm={12} md={4}>
						<DateCol className="col-md-4 col-sm-12">
							<Form.Control type="date" value={dateStringToInputValue(selectedDate)} onChange={onDateChange} />
						</DateCol>
						<DateCol sm={12} md={4}>
							{!dataFileID && <InitDataButton loading={initButtonLoading} onClick={handleCreateDataFile}>Init data file</InitDataButton>}
						</DateCol>
					</Row>
					<Row>
						<TradesTable
							className="table-trades"
							keyField="id"
							data={tradeData}
							columns={columns}
							cellEdit={cellEditFactory({ mode: 'click' })}
							noDataIndication={dataFileID ? "No record." : "No data file."}
							loading={tableLoading}
						/>
					</Row>
				</Col>
			</ContentRow>
		</>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		getConfigFile: () => dispatch(getConfigFile()),
		getDataFile: (dateString) => dispatch(getDataFile(dateString)),
		getDataFileContent: (fileId) => dispatch(getDataFileContent(fileId)),
		getPairs: (fileId) => dispatch(getPairs(fileId)),
		createTrade: (trade, fileId) => dispatch(createTrade(trade, fileId)),
		createDataFile: (dateString) => dispatch(createDataFile(dateString))
	};
};

export default connect(null, mapDispatchToProps)(Home);
