import { DialogActions } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

export const DialogActionsContainer = withStyles({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})(DialogActions);

export default DialogActionsContainer;
