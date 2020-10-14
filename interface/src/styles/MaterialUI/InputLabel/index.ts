import { InputLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

export const InputLabelContainer = withStyles({
  root: {
    fontSize: '14px',
    fontFamily: 'var(--font-family)',
    transition: 'var(--transition)',
    '&:hover': {
      color: 'var(--color-primary)',
      transition: 'var(--transition)',
    },
    '&:focus': {
      color: 'var(--color-primary)',
      transition: 'var(--transition)',
    },
    '& .Mui-focused': {
      color: `var(--color-primary) !important`,
    },
  },
  focused: {
    color: `var(--color-primary) !important`,
    borderColor: 'var(--color-primary)',
    transition: 'var(--transition)',
  },
  outlined: {
    borderColor: 'var(--color-primary)',
    transition: 'var(--transition)',
    '& .Mui-focused': {
      color: `var(--color-primary) !important`,
    },
  },
})(InputLabel);

export default InputLabelContainer;
