import subprocess
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import logging

router = APIRouter()

# 设置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class CodeExecution(BaseModel):
    code: str


# 代码验证，避免执行潜在的危险操作
def validate_code(code: str):
    dangerous_keywords = [
        "import os",
        "import sys",
        "subprocess",
        "open(",
        "eval(",
        "exec(",
        "getattr(",
        "setattr(",
        "globals()",
        "locals()",
        "__import__",
        "os.system",
        "shutil",
    ]
    if any(keyword in code for keyword in dangerous_keywords):
        raise ValueError("Detected dangerous operation in the code.")


# 运行代码的主路由
@router.post("/execute")
async def execute_code(code_execution: CodeExecution):
    logger.info(f"Received code: {code_execution.code}")  # 输出接收到的代码

    try:
        # 先验证代码的安全性
        validate_code(code_execution.code)

        # 这里在 Docker 中执行代码，并限制资源（内存、CPU）和超时时间
        result = subprocess.check_output(
            [
                "docker",
                "run",
                "--rm",  # 容器运行完后自动删除
                "--memory=128m",  # 限制内存
                "--cpus=1",  # 限制 CPU 核心数
                "python:3.10",  # 使用 Python 3.10 镜像
                "python3",  # 使用 Python 3 执行
                "-c",  # 运行代码
                code_execution.code,  # 用户传入的代码
            ],
            stderr=subprocess.STDOUT,  # 捕获标准错误输出
            timeout=5,  # 超时时间为 5 秒
            text=True,  # 输出为文本格式
        )

        logger.info(f"Execution result: {result}")  # 输出执行结果
        return {"result": result}

    except ValueError as e:
        logger.error(f"Validation Error: {e}")
        raise HTTPException(status_code=400, detail=str(e))

    except subprocess.CalledProcessError as e:
        logger.error(f"Execution Error: {e.output}")
        raise HTTPException(
            status_code=400, detail=f"Error in code execution: {e.output}"
        )

    except subprocess.TimeoutExpired:
        logger.error("Execution timed out.")
        raise HTTPException(status_code=400, detail="Code execution timed out.")

    except Exception as e:
        logger.error(f"Unknown Error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error.")
