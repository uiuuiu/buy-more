import API from '../utils/API';

export const GET_DATA_CONFIGURATION_FILE = 'GET_DATA_CONFIGURATION_FILE_PROGRESS';
export const GET_DATA_CONFIGURATION_FILE_SUCCESS = 'GET_DATA_CONFIGURATION_FILE_SUCCESS';
export const GET_DATA_CONFIGURATION_FILE_FAILED = 'GET_DATA_CONFIGURATION_FILE_FAILED';

export const GET_DATA_FILE = 'GET_DATA_FILE_PROGRESS';
export const GET_DATA_FILE_SUCCESS = 'GET_DATA_FILE_SUCCESS';
export const GET_DATA_FILE_FAILED = 'GET_DATA_FILE_FAILED';

export const GET_DATA_FILE_CONTENT = 'GET_DATA_FILE_CONTENT_PROGRESS';
export const GET_DATA_FILE_CONTENT_SUCCESS = 'GET_DATA_FILE_CONTENT_SUCCESS';
export const GET_DATA_FILE_CONTENT_FAILED = 'GET_DATA_FILE_CONTENT_FAILED';

export const GET_FILE_CONFIGURATION = 'GET_FILE_CONFIGURATION_PROGRESS';
export const GET_FILE_CONFIGURATION_SUCCESS = 'GET_FILE_CONFIGURATION_SUCCESS';
export const GET_FILE_CONFIGURATION_FAILED = 'GET_FILE_CONFIGURATION_FAILED';

export const GET_PAIRS = 'GET_PAIRS_PROGRESS';
export const GET_PAIRS_SUCCESS = 'GET_PAIRS_SUCCESS';
export const GET_PAIRS_FAILED = 'GET_PAIRS_FAILED';

export const CREATE_TRADE = 'CREATE_TRADE';
export const CREATE_TRADE_SUCCESS = 'CREATE_TRADE_SUCCESS';
export const CREATE_TRADE_FAILED = 'CREATE_TRADE_FAILED';

export const CREATE_DATA_FILE = "CREATE_DATA_FILE";
export const CREATE_DATA_FILE_SUCCESS = "CREATE_DATA_FILE_SUCCESS";
export const CREATE_DATA_FILE_FAILED = "CREATE_DATA_FILE_FAILED";

export const getDataConfigFile = () => {
    return (dispatch) => {

        return API.get(
            'https://www.googleapis.com/drive/v3/files?q=name%3D%22Trade%20diary%20data%22',
            {
                auth: true
            }
        ).then(response => {
            response.json().then(body => {
                if (body.files && body.files.length > 0) {
                    dispatch({ type: GET_DATA_CONFIGURATION_FILE_SUCCESS, data: { sheetId: body.files[0].id } })
                }
            })
        }).catch(err => {
            console.log('err', err)
            dispatch({ type: GET_DATA_CONFIGURATION_FILE_FAILED, data: null })
        })
    }
}

export const getDataFile = (dateString) => {
    return (dispatch) => {
        dispatch({ type: GET_DATA_FILE })

        return API.get(
            `https://www.googleapis.com/drive/v3/files?q=name%3D%22trading-data-${dateString}%22`,
            {
                auth: true
            }
        ).then(response => {
            response.json().then(body => {
                if (body.files && body.files.length > 0) {
                    dispatch({ type: GET_DATA_FILE_SUCCESS, data: { fileId: body.files[0].id } })
                } else {
                    dispatch({ type: GET_DATA_FILE_SUCCESS, data: { fileId: null } })
                }
            })
        }).catch(err => {
            console.log('err', err)
            dispatch({ type: GET_DATA_FILE_FAILED, data: null })
        })
    }
}

export const getDataFileContent = (fileId) => {
    return (dispatch) => {
        dispatch({ type: GET_DATA_FILE })

        return API.get(
            `https://sheets.googleapis.com/v4/spreadsheets/${fileId}/values/Trang%20tính1!A2:N`,
            {
                auth: true
            }
        ).then(response => {
            response.json().then(body => {
                if (body.values && body.values.length > 0) {
                    dispatch({ type: GET_DATA_FILE_CONTENT_SUCCESS, data: { values: body.values } })
                } else {
                    dispatch({ type: GET_DATA_FILE_CONTENT_SUCCESS, data: { values: [] } })
                }
            })
        }).catch(err => {
            console.log('err', err)
            dispatch({ type: GET_DATA_FILE_CONTENT_FAILED, data: null })
        })
    }
}

export const getConfigFile = () => {
    return (dispatch) => {

        return API.get(
            `https://www.googleapis.com/drive/v3/files?q=name%3D%22trading-diary-configuration%22`,
            {
                auth: true
            }
        ).then(response => {
            response.json().then(body => {
                if (body.files && body.files.length > 0) {
                    dispatch({ type: GET_FILE_CONFIGURATION_SUCCESS, data: { fileId: body.files[0].id } })
                }
            })
        }).catch(err => {
            console.log('err', err)
            dispatch({ type: GET_FILE_CONFIGURATION_FAILED, data: null })
        })
    }
}

export const getPairs = (fileId) => {
    return (dispatch) => {

        return API.get(
            `https://sheets.googleapis.com/v4/spreadsheets/${fileId}/values/Pairs!A2:N`,
            {
                auth: true
            }
        ).then(response => {
            response.json().then(body => {
                if (body.values && body.values.length > 0) {
                    dispatch({ type: GET_PAIRS_SUCCESS, data: { values: body.values } })
                }
            })
        }).catch(err => {
            console.log('err', err)
            dispatch({ type: GET_PAIRS_FAILED, data: null })
        })
    }
}

export const createTrade = (trade, fileId) => {
    return (dispatch) => {
        dispatch({ type: CREATE_TRADE })

        return API.post(
            `https://sheets.googleapis.com/v4/spreadsheets/${fileId}/values/A2:N:append?valueInputOption=RAW`,
            {
                data: {
                    values: [trade.toSheetData()],
                    majorDimension: 'ROWS',
                },
                auth: true
            }
        ).then(response => {
            response.json().then(() => {
                dispatch({ type: CREATE_TRADE_SUCCESS, data: { trade: trade } })
            })
        }).catch(err => {
            console.log('err', err)
            dispatch({ type: CREATE_TRADE_FAILED, data: null })
        })

    }
}

export const createDataFile = (dateString) => {
    return (dispatch) => {
        dispatch({ type: CREATE_DATA_FILE });

        return API.post(
            `https://www.googleapis.com/drive/v3/files/1YCAU6sL-0KOVDCOiFmpwzYmGAJeg414t8M2GC9aa67A/copy`,
            {
                data: {
                    name: `trading-data-${dateString}`,
                    parents: ["1ZwQUnqX17DBzLn3qbPdgm2x5P7p2czXE"]
                },
                auth: true
            }
        ).then(response => {
            response.json().then(body => {
                dispatch({ type: CREATE_DATA_FILE_SUCCESS, data: { fileId: body.id } })
            })
        }).catch(err => {
            console.log('err', err)
            dispatch({ type: CREATE_DATA_FILE_FAILED, data: null })
        })
    }
}
