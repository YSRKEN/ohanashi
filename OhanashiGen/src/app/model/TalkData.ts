/**
 * 1つ分の会話内容
 */
export class TalkData{
    /**
     * ID
     */
    id: number = 0;

    /**
     * キャラ名
     */
    name: string = "";

    /**
     * 喋る内容
     */
    message: string = "";

    /**
     * 表示する画像のURL
     */
    url: string = "assets/images/producer_p_head/P-suite.png";

    /**
     * 選択されているか？
     */
    selected: boolean = false;

    get selected2(): string{
        return this.selected ? "true" : "false";
    }
}
