import React from 'react';
import { OhanashiData } from 'constant/type';
import { Stage, Layer, Rect } from 'react-konva';

// スケール
const scale = 2.0;

// 「おはなし」の大きさ
const OHANASHI_WIDTH = 320 * scale;
const OHANASHI_HEIGHT = 84 * scale;

// ロゴの縦幅
const OHANASHI_LOGO_HEIGHT = 16 * scale;

const OhanashiView2: React.FC<{
  dataList: OhanashiData[];
  setDownloadLink?: (val: string) => void;
  showLogoFlg?: boolean;
  onClick?: (val: number) => void;
}> = ({ dataList, setDownloadLink = () => { }, showLogoFlg = false, onClick = () => { } }) => {
  const canvasWidth = OHANASHI_WIDTH / scale;
  const canvasHeight = (OHANASHI_HEIGHT * dataList.length + (showLogoFlg ? OHANASHI_LOGO_HEIGHT + 2 : 0)) / scale;
  const test = () => {
    onClick(0);
    setDownloadLink('');
  }

  return <Stage width={canvasWidth} height={canvasHeight} onClick={test}>
    <Layer>
      <Rect x={10} y={10} width={100} height={50} fill="black" />
    </Layer>
  </Stage >;
};

export default OhanashiView2;
