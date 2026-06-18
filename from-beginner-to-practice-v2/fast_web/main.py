from fastapi import FastAPI
from starlette.responses import JSONResponse

# Custom exception handler for 404 errors globally
async def exception_handler(request, exc):
    return JSONResponse({
        "code": exc.status_code,
        "error": "没有定义这个请求地址"},
        status_code=exc.status_code)

exception_handlers = {404: exception_handler}

app = FastAPI(title="My First FastAPI App", description="This is a simple FastAPI application.", version="1.0.0", 
            swagger_ui_oauth2_redirect_url="/docs/oauth2-redirect",
            swagger_ui_init_oauth=None,
            docs_url="/docs",
            redoc_url="/redoc",
            openapi_url="/openapi/openapi_json.json",
            exception_handlers=exception_handlers,
            debug=True
)

# ============== 注册路由方式1：装饰器方式 ================
@app.get("/", response_class=JSONResponse)
@app.get("/index", response_class=JSONResponse)
@app.post("/home", response_class=JSONResponse)
@app.get("/app/hello", tags=["app实例对象注册接口-示例"])
def app_hello():
    return {"message": "Hello, FastAPI!"}

# ============== 同一个URL的动态和静态路由 谁先注册优先访问谁 ================
#动态路由
@app.get('/user/{userid}')
async def get_user(userid: str):
    return {"message": f"User ID: {userid}"}

#静态路由
@app.get('/user/userid')
async def login():
    return {"message": "This is the static route for /user/userid"} 

# ============== 一个URL配置多个HTTP请求方法 ================
# ============= 注册路由方式2：app 提供APIRoute类的实例对象提供的装饰器或者函数 ================
@app.api_route(path='/multi-method', methods=['GET', 'POST', 'PUT'])
async def multi_method():
    return {"message": "This endpoint supports GET, POST, and PUT methods."}

# ============= 注册路由方式3：add_api_route方式 + JSONResponse返回类型 ================
async def multi_method2():
    return JSONResponse({"message": "This endpoint supports GET, POST, and PUT methods."})  

app.add_api_route(path='/multi-method2', endpoint=multi_method2, methods=['GET', 'POST', 'PUT'])   



if __name__ == "__main__":
    import uvicorn
    import os
    app_modeel_name = os.path.basename(__file__).replace(".py", "")
    print(f"Running {app_modeel_name} in development mode...")
    uvicorn.run(f"{app_modeel_name}:app", host="127.0.0.1", port=8088, reload=True)