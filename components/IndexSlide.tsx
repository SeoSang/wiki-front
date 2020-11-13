import Carousel from 'react-material-ui-carousel';
import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import { Subject } from '..';

const COUNT = 3;

const LOGIN_NEEDED_CARD = [
  { id: '0', name: '로그인이 필요합니다.', professor: '로그인해줘잉' },
];

// count개씩 묶어주는 함수
const bind3Subject = (subjects: Subject[], count: number) => {
  if (subjects.length <= count) return [subjects];
  const newSubjects = [];
  for (let i = 0; i < Math.floor(subjects.length / count); i++) {
    const j = i * count;
    newSubjects.push([subjects[j], subjects[j + 1], subjects[j + 2]]);
  }
  // 3개씩 묶고 남은 것들 처리
  let rest = Math.floor(subjects.length / count) * count;
  const rests = [];
  while (rest < subjects.length) {
    rests.push(subjects[rest]);
    rest++;
  }
  if (rests.length > 0) newSubjects.push(rests);
  return newSubjects;
};

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

function Item({ item }: { item: Subject[] }) {
  const classes = useStyles();

  return (
    <Paper className={classes.slide}>
      <Grid container spacing={0}>
        {item.map((subject, i) => (
          <Grid
            key={`${subject.name}_${i}`}
            item
            xs={Math.floor(12 / item.length) as any}
          >
            <div className={classes.cardWrapper}>
              <Typography variant="h6">{subject.name}</Typography>
              <Typography variant="subtitle1">{subject.professor}</Typography>
              <Button color="secondary" className="CheckButton">
                Check it out!
              </Button>
            </div>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
const IndexSlide = ({ subjects }: { subjects: Subject[] }) => {
  const classes = useStyles();

  return (
    <Carousel
      navButtonsAlwaysVisible={true}
      animation="slide"
      className={classes.carousel}
    >
      {bind3Subject(subjects ? subjects : LOGIN_NEEDED_CARD, COUNT).map(
        (subject, i) => (
          <>
            <Item key={`${subject[0].name}_${i}`} item={subject} />
          </>
        )
      )}
    </Carousel>
  );
};

export default IndexSlide;
