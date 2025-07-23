import React, { useState } from 'react';
import {
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
  UserIcon,
  AcademicCapIcon,
  TrophyIcon,
  NewspaperIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  DocumentDuplicateIcon,
  ExclamationTriangleIcon,
  StarIcon,
  HandRaisedIcon,
  BookOpenIcon,
  ChartBarIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';

interface EB1AOptimizedWorkflowProps {
  language: 'en' | 'zh';
}

interface CriterionStep {
  id: string;
  title: string;
  title_zh: string;
  description: string;
  description_zh: string;
  examples: string[];
  examples_zh: string[];
  evidenceRequired: string[];
  evidenceRequired_zh: string[];
  commonPitfalls: string[];
  commonPitfalls_zh: string[];
  completed: boolean;
}

interface WorkflowPhase {
  id: string;
  title: string;
  title_zh: string;
  description: string;
  description_zh: string;
  duration: string;
  duration_zh: string;
  steps: CriterionStep[];
  icon: React.ComponentType<{ className?: string }>;
  priority: 'high' | 'medium' | 'low';
}

export function EB1AOptimizedWorkflow({ language }: EB1AOptimizedWorkflowProps) {
  const [activePhase, setActivePhase] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const getText = (en: string, zh: string) => language === 'zh' ? zh : en;

  const toggleStepCompletion = (stepId: string) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
    }
    setCompletedSteps(newCompleted);
  };

  const workflowPhases: WorkflowPhase[] = [
    {
      id: 'eligibility-assessment',
      title: 'Eligibility Assessment & Strategy',
      title_zh: '资格评估与策略制定',
      description: 'Assess your qualifications against the 10 EB1A criteria and develop your petition strategy',
      description_zh: '根据EB1A的10项标准评估您的资格并制定申请策略',
      duration: '1-2 weeks',
      duration_zh: '1-2周',
      icon: ChartBarIcon,
      priority: 'high',
      steps: [
        {
          id: 'initial-assessment',
          title: 'Initial Self-Assessment',
          title_zh: '初步自我评估',
          description: 'Evaluate which of the 10 criteria you can potentially meet',
          description_zh: '评估您可能满足的10项标准中的哪些',
          examples: [
            'Awards and recognition in your field',
            'Membership in professional associations',
            'Published articles or research',
            'Media coverage of your work',
            'High salary evidence'
          ],
          examples_zh: [
            '您领域内的奖项和认可',
            '专业协会的会员资格',
            '发表的文章或研究',
            '您工作的媒体报道',
            '高薪资证明'
          ],
          evidenceRequired: [
            'Resume/CV with all achievements',
            'List of publications and citations',
            'Awards and certificates',
            'Salary documentation',
            'Media articles mentioning you'
          ],
          evidenceRequired_zh: [
            '包含所有成就的简历',
            '发表物和引用清单',
            '奖项和证书',
            '薪资文件',
            '提及您的媒体文章'
          ],
          commonPitfalls: [
            'Overestimating local awards as nationally/internationally significant',
            'Not properly documenting salary comparisons',
            'Insufficient evidence for claimed achievements'
          ],
          commonPitfalls_zh: [
            '高估本地奖项的国家/国际重要性',
            '未能正确记录薪资比较',
            '声称成就的证据不足'
          ],
          completed: false
        }
      ]
    },
    {
      id: 'evidence-gathering',
      title: 'Evidence Collection & Documentation',
      title_zh: '证据收集与文档整理',
      description: 'Systematically gather all required evidence for your chosen criteria',
      description_zh: '系统性地收集您选择标准所需的所有证据',
      duration: '4-8 weeks',
      duration_zh: '4-8周',
      icon: DocumentDuplicateIcon,
      priority: 'high',
      steps: [
        {
          id: 'awards-criterion',
          title: 'Criterion 1: Awards and Recognition',
          title_zh: '标准1：奖项和认可',
          description: 'Document nationally or internationally recognized awards for excellence',
          description_zh: '记录国家或国际认可的卓越奖项',
          examples: [
            'Industry awards with national/international scope',
            'Professional society recognition',
            'Government awards or honors',
            'University alumni awards',
            'Competition prizes with wide participation'
          ],
          examples_zh: [
            '具有国家/国际范围的行业奖项',
            '专业协会认可',
            '政府奖项或荣誉',
            '大学校友奖',
            '参与面广的竞赛奖项'
          ],
          evidenceRequired: [
            'Award certificates or official announcements',
            'Evidence of award criteria and selection process',
            'Documentation of award significance and recognition level',
            'Proof of competitors pool and selection criteria',
            'Media coverage of award ceremony'
          ],
          evidenceRequired_zh: [
            '奖项证书或官方公告',
            '奖项标准和选择过程的证据',
            '奖项重要性和认可水平的文档',
            '竞争者池和选择标准的证明',
            '颁奖仪式的媒体报道'
          ],
          commonPitfalls: [
            'Using purely local or company-internal awards',
            'Failing to prove the national/international scope',
            'Not demonstrating excellence as selection criteria'
          ],
          commonPitfalls_zh: [
            '使用纯粹的本地或公司内部奖项',
            '未能证明国家/国际范围',
            '未能证明卓越是选择标准'
          ],
          completed: false
        },
        {
          id: 'membership-criterion',
          title: 'Criterion 2: Distinguished Associations',
          title_zh: '标准2：杰出协会会员',
          description: 'Membership in associations requiring outstanding achievements',
          description_zh: '需要杰出成就的协会会员资格',
          examples: [
            'IEEE Senior/Fellow membership',
            'Professional society fellowships',
            'Invitation-only expert groups',
            'Editorial boards of journals',
            'Advisory committees for organizations'
          ],
          examples_zh: [
            'IEEE高级/院士会员',
            '专业协会研究员资格',
            '仅限邀请的专家组',
            '期刊编辑委员会',
            '组织的咨询委员会'
          ],
          evidenceRequired: [
            'Membership certificates or credentials',
            'Association bylaws showing outstanding achievement requirements',
            'Selection process documentation',
            'Proof of judge panel expertise',
            'Evidence of membership exclusivity'
          ],
          evidenceRequired_zh: [
            '会员证书或凭证',
            '协会章程显示杰出成就要求',
            '选择过程文档',
            '评审小组专业知识证明',
            '会员资格排他性证据'
          ],
          commonPitfalls: [
            'Using memberships that only require payment',
            'Not proving outstanding achievement requirement',
            'Insufficient evidence of judges expertise'
          ],
          commonPitfalls_zh: [
            '使用仅需付费的会员资格',
            '未能证明杰出成就要求',
            '评审员专业知识证据不足'
          ],
          completed: false
        },
        {
          id: 'media-criterion',
          title: 'Criterion 3: Media Coverage',
          title_zh: '标准3：媒体报道',
          description: 'Published material about you in professional or major trade publications',
          description_zh: '专业或主要贸易出版物中关于您的发表材料',
          examples: [
            'News articles about your work or achievements',
            'Magazine features in trade publications',
            'Interviews in professional journals',
            'Blog posts by reputable industry sites',
            'Podcast appearances discussing your expertise'
          ],
          examples_zh: [
            '关于您工作或成就的新闻文章',
            '贸易出版物中的杂志特写',
            '专业期刊中的采访',
            '权威行业网站的博客文章',
            '讨论您专业知识的播客出现'
          ],
          evidenceRequired: [
            'Original publications with full text',
            'Evidence of publication circulation/readership',
            'Proof of publication professional standing',
            'Documentation showing you as subject (not author)',
            'Translation if in foreign language'
          ],
          evidenceRequired_zh: [
            '包含全文的原始出版物',
            '出版物发行量/读者群证据',
            '出版物专业地位证明',
            '显示您作为主题（非作者）的文档',
            '如为外语则需翻译'
          ],
          commonPitfalls: [
            'Using self-authored articles instead of coverage about you',
            'Relying on local or non-professional publications',
            'Not proving the publication\'s professional significance'
          ],
          commonPitfalls_zh: [
            '使用自己撰写的文章而非关于您的报道',
            '依赖本地或非专业出版物',
            '未能证明出版物的专业重要性'
          ],
          completed: false
        },
        {
          id: 'judging-criterion',
          title: 'Criterion 4: Judging Others\' Work',
          title_zh: '标准4：评判他人工作',
          description: 'Evidence of judging work of others in your field',
          description_zh: '评判您领域内他人工作的证据',
          examples: [
            'Peer review for academic journals',
            'Grant application review panels',
            'Conference paper review committees',
            'Award selection committees',
            'Thesis examination committees'
          ],
          examples_zh: [
            '学术期刊同行评议',
            '资助申请评审小组',
            '会议论文评审委员会',
            '奖项选择委员会',
            '论文答辩委员会'
          ],
          evidenceRequired: [
            'Invitation letters to serve as reviewer',
            'Confirmation of completed reviews',
            'Evidence of journal/organization prestige',
            'Documentation of selection criteria for reviewers',
            'Proof of multiple review activities over time'
          ],
          evidenceRequired_zh: [
            '担任评审员的邀请函',
            '完成评审的确认',
            '期刊/组织声望证据',
            '评审员选择标准文档',
            '长期多次评审活动证明'
          ],
          commonPitfalls: [
            'Limited review activities or one-off instances',
            'Not proving the prestige of reviewing organization',
            'Insufficient evidence of reviewer selection process'
          ],
          commonPitfalls_zh: [
            '评审活动有限或一次性实例',
            '未能证明评审组织的声望',
            '评审员选择过程证据不足'
          ],
          completed: false
        },
        {
          id: 'contributions-criterion',
          title: 'Criterion 5: Original Contributions',
          title_zh: '标准5：原创贡献',
          description: 'Evidence of original scientific, scholarly, artistic, athletic, or business-related contributions',
          description_zh: '原创科学、学术、艺术、体育或商业相关贡献的证据',
          examples: [
            'Breakthrough research with wide adoption',
            'Innovative products or technologies',
            'Influential methodologies or frameworks',
            'Patents with commercial implementation',
            'Open source projects with significant usage'
          ],
          examples_zh: [
            '广泛采用的突破性研究',
            '创新产品或技术',
            '有影响力的方法论或框架',
            '有商业实施的专利',
            '有重要使用量的开源项目'
          ],
          evidenceRequired: [
            'Publications describing the contribution',
            'Evidence of adoption or implementation by others',
            'Citation analysis and impact metrics',
            'Expert testimonials about significance',
            'Commercial success or usage statistics'
          ],
          evidenceRequired_zh: [
            '描述贡献的出版物',
            '他人采用或实施的证据',
            '引用分析和影响指标',
            '关于重要性的专家证言',
            '商业成功或使用统计'
          ],
          commonPitfalls: [
            'Claiming significance without independent validation',
            'Overstating the impact of routine work',
            'Lack of evidence for widespread adoption'
          ],
          commonPitfalls_zh: [
            '声称重要性而无独立验证',
            '夸大常规工作的影响',
            '缺乏广泛采用的证据'
          ],
          completed: false
        },
        {
          id: 'articles-criterion',
          title: 'Criterion 6: Scholarly Articles',
          title_zh: '标准6：学术文章',
          description: 'Authorship of scholarly articles in professional or major trade publications',
          description_zh: '在专业或主要贸易出版物中的学术文章作者身份',
          examples: [
            'Peer-reviewed journal articles',
            'Book chapters in academic publications',
            'Conference proceedings papers',
            'Industry white papers with wide circulation',
            'Technical articles in professional magazines'
          ],
          examples_zh: [
            '同行评议期刊文章',
            '学术出版物中的书籍章节',
            '会议论文集文章',
            '广泛传播的行业白皮书',
            '专业杂志中的技术文章'
          ],
          evidenceRequired: [
            'Published articles with full citation',
            'Evidence of journal impact factor or circulation',
            'Peer review process documentation',
            'Citation counts and impact analysis',
            'Professional standing of publication venue'
          ],
          evidenceRequired_zh: [
            '包含完整引用的发表文章',
            '期刊影响因子或发行量证据',
            '同行评议过程文档',
            '引用计数和影响分析',
            '发表场所的专业地位'
          ],
          commonPitfalls: [
            'Using non-peer reviewed or predatory journals',
            'Not demonstrating professional or major status of publication',
            'Insufficient evidence of scholarly nature'
          ],
          commonPitfalls_zh: [
            '使用非同行评议或掠夺性期刊',
            '未能证明出版物的专业或主要地位',
            '学术性质证据不足'
          ],
          completed: false
        },
        {
          id: 'exhibitions-criterion',
          title: 'Criterion 7: Artistic Exhibitions',
          title_zh: '标准7：艺术展览',
          description: 'Display of work in artistic exhibitions or showcases',
          description_zh: '在艺术展览或展示中展示作品',
          examples: [
            'Gallery exhibitions of artistic work',
            'Museum displays or installations',
            'Juried art shows and competitions',
            'Design showcases at major venues',
            'Architectural work featured in exhibitions'
          ],
          examples_zh: [
            '艺术作品的画廊展览',
            '博物馆展示或装置',
            '评审艺术展和竞赛',
            '主要场所的设计展示',
            '在展览中展示的建筑作品'
          ],
          evidenceRequired: [
            'Exhibition catalogs or brochures',
            'Professional reviews of exhibitions',
            'Evidence of venue prestige and selection process',
            'Documentation of attendance or impact',
            'Photographs of displayed work'
          ],
          evidenceRequired_zh: [
            '展览目录或宣传册',
            '展览的专业评论',
            '场所声望和选择过程证据',
            '参与度或影响的文档',
            '展示作品的照片'
          ],
          commonPitfalls: [
            'Using non-professional or local venues only',
            'Not demonstrating artistic significance',
            'Lack of evidence for selection process'
          ],
          commonPitfalls_zh: [
            '仅使用非专业或本地场所',
            '未能证明艺术重要性',
            '缺乏选择过程证据'
          ],
          completed: false
        },
        {
          id: 'leadership-criterion',
          title: 'Criterion 8: Leading/Critical Role',
          title_zh: '标准8：领导/关键角色',
          description: 'Evidence of leading or critical role in distinguished organizations',
          description_zh: '在杰出组织中担任领导或关键角色的证据',
          examples: [
            'Executive positions in professional organizations',
            'Key roles in major projects or initiatives',
            'Leadership in open source communities',
            'Critical positions in research institutions',
            'Founding roles in successful companies'
          ],
          examples_zh: [
            '专业组织中的执行职位',
            '重大项目或倡议中的关键角色',
            '开源社区中的领导地位',
            '研究机构中的关键职位',
            '成功公司中的创始角色'
          ],
          evidenceRequired: [
            'Official appointment letters or contracts',
            'Organization charts showing your position',
            'Evidence of organization\'s distinguished reputation',
            'Documentation of your specific contributions',
            'Testimonials from colleagues or superiors'
          ],
          evidenceRequired_zh: [
            '正式任命书或合同',
            '显示您职位的组织架构图',
            '组织杰出声誉的证据',
            '您具体贡献的文档',
            '同事或上级的证言'
          ],
          commonPitfalls: [
            'Not proving the organization is distinguished',
            'Overstating the significance of the role',
            'Insufficient evidence of actual contributions'
          ],
          commonPitfalls_zh: [
            '未能证明组织是杰出的',
            '夸大角色的重要性',
            '实际贡献证据不足'
          ],
          completed: false
        },
        {
          id: 'salary-criterion',
          title: 'Criterion 9: High Remuneration',
          title_zh: '标准9：高薪酬',
          description: 'Evidence of high salary or remuneration relative to others in the field',
          description_zh: '相对于该领域其他人员的高薪或高报酬证据',
          examples: [
            'Salary exceeding industry averages by significant margin',
            'Consulting fees at premium rates',
            'Contract values demonstrating high compensation',
            'Stock options or equity compensation',
            'Performance bonuses indicating top-tier status'
          ],
          examples_zh: [
            '大幅超过行业平均水平的薪资',
            '优质费率的咨询费',
            '显示高报酬的合同价值',
            '股票期权或股权报酬',
            '表明顶级地位的绩效奖金'
          ],
          evidenceRequired: [
            'Tax returns or W-2 forms',
            'Employment contracts showing compensation',
            'Government salary surveys for comparison',
            'Professional salary reports for your field',
            'Expert testimony on compensation levels'
          ],
          evidenceRequired_zh: [
            '税务申报或W-2表格',
            '显示报酬的就业合同',
            '用于比较的政府薪资调查',
            '您领域的专业薪资报告',
            '关于报酬水平的专家证言'
          ],
          commonPitfalls: [
            'Not providing adequate industry comparison data',
            'Using outdated salary surveys',
            'Failing to prove sustained high compensation'
          ],
          commonPitfalls_zh: [
            '未提供足够的行业比较数据',
            '使用过时的薪资调查',
            '未能证明持续的高报酬'
          ],
          completed: false
        },
        {
          id: 'commercial-success-criterion',
          title: 'Criterion 10: Commercial Success (Arts)',
          title_zh: '标准10：商业成功（艺术）',
          description: 'Commercial success in the performing arts (for artists only)',
          description_zh: '表演艺术中的商业成功（仅限艺术家）',
          examples: [
            'Box office receipts from performances',
            'Record sales or streaming revenue',
            'Licensing fees for artistic work',
            'Gallery sales of artwork',
            'Commercial endorsements or sponsorships'
          ],
          examples_zh: [
            '演出的票房收入',
            '唱片销售或流媒体收入',
            '艺术作品的许可费',
            '画廊艺术品销售',
            '商业代言或赞助'
          ],
          evidenceRequired: [
            'Sales receipts or revenue statements',
            'Contract agreements for performances',
            'Licensing agreements with payments',
            'Industry reports on commercial success',
            'Comparative data with other artists'
          ],
          evidenceRequired_zh: [
            '销售收据或收入报表',
            '演出合同协议',
            '带有付款的许可协议',
            '关于商业成功的行业报告',
            '与其他艺术家的比较数据'
          ],
          commonPitfalls: [
            'Applicable only to performing arts',
            'Not proving commercial nature of success',
            'Insufficient comparative evidence'
          ],
          commonPitfalls_zh: [
            '仅适用于表演艺术',
            '未能证明成功的商业性质',
            '比较证据不足'
          ],
          completed: false
        }
      ]
    },
    {
      id: 'petition-preparation',
      title: 'Petition Preparation & Writing',
      title_zh: '申请书准备与撰写',
      description: 'Craft a compelling petition narrative and organize evidence',
      description_zh: '撰写令人信服的申请书叙述并组织证据',
      duration: '3-6 weeks',
      duration_zh: '3-6周',
      icon: DocumentTextIcon,
      priority: 'high',
      steps: [
        {
          id: 'petition-structure',
          title: 'Petition Structure Planning',
          title_zh: '申请书结构规划',
          description: 'Plan the logical flow and structure of your petition',
          description_zh: '规划申请书的逻辑流程和结构',
          examples: [
            'Executive summary highlighting your extraordinary ability',
            'Detailed analysis of each criterion you meet',
            'Evidence organization and exhibit planning',
            'Final merit determination argument',
            'US benefit analysis'
          ],
          examples_zh: [
            '突出您非凡能力的执行摘要',
            '您满足的每个标准的详细分析',
            '证据组织和展品规划',
            '最终价值判断论证',
            '美国利益分析'
          ],
          evidenceRequired: [
            'Outline of petition sections',
            'Exhibit numbering system',
            'Citation format consistency',
            'Page number planning',
            'Table of contents preparation'
          ],
          evidenceRequired_zh: [
            '申请书章节大纲',
            '展品编号系统',
            '引用格式一致性',
            '页码规划',
            '目录准备'
          ],
          commonPitfalls: [
            'Disorganized evidence presentation',
            'Lack of clear narrative thread',
            'Inconsistent citation style'
          ],
          commonPitfalls_zh: [
            '证据呈现混乱',
            '缺乏清晰的叙述线索',
            '引用风格不一致'
          ],
          completed: false
        }
      ]
    },
    {
      id: 'support-letters',
      title: 'Support Letters & References',
      title_zh: '支持信和推荐',
      description: 'Secure high-quality recommendation letters from independent experts',
      description_zh: '获得独立专家的高质量推荐信',
      duration: '4-8 weeks',
      duration_zh: '4-8周',
      icon: UserIcon,
      priority: 'medium',
      steps: [
        {
          id: 'reference-strategy',
          title: 'Reference Letter Strategy',
          title_zh: '推荐信策略',
          description: 'Identify and approach appropriate reference letter writers',
          description_zh: '识别并接触合适的推荐信撰写者',
          examples: [
            'Independent experts who have cited your work',
            'Senior professionals who have used your contributions',
            'Academic leaders familiar with your research',
            'Industry executives who recognize your impact',
            'Colleagues from other organizations'
          ],
          examples_zh: [
            '引用过您工作的独立专家',
            '使用过您贡献的资深专业人士',
            '熟悉您研究的学术领袖',
            '认可您影响的行业高管',
            '来自其他组织的同事'
          ],
          evidenceRequired: [
            'List of potential letter writers with contact information',
            'Evidence of their expertise and credentials',
            'Documentation of your relationship or connection',
            'Draft request letters with specific guidance',
            'Timeline for letter collection'
          ],
          evidenceRequired_zh: [
            '潜在推荐信撰写者及联系信息清单',
            '他们专业知识和资格的证据',
            '您关系或联系的文档',
            '带有具体指导的请求信草稿',
            '推荐信收集时间表'
          ],
          commonPitfalls: [
            'Too many letters from close collaborators',
            'Insufficient independence of letter writers',
            'Generic letters without specific examples'
          ],
          commonPitfalls_zh: [
            '来自密切合作者的推荐信过多',
            '推荐信撰写者独立性不足',
            '缺乏具体例子的通用推荐信'
          ],
          completed: false
        }
      ]
    },
    {
      id: 'filing-submission',
      title: 'Filing & Submission',
      title_zh: '申请与提交',
      description: 'Complete forms, final review, and submit your petition',
      description_zh: '完成表格、最终审查并提交申请',
      duration: '1-2 weeks',
      duration_zh: '1-2周',
      icon: BuildingOfficeIcon,
      priority: 'high',
      steps: [
        {
          id: 'forms-completion',
          title: 'Forms Completion',
          title_zh: '表格填写',
          description: 'Complete all required USCIS forms accurately',
          description_zh: '准确完成所有必需的USCIS表格',
          examples: [
            'Form I-140 (primary petition form)',
            'Form I-907 (premium processing if desired)',
            'G-1145 (e-notification of receipt)',
            'Supporting documentation organization',
            'Filing fee preparation'
          ],
          examples_zh: [
            '表格I-140（主要申请表格）',
            '表格I-907（如需要快速处理）',
            'G-1145（收据电子通知）',
            '支持文件组织',
            '申请费准备'
          ],
          evidenceRequired: [
            'Completed and signed forms',
            'Filing fee check or money order',
            'Cover letter summarizing petition',
            'Complete exhibit binder organization',
            'Mailing labels and packaging'
          ],
          evidenceRequired_zh: [
            '完成并签署的表格',
            '申请费支票或汇票',
            '总结申请的求职信',
            '完整的展品活页夹组织',
            '邮寄标签和包装'
          ],
          commonPitfalls: [
            'Incomplete or incorrect form completion',
            'Missing signatures or dates',
            'Incorrect filing fees'
          ],
          commonPitfalls_zh: [
            '表格填写不完整或不正确',
            '遗漏签名或日期',
            '申请费错误'
          ],
          completed: false
        }
      ]
    }
  ];

  const getPhaseProgress = (phase: WorkflowPhase) => {
    const totalSteps = phase.steps.length;
    const completedCount = phase.steps.filter(step => completedSteps.has(step.id)).length;
    return Math.round((completedCount / totalSteps) * 100);
  };

  const totalSteps = workflowPhases.reduce((total, phase) => total + phase.steps.length, 0);
  const totalCompleted = workflowPhases.reduce(
    (total, phase) => total + phase.steps.filter(step => completedSteps.has(step.id)).length,
    0
  );
  const overallProgress = Math.round((totalCompleted / totalSteps) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {getText('Optimized EB1A Workflow', 'EB1A优化工作流程')}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {getText(
            'Comprehensive step-by-step guide based on successful petition strategies',
            '基于成功申请策略的全面分步指南'
          )}
        </p>
        
        {/* Overall Progress */}
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {getText('Overall Progress', '总体进度')}
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {totalCompleted}/{totalSteps} {getText('steps completed', '步骤已完成')}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <div className="text-right mt-1">
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {overallProgress}%
            </span>
          </div>
        </div>
      </div>

      {/* Workflow Phases */}
      <div className="space-y-4">
        {workflowPhases.map((phase) => {
          const progress = getPhaseProgress(phase);
          const isActive = activePhase === phase.id;
          const Icon = phase.icon;
          
          return (
            <div key={phase.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Phase Header */}
              <button
                onClick={() => setActivePhase(isActive ? null : phase.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    phase.priority === 'high' 
                      ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
                      : phase.priority === 'medium'
                      ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400'
                      : 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                  }`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {getText(phase.title, phase.title_zh)}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {getText(phase.description, phase.description_zh)}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {getText(phase.duration, phase.duration_zh)}
                      </span>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        {progress}% {getText('complete', '完成')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <svg
                    className={`h-5 w-5 text-gray-400 transition-transform ${isActive ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Phase Content */}
              {isActive && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    {phase.steps.map((step) => {
                      const isCompleted = completedSteps.has(step.id);
                      
                      return (
                        <div key={step.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          {/* Step Header */}
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3">
                                <button
                                  onClick={() => toggleStepCompletion(step.id)}
                                  className="flex-shrink-0"
                                >
                                  {isCompleted ? (
                                    <CheckCircleIconSolid className="h-6 w-6 text-green-600" />
                                  ) : (
                                    <div className="h-6 w-6 border-2 border-gray-300 dark:border-gray-600 rounded-full" />
                                  )}
                                </button>
                                <div>
                                  <h4 className="text-md font-semibold text-gray-900 dark:text-white">
                                    {getText(step.title, step.title_zh)}
                                  </h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {getText(step.description, step.description_zh)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Step Details */}
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Examples */}
                            <div>
                              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {getText('Examples', '例子')}
                              </h5>
                              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                                {(language === 'zh' ? step.examples_zh : step.examples).map((example, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <span className="text-blue-500 mr-2">•</span>
                                    {example}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Evidence Required */}
                            <div>
                              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {getText('Evidence Required', '所需证据')}
                              </h5>
                              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                                {(language === 'zh' ? step.evidenceRequired_zh : step.evidenceRequired).map((evidence, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <DocumentTextIcon className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    {evidence}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Common Pitfalls */}
                            <div>
                              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {getText('Common Pitfalls', '常见陷阱')}
                              </h5>
                              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                                {(language === 'zh' ? step.commonPitfalls_zh : step.commonPitfalls).map((pitfall, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <ExclamationTriangleIcon className="h-3 w-3 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                    {pitfall}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Key Resources */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
          {getText('Key Resources & Best Practices', '关键资源和最佳实践')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
              {getText('Essential Documents', '基本文件')}
            </h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• {getText('USCIS Policy Manual (8 CFR 204.5(h)(3))', 'USCIS政策手册 (8 CFR 204.5(h)(3))')}</li>
              <li>• {getText('Kazarian v. USCIS case guidance', 'Kazarian v. USCIS案例指导')}</li>
              <li>• {getText('Form I-140 Instructions', '表格I-140说明')}</li>
              <li>• {getText('RFE Template for common issues', '常见问题的RFE模板')}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
              {getText('Success Tips', '成功技巧')}
            </h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• {getText('Target 3-4 strong criteria vs. many weak ones', '针对3-4个强标准而非许多弱标准')}</li>
              <li>• {getText('Use independent expert letters whenever possible', '尽可能使用独立专家推荐信')}</li>
              <li>• {getText('Provide quantitative evidence and comparisons', '提供定量证据和比较')}</li>
              <li>• {getText('Consider Premium Processing for faster response', '考虑快速处理以获得更快响应')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}