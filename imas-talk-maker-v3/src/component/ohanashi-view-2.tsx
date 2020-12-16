import React, { useEffect, useRef, useState } from 'react';
import { OhanashiData } from 'constant/type';
import { Stage, Layer, Text, Image } from 'react-konva';
import { Stage as StageType } from 'konva/types/Stage';
import background from 'asset/background.png';
import balloon1 from 'asset/balloon1.png';
import balloon2 from 'asset/balloon2.png';
import balloon3 from 'asset/balloon3.png';
import balloon4 from 'asset/balloon4.png';
import useImage from 'use-image';
import { getOhanashiNameAuto, loadImage } from 'service/utility';

// スケール
const scale = 2.0;

// 「おはなし」の大きさ
const OHANASHI_WIDTH = 320 * scale;
const OHANASHI_HEIGHT = 84 * scale;

// アイコンサイズ
const ICON_SIZE = 76;

// ロゴの縦幅
const OHANASHI_LOGO_HEIGHT = 16 * scale;

const SingleOhanashiView: React.FC<{
  index: number,
  data: OhanashiData,
  backgroundImage: HTMLImageElement | undefined,
  ballonImage: HTMLImageElement | undefined,
  onClick: () => void
}> = ({ index, data, backgroundImage, ballonImage, onClick }) => {
  const [icon1Image, setIcon1Image] = useState<HTMLImageElement | undefined>(undefined);
  const [icon2Image, setIcon2Image] = useState<HTMLImageElement | undefined>(undefined);
  const [icon3Image, setIcon3Image] = useState<HTMLImageElement | undefined>(undefined);
  const [icon4Image, setIcon4Image] = useState<HTMLImageElement | undefined>(undefined);

  useEffect(() => {
    loadImage(`./asset/${data.iconUrls[0]}`).then(data => setIcon1Image(data));
    loadImage(`./asset/${data.iconUrls[1]}`).then(data => setIcon2Image(data));
    loadImage(`./asset/${data.iconUrls[2]}`).then(data => setIcon3Image(data));
    loadImage(`./asset/${data.iconUrls[3]}`).then(data => setIcon4Image(data));
  }, [data]);

  // 画像が読み込めていない際は表示しない
  if (typeof backgroundImage === 'undefined' || typeof ballonImage === 'undefined') {
    return <></>;
  }

  // メッセージの表示位置・大きさを計算する
  let nameX = 0;
  let nameY = 0;
  let messageX = 0;
  let messageY = 0;
  let messageWidth = 0;
  switch (data.messageMode) {
    case 'normal':
      nameX = ICON_SIZE + 16;
      nameY = 8;
      messageX = ICON_SIZE + 16;
      messageY = 26;
      messageWidth = 214;
      break;
    case 'reverse':
      nameX = 14;
      nameY = 8;
      messageX = 14;
      messageY = 26;
      messageWidth = 214;
      break;
    case 'double':
      nameX = ICON_SIZE + 16;
      nameY = 8;
      messageX = ICON_SIZE + 16;
      messageY = 26;
      messageWidth = 140;
      break;
    case 'message-only':
      nameX = 14;
      nameY = 8;
      messageX = 14;
      messageY = 26;
      messageWidth = 292;
      break;
    default:
      // data.messageMode === 'quartet'の場合、テキストは描画しない
      break;
  }

  // 名前を設定
  const name = data.name === '' ? getOhanashiNameAuto(data) : data.name;

  // 描画用JSX
  return <Layer onClick={onClick}>
    {/* 背景画像 */}
    <Image image={backgroundImage} x={0} y={index * OHANASHI_HEIGHT} width={OHANASHI_WIDTH} height={OHANASHI_HEIGHT} />
    {/* 4人並べる時以外は、テキストとバルーンを描画する */}
    {data.messageMode !== 'quartet' ?
      <>
        {/* バルーン画像 */}
        <Image image={ballonImage} x={0} y={index * ballonImage.height}
          width={ballonImage.width}
          height={ballonImage.height} />
        {/* 名前 */}
        <Text x={nameX} y={nameY + index * OHANASHI_HEIGHT / scale}
          text={name} fill="#f33281" fontStyle="bold" fontFamily="Noto Sans JP" fontSize={14} />
        {/* メッセージ */}
        <Text x={messageX} y={messageY + index * OHANASHI_HEIGHT / scale} width={messageWidth} lineHeight={17.5 / 14}
          text={data.message} fill="black" fontStyle="bold" fontFamily="Noto Sans JP" fontSize={14} />
      </>
      : <></>}
    {/* 描画モードによって、アイコンの描画を分ける */}
    {data.messageMode === 'normal' ?
      <Image image={icon1Image} x={5} y={4 + index * OHANASHI_HEIGHT / scale}
        width={ICON_SIZE} height={ICON_SIZE} />
      : <></>}
    {data.messageMode === 'reverse' ?
      <Image image={icon1Image} x={OHANASHI_WIDTH / scale - ICON_SIZE - 5} y={4 + index * OHANASHI_HEIGHT / scale}
        width={ICON_SIZE} height={ICON_SIZE} />
      : <></>}
    {data.messageMode === 'double' ?
      <>
        <Image image={icon1Image} x={5} y={4 + index * OHANASHI_HEIGHT / scale}
          width={ICON_SIZE} height={ICON_SIZE} />
        <Image image={icon2Image} x={OHANASHI_WIDTH / scale - ICON_SIZE - 5} y={4 + index * OHANASHI_HEIGHT / scale}
          width={ICON_SIZE} height={ICON_SIZE} />
      </>
      : <></>}
    {data.messageMode === 'quartet' ?
      <>
        <Image image={icon1Image} x={3} y={4 + index * OHANASHI_HEIGHT / scale}
          width={ICON_SIZE} height={ICON_SIZE} />
        <Image image={icon2Image} x={3 * 2 + ICON_SIZE} y={4 + index * OHANASHI_HEIGHT / scale}
          width={ICON_SIZE} height={ICON_SIZE} />
        <Image image={icon3Image} x={3 * 3 + ICON_SIZE * 2} y={4 + index * OHANASHI_HEIGHT / scale}
          width={ICON_SIZE} height={ICON_SIZE} />
        <Image image={icon4Image} x={3 * 4 + ICON_SIZE * 3} y={4 + index * OHANASHI_HEIGHT / scale}
          width={ICON_SIZE} height={ICON_SIZE} />
      </>
      : <></>}
  </Layer>;
};

const OhanashiView2: React.FC<{
  dataList: OhanashiData[];
  setDownloadLink?: (val: string) => void;
  showLogoFlg?: boolean;
  onClick?: (val: number) => void;
}> = ({ dataList, setDownloadLink = () => { }, showLogoFlg = false, onClick = () => { } }) => {
  // 各種画像
  const [backgroundImage] = useImage(background);
  const [balloon1Image] = useImage(balloon1);
  const [balloon2Image] = useImage(balloon2);
  const [balloon3Image] = useImage(balloon3);
  const [balloon4Image] = useImage(balloon4);
  // 辞書型にまとめることで参照しやすくした
  const balloonDict: { [key: string]: HTMLImageElement | undefined } = {
    'normal': balloon1Image,
    'reverse': balloon2Image,
    'double': balloon3Image,
    'message-only': balloon4Image,
  };

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
      dataList.map((data, index) =>
        <SingleOhanashiView
          key={index}
          index={index}
          data={data}
          onClick={() => onClick(index)}
          backgroundImage={backgroundImage}
          ballonImage={balloonDict[data.messageMode]} />)
    }
  </Stage >;
};

export default OhanashiView2;
