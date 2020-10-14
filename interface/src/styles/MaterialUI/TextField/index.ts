import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

export const TextFieldComponent = withStyles({
  root: {
    transition: 'var(--transition)',
    color: 'var(--input-label)',
    '& .MuiInputBase-root': {
      marginBottom: '20px !important',
      color: 'var(--text-color)',
    },
    '& .MuiInputLabel-outlined': {
      color: 'var(--input-label)',
      marginTop: '-6px',
      fontSize: '14px',
      fontFamily: 'var(--font-family)',
      fontWeight: 500,
      transition: 'var(--transition)',
      border: 'none !important',
    },
    '& label.Mui-focused': {
      color: 'var(--color-primary-lighter)',
      fontSize: '14px',
      transition: 'var(--transition)',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'var(--color-primary)',
      transition: 'var(--transition)',
    },
    '& .MuiOutlinedInput-adornedEnd': {
      paddingRight: '0px',
    },
    '& .MuiInputAdornment-root': {
      position: 'absolute',
      right: 0,
      height: '100%',
    },
    '& .MuiInputBase-input': {
      padding: '10px',
      height: '20px',
      fontSize: '14px',
      fontFamily: 'var(--font-family)',
      transition: 'var(--transition)',
    },
    '& .Mui-error': {
      '& .MuiInputBase-root': {
        color: 'red !important',
      },
    },
    '& .MuiInput-underline.Mui-error:after': {
      borderBottomColor: 'red',
      transition: 'var(--transition)',
    },
    '& .MuiOutlinedInput-root': {
      borderWidth: '1px !important',
      '&:hover fieldset': {
        borderWidth: '1px !important',
        borderColor: 'var(--color-primary)',
        transition: 'var(--transition)',
      },
      '&:focus fieldset': {
        borderWidth: '1px !important',
        borderColor: 'var(--color-primary)',
        transition: 'var(--transition)',
      },
      '& fieldset': {
        borderWidth: '1px !important',
        transition: 'var(--transition)',
        borderColor: 'var(--input-label)',
      },
      '&.Mui-focused fieldset': {
        borderWidth: '1px !important',
        border: `1px solid var(--color-primary)`,
        transition: 'var(--transition)',
      },
    },
    '& .MuiFormHelperText-root': {
      border: '0 !important',
      fontFamily: 'var(--font-family)',
      position: 'absolute',
      bottom: 0,
      fontSize: '12px !important',
    },
  },
})(TextField);

export default TextFieldComponent;
