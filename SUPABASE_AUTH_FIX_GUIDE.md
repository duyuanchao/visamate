# Supabase 认证配置修复指南

## 问题诊断结果
通过深入分析，确认了文件上传功能失败的根本原因是 Supabase Edge Functions 的 JWT 认证配置问题。

## 🔧 修复步骤

### 步骤 1: 替换 AuthContext (推荐方式)

用修复后的 `AuthContextFixed.tsx` 替换当前的 `AuthContext.tsx`：

```bash
# 备份原文件
mv components/AuthContext.tsx components/AuthContext.backup.tsx

# 使用修复版本
mv components/AuthContextFixed.tsx components/AuthContext.tsx
```

**主要改进:**
- ✅ 使用真正的 Supabase 认证 API
- ✅ 正确的 JWT token 管理
- ✅ 自动的认证状态监听
- ✅ 错误处理和重试机制

### 步骤 2: 验证服务器端修复

确认 `supabase/functions/server/index.tsx` 中的以下修复已应用：

1. **启用 Supabase 客户端:**
```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);
```

2. **修复认证中间件:**
```typescript
const authMiddleware = async (c: any, next: any) => {
  // ... 正确的 JWT 验证逻辑
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  
  if (error || !user) {
    return c.json({ error: 'Invalid token' }, 401);
  }
  
  c.set('userId', user.id);
  c.set('user', user);
  // ...
};
```

### 步骤 3: 重新部署 Edge Functions

如果你的服务器端函数需要重新部署，运行：

```bash
# 部署 Supabase Edge Functions (如果适用)
supabase functions deploy server

# 或者如果使用其他部署方式，请按照你的部署流程
```

### 步骤 4: 测试修复

1. **打开测试页面:**
   - 在浏览器中打开 `test-auth-fix.html`
   
2. **测试注册/登录:**
   - 尝试注册新用户或登录现有用户
   - 确认认证状态正确显示

3. **测试 API 端点:**
   - 点击"测试用户档案"
   - 点击"测试文件列表"
   - 确认返回成功响应而不是 401 错误

4. **测试文件上传:**
   - 选择一个文件
   - 点击"上传文件"
   - 确认文件上传成功

## 🔄 回退到简化认证 (备选方案)

如果 Supabase 认证还有问题，可以使用简化的认证方案：

### 1. 使用演示 token

在前端设置演示 token：
```javascript
localStorage.setItem('visaMate_accessToken', 'demo-token-user123');
```

### 2. 服务器端支持演示 token

确认服务器端的认证中间件支持演示 token：
```typescript
if (token.includes('demo-token-')) {
  const userId = token.split('-')[2] || 'user123';
  c.set('userId', userId);
  c.set('user', { id: userId, email: `${userId}@demo.com` });
  // ...
}
```

## 📋 验证清单

修复完成后，确认以下功能正常：

- [ ] ✅ 用户可以注册/登录
- [ ] ✅ 获取用户档案 API 返回 200
- [ ] ✅ 获取文件列表 API 返回 200
- [ ] ✅ 文件上传功能正常工作
- [ ] ✅ 上传后刷新页面可以看到文件
- [ ] ✅ Dashboard 显示正确的文件统计

## 🔍 调试技巧

### 1. 检查浏览器控制台
```javascript
// 检查当前认证状态
const { data: { session } } = await supabase.auth.getSession();
console.log('Current session:', session);
```

### 2. 检查 API 响应
```javascript
// 手动测试 API 调用
const response = await fetch('/api/endpoint', {
  headers: {
    'Authorization': `Bearer ${session.access_token}`
  }
});
console.log('Response status:', response.status);
```

### 3. 服务器端日志
查看 Edge Functions 的日志以确认认证过程：
```bash
supabase functions logs server
```

## 🚀 后续优化

修复认证后，考虑以下优化：

1. **添加认证状态持久化**
2. **实现 token 自动刷新**
3. **添加更详细的错误处理**
4. **优化用户体验反馈**

## 📞 支持

如果遇到问题：

1. 检查 Supabase 项目设置
2. 确认环境变量正确配置
3. 查看浏览器和服务器端的错误日志
4. 使用 `test-auth-fix.html` 进行逐步调试

---

**重要提醒**: 修复认证是解决文件上传问题的关键步骤。一旦认证正常工作，之前实施的所有其他改进（错误处理、数据同步、重试机制等）都将发挥作用。