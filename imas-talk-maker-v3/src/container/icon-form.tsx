import React, { useContext } from 'react';
import { ApplicationContext } from 'service/store';
import styled from 'styled-components';
import { OHANASHI_ICON_COUNT } from 'constant/other';

// アイコンの大きさ
const ICON_SIZE_1 = 50;
const ICON_SIZE_2 = 35;

const IconForm: React.FC<{}> = () => {
  const { nowOhanashiData } = useContext(ApplicationContext);

  const iconCount = OHANASHI_ICON_COUNT[nowOhanashiData.messageMode];
  const iconList = nowOhanashiData.iconUrls.slice(0, iconCount);

  return (
    <Wrapper>
      {iconList.map((url, index) => (
        <IconView key={index} alt={url} src={`./asset/${url}`} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const IconView = styled.img`
  width: ${ICON_SIZE_1}px;
  height: ${ICON_SIZE_1}px;
  border: 1px solid black;
`;

export default IconForm;
