import json

# JSONデータセットを読み込む
import os
import shutil
from pprint import pprint
from typing import List, Dict, Union

from pykakasi import kakasi

with open('../imas-talk-maker/public/asset/icon_data.json', mode='r', encoding='utf-8') as f:
    old_icon_data: List[Dict[str, Union[str, List[str]]]] = json.load(f)

# 必要なディレクトリを整備する
os.makedirs('./million', exist_ok=True)
os.makedirs('./cinderella', exist_ok=True)
os.makedirs('./other', exist_ok=True)

# 各項目を読み込み、新しいデータセット、およびファイルを組み上げる
new_icon_data = []
kakasi_instance = kakasi()
kakasi_instance.setMode('H', 'a')
kakasi_instance.setMode('K', 'a')
kakasi_instance.setMode('J', 'a')
kakasi_conv = kakasi_instance.getConverter()
for record in old_icon_data:
    category: str = record['category']
    icon_name_list: List[str] = record['image']
    kana: str = record['kana']
    name: str = record['name']
    short_name: str = record['short_name']
    icon_name_list_size = len(icon_name_list)
    kana_roma = kakasi_conv.do(kana.replace('、', '/').split('/')[0])
    new_icon_list = []
    for x in range(0, icon_name_list_size):
        old_name = icon_name_list[x]
        filename, ext = os.path.splitext(old_name)
        new_filename = f'{kana_roma}_{x+1}{ext}'
        new_icon_list.append(new_filename)
    for old_name, new_name in zip(icon_name_list, new_icon_list):
        shutil.copy2(f'../imas-talk-maker/public/asset/{category}/{old_name}',
                     f'./{category}/{new_name}')

    new_icon_data.append({
        "name": name,
        "shortName": short_name,
        "kana": kana,
        "iconList": new_icon_list,
        "category": category
    })

pprint(new_icon_data)
with open('./icon_data.json', mode='w', encoding='utf-8') as f:
    json.dump(new_icon_data, f, ensure_ascii=False, indent=2)
