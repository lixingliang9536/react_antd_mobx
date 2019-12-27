/**
 * 此文件用于项目编译时缓存 loader 的执行结果，
 * 之后的 webpack 构建，将会尝试读取缓存，来避免在每次执行时，
 * 可能产生的、高性能消耗的 Babel 重新编译过程
 */

module.exports = (api) => {
  api.cache(true);
  return {
    presets: [
      "@babel/preset-env",    //可以在项目中使用所有 ECMAScript 标准里的最新特性
      "@babel/preset-react"   //可以在项目中使用 react 语法。
    ],
    plugins: [
      //可以在项目中使用装饰器语法  mobx
      [
        "@babel/plugin-proposal-decorators",  //最好放在第一位，否则可能会出现某些注解失效的问题
        {
          "legacy": true
        }
      ],

      //使用此插件可以直接使用 babel-runtime 中的代码对 js 文件进行转换，避免代码冗余。
      [
        "@babel/plugin-transform-runtime",
        {
          "corejs": 2
        }
      ],

      //可以在项目中使用新的 class 属性语法。
      [
        "@babel/plugin-proposal-class-properties", 
        {
          "loose": true
        }
      ],

      // 可以使用管道运算符 |> 
      [
        "@babel/plugin-proposal-pipeline-operator",
        {
          "proposal": "minimal"
        }
      ],

      // antd 按需加载样式配置
      [
        "import",
        {
          "libraryName": "antd",
          "libraryDirectory": "es",
          "style": true
        }
      ],

      "@babel/plugin-syntax-dynamic-import",  // 可以在项目中使用 import() 这种语法

      "@babel/plugin-proposal-export-namespace-from", // 可以使用 export * 这种命名空间的方式导出模块

      "@babel/plugin-proposal-throw-expressions", // 可以使用异常抛出表达式

      "@babel/plugin-proposal-export-default-from", // 默认导出

      "@babel/plugin-proposal-logical-assignment-operators",  // 可以使用逻辑赋值运算符

      "@babel/plugin-proposal-optional-chaining", // 可以使用可选链的方式访问深层嵌套的属性或者函数 ?.
      
      "@babel/plugin-proposal-nullish-coalescing-operator",  // 可以使用空值合并语法 ??

      "@babel/plugin-proposal-do-expressions",  // 可以使用 do 表达式（可以认为是三元运算符的复杂版本）
      
      "@babel/plugin-proposal-function-bind"   // 可以使用功能绑定语法 obj::func
    ]
  }
}