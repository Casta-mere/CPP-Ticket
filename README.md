# CPP-Ticket

CPP 抢票 无差别同人展抢票 免安装 免环境配置 傻瓜式操作

# Docker-Compose 部署

```bash
docker compose up --build
docker compose down
```

Docker Pull 失败请参考 [Docker 换源](https://www.castamerego.com/docs/Docker/Basic#docker-%E6%8D%A2%E6%BA%90)

# Docker 单独部署

### 前端

```bash
# 下面这行只执行一次
docker volume create cpp_node_modules

cd Frontend
docker build -t cpp-ticket-frontend:V0.1 .
docker run --rm -v cpp_node_modules:/cpp-ticket/node_modules -v "$(pwd)/cpp-ticket:/cpp-ticket" -v "$(pwd)/static:/cpp-ticket/out_exported" cpp-ticket-frontend:V0.1
```

### 后端

```bash
cd ../
docker build -t cpp-ticket-backend:V0.1 .
docker run --rm -v "$(pwd):/cpp-ticket"  cpp-ticket-backend:V0.1
```
