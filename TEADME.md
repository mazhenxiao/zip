# webpack zip
* webpack 打包完成后生成zip包，解决内网下无法再jenkins服务器下载生成node_modules包，只能上传本地生成zip

需要在.gitignore文件下删除有关*.zip或dist.zip 相关内容，否则会造成生成zip也无法上传git服务器。

### 注意：在mac、linux环境使用tar进行打包。

如未安装tar，请使用apt-get自行安装。

~~~ shell
apt-get install tar
~~~

### window环境下使用powershell的Compress-Archive 命令进行打包。

### 例子

|参数|说名|例子|
|-|-|-|
|arg0|压缩目录名称,与压缩包同名|"dist"|
|arg1|压缩路径|默认"./"|

```javascript
module.exports = {
        configureWebpack: config => {
            return {
                plugins: [new createZIP("dist")]
            };
        }
```
