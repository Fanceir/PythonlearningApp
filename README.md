# 科学与工程计算大作业

## 前端结构设计 (React)

- 组件结构：模仿React官方文档，可以将导航栏、代码展示区、内容展示区分为独立组件，并使用`react-router`来管理不同页面的路由，确保组件和路由的清晰解耦。
- 代码编辑器集成：为了实现Python代码的在线运行环境，使用`monaco-editor`来作为代码编辑器，并配置成支持Python语法高亮。
- 状态管理：可以使用React Context来管理用户状态、代码运行状态等全局数据，这样可以保持组件的灵活性。

## 后端设计 (FastAPI)

- 用户管理：FastAPI适合处理RESTful请求，可以用它来实现用户注册、登录、会话管理等功能。可以考虑使用JWT（JSON Web Token）来处理用户认证，以保持无状态性。

## 数据库管理 (Prisma)

- 数据库模型：Prisma支持生成SQL模式文件，非常适合用于管理用户、代码存档等数据。可以为用户表、代码片段表设计相应的Prisma Schema，并通过FastAPI来创建API接口。
- 版本控制和迁移：使用Prisma的migration功能可以很好地管理数据库的版本和结构变更，方便日后扩展。

## 代码沙盒功能

- 安全性：建议在代码沙盒中为用户代码执行设置限制，比如运行时间限制、内存限制等，防止恶意代码的运行。
- 实时反馈：用户运行代码后，将输出的结果即时返回前端，可以使用WebSocket实现实时交互效果，提升用户体验。

my_app/
├── backend/
│ ├── app/
│ │ ├── main.py # 启动文件
│ │ ├── models/ # 数据库模型
│ │ │ ├── user.py # 用户模型
│ │ │  
│ │ ├── schemas/ # Pydantic数据模型
│ │ │ ├── user.py
│ │ │ └── code.py
│ │ ├── routers/ # 路由
│ │ │ ├── auth.py # 用户认证路由
│ │ │ └── code.py # 代码执行路由
│ │ ├── core/ # 核心配置和认证
│ │ │ ├── config.py # 配置信息
│ │ │ └── security.py # 安全设置和JWT管理
│ │ └── db.py # 数据库连接和Prisma初始化
└── prisma/
├── schema.prisma # Prisma schema
└── migrations/ # 数据库迁移文件
