'use client';

import React from 'react';
import { 
  XMarkIcon, 
  CloudArrowUpIcon, 
  DocumentIcon,
  EyeIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { useAuth, useApi } from './AuthContext';

interface UploadsModalProps {
  onClose: () => void;
  language: 'en' | 'zh';
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  ocrStatus?: 'pending' | 'processing' | 'completed' | 'failed';
  extractedData?: string[];
  fileUrl?: string;
  error?: string;
}

export function UploadsModal({ onClose, language }: UploadsModalProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [uploadedFiles, setUploadedFiles] = React.useState<UploadedFile[]>([]);
  const [selectedFiles, setSelectedFiles] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const { user } = useAuth();
  const api = useApi();
  
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const getText = (en: string, zh: string) => language === 'zh' ? zh : en;

  // Load existing files on component mount
  React.useEffect(() => {
    loadExistingFiles();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadExistingFiles = async (forceReload = false) => {
    if (!user) {
      console.log('No user available, skipping file load');
      return;
    }
    
    try {
      setLoading(true);
      console.log('Loading existing files for user:', user.email, forceReload ? '(force reload)' : '');
      
      // Add cache busting parameter to force reload
      const cacheBuster = forceReload ? `?t=${Date.now()}` : '';
      const response = await api.get(`/make-server-54a8f580/user/files${cacheBuster}`);
      console.log('Existing files response:', response);
      
      if (response && response.success && response.files) {
        const files = response.files.map((file: any) => ({
          id: file.id,
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'completed' as const,
          progress: 100,
          ocrStatus: file.ocrStatus || 'completed',
          extractedData: file.extractedData || [],
          fileUrl: file.fileUrl,
        }));
        
        console.log(`Loaded ${files.length} existing files:`, files);
        setUploadedFiles(files);
      } else if (response && !response.success) {
        console.error('Failed to load files:', response.error);
        setUploadedFiles([]);
      } else {
        console.log('No files found or unexpected response format');
        setUploadedFiles([]);
      }
    } catch (error) {
      console.error('Error loading existing files:', error);
      setUploadedFiles([]);
      
      // Show user-friendly error message
      if (error instanceof Error) {
        console.error('File loading error details:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = async (files: File[]) => {
    if (!user) {
      console.error('User not authenticated');
      return;
    }

    // Validate file types and sizes
    const validFiles = files.filter(file => {
      const isValidType = file.type.includes('pdf') || 
                         file.type.includes('image') || 
                         file.type.includes('application/pdf');
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      
      if (!isValidType) {
        console.error(`Invalid file type: ${file.type}`);
      }
      if (!isValidSize) {
        console.error(`File too large: ${file.size} bytes`);
      }
      
      return isValidType && isValidSize;
    });

    if (validFiles.length === 0) {
      return;
    }

    const newFiles: UploadedFile[] = validFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading',
      progress: 0,
      ocrStatus: 'pending',
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Upload files one by one
    for (let i = 0; i < validFiles.length; i++) {
      await uploadFile(validFiles[i], newFiles[i].id);
    }
  };

  const uploadFile = async (file: File, fileId: string) => {
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', user?.userId || '');
      formData.append('fileId', fileId);

      // Simulate upload progress
      const uploadInterval = setInterval(() => {
        setUploadedFiles(prev => 
          prev.map(f => {
            if (f.id === fileId && f.status === 'uploading') {
              const newProgress = Math.min(f.progress + Math.random() * 20, 90);
              return { ...f, progress: newProgress };
            }
            return f;
          })
        );
      }, 200);

      // Make upload request
      const token = localStorage.getItem('visaMate_accessToken');
      const response = await fetch(
        `https://eybfrryonupkvjhzfwaw.supabase.co/functions/v1/make-server-54a8f580/upload/file`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        }
      );

      clearInterval(uploadInterval);

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      const result = await response.json();

      // Update file status to processing
      setUploadedFiles(prev =>
        prev.map(f => {
          if (f.id === fileId) {
            return {
              ...f,
              status: 'processing',
              progress: 100,
              ocrStatus: 'processing',
              fileUrl: result.fileUrl,
            };
          }
          return f;
        })
      );

      // Start OCR processing
      await processFileOCR(fileId, result.fileUrl);

    } catch (error) {
      console.error('Upload error:', error);
      setUploadedFiles(prev =>
        prev.map(f => {
          if (f.id === fileId) {
            return {
              ...f,
              status: 'error',
              progress: 0,
              error: error instanceof Error ? error.message : 'Upload failed',
            };
          }
          return f;
        })
      );
    }
  };

  const processFileOCR = async (fileId: string, fileUrl: string) => {
    try {
      console.log('Starting OCR processing for file:', fileId);
      
      const response = await api.post('/make-server-54a8f580/ocr/process', {
        fileId,
        fileUrl,
      });

      console.log('OCR processing response:', response);

      if (response.success) {
        // Update local state first
        setUploadedFiles(prev =>
          prev.map(f => {
            if (f.id === fileId) {
              return {
                ...f,
                status: 'completed',
                ocrStatus: 'completed',
                extractedData: response.extractedData || [
                  getText('Document Type Identified', '文档类型已识别'),
                  getText('Date Fields Extracted', '提取日期字段'),
                  getText('Text Content Processed', '文本内容已处理'),
                ],
              };
            }
            return f;
          })
        );

        // Save file record to user's profile with retry logic
        const fileName = uploadedFiles.find(f => f.id === fileId)?.name || 'unknown-file';
        let saveSuccess = false;
        let retryCount = 0;
        const maxRetries = 3;

        while (!saveSuccess && retryCount < maxRetries) {
          try {
            console.log(`Attempting to save file record (attempt ${retryCount + 1}):`, { fileId, fileName });
            
            const saveResponse = await api.post('/make-server-54a8f580/user/files', {
              fileId,
              name: fileName,
              fileUrl,
              extractedData: response.extractedData,
            });

            console.log('File save response:', saveResponse);
            saveSuccess = true;
            
                         // Notify dashboard to refresh user data
             window.dispatchEvent(new CustomEvent('fileUploaded', { detail: { fileId, fileName } }));
             
             // Force refresh the file list immediately
             console.log('File saved successfully, refreshing file list...');
             setTimeout(() => {
               loadExistingFiles(true);
             }, 500);
             
           } catch (saveError) {
            retryCount++;
            console.error(`File save attempt ${retryCount} failed:`, saveError);
            
            if (retryCount >= maxRetries) {
              console.error('Failed to save file record after all retries');
              throw new Error(`Failed to save file record: ${saveError instanceof Error ? saveError.message : 'Unknown error'}`);
            }
            
            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
          }
        }
      } else {
        throw new Error(`OCR processing failed: ${response.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('OCR processing error:', error);
      setUploadedFiles(prev =>
        prev.map(f => {
          if (f.id === fileId) {
            return {
              ...f,
              ocrStatus: 'failed',
              error: error instanceof Error ? error.message : 'OCR failed',
            };
          }
          return f;
        })
      );
      
      // Re-throw the error so it can be handled by the upload function
      throw error;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const deleteFile = async (fileId: string) => {
    try {
      await api.delete(`/make-server-54a8f580/user/files/${fileId}`);
      setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
      setSelectedFiles(prev => prev.filter(id => id !== fileId));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const deleteSelectedFiles = async () => {
    try {
      await Promise.all(
        selectedFiles.map(fileId => 
          api.delete(`/make-server-54a8f580/user/files/${fileId}`)
        )
      );
      setUploadedFiles(prev => prev.filter(file => !selectedFiles.includes(file.id)));
      setSelectedFiles([]);
    } catch (error) {
      console.error('Error deleting selected files:', error);
    }
  };

  const rescanFiles = async () => {
    const filesToRescan = uploadedFiles.filter(f => selectedFiles.includes(f.id));
    
    for (const file of filesToRescan) {
      setUploadedFiles(prev =>
        prev.map(f => {
          if (f.id === file.id) {
            return { ...f, ocrStatus: 'processing' };
          }
          return f;
        })
      );
      
      if (file.fileUrl) {
        await processFileOCR(file.id, file.fileUrl);
      }
    }
    
    setSelectedFiles([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-background border border-border rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] m-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="mb-1">
              {getText('Upload Documents', '上传文档')}
            </h2>
            <p className="text-sm text-muted-foreground">
              <span data-lang-cn="拖放文档或点击浏览。支持PDF、JPG、PNG格式。">
                {getText(
                  'Drag and drop documents or click to browse. PDF, JPG, PNG supported.',
                  '拖放文档或点击浏览。支持PDF、JPG、PNG格式。'
                )}
              </span>
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
            aria-label={getText('Close upload dialog', '关闭上传对话框')}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Upload Area */}
        <div className="p-6 border-b border-border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">
              {getText('File Upload', '文件上传')}
            </h3>
            <button
              onClick={() => loadExistingFiles(true)}
              className="text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground px-3 py-1 rounded-md transition-colors"
            >
              {getText('Force Refresh Files', '强制刷新文件')}
            </button>
          </div>
          
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-all cursor-pointer hover:bg-neutral/50 ${
              isDragging 
                ? 'border-primary bg-primary/10' 
                : 'border-border'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <CloudArrowUpIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">
              {getText('Drop files here or click to browse', '在此放置文件或点击浏览')}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              <span data-lang-cn="最大文件大小：10MB。支持格式：PDF、JPG、PNG">
                {getText(
                  'Maximum file size: 10MB. Supported formats: PDF, JPG, PNG',
                  '最大文件大小：10MB。支持格式：PDF、JPG、PNG'
                )}
              </span>
            </p>
            
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-all hover-scale">
              {getText('Browse Files', '浏览文件')}
            </button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileSelect}
            className="hidden"
            aria-label={getText('Select files to upload', '选择要上传的文件')}
          />
        </div>

        {/* File List */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {loading && (
            <div className="flex items-center justify-center p-8">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-3 text-muted-foreground">
                {getText('Loading files...', '加载文件中...')}
              </span>
            </div>
          )}

          {!loading && uploadedFiles.length > 0 && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">
                  {getText('Uploaded Files', '已上传文件')} ({uploadedFiles.length})
                </h3>
                
                {selectedFiles.length > 0 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={rescanFiles}
                      className="text-sm font-medium text-accent hover:text-accent/80 transition-colors px-3 py-1 rounded-md hover:bg-accent/10"
                    >
                      {getText('Rescan Selected', '重新扫描所选')}
                    </button>
                    <button
                      onClick={deleteSelectedFiles}
                      className="text-sm font-medium text-error hover:text-error/80 transition-colors px-3 py-1 rounded-md hover:bg-error/10"
                    >
                      {getText('Delete Selected', '删除所选')} ({selectedFiles.length})
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="flex items-center gap-4 p-4 border border-border rounded-lg hover:shadow-sm transition-shadow">
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file.id)}
                      onChange={() => toggleFileSelection(file.id)}
                      className="w-4 h-4 text-primary focus:ring-primary border-border rounded"
                      aria-label={`Select ${file.name}`}
                    />
                    
                    <div className="flex-shrink-0">
                      <DocumentIcon className="w-8 h-8 text-primary" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium truncate">{file.name}</h4>
                        <span className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </span>
                        
                        {/* Status Indicator */}
                        {file.status === 'completed' && (
                          <CheckCircleIcon className="w-4 h-4 text-accent flex-shrink-0" />
                        )}
                        {file.status === 'error' && (
                          <ExclamationTriangleIcon className="w-4 h-4 text-error flex-shrink-0" />
                        )}
                      </div>
                      
                      {/* Progress Bar */}
                      {file.status === 'uploading' && (
                        <div className="mb-2">
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>{getText('Uploading...', '上传中...')}</span>
                            <span>{Math.round(file.progress)}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5">
                            <div 
                              className="bg-primary h-1.5 rounded-full transition-all duration-300"
                              style={{ width: `${file.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                      
                      {/* Error Message */}
                      {file.status === 'error' && file.error && (
                        <div className="mb-2 text-xs text-error">
                          {file.error}
                        </div>
                      )}
                      
                      {/* OCR Status */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            OCR: {file.ocrStatus === 'pending' && getText('Pending', '等待中')}
                            {file.ocrStatus === 'processing' && getText('Processing...', '处理中...')}
                            {file.ocrStatus === 'completed' && getText('Completed', '已完成')}
                            {file.ocrStatus === 'failed' && getText('Failed', '失败')}
                          </span>
                          
                          {file.ocrStatus === 'processing' && (
                            <div className="animate-spin w-3 h-3 border border-primary border-t-transparent rounded-full" />
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1">
                          {file.fileUrl && (
                            <button
                              onClick={() => window.open(file.fileUrl, '_blank')}
                              className="p-1 hover:bg-secondary rounded transition-colors"
                              aria-label={getText('Preview file', '预览文件')}
                            >
                              <EyeIcon className="w-4 h-4 text-muted-foreground" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteFile(file.id)}
                            className="p-1 hover:bg-secondary rounded transition-colors"
                            aria-label={getText('Delete file', '删除文件')}
                          >
                            <TrashIcon className="w-4 h-4 text-error" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Extracted Data Preview */}
                      {file.extractedData && file.extractedData.length > 0 && (
                        <div className="mt-2 p-2 bg-accent/10 rounded text-xs">
                          <div className="font-medium text-accent mb-1">
                            {getText('Extracted Information:', '提取的信息：')}
                          </div>
                          <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                            {file.extractedData.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!loading && uploadedFiles.length === 0 && (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <DocumentIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  <span data-lang-cn="尚未上传文件。开始上传以查看文件处理状态。">
                    {getText(
                      'No files uploaded yet. Start uploading to see file processing status.',
                      '尚未上传文件。开始上传以查看文件处理状态。'
                    )}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-neutral/30">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {uploadedFiles.length > 0 && (
                <span>
                  {getText(
                    `${uploadedFiles.filter(f => f.status === 'completed').length} of ${uploadedFiles.length} files processed`,
                    `${uploadedFiles.filter(f => f.status === 'completed').length} / ${uploadedFiles.length} 个文件已处理`
                  )}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {getText('Close', '关闭')}
              </button>
              <button
                onClick={onClose}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium transition-all hover-scale"
                disabled={uploadedFiles.filter(f => f.status === 'completed').length === 0}
              >
                {getText('Continue to Form Builder', '继续到表格构建器')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}