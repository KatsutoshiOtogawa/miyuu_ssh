
// linuxかどうかで処理分ける。

const libname = "/usr/local/miyuu/libmiyuu_ssh_core.so";

const library = Deno.dlopen(libname, {
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
  });

const { 
  InitConfig,
  Connect,
  ClientClose,
  NewSession,
  SessionRun,
  SessionClose,
  Free,
} = library.symbols;

export {
    InitConfig,
    Connect,
    ClientClose,
    NewSession,
    SessionRun,
    SessionClose,
    Free,
    library
}
