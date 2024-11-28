# backend/app/code_runner.py
import jupyter_client
from fastapi import HTTPException
from typing import Dict

# 初始化 Jupyter 客户端
kernel_manager = jupyter_client.KernelManager()
kernel_manager.start_kernel()
client = kernel_manager.client


def run_python_code(code: str) -> Dict[str, str]:
    try:
        # 执行代码
        client.execute(code)

        # 获取执行结果
        output = ""
        while True:
            reply = client.get_shell_msg(timeout=10)  # 获取执行结果
            if "content" in reply and reply["content"]["status"] == "complete":
                break  # 执行完成

            if "text/plain" in reply["content"]:
                output = reply["content"]["text/plain"]

        return {"output": output}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
