# proste-create-react

在创建react项目时可选择同时安装一些第三方插件，或者预先创建项目中的文件夹（所有的文件夹都会在src中创建）。react模板使用<a href="https://github.com/facebook/create-react-app/tree/master/packages/cra-template">cra-template</a>, <a href="https://github.com/facebook/create-react-app/tree/master/packages/cra-template-typescript">cra-template-typescript</a>和<a href="https://github.com/facebook/create-react-app/tree/master/packages/react-scripts">react-scripts</a>。安装使用简易的方式实现create-react-app, 未直接使用create-react-app进行创建项目，尝试过创建和开发项目，未发现问题。如果日后出现问题会尝试将创建项目修改为使用create-react-app创建。

##  使用

```
  npx proste-create-react project_name


  npx proste-create-react <name> [--use-exact]

  or

  yarn create proste-create-react <name> [--use-exact]
```

##  已加入的packages
如果package需要对typescript安装类型提示，在选择use typescript后会安装对应的types，eslint也会安装对应的typescript插件。

+ <a href="https://github.com/eslint/eslint">Eslint</a>
+ <a href="https://github.com/tailwindlabs/tailwindcss">TailwindCss</a>
+ <a href="https://github.com/mobxjs/mobx">MobX</a>
+ <a href="https://github.com/ReactTraining/react-router#readme">react-router-dom</a>
+ <a href="https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config">react-router-config</a>
+ <a href="https://github.com/reduxjs/redux">redux</a>
+ <a href="https://github.com/reduxjs/react-redux">react-redux</a>
+ <a href="https://github.com/rematch/rematch">@rematch/core</a>
+ <a href="https://github.com/axios/axios">axios</a>
+ <a href="https://github.com/animate-css/animate.css">Animate.css</a>
+ <a href="https://github.com/lodash/lodash">lodash</a>

> 如果你在使用中遇到任何问题或者想要提出建议，欢迎到<b><a href="https://github.com/xyhxx/proste-create-react/issues">  issues  </a></b>中提出你的问题或者建议，我会在看到后尽快回复！！！

```
MIT License

Copyright (c) 2021 xyhxx

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```