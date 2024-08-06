// styles.ts
import { SxProps, Theme } from '@mui/system';

export const addTodoStyles: Record<string, SxProps<Theme>> = {
  container: {
    maxWidth: 600,
    margin: '0 auto',
    padding: 3,
    boxShadow: 3,
    borderRadius: 2,
    backgroundColor: 'background.paper',
  },
  heading: {
    marginBottom: 2,
  },
  textFieldContainer: {
    marginBottom: 2,
  },
  textField: {
    marginBottom: 2,
    backgroundColor: 'background.default',
    borderRadius: 1,
  },
  checkbox: {
    color: 'primary.main',
  },
  formControlLabel: {
    marginBottom: 2,
  },
  button: {
    width: '100%',
    padding: '10px',
    borderRadius: 1,
  },
  snackbar: {
    marginTop: 2,
  },
};
