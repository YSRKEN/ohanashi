import { OhanashiData, DerepoData } from 'constant/type';

// 「おはなし」の初期データ
export const SAMPLE_OHANASHI: OhanashiData = {
  name: '',
  iconUrls: ['million/nikaidouchizuru_1.png', 'million/tenkuubashitomoka_1.png', 'million/tokoromegumi_1.png', 'million/momoserio_1.png'],
  message: '',
  messageMode: 'normal'
};

// 「おはなし」のサンプルデータ
export const SAMPLE_OHANASHI_LIST: OhanashiData[] = [
  {
    name: '',
    iconUrls: ['million/nikaidouchizuru_1.png', 'million/nikaidouchizuru_1.png', 'million/nikaidouchizuru_1.png', 'million/nikaidouchizuru_1.png'],
    message: '目前の光景は実に壮大なものだった。',
    messageMode: 'normal'
  },
  {
    name: '',
    iconUrls: ['million/momoserio_1.png', 'million/momoserio_1.png', 'million/momoserio_1.png', 'million/momoserio_1.png'],
    message: '5 平方フィート程度の紫色の草むらのようなものが、砂地を横切ってこちらに向かってきた。',
    messageMode: 'normal'
  },
  {
    name: '',
    iconUrls: ['million/tokoromegumi_1.png', 'million/tenkuubashitomoka_1.png', 'million/tokoromegumi_1.png', 'million/tenkuubashitomoka_1.png'],
    message: '赤い炎が尖った翼の輪郭を浮かび上がらせた。',
    messageMode: 'double'
  },
  {
    name: '',
    iconUrls: ['million/tenkuubashitomoka_1.png', 'million/tokoromegumi_1.png', 'million/momoserio_1.png', 'million/nikaidouchizuru_1.png'],
    message: '',
    messageMode: 'quartet'
  },
  {
    name: '状況説明',
    iconUrls: ['other/misentaku_2.png', 'other/misentaku_2.png', 'other/misentaku_2.png', 'other/misentaku_2.png'],
    message: '各部位を正確に作るには時間がかかるので、当初の意図とは異なるが、巨大な人体を作ることにした。高さは約 8 フィートで、これに',
    messageMode: 'message-only'
  }
];

// デレぽのサンプルデータ
export const SAMPLE_DEREPO_LIST: DerepoData[] = [
  {
    name: '松山久美子',
    iconUrl: 'cinderella/matsuyamakumiko_2.png',
    message: 'この時期は楽器を弾く\nひとには厳しいわね…。',
    favFlg: true,
    favCount: 11,
    month: 12,
    day: 19,
    hour: 16,
    minute: 53,
    hashTags: []
  },
  {
    name: '木村夏樹',
    iconUrl: 'cinderella/kimuranatsuki_2.png',
    message: 'そうですね。\nどうしても指が、ね。',
    favFlg: true,
    favCount: 4,
    month: 12,
    day: 19,
    hour: 16,
    minute: 56,
    hashTags: []
  },
  {
    name: '有浦柑奈',
    iconUrl: 'cinderella/ariurakanna_1.png',
    message: 'カイロが手放せないですよね。\n手袋だけじゃ心もとなくて。',
    favFlg: true,
    favCount: 1,
    month: 12,
    day: 19,
    hour: 17,
    minute: 2,
    hashTags: []
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
