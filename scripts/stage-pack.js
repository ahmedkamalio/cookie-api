'use strict';

const path = require('path');
const fse = require('fs-extra');
const root = require('app-root-path');
const packageJson = require('../package.json');

const SOURCE_PATH = root.resolve('build');
const UMD_SOURCE_PATH = path.join(SOURCE_PATH, 'umd');
const DEST_PATH = root.resolve('dist');

function checkIfBuildDirsExists() {
  for (const dir of [SOURCE_PATH, UMD_SOURCE_PATH]) {
    if (!fse.existsSync(dir)) {
      throw new Error(`"${dir}" dir not exists!`);
    }
  }
}

async function ensureDestDirExists() {
  await fse.ensureDir(DEST_PATH);
  await fse.ensureDir(path.join(DEST_PATH, 'umd'));
}

async function copyPackageJsonFile() {
  delete packageJson.scripts;
  delete packageJson.devDependencies;
  const dest = path.join(DEST_PATH, 'package.json');
  await fse.writeJSON(dest, { ...packageJson, main: 'index.js' }, { spaces: 2 });
}

async function copyFiles() {
  await fse.copy(SOURCE_PATH, DEST_PATH);
  await fse.copy(UMD_SOURCE_PATH, path.join(DEST_PATH, 'umd'));
  await copyPackageJsonFile();
  await fse.copy(root.resolve('README.md'), path.join(DEST_PATH, 'README.md'));
  await fse.copy(root.resolve('License'), path.join(DEST_PATH, 'License'));
}

async function stageForPack() {
  checkIfBuildDirsExists();
  await ensureDestDirExists();
  await copyFiles();
}

stageForPack();
