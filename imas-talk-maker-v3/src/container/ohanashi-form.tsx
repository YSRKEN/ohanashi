import React, { useContext, useState } from 'react';
import { ApplicationContext } from 'service/store';
import OhanashiView from 'component/ohanashi-view';
import styled from 'styled-components';
import { MessageMode } from 'constant/type';

const OhanashiForm: React.FC = () => {
  const { ohanashiDataList, dispatch } = useContext(ApplicationContext);

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messageMode, setMessageMode] = useState<MessageMode>('normal');

  const addMessage = () => {
    dispatch({
      type: 'addOhanashi',
      message: JSON.stringify({
        name,
        message,
        messageMode
      })
    });
  };

  return (
    <>
      <Form>
        <ControlWeapper>
          <Name placeholder="名前を入力" value={name} onChange={e => setName(e.currentTarget.value)} />
        </ControlWeapper>
        <ControlWeapper>
          <Message placeholder="メッセージを入力" rows={3} value={message} onChange={e => setMessage(e.currentTarget.value)} />
        </ControlWeapper>
        <ControlWeapper>
          <TypeSelect value={messageMode} onChange={e => setMessageMode(e.currentTarget.value as MessageMode)}>
            <TypeOption value="normal">通常</TypeOption>
            <TypeOption value="double">ダブル</TypeOption>
            <TypeOption value="quartet">カルテット</TypeOption>
            <TypeOption value="message-only">メッセージのみ</TypeOption>
          </TypeSelect>
        </ControlWeapper>
        <ControlWeapper>
          <AddButton type="button" onClick={() => addMessage()}>
            追加
          </AddButton>
        </ControlWeapper>
      </Form>
      <Wrapper>
        <PreviewLabel>一覧</PreviewLabel>
      </Wrapper>
      <Wrapper>
        <Preview>
          <OhanashiView dataList={ohanashiDataList} />
        </Preview>
      </Wrapper>
    </>
  );
};

const Form = styled.form`
  margin: 1rem auto;
  border: 1px solid black;
  text-align: center;
  @media screen and (min-width: 768px) {
    width: 50%;
  }
`;

const ControlWeapper = styled.div`
  margin: 1rem auto;
`;

const Name = styled.input`
  font-size: 1.5rem;
  padding: 0.25rem;
  width: 90%;
  @media screen and (min-width: 768px) {
    width: 50%;
  }
`;

const Message = styled.textarea`
  font-size: 1rem;
  padding: 0.5rem 0.5rem;
  line-height: 1.25;
  width: 90%;
  @media screen and (min-width: 768px) {
    width: 50%;
  }
`;

const TypeSelect = styled.select`
  font-size: 1rem;
  padding: 0.25rem;
`;

const TypeOption = styled.option``;

const AddButton = styled.button`
  font-size: 1.5rem;
  background-color: skyblue;
  border: 1px solid black;
  border-radius: 1rem;
  padding: 0.25rem 1rem;
  color: black;
`;

const Wrapper = styled.div`
  display: flex;
`;

const Preview = styled.div`
  border: 1px solid black;
  padding: 1rem;
  margin: 0 auto;
  text-align: center;
  display: inline-block;
`;

const PreviewLabel = styled.span`
  font-size: 2rem;
  color: black;
  display: block;
  margin: 0 auto;
`;

export default OhanashiForm;
