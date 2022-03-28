import { Store } from 'react-notifications-component';

export const NOTIFICATION_TYPE = {
  SUCCESS: 'success',
  ERROR: 'danger',
  INFO: 'info',
  WARNING: 'warning',
};

const NOTIFICATION_DURATION = 5000;
const addNotification = (
  message,
  type = NOTIFICATION_TYPE.INFO,
  title = 'Notification',
  duration = NOTIFICATION_DURATION,
) => {
  Store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: 'bottom',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__fadeInRight'],
    animationOut: ['animate__animated', 'animate__fadeOutRight'],
    dismiss: {
      duration,
      onScreen: false,
      click: true,
      touch: true,
      showIcon: true,
    },
  });
};

export default addNotification;
