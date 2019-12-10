// 「おはなし」の形態
export type MessageMode = 'normal' | 'double' | 'quartet' | 'message-only';

// 「おはなし」の1データ
export interface OhanashiData {
  name: string;
  iconUrls: string[];
  message: string;
  messageMode: MessageMode;
}

// サンプルデータ
export const SAMPLE_OHANASHI: OhanashiData[] = [
  {
    name: '千鶴',
    iconUrls: ['million/nikaido_chizuru-1.png'],
    message: '目前の光景は実に壮大なものだった。',
    messageMode: 'normal'
  },
  {
    name: '莉緒',
    iconUrls: ['million/momose_rio-1.png'],
    message: '5 平方フィート程度の紫色の草むらのようなものが、砂地を横切ってこちらに向かってきた。',
    messageMode: 'normal'
  },
  {
    name: '恵美＆朋花',
    iconUrls: ['million/tokoro_megumi-1.png', 'million/tenkubashi_tomoka-1.png'],
    message: '赤い炎が尖った翼の輪郭を浮かび上がらせた。',
    messageMode: 'double'
  },
  {
    name: '',
    iconUrls: ['million/tenkubashi_tomoka-1.png', 'million/tokoro_megumi-1.png', 'million/momose_rio-1.png', 'million/nikaido_chizuru-1.png'],
    message: '',
    messageMode: 'quartet'
  },
  {
    name: '状況説明',
    iconUrls: [],
    message: '各部位を正確に作るには時間がかかるので、当初の意図とは異なるが、巨大な人体を作ることにした。高さは約 8 フィートで、これに',
    messageMode: 'message-only'
  }
];
