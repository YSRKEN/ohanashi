const iconUrl = `${process.env.PUBLIC_URL}/asset/icon_data.json`;

interface IIconData {
  name: string
  short_name: string
  kana: string
  category: 'million' | 'cinderella' | 'other'
  image: string[]
}

export const findIconListByName = async (name: string) => {
  const jsonData: IIconData[] = await (await fetch(iconUrl)).json();
  const idolData = jsonData.filter(data => data.name === name)[0];
  return idolData.image.map(url => `${process.env.PUBLIC_URL}/asset/${idolData.category}/${url}`);
};
