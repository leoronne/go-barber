import { Select } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const SelectComponent = withStyles({
  root: {
    backgroundColor: 'var(--color-white)',
    padding: '10px !important',
    paddingRight: '26px !important',
    fontSize: '14px',
    fontFamily: 'var(--font-family)',
    transition: 'var(--transition)',
    '&.MuiInputLabel-outlined': {
      marginTop: '-6px',
      fontWeight: 500,
      transition: 'var(--transition)',
      border: 'none !important',
    },
    '&.MuiOutlinedInput-root': {
      '& fieldset': {
        transition: 'var(--transition)',
      },
      '&:hover fieldset': {
        borderColor: 'var(--color-primary)',
        transition: 'var(--transition)',
      },
      '&.MuiMenuItem-root': {
        fontFamily: 'var(--font-family)',
        padding: '10px',
      },
    },
    '&.MuiPaper-root': {
      fontFamily: 'var(--font-family)',
      padding: '10px',
    },
  },
})(Select);

export default SelectComponent;
