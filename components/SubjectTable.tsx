import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Subject } from '..';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // TODO: refactor common css styles (e.g. SubjectTable and SearchBar)
      padding: '2px 4px',
      width: '80%',
      marginTop: theme.spacing(3),
    },
  })
);

const SubjectTable = ({ subjects }: { subjects: Subject[] }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table aria-label="subject table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Subject</TableCell>
            <TableCell align="center">Professor</TableCell>
            <TableCell align="center">Favorite</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subjects.map((subject, i) => (
            <TableRow key={subject.id}>
              <TableCell align="center">{subject.name}</TableCell>
              <TableCell align="center">{subject.professor}</TableCell>
              <TableCell align="center">*</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubjectTable;
