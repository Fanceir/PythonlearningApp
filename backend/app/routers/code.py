# routers/code.py
import subprocess
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()


class CodeExecution(BaseModel):
    code: str


def validate_code(code: str):
    dangerous_keywords = [
        "import os",
        "import sys",
        "subprocess",
        "open(",
        "eval(",
        "exec(",
    ]
    if any(keyword in code for keyword in dangerous_keywords):
        raise ValueError("补药橄榄我的环境")


@router.post("/execute")
async def execute_code(code_execution: CodeExecution):
    print(f"Received code: {code_execution.code}")  # 输出接收到的代码
    try:
        # 先验证代码安全性
        validate_code(code_execution.code)

        # 在 Docker 中执行 Python 代码的命令
        result = subprocess.check_output(
            [
                "docker",
                "run",
                "--rm",
                "--memory=128m",
                "--cpus=1",
                "python:3.10",
                "python3",
                "-c",
                code_execution.code,
            ],
            stderr=subprocess.STDOUT,
            timeout=5,
            text=True,
        )
        return {"result": result}

    except ValueError as e:
        print(f"Validation Error: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except subprocess.CalledProcessError as e:
        print(f"Execution Error: {e.output}")
        raise HTTPException(
            status_code=400, detail=f"Error in code execution: {e.output}"
        )
    except subprocess.TimeoutExpired:
        print("Execution timed out.")
        raise HTTPException(status_code=400, detail="Code execution timed out.")
    except Exception as e:
        print(f"Unknown Error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error.")
