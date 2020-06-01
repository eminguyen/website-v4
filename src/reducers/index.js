import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import ProgressReducer from './ProgressReducer';

export default history =>
  combineReducers({
    progress: ProgressReducer,
    router: connectRouter(history),
  });
