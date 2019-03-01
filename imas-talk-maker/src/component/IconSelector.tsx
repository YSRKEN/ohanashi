import * as React from 'react';
import { ConfigContext } from 'src/context';
import { findIconListByName } from 'src/iconData';

// 表情セレクター
const IconSelector: React.FC<{ className?: string, iconName: string }> = ({className = "", iconName = ""}) => {
	const config = React.useContext(ConfigContext);
	const [urlList, setUrlList] = React.useState<string[]>([]);

	React.useEffect(() => {
    findIconListByName(iconName).then((list) => {
			setUrlList(list);
		});
  }, [iconName]);

	if (config === null) {
		return (<></>);
	}
	if (urlList.length === 0) {
		return (<></>);
	}

	return (
		<div className={`${className} mt-3`}>
			<div>
				{urlList.map((url, i) => {
					const onClickImg = () => {
						config.setIconURL(url);
						config.setIconSelectorFlg(false);
					};
					return (
						<img key={i} src={url} width="44" height="44" className="m-1" onClick={onClickImg}/>
					);
				})}
			</div>
		</div>
	);
}

export default IconSelector;
