import Carousel from 'react-material-ui-carousel';
import {
  Button,
  createStyles,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    slide: {
      padding: theme.spacing(2),
    },
    cardWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    carousel: {
      width: '100%',
    },
  })
);

function Item({ item }: { item: Subject }) {
  const classes = useStyles();

  return (
    <Paper className={classes.slide}>
      <div className={classes.cardWrapper}>
        <Typography variant="h5">{item.name}</Typography>
        <Typography variant="h6">{item.professor}</Typography>
        <Button color="secondary" className="CheckButton">
          Check it out!
        </Button>
      </div>
    </Paper>
  );
}
const IndexSlide = ({ subjects }: { subjects: Subject[] }) => {
  const classes = useStyles();

  return (
    <Carousel animation="slide" className={classes.carousel}>
      {subjects.map((subject, i) => (
        <Item key={`${subject.name}_${i}`} item={subject} />
      ))}
    </Carousel>
  );
};

export default IndexSlide;
