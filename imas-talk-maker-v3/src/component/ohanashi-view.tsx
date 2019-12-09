import React from 'react';
import { OhanashiData } from 'constant';

const OhanashiView: React.FC<{ dataList: OhanashiData[] }> = ({ dataList }) => {
  return (
    <>
      {dataList.map((record, index) => {
        return (
          <div key={index}>
            <div>
              <span>・{record.name}</span>
              <br />
              <span>・{record.message}</span>
              <br />
              <span>・{record.messageMode}</span>
            </div>
            <div>
              {record.iconUrls.map((iconUrl, index2) => {
                const iconUrlImpl = `${process.env.PUBLIC_URL}/asset/million/${iconUrl}`;
                return (
                  <img
                    key={index2}
                    src={iconUrlImpl}
                    alt=""
                    width={40}
                    height={40}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default OhanashiView;
