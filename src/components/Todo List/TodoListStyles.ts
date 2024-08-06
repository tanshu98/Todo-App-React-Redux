
import { SxProps, Theme } from '@mui/system';

export const todoListStyles: Record<string, SxProps<Theme>> = {
  container: {
    maxWidth: 800,
    margin: '0 auto',
    padding: 3,
    boxShadow: 3,
    borderRadius: 2,
    backgroundColor: 'background.paper',
    position: 'relative',
    minHeight: '80vh',
  },
  heading: {
    marginBottom: 2,
    fontWeight: 'bold',
  },
  listItem: {
    borderBottom: 1,
    borderColor: 'divider',
    paddingY: 1,
    '&:last-of-type': {
      borderBottom: 'none',
    },
    backgroundColor: 'background.default',
    borderRadius: 1,
    '&:hover': {
      backgroundColor: 'action.hover',
    },
  },
  listItemText: {
    '& .MuiListItemText-primary': {
      fontWeight: 'bold',
      color: 'text.primary',
    },
    '& .MuiListItemText-secondary': {
      color: 'text.secondary',
    },
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    width: '250px',
    textAlign: 'left',
    marginRight: 3,
    '&:hover': {
      textOverflow: 'initial',
      overflow: 'auto',
      whiteSpace: 'normal',
    },
  },
  editButton: {
    color: 'primary.main',
    '&:hover': {
      color: 'primary.dark',
    },
  },
  deleteButton: {
    color: 'error.main',
    '&:hover': {
      color: 'error.dark',
    },
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'background.default',
  },
  errorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'background.default',
    padding: 2,
  },
};
