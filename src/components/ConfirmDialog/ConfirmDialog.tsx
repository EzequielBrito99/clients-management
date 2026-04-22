import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box
} from '@material-ui/core';
import { WarningRounded as WarningIcon } from '@material-ui/icons';
import { useStyles } from './ConfirmDialog.styles';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onClose: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open, title, description, onConfirm, onClose, loading, disabled
}) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <Box className={classes.dialogWrapper}>
        <DialogTitle>
          <Box className={classes.dialogTitle}>
            <WarningIcon className={classes.warningIcon} />
            <Typography variant="h6">{title}</Typography>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Typography variant="body1">{description}</Typography>
        </DialogContent>

        <DialogActions className={classes.actions}>
          <Button
            onClick={onClose}
            color="default"
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            variant="contained"
            disabled={loading || disabled}
            className={classes.deleteButton}
          >
            {loading ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ConfirmDialog;