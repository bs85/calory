export const TYPE_SUCCESS = 'SUCCESS';

const Notification = {
    getId(notification) {
        return notification.id;
    },

    getType(notification) {
        return notification.type;
    },

    getMessage(notification) {
        return notification.message;
    },
};

export default Notification;
