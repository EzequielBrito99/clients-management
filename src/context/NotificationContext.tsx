import React, { createContext, useContext, useState, ReactNode } from 'react';
import CustomSnackbar from '../components/CustomSnackbar';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationContextData {
  notify: (message: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextData>({} as NotificationContextData);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    type: NotificationType;
  }>({
    open: false,
    message: '',
    type: 'success',
  });

  const notify = (message: string, type: NotificationType = 'success') => {
    setNotification({
      open: true,
      message,
      type,
    });
  };

  const handleClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <CustomSnackbar 
        open={notification.open}
        message={notification.message}
        severity={notification.type}
        handleClose={handleClose}
      />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);