import React, { useState, useEffect } from 'react';
import { editorContainerStyles } from '../styles/componentStyle';
import { Classification } from '../features/wiki/type';
import { Button } from '@material-ui/core';
import { useTypedSelector } from '../features';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CancelIcon from '@material-ui/icons/Cancel';
import Divider from '@material-ui/core/Divider';
import WikiContentEditor from './WikiContentEditor';

/*const WikiContentTest = ({
    ref,
  item,
  groupId,
  text,
}: {
    ref : any,
    item : Classification,
    groupId : string,
    text : string
})*/
const WikiContentTest = React.forwardRef<HTMLDivElement, {
  item : Classification,
  groupId : string,
  text : string,
}>(({
  item,
  groupId,
  text,
} , ref) => {   
  const classes = editorContainerStyles();
  const [isContentOpened, setIsContentOpened] = useState<string[]>([]);
  const [isEditorOpened, setIsEditorOpened] = useState<string[]>([]);
  const { wikiSubject } = useTypedSelector(state => state.wiki);
  const openContent = (id: string) => {
    setIsContentOpened(isContentOpened => isContentOpened.concat(id));
  };
  const closeContent = (id: string) => {
    if (isContentOpened.find(c => c === id)) {
      setIsContentOpened(isContentOpened =>
        isContentOpened.filter(c => c !== id)
      );
    }
  };
  const openEditor = (id: string) => {
    setIsEditorOpened(isEditorOpened => isEditorOpened.concat(id));
  };

  const closeEditor = (id: string) => {
    if (isEditorOpened.find(e => e === id)) {
      setIsEditorOpened(isEditorOpened => isEditorOpened.filter(e => e !== id));
    }
  };
  return (
    <div className={classes.contentsContainer}>
        <div style={{ fontSize: '30px' }} className={classes.indexTitle}>
          <div ref={ref} className={classes.contentsRow}>
            <span> 
              {isContentOpened.find(c => c === groupId) ? (
                <Button onClick={() => closeContent(groupId)}>
                  <ExpandLessIcon />
                </Button>
              ) : (
                <Button onClick={() => openContent(groupId)}>
                  <ExpandMoreIcon />
                </Button>
              )}
              {groupId}. {item.title}
            </span>
            <span style={{ textDecoration: 'underline' }}>
              {isEditorOpened.find(e => e === groupId) ? (
                <Button onClick={() => closeEditor(groupId)}>
                  <CancelIcon />
                </Button>
              ) : (
                <Button onClick={() => openEditor(groupId)}>수정</Button>
              )}
            </span>
          </div>
          <Divider />
          {isContentOpened.find(m => m === groupId) &&
          !isEditorOpened.find(m => m === groupId) ? (
            <div dangerouslySetInnerHTML={{ __html: text }}></div>
          ) : (
            ''
          )}
          {isEditorOpened.find(e => e === groupId) ? (
            <WikiContentEditor item={item} id={wikiSubject?.subjectId!} />
          ) : (
            ''
          )}
        </div>      
    </div>
  );
}
);

export default WikiContentTest;
