import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
    flexWrap: 'wrap',
    gap: theme.spacing(2)
  },
  pageTitle: {
    fontWeight: 700,
    color: theme.palette.primary.dark,
  },
  filterPaper: {
    padding: theme.spacing(2.5),
    marginBottom: theme.spacing(3),
    borderRadius: 12,
  },
  searchButton: {
    borderRadius: 8,
    padding: '7px 16px',
  },
  actionButtons: {
    display: 'flex',
    gap: theme.spacing(2)
  },
  addClient: { borderRadius: 8, padding: '10px 20px' },
  goHome: { borderRadius: 8, padding: '10px 20px' },

  tableContainer: {
    borderRadius: 12,
    maxHeight: 'calc(100vh - 320px)',
    overflowY: 'auto',
    boxShadow: theme.shadows[3],
    [theme.breakpoints.down('sm')]: {
      maxHeight: 'calc(100vh - 100px)',
    },

    '&::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      border: '2px solid transparent',
      backgroundClip: 'content-box',
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },

    scrollbarWidth: 'thin',
    scrollbarColor: `#ccc #f1f1f1`,
  },
  table: {
    minWidth: 650,
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light,
    borderRight: '1px solid rgb(00,00,00, 0.2)',
    padding: '15px 30px',
  },

  tableBodyCell: {
    padding: '0 30px',
    borderRight: '1px solid rgb(00,00,00, 0.2)'
  },
  tableRow: {
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.grey[50],
    },
    '&:hover': {
      backgroundColor: `${theme.palette.primary.main}08 !important`,
      transition: 'background-color 0.2s ease',
    },
  },
  actionTableButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '3px',
    opacity: '0.7'
  }
}));