const path = require('path');

const moduleType = process.env.MODULE_TYPE // （umd/esm）

const outputConfig = moduleType === 'esm'
? { // esm
    filename: 'bundle.esm.js',
    path: path.resolve(__dirname, '../dist'),
    library: {
      type: 'module'
    }
  }
: { // umd
  filename: 'bundle.umd.js',
  globalObject: 'this', // 避免commonjs下出错 https://webpack.js.org/configuration/output/#outputglobalobject
  path: path.resolve(__dirname, '../dist'),
  library: {
    name: 'erba',
    type: 'umd'
  }
}

module.exports = {
  entry: './core/index.ts',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  experiments: { // 该特性只支持 type: 'module'
    outputModule: moduleType === 'esm',
  },
  output: outputConfig,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          { loader: 'css-loader' },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ]
      }
    ],
  }
};
