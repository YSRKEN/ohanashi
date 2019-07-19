import * as React from 'react';
import { findIconListByName } from 'src/iconData';

// 表情セレクター
const IconSelector: React.FC<{
	className?: string,
	iconName: string,
	setIconUrl: (value: string) => void,
	setIconSelectorFlg: (value: boolean) => void
}> = ({className = "", iconName = "", setIconUrl, setIconSelectorFlg}) => {
	const [urlList, setUrlList] = React.useState<string[]>([]);

	React.useEffect(() => {
    findIconListByName(iconName).then((list) => {
			setUrlList(list);
		});
  }, [iconName]);

	if (urlList.length === 0) {
		return (<></>);
	}

	return (
		<div className={`${className} mt-3`}>
			<div>
				{urlList.map((url, i) => {
					const onClickImg = () => {
						setIconUrl(url);
						setIconSelectorFlg(false);
					};
					return (
						<img key={i} src={url} width="44" height="44" className="m-1" onClick={onClickImg} crossOrigin="anonymous"/>
					);
				})}
			</div>
		</div>
	);
}

export default IconSelector;
