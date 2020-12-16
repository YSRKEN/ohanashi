import React, { useEffect, useRef } from 'react';
import { OhanashiData } from 'constant/type';
import { Stage, Layer, Rect, Text } from 'react-konva';
import { Stage as StageType } from 'konva/types/Stage';

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
  // canvas自体の参照
  const stageRef = useRef<StageType>(null);
  // canvasの大きさ
  const canvasWidth = OHANASHI_WIDTH / scale;
  const canvasHeight = (OHANASHI_HEIGHT * dataList.length + (showLogoFlg ? OHANASHI_LOGO_HEIGHT + 2 : 0)) / scale;

  // ダウンロードデータを常に更新する
  useEffect(() => {
    const url = stageRef?.current?.toDataURL();
    if (typeof url === 'string') {
      setDownloadLink(url);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageRef, dataList]);

  return <Stage ref={stageRef} width={canvasWidth} height={canvasHeight}>
    {
      dataList.map((data, index) => <Layer key={index} onClick={() => onClick(index)}>
        <Rect x={10} y={10 + index * OHANASHI_HEIGHT} width={100} height={50} fill="black" />
        <Text x={10} y={60 + index * OHANASHI_HEIGHT} text={data.message} />
      </Layer>)
    }
  </Stage >;
};

export default OhanashiView2;
