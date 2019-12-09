import { createGlobalStyle } from 'styled-components';

// システム共通に適用する CSS を設定する
export const GlobalStyles = createGlobalStyle`
  /* フォントを Noto Sans JP に設定する */
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+JP');
  body {
    font-family: 'Noto Sans JP', sans-serif;
  }
`;
