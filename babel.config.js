module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage', // 按需引入 polyfill
        corejs: 3,
        targets: {
          browsers: ["last 3 versions", "ie >= 10"]
        }
      },
    ],
    [
      '@babel/preset-typescript', // 引用Typescript插件
      {
        allExtensions: true,// 支持所有文件扩展名，否则在vue文件中使用ts会报错
      },
    ],
  ],
  plugins: [
    ["@babel/plugin-transform-typescript",
      {
        allowDeclareFields: true,
      }
    ],
    [ '@babel/plugin-transform-runtime',
      {
        "proposals": true,
        "corejs": 3
      }
    ],
    ["@babel/proposal-decorators", { "legacy": true }],
  ],
}
