import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const ButtonOutlined = withStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'transparent',
    border: `1px solid var(--color-primary)`,
    outline: 0,
    width: '100%',
    borderRadius: 'var(--border-radius)',
    fontFamily: 'var(--font-family)',
    fontSize: '14px',
    color: 'var(--color-primary-lighter)',
    height: '40px',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'var(--transition)',
    '&:hover': {
      transition: 'var(--transition)',
      background: 'var(--color-primary)',
      color: 'var(--color-white)',
    },
    '&:hover svg': {
      transition: 'var(--transition)',
      color: 'var(--color-white)',
    },
    '&:focus': {
      transition: 'var(--transition)',
      background: 'var(--color-primary)',
      color: 'var(--color-white)',
    },
    '&:focus svg': {
      transition: 'var(--transition)',
      color: 'var(--color-white)',
    },
    '&:disabled': {
      color: 'var(--disabled)',
      border: '1px solid var(--disabled)',
      cursor: 'not-allowed',
    },
  },
})(Button);

export default ButtonOutlined;
