import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import matter from 'gray-matter';

// MiniMax TTS path
const MINIMAX_TTS_PATH = path.resolve(process.env.HOME, 'ai-and-vibe', 'minimax-tts', 'index.js');

// Load env from minimax-tts directory FIRST (before dotenv loads .env.local)
const MINIMAX_ENV_PATH = path.resolve(process.env.HOME, 'ai-and-vibe', 'minimax-tts', '.env');
if (fs.existsSync(MINIMAX_ENV_PATH)) {
  const minimaxEnv = fs.readFileSync(MINIMAX_ENV_PATH, 'utf-8');
  minimaxEnv.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join('=').trim();
    }
  });
}

import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Voice mapping - male-qn-qingse works for both, female voices seem unavailable
const VOICE_MAP = {
  zh: { voiceId: 'male-qn-qingse', emotion: 'calm' },
  en: { voiceId: 'male-qn-qingse', emotion: 'calm' },
};

async function generateAudio() {
  // Dynamically import MiniMax TTS module
  const { textToSpeech, saveAudio } = await import(MINIMAX_TTS_PATH);

  const audioDir = path.join(ROOT, 'public', 'audio');
  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }

  // Find all blog markdown files
  const blogFiles = await glob('src/content/blog/**/*.md', { cwd: ROOT });

  let generated = 0;
  let skipped = 0;
  let errors = 0;

  for (const file of blogFiles) {
    const filePath = path.join(ROOT, file);
    const slug = path.basename(file, '.md');

    // Skip if audio already exists (check lang-specific path later)

    // Parse frontmatter
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter } = matter(content);

    // Skip if draft or audio not enabled
    if (frontmatter.draft || !frontmatter.audio) {
      skipped++;
      continue;
    }

    // Get text content (strip markdown)
    const text = content
      .replace(/^---[\s\S]*?---/m, '')  // remove frontmatter
      .replace(/```[\s\S]*?```/g, '')    // remove code blocks
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')  // links → text
      .replace(/[#*`_~]/g, '')          // remove markdown syntax
      .replace(/\n+/g, ' ')             // collapse newlines
      .trim();

    if (!text) {
      console.warn(`⚠ No text content for ${slug}`);
      errors++;
      continue;
    }

    const lang = path.basename(path.dirname(file));
    const voiceConfig = VOICE_MAP[lang] || VOICE_MAP.en;

    // Create language-specific subdirectory
    const langAudioDir = path.join(audioDir, lang);
    if (!fs.existsSync(langAudioDir)) {
      fs.mkdirSync(langAudioDir, { recursive: true });
    }
    const audioPath = path.join(langAudioDir, `${slug}.mp3`);

    // Skip if audio already exists
    if (fs.existsSync(audioPath)) {
      skipped++;
      continue;
    }

    try {
      console.log(`🎙 Generating audio for ${slug} (lang: ${lang})...`);
      const result = await textToSpeech(text, {
        model: 'speech-2.8-hd',
        ...voiceConfig,
        speed: 1,
        format: 'mp3',
        sampleRate: 32000,
      });

      if (result.audio) {
        await saveAudio(result.audio, `${slug}.mp3`, langAudioDir);
        generated++;
        console.log(`✅ Saved: ${lang}/${slug}.mp3`);
      }
    } catch (err) {
      errors++;
      console.error(`❌ Error generating ${slug}:`, err.message);
    }
  }

  console.log(`\n📊 Summary: ${generated} generated, ${skipped} skipped, ${errors} errors`);
}

generateAudio();