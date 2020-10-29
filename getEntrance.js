const path = require('path');
const fs = require('fs');
const entrancePaths = path.resolve(__dirname, '../src/entrances')
const files = fs.readdirSync(entrancePaths);
let entrances = [];
files.forEach(item => {
  const { ext, name} = path.parse(item);
  if (ext === '.js') { 
    entrances.push(name)
  }
})

module.exports = entrances;

  // 配置多个入口
  let entrys = {};
  // 生成多个入口文件
  let pluginsHtmls = [];
  entrances.forEach(name => {
    // 如果是生产环境 不等于当前打包的应用不给他进去
    const dirName = env.raw.BUILD_ENV;
    if (isEnvProduction && name !== dirName) {
      return false;
    }

    // 配置入口文件
    entrys[name] = [
      isEnvDevelopment &&
      require.resolve('react-dev-utils/webpackHotDevClient'),
      path.resolve(paths.appEntranceJs, name + '.js')
    ].filter(Boolean)
    pluginsHtmls.push(
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            chunks: [name],
            template: paths.appHtml,
            filename: isEnvProduction ? `${dirName}/index.html`: name + '.html'
          },
          isEnvProduction
            ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
            : undefined
        )
      )
    )
  });