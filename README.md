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

1. `sass`: nos permite integrar Sass con webpack.
2. `sass-loader`: nos permite integrar Sass con webpack.

```sh
npm install --save-dev babel-loader ts-loader sass sass-loader
```

Y por último, necesitamos un plugin que nos permite trabajar con HTML en webpack:

1. `html-webpack-plugin`: nos permite trabajar con HTML en webpack.

```sh
npm install --save-dev html-webpack-plugin
```

### 1.2. Dependencias de producción

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
3. `typescript`: es un lenguaje de programación de código abierto que se adapta a JavaScript.

```sh
npm install --save-dev @types/react @types/react-dom typescript
```