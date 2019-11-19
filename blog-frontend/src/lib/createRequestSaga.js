import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

export const createRequestActionTypes = type => {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE =`${type}_FAILURE`;
    return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type, request) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    return function*(action) {
        yield put(startLoading(type)); // start loading
        try {
            const response = yield call(request, action.payload);
            yield put({
                type: SUCCESS,
                payload: response,
            });
        } catch (e) {
            yield put({
                type: FAILURE,
                error: true,
                payload: e,
            });
        }
        yield put(finishLoading(type));  //finish loading
    };
}