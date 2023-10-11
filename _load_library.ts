/// <reference lib="deno.unstable" />

const CallSymbol = {
    "InitConfig": {
      name: "InitConfig",
      parameters: [
        "buffer",
        "i64",
        "buffer",
        "i64",
      ],
      result: "pointer"
    },
    "Connect": {
      name: "Connect",
      parameters: [
        // ClientConfig
        "pointer",
        // addr_octet
        "u8",
        // addr_octet2
        "u8",
        // addr_octet3
        "u8",
        // addr_octet4
        "u8",
        // port
        "u16"
      ],
      result: "pointer",
    },
    "ClientClose": {
      name: "ClientClose",
      parameters: [
        "pointer"
      ],
      result: "void"
    },
    "NewSession": {
      name: "NewSession",
      parameters: [
        "pointer"
      ],
      result: "pointer"
    },
    "SessionRun": {
      name: "SessionRun",
      parameters: [
        "pointer",
        // command
        "buffer",
        // command_len
        "i64",
      ],
      result: "void"
    },
    "SessionClose": {
      name: "SessionClose",
      parameters: [
        "pointer"
      ],
      result: "void"
    },
    "Free": {
      name: "Free",
      parameters: ["pointer"],
      result: "void"
    },
} as const

function _load() {

  const os = Deno.build.os;
  let libname = "";
  if (os === 'linux') {
    libname = "/usr/local/miyuu/libmiyuu_ssh_core.so";
  } else if (os === 'darwin') {

    libname = "/usr/"
    // MIYUU_SSH_DEBUG=1 debugでモンキーパッチ的に分けるのはあり。
  } else {
    throw TypeError("Not supported os");
  }

  const library = Deno.dlopen(libname, CallSymbol);

  return library;
}

export {
  type CallSymbol,
  _load
}
