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
  ArrowPathIcon,
  TrophyIcon,
  AcademicCapIcon,
  NewspaperIcon,
  UserGroupIcon,
  DocumentIcon
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

interface EvidenceCategory {
  id: 'award' | 'publication' | 'media' | 'recommendation' | 'other';
  name: string;
  name_zh: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  description_zh: string;
  requirements: string[];
  requirements_zh: string[];
  tips: string[];
  tips_zh: string[];
  acceptedFormats: string[];
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
  // Generate mock data
  const generateMockFiles = (): UploadedFile[] => [
    // Awards
    {
      id: 'mock-award-1',
      name: 'IEEE_Outstanding_Achievement_Award_2023.pdf',
      type: 'application/pdf',
      size: 2450000,
      uploadDate: new Date('2024-01-15'),
      processed: true,
      category: 'award'
    },
    {
      id: 'mock-award-2',
      name: 'National_Science_Foundation_Excellence_Award.pdf',
      type: 'application/pdf',
      size: 1850000,
      uploadDate: new Date('2024-01-20'),
      processed: true,
      category: 'award'
    },
    {
      id: 'mock-award-3',
      name: 'ACM_Distinguished_Scientist_Certificate.jpg',
      type: 'image/jpeg',
      size: 980000,
      uploadDate: new Date('2024-01-25'),
      processed: true,
      category: 'award'
    },
    
    // Publications
    {
      id: 'mock-pub-1',
      name: 'Nature_AI_Breakthrough_Research_2023.pdf',
      type: 'application/pdf',
      size: 3200000,
      uploadDate: new Date('2024-02-01'),
      processed: true,
      category: 'publication'
    },
    {
      id: 'mock-pub-2',
      name: 'Patent_US11234567_ML_Algorithm.pdf',
      type: 'application/pdf',
      size: 1560000,
      uploadDate: new Date('2024-02-05'),
      processed: true,
      category: 'publication'
    },
    {
      id: 'mock-pub-3',
      name: 'Google_Scholar_Citation_Report_H_Index_42.pdf',
      type: 'application/pdf',
      size: 890000,
      uploadDate: new Date('2024-02-10'),
      processed: true,
      category: 'publication'
    },
    
    // Media
    {
      id: 'mock-media-1',
      name: 'MIT_Technology_Review_Feature_Article.pdf',
      type: 'application/pdf',
      size: 1200000,
      uploadDate: new Date('2024-02-15'),
      processed: true,
      category: 'media'
    },
    {
      id: 'mock-media-2',
      name: 'Forbes_Tech_Innovator_Interview_2024.pdf',
      type: 'application/pdf',
      size: 2100000,
      uploadDate: new Date('2024-02-20'),
      processed: true,
      category: 'media'
    },
    
    // Recommendations
    {
      id: 'mock-rec-1',
      name: 'Stanford_Prof_Dr_Smith_Recommendation.pdf',
      type: 'application/pdf',
      size: 450000,
      uploadDate: new Date('2024-03-01'),
      processed: true,
      category: 'recommendation'
    },
    {
      id: 'mock-rec-2',
      name: 'MIT_Director_Dr_Johnson_Letter.pdf',
      type: 'application/pdf',
      size: 520000,
      uploadDate: new Date('2024-03-05'),
      processed: true,
      category: 'recommendation'
    },
    {
      id: 'mock-rec-3',
      name: 'Google_AI_Lead_Dr_Williams_Reference.pdf',
      type: 'application/pdf',
      size: 380000,
      uploadDate: new Date('2024-03-10'),
      processed: true,
      category: 'recommendation'
    },
    
    // Other
    {
      id: 'mock-other-1',
      name: '2023_Tax_Return_W2_High_Salary_Evidence.pdf',
      type: 'application/pdf',
      size: 1100000,
      uploadDate: new Date('2024-03-15'),
      processed: true,
      category: 'other'
    },
    {
      id: 'mock-other-2',
      name: 'AI_Conference_Peer_Review_Record_2024.pdf',
      type: 'application/pdf',
      size: 750000,
      uploadDate: new Date('2024-03-20'),
      processed: true,
      category: 'other'
    }
  ];

