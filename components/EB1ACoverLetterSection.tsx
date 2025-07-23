import React from 'react';
import { 
  DocumentTextIcon, 
  PencilIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  CloudArrowUpIcon,
  SparklesIcon,
  EyeIcon,
  DocumentArrowDownIcon,
  PlayIcon,
  StopIcon,
  TrashIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';

interface EB1ACoverLetterSectionProps {
  language: 'en' | 'zh';
  onShowUploads?: () => void;
}

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: Date;
  processed: boolean;
  category: 'award' | 'publication' | 'media' | 'recommendation' | 'other';
}

interface CoverLetterData {
  personalInfo: string;
  evidenceFiles: UploadedFile[];
  generatedContent: string;
  isGenerating: boolean;
  wordCount: number;
  lastGenerated: Date | null;
  generationProgress: number;
}

export function EB1ACoverLetterSection({ language, onShowUploads }: EB1ACoverLetterSectionProps) {
  const [coverLetterData, setCoverLetterData] = React.useState<CoverLetterData>({
    personalInfo: '',
    evidenceFiles: [],
    generatedContent: '',
    isGenerating: false,
    wordCount: 0,
    lastGenerated: null,
    generationProgress: 0
  });

  const [dragActive, setDragActive] = React.useState(false);
  const [showPreview, setShowPreview] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const getText = (en: string, zh: string) => language === 'zh' ? zh : en;

  // File upload handling
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      const newFile: UploadedFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        uploadDate: new Date(),
        processed: false,
        category: 'other' // Default category, user can change
      };

      setCoverLetterData(prev => ({
        ...prev,
        evidenceFiles: [...prev.evidenceFiles, newFile]
      }));

      // Simulate file processing
      setTimeout(() => {
        setCoverLetterData(prev => ({
          ...prev,
          evidenceFiles: prev.evidenceFiles.map(f => 
            f.id === newFile.id ? { ...f, processed: true } : f
          )
        }));
      }, 2000);
    });
  };

  const removeFile = (fileId: string) => {
    setCoverLetterData(prev => ({
      ...prev,
      evidenceFiles: prev.evidenceFiles.filter(f => f.id !== fileId)
    }));
  };

  const updateFileCategory = (fileId: string, category: UploadedFile['category']) => {
    setCoverLetterData(prev => ({
      ...prev,
      evidenceFiles: prev.evidenceFiles.map(f => 
        f.id === fileId ? { ...f, category } : f
      )
    }));
  };

  // GPT Cover Letter Generation
  const generateCoverLetter = async () => {
    if (coverLetterData.evidenceFiles.length === 0) {
      alert(getText('Please upload evidence files first', '请先上传证据文件'));
      return;
    }

    setCoverLetterData(prev => ({
      ...prev,
      isGenerating: true,
      generationProgress: 0
    }));

    // Simulate GPT generation process with progress
    const progressInterval = setInterval(() => {
      setCoverLetterData(prev => {
        const newProgress = prev.generationProgress + 10;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return {
            ...prev,
            generationProgress: 100,
            isGenerating: false,
            generatedContent: generateSampleCoverLetter(),
            wordCount: 850,
            lastGenerated: new Date()
          };
        }
        return { ...prev, generationProgress: newProgress };
      });
    }, 500);
  };

  const generateSampleCoverLetter = () => {
    return language === 'zh' ? 
      `尊敬的移民官：

我谨此提交EB-1A杰出人才移民申请，申请在美国获得永久居留权。作为在[专业领域]领域具有杰出能力的专业人士，我相信我的成就符合EB-1A的所有要求标准。

一、杰出能力证明
根据提交的证据材料，我在以下方面展现了杰出能力：

1. 获得国际奖项和荣誉
我曾获得多项国际级奖项，包括[具体奖项名称]，这些奖项在我的专业领域内具有重要意义和广泛认可度。

2. 原创性贡献
我的研究成果已发表在多个顶级期刊上，H指数达到[数值]，引用次数超过[数值]次（排除自引）。这些研究为行业发展做出了重要贡献。

3. 媒体报道
我的工作成果已被多家权威媒体报道，包括[媒体名称]，这些报道展现了我在该领域的国际影响力。

二、未来贡献计划
移居美国后，我计划在以下方面为美国做出贡献：
- 推动科技创新和产业发展
- 培养下一代专业人才
- 促进国际学术交流与合作

基于以上证据和计划，我恳请移民官批准我的EB-1A申请。

此致
敬礼

[申请人姓名]
[日期]` :
      `Dear Immigration Officer,

I am hereby submitting my EB-1A petition for an individual with extraordinary ability, seeking permanent residence in the United States. As a professional with extraordinary ability in [field], I believe my achievements meet all the required criteria for EB-1A classification.

I. Evidence of Extraordinary Ability
Based on the submitted evidence, I have demonstrated extraordinary ability in the following areas:

1. Receipt of International Awards and Recognition
I have received multiple international awards, including [specific award names], which carry significant recognition in my professional field.

2. Original Contributions
My research has been published in top-tier journals with an H-index of [number] and over [number] citations (excluding self-citations). These contributions have significantly advanced the field.

3. Media Coverage
My work has been featured in authoritative media outlets, including [media names], demonstrating my international influence in the field.

II. Future Contribution Plans
Upon immigration to the United States, I plan to contribute in the following ways:
- Advancing technological innovation and industry development
- Training the next generation of professionals
- Facilitating international academic exchange and cooperation

Based on the evidence and plans outlined above, I respectfully request approval of my EB-1A petition.

Sincerely,

[Applicant Name]
[Date]`;
  };

  const stopGeneration = () => {
    setCoverLetterData(prev => ({
      ...prev,
      isGenerating: false,
      generationProgress: 0
    }));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCategoryColor = (category: UploadedFile['category']) => {
    switch (category) {
      case 'award': return 'bg-yellow-100 text-yellow-800';
      case 'publication': return 'bg-blue-100 text-blue-800';
      case 'media': return 'bg-green-100 text-green-800';
      case 'recommendation': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryText = (category: UploadedFile['category']) => {
    const categories = {
      award: getText('Award', '奖项'),
      publication: getText('Publication', '发表'),
      media: getText('Media', '媒体'),
      recommendation: getText('Recommendation', '推荐信'),
      other: getText('Other', '其他')
    };
    return categories[category];
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center gap-2">
          <DocumentTextIcon className="w-6 h-6 text-primary" />
          {getText('EB1A Cover Letter Generator', 'EB1A申请信生成器')}
        </h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <SparklesIcon className="w-4 h-4" />
          {getText('AI-Powered', 'AI驱动')}
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <CloudArrowUpIcon className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-800">{getText('Files Uploaded', '已上传文件')}</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">{coverLetterData.evidenceFiles.length}</p>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircleIcon className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-800">{getText('Processed', '已处理')}</span>
          </div>
          <p className="text-2xl font-bold text-green-900">
            {coverLetterData.evidenceFiles.filter(f => f.processed).length}
          </p>
        </div>
        
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <DocumentTextIcon className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-purple-800">{getText('Word Count', '字数')}</span>
          </div>
          <p className="text-2xl font-bold text-purple-900">{coverLetterData.wordCount}</p>
        </div>
        
        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex items-center gap-2 mb-2">
            <ClockIcon className="w-5 h-5 text-amber-600" />
            <span className="font-medium text-amber-800">{getText('Last Generated', '最后生成')}</span>
          </div>
          <p className="text-sm text-amber-900">
            {coverLetterData.lastGenerated 
              ? coverLetterData.lastGenerated.toLocaleDateString()
              : getText('Never', '从未')
            }
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - File Upload */}
        <div>
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <CloudArrowUpIcon className="w-5 h-5 text-primary" />
            {getText('Upload Evidence Documents', '上传证据文档')}
          </h3>

          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
              dragActive 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <CloudArrowUpIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">
              {getText('Drag & drop files here', '拖拽文件到此处')}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              {getText('or click to browse', '或点击浏览文件')}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              {getText('Choose Files', '选择文件')}
            </button>
            <p className="text-xs text-muted-foreground mt-2">
              {getText('Supports: PDF, DOC, DOCX, JPG, PNG', '支持：PDF, DOC, DOCX, JPG, PNG')}
            </p>
          </div>

          {/* Uploaded Files List */}
          {coverLetterData.evidenceFiles.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium mb-3">
                {getText('Uploaded Files', '已上传文件')}
              </h4>
              <div className="space-y-3">
                {coverLetterData.evidenceFiles.map((file) => (
                  <div key={file.id} className="flex items-center gap-3 p-3 bg-secondary rounded-lg border">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-medium truncate">{file.name}</h5>
                        {file.processed ? (
                          <CheckCircleIconSolid className="w-4 h-4 text-green-600 flex-shrink-0" />
                        ) : (
                          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{formatFileSize(file.size)}</span>
                        <span>•</span>
                        <span>{file.uploadDate.toLocaleDateString()}</span>
                      </div>
                    </div>
                    <select
                      value={file.category}
                      onChange={(e) => updateFileCategory(file.id, e.target.value as UploadedFile['category'])}
                      className="text-xs px-2 py-1 rounded border bg-background"
                    >
                      <option value="award">{getText('Award', '奖项')}</option>
                      <option value="publication">{getText('Publication', '发表')}</option>
                      <option value="media">{getText('Media', '媒体')}</option>
                      <option value="recommendation">{getText('Recommendation', '推荐信')}</option>
                      <option value="other">{getText('Other', '其他')}</option>
                    </select>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(file.category)}`}>
                      {getCategoryText(file.category)}
                    </span>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="text-red-600 hover:text-red-800 transition-colors p-1"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Generation & Preview */}
        <div>
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <SparklesIcon className="w-5 h-5 text-primary" />
            {getText('AI Cover Letter Generation', 'AI申请信生成')}
          </h3>

          {/* Generation Controls */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={generateCoverLetter}
                disabled={coverLetterData.isGenerating || coverLetterData.evidenceFiles.length === 0}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors"
              >
                {coverLetterData.isGenerating ? (
                  <>
                    <ArrowPathIcon className="w-4 h-4 animate-spin" />
                    {getText('Generating...', '生成中...')}
                  </>
                ) : (
                  <>
                    <PlayIcon className="w-4 h-4" />
                    {getText('Generate Cover Letter', '生成申请信')}
                  </>
                )}
              </button>
              
              {coverLetterData.isGenerating && (
                <button
                  onClick={stopGeneration}
                  className="flex items-center gap-2 border border-border hover:bg-secondary text-foreground px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <StopIcon className="w-4 h-4" />
                  {getText('Stop', '停止')}
                </button>
              )}
            </div>

            {/* Generation Progress */}
            {coverLetterData.isGenerating && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    {getText('Generating cover letter...', '正在生成申请信...')}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {coverLetterData.generationProgress}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${coverLetterData.generationProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Generated Content Preview */}
          {coverLetterData.generatedContent && (
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="flex items-center justify-between p-4 bg-secondary border-b border-border">
                <h4 className="font-medium">
                  {getText('Generated Cover Letter', '生成的申请信')}
                </h4>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    <EyeIcon className="w-4 h-4" />
                    {showPreview ? getText('Hide', '隐藏') : getText('Preview', '预览')}
                  </button>
                  <button className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors">
                    <DocumentArrowDownIcon className="w-4 h-4" />
                    {getText('Download', '下载')}
                  </button>
                </div>
              </div>
              
              {showPreview && (
                <div className="p-4 max-h-96 overflow-y-auto">
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                      {coverLetterData.generatedContent}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tips */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <ExclamationTriangleIcon className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-800 mb-2">
                  {getText('Generation Tips', '生成提示')}
                </h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>• {getText('Upload evidence files from different categories for better results', '上传不同类别的证据文件以获得更好的结果')}</p>
                  <p>• {getText('Ensure all documents are clearly readable and properly categorized', '确保所有文档清晰可读并正确分类')}</p>
                  <p>• {getText('Review and customize the generated content before submission', '提交前请审核并自定义生成的内容')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}