import { createGlobalStyle } from 'styled-components';

// システムで使用するフォント
export const APPLICATION_FONT = 'Noto Sans JP';

// システムで使用するフォントに対応するURL
const FONT_URL = `https://fonts.googleapis.com/css?family=${APPLICATION_FONT.replace(' ', '+')}`;

// システム共通に適用する CSS を設定する
export const GlobalStyles = createGlobalStyle`
  /* フォントを指定した Web フォントに設定する */
  @import url('${FONT_URL}');
  body {
    font-family: '${APPLICATION_FONT}', sans-serif;
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
    iconUrls: ['million/tokoro_megumi-1.png', 'million/tenkubashi_tomoka-1.png'],
    message: 'サンプルメッセージ3',
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
    message: 'サンプルメッセージ4',
    messageMode: 'message-only'
  }
];
