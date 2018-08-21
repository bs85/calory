import Notification from 'modules/notification';

const getSubstate = (state) => state.notification;

export function getNotifications(state) {
    return getSubstate(state).notifications;
}

export function getNotification(state, id) {
    return getNotifications(state).find((notification) => Notification.getId(notification) === id);
}
