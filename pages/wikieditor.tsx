import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import 'react-quill/dist/quill.snow.css';
import '../features/user/api';
import { useDispatch } from 'react-redux';
import { Paper, Button, Divider, Theme } from '@material-ui/core';
import { editorContainerStyles } from '../styles/componentStyle';
import { loadWiki, updateWiki } from './../features/wiki/action';
import { useTypedSelector } from '../features';
import { useRouter } from 'next/dist/client/router';
import { AddCircle } from '@material-ui/icons';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { useDivStyles } from './../styles/cssStyle';
import WikiAddEditor from './../components/WikiAddEditor';
import WikiContent from '../components/WikiContent';
import Notification from './../components/Notification';
import { notificateExpired } from '../features/notification/notificationSlice';

const popOverStyles = makeStyles((theme: Theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

export default function WikiEditor() {
  const router = useRouter();
  const subjectId = router.asPath.slice(22, 23);
  const dispatch = useDispatch();
  const { classification, wiki, wikiSubject, isWikiExist } = useTypedSelector(
    (state) => state.wiki
  );
  const { success, message } = useTypedSelector((state) => state.notification);
  console.log('wiki info >>> ', wiki);
  useEffect(() => {
    dispatch(loadWiki({ subjectId: parseInt(subjectId) }));
  }, []);
  const contentsRef = useRef<any[]>([]);
  const classes = editorContainerStyles();
  const po = popOverStyles();
  const div = useDivStyles();
  const onClickIndex = (index: number) => {
    contentsRef?.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start',
    });
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };
  const handlePopoverOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(notificateExpired());
  };

  const isPopOverOpen = Boolean(anchorEl);
  return (
    <Paper className={classes.root}>
      {/* <Notification
        success={success}
        message={message}
        handleClose={handleClose}
      /> */}
      <div className={classes.titleContainer}>
        <h1 className={classes.title}>{wikiSubject?.subjectName}</h1>
        <Button
          onClick={() =>
            router.push({
              pathname: 'wikiboard',
              query: {
                subjectId: wikiSubject?.subjectId,
                subjectName: wikiSubject?.subjectName,
              },
            })
          }
          variant="contained"
          color="primary"
          className={classes.titleButton}
        >
          {wikiSubject?.subjectName} 게시판으로 이동
        </Button>
      </div>

      <Paper className={classes.indexContainer} variant="outlined">
        <h2>목차</h2>
        {isWikiExist ? (
          classification?.map((item, index) => (
            <div
              key={index}
              className={
                item.groupId.length > 1
                  ? item.groupId.length > 3
                    ? classes.indexSubTitle2
                    : classes.indexSubTitle
                  : classes.indexTitle
              }
            >
              <Button onClick={() => onClickIndex(index)}>
                {item.groupId}. {item.title}
              </Button>
            </div>
          ))
        ) : (
          <div>새롭게 만들어보세요!</div>
        )}
        <div style={{ width: '90%' }} className={div.centerFlex}>
          <Button
            onClick={handleModalOpen}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <AddCircle fontSize="large" />
          </Button>
        </div>
      </Paper>

      <Popover
        id="mouse-over-popover"
        className={po.popover}
        classes={{
          paper: po.paper,
        }}
        open={isPopOverOpen}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>새로운 항목을 추가해보세요</Typography>
      </Popover>
      <div className={classes.contentsContainer}>
        {classification?.map((c, index) => {
          return (
            <WikiContent
              key={index}
              ref={(el: any) => {
                contentsRef.current[index] = el;
              }}
              item={c}
              groupId={c.groupId}
              text={c.text}
            />
          );
        })}
      </div>
      <WikiAddEditor
        wikiId={wiki?.wikiId}
        open={open}
        handleModalClose={() => handleModalClose()}
      />
    </Paper>
  );
}
