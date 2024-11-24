import { fileURLToPath } from 'url';
import { dirname, resolve as _resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const resolve = {
    alias: {
        '@': _resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
};

