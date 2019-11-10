import axios from 'axios';
import { FEATCH_STATUSES_TO_DISPALY, REGISTER_USER } from './types';

// export const fetchStatusesToDisplay = () => async dispatch => {
//   const res = await axios.get('/api/users/statues_to_display');

//   dispatch({ type: FEATCH_STATUSES_TO_DISPALY, payload: res.data });
// };

export const registerUser = values => async dispatch => {
  const res = await axios.post('/api/users', values);

  dispatch({
    type: REGISTER_USER,
    payload: { token: res.data, user: values }
  });
};
