import React, { useContext, useState, useEffect } from 'react';
import { ApplicationContext } from 'service/store';
import styled from 'styled-components';
import { OHANASHI_ICON_COUNT } from 'constant/other';
import { findIdolByIconUrl } from 'service/utility';

// アイコンの大きさ
const ICON_SIZE_1 = 50;
const ICON_SIZE_2 = 35;

const IconForm: React.FC<{}> = () => {
  const { scene, nowOhanashiData, selectedIconIndex,
    nowDerepoData, selectedIconIndexD, dispatch } = useContext(ApplicationContext);
  const [iconList, setIconList] = useState<string[]>([]);
  const [faceIconList, setFaceIconList] = useState<string[]>([]);

  /**
   * 現在入力している「おはなし」のアイコン一覧を取得する
   */
  useEffect(() => {
    // 表示するべきアイコンの数
    const iconCount = scene === 'Ohanashi' ? OHANASHI_ICON_COUNT[nowOhanashiData.messageMode] : 1;

    // 表示されるアイコンの一覧
    setIconList(scene === 'Ohanashi' ? nowOhanashiData.iconUrls.slice(0, iconCount) : [nowDerepoData.iconUrl]);
  }, [nowOhanashiData, nowDerepoData, scene]);

  /**
   * 現在選択中のアイドルのアイコン一覧を取得する
   */
  useEffect(() => {
    switch (scene) {
      case 'Ohanashi': {
        // 未選択の場合は無視する
        if (selectedIconIndex < 0) {
          setFaceIconList([]);
          return;
        }

        // 検索で引っかからなかった場合も無視する
        const idol = findIdolByIconUrl(nowOhanashiData.iconUrls[selectedIconIndex]);
        if (idol === null) {
          setFaceIconList([]);
          return;
        }
        setFaceIconList(idol.iconList.map(url => `${idol.category}/${url}`));
        break;
      }
      case 'Derepo': {
        // 未選択の場合は無視する
        if (selectedIconIndexD < 0) {
          setFaceIconList([]);
          return;
        }

        // 検索で引っかからなかった場合も無視する
        const idol = findIdolByIconUrl(nowDerepoData.iconUrl);
        if (idol === null) {
          setFaceIconList([]);
          return;
        }
        setFaceIconList(idol.iconList.map(url => `${idol.category}/${url}`));
        break;
      }
      default:
        break;
    }
  }, [nowOhanashiData, selectedIconIndex, nowDerepoData, selectedIconIndexD, scene]);

  /**
   * アイコンクリック時は、表情アイコンの表示を切り替える
   * @param index インデックス
   */
  const onClickIcon = (index: number) => {
    if (scene === 'Ohanashi') {
      dispatch({ type: 'selectIcon', message: `${index}` });
    } else {
      dispatch({ type: 'selectIconD', message: `${index}` });
    }
  };

  /**
   * 表情アイコンクリック時は、アイコンの表情を変更する
   * @param index インデックス
   */
  const onClickFaceIcon = (index: number) => {
    if (scene === 'Ohanashi') {
      dispatch({ type: 'selectFaceIcon', message: `${faceIconList[index]}` });
    } else {
      dispatch({ type: 'selectFaceIconD', message: `${faceIconList[index]}` });
    }
  };

  /**
   * 変更アイコンクリック時は、アイドル一覧を表示するページに遷移する
   */
  const onClickChangeIcon = () => {
    dispatch({ type: 'toSelectIdolForm', message: '' });
  };

  return (
    <Wrapper>
      <br />
      {iconList.map((url, index) => {
        if ((scene === 'Ohanashi' && selectedIconIndex !== index) || (scene === 'Derepo' && selectedIconIndexD !== index)) {
          return <IconView key={index} alt={url} src={`./asset/${url}`} onClick={() => onClickIcon(index)} />;
        } else {
          return <SelectedIconView key={index} alt={url} src={`./asset/${url}`} onClick={() => onClickIcon(index)} />;
        }
      })}
      <br />
      {faceIconList.map((url, index) => (
        <FaceView key={index} alt={url} src={`./asset/${url}`} onClick={() => onClickFaceIcon(index)} />
      ))}
      {((scene === 'Ohanashi' && selectedIconIndex >= 0) || (scene === 'Derepo' && selectedIconIndexD >= 0))
        ? <FaceView alt="change Idol" src="./asset/more.png" onClick={() => onClickChangeIcon()} /> : <></>}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const SelectedIconView = styled.img`
  width: ${ICON_SIZE_1}px;
  height: ${ICON_SIZE_1}px;
  border: 3px solid red;
`;

const IconView = styled.img`
  width: ${ICON_SIZE_1}px;
  height: ${ICON_SIZE_1}px;
  border: 1px solid black;
`;

const FaceView = styled.img`
  width: ${ICON_SIZE_2}px;
  height: ${ICON_SIZE_2}px;
  border: 1px solid black;
`;

export default IconForm;
