#!/bin/bash

echo "=== 文件上传功能测试脚本 ==="
echo

# 配置
SUPABASE_URL="https://eybfrryonupkvjhzfwaw.supabase.co"
API_BASE="${SUPABASE_URL}/functions/v1/make-server-54a8f580"
USER_TOKEN="demo-token-user123"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 测试函数
test_api() {
    local endpoint=$1
    local method=$2
    local data=$3
    local description=$4
    
    echo -e "${YELLOW}测试: ${description}${NC}"
    echo "端点: ${method} ${endpoint}"
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -w "HTTPSTATUS:%{http_code}" \
            -X GET "${endpoint}" \
            -H "Authorization: Bearer ${USER_TOKEN}" \
            -H "Content-Type: application/json")
    else
        response=$(curl -s -w "HTTPSTATUS:%{http_code}" \
            -X POST "${endpoint}" \
            -H "Authorization: Bearer ${USER_TOKEN}" \
            -H "Content-Type: application/json" \
            -d "${data}")
    fi
    
    body=$(echo $response | sed -E 's/HTTPSTATUS\:[0-9]{3}$//')
    status=$(echo $response | tr -d '\n' | sed -E 's/.*HTTPSTATUS:([0-9]{3})$/\1/')
    
    if [ "$status" -eq 200 ]; then
        echo -e "${GREEN}✅ 成功 (状态码: ${status})${NC}"
        echo "响应: ${body}" | jq . 2>/dev/null || echo "响应: ${body}"
    else
        echo -e "${RED}❌ 失败 (状态码: ${status})${NC}"
        echo "响应: ${body}"
    fi
    echo
}

# 1. 测试服务器健康状态
echo -e "${YELLOW}=== 1. 服务器健康检查 ===${NC}"
curl -s "${API_BASE}/health" \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5YmZycnlvbnVwa3ZqaHpmd2F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwNzg0OTQsImV4cCI6MjA2ODY1NDQ5NH0.Pz9bxwzJG0LP5yE5H4AEW6WFiCXuf0SlRg0jwS2Cmaw" | jq .
echo

# 2. 测试用户档案获取
test_api "${API_BASE}/user/profile" "GET" "" "获取用户档案"

# 3. 测试文件列表获取
test_api "${API_BASE}/user/files" "GET" "" "获取用户文件列表"

# 4. 测试时间线获取
test_api "${API_BASE}/user/timeline" "GET" "" "获取用户时间线"

# 5. 测试检查清单获取
test_api "${API_BASE}/user/checklist" "GET" "" "获取用户检查清单"

echo -e "${YELLOW}=== 测试完成 ===${NC}"
echo
echo "要测试文件上传功能，请："
echo "1. 在浏览器中打开 test-upload.html"
echo "2. 使用界面测试文件上传"
echo "3. 检查数据库中的文件记录"
echo
echo "或者直接访问 dashboard 页面测试上传功能。"