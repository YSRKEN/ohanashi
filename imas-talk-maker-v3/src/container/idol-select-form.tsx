import React, { useContext } from 'react';
import { IDOL_MILLION_LIST } from 'constant/idol-million';
import { sortIdolList } from 'service/utility';
import { ApplicationContext } from 'service/store';

const IdolSelectForm: React.FC = () => {
  const { dispatch } = useContext(ApplicationContext);

  const idolList = sortIdolList([...IDOL_MILLION_LIST]);
  return (
    <>
      <button onClick={() => dispatch({ type: 'toBaseForm', message: '' })}>
        戻る
      </button>
      {idolList.map(idol => {
        return <div key={idol.name}>・{idol.name}</div>;
      })}
    </>
  );
};

export default IdolSelectForm;
