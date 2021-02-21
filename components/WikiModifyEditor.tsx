import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateWiki } from '../features/wiki/action';
import { Classification } from '../features/wiki/type';
import { Button } from '@material-ui/core';
import {
  notificateSuccess,
} from '../features/notification/notificationSlice';

const WikiContentEditor = ({
  item,
  id,
}: {
  item: Classification;
  id: number;
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(item.text);
  const ReactQuill =
    typeof window === 'object' ? require('react-quill') : () => false;
  const updateContent = () => {
    dispatch(
      updateWiki({
        wiki: {
          wikiId: item.wikiId,
          classificationId: item.classificationId,
          text: value,
        },
      })
    );
    dispatch(notificateSuccess({ message: '수정에 성공했습니다.' }));
  };
  return (
    <React.Fragment key={item.userId}>
      <ReactQuill
        style={{ textAlign: 'left' }}
        theme="snow"
        value={value}
        onChange={setValue}
      />
      <Button onClick={() => updateContent()}>저장</Button>
    </React.Fragment>
  );
};

export default WikiContentEditor;
