import React, { useContext, useState, useEffect } from 'react';
import { ApplicationContext } from 'service/store';
import styled from 'styled-components';
import { OHANASHI_ICON_COUNT } from 'constant/other';
import { findIdolByIconUrl } from 'service/utility';

// アイコンの大きさ
const ICON_SIZE_1 = 50;
const ICON_SIZE_2 = 35;

const IconForm: React.FC<{}> = () => {
  const { nowOhanashiData, selectedIconIndex, dispatch } = useContext(ApplicationContext);
  const [faceIconList, setFaceIconList] = useState<string[]>([]);

  const iconCount = OHANASHI_ICON_COUNT[nowOhanashiData.messageMode];
  const iconList = nowOhanashiData.iconUrls.slice(0, iconCount);

  /**
   * 現在選択中のアイドルのアイコン一覧を取得する
   */
  useEffect(() => {
    // 未選択の場合は無視する
    if (selectedIconIndex < 0) {
      setFaceIconList([]);
      return;
    }

    // 検索で引っかからなかった場合も無視する
    console.log(nowOhanashiData.iconUrls[selectedIconIndex]);
    const idol = findIdolByIconUrl(nowOhanashiData.iconUrls[selectedIconIndex]);
    if (idol === null) {
      setFaceIconList([]);
      return;
    }
    setFaceIconList(idol.iconList.map(url => `${idol.category}/${url}`));
  }, [nowOhanashiData, selectedIconIndex]);

  useEffect(() => {
    console.log(faceIconList);
  }, [faceIconList]);

  const onClickIcon = (index: number) => {
    dispatch({ type: 'selectIcon', message: `${index}` });
  };

  const onClickFaceIcon = (index: number) => {
    // dispatch({ type: 'selectIcon', message: `${index}` });
  };

  return (
    <Wrapper>
      <br />
      {iconList.map((url, index) => {
        if (selectedIconIndex !== index) {
          return <IconView key={index} alt={url} src={`./asset/${url}`} onClick={() => onClickIcon(index)} />;
        } else {
          return <SelectedIconView key={index} alt={url} src={`./asset/${url}`} onClick={() => onClickIcon(index)} />;
        }
      })}
      <br />
      {faceIconList.map((url, index) => (
        <FaceView key={index} alt={url} src={`./asset/${url}`} onClick={() => onClickFaceIcon(index)} />
      ))}
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
