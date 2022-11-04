module.exports = {
  env: {
    NODE_ENV: '"development"',
    apiPrefix: '"https://a1001zhuche.jds.wuchuheng.com/api/v1/miniProgram"'
    // apiPrefix: '"https://dev.a1001zhuche.wuchuheng.com/api/v1/miniProgram"'

  },
  defineConstants: {
  },
  mini: {
    enableSourceMap: true
  },
  alipay: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true
        },
        // 小程序端样式引用本地资源内联配置
        url: {
          enable: true,
          config: {
            limit: 10240 // 文件大小限制
          }
        }
      }
    }
  },
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true
        },
        // 小程序端样式引用本地资源内联配置
        url: {
          enable: true,
          config: {
            limit: 10240 // 文件大小限制
          }
        }
      }
    }
  },
  h5: {
    esnextModules: ['taro-ui']
  }
}
