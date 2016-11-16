# CMS
为运营人员提供便利,提供更多的可配置功能和可视化界面

### 概述
* 以backbone为基础框架搭建项目结构
* 采用underscore为模板引擎并提供部分工具函数
* requirejs进行模块管理
* 使用jquery,bootstrap做为基础UI框架
* 使用jquery.fileupload插件实现上传功能
* 使用bootstrap-datepicker插件实现日期控件
* 使用umeditor实现可视化文本编辑器

### 环境搭建&&调试开发命令
1.  npm install
2.  grunt

### grunt配置
1.  sass任务:css预编译处理
2.  connect任务:静态文件服务器
3.  watch任务:监听样式文件改动自动构建

### js目录结构
* `data` mock数据文件
* `router` 模块路由控制
* `tpl` 模块模板文件
* `views` 模块展现层 __主要业务逻辑__
* `util.js` 通用函数封装

### 入口
* 以pages/main.html为入口
* main.js为js控制入口并启动路由