import MuiDialogTitle from '@material-ui/core/DialogTitle';

import { withStyles } from '@material-ui/core/styles';

export const DialogTitleContainer = withStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: 'var(--font-family)',
    fontWeight: 600,
    color: 'var(--color-primary)',
    '& .padding-30': {
      padding: '30px !important',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '& button': {
        marginLeft: '25px',
      },
    },
    '& .MuiTypography-h6': {
      fontWeight: 600,
      fontFamily: 'var(--font-family)',
    },
    '& svg': {
      cursor: 'pointer',
    },
  },
})(MuiDialogTitle);

export default DialogTitleContainer;
