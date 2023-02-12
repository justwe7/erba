const port = process.env.PORT || 8080

const Webpack = require('webpack')
const { merge } = require('webpack-merge')
const WebpackDevServer = require('webpack-dev-server')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const baseWebpackConfig = require('./webpack.config')

const devWebpackConfig = {
  mode: 'development',
  entry: './src/main.ts',
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      inject: true
    })
  ]
}

const compiler = Webpack(
  merge(baseWebpackConfig, devWebpackConfig)
)

const devServerOptions = {
  client: {
    logging: 'error',
  },
  host: '127.0.0.1',
  historyApiFallback: true,
  open: !true,
  compress: true,
  hot: true,
  port,
  proxy: {
  }
}
const server = new WebpackDevServer(devServerOptions, compiler)

const runServer = async () => {
  console.log(`Sdk example Starting server on Port ${port}`)
  await server.start();
};

runServer()
