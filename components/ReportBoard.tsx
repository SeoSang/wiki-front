import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Button,
  List,
  IconButton,
  Typography,
  Popover,
} from '@material-ui/core/';
import { Paper } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { useTypedSelector } from '../features';
import { useRouter } from 'next/dist/client/router';
import { getAllReports } from '../features/admin/action';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { CheckCircleOutline } from '@material-ui/icons';
import { usePaddingStyles } from '../styles/cssStyle';
import _ from 'lodash';
import clsx from 'clsx';
import moment from 'moment';

const tableStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  rows: {
    backgroundColor: '#c9cbff',
  },
  evenrows: {
    backgroundColor: '#eff8ff',
  },
  pagebuttons: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '10px',
  },
  popover: {
    overflow: 'auto',
  },
});

const columns = [
  '접수번호',
  '신고자',
  '신고대상',
  '신고내용',
  '신고날짜',
  '처리유무',
];
const PAGE_PER_BOARDS = 3;

const dummy_reports = [
  {
    reportId: 1,
    reportUserId: 2,
    reportedUserId: 3,
    reportContent: '쟤가 나 때렸어!!!!!',
    reportedDate: 3,
  },
  {
    reportId: 2,
    reportUserId: 2,
    reportedUserId: 3,
    reportContent:
      '쟤가 나 때렸어!!!!! 긴 내용@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
    reportedDate: 3,
  },
  {
    reportId: 3,
    reportUserId: 2,
    reportedUserId: 3,
    reportContent: '쟤나때 짧은내용',
    reportedDate: 3,
  },
  {
    reportId: 4,
    reportUserId: 2,
    reportedUserId: 3,
    reportContent:
      '쟤나때 완전긴내용 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#############',
    reportedDate: 3,
  },
];

export default function ReportBoard() {
  const pad = usePaddingStyles();

  const dispatch = useDispatch();
  const { reports } = useTypedSelector((state) => state.admin);
  const tab = tableStyles();
  const router = useRouter();
  const pages = 15 / PAGE_PER_BOARDS;
  const [pagearray, setPagearray] = useState<number[]>([]);
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [anchorEls, setAnchorEls] = React.useState<(HTMLElement | null)[]>(
    _.fill(Array(dummy_reports.length), null)
  );
  // console.log(moment(1607266800000).format('LLL'));

  const handlePopoverOpen = (index: number) => (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEls([
      ...anchorEls.slice(0, index),
      event.currentTarget,
      ...anchorEls.slice(index + 1, anchorEls.length),
    ]);
    setPopupOpen(true);
  };

  const handlePopoverClose = (index: number) => () => {
    setAnchorEls([
      ...anchorEls.slice(0, index),
      null,
      ...anchorEls.slice(index + 1, anchorEls.length),
    ]);
    setPopupOpen(false);
  };

  // useEffect(() => {
  //   dispatch(getAllReports({}));
  // }, []);

  // useEffect(() => {
  //   setPagearray([]);
  //   for (let i: number = 1; i < pages + 1; i++) {
  //     setPagearray((pagearray) => pagearray.concat(i));
  //   }
  // }, [total]);
  // const onClickPost = (reportId: number) => () => {
  //   router.push({ pathname: '/post/', query: { id: reportId } });
  // };
  // const changePage = (value: number) => {
  //   // router.push({ pathname: '/board/', query: { page: value } });
  //   dispatch(
  //     loadPosts({
  //       page: value,
  //     })
  //   );
  // };
  return (
    <div className={tab.root}>
      <Table size="small" component={Paper}>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={`col_${col.toLowerCase()}`} align="center">
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dummy_reports?.map((rp, index) => (
            <TableRow
              key={`table_key_${rp.reportId}`}
              className={rp.reportId % 2 == 0 ? tab.evenrows : tab.rows}
            >
              <TableCell align="center">{rp.reportId}</TableCell>
              <TableCell align="center">{rp.reportUserId}</TableCell>
              <TableCell align="center">{rp.reportedUserId}</TableCell>
              <TableCell
                onMouseEnter={handlePopoverOpen(index)}
                onMouseLeave={handlePopoverClose(index)}
                aria-owns={
                  Boolean(anchorEls[index]) ? 'mouse-over-popover' : undefined
                }
                aria-haspopup="true"
                align="center"
              >
                <Typography variant="body2">
                  {rp.reportContent.length > 10
                    ? rp.reportContent.slice(0, 10).concat(' ...')
                    : rp.reportContent}
                </Typography>
                <Popover
                  id="mouse-over-popover"
                  classes={{
                    paper: clsx(pad.pad1, tab.popover),
                  }}
                  open={Boolean(anchorEls[index])}
                  anchorEl={anchorEls[index]}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={handlePopoverClose(index)}
                  disableRestoreFocus
                >
                  <Typography>{rp.reportContent}</Typography>
                </Popover>
              </TableCell>
              <TableCell align="center">{rp.reportedDate}</TableCell>
              <TableCell align="center">
                <IconButton aria-label="accept">
                  <CheckCircleOutline color="primary" />
                </IconButton>
                <IconButton aria-label="reject">
                  <HighlightOffIcon color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div></div>
      <div className={tab.pagebuttons}>
        {pagearray.map((value) => (
          <List className={tab.pagebuttons} key={value}>
            <Button onClick={() => {}}>{value}</Button>
          </List>
        ))}
      </div>
      {popupOpen ? (
        <Typography variant="caption">클릭을 통해 끄세요</Typography>
      ) : (
        ''
      )}
    </div>
  );
}
