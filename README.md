# Curso de React Avanzado de Platzi

## 1. Instalación de dependencias

Iniciaremos instalando las dependencias necesarias para nuestro proyecto, en este caso será un proyecto con React, TypeScript, Sass y Webpack. Para esto necesitamos crear un archivo `package.json` con el siguiente comando:

```sh
npm init -y
```

## 1.1. Dependencias de desarrollo

Para Webpack necesitamos instalar las siguientes dependencias:

1. `webpack`: es un empaquetador de módulos para aplicaciones JavaScript modernas. Cuando webpack procesa tu aplicación, internamente crea un gráfico de dependencia que mapea cada módulo que tu proyecto necesita y genera uno o más paquetes.
2. `webpack-cli`: es una interfaz de línea de comandos que nos permite ejecutar webpack desde la terminal.
3. `webpack-dev-server`: es un servidor de desarrollo que nos permite levantar un servidor local con webpack, el cual se recarga automáticamente cada vez que hacemos cambios en nuestro código.

```sh
npm install --save-dev webpack webpack-cli webpack-dev-server
```

Para Babel necesitamos instalar las siguientes dependencias:

1. `@babel/core`: es un compilador que nos permite transformar código de JavaScript moderno (ES6+) en una versión compatible con todos los navegadores.
2. `@babel/preset-env`: es un conjunto de plugins de Babel que nos permiten usar las últimas características de JavaScript (ES6+) y que estos sean compatibles con todos los navegadores.
3. `@babel/preset-react`: es un preset de Babel que nos permite usar características de React (JSX) y que estos sean compatibles con todos los navegadores.
4. `@babel/preset-typescript`: es un preset de Babel que nos permite usar características de TypeScript y que estos sean compatibles con todos los navegadores.

```sh
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript
```

Ahora instalaremos los loaders, un loader nos permite procesar diferentes tipos de archivos y transformarlos en algo válido para nuestro proyecto.

1. `babel-loader`: nos permite integrar Babel con webpack.
2. `ts-loader`: nos permite integrar TypeScript con webpack.

```sh
npm install --save-dev babel-loader ts-loader
```

Podemos trabajar con cualquier preprocesador de CSS, en este caso usaremos Sass. Para esto necesitamos las siguientes dependencias:

1. `node-sass`: nos permite trabajar con Sass/SCSS.
2. `sass-loader`: es un loader para Webpack para compular archivos Sass/SCSS.
3. `css-loader`: interpreta `@import` y `url()` como `import/require()` y resuelve estos.
4. `style-loader`: inyecta nuestros estilos en el DOM.
5. `css-modules-typescript-loader`: nos permite usar CSS Modules con TypeScript.
6. `mini-css-extract-plugin`: nos permite extraer el CSS fuera del bundle de JavaScript en un archivo separado, esencial para la producción.

```sh
npm install --save-dev node-sass sass-loader css-loader style-loader mini-css-extract-plugin
```

Por último necesitamos instalar los plugins de Webpack:

1. `html-webpack-plugin`: nos permite trabajar con HTML en webpack.
2. `clean-webpack-plugin`: nos permite limpiar la carpeta `build` o `dist` cada vez que hagamos un build.

```sh
npm install --save-dev html-webpack-plugin clean-webpack-plugin
```

¡Listo, nuestro proyecto ya tiene todas las dependencias de desarrollo necesarias! Ahora instalaremos algunas dependencias necesarias para nuestro proyecto.

### 1.2. Dependencias necesarias para el proyecto

Para React necesitamos instalar las siguientes dependencias:

1. `react`: es una librería de JavaScript para crear interfaces de usuario.
2. `react-dom`: es una librería de JavaScript para manipular el DOM y renderizar nuestros componentes de React.

```sh
npm install react react-dom
```

### 1.3. Dependencias para los types de React y TypeScript

Para que React tenga soporte para TypeScript necesitamos instalar las siguientes dependencias:

1. `@types/react`: nos provee los types de React.
2. `@types/react-dom`: nos provee los types de React para el DOM.
3. `@types/node-sass`: nos provee los types de Sass.
4. `typescript`: para trabajar con TypeScript en nuestro proyecto.

```sh
npm install --save-dev @types/react @types/react-dom typescript
```

## 2. Configuración de Webpack

Para configurar Webpack necesitamos crear un archivo `webpack.config.js` en la raíz de nuestro proyecto con la siguiente configuración:

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const SRC_DIR = path.resolve(__dirname, "src");
const BUILD_DIR = path.resolve(__dirname, "build");

const entry = path.join(SRC_DIR, "index.tsx");
const html = path.join(SRC_DIR, "index.dev.html");

module.exports = {
    entry,
    output: {
        path: BUILD_DIR,
        filename: "bundle.js",
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.ts$|tsx/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react",
                                "@babel/preset-typescript",
                            ],
                        },
                    },
                    {
                        loader: "ts-loader",
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" }, // to inject the result into the DOM as a style block
                    { loader: "css-modules-typescript-loader" }, // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
                    { loader: "css-loader", options: { modules: true } }, // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
                    { loader: "sass-loader" }, // to convert SASS to CSS
                ],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".css", ".scss"],
        modules: [SRC_DIR, "node_modules"],
        alias: {
            "@components": SRC_DIR + "/components",
            "@pages": SRC_DIR + "/pages",
            "@utils": SRC_DIR + "/utils",
            "@styles": SRC_DIR + "/styles",
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: html,
            publicPath: "/",
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        open: true,
        port: 3000,
        compress: true,
        historyApiFallback: true,
    },
};
```
