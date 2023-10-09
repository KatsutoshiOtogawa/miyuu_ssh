import {
    InitConfig,
    Connect,
    ClientClose,
    NewSession,
    SessionRun,
    SessionClose,
    Free,
} from './_load_library.ts'

type RawSession = Deno.PointerValue;

type RawClient = Deno.PointerValue;

type RawClientConfig = Deno.PointerValue;

type IpPort = {
    // 192.168.0.21など addr_octetより優先して使われる。
    ip?: string
    // ipv4 addr_octet
    addr_octet?: [number, number, number, number];
    // 未使用時は22が使われる。
    port?: number
}


/**
 * check ipv4 address format.
 * @param {string} ipv4 
 * @returns {boolean}
 */
function isIpv4(ipv4: string): boolean {

    const splited = ipv4.split(".")
    if (splited.length !== 4) {
        return false;
    }

    for (const octet of splited) {
        if (octet.length > 1 && octet[0] === '0') {
            return false;
        }
        const parsed = parseInt(octet);

        if (isNaN(parsed)) {
            return false;
        }

        if (!(0 <= parsed && parsed <= 255 && Number.isInteger(parsed))) {
            return false;
        }
    }
    return true;
}

class Client {

    raw_client: RawClient = null;
    /**
     * 外から呼び出さないこと。
     * @param raw_client 
     */
    constructor(raw_client: RawClient) {
        this.raw_client = raw_client;
    }
    // static connect(config: ClientConfig, addr_octet: number, addr_octet2: number, addr_octet3: number, addr_octet4: number, port: number): Client {
    static connect(config: ClientConfig, ip_port: IpPort): Client {

        // hostの方がssh/configを見る必要があるので実装は後回し。
        // しなくても良い。
        // host  > "192.168.11.20" > それぞれ別々に渡している。という優先順位
        // "192.168.11.20:22"のようなipアドレス＋portは許可しない。
        const {ip, port} = ip_port;

        let _addr_octet: number
        let _addr_octet2: number
        let _addr_octet3: number
        let _addr_octet4: number;

        // ssh default port
        let _port = 22;
        if (ip) {
            if(!isIpv4(ip)) {
                throw TypeError("Invalid ip address format.");
            }
            // 正しかったら、パースしてoctetに値を代入
            [_addr_octet, _addr_octet2, _addr_octet3, _addr_octet4] = ip.split(".").map(x => parseInt(x));

        } else {
            const { addr_octet } = ip_port

            if (!addr_octet) {
                throw TypeError("set address octet!");
            }

            [_addr_octet, _addr_octet2, _addr_octet3, _addr_octet4] = addr_octet;
        }

        if (port) {
            if (!(1 <= port && port <= 65535 && Number.isInteger(port))) {
                throw TypeError("Invalid port");
            }
            _port = port;
        }

        const raw_config = config.raw_config;

        const connection: RawClient = Connect(
            raw_config,
            _addr_octet,
            _addr_octet2,
            _addr_octet3,
            _addr_octet4,
            _port,
        );

        return new Client(connection);
    }

    /**
     * resource の解放
     */
    close() {
        this.#_close();
    }
    #_close() {
        ClientClose(this.raw_client);
        Free(this.raw_client);
    }
}

class Session {

    raw_session: RawSession = null;
    /**
     * 外から呼び出さないこと。
     * @param raw_session 
     */
    constructor(raw_session: RawSession) {
        this.raw_session = raw_session;
    }

    static createSession(client: Client): Session{

        const raw_client = client.raw_client;

        const session: RawSession = NewSession(raw_client);

        return new Session(session);
    }

    /**
     * execute command
     * @param cmd 
     */
    exec(cmd: string) {
        const raw_cmd = new TextEncoder().encode(cmd);
        SessionRun(
            this.raw_session,
            raw_cmd,
            raw_cmd.length
        );
    }

    /**
     * resource の解放
     */
    close() {
        this.#_close();
    }
    #_close() {
        SessionClose(this.raw_session);
        Free(this.raw_session);
    }
}

class ClientConfig {

    raw_config: RawClientConfig = null;
    /**
     * 外から呼び出さないこと。
     * @param raw_config 
     */
    constructor(raw_config: RawClientConfig) {
        this.raw_config = raw_config;
    }

    static init(username: string, password: string): ClientConfig {
        const raw_username = new TextEncoder().encode(username);
        const raw_password = new TextEncoder().encode(password);

        const config: RawClientConfig = InitConfig(
            raw_username,
            raw_username.length,
            raw_password,
            raw_password.length
        );

        return new ClientConfig(config);
    }

    /**
     * resource の解放
     */
    dispose() {
        this.#_dispose();
    }
    #_dispose() {
        Free(this.raw_config);
    }
}

export const Miyuu = {
    ClientConfig,
    Client,
    Session,
}
