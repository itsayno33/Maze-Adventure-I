const path = require('path');

module.exports = {
  mode: 'development',
//entry: path.resolve(__dirname, 'index.ts'),
  entry: "D:/Top/Dev/ts/mai/src/app/app.ts",
  output: {
//  path: path.resolve(__dirname),
    path: "D:/Top/Dev/Docker/Mai/bck/app/",
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.ts'],
    alias: {
        '@cmn': path.resolve(__dirname, '../d_cmn'),
        '@mdl': path.resolve(__dirname, '../d_mdl'),
        '@utl': path.resolve(__dirname, '../d_utl'),
    },
  },
  target: 'node',
  node: {
    __dirname:  false,
    __filename: false
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
//          configFile: "D:/Top/Dev/ts/mai/src/app/tsconfig.json",
          },
        },
      },
    ],
  },
};
