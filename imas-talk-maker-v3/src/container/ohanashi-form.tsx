import React, { useContext, FormEvent } from 'react';
import { ApplicationContext } from 'service/store';
import OhanashiView from 'component/ohanashi-view';
import styled from 'styled-components';
import IconForm from 'container/icon-form';

const OhanashiForm: React.FC = () => {
  const {
    nowOhanashiData,
    ohanashiDataList,
    downloadLink,
    messageSplitIndex,
    dispatch
  } = useContext(ApplicationContext);

  const changeName = (e: FormEvent<HTMLInputElement>) => {
    dispatch({
      type: 'changeName',
      message: e.currentTarget.value
    });
  };

  const changeMessage = (e: FormEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: 'changeMessage',
      message: e.currentTarget.value
    });
  };

  const changeMessageMode = (e: FormEvent<HTMLSelectElement>) => {
    dispatch({
      type: 'changeMessageMode',
      message: e.currentTarget.value
    });
  };

  const addMessage = () => {
    dispatch({
      type: 'addOhanashi',
      message: ''
    });
  };

  const deleteAllMessage = () => {
    dispatch({
      type: 'deleteAllOhanashi',
      message: ''
    });
  };

  return (
    <>
      <Form>
        <ControlWrapper>
          <Name
            placeholder="(未入力時は自動設定)"
            value={nowOhanashiData.name}
            onChange={changeName}
          />
        </ControlWrapper>
        <ControlWrapper>
          <Message
            placeholder="メッセージを入力"
            rows={3}
            value={nowOhanashiData.message}
            onChange={changeMessage}
          />
        </ControlWrapper>
        <ControlWrapper>
          <FormLabel>アイコン：</FormLabel>
          <TypeSelect
            value={nowOhanashiData.messageMode}
            onChange={changeMessageMode}
          >
            <TypeOption value="normal">通常</TypeOption>
            <TypeOption value="reverse">反転</TypeOption>
            <TypeOption value="double">ダブル</TypeOption>
            <TypeOption value="quartet">カルテット</TypeOption>
            <TypeOption value="message-only">メッセージのみ</TypeOption>
          </TypeSelect>
        </ControlWrapper>
        <ControlWrapper>{<IconForm />}</ControlWrapper>
        <Wrapper>
          <Preview>
            <FormLabel>プレビュー：</FormLabel>
            <br />
            <OhanashiView dataList={[nowOhanashiData]} />
          </Preview>
        </Wrapper>
        <ControlWrapper>
          <AddButton type="button" onClick={addMessage}>
            追加
          </AddButton>
        </ControlWrapper>
      </Form>
      <PreviewForm>
        {ohanashiDataList.length > 0 && messageSplitIndex < 0 ? (
          <ControlWrapper>
            <SaveButton href={downloadLink} download="ohanashi.png">
              保存
            </SaveButton>
            <AllDeleteButton type="button" onClick={deleteAllMessage}>
              全削除
            </AllDeleteButton>
          </ControlWrapper>
        ) : (
          <></>
        )}
        <ControlWrapper>
          {messageSplitIndex < 0 ? (
            <OhanashiView
              dataList={ohanashiDataList}
              setDownloadLink={url =>
                dispatch({ type: 'setDownloadLink', message: url })
              }
              showLogoFlg={true}
              onClick={n =>
                dispatch({ type: 'clickUpperOhanashiView', message: `${n}` })
              }
            />
          ) : (
            <>
              <OhanashiView
                dataList={ohanashiDataList.slice(0, messageSplitIndex + 1)}
                onClick={n =>
                  dispatch({ type: 'clickUpperOhanashiView', message: `${n}` })
                }
              />
              <MessageActionWrapper>
                <InsertButton
                  type="button"
                  onClick={() =>
                    dispatch({ type: 'insertOhanashi', message: '' })
                  }
                >
                  挿入
                </InsertButton>
                <ShiftButton
                  type="button"
                  onClick={() => dispatch({ type: 'upOhanashi', message: '' })}
                >
                  ↑
                </ShiftButton>
                <ShiftButton
                  type="button"
                  onClick={() =>
                    dispatch({ type: 'downOhanashi', message: '' })
                  }
                >
                  ↓
                </ShiftButton>
                <SendButton
                  type="button"
                  onClick={() =>
                    dispatch({ type: 'editOhanashi', message: '' })
                  }
                >
                  転送
                </SendButton>
                <UpdateButton
                  type="button"
                  onClick={() =>
                    dispatch({ type: 'overWriteOhanashi', message: '' })
                  }
                >
                  上書
                </UpdateButton>
                <DeleteButton
                  type="button"
                  onClick={() =>
                    dispatch({ type: 'deleteOhanashi', message: '' })
                  }
                >
                  削除
                </DeleteButton>
              </MessageActionWrapper>
              <OhanashiView
                dataList={ohanashiDataList.slice(messageSplitIndex + 1)}
                onClick={n =>
                  dispatch({ type: 'clickLowerOhanashiView', message: `${n}` })
                }
              />
            </>
          )}
        </ControlWrapper>
      </PreviewForm>
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

const PreviewForm = styled.form`
  margin: 1rem auto;
  text-align: center;
  @media screen and (min-width: 768px) {
    width: 50%;
  }
`;

const ControlWrapper = styled.div`
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

const SaveButton = styled.a`
  font-size: 1rem;
  background-color: green;
  border: 1px solid black;
  border-radius: 1rem;
  padding: 0.25rem 1rem;
  color: white;
  margin: 0 0.5rem;
  text-decoration: none;
`;

const AllDeleteButton = styled.button`
  font-size: 1rem;
  background-color: red;
  border: 1px solid black;
  border-radius: 1rem;
  padding: 0.25rem 1rem;
  color: white;
  margin: 0 0.5rem;
`;

const MessageActionWrapper = styled.div`
  margin-bottom: 0.5rem;
`;

const InsertButton = styled.button`
  font-size: 1rem;
  background-color: skyblue;
  border: 1px solid black;
  color: black;
  margin: 0 0.25rem;
  text-decoration: none;
  height: 2rem;
`;

const ShiftButton = InsertButton;

const UpdateButton = styled.button`
  font-size: 1rem;
  background-color: yellow;
  border: 1px solid black;
  padding: 0rem 0.5rem;
  color: black;
  margin: 0 0.25rem;
  text-decoration: none;
  height: 2rem;
`;

const SendButton = UpdateButton;

const DeleteButton = styled.button`
  font-size: 1rem;
  background-color: red;
  border: 1px solid black;
  color: white;
  margin: 0 0.25rem;
  text-decoration: none;
  height: 2rem;
`;

const Wrapper = styled.div`
  display: flex;
`;

const Preview = styled.div`
  margin: 0 auto;
  text-align: center;
  display: inline-block;
`;

const FormLabel = styled.span`
  display: inline-block;
  margin-right: 1rem;
`;

export default OhanashiForm;
