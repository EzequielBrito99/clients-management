import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

interface CustomSnackbarProps {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
  handleClose: () => void;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({ open, message, severity, handleClose }) => {
  return (
    <Snackbar 
      open={open} 
      autoHideDuration={4000} 
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;