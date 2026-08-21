import fs from 'fs';
import path from 'path';

/**
 * Loads environment variables from .env.local and .env files
 * into process.env if they are not already set.
 */
export function loadEnv(cwd: string = process.cwd()): void {
  const envFiles = ['.env.local', '.env'];

  for (const file of envFiles) {
    const filePath = path.resolve(cwd, file);
    if (!fs.existsSync(filePath)) continue;

    const content = fs.readFileSync(filePath, 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;

      const idx = trimmed.indexOf('=');
      const key = trimmed.slice(0, idx).trim();
      let value = trimmed.slice(idx + 1).trim();

      // Remove wrapping quotes if present
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      if (key && process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  }
}
