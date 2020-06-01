import { SET_PROGRESS } from './types';

export const setProgress = (progress) =>  async dispatch => {
  dispatch({
    type: SET_PROGRESS,
    payload: progress
  });
}
