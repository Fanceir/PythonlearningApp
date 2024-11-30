# 使用官方 Python 3.10 镜像
FROM python:3.10

# 设置工作目录
WORKDIR /app

# 安装其他依赖
# RUN pip install numpy

# 复制代码到容器内
COPY . /app

