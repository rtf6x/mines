import { combineReducers } from 'redux';

import game from './game';
import settings from './settings';

const Reducers = combineReducers({
  game,
  settings,
});

export default Reducers;
