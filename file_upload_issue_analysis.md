# Dashboard 文件上传功能问题分析

## 问题现象
用户在 dashboard 页面上传文件后，刷新页面无法看到已上传的文件。

## 根本原因分析

### 1. JWT 认证中间件问题
- **问题**: 当前的 `authMiddleware` 简化了 JWT 验证逻辑，仅依赖于 token 格式判断
- **影响**: 在 Supabase Edge Functions 环境中，可能存在 JWT 验证不一致的问题
- **位置**: `supabase/functions/server/index.tsx:78-102`

### 2. 数据库存储逻辑缺陷
基于代码分析，发现以下几个关键问题：

#### a) 文件记录保存不完整
```typescript
// 在 UploadsModal.tsx 中，OCR 处理完成后
await api.post('/make-server-54a8f580/user/files', {
  fileId,
  name: uploadedFiles.find(f => f.id === fileId)?.name,
  fileUrl,
  extractedData: response.extractedData,
});
```
这个调用可能失败，导致文件记录没有正确保存到数据库。

#### b) KV Store 数据一致性问题
```typescript
// 在服务器端，文件数据分两个地方存储：
const fileKey = `user_file_${userId}_${fileId}`;  // 单个文件详情
const userFilesKey = `user_files_${userId}`;      // 用户文件索引
```
如果两个存储操作之间发生错误，会导致数据不一致。

#### c) 页面刷新时的数据加载问题
在 `Dashboard.tsx` 中：
```typescript
const handleCloseUploads = () => {
  setShowUploadsModal(false);
  // Trigger a page refresh to reload user data and file statistics
  window.location.reload();
};
```
直接刷新整个页面，而不是重新获取数据，可能导致状态丢失。

### 3. 文件获取逻辑问题
在 `UploadsModal.tsx` 的 `loadExistingFiles` 函数中：
```typescript
const response = await api.get('/make-server-54a8f580/user/files');
```
这个 API 调用如果失败，会静默忽略错误，导致文件列表为空。

## 修复方案

### 1. 增强错误处理和日志记录
### 2. 修复数据存储的原子性操作  
### 3. 改进页面数据刷新机制
### 4. 添加数据库操作验证

## 需要检查的具体位置

1. **UploadsModal.tsx:252-260** - 文件记录保存逻辑
2. **server/index.tsx:157-168** - 文件索引更新逻辑  
3. **server/index.tsx:219-227** - OCR 处理后的数据更新
4. **Dashboard.tsx:34-40** - 关闭上传模态框的处理逻辑
5. **AuthContext.tsx:248-290** - API 调用的错误处理