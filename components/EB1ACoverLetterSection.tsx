import React from 'react';
import { 
  DocumentTextIcon, 
  PencilIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  StarIcon,
  AcademicCapIcon,
  TrophyIcon,
  UserGroupIcon,
  BanknotesIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';

interface EB1ACoverLetterSectionProps {
  language: 'en' | 'zh';
  onShowUploads?: () => void;
}

interface EvidenceCategory {
  id: string;
  title: string;
  title_zh: string;
  description: string;
  description_zh: string;
  icon: React.ComponentType<{ className?: string }>;
  items: EvidenceItem[];
  priority: 'high' | 'medium' | 'low';
}

interface EvidenceItem {
  id: string;
  name: string;
  name_zh: string;
  description: string;
  description_zh: string;
  required: boolean;
  completed: boolean;
  notes?: string;
  notes_zh?: string;
}

export function EB1ACoverLetterSection({ language, onShowUploads }: EB1ACoverLetterSectionProps) {
  const [evidenceCategories, setEvidenceCategories] = React.useState<EvidenceCategory[]>([
    {
      id: 'awards',
      title: 'Awards and Recognition',
      title_zh: '奖项证明',
      description: 'Evidence of awards or prizes for excellence',
      description_zh: '获奖证书（英文公证）、颁奖标准细则、媒体报道原文（标注发行量/影响力）',
      icon: TrophyIcon,
      priority: 'high',
      items: [
        {
          id: 'award-1',
          name: 'International/National Awards',
          name_zh: '国际奖项',
          description: 'Major international or national awards with English notarization',
          description_zh: '需提供至少3项国际大奖标准',
          required: true,
          completed: false,
          notes: 'Must include award criteria and media coverage with circulation/impact ratings',
          notes_zh: '需说明奖制'
        }
      ]
    },
    {
      id: 'publications',
      title: 'Original Contributions',
      title_zh: '原创贡献',
      description: 'Published materials and original contributions to the field',
      description_zh: '专利文件（附商业应用证明）、引用报告（Google Scholar H指数≥20为佳）',
      icon: AcademicCapIcon,
      priority: 'high',
      items: [
        {
          id: 'pub-1',
          name: 'Patent Documents',
          name_zh: '需说明奖制',
          description: 'Patents with commercial application evidence',
          description_zh: '需说明奖制',
          required: true,
          completed: false
        },
        {
          id: 'pub-2',
          name: 'Citation Reports',
          name_zh: '媒体报道',
          description: 'H-index, citation count (exclude self-citations), journal impact factor (Scimago ranking)',
          description_zh: '报道全文（含媒体名称、日期、发行量）、目标受众分析',
          required: true,
          completed: false,
          notes: 'Prefer H-index ≥ 20, high-impact publications over conference papers',
          notes_zh: '避免假材料，优先选用高影响力证据（如顶级期刊论文>普通会议文章）'
        }
      ]
    },
    {
      id: 'judging',
      title: 'Peer Review',
      title_zh: '评审经历',
      description: 'Evidence of judging the work of others',
      description_zh: '主办方邀请函、感谢信、评审记录（需提交基于"特殊才能"邀请）',
      icon: UserGroupIcon,
      priority: 'medium',
      items: [
        {
          id: 'judge-1',
          name: 'Review Invitations',
          name_zh: '需证明评审',
          description: 'Invitations, thank you letters, review records based on "extraordinary ability"',
          description_zh: '需证明评审',
          required: false,
          completed: false
        }
      ]
    },
    {
      id: 'leadership',
      title: 'Leadership Role',
      title_zh: '高薪酬证明',
      description: 'Leading or critical role in organizations',
      description_zh: '税单/W-2表格、行业薪酬报告（如美国劳工统计局数据）',
      icon: StarIcon,
      priority: 'medium',
      items: [
        {
          id: 'lead-1',
          name: 'Tax Returns/W-2 Forms',
          name_zh: '收入需高于',
          description: 'Annual salary reports and industry benchmarks (US Bureau of Labor Statistics data)',
          description_zh: '收入需高于',
          required: false,
          completed: false
        }
      ]
    }
  ]);

  const [coverLetterStatus, setCoverLetterStatus] = React.useState({
    drafted: false,
    reviewed: false,
    finalized: false,
    wordCount: 0,
    lastUpdated: null as Date | null
  });

  const getText = (en: string, zh: string) => language === 'zh' ? zh : en;

  const calculateProgress = () => {
    const totalItems = evidenceCategories.reduce((sum, cat) => sum + cat.items.length, 0);
    const completedItems = evidenceCategories.reduce(
      (sum, cat) => sum + cat.items.filter(item => item.completed).length, 
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

  const handleItemToggle = (categoryId: string, itemId: string) => {
    setEvidenceCategories(prev => 
      prev.map(cat => 
        cat.id === categoryId 
          ? {
              ...cat,
              items: cat.items.map(item => 
                item.id === itemId ? { ...item, completed: !item.completed } : item
              )
            }
          : cat
      )
    );
  };

  const progress = calculateProgress();

  return (
    <div className="space-y-8">
      {/* Cover Letter Overview */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="flex items-center gap-2">
            <DocumentTextIcon className="w-6 h-6 text-primary" />
            {getText('EB1A Cover Letter', 'EB1A申请信')}
          </h2>
          <button className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
            <PencilIcon className="w-4 h-4" />
            {getText('Edit Draft', '编辑草稿')}
          </button>
        </div>

        {/* Key Requirements Alert */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <ExclamationTriangleIcon className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-800 mb-2">
                {getText('EB1A Key Requirements', 'EB1A关键要求')}
              </h4>
              <div className="text-sm text-blue-700 space-y-1">
                <p>• {getText('Integrate all evidence, structured narrative explaining how qualifications meet at least 3 EB1A criteria', '整合所有证据，结构化叙述说明如何满足至少3项EB1A标准（如奖项、原创贡献、媒体报道等）')}</p>
                <p>• {getText('Highlight "special international reputation" and "future benefits to the United States"', '需突出申请人的"特殊国际声誉"和"来美后续贡献"的计划')}</p>
                <p>• {getText('Avoid piling materials, prioritize high-impact evidence (top journal papers > conference papers)', '避免堆砌材料，优先选用高影响力证据（如顶级期刊论文>普通会议文章）')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cover Letter Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-secondary/30 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <DocumentTextIcon className="w-5 h-5 text-primary" />
              <span className="font-medium">{getText('Draft Status', '草稿状态')}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {coverLetterStatus.drafted 
                ? getText('Draft completed', '草稿已完成')
                : getText('Not started', '未开始')
              }
            </p>
          </div>
          
          <div className="p-4 bg-secondary/30 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <ClockIcon className="w-5 h-5 text-primary" />
              <span className="font-medium">{getText('Word Count', '字数统计')}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {coverLetterStatus.wordCount} {getText('words', '字')}
            </p>
          </div>
          
          <div className="p-4 bg-secondary/30 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircleIcon className="w-5 h-5 text-primary" />
              <span className="font-medium">{getText('Evidence Ready', '证据准备度')}</span>
            </div>
            <p className={`text-sm font-medium ${progress >= 80 ? 'text-green-600' : progress >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
              {progress}% {getText('complete', '完成')}
            </p>
          </div>
        </div>
      </div>

      {/* Evidence Preparation Checklist */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="flex items-center gap-2">
            <CheckCircleIcon className="w-5 h-5 text-primary" />
            {getText('Supporting Evidence Preparation', '支持性证据准备要点')}
          </h3>
          <div className="text-sm text-muted-foreground">
            {getText('Pyramid Structure Evidence', '证据链结构化')}
          </div>
        </div>

        {/* Evidence Pyramid Structure */}
        <div className="mb-8 p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-primary/20">
          <h4 className="font-medium mb-4 text-primary">
            {getText('Pyramid Evidence Structure', '金字塔结构')}
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span>{getText('Top Layer: International Influence Evidence (Cross-border cooperation)', '顶层（国际影响力证据如跨国合作）')}</span>
            </div>
            <div className="flex items-center gap-3 ml-6">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <span>{getText('Middle Layer: Awards/Patents', '中层（奖项/专利）')}</span>
            </div>
            <div className="flex items-center gap-3 ml-12">
              <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
              <span>{getText('Bottom Layer: Academic/Basic Evidence', '底层（学历/基础证明）')}</span>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              {getText('Evidence Preparation Progress', '证据准备进度')}
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

        {/* Evidence Categories */}
        <div className="space-y-6">
          {evidenceCategories.map((category) => (
            <div key={category.id} className="border border-border rounded-lg overflow-hidden">
              <div className={`p-4 ${
                category.priority === 'high' ? 'bg-red-50 border-b border-red-200' :
                category.priority === 'medium' ? 'bg-amber-50 border-b border-amber-200' :
                'bg-green-50 border-b border-green-200'
              }`}>
                <div className="flex items-center gap-3">
                  <category.icon className={`w-6 h-6 ${
                    category.priority === 'high' ? 'text-red-600' :
                    category.priority === 'medium' ? 'text-amber-600' :
                    'text-green-600'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">
                        {language === 'zh' ? category.title_zh : category.title}
                      </h4>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        category.priority === 'high' ? 'bg-red-100 text-red-800' :
                        category.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {getText(
                          category.priority === 'high' ? 'High Priority' : 
                          category.priority === 'medium' ? 'Medium Priority' : 'Low Priority',
                          category.priority === 'high' ? '高优先级' : 
                          category.priority === 'medium' ? '中优先级' : '低优先级'
                        )}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {language === 'zh' ? category.description_zh : category.description}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {category.items.filter(item => item.completed).length}/{category.items.length}
                  </div>
                </div>
              </div>
              
              <div className="p-4 space-y-3">
                {category.items.map((item) => (
                  <div key={item.id} className={`flex items-start gap-3 p-4 rounded-lg border transition-all ${
                    item.completed ? 'bg-accent/10 border-accent/20' : 'bg-background border-border hover:border-primary/30'
                  }`}>
                    <button
                      onClick={() => handleItemToggle(category.id, item.id)}
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
                        <h5 className={`font-medium ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {language === 'zh' ? item.name_zh : item.name}
                        </h5>
                        {item.required && !item.completed && (
                          <span className="text-xs bg-error/10 text-error px-2 py-0.5 rounded-full">
                            {getText('Required', '必需')}
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
                      {!item.completed && (
                        <button 
                          onClick={onShowUploads}
                          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-2"
                        >
                          {getText('Upload Evidence', '上传证据')}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 2025 New Requirements Alert */}
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-3">
            <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-800 mb-2">
                {getText('2025 New Requirements', '应对2025年新规')}
              </h4>
              <div className="text-sm text-amber-700 space-y-1">
                <p>• {getText('New "Industry Disruptive Innovation" indicator (AI/Quantum Computing fields must provide tech implementation proof)', '新增"行业颠覆性创新"指标（AI/量子计算等领域需提供技术落地证明）')}</p>
                <p>• {getText('Recommendation letters must include referrer contact info for post-immigration verification', '推荐信需包含推荐人联系方式以供移民局核查真实性')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}