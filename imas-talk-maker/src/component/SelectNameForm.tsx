import * as React from 'react';
import { Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/FormGroup';
import { IIdolInfo } from 'src/constant';
import { ConfigContext } from 'src/context';
import { findIdolListBySearchWord } from 'src/iconData';
import IdolNameList from './IdolNameList';

// アイドルを検索して選択させるフォーム
const SelectNameForm: React.FC<{ className?: string }> = ({
  className = ''
}) => {
  const config = React.useContext(ConfigContext);

  // Hooks
  const [searchWord, setSearchWord] = React.useState('');
  const [idolList, setIdolList] = React.useState<IIdolInfo[]>([]);
  React.useEffect(() => {
    findIdolListBySearchWord(searchWord).then(list => {
      setIdolList(list);
    });
  }, [searchWord]);

  // 戻るボタンを押した際の処理
  const onClickBackButton = () => {
    if (config !== null) {
      config.setViewType('InputTalk');
    }
  };

  // 検索ワードが変化した際の処理
  const onChangeSearchWord = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (typeof value === 'string') {
      setSearchWord(value);
    }
  };

  if (config === null) {
    return <></>;
  } else {
    return (
      <Form className={className}>
        <Button
          className="w-100 my-3"
          variant="primary"
          onClick={onClickBackButton}
        >
          メイン画面に戻る
        </Button>
        <FormGroup>
          <FormLabel>キャラ名</FormLabel>
          <FormControl value={searchWord} onChange={onChangeSearchWord} />
        </FormGroup>
        <IdolNameList idolList={idolList} />
      </Form>
    );
  }
};

export default SelectNameForm;
