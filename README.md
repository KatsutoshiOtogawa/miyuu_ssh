# miyuu_ssh

miyuu_ssh is Deno ssh client library.

## support platform


linux 
ubuntu foccal jammy

debian bullseye bookworm

later version GLIBC_2.32

macos

bigsur monterey ventura

windows

windows server 2019
windows server 2022

windows 10 (ms supported version)
windows 11

## prerequisite

install share library from [](miyuu_ssh_core).

```bash
# download 

# create miyuu_ssh dependency directory
sudo mkdir /usr/local/miyuu

sudo unzip linux.zip -d /usr/local/miyuu
```

## how to use

```ts
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
