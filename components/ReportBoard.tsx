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
  Popper,
  Card,
} from '@material-ui/core/';
import { Paper } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { useTypedSelector } from '../features';
import { useRouter } from 'next/dist/client/router';
import { approveReport, getAllReports } from '../features/admin/action';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { CheckCircleOutline } from '@material-ui/icons';
import { usePaddingStyles } from '../styles/cssStyle';
import _ from 'lodash';
import clsx from 'clsx';

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
const PAGE_PER_BOARDS = 10;
const AMOUNT_PER_BOARDS = 10;

export default function ReportBoard() {
  const pad = usePaddingStyles();

  const dispatch = useDispatch();
  const { reports, reportsTotal } = useTypedSelector(state => state.admin);
  const tab = tableStyles();
  const router = useRouter();
  const [pagearray, setPagearray] = useState<number[]>([]);
  const [popupOpen, setPopupOpen] = useState<boolean[]>(
    _.fill(Array(reports?.length), false)
  );
  const [anchorEls, setAnchorEls] = React.useState<(HTMLElement | null)[]>(
    _.fill(Array(reports?.length), null)
  );
  const [popperAnchorEls, setPopperAnchorEls] = React.useState<
    (HTMLElement | null)[]
  >(_.fill(Array(reports?.length), null));
  // console.log(moment(1607266800000).format('LLL'));

  useEffect(() => {
    dispatch(getAllReports({ page: 1, amount: AMOUNT_PER_BOARDS }));
  }, []);

  useEffect(() => {
    const pages = Math.ceil(reportsTotal / PAGE_PER_BOARDS);
    setPagearray([]);
    for (let i: number = 1; i < pages + 1; i++) {
      setPagearray(pagearray => pagearray.concat(i));
    }
    setAnchorEls(_.fill(Array(reports?.length), null));
    setPopperAnchorEls(_.fill(Array(reports?.length), null));
  }, [reportsTotal]);

  const handlePopoverOpen = (index: number) => (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEls([
      ...anchorEls.slice(0, index),
      event.currentTarget,
      ...anchorEls.slice(index + 1, anchorEls.length),
    ]);
    setPopupOpen([
      ...popupOpen.slice(0, index),
      true,
      ...popupOpen.slice(index + 1, anchorEls.length),
    ]);
  };

  const handlePopoverClose = (index: number) => () => {
    setAnchorEls([
      ...anchorEls.slice(0, index),
      null,
      ...anchorEls.slice(index + 1, anchorEls.length),
    ]);
    setPopupOpen([
      ...popupOpen.slice(0, index),
      false,
      ...popupOpen.slice(index + 1, anchorEls.length),
    ]);
  };

  const onClickOk = (reportId: number) => () => {
    dispatch(
      approveReport({
        approve: 1,
        reportId,
        page: 1,
        amount: AMOUNT_PER_BOARDS,
      })
    );
    setPopperAnchorEls(_.fill(Array(reports?.length), null));
  };

  const onClickNo = (reportId: number) => () => {
    setPopperAnchorEls(_.fill(Array(reports?.length), null));
  };

  const onClickPopper = (index: number) => (e: any) => {
    setPopperAnchorEls([
      ..._.fill(Array(index), null),
      e.currentTarget,
      ..._.fill(Array(popperAnchorEls.length - index - 1), null),
    ]);
  };

  const changePage = (page: number) => {
    // router.push({ pathname: '/board/', query: { page: value } });
    dispatch(
      getAllReports({
        page,
        amount: AMOUNT_PER_BOARDS,
      })
    );
  };

  return (
    <div className={tab.root}>
      <Table size="small" component={Paper}>
        <TableHead>
          <TableRow>
            {columns.map(col => (
              <TableCell key={`col_${col.toLowerCase()}`} align="center">
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {reports?.map((rp, index) => (
            <TableRow
              key={`table_key_${rp.reportId}`}
              className={rp.reportId % 2 == 0 ? tab.evenrows : tab.rows}
            >
              <TableCell align="center">{rp.reportId}</TableCell>
              <TableCell align="center">{rp.reportUserEmail}</TableCell>
              <TableCell align="center">{rp.reportedUserEmail}</TableCell>
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
                <IconButton aria-label="accept" onClick={onClickPopper(index)}>
                  <CheckCircleOutline color="primary" />
                </IconButton>
                <IconButton aria-label="reject" onClick={onClickPopper(index)}>
                  <HighlightOffIcon color="error" />
                </IconButton>
                <Popper
                  open={Boolean(popperAnchorEls[index])}
                  placement="top"
                  // disablePortal={false}
                  anchorEl={popperAnchorEls[index]}
                >
                  <Card className={pad.pad2}>
                    <Typography>정말 처리하시겠습니까?</Typography>
                    <Button
                      variant="contained"
                      onClick={onClickOk(rp.reportId)}
                    >
                      예
                    </Button>
                    <Button
                      variant="contained"
                      onClick={onClickNo(rp.reportId)}
                    >
                      아니오
                    </Button>
                  </Card>
                </Popper>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div></div>
      <div className={tab.pagebuttons}>
        {pagearray.map(value => (
          <List className={tab.pagebuttons} key={value}>
            <Button
              onClick={() => {
                changePage(value);
              }}
            >
              {value}
            </Button>
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
