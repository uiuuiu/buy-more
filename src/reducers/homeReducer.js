import {
	GET_DATA_CONFIGURATION_FILE_SUCCESS,
	GET_DATA_CONFIGURATION_FILE_FAILED,

	GET_DATA_FILE,
	GET_DATA_FILE_SUCCESS,
	GET_DATA_FILE_FAILED,

	GET_DATA_FILE_CONTENT,
	GET_DATA_FILE_CONTENT_SUCCESS,
	GET_DATA_FILE_CONTENT_FAILED,

	GET_FILE_CONFIGURATION_SUCCESS,
	GET_FILE_CONFIGURATION_FAILED,

	GET_PAIRS_SUCCESS,
	GET_PAIRS_FAILED,

	CREATE_TRADE,
	CREATE_TRADE_SUCCESS,
	CREATE_TRADE_FAILED,

	CREATE_DATA_FILE,
	CREATE_DATA_FILE_SUCCESS
} from '../actions/sheets';

import TradeModel from '../models/tradeModel';
import PairModel from '../models/pairModel';

const initialState = {
	dataConfigurationSheet: null,
	dataFileID: null,
	configFileId: null,
	trades: [],
	pairs: [],
	tableLoading: false,
	initButtonLoading: false,
	saveButtonLoading: false
}

// Use the initialState as a default value
export default function homeReducer(state = initialState, action) {
	// The reducer normally looks at the action type field to decide what happens
	switch (action.type) {
		// Do something here based on the different types of actions
		case GET_DATA_CONFIGURATION_FILE_SUCCESS:
			return {
				...state,
				dataConfigurationSheet: action.data.sheetId
			}
		case GET_DATA_FILE_SUCCESS:
			return {
				...state,
				dataFileID: action.data.fileId,
				tableLoading: false
			}
		case GET_DATA_FILE_CONTENT_SUCCESS:
			return {
				...state,
				trades: action.data.values.map((data, i) => {
					return new TradeModel(
						i,
						data[1], data[2], data[3], data[4],
						data[5], data[6], data[7], data[8],
						data[9], data[10], data[11], data[12],
						data[13]
					)
				}),
				tableLoading: false
			}
		case GET_FILE_CONFIGURATION_SUCCESS:
			return {
				...state,
				configFileId: action.data.fileId
			}
		case GET_PAIRS_SUCCESS:
			return {
				...state,
				pairs: action.data.values.map((data, i) => {
					return new PairModel(
						i,
						data[0]
					)
				})
			}
		case CREATE_TRADE_SUCCESS:
			const newTrades = [...state.trades];
			newTrades.push(action.data.trade);
			return {
				...state,
				trades: newTrades,
				saveButtonLoading: false
			}
		case CREATE_DATA_FILE_SUCCESS:
			return {
				...state,
				dataFileID: action.data.fileId,
				initButtonLoading: false
			}
		case GET_DATA_FILE:
		case GET_DATA_FILE_CONTENT:
			return {
				...state,
				tableLoading: true
			}
		case CREATE_TRADE:
			return {
				...state,
				saveButtonLoading: true
			}
		case CREATE_DATA_FILE:
			return {
				...state,
				initButtonLoading: true
			}
		default:
			// If this reducer doesn't recognize the action type, or doesn't
			// care about this specific action, return the existing state unchanged
			return state
	}
}
