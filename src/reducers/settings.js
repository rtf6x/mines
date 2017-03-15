import { CHANGE_SETTINGS, OPEN_SETTINGS, CLOSE_SETTINGS } from '../constants';

const settings = (state = {
  opened: false,
  rows: 10,
  cols: 10,
  mines: 10
}, action) => {
  switch (action.type) {
    case CHANGE_SETTINGS:
      return {
        ...action.settings,
        opened: false
      };
    case OPEN_SETTINGS:
      return {
        ...state,
        opened: true
      };
    case CLOSE_SETTINGS:
      return {
        ...state,
        opened: false
      };
    default:
      return state
  }
};

export default settings;