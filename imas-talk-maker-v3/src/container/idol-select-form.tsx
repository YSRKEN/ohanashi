import React, { useContext } from 'react';
import { IDOL_LIST } from 'constant/idol';
import { sortIdolList } from 'service/utility';
import { ApplicationContext } from 'service/store';
import styled from 'styled-components';

const ICON_SIZE = 76;

const IdolSelectForm: React.FC = () => {
  const { dispatch } = useContext(ApplicationContext);

  const idolList = sortIdolList([...IDOL_LIST]);
  return (
    <>
      <TitleWrapper>
        <Title>アイドル選択画面</Title>
      </TitleWrapper>
      <Form>
        <ControlWeapper>
          <BackButton onClick={() => dispatch({ type: 'toBaseForm', message: '' })}>戻る</BackButton>
        </ControlWeapper>
        <ControlWeapper>
          {idolList.map(idol => {
            return (
              <IdolTile
                key={idol.name}
                src={`./asset/${idol.category}/${idol.iconList[0]}`}
                onClick={() =>
                  dispatch({
                    type: 'selectIdolIcon',
                    message: `${idol.category}/${idol.iconList[0]}`
                  })
                }
              />
            );
          })}
        </ControlWeapper>
      </Form>
    </>
  );
};

const TitleWrapper = styled.div`
  text-align: center;
`;

const Title = styled.span`
  font-size: 2rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Form = styled.form`
  margin: 1rem auto;
  text-align: center;
  @media screen and (min-width: 768px) {
    width: 50%;
  }
`;

const ControlWeapper = styled.div`
  margin: 1rem auto;
`;

const BackButton = styled.button`
  font-size: 1.5rem;
  background-color: skyblue;
  border: 1px solid black;
  border-radius: 1rem;
  padding: 0.25rem 1rem;
  color: black;
`;

const IdolTile = styled.img`
  width: ${ICON_SIZE}px;
  height: ${ICON_SIZE}px;
  border: 1px solid black;
`;

export default IdolSelectForm;
