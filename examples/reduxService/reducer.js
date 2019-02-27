import * as TYPES from './types';

const initialState = {
	isLoading: false,
	reduxService: {}
}

export const reduxServiceReducer = (state = initialState, action) => {
	switch (action.type) {
		/**
		 * GET_REDUX_SERVICE
		 */
		case TYPES.GET_REDUX_SERVICE_PENDING:
			return {
				...state,
				isLoading: true
			};
		case TYPES.GET_REDUX_SERVICE_SUCCESS:
			return {
				...state,
				isLoading: false,
				reduxService: action.payload
			};
		case TYPES.GET_REDUX_SERVICE_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.payload
			};

		default:
      return state;
	}
};

