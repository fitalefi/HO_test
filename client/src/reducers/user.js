import {
  FEATCH_STATUSES_TO_DISPALY,
  REGISTER_USER,
  LOGIN_BY_EMAIL
} from '../actions/types';

export default function(
  state = { statuses_to_display: null, users: null, user: null, token: null },
  action
) {
  switch (action.type) {
    case FEATCH_STATUSES_TO_DISPALY:
      return { ...state, statuses_to_display: action.payload };
    case REGISTER_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token
      };
    default:
      return state;
  }
}
