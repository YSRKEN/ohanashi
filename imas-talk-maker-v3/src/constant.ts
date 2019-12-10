import { createGlobalStyle } from 'styled-components';

// システム共通に適用する CSS を設定する
export const GlobalStyles = createGlobalStyle`
  /* フォントを Noto Sans JP に設定する */
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+JP');
  body {
    font-family: 'Noto Sans JP', sans-serif;
  }
`;

// 「おはなし」の形態
type MessageMode = 'normal' | 'double' | 'quartet' | 'message-only';

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
    message: 'サンプルメッセージ',
    messageMode: 'normal'
  },
  {
    name: '莉緒',
    iconUrls: ['million/momose_rio-1.png'],
    message: 'サンプルメッセージ2',
    messageMode: 'normal'
  },
  {
    name: '恵美＆朋花',
    iconUrls: [
      'million/tokoro_megumi-1.png',
      'million/tenkubashi_tomoka-1.png'
    ],
    message: 'サンプルメッセージ3',
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
    name: '',
    iconUrls: [],
    message: 'サンプルメッセージ4',
    messageMode: 'message-only'
  }
];
