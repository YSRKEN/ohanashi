import DerepoView from 'component/derepo-view';
import { APP_VERSION } from 'constant/other';
import React, { FormEvent, useContext } from 'react';
import { ApplicationContext } from 'service/store';
import styled from 'styled-components';

const DerepoForm: React.FC = () => {
  const { nowDerepoData, dispatch } = useContext(ApplicationContext);

  const clearLocalStrage = () => {
    if (window.confirm('データを初期化しますか？')) {
      dispatch({
        type: 'clearLocalStrage',
        message: ''
      });
    }
  };

  const changeName = (e: FormEvent<HTMLInputElement>) => {
    dispatch({
      type: 'changeNameD',
      message: e.currentTarget.value
    });
  };

  const changeMessage = (e: FormEvent<any>) => {
    dispatch({
      type: 'changeMessageD',
      message: e.currentTarget.value
    });
  };

  const changeFavFlg = () => {
    dispatch({
      type: 'changeFavFlgD',
      message: ''
    });
  };

  const changeFavCount = (e: FormEvent<any>) => {
    dispatch({
      type: 'changeFavCountD',
      message: e.currentTarget.value
    });
  };

  const changeMonth = (e: FormEvent<any>) => dispatch({ type: 'changeMonthD', message: e.currentTarget.value });
  const changeDay = (e: FormEvent<any>) => dispatch({ type: 'changeDayD', message: e.currentTarget.value });
  const changeHour = (e: FormEvent<any>) => dispatch({ type: 'changeHourD', message: e.currentTarget.value });
  const changeMinute = (e: FormEvent<any>) => dispatch({ type: 'changeMinuteD', message: e.currentTarget.value });

  const addMessage = () => {
    /*dispatch({
      type: 'addOhanashi',
      message: ''
    });*/
  };

  return <>
    <TitleWrapper>
      <Title onClick={clearLocalStrage}>アイマス会話メーカー</Title>
    </TitleWrapper>
    <InfoWrapper>
      <Info>Ver.{APP_VERSION}　<Link href="https://github.com/YSRKEN/ohanashi">GitHub</Link>　作者：<Link href="https://twitter.com/YSRKEN">@YSRKEN</Link></Info>
    </InfoWrapper>
    <Form>
      <ControlWrapper>
        <Name placeholder="(未入力時は自動設定)" value={nowDerepoData.name} onChange={changeName} />
      </ControlWrapper>
      <ControlWrapper>
        <Message placeholder="メッセージを入力" rows={3} value={nowDerepoData.message} onChange={changeMessage} />
      </ControlWrapper>
      <ControlWrapper>
        <FavFlg type="checkbox" checked={nowDerepoData.favFlg} onClick={changeFavFlg} /><span onClick={changeFavFlg}>ファボする</span>
        <FavCount placeholder="ファボ数" value={`${nowDerepoData.favCount}`} onChange={changeFavCount} />
      </ControlWrapper>
      <ControlWrapper>
        <DateTimeInput placeholder="月" value={`${nowDerepoData.month}`} onChange={changeMonth} />
        <DateTimeInput placeholder="日" value={`${nowDerepoData.day}`} onChange={changeDay} />
        <DateTimeInput placeholder="時" value={`${nowDerepoData.hour}`} onChange={changeHour} />
        <DateTimeInput placeholder="分" value={`${nowDerepoData.minute}`} onChange={changeMinute} />
      </ControlWrapper>
      <Wrapper>
        <Preview>
          <FormLabel>プレビュー：</FormLabel>
          <br />
          <DerepoView dataList={[nowDerepoData]} />
        </Preview>
      </Wrapper>
      <ControlWrapper>
        <AddButton type="button" onClick={addMessage}>
          追加
      </AddButton>
      </ControlWrapper>
    </Form>
  </>;
};

export default DerepoForm;

const TitleWrapper = styled.div`
  text-align: center;
`;

const Title = styled.span`
  font-size: 2rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

const InfoWrapper = styled.div`
  text-align: center;
`;

const Info = styled.span``;

const Link = styled.a``;

const Form = styled.form`
  margin: 1rem auto;
  border: 1px solid black;
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

const FavFlg = styled.input`
`;

const FavCount = styled.input`
  font-size: 1.5rem;
  padding: 0.25rem;
  margin-left: 1rem;
  width: 50%;
  @media screen and (min-width: 768px) {
    width: 40%;
  }
`;

const DateTimeInput = styled.input`
  font-size: 1.5rem;
  padding: 0.25rem;
  margin-left: 1rem;
  width: 10%;
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

const AddButton = styled.button`
  font-size: 1.5rem;
  background-color: skyblue;
  border: 1px solid black;
  border-radius: 1rem;
  padding: 0.25rem 1rem;
  color: black;
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