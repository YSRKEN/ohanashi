import * as React from 'react';
import { Button, ButtonGroup, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/FormGroup';
import { BsPrefixProps, ReplaceProps } from 'react-bootstrap/helpers';
import { ConfigContext } from 'src/context';
import { findIdolListBySearchWord } from 'src/iconData';

const SelectNameForm: React.FC<{ className?: string }> = ({className = ""}) => {
  const config = React.useContext(ConfigContext);
  if (config === null) {
    return (<></>);
  }

  // 検索ワードが変化した際の処理
  const onChangeSearchWord = (event: React.FormEvent<ReplaceProps<"input", BsPrefixProps<"input">>>) => {
    const value = event.currentTarget.value;
    if (typeof value === 'string') {
      setSearchWord(value);
    }
  }

  const [searchWord, setSearchWord] = React.useState('');
  const [idolList, setIdolList] = React.useState<Array<{name: string, kana: string, url: string}>>([]);

  React.useEffect(() => {
    findIdolListBySearchWord(searchWord).then((list) => {
			setIdolList(list);
		});
  }, [searchWord]);

  return (
    <Form className={className}>
      <FormGroup>
        <FormLabel>キャラ名</FormLabel>
        <FormControl value={searchWord} onChange={onChangeSearchWord}/>
      </FormGroup>
      <ButtonGroup className="w-100" vertical={true}>
        {idolList.map((idol, i) => {
          const onClickButton = () => {
            config.setIconName(idol.name);
            config.setIconURL(idol.url);
            config.setIconSelectorFlg(false);
            config.setViewType('InputTalk');
          }
          return (<Button className="w-100" variant="outline-secondary" key={i}
            onClick={onClickButton}>{idol.name}</Button>);
        })}
      </ButtonGroup>
    </Form>
  );
};

export default SelectNameForm;