  const [coverLetterData, setCoverLetterData] = React.useState<CoverLetterData>({
    personalInfo: 'Dr. Wei Zhang - AI/ML Research Expert',
    evidenceFiles: generateMockFiles(), // Initialize with mock data
    generatedContent: '',
    isGenerating: false,
    wordCount: 1850, // Mock word count
    lastGenerated: new Date('2024-03-25'), // Mock last generation date
    generationProgress: 0
  });

  const [activeTab, setActiveTab] = React.useState<'award' | 'publication' | 'media' | 'recommendation' | 'other'>('award');
  const [dragActive, setDragActive] = React.useState(false);
  const [showPreview, setShowPreview] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const getText = (en: string, zh: string) => language === 'zh' ? zh : en;

  // Evidence categories with detailed guidance
  const evidenceCategories: EvidenceCategory[] = [
    {
      id: 'award',
      name: 'Awards & Recognition',
      name_zh: '奖项证明',
      icon: TrophyIcon,
      description: 'Evidence of awards or prizes for excellence in your field',
      description_zh: '在您的专业领域获得的奖项或荣誉证明',
      requirements: [
        'Award certificates with English notarization',
        'Award criteria and selection standards',
        'Media coverage with circulation/impact ratings',
        'Proof of international/national recognition'
      ],
      requirements_zh: [
        '获奖证书（英文公证）',
        '颁奖标准和选拔细则',
        '媒体报道原文（标注发行量/影响力）',
        '国际/国家级认可证明'
      ],
      tips: [
        'Focus on prestigious, internationally recognized awards',
        'Include at least 3 major awards for strongest case',
        'Provide context about award significance and competition level'
      ],
      tips_zh: [
        '重点关注有声望的国际认可奖项',
        '至少包含3项重要奖项以加强申请',
        '提供奖项重要性和竞争水平的背景说明'
      ],
      acceptedFormats: ['PDF', 'JPG', 'PNG', 'DOC', 'DOCX']
    },
    {
      id: 'publication',
      name: 'Publications & Patents',
      name_zh: '发表作品',
      icon: AcademicCapIcon,
      description: 'Published materials and original contributions to the field',
      description_zh: '发表的材料和对该领域的原创贡献',
      requirements: [
        'Patent documents with commercial application evidence',
        'Citation reports (Google Scholar H-index ≥20 preferred)',
        'Journal impact factor (Scimago ranking)',
        'Evidence of significant contribution to the field'
      ],
      requirements_zh: [
        '专利文件（附商业应用证明）',
        '引用报告（Google Scholar H指数≥20为佳）',
        '期刊影响因子（Scimago排名）',
        '对该领域重大贡献的证据'
      ],
      tips: [
        'Prioritize high-impact publications over conference papers',
        'Exclude self-citations from citation counts',
        'Highlight original contributions and innovations'
      ],
      tips_zh: [
        '优先选用高影响力期刊论文而非会议文章',
        '引用统计中排除自引',
        '突出原创贡献和创新点'
      ],
      acceptedFormats: ['PDF', 'DOC', 'DOCX']
    },
    {
      id: 'media',
      name: 'Media Coverage',
      name_zh: '媒体报道',
      icon: NewspaperIcon,
      description: 'Media coverage demonstrating widespread recognition',
      description_zh: '证明广泛认可的媒体报道',
      requirements: [
        'Full media coverage with outlet name, date, circulation',
        'Target audience analysis',
        'Professional recognition in major publications',
        'Social media impact metrics (if applicable)'
      ],
      requirements_zh: [
        '报道全文（含媒体名称、日期、发行量）',
        '目标受众分析',
        '主要出版物中的专业认可',
        '社交媒体影响指标（如适用）'
      ],
      tips: [
        'Focus on mainstream, reputable media outlets',
        'Avoid purely academic or internal publications',
        'Include circulation numbers and readership data'
      ],
      tips_zh: [
        '重点关注主流、有声誉的媒体机构',
        '避免纯学术或内部出版物',
        '包含发行量和读者群数据'
      ],
      acceptedFormats: ['PDF', 'JPG', 'PNG', 'DOC', 'DOCX']
    },
    {
      id: 'recommendation',
      name: 'Recommendation Letters',
      name_zh: '推荐信',
      icon: UserGroupIcon,
      description: 'Letters from recognized experts in your field',
      description_zh: '来自您所在领域公认专家的推荐信',
      requirements: [
        'Letters from independent, recognized experts',
        'Detailed explanation of your extraordinary abilities',
        'Recommender contact information for verification',
        'Official letterhead and signatures'
      ],
      requirements_zh: [
        '来自独立、公认专家的推荐信',
        '对您杰出能力的详细说明',
        '推荐人联系方式以供核查',
        '官方信头和签名'
      ],
      tips: [
        'Ensure recommenders are independent (not colleagues)',
        'Include contact info for post-immigration verification',
        'Focus on specific achievements and impact'
      ],
      tips_zh: [
        '确保推荐人是独立的（非同事）',
        '包含联系方式以供移民局核查',
        '专注于具体成就和影响力'
      ],
      acceptedFormats: ['PDF', 'DOC', 'DOCX']
    },
    {
      id: 'other',
      name: 'Other Evidence',
      name_zh: '其他证据',
      icon: DocumentIcon,
      description: 'Additional supporting documentation',
      description_zh: '其他支持性文档',
      requirements: [
        'High salary evidence (tax returns, W-2 forms)',
        'Leadership role documentation',
        'Peer review experience records',
        'Industry salary benchmarks'
      ],
      requirements_zh: [
        '高薪证明（税单、W-2表格）',
        '领导职位文档',
        '同行评议经历记录',
        '行业薪酬基准'
      ],
      tips: [
        'Include US Bureau of Labor Statistics data for salary comparison',
        'Document leadership responsibilities clearly',
        'Provide evidence of judging others\' work'
      ],
      tips_zh: [
        '包含美国劳工统计局数据进行薪酬比较',
        '清楚记录领导职责',
        '提供评判他人工作的证据'
      ],
      acceptedFormats: ['PDF', 'DOC', 'DOCX', 'JPG', 'PNG']
    }
  ];

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
        category: activeTab // Set to current active tab
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
    const awardFiles = coverLetterData.evidenceFiles.filter(f => f.category === 'award');
    const publicationFiles = coverLetterData.evidenceFiles.filter(f => f.category === 'publication');
    const mediaFiles = coverLetterData.evidenceFiles.filter(f => f.category === 'media');
    const recommendationFiles = coverLetterData.evidenceFiles.filter(f => f.category === 'recommendation');
    const otherFiles = coverLetterData.evidenceFiles.filter(f => f.category === 'other');

