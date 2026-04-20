import { execSync } from 'child_process';

export function audioHookIntegration() {
  return {
    name: 'audio-hook',
    hooks: {
      'astro:build:start': () => {
        console.log('🔊 Generating audio for blog posts...');
        execSync('node scripts/generate-audio.mjs', {
          cwd: process.cwd(),
          stdio: 'inherit',
        });
      },
    },
  };
}