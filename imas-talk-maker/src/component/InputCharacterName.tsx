import * as React from 'react';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { CHARA_NAME_TYPE_LIST, CharaNameType } from 'src/constant';
import { ConfigContext } from 'src/context';
import SelectButtonGroup from './SelectButtonGroup';

// 自動入力時はtrue
const isAutoInputName = (charaNameType: CharaNameType) =>
  charaNameType === '自動';

// キャラ名入力
const InputCharacterName: React.FC = () => {
  const config = React.useContext(ConfigContext);
  if (config === null) {
    return <></>;
  }

  // キャラ名が変更した際の処理
  const onChangeCharaName = (event: React.FormEvent<any>) => {
    const value = event.currentTarget.value;
    if (typeof value === 'string') {
      config.setCharaName(value);
    }
  };

  return (
    <FormGroup>
      <FormLabel>キャラ名</FormLabel>
      <SelectButtonGroup
        className="ml-3 my-3"
        nameList={CHARA_NAME_TYPE_LIST}
        firstSelectName={config.charaNameType}
        selectedColorType="secondary"
        callback={(val: string) =>
          config.setCharaNameType(val as CharaNameType)
        }
      />
      <FormControl
        disabled={isAutoInputName(config.charaNameType)}
        value={config.charaName}
        onChange={onChangeCharaName}
      />
    </FormGroup>
  );
};

export default InputCharacterName;
