import { combineReducers } from 'redux';

import user from 'store/user/reducer';
import notification from 'store/notification/reducer';

export default combineReducers({
    user,
    notification,
});
