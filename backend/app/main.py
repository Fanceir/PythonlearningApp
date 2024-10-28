# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, code  # 确保导入你的路由模块
from .db import connect_db, disconnect_db  # 假设你有数据库连接函数

app = FastAPI()

# 配置 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许所有来源的请求, 你可以指定具体的前端网址
    allow_credentials=True,
    allow_methods=["*"],  # 允许所有 HTTP 方法
    allow_headers=["*"],  # 允许所有请求头
)

# 添加路由
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(code.router, prefix="/code", tags=["code"])


# 启动和关闭数据库连接的事件
@app.on_event("startup")
async def startup():
    await connect_db()


@app.on_event("shutdown")
async def shutdown():
    await disconnect_db()
