// 一个 JavaScript 命名函数。
const { spawn } = require("child_process");
const { existsSync, rmSync } = require("fs");
const os = require("os");
function createZIP(name, path = "./") {
  if (existsSync(`${path}${name}.zip`)) {
    rmSync(`${path}${name}.zip`);
  }
  Object.assign(this, {
    name,
    path
  });
  // this.name = name;
}

// 在插件函数的 prototype 上定义一个 `apply` 方法。
createZIP.prototype.apply = function(compiler) {
  // 指定一个挂载到 webpack 自身的事件钩子。
  //   compiler.plugin(
  //     "webpacksEventHook",
  //     function (compilation /* 处理 webpack 内部实例的特定数据。*/, callback) {

  //         compilation
  //       // 功能完成后调用 webpack 提供的回调。
  //       callback();
  //     }
  //   );
  const name = this.name || "dist";
  const path = this.path || "./";
  compiler.hooks.done.tap("createZIP", compilation => {
    if (os.platform().includes("win32")) {
      spawn("powershell", [
        `Compress-Archive -Path ${path}${name} ${name}.zip`
      ]);
    } else {
      spawn(`tar -cvf ${name}.zip ${path}${name}`);
    }
  });
};
module.exports = createZIP;
