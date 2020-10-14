import { DialogContentText } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

export const DialogContentTextContainer = withStyles({
  root: {
    fontFamily: 'var(--font-family)',
    fontSize: '16px',
    color: 'var(--text-color)',
  },
})(DialogContentText);

export default DialogContentTextContainer;
