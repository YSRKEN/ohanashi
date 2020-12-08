import React, { useContext } from 'react';
import { ApplicationContext } from 'service/store';
import OhanashiForm from './ohanashi-form';
import IdolSelectForm from './idol-select-form';
import DerepoForm from './derepo-form';

const SelectedScene: React.FC = () => {
  const { scene } = useContext(ApplicationContext);

  switch (scene) {
    case 'Ohanashi':
      return <OhanashiForm />;
    case 'IdolSelect':
      return <IdolSelectForm />;
    case 'Derepo':
      return <DerepoForm />;
    default:
      return <></>;
  }
};

export default SelectedScene;
