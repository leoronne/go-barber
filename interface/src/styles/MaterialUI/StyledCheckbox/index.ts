import { Checkbox } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledCheckbox = withStyles({
  root: {
    outline: 0,
    color: 'var(--color-primary)',
    cursor: 'pointer',
    width: '25px',
    height: '25px',
    '& svg': {
      width: '15px',
      height: '15px',
    },
    '&$checked': {
      color: 'var(--color-primary)',
    },
  },
  checked: {},
})(Checkbox);

export default StyledCheckbox;
