/**
 * 1つ分の会話内容
 */
export class TalkData {
    /**
     * ID
     */
    id = 0;

    /**
     * キャラ名
     */
    name = '';

    /**
     * 喋る内容
     */
    message = '';

    /**
     * 表示する画像のURL
     */
    url = 'assets/images/producer_p_head/P-suite.png';

    /**
     * 表示する画像のURLその2
     */
    url2 = 'assets/images/kotori/1100234b19f.png';

    /**
     * ファボ数
     */
    favs = '1234';

    /**
     * タイムスタンプ
     */
    date = '01-02 03:04';

    /**
     * 選択されているか？
     */
    selected = false;

    get selected2(): string {
        return this.selected ? 'true' : 'false';
    }
}