    return language === 'zh' ? 
      `尊敬的移民官：

我谨此提交EB-1A杰出人才移民申请，申请在美国获得永久居留权。作为在人工智能和机器学习领域具有杰出能力的专业人士，我相信我的成就完全符合EB-1A的所有要求标准。

一、杰出能力证明
根据提交的${coverLetterData.evidenceFiles.length}份证据材料，我在以下方面展现了杰出能力：

1. 获得国际奖项和荣誉（${awardFiles.length}项证据）
我曾获得多项国际级奖项，包括：
• IEEE杰出成就奖2023年度获得者 - 该奖项每年仅颁发给全球10位在电气工程领域做出突出贡献的专家
• 美国国家科学基金会卓越奖 - 表彰我在AI算法优化方面的突破性研究
• ACM杰出科学家认证 - 计算机科学领域最高荣誉之一

这些奖项在我的专业领域内具有重要意义和广泛认可度，证明了我在国际上的杰出地位。

2. 原创性贡献（${publicationFiles.length}项证据）
我的研究成果已发表在多个顶级期刊上：
• 在《Nature》杂志发表AI突破性研究论文，被引用超过500次
• 获得美国专利US11234567号"机器学习算法优化系统"，已被多家科技公司采用
• Google Scholar H指数达到42，总引用次数超过3,200次（排除自引）
• 研究成果被IBM、Microsoft等公司应用于实际产品中

这些研究为人工智能行业发展做出了重要贡献，推动了技术前沿的发展。

3. 媒体报道（${mediaFiles.length}项证据）
我的工作成果已被多家权威媒体报道：
• MIT Technology Review专题报道 - 发行量超过30万，重点介绍我的AI创新成果
• Forbes科技创新者专访2024 - 全球商业领袖关注的权威媒体平台
• 被誉为"AI领域的新星"和"推动行业变革的关键人物"

这些报道展现了我在该领域的国际影响力和专业声誉。

4. 专家推荐信（${recommendationFiles.length}封）
来自国际知名专家的独立推荐：
• 斯坦福大学Smith教授 - AI领域权威专家，详细阐述了我的技术突破
• MIT实验室主任Johnson博士 - 机器学习研究先驱，高度评价我的学术贡献
• Google AI负责人Williams博士 - 工业界顶尖专家，确认我的商业应用价值

5. 其他支持性证据（${otherFiles.length}项证据）
• 2023年度薪资证明 - 收入水平位于行业前5%，体现了我的市场价值
• 担任AI顶级会议同行评议专家 - 基于我的专业声誉被邀请评判其他专家的工作

二、未来贡献计划
移居美国后，我计划在以下方面为美国做出贡献：

1. 技术创新推动
• 在硅谷建立AI研究实验室，专注于下一代机器学习算法开发
• 与美国顶尖大学合作，推进前沿技术研究
• 申请更多美国专利，保持美国在AI领域的技术领先地位

2. 人才培养
• 在斯坦福大学担任客座教授，培养下一代AI专家
• 建立博士生导师项目，为美国培养高端技术人才
• 组织国际AI研讨会，吸引全球顶尖人才来美发展

3. 产业发展
• 与美国科技公司合作，将研究成果转化为实际产品
• 创立技术公司，创造就业机会
• 推动AI技术在医疗、教育、环保等领域的应用

4. 国际合作
• 促进中美科技交流，建立长期合作关系
• 参与制定AI技术国际标准
• 代表美国参加国际AI大会和论坛

基于以上${coverLetterData.evidenceFiles.length}份详实证据和明确的未来贡献计划，我恳请移民官批准我的EB-1A申请。我的加入将为美国的科技创新和经济发展带来显著价值。

此致
敬礼

张伟（Dr. Wei Zhang）
人工智能专家
${new Date().toLocaleDateString('zh-CN')}` :
      `Dear Immigration Officer,

I am hereby submitting my EB-1A petition for an individual with extraordinary ability, seeking permanent residence in the United States. As a distinguished professional with extraordinary ability in artificial intelligence and machine learning, I believe my achievements fully satisfy all the required criteria for EB-1A classification.

I. Evidence of Extraordinary Ability
Based on the ${coverLetterData.evidenceFiles.length} pieces of submitted evidence, I have demonstrated extraordinary ability in the following areas:

1. Receipt of International Awards and Recognition (${awardFiles.length} pieces of evidence)
I have received multiple prestigious international awards, including:
• IEEE Outstanding Achievement Award 2023 - awarded annually to only 10 global experts who have made outstanding contributions to electrical engineering
• National Science Foundation Excellence Award - recognizing my breakthrough research in AI algorithm optimization
• ACM Distinguished Scientist Certification - one of the highest honors in computer science

These awards carry significant recognition in my professional field and demonstrate my outstanding international standing.

2. Original Contributions of Major Significance (${publicationFiles.length} pieces of evidence)
My research has been published in top-tier journals:
• Published breakthrough AI research in Nature journal, cited over 500 times
• Granted US Patent No. US11234567 for "Machine Learning Algorithm Optimization System," adopted by multiple tech companies
• Google Scholar H-index of 42 with over 3,200 total citations (excluding self-citations)
• Research outcomes applied in actual products by IBM, Microsoft, and other major corporations

These contributions have significantly advanced the artificial intelligence industry and pushed the boundaries of technological innovation.

3. Published Material About Me in Professional Media (${mediaFiles.length} pieces of evidence)
My work has been featured in authoritative media outlets:
• MIT Technology Review feature article - circulation over 300,000, highlighting my AI innovations
• Forbes Tech Innovator Interview 2024 - authoritative business media platform followed by global leaders
• Recognized as "Rising Star in AI" and "Key Figure Driving Industry Transformation"

This coverage demonstrates my international influence and professional reputation in the field.

4. Expert Recommendation Letters (${recommendationFiles.length} letters)
Independent recommendations from internationally renowned experts:
• Professor Smith from Stanford University - AI authority who detailed my technical breakthroughs
• Dr. Johnson, MIT Lab Director - machine learning research pioneer who highly praised my academic contributions
• Dr. Williams, Google AI Lead - industry expert who confirmed my commercial application value

5. Additional Supporting Evidence (${otherFiles.length} pieces of evidence)
• 2023 salary documentation - income level in top 5% of industry, reflecting my market value
• AI conference peer review expert role - invited to judge other experts' work based on my professional reputation

II. Future Contribution Plans
Upon immigration to the United States, I plan to contribute in the following ways:

1. Technology Innovation Advancement
• Establish an AI research laboratory in Silicon Valley focusing on next-generation machine learning algorithms
• Collaborate with top US universities to advance cutting-edge research
• File additional US patents to maintain America's technological leadership in AI

2. Talent Development
• Serve as visiting professor at Stanford University, training the next generation of AI experts
• Establish doctoral mentorship programs to cultivate high-end technical talent for America
• Organize international AI symposiums to attract global top talent to develop in the US

3. Industry Development
• Collaborate with US tech companies to transform research into actual products
• Found technology companies to create employment opportunities
• Promote AI applications in healthcare, education, environmental protection, and other sectors

4. International Cooperation
• Facilitate US-China technology exchange and establish long-term cooperative relationships
• Participate in developing international AI technical standards
• Represent the US at international AI conferences and forums

Based on the ${coverLetterData.evidenceFiles.length} pieces of substantial evidence and clear future contribution plans outlined above, I respectfully request approval of my EB-1A petition. My addition will bring significant value to America's technological innovation and economic development.

Sincerely,

Dr. Wei Zhang
Artificial Intelligence Expert
${new Date().toLocaleDateString('en-US')}`;
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
         {/* Left Column - Evidence Upload by Category */}
         <div>
           <h3 className="font-medium mb-4 flex items-center gap-2">
             <CloudArrowUpIcon className="w-5 h-5 text-primary" />
             {getText('Upload Evidence Documents by Category', '按类别上传证据文档')}
           </h3>

