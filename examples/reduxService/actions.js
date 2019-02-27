import axios from 'axios';
import * as types from './types';
import { API } from '../../utils/constants';

export const getreduxService = () => {
	return dispatch => {
		dispatch({ type: TYPES.GET_REDUX_SERVICE_PENDING });

		axios
			.get(`${API}/reduxservice`)
			.then(response => {
				dispatch({
					type: TYPES.GET_REDUX_SERVICE_SUCCESS,
					payload: response.data
				})
			})
			.catch(error => {
				dispatch({
					type: TYPES.GET_REDUX_SERVICE_ERROR,
					payload: error
				})
			})
	}
};

