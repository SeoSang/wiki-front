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
    // margin
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
    botMarginOne: {
      marginBottom: theme.spacing(1),
    },
    botMarginTwo: {
      marginBottom: theme.spacing(2),
    },
    botMarginThree: {
      marginBottom: theme.spacing(3),
    },
    botMarginFour: {
      marginBottom: theme.spacing(4),
    },
    topMarginOne: {
      marginTop: theme.spacing(1),
    },
    topMarginTwo: {
      marginTop: theme.spacing(2),
    },
    topMarginThree: {
      marginTop: theme.spacing(3),
    },
    topMarginFour: {
      marginTop: theme.spacing(4),
    },
    // padding
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
    botPaddingOne: {
      paddingBottom: theme.spacing(1),
    },
    botPaddingTwo: {
      paddingBottom: theme.spacing(2),
    },
    botPaddingThree: {
      paddingBottom: theme.spacing(3),
    },
    botPaddingFour: {
      paddingBottom: theme.spacing(4),
    },
    topPaddingOne: {
      paddingTop: theme.spacing(1),
    },
    topPaddingTwo: {
      paddingTop: theme.spacing(2),
    },
    topPaddingThree: {
      paddingTop: theme.spacing(3),
    },
    topPaddingFour: {
      paddingTop: theme.spacing(4),
    },
  })
);
