const iconUrl = `${process.env.PUBLIC_URL}/asset/icon_data.json`;

export interface IIconData {
  name: string
  short_name: string
  kana: string
  category: 'million' | 'cinderella' | 'other'
  image: string[]
}

// 指定したアイドルのアイコンのURL一覧を探す
export const findIconListByName = async (name: string) => {
  const jsonData: IIconData[] = await (await fetch(iconUrl)).json();
  const idolData = jsonData.filter(data => data.name === name)[0];
  return idolData.image.map(url => `${process.env.PUBLIC_URL}/asset/${idolData.category}/${url}`);
};

// 指定した検索ワードでアイドル名を検索する
export const findIdolListBySearchWord = async (searchWord: string) => {
  const jsonData: IIconData[] = await (await fetch(iconUrl)).json();
  if (searchWord === '') {
    return jsonData.map(idol =>({
      name: idol.name,
      // tslint:disable-next-line: object-literal-sort-keys
      kana: idol.kana,
      url: `${process.env.PUBLIC_URL}/asset/${idol.category}/${idol.image[0]}`
    }));
  } else {
    return jsonData.filter(idol => (idol.name+idol.kana).includes(searchWord))
      .map(idol =>({
        name: idol.name,
        // tslint:disable-next-line: object-literal-sort-keys
        kana: idol.kana,
        url: `${process.env.PUBLIC_URL}/asset/${idol.category}/${idol.image[0]}`
      }));
  }
};

// 指定したアイドルの短縮名を探す
export const findShortNameByName = async (name: string) => {
  const jsonData: IIconData[] = await (await fetch(iconUrl)).json();
  const idolData = jsonData.filter(data => data.name === name)[0];
  return idolData.short_name;
};
