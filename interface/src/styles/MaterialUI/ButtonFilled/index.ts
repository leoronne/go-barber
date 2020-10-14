import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const ButtonFilled = withStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'var(--color-primary)',
    border: `1px solid var(--color-primary)`,
    outline: 0,
    width: '100%',
    borderRadius: 'var(--border-radius)',
    fontFamily: 'var(--font-family)',
    fontSize: '14px',
    color: 'var(--color-white)',
    height: '40px',
    cursor: 'pointer',
    fontWeight: 500,
    '&:hover': {
      background: 'var(--color-primary)',
      color: 'var(--color-white)',
    },
    '&:focus': {
      background: 'var(--color-primary)',
      color: 'var(--color-white)',
    },
    '&:disabled': {
      background: 'transparent',
      color: 'var(--disabled)',
      border: '1px solid var(--disabled)',
      cursor: 'not-allowed',
    },
  },
})(Button);

export default ButtonFilled;
