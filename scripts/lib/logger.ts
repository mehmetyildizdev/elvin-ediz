/**
 * Simple ANSI color helpers without external dependencies
 */
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
  blue: '\x1b[34m',
};

export const logger = {
  info: (msg: string) => console.log(`${colors.cyan}ℹ${colors.reset} ${msg}`),
  success: (msg: string) => console.log(`${colors.green}✔${colors.reset} ${msg}`),
  warn: (msg: string) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg: string, err?: unknown) => {
    console.error(`${colors.red}✖ ${msg}${colors.reset}`);
    if (err) console.error(err);
  },
  step: (step: string, msg: string) => {
    console.log(`${colors.magenta}[${step}]${colors.reset} ${msg}`);
  },
  dryRun: (msg: string) => {
    console.log(`${colors.yellow}[DRY-RUN]${colors.reset} ${colors.dim}${msg}${colors.reset}`);
  },
  header: (title: string) => {
    console.log(`\n${colors.bright}${colors.blue}=== ${title} ===${colors.reset}\n`);
  },
  footer: (msg: string) => {
    console.log(`\n${colors.green}${colors.bright}🎉 ${msg}${colors.reset}\n`);
  },
};
