import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import auth, { authSaga } from './auth';

const rootReducer = combineReducers({
    auth,
    loading
});

export function* rootSaga(){
   yield all([authSaga()]);
}
export default rootReducer;