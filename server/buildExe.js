/* eslint-disable @typescript-eslint/no-var-requires */

const os = require("os");
const path = require("path");
const fs = require("fs");
const { exec, spawn } = require("child_process");
const build = require("pkg").exec;

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

(async () => {
  try {
    const clientPath = path.resolve(process.cwd(), "../client");
    const serverPath = path.resolve(process.cwd(), "./");
    const tempPath = path.resolve(process.cwd(), "../temp");

    await fs.promises.rmdir(`${tempPath}/client_build`, { recursive: true });
    await asyncExec(`cd ${clientPath} && npm run build`);

    if (os.type() === "Windows_NT") {
      await asyncExec(`move ${clientPath}\\build ${tempPath}\\client_build`);
    } else {
      await asyncExec(`mv ${clientPath}/build ${tempPath}/client_build`);
    }
    await asyncExec(`cd ${serverPath} && npm run build`);
    await build([
      `${serverPath}/build/src/index.js`,
      // '--target', 'node12-linux',
      "--target", "host",
      "--output", `${tempPath}/app`,
    ]);
    let app = spawn(path.resolve(process.cwd(), `${tempPath}/app`), [], {
      cwd: `${tempPath}`,
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
    await fs.promises.rmdir(`${clientPath}/build`, { recursive: true });
    await fs.promises.rmdir(`${serverPath}/build`, { recursive: true });
    await fs.promises.rmdir(`${serverPath}/tsc`, { recursive: true });
  } catch (err) {
    console.log("err", err);
    process.exit(1);
  }
})();