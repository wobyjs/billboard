import { defineConfig } from 'vite'
import path from 'path'
// import dts from 'vite-plugin-dts'

const config = defineConfig({
    build: {
        minify: false,
        lib: {
            entry: ["./src/index.tsx"],
            name: "@woby/billboard",
            formats: ['es', 'cjs'/*, 'umd'*/],
            fileName: (format: string, entryName: string) => `${entryName}.${format}.js`
        },
        sourcemap: true,
        rollupOptions: {
            external: ['woby', 'oby', "woby/jsx-runtime", "billboard.js"],
            output: {
                globals: {
                    'woby': 'woby',
                    'oby': 'oby',
                }
            }
        },
    },
    esbuild: {
        jsx: 'automatic',
    },
    plugins: [
        // dts({ entryRoot: './src', outDir: './dist/types', exclude: './nodes_modules' })
    ],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src'),
            // 'woby/jsx-dev-runtime': process.argv.includes('dev') ? path.resolve('../woby/src/jsx/runtime') : 'woby',
            // 'woby/jsx-runtime': process.argv.includes('dev') ? path.resolve('../woby/src/jsx/runtime') : woby',  //'woby',
            // 'woby': process.argv.includes('dev') ? path.resolve('../woby/src') : 'woby'
        },
    },
})



export default config
