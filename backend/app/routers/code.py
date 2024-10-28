# routers/code.py
import subprocess
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()


class CodeExecution(BaseModel):
    code: str


@router.post("/execute")
async def execute_code(code_execution: CodeExecution):
    try:
        result = subprocess.check_output(
            ["python3", "-c", code_execution.code],
            stderr=subprocess.STDOUT,
            timeout=5,
            text=True,
        )
        return {"result": result}
    except subprocess.CalledProcessError as e:
        raise HTTPException(status_code=400, detail=e.output)
    except subprocess.TimeoutExpired:
        raise HTTPException(status_code=400, detail="Code execution timed out.")
