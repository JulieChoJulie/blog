import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHANGED_FIELD = 'auth/CHANGED_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

export const changeField = createAction(
    CHANGED_FIELD,
    ({ form, key, value }) =>  ({
            form, // register, login
            key, // username, password, passwordconfirm
            value, // value we want to change to
    })
);

export const initializeForm = createAction(INITIALIZE_FORM, form => form); // register

const initialState = {
    register: {
        username: '',
        passowrd: '',
        passwordConfirm: '',
    },
    login: {
        username: '',
        password: '',
    }
};

const auth = handleActions(
    {
        [CHANGED_FIELD]: (state, { payload: { form, key, value }}) =>
            produce(state, draft => {
                draft[form][key] = value; // ex. state.register.username = new value

            }),
        [INITIALIZE_FORM]: (state, { payload: form }) => ({
            ...state,
            [form] : initialState[form],
        }),
        initialState,
    },
    initialState,
);

export default auth;