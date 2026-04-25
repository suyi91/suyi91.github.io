import { readFileSync, rmSync, copyFileSync, mkdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import fs from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DEMOS_DIR = join(ROOT, 'demos');
const OUTPUT_DIR = join(ROOT, 'public', 'demos');
const CONFIG_PATH = join(DEMOS_DIR, 'demos.json');

function loadConfig() {
  const config = JSON.parse(readFileSync(CONFIG_PATH, 'utf-8'));
  return config.demos;
}

function cleanOutput() {
  if (existsSync(OUTPUT_DIR)) {
    rmSync(OUTPUT_DIR, { recursive: true });
  }
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

function processDemo(demo) {
  const srcDir = join(DEMOS_DIR, demo.name);
  const destDir = join(OUTPUT_DIR, demo.name);

  if (!existsSync(srcDir)) {
    console.warn(`[demos] ${demo.name}: 目录不存在，跳过`);
    return;
  }

  if (demo.build) {
    console.log(`[demos] ${demo.name}: 构建中...`);
    const buildCmd = demo.buildCommand || 'npm run build';

    if (existsSync(join(srcDir, 'package.json'))) {
      execSync('npm install', { cwd: srcDir, stdio: 'inherit' });
    }
    execSync(buildCmd, { cwd: srcDir, stdio: 'inherit' });

    const buildDest = join(destDir, 'dist');
    copyDir(srcDir, destDir);
    console.log(`[demos] ${demo.name}: 构建完成`);
  } else {
    console.log(`[demos] ${demo.name}: 复制中...`);
    copyDir(srcDir, destDir);
    console.log(`[demos] ${demo.name}: 复制完成`);
  }
}

function main() {
  console.log('[demos] 开始同步 demo...\n');
  cleanOutput();

  const demos = loadConfig();
  for (const demo of demos) {
    processDemo(demo);
  }

  console.log('\n[demos] 完成');
}

main();
