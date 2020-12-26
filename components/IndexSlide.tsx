import Carousel from 'react-material-ui-carousel';
import {
  Button,
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import { FC } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useDivStyles, useTypicalStyles } from '../styles/cssStyle';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import { useDispatch } from 'react-redux';
import { deleteFavorite } from '../features/user/action';
import { SubjectInfo } from '../features/subject/type';

const COUNT = 3;

const LOGIN_NEEDED_CARD = [
  { id: '0', name: '로그인이 필요합니다.', professor: '로그인해줘잉' },
];

// count개씩 묶어주는 함수
const bind3Subject = (subjects: SubjectInfo[], count: number) => {
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
    deleteButton: {
      cursor: 'pointer',
    },
    deletableTitleContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    titleContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
  })
);

interface ItemProps {
  item: SubjectInfo[];
  deleteable?: boolean;
}

const Item: FC<ItemProps> = ({ item, deleteable }) => {
  const classes = useStyles();
  const div = useDivStyles();
  const typ = useTypicalStyles();
  const dispatch = useDispatch();

  const onClickDelete = (favoriteId: number) => () => {
    dispatch(deleteFavorite({ favoriteId }));
  };

  return (
    <Paper className={classes.slide}>
      <Grid container spacing={0}>
        {item.map((subject, i) => (
          <Grid
            key={`${subject.subjectName}_${i}`}
            item
            xs={Math.floor(12 / item.length) as any}
          >
            <div className={classes.cardWrapper}>
              <div
                className={
                  deleteable
                    ? classes.deletableTitleContainer
                    : classes.titleContainer
                }
              >
                {deleteable ? (
                  <IconButton
                    color="secondary"
                    className={classes.deleteButton}
                  >
                    <BookmarksIcon></BookmarksIcon>
                  </IconButton>
                ) : (
                  ''
                )}
                <Typography variant="h6">{subject.subjectName}</Typography>
                {deleteable ? (
                  <IconButton
                    color="secondary"
                    className={classes.deleteButton}
                    onClick={onClickDelete(subject.favoriteId)}
                  >
                    <CloseIcon></CloseIcon>
                  </IconButton>
                ) : (
                  ''
                )}
              </div>
              <Typography variant="subtitle1" className={typ.botMarginOne}>
                {subject.professor}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                className="CheckButton"
                style={{ color: 'white' }}
              >
                자세히보기
              </Button>
            </div>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

interface SlideProps {
  subjects: Subject[];
  deleteable?: boolean;
}

const IndexSlide: FC<SlideProps> = ({ subjects, deleteable }) => {
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
            <Item
              key={`${subject[0].name}_${i}`}
              item={subject}
              deleteable={deleteable}
            />
          </>
        )
      )}
    </Carousel>
  );
};

export default IndexSlide;
