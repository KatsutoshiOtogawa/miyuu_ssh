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
  const MIYUU_SSH_LIB_PATH = Deno.env.get("MIYUU_SSH_LIB_PATH");

  let libname = "";

  // 
  if (MIYUU_SSH_LIB_PATH) {
    libname = MIYUU_SSH_LIB_PATH;
  }
  if (os === 'linux') {
    libname = "/usr/local/miyuu/libmiyuu_ssh_core.so";
  // darwinの指定は後。
  // } else if (os === 'darwin') {

    // libname = "/Users/katsutoshi/source/miyuu_ssh/out/libmiyuu_ssh_core.dylib"
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
