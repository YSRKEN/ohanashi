import * as React from 'react';
import { ITalkData } from 'src/constant';
import '../css/OhanashiView.css';

const OhanashiView: React.FC<{ talkData: ITalkData }> = ({ talkData }) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [overallCss, setOverallCss] = React.useState<{}>({});
  const [fontCss, setFontCss] = React.useState<{}>({});

  React.useEffect(() => {
    if (divRef.current === null) {
      setOverallCss({
        height: 84,
        width: 320
      });
      setFontCss({
        fontSize: 14
      });
      return;
    }
    const width = divRef.current.offsetWidth;
    setOverallCss({
      height: (width * 84) / 320,
      width: width
    });
    setFontCss({
      fontSize: (width * 14) / 320
    });
  }, []);

  return (
    <div ref={divRef} style={overallCss}>
      <div className="bg-default position-relative">
        <img
          className="talk-face position-absolute"
          alt=""
          src={talkData.url}
          crossOrigin="anonymous"
        />
        <div className="talk-balloon position-absolute" />
        <p className="talk-name position-absolute" style={fontCss}>
          {talkData.name}
        </p>
        <pre className="talk-message position-absolute" style={fontCss}>
          {talkData.message}
        </pre>
      </div>
    </div>
  );
};

export default OhanashiView;
