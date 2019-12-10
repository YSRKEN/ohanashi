import React, { useContext } from 'react';
import { ApplicationContext } from 'service/store';
import OhanashiView from 'component/ohanashi-view';
import styled from 'styled-components';

const OhanashiForm: React.FC = () => {
  const { ohanashiDataList, dispatch } = useContext(ApplicationContext);

  return (
    <>
      <Form>
        <Button type="button" color="skyblue" onClick={() => dispatch({ type: 'addOhanashi', message: '' })}>
          追加
        </Button>
      </Form>
      <Wrapper>
        <PreviewLabel>プレビュー：</PreviewLabel>
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
  padding: 1rem;
  text-align: center;
  @media screen and (min-width:768px) {
    width: 50%;
  }
`;

const Button = styled.button(
  (props: { color: string }) => `
  font-size: 1.5rem;
  background-color: ${props.color};
  border: 1px solid black;
  border-radius: 1rem;
  padding: 0.25rem 1rem;
  color: black;
`
);

const Wrapper = styled.div`
  display: flex;
`;

const Preview = styled.div`
  border: 1px solid black;
  padding: 1rem;
  margin: 1rem auto;
  text-align: center;
  display: inline-block;
`;


const PreviewLabel = styled.span`
  font-size: 1.5rem;
  color: black;
  display: block;
  margin: 1rem auto;
`;

export default OhanashiForm;
