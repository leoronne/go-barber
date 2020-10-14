import { FormControl } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

export const FormControlContainer = withStyles({
  root: {
    fontSize: '14px',
    fontFamily: 'var(--font-family)',
    transition: 'var(--transition)',
    borderWidth: '1px !important',
    height: '40px',
    '&:hover': {
      borderColor: `var(--color-primary) !important`,
      transition: 'var(--transition)',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: '1px !important',
      borderColor: `var(--color-primary) !important`,
      transition: 'var(--transition)',
    },
    '& .MuiOutlinedInput-root fieldset': {
      borderWidth: '1px !important',
      transition: 'var(--transition)',
    },
    '& .MuiOutlinedInput-root:hover fieldset': {
      borderColor: `var(--color-primary) !important`,
      transition: 'var(--transition)',
    },
    '& .MuiFormLabel-root': {
      fontWeight: 500,
      transform: 'translate(14px, 13px) scale(1) !important',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '80%',
    },
    '& .MuiSelect-icon': {
      top: '0 !important',
      height: '100%',
    },
    '& .MuiFormLabel-root.MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75) !important',
    },
  },
})(FormControl);

export default FormControlContainer;
