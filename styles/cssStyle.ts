import { createStyles, makeStyles, Theme } from '@material-ui/core';
export const useTypicalStyles = makeStyles((theme: Theme) =>
  createStyles({
    centerFlex: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    slide: {
      padding: theme.spacing(2),
    },
  })
);
