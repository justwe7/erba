## ErBa
**阿尔巴(二娃)**
> 葫芦七兄弟中的老二，拥有顺风耳和千里眼，机敏过人、耳聪目明，**攻击力较弱(指对用户)**。

核心功能基于 [rrweb](https://github.com/rrweb-io/rrweb) 实现，主要包含 `录制(sdk)` 和 `回放(admin)` 两部分。帮助运营分析用户行为、技术分析问题

期望录制的行为包括：用户界面、network、console、异常堆栈...

### 运行项目
> 所有指令均建议在项目根目录下运行

#### 目录结构
```bash
├── packages
│   ├── sdk       # 用户端jssdk --- 开发环境: http://localhost:8080/
│   ├── server    # 服务端 用于接收日志 --- 开发环境: http://localhost:8081/
│   └── admin     # 数据后台 查看上报日志 --- 开发环境: http://localhost:8082/
└── package.json
```

#### 安装依赖
```bash
npm install
```

#### 开发
```bash
# 同时启动所有子项目
npm run dev

# 仅开发sdk
npx lerna run dev --scope=sdk # http://localhost:8080/

# 仅开发服务端
npx lerna run dev --scope=server # http://localhost:8081/

# 仅开发数据后台
npx lerna run dev --scope=admin # http://localhost:8082/
```

#### 构建
```bash
npm run build
```

### 包管理方式
考虑开发场景，Monorepo方案选用 [lerna](https://lerna.js.org/) 进行管理而非pnpm(需要使用pnpm的指令进行新增依赖项)，后续考虑迁移方案

#### 为指定的子包新增依赖
示例：packages/sdk目录安装lodash：
```bash
npx lerna add lodash package/sdk
# 或者
npx lerna add lodash --scope=sdk
```
> 经尝试如果同时安装多个依赖只会读取第一个包名，后面的包名参数会丢失导致没有安装
> 
>临时方案：`多次执行，分别安装` / `到子包下面通过 npm 安装`

#### 创建一个新的由lerna管理的子包
```bash
npx lerna create admin
```


#### 其他指令
[所有指令](https://lerna.js.org/docs/api-reference/commands)

- `npx lerna clean` - 从所有包中删除node_modules目录
- `npx lerna exec` - 在每个包中执行任意命令

### 参考
- https://github.com/rrweb-io/rrweb/blob/master/docs/recipes/index.zh_CN.md
- https://www.cnblogs.com/China-Dream/p/15850752.html
- https://hijiangtao.github.io/2021/01/25/Web-Record-and-Replay/
- https://juejin.cn/post/6962052275787431966#heading-5
- https://musicfe.com/rrweb/
