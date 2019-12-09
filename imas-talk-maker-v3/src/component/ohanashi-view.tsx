import React from 'react';
import { OhanashiData } from 'constant';

const OhanashiView: React.FC<{ dataList: OhanashiData[] }> = ({ dataList }) => {
  return <span>メッセージ数：{dataList.length}</span>;
};

export default OhanashiView;
