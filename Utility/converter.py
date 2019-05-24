import json
import os
import shutil
from pprint import pprint
from typing import List

ASSERT_DIR = os.path.join(os.path.dirname(__file__), '..', 'OhanashiGen', 'src')
JSON_PATH = os.path.join(ASSERT_DIR, 'assets', 'preset_list.json')
OUTPUT_DIR = os.path.dirname(__file__)


def to_short_name(name: str) -> str:
    name_list_0 = ['ロコ', 'ジュリア', '詩花', 'P', 'アナスタシア', 'ナターリア', 'ヘレン', 'ライラ']
    name_list_1 = ['所恵美', '関裕美', '橘ありす', '柊志乃', '星輝子', '堀裕子', '楊菲菲',
                   '柳清良']
    name_list_2 = ['高木社長', '黒井社長']
    name_list_3 = ['野々原茜', '天空橋朋花', '二階堂千鶴', '五十嵐響子', '伊集院惠', '一ノ瀬志希',
                   '海老原菜帆', '喜多見柚', '小早川紗枝', '小日向美穂', '佐久間まゆ', '佐々木千枝',
                   '城ヶ崎莉嘉', '鷹富士茄子', '道明寺歌鈴', '野々村そら', '森久保乃々']

    if '(仮)' in name:
        name = name.replace('(仮)', '')

    if '・' in name:
        return name.split('・')[0]

    if name in name_list_0:
        return name

    if name in name_list_1:
        return name[1:]

    if name in name_list_2:
        return name[:2]

    if name in name_list_3:
        return name[3:]

    return name[2:]


def main() -> None:
    # JSONを読み込み
    json_data = json.load(open(JSON_PATH, 'rb'))

    # 書き込み先フォルダを作成
    if not os.path.exists(os.path.join(OUTPUT_DIR, 'million')):
        os.mkdir(os.path.join(OUTPUT_DIR, 'million'))
    if not os.path.exists(os.path.join(OUTPUT_DIR, 'cinderella')):
        os.mkdir(os.path.join(OUTPUT_DIR, 'cinderella'))
    if not os.path.exists(os.path.join(OUTPUT_DIR, 'other')):
        os.mkdir(os.path.join(OUTPUT_DIR, 'other'))

    # 変換開始
    new_json_data = []
    category = 'million'
    for record in json_data:
        images: List[str] = record['images']
        name: str = record['name']
        ruby: str = record['ruby']

        new_record = {
            'name': name,
            'short_name': to_short_name(name),
            'kana': ruby,
            'category': category,
            'image': [os.path.basename(path) for path in images]
        }

        new_json_data.append(new_record)

        for image in images:
            src_path = os.path.join(ASSERT_DIR, image)
            dst_path = os.path.join(OUTPUT_DIR, category)
            shutil.copy(src_path, dst_path)

        if name == '桜守歌織':
            category = 'other'
        elif name == '秋月涼':
            category = 'cinderella'

    json.dump(new_json_data, open(os.path.join(OUTPUT_DIR, 'icon_data.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=True)


if __name__ == '__main__':
    main()
