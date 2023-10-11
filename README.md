# miyuu_ssh

miyuu_ssh is Deno ssh client library.
[go x/crypto/ssh](https://pkg.go.dev/golang.org/x/crypto/ssh) wrapeer. 

## support platform

deno support platform.

linux 
ubuntu foccal jammy

debian bullseye bookworm

later version GLIBC_2.32

macos

support intel mac only.

bigsur monterey ventura

### windows

Not yet supported

windows server 2019
windows server 2022

windows 10 (ms supported version)
windows 11

## prerequisite

install share library from [https://github.com/KatsutoshiOtogawa/miyuu_ssh_core](miyuu_ssh_core).

(Planned support apt and rpm package format in future.)

```bash
# download MiyuuSsh core library
MIYUU_CORE_VERSION=v0.0.12
wget "https://github.com/KatsutoshiOtogawa/miyuu_ssh_core/releases/download/${MIYUU_CORE_VERSION}/libmiyuu_ssh_core_linux.tar.gz"

# create directory for MiyuuSsh
mkdir /usr/local/miyuu

# expand tar to Miyuu directory.
tar zxvf libmiyuu_ssh_core_linux.tar.gz -C /usr/local/miyuu/ --strip-component=1

rm libmiyuu_ssh_core_linux.tar.gz
```

## How to use

```ts:example.ts
import { miyuu_ssh } from "./miyuu_ssh.ts";

const ssh = miyuu_ssh.open();

const config = ssh.ClientConfig.init('miyuu', 'mecchakawaii!');

const client = ssh.Client.connect(
    config,
    {
        addr_octet: [192, 168, 0, 210]
    }
);

const session = ssh.Session.createSession(client);

session.exec('echo hello world! >> love_love.txt');

// dispose resources.
session.close();
client.close();
config.dispose();

// close
miyuu_ssh.close();
```

```json:deno.jsonc
{
    "imports": {
      "miyuu_ssh/": "https://raw.githubusercontent.com/KatsutoshiOtogawa/miyuu_ssh/v0.0.2/"
    }
}
```

miyuu_ssh is using ffi.
deno's ffi is unstable and, use --unstable flag.

```bash
deno run --unstable example.ts
```
