import os from 'os';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import { exec as build } from 'pkg';

const asyncExec = (cmd, options = {}) => {
  return new Promise((res, rej) =>
    exec(cmd, options, (err, stdout, stderr) => {
      if (err) {
        rej(new Error(`${stdout} ${err}`));
      } else {
        res(`${stdout} ${stderr}`);
      }
    }));
};

(async () => {
  try {
    const clientPath = path.resolve(process.cwd(), '../client');
    const serverPath = path.resolve(process.cwd(), '../server');
    const tempPath = path.resolve(process.cwd(), '../temp');

    await fs.promises.rmdir(`${clientPath}/build`, { recursive: true })
    await fs.promises.rmdir(`${serverPath}/build`, { recursive: true })
    await fs.promises.rmdir(`${serverPath}/tsc`, { recursive: true })
    await fs.promises.rmdir(`${tempPath}/client_build`, { recursive: true })
    await asyncExec(`cd ${clientPath} && npm run build`);

    if (os.type() === 'Windows_NT') {
      await asyncExec(`move ${clientPath}\\build ${tempPath}\\client_build`);
    } else {
      await asyncExec(`mv ${clientPath}/build ${tempPath}/client_build`);
    }
    await asyncExec(`cd ${serverPath} && npm run build`);
    await build([
      path.resolve(serverPath, 'build', 'index.js'),
      '--target', 'node12-linux',
      '--output', path.resolve(tempPath, 'app.exe'),
    ]);
    await asyncExec(`node app.exe`, {
      cwd: tempPath,
    });
  } catch (err) {
    console.log('err', err);
    process.exit(1);
  }
})()