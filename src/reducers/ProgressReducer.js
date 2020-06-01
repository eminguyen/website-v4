import { SET_PROGRESS } from '../actions/types';

const initialState = {
  progress: 0
};

const ProgressReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROGRESS:
      return {
        ...state,
        progress: action.payload
      }
    default:
        return state;
  }
};

export default ProgressReducer;
