import React from 'react';
import { IDOL_MILLION_LIST } from 'constant/idol-million';
import { sortIdolList } from 'service/utility';

const IdolSelectForm: React.FC = () => {
  const idolList = sortIdolList([...IDOL_MILLION_LIST]);
  return (
    <>
      {idolList.map(idol => {
        return <div key={idol.name}>・{idol.name}</div>;
      })}
    </>
  );
};

export default IdolSelectForm;
