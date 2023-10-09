import { Miyuu } from "./_miyuu_ssh.ts";
import { library } from './_load_library.ts'

/**
 * 
 * @returns library
 */
function open() {
    return {...Miyuu}
}

/**
 * resource 解放
 */
function close() {
    library.close();
}

export const miyuu_ssh = {
    open,
    close
}
