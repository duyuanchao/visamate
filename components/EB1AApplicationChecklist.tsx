import React from 'react';
import { 
  DocumentTextIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  UserIcon,
  AcademicCapIcon,
  DocumentDuplicateIcon,
  CurrencyDollarIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';

interface EB1AApplicationChecklistProps {
  language: 'en' | 'zh';
  onShowUploads?: () => void;
}

interface ApplicationSection {
  id: string;
  title: string;
  title_zh: string;
  description: string;
  description_zh: string;
  icon: React.ComponentType<{ className?: string }>;
  items: ApplicationItem[];
  section: 'core' | 'evidence' | 'personal';
}

interface ApplicationItem {
  id: string;
  name: string;
  name_zh: string;
  description: string;
  description_zh: string;
  required: boolean;
  completed: boolean;
  notes?: string;
  notes_zh?: string;
  type?: 'form' | 'document' | 'evidence';
}

export function EB1AApplicationChecklist({ language, onShowUploads }: EB1AApplicationChecklistProps) {
  const [applicationSections, setApplicationSections] = React.useState<ApplicationSection[]>([
    {
      id: 'application-forms',
      title: 'Application Forms',
      title_zh: '申请表格',
      description: 'Core USCIS forms and processing',
      description_zh: '核心申请材料清单',
      icon: DocumentTextIcon,
      section: 'core',
      items: [
        {
          id: 'i140',
          name: 'I-140 Form',
          name_zh: 'I-140表格',
          description: 'Online filing with USCIS e-filing',
          description_zh: '在线填写并提交（USCIS官网电子递交）',
          required: true,
          completed: false,
          type: 'form',
          notes: 'Complete online through USCIS portal',
          notes_zh: '通过USCIS在线系统完成'
        },
        {
          id: 'i907',
          name: 'I-907 Form (Premium Processing)',
          name_zh: 'I-907表格（可选）',
          description: 'Expedited processing for $2500 (15-day result)',
          description_zh: '支付$2500申请加急处理（15日内给出结果）',
          required: false,
          completed: false,
          type: 'form'
        },
        {
          id: 'g28',
          name: 'G-28 Form',
          name_zh: 'G-28表格',
          description: 'Attorney representation form (if using attorney)',
          description_zh: '仅需在委托律师时代理递交（DIY无需填写）',
          required: false,
          completed: false,
          type: 'form'
        }
      ]
    },
    {
      id: 'cover-letter',
      title: 'Cover Letter (Petition Letter)',
      title_zh: '申请信 (Cover Letter)',
      description: 'Comprehensive narrative integrating all evidence',
      description_zh: '整合所有证据，结构化叙述说明如何满足至少3项EB1A标准（如奖项、原创贡献、媒体报道等）',
      icon: DocumentDuplicateIcon,
      section: 'evidence',
      items: [
        {
          id: 'cover-letter-draft',
          name: 'Cover Letter Draft',
          name_zh: '申请信草稿',
          description: 'Structured narrative explaining how qualifications meet EB1A criteria',
          description_zh: '需突出申请人的"特殊国际声誉"和"来美后续贡献"的计划',
          required: true,
          completed: false,
          type: 'document',
          notes: 'Should be detailed and structured, highlighting extraordinary ability',
          notes_zh: '应详细且结构化，突出杰出能力'
        }
      ]
    },
    {
      id: 'supporting-evidence',
      title: 'Supporting Evidence',
      title_zh: '支持性证据',
      description: 'Evidence meeting at least 3 EB1A criteria',
      description_zh: '满足至少3项项目标准',
      icon: AcademicCapIcon,
      section: 'evidence',
      items: [
        {
          id: 'awards-evidence',
          name: 'Awards Certificates',
          name_zh: '获奖证书（英文公证）、颁奖标准细则、媒体报道原文（标注发行量/影响力）',
          description: 'Award certificates with English notarization, criteria, media coverage',
          description_zh: '非国际大奖',
          required: true,
          completed: false,
          type: 'evidence'
        },
        {
          id: 'original-contributions',
          name: 'Original Contributions',
          name_zh: '专利文件（附商业应用证明）、引用报告（Google Scholar H指数≥20为佳）',
          description: 'Patent documents with commercial application evidence, citation reports',
          description_zh: '需说明贡献',
          required: true,
          completed: false,
          type: 'evidence'
        },
        {
          id: 'media-coverage',
          name: 'Media Coverage',
          name_zh: '报道全文（含媒体名称、日期、发行量）、目标受众分析',
          description: 'Full media coverage with media name, date, circulation, target audience analysis',
          description_zh: '社交媒体内',
          required: true,
          completed: false,
          type: 'evidence'
        },
        {
          id: 'peer-review',
          name: 'Peer Review Experience',
          name_zh: '主办方邀请函、感谢信、评审记录（需提交基于"特殊才能"邀请）',
          description: 'Invitations, thank you letters, review records based on extraordinary ability',
          description_zh: '需证明评审',
          required: false,
          completed: false,
          type: 'evidence'
        },
        {
          id: 'high-salary',
          name: 'High Salary Evidence',
          name_zh: '税单/W-2表格、行业薪酬报告（如美国劳工统计局数据）',
          description: 'Tax returns, W-2 forms, industry salary reports (US Bureau of Labor Statistics)',
          description_zh: '收入需高于',
          required: false,
          completed: false,
          type: 'evidence'
        }
      ]
    },
    {
      id: 'personal-documents',
      title: 'Personal Basic Documents',
      title_zh: '个人基础文件',
      description: 'Basic personal identification and documentation',
      description_zh: '基础个人身份和文档材料',
      icon: UserIcon,
      section: 'personal',
      items: [
        {
          id: 'resume-cv',
          name: 'Resume/CV',
          name_zh: '简历（突出行业成就）、学历证书（需WES认证）、护照及签证页复印件',
          description: 'Resume highlighting industry achievements, education certificates (WES certification)',
          description_zh: '突出行业成就的简历和相关证明文件',
          required: true,
          completed: false,
          type: 'document'
        },
        {
          id: 'ata-translation',
          name: 'ATA Translation',
          name_zh: '所有非英文材料需经ATA认证翻译',
          description: 'All non-English documents must be ATA certified translations',
          description_zh: 'ATA认证翻译要求',
          required: true,
          completed: false,
          type: 'document'
        }
      ]
    }
  ]);

  const getText = (en: string, zh: string) => language === 'zh' ? zh : en;

  const calculateProgress = () => {
    const totalItems = applicationSections.reduce((sum, section) => sum + section.items.length, 0);
    const completedItems = applicationSections.reduce(
      (sum, section) => sum + section.items.filter(item => item.completed).length, 
      0
    );
    return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600 bg-green-600';
    if (progress >= 60) return 'text-blue-600 bg-blue-600';
    if (progress >= 40) return 'text-amber-600 bg-amber-600';
    return 'text-red-600 bg-red-600';
  };

  const handleItemToggle = (sectionId: string, itemId: string) => {
    setApplicationSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? {
              ...section,
              items: section.items.map(item => 
                item.id === itemId ? { ...item, completed: !item.completed } : item
              )
            }
          : section
      )
    );
  };

  const getSectionProgress = (section: ApplicationSection) => {
    const totalItems = section.items.length;
    const completedItems = section.items.filter(item => item.completed).length;
    return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  };

  const progress = calculateProgress();

  return (
    <div className="space-y-8">
      {/* Overview Header */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="flex items-center gap-2">
            <DocumentTextIcon className="w-6 h-6 text-primary" />
            {getText('EB1A Application Checklist', 'EB1A申请材料清单')}
          </h2>
        </div>

        {/* Progress Overview */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              {getText('Overall Progress', '总体进度')}
            </span>
            <span className={`text-sm font-medium ${getProgressColor(progress).split(' ')[0]}`}>
              {progress}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(progress).split(' ')[1]}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Application Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <DocumentTextIcon className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-800">{getText('Core Forms', '核心表格')}</span>
            </div>
            <p className="text-sm text-blue-700">
              {applicationSections.filter(s => s.section === 'core').reduce((sum, s) => sum + s.items.filter(i => i.completed).length, 0)} / {applicationSections.filter(s => s.section === 'core').reduce((sum, s) => sum + s.items.length, 0)} {getText('completed', '已完成')}
            </p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <AcademicCapIcon className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">{getText('Evidence', '证据材料')}</span>
            </div>
            <p className="text-sm text-green-700">
              {applicationSections.filter(s => s.section === 'evidence').reduce((sum, s) => sum + s.items.filter(i => i.completed).length, 0)} / {applicationSections.filter(s => s.section === 'evidence').reduce((sum, s) => sum + s.items.length, 0)} {getText('completed', '已完成')}
            </p>
          </div>
          
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <UserIcon className="w-5 h-5 text-amber-600" />
              <span className="font-medium text-amber-800">{getText('Personal Docs', '个人文件')}</span>
            </div>
            <p className="text-sm text-amber-700">
              {applicationSections.filter(s => s.section === 'personal').reduce((sum, s) => sum + s.items.filter(i => i.completed).length, 0)} / {applicationSections.filter(s => s.section === 'personal').reduce((sum, s) => sum + s.items.length, 0)} {getText('completed', '已完成')}
            </p>
          </div>
        </div>
      </div>

      {/* Application Sections */}
      <div className="space-y-6">
        {applicationSections.map((section) => (
          <div key={section.id} className="bg-card border border-border rounded-xl overflow-hidden">
            <div className={`p-4 border-b ${
              section.section === 'core' ? 'bg-blue-50 border-blue-200' :
              section.section === 'evidence' ? 'bg-green-50 border-green-200' :
              'bg-amber-50 border-amber-200'
            }`}>
              <div className="flex items-center gap-3">
                <section.icon className={`w-6 h-6 ${
                  section.section === 'core' ? 'text-blue-600' :
                  section.section === 'evidence' ? 'text-green-600' :
                  'text-amber-600'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">
                      {language === 'zh' ? section.title_zh : section.title}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      section.section === 'core' ? 'bg-blue-100 text-blue-800' :
                      section.section === 'evidence' ? 'bg-green-100 text-green-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {getSectionProgress(section)}% {getText('complete', '完成')}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {language === 'zh' ? section.description_zh : section.description}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {section.items.filter(item => item.completed).length}/{section.items.length}
                </div>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              {section.items.map((item) => (
                <div key={item.id} className={`flex items-start gap-3 p-4 rounded-lg border transition-all ${
                  item.completed ? 'bg-accent/10 border-accent/20' : 'bg-background border-border hover:border-primary/30'
                }`}>
                  <button
                    onClick={() => handleItemToggle(section.id, item.id)}
                    className={`flex-shrink-0 mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      item.completed 
                        ? 'bg-accent border-accent text-accent-foreground' 
                        : item.required 
                          ? 'border-primary hover:border-primary/80' 
                          : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {item.completed && <CheckCircleIconSolid className="w-3 h-3" />}
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`font-medium ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {language === 'zh' ? item.name_zh : item.name}
                      </h4>
                      {item.required && !item.completed && (
                        <span className="text-xs bg-error/10 text-error px-2 py-0.5 rounded-full">
                          {getText('Required', '必需')}
                        </span>
                      )}
                      {item.type && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          item.type === 'form' ? 'bg-blue-100 text-blue-800' :
                          item.type === 'document' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {getText(
                            item.type === 'form' ? 'Form' : 
                            item.type === 'document' ? 'Document' : 'Evidence',
                            item.type === 'form' ? '表格' : 
                            item.type === 'document' ? '文档' : '证据'
                          )}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {language === 'zh' ? item.description_zh : item.description}
                    </p>
                    {(item.notes || item.notes_zh) && (
                      <p className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                        {language === 'zh' ? item.notes_zh : item.notes}
                      </p>
                    )}
                    {!item.completed && item.type !== 'form' && (
                      <button 
                        onClick={onShowUploads}
                        className="text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-2"
                      >
                        {getText('Upload Document', '上传文档')}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}