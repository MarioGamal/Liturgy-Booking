import dotProp from 'dot-prop-immutable';
import { SET_AUTH, EDIT_AUTH, REMOVE_AUTH } from '../actions/auth';

const initialState = {
    username: {
        value: '',
        validationMsg: ''
    },
    password: {
        value: '',
        validationMsg: ''
    },
    isAdmin: false,
    rightCredentials: {
        username: 'stgeorgemsadr',
        password: 'stgeorgemsadr123!@#'
    }
}
const auth = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_AUTH: {
            const { root, value } = action.payload;
            const existValue = dotProp.get(state, root)
            state = dotProp.set(state, root, { ...existValue, ...value })
            return { ...state };
        }

        case SET_AUTH: {
            const { root, value } = action.payload;
            state = dotProp.set(state, root, value)
            return { ...state };
        }

        case REMOVE_AUTH: {
            const { root } = action.payload;
            state = dotProp.delete(state, root)
            return { ...state };
        }
        default:
            return { ...state };
    }
};
export default auth;