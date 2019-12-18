import React, { useContext, FormEvent } from 'react';
import { IDOL_LIST } from 'constant/idol';
import { sortIdolList } from 'service/utility';
import { ApplicationContext } from 'service/store';
import styled from 'styled-components';
import { Idol, ShowType } from 'constant/type';

const ICON_SIZE = 76;

const IdolListView: React.FC<{
  idolList: Idol[];
  showType: ShowType;
  selectIdolIcon: (idol: Idol) => void;
}> = ({ idolList, showType, selectIdolIcon }) => {
  switch (showType) {
    case 'icon':
      return (
        <>
          {idolList.map(idol => {
            return <IdolTile key={idol.name} src={`./asset/${idol.category}/${idol.iconList[0]}`} onClick={() => selectIdolIcon(idol)} />;
          })}
        </>
      );
    case 'text':
      return (
        <>
          {idolList.map(idol => {
            return (
              <IdolNameTile type="button" key={idol.name} onClick={() => selectIdolIcon(idol)}>
                {idol.name}
              </IdolNameTile>
            );
          })}
        </>
      );
    default:
      return (
        <>
          <IdolTable>
            {idolList.map(idol => {
              return (
                <IdolTableRow key={idol.name}>
                  <td>
                    <IdolTile2 key={idol.name} src={`./asset/${idol.category}/${idol.iconList[0]}`} onClick={() => selectIdolIcon(idol)} />
                  </td>
                  <td>
                    <IdolNameTile2 type="button" key={idol.name} onClick={() => selectIdolIcon(idol)}>
                      {idol.name}
                    </IdolNameTile2>
                  </td>
                </IdolTableRow>
              );
            })}
          </IdolTable>
        </>
      );
  }
};

const IdolSelectForm: React.FC = () => {
  const { selectOption, dispatch } = useContext(ApplicationContext);

  const idolList = sortIdolList([...IDOL_LIST])
    .filter(idol => (selectOption.category === 'all' ? true : selectOption.category === idol.category))
    .filter(idol => (selectOption.keyword === '' ? true : (idol.name + idol.kana).includes(selectOption.keyword)));

  const changeKeyword = (e: FormEvent<HTMLInputElement>) => {
    dispatch({ type: 'changeKeyword', message: e.currentTarget.value });
  };

  const changeCategory = (e: FormEvent<HTMLSelectElement>) => {
    dispatch({ type: 'changeCategory', message: e.currentTarget.value });
  };

  const changeShowType = (e: FormEvent<HTMLSelectElement>) => {
    dispatch({ type: 'changeShowType', message: e.currentTarget.value });
  };

  return (
    <>
      <TitleWrapper>
        <Title>アイドル選択画面</Title>
      </TitleWrapper>
      <Form>
        <ControlWrapper>
          <Keyword placeholder="キーワード" value={selectOption.keyword} onChange={changeKeyword} />
        </ControlWrapper>
        <ControlWrapper>
          <FormLabel>種別：</FormLabel>
          <TypeSelect value={selectOption.category} onChange={changeCategory}>
            <TypeOption value="all">全部</TypeOption>
            <TypeOption value="million">ミリ</TypeOption>
            <TypeOption value="cinderella">デレ</TypeOption>
            <TypeOption value="other">その他</TypeOption>
          </TypeSelect>
        </ControlWrapper>
        <ControlWrapper>
          <FormLabel>表示形式：</FormLabel>
          <TypeSelect value={selectOption.showType} onChange={changeShowType}>
            <TypeOption value="text">テキスト</TypeOption>
            <TypeOption value="icon">アイコン</TypeOption>
            <TypeOption value="all">両方</TypeOption>
          </TypeSelect>
        </ControlWrapper>
        <ControlWrapper>
          <BackButton onClick={() => dispatch({ type: 'toBaseForm', message: '' })}>戻る</BackButton>
        </ControlWrapper>
        <ControlWrapper>
          <IdolListView
            idolList={idolList}
            showType={selectOption.showType}
            selectIdolIcon={idol =>
              dispatch({
                type: 'selectIdolIcon',
                message: `${idol.category}/${idol.iconList[0]}`
              })
            }
          />
        </ControlWrapper>
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

const ControlWrapper = styled.div`
  margin: 1rem auto;
`;

const Keyword = styled.input`
  font-size: 1.5rem;
  padding: 0.25rem;
  width: 90%;
  @media screen and (min-width: 768px) {
    width: 50%;
  }
`;

const FormLabel = styled.span`
  font-size: 1.5rem;
  display: inline-block;
  margin-right: 1rem;
`;

const TypeSelect = styled.select`
  font-size: 1.5rem;
  padding: 0.25rem;
`;

const TypeOption = styled.option``;

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

const IdolNameTile = styled.button`
  font-size: 2rem;
  display: block;
  background-color: #fffffe;
  width: 90%;
  @media screen and (min-width: 768px) {
    width: 50%;
  }
  margin: 0 auto;
`;

const IdolTable = styled.table`
  border-collapse: collapse;
  margin: 0 auto;
`;

const IdolTile2 = styled.img`
  width: 3rem;
  height: 3rem;
  vertical-align: middle;
  padding: 0.25rem;
`;

const IdolNameTile2 = styled.button`
  font-size: 2rem;
  display: block;
  width: 100%;
  border-width: 0;
  background-color: #fffffe;
  margin: 0 auto;
  padding: 0.25rem;
`;

const IdolTableRow = styled.tr`
  border: 1px solid black;
`;

export default IdolSelectForm;
