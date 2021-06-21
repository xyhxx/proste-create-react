EN|<a href="https://github.com/xyhxx/proste-create-react/blob/main/doc/zh.md">中文</a>


# proste-create-react

When creating react project, you can choose to install some third-party plug-ins at the same time, or create the folder in the project in advance (all the folders will be created in src).react template use<a href="https://github.com/facebook/create-react-app/tree/master/packages/cra-template">cra-template</a>, <a href="https://github.com/facebook/create-react-app/tree/master/packages/cra-template-typescript">cra-template-typescript</a>和<a href="https://github.com/facebook/create-react-app/tree/master/packages/react-scripts">react-scripts</a>。The installation uses a simple way to achieve create react app, and does not directly use create react app to create projects. It has tried to create and develop projects, and no problems have been found. If there are problems in the future, we will try to change the creation project to create it with create react app.


##  Usage

```
  npx proste-create-react project_name


  npx proste-create-react <name> [--use-exact]

  or

  yarn create proste-create-react <name> [--use-exact]
```

##  Joined packages

If package needs type prompt for typescript installation, select use typescript to install the corresponding types, and eslint will also install the corresponding typescript plug-in.


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

> If you have any problems or want to make suggestions, welcome to<a href="https://github.com/xyhxx/proste-create-react/issues">issues</a>write your question or suggestion, I will reply as soon as I see it!!!
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