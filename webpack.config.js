const Encore = require('@symfony/webpack-encore');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Pug = require('pug');

const pages = {
  'index.pug': 'index.html',
  'license.pug': 'license.html'
};

Encore
  .setOutputPath('./docs/')
  .setPublicPath('/')
  .addEntry('index', './docs-src/js/index.js')
  .disableSingleRuntimeChunk()
  .enableIntegrityHashes(Encore.isProduction())
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())
  .enableSassLoader()
  .addPlugin(new CopyPlugin([
    { from: './docs-src/static/', to: 'static/[path][name].[ext]' },
    { from: './docs-src/CNAME', to: '[path][name].[ext]' }
  ]))
  .addLoader({
    test: /\.pug$/,
    oneOf: [
      {
        use: [
          {
            loader: 'raw-loader'
          },
          {
            loader: 'pug-plain-loader',
            options: {
              data: {
                debug: false,
              },
              filters: {
                'render-escape': function (block) {
                  return Pug.render(block, {pretty: true}, null)
                    .replace(/[\u00A0-\u9999<>&]/gim, function (i) {
                      return '&#' + i.charCodeAt(0) + ';';
                    });
                }
              }
            }
          }
        ]
      }
    ]
  })
;

for (const pageSrc in pages) {
  Encore.addPlugin(new HtmlWebpackPlugin({
    template: './docs-src/' + pageSrc,
    inject: true,
    chunks: ['index'],
    filename: pages[pageSrc]
  }))
}

module.exports = Encore.getWebpackConfig();
