import { createStyles, makeStyles, Theme } from '@material-ui/core';
export const useDivStyles = makeStyles((theme: Theme) =>
  createStyles({
    centerFlex: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    coloumCenterFlex: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
  })
);

export const useTypicalStyles = makeStyles((theme: Theme) =>
  createStyles({
    center: {
      textAlign: 'center',
    },
    marginOne: {
      margin: theme.spacing(1),
    },
    marginTwo: {
      margin: theme.spacing(2),
    },
    marginThree: {
      margin: theme.spacing(3),
    },
    marginFour: {
      margin: theme.spacing(4),
    },
    paddingOne: {
      padding: theme.spacing(1),
    },
    paddingTwo: {
      padding: theme.spacing(2),
    },
    paddingThree: {
      padding: theme.spacing(3),
    },
    paddingFour: {
      padding: theme.spacing(4),
    },
  })
);
