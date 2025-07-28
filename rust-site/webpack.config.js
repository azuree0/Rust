import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    mode: 'production',
    entry: './public/index.js',
    output: {
        path: path.resolve(__dirname, 'public/pkg'),
        filename: 'bundle.js',
    },
    experiments: {
        asyncWebAssembly: true,
    },
};