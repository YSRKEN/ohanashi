import { OhanashiData } from 'constant/type';

// 「おはなし」の初期データ
export const SAMPLE_OHANASHI: OhanashiData = {
  name: '',
  iconUrls: [
    'million/nikaido_chizuru-1.png',
    'million/tenkubashi_tomoka-1.png',
    'million/tokoro_megumi-1.png',
    'million/momose_rio-1.png'
  ],
  message: '',
  messageMode: 'normal'
};

// 「おはなし」のサンプルデータ
export const SAMPLE_OHANASHI_LIST: OhanashiData[] = [
  {
    name: '',
    iconUrls: ['million/nikaido_chizuru-1.png'],
    message: '目前の光景は実に壮大なものだった。',
    messageMode: 'normal'
  },
  {
    name: '',
    iconUrls: ['million/momose_rio-1.png'],
    message:
      '5 平方フィート程度の紫色の草むらのようなものが、砂地を横切ってこちらに向かってきた。',
    messageMode: 'normal'
  },
  {
    name: '',
    iconUrls: [
      'million/tokoro_megumi-1.png',
      'million/tenkubashi_tomoka-1.png'
    ],
    message: '赤い炎が尖った翼の輪郭を浮かび上がらせた。',
    messageMode: 'double'
  },
  {
    name: '',
    iconUrls: [
      'million/tenkubashi_tomoka-1.png',
      'million/tokoro_megumi-1.png',
      'million/momose_rio-1.png',
      'million/nikaido_chizuru-1.png'
    ],
    message: '',
    messageMode: 'quartet'
  },
  {
    name: '状況説明',
    iconUrls: [],
    message:
      '各部位を正確に作るには時間がかかるので、当初の意図とは異なるが、巨大な人体を作ることにした。高さは約 8 フィートで、これに',
    messageMode: 'message-only'
  }
];

// 「おはなし」の種類に応じたアイコン表示数
export const OHANASHI_ICON_COUNT: { [key: string]: number } = {
  normal: 1,
  reverse: 1,
  double: 2,
  quartet: 4,
  'message-only': 0
};
