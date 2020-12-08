import React, { useContext } from 'react';
import { ApplicationContext } from 'service/store';
import styled from 'styled-components';

const DerepoForm: React.FC = () => {
  const { dispatch } = useContext(ApplicationContext);

  const clearLocalStrage = () => {
    if (window.confirm('データを初期化しますか？')) {
      dispatch({
        type: 'clearLocalStrage',
        message: ''
      });
    }
  };

  return <>
    <TitleWrapper>
      <Title onClick={clearLocalStrage}>アイマス会話メーカー</Title>
    </TitleWrapper>
    <InfoWrapper>
      <Info>Ver.3.1.0　<Link href="https://github.com/YSRKEN/ohanashi">GitHub</Link>　作者：<Link href="https://twitter.com/YSRKEN">@YSRKEN</Link></Info>
    </InfoWrapper>
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
