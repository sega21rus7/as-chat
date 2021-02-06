/* eslint-disable @typescript-eslint/no-var-requires */

const os = require("os");
const path = require("path");
const fs = require("fs");
const { exec, spawn } = require("child_process");
const build = require("pkg").exec;
const archiver = require("archiver");

const asyncExec = (cmd, options = {}) => {
  return new Promise((res, rej) =>
    exec(cmd, options, (err, stdout, stderr) => {
      console.log("cmd", cmd);
      Object.keys(options).length && console.log("options", options);
      stdout && console.log("stdout", stdout);
      stderr && console.log("stderr", stderr);
      console.log("================================================");

      if (err) {
        rej(new Error(`${stdout} ${err}`));
      } else {
        res(`${stdout} ${stderr}`);
      }
    }));
};

const runApp = appPath => {
  let app = spawn(path.resolve(process.cwd(), `${appPath}/app`), [], {
    cwd: `${appPath}`,
    env: {
      NODE_ENV: "production",
    },
  });
  let onStdout = data => {
    console.log(data.toString());
  };
  let onStderr = data => {
    console.log("onStderr", data.toString());
  };
  let onExit = code => {
    console.log("exit", code);
  };
  app.on("exit", onExit);
  app.on("error", onExit);
  if (app.stdout && app.stdout.on) {
    app.stdout.on("data", onStdout);
  }
  if (app.stderr && app.stderr.on) {
    app.stderr.on("data", onStderr);
  }
};

const removeFolders = (root, client, server) => {
  fs.rmdirSync(`${client}/build`, { recursive: true });
  fs.rmdirSync(`${server}/build`, { recursive: true });
  fs.rmdirSync(`${server}/tsc`, { recursive: true });
  fs.rmdirSync(`${root}/client_build`, { recursive: true });
  fs.rmSync(path.resolve(root, "app"));
};

(async () => {
  const root = path.resolve(process.cwd(), "../");
  const client = path.resolve(process.cwd(), "../client");
  const server = path.resolve(process.cwd(), "./");

  try {
    await asyncExec(`cd ${client} && npm run build`);

    if (os.type() === "Windows_NT") {
      await asyncExec(`move ${client}\\build ${root}\\client_build`);
    } else {
      await asyncExec(`mv ${client}/build ${root}/client_build`);
    }
    await asyncExec(`cd ${server} && npm run build`);
    await build([
      `${server}/build/src/index.js`,
      "--target", "node12-linux",
      // "--target", "host",
      "--output", `${root}/app`,
    ]);

    let output = fs.createWriteStream(`${root}/app.zip`);
    output.on("error", err => {
      console.log(err);
      process.exit(1);
    });
    let archive = archiver("zip", { zlib: { level: 9 } });
    output.on("close", () => {
      console.log(`${archive.pointer()} total bytes`);
      console.log("archiver has been finalized and the output file descriptor has closed.");
    });
    archive.on("warning", err => {
      throw err;
    });
    archive.on("error", err => {
      throw err;
    });
    archive.pipe(output);
    archive.directory(`${root}/client_build`, "client_build");
    const appFile = path.resolve(root, "app");
    archive.append(fs.createReadStream(appFile), { name: "app", mode: fs.constants.S_IXOTH });
    await archive.finalize();
  } catch (err) {
    console.log("err", err);
    process.exit(1);
  } finally {
    removeFolders(root, client, server);
  }
})();