           {/* Category Tabs */}
           <div className="flex flex-wrap gap-1 mb-6 border-b border-border">
             {evidenceCategories.map((category) => {
               const Icon = category.icon;
               const isActive = activeTab === category.id;
               const fileCount = coverLetterData.evidenceFiles.filter(f => f.category === category.id).length;
               
               return (
                 <button
                   key={category.id}
                   onClick={() => setActiveTab(category.id)}
                   className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                     isActive
                       ? 'border-primary text-primary bg-primary/5'
                       : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                   }`}
                 >
                   <Icon className="w-4 h-4" />
                   <span>{language === 'zh' ? category.name_zh : category.name}</span>
                   {fileCount > 0 && (
                     <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                       {fileCount}
                     </span>
                   )}
                 </button>
               );
             })}
           </div>

           {/* Active Category Content */}
           {(() => {
             const activeCategory = evidenceCategories.find(cat => cat.id === activeTab);
             if (!activeCategory) return null;
             
             const Icon = activeCategory.icon;
             const categoryFiles = coverLetterData.evidenceFiles.filter(f => f.category === activeTab);
             
             return (
               <div>
                 {/* Category Header */}
                 <div className="mb-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20">
                   <div className="flex items-center gap-3 mb-3">
                     <Icon className="w-6 h-6 text-primary" />
                     <div>
                       <h4 className="font-medium text-primary">
                         {language === 'zh' ? activeCategory.name_zh : activeCategory.name}
                       </h4>
                       <p className="text-sm text-muted-foreground">
                         {language === 'zh' ? activeCategory.description_zh : activeCategory.description}
                       </p>
                     </div>
                   </div>
                   
                   {/* Requirements */}
                   <div className="mb-4">
                     <h5 className="font-medium text-sm mb-2">
                       {getText('Required Documents:', '需要的文档：')}
                     </h5>
                     <ul className="text-xs text-muted-foreground space-y-1">
                       {(language === 'zh' ? activeCategory.requirements_zh : activeCategory.requirements).map((req, idx) => (
                         <li key={idx} className="flex items-start gap-2">
                           <span className="text-primary mt-1">•</span>
                           <span>{req}</span>
                         </li>
                       ))}
                     </ul>
                   </div>
                   
                   {/* Tips */}
                   <div>
                     <h5 className="font-medium text-sm mb-2 text-amber-700">
                       {getText('💡 Tips:', '💡 提示：')}
                     </h5>
                     <ul className="text-xs text-amber-700 space-y-1">
                       {(language === 'zh' ? activeCategory.tips_zh : activeCategory.tips).map((tip, idx) => (
                         <li key={idx} className="flex items-start gap-2">
                           <span className="text-amber-600 mt-1">•</span>
                           <span>{tip}</span>
                         </li>
                       ))}
                     </ul>
                   </div>
                 </div>

                 {/* File Upload Area */}
                 <div
                   className={`border-2 border-dashed rounded-lg p-6 text-center transition-all mb-6 ${
                     dragActive 
                       ? 'border-primary bg-primary/5' 
                       : 'border-border hover:border-primary/50'
                   }`}
                   onDragEnter={handleDrag}
                   onDragLeave={handleDrag}
                   onDragOver={handleDrag}
                   onDrop={handleDrop}
                 >
                   <Icon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                   <p className="text-lg font-medium mb-2">
                     {getText(`Upload ${activeCategory.name} Documents`, `上传${activeCategory.name_zh}文档`)}
                   </p>
                   <p className="text-sm text-muted-foreground mb-4">
                     {getText('Drag & drop files here or click to browse', '拖拽文件到此处或点击浏览')}
                   </p>
                   <input
                     ref={fileInputRef}
                     type="file"
                     multiple
                     accept={activeCategory.acceptedFormats.map(format => `.${format.toLowerCase()}`).join(',')}
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
                     {getText(`Supports: ${activeCategory.acceptedFormats.join(', ')}`, `支持：${activeCategory.acceptedFormats.join(', ')}`)}
                   </p>
                 </div>

                 {/* Category Files List */}
                 {categoryFiles.length > 0 && (
                   <div>
                     <h4 className="font-medium mb-3 flex items-center gap-2">
                       <Icon className="w-4 h-4" />
                       {getText(`${activeCategory.name} Files (${categoryFiles.length})`, `${activeCategory.name_zh}文件 (${categoryFiles.length})`)}
                     </h4>
                     <div className="space-y-3">
                       {categoryFiles.map((file) => (
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
             );
           })()}
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

           {/* Demo Reset Button */}
           <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
             <div className="flex items-center justify-between">
               <div>
                 <h5 className="font-medium text-amber-800 text-sm">
                   {getText('Demo Mode', '演示模式')}
                 </h5>
                 <p className="text-xs text-amber-700">
                   {getText('This is populated with sample data for demonstration', '当前显示的是演示用的示例数据')}
                 </p>
               </div>
               <button
                 onClick={() => {
                   setCoverLetterData({
                     personalInfo: '',
                     evidenceFiles: [],
                     generatedContent: '',
                     isGenerating: false,
                     wordCount: 0,
                     lastGenerated: null,
                     generationProgress: 0
                   });
                 }}
                 className="text-xs bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded transition-colors"
               >
                 {getText('Clear Demo Data', '清除演示数据')}
               </button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}