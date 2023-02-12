## 运营管理后台

[![Vue3](https://img.shields.io/badge/Framework-Vue3-42b883)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Develop-Vite-747bff)](https://vitejs.dev)
[![Pinia](https://img.shields.io/badge/Store-Pinia-f7d336)](https://pinia.vuejs.org)
[![node-current](https://img.shields.io/node/v/vite)](https://nodejs.org/en/about/releases/)

**Vue 3 + TypeScript + Vite**

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

### 开发
```bash
# 安装依赖(建议使用pnpm更稳定快速)
pnpm install
#或
npm install

# 启动项目
npm run dev
```

### 构建
```bash
# 生产环境
npm run build
```

### 特性

- [x] [Vue3](https://cn.vuejs.org/)
- [x] [TypeScript](https://www.typescriptlang.org/)
- [x] [Vite](https://vitejs.dev/)
- [x] [Vue Router](https://github.com/vuejs/router)
- [x] [Pinia](https://pinia.vuejs.org/)
- [x] Scss
- [x] [tailwind](https://tailwindcss.com/docs/flex-basis)
- [x] [Acro Design](https://arco.design/vue/docs/start)
- [x] axios
- [x] eslint([standard](https://github.com/standard/standard/blob/master/docs/README-zhcn.md))
- [ ] [Stylelint](https://stylelint.io/)
- [x] [Commitlint](https://github.com/conventional-changelog/commitlint)
- [x] [echarts](https://echarts.apache.org/zh/index.html)
- [x] mockjs

### 目录说明
```bash
├── README.md
├── package.json
├── index.html
├── src
│   ├── api  # 请求接口
│   ├── assets  # 静态资源
│   ├── components  # 通用业务组件
│   ├── config  # 全局配置(包含echarts主题)
│          └── settings.json  # 配置文件
│   ├── directives # 指令集
│   ├── styles #全局样式
│   ├── filters # 过滤器
│   ├── hooks # 全局hooks
│   ├── layout  # 布局
│   ├── locale  # 国际化语言包
│   ├── mock  # 模拟数据
│   ├── views  # 页面模板
│   ├── router # 路由配置
│   ├── store  # 状态管理中心
│   ├── types  # Typescript 类型
│   └── utils  # 工具库
│   └── App.vue  # 视图入口
│   └── main.ts  # 入口文件
└── tsconfig.json
```

### 推荐的 IDE 设置

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (工作区禁用 `Vetur`) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).
