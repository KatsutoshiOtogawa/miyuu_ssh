import { Miyuu } from "./_miyuu_ssh.ts";
import { library } from "./load_library.ts"

class MiyuuSsh {

    // MiyuuConnectionの方が良いかも

    static #count = 0;
    /**
     * 
     * @returns library
     */
    static open() {
        // 開いている数をカウント
        this.#count += 1;
        return {...Miyuu}
    }

    static get count() {
        return this.#count;
    }

    /**
     * resource 解放
     */
    static close() {

        // open してないのに呼び出された。
        if (library === null) {
            return;
        }
        this.#count -= 1;

        // staticの数が0になったら解放。
        // 排他処理
        if (this.#count === 0) {
            library.close();
        } 
    }
}

export {
    MiyuuSsh
}
