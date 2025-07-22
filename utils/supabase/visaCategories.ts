// Official USCIS Green Card Categories and Required Documents
export interface VisaCategory {
    value: string;
    label: string;
    subtitle: string;
    subtitle_zh: string;
    description: string;
    description_zh: string;
    primaryForm: string;
    estimatedTime: string;
    complexity: 'low' | 'medium' | 'high';
    category: 'family' | 'employment' | 'investment' | 'special' | 'diversity';
  }
  
  export interface DocumentRequirement {
    id: string;
    name: string;
    name_zh: string;
    description: string;
    description_zh: string;
    required: boolean;
    category: string;
    category_zh: string;
    applicableCategories: string[];
  }
  
  export const visaCategories: VisaCategory[] = [
    // Family-Based Immigration
    {
      value: 'I-130_IR1',
      label: 'I-130 (IR-1)',
      subtitle: 'Spouse of U.S. Citizen',
      subtitle_zh: '美国公民配偶',
      description: 'Immediate relative petition for spouse of U.S. citizen',
      description_zh: '美国公民配偶的直系亲属申请',
      primaryForm: 'I-130',
      estimatedTime: '12-18 months',
      complexity: 'medium',
      category: 'family'
    },
    {
      value: 'I-130_IR2',
      label: 'I-130 (IR-2)',
      subtitle: 'Child of U.S. Citizen',
      subtitle_zh: '美国公民子女',
      description: 'Immediate relative petition for unmarried child under 21 of U.S. citizen',
      description_zh: '美国公民21岁以下未婚子女的直系亲属申请',
      primaryForm: 'I-130',
      estimatedTime: '12-18 months',
      complexity: 'medium',
      category: 'family'
    },
    {
      value: 'I-130_IR5',
      label: 'I-130 (IR-5)',
      subtitle: 'Parent of U.S. Citizen',
      subtitle_zh: '美国公民父母',
      description: 'Immediate relative petition for parent of U.S. citizen (petitioner must be 21+)',
      description_zh: '美国公民父母的直系亲属申请（申请人须满21岁）',
      primaryForm: 'I-130',
      estimatedTime: '12-18 months',
      complexity: 'medium',
      category: 'family'
    },
    {
      value: 'I-130_F1',
      label: 'I-130 (F-1)',
      subtitle: 'Adult Child of U.S. Citizen',
      subtitle_zh: '美国公民成年子女',
      description: 'Family first preference for unmarried adult child of U.S. citizen',
      description_zh: '美国公民未婚成年子女的家庭第一优先',
      primaryForm: 'I-130',
      estimatedTime: '2-7 years',
      complexity: 'high',
      category: 'family'
    },
    {
      value: 'I-130_F2A',
      label: 'I-130 (F-2A)',
      subtitle: 'Spouse of Green Card Holder',
      subtitle_zh: '绿卡持有者配偶',
      description: 'Family second preference for spouse of permanent resident',
      description_zh: '永久居民配偶的家庭第二优先',
      primaryForm: 'I-130',
      estimatedTime: '2-3 years',
      complexity: 'high',
      category: 'family'
    },
    
    // Employment-Based Immigration
    {
      value: 'I-140_EB1A',
      label: 'I-140 (EB-1A)',
      subtitle: 'Extraordinary Ability',
      subtitle_zh: '杰出人才',
      description: 'Priority worker with extraordinary ability in sciences, arts, education, business, or athletics',
      description_zh: '在科学、艺术、教育、商业或体育领域具有杰出能力的优先工作者',
      primaryForm: 'I-140',
      estimatedTime: '8-12 months',
      complexity: 'high',
      category: 'employment'
    },
    {
      value: 'I-140_EB1B',
      label: 'I-140 (EB-1B)',
      subtitle: 'Outstanding Researcher',
      subtitle_zh: '杰出研究人员',
      description: 'Outstanding professor or researcher with international recognition',
      description_zh: '具有国际声誉的杰出教授或研究人员',
      primaryForm: 'I-140',
      estimatedTime: '8-12 months',
      complexity: 'high',
      category: 'employment'
    },
    {
      value: 'I-140_EB1C',
      label: 'I-140 (EB-1C)',
      subtitle: 'Multinational Executive',
      subtitle_zh: '跨国公司经理',
      description: 'Multinational manager or executive transferring to U.S. office',
      description_zh: '转调至美国办事处的跨国公司经理或高管',
      primaryForm: 'I-140',
      estimatedTime: '8-12 months',
      complexity: 'high',
      category: 'employment'
    },
    {
      value: 'I-140_EB2',
      label: 'I-140 (EB-2)',
      subtitle: 'Advanced Degree/Exceptional Ability',
      subtitle_zh: '高学历/特殊才能',
      description: 'Professional with advanced degree or exceptional ability in sciences, arts, or business',
      description_zh: '具有高学历或在科学、艺术或商业领域具有特殊才能的专业人士',
      primaryForm: 'I-140',
      estimatedTime: '1-3 years',
      complexity: 'high',
      category: 'employment'
    },
    {
      value: 'I-140_EB2_NIW',
      label: 'I-140 (EB-2 NIW)',
      subtitle: 'National Interest Waiver',
      subtitle_zh: '国家利益豁免',
      description: 'EB-2 with national interest waiver (no labor certification required)',
      description_zh: 'EB-2国家利益豁免（无需劳工证）',
      primaryForm: 'I-140',
      estimatedTime: '12-18 months',
      complexity: 'high',
      category: 'employment'
    },
    {
      value: 'I-140_EB3',
      label: 'I-140 (EB-3)',
      subtitle: 'Skilled Worker/Professional',
      subtitle_zh: '技术工人/专业人士',
      description: 'Skilled worker, professional, or other worker (requires labor certification)',
      description_zh: '技术工人、专业人士或其他工人（需要劳工证）',
      primaryForm: 'I-140',
      estimatedTime: '2-4 years',
      complexity: 'high',
      category: 'employment'
    },
    
    // Investment-Based Immigration
    {
      value: 'I-526E_EB5',
      label: 'I-526E (EB-5)',
      subtitle: 'Investor Immigrant',
      subtitle_zh: '投资移民',
      description: 'Immigrant investor program requiring $800K-$1.05M investment',
      description_zh: '需要80万-105万美元投资的投资移民项目',
      primaryForm: 'I-526E',
      estimatedTime: '2-4 years',
      complexity: 'high',
      category: 'investment'
    },
    
    // Adjustment of Status (can be combined with above)
    {
      value: 'I-485_AOS',
      label: 'I-485',
      subtitle: 'Adjustment of Status',
      subtitle_zh: '身份调整',
      description: 'Application to adjust status to permanent resident while in the U.S.',
      description_zh: '在美国境内申请调整为永久居民身份',
      primaryForm: 'I-485',
      estimatedTime: '8-14 months',
      complexity: 'medium',
      category: 'special'
    },
    
    // Special Categories
    {
      value: 'VAWA',
      label: 'VAWA',
      subtitle: 'Violence Against Women Act',
      subtitle_zh: '妇女暴力法案',
      description: 'Self-petition for abused spouses, children, or parents of U.S. citizens/residents',
      description_zh: '美国公民/居民的受虐配偶、子女或父母的自我申请',
      primaryForm: 'I-360',
      estimatedTime: '18-24 months',
      complexity: 'high',
      category: 'special'
    },
    {
      value: 'ASYLUM_REFUGEE',
      label: 'Refugee/Asylum',
      subtitle: 'Refugee or Asylee Status',
      subtitle_zh: '难民或庇护身份',
      description: 'Adjustment from refugee or asylee status to permanent resident',
      description_zh: '从难民或庇护身份调整为永久居民',
      primaryForm: 'I-485',
      estimatedTime: '12-18 months',
      complexity: 'medium',
      category: 'special'
    }
  ];
  
  // Document requirements based on visa category
  export const documentRequirements: DocumentRequirement[] = [
    // Universal Documents
    {
      id: 'birth_cert',
      name: 'Birth Certificate',
      name_zh: '出生证明',
      description: 'Official birth certificate with certified English translation if needed',
      description_zh: '官方出生证明，如需要需提供认证英文翻译',
      required: true,
      category: 'Identity Documents',
      category_zh: '身份文件',
      applicableCategories: ['ALL']
    },
    {
      id: 'passport',
      name: 'Passport Copy',
      name_zh: '护照复印件',
      description: 'Clear copy of current valid passport (all pages)',
      description_zh: '当前有效护照清晰复印件（所有页面）',
      required: true,
      category: 'Identity Documents',
      category_zh: '身份文件',
      applicableCategories: ['ALL']
    },
    {
      id: 'photos',
      name: 'Passport Photos',
      name_zh: '护照照片',
      description: '2 passport-style color photographs taken within 30 days',
      description_zh: '2张30天内拍摄的护照样式彩色照片',
      required: true,
      category: 'Identity Documents',
      category_zh: '身份文件',
      applicableCategories: ['ALL']
    },
    
    // Family-Based Documents
    {
      id: 'marriage_cert',
      name: 'Marriage Certificate',
      name_zh: '结婚证书',
      description: 'Official marriage certificate with English translation if needed',
      description_zh: '官方结婚证书，如需要需提供英文翻译',
      required: true,
      category: 'Family Documents',
      category_zh: '家庭文件',
      applicableCategories: ['I-130_IR1', 'I-130_F2A', 'VAWA']
    },
    {
      id: 'divorce_cert',
      name: 'Divorce/Death Certificate',
      name_zh: '离婚/死亡证明',
      description: 'Certificate of divorce or death of previous spouse (if applicable)',
      description_zh: '前配偶的离婚或死亡证明（如适用）',
      required: false,
      category: 'Family Documents',
      category_zh: '家庭文件',
      applicableCategories: ['I-130_IR1', 'I-130_F2A']
    },
    {
      id: 'petitioner_citizenship',
      name: 'Petitioner Citizenship Evidence',
      name_zh: '申请人公民身份证明',
      description: 'U.S. birth certificate, naturalization certificate, or passport',
      description_zh: '美国出生证明、入籍证书或护照',
      required: true,
      category: 'Family Documents',
      category_zh: '家庭文件',
      applicableCategories: ['I-130_IR1', 'I-130_IR2', 'I-130_IR5', 'I-130_F1']
    },
    {
      id: 'petitioner_green_card',
      name: 'Petitioner Green Card',
      name_zh: '申请人绿卡',
      description: 'Copy of petitioner\'s permanent resident card (front and back)',
      description_zh: '申请人永久居民卡复印件（正反面）',
      required: true,
      category: 'Family Documents',
      category_zh: '家庭文件',
      applicableCategories: ['I-130_F2A']
    },
    
    // Employment-Based Documents
    {
      id: 'education_records',
      name: 'Education Records',
      name_zh: '教育记录',
      description: 'Diplomas, degrees, transcripts with credential evaluation if needed',
      description_zh: '文凭、学位、成绩单，如需要需提供学历认证',
      required: true,
      category: 'Education & Professional',
      category_zh: '教育和专业文件',
      applicableCategories: ['I-140_EB1A', 'I-140_EB1B', 'I-140_EB2', 'I-140_EB2_NIW', 'I-140_EB3']
    },
    {
      id: 'employment_letter',
      name: 'Employment Letter',
      name_zh: '雇佣信',
      description: 'Letter from U.S. employer detailing job offer and terms',
      description_zh: '美国雇主详述工作邀请和条件的信函',
      required: true,
      category: 'Education & Professional',
      category_zh: '教育和专业文件',
      applicableCategories: ['I-140_EB1B', 'I-140_EB1C', 'I-140_EB2', 'I-140_EB3']
    },
    {
      id: 'labor_cert',
      name: 'Labor Certification',
      name_zh: '劳工证',
      description: 'Approved PERM labor certification (Form ETA-9089)',
      description_zh: '已批准的PERM劳工证（ETA-9089表格）',
      required: true,
      category: 'Education & Professional',
      category_zh: '教育和专业文件',
      applicableCategories: ['I-140_EB2', 'I-140_EB3']
    },
    {
      id: 'achievements_evidence',
      name: 'Evidence of Achievements',
      name_zh: '成就证明',
      description: 'Awards, publications, media coverage, recommendation letters',
      description_zh: '奖项、出版物、媒体报道、推荐信',
      required: true,
      category: 'Education & Professional',
      category_zh: '教育和专业文件',
      applicableCategories: ['I-140_EB1A', 'I-140_EB1B', 'I-140_EB2_NIW']
    },
    
    // Investment-Based Documents
    {
      id: 'investment_evidence',
      name: 'Investment Evidence',
      name_zh: '投资证明',
      description: 'Bank records, investment agreements, business documents',
      description_zh: '银行记录、投资协议、商业文件',
      required: true,
      category: 'Investment Documents',
      category_zh: '投资文件',
      applicableCategories: ['I-526E_EB5']
    },
    {
      id: 'source_of_funds',
      name: 'Source of Funds Documentation',
      name_zh: '资金来源文件',
      description: 'Tax returns, business records, property sales, inheritance documents',
      description_zh: '税务记录、商业记录、房产销售、继承文件',
      required: true,
      category: 'Investment Documents',
      category_zh: '投资文件',
      applicableCategories: ['I-526E_EB5']
    },
    
    // Universal Supporting Documents
    {
      id: 'i94',
      name: 'I-94 Record',
      name_zh: 'I-94记录',
      description: 'Arrival/departure record from CBP website',
      description_zh: '来自CBP网站的入境/离境记录',
      required: true,
      category: 'Immigration Documents',
      category_zh: '移民文件',
      applicableCategories: ['I-485_AOS', 'ASYLUM_REFUGEE']
    },
    {
      id: 'visa_status_docs',
      name: 'Current Visa Status Documents',
      name_zh: '当前签证状态文件',
      description: 'I-20, DS-2019, H-1B approval, or other status documents',
      description_zh: 'I-20、DS-2019、H-1B批准书或其他身份文件',
      required: false,
      category: 'Immigration Documents',
      category_zh: '移民文件',
      applicableCategories: ['I-485_AOS']
    },
    {
      id: 'financial',
      name: 'Financial Documents',
      name_zh: '财务文档',
      description: 'Bank statements, tax returns, employment verification',
      description_zh: '银行对账单、税务记录、雇佣验证',
      required: false,
      category: 'Supporting Evidence',
      category_zh: '支持证据',
      applicableCategories: ['ALL']
    },
    {
      id: 'medical',
      name: 'Medical Examination',
      name_zh: '体检报告',
      description: 'Form I-693 from USCIS-approved civil surgeon',
      description_zh: '由USCIS认可的民事外科医生出具的I-693表格',
      required: true,
      category: 'Supporting Evidence',
      category_zh: '支持证据',
      applicableCategories: ['I-485_AOS']
    },
    {
      id: 'affidavit_support',
      name: 'Affidavit of Support',
      name_zh: '经济担保书',
      description: 'Form I-864 (for family-based cases) or I-864EZ',
      description_zh: 'I-864表格（家庭类案例）或I-864EZ',
      required: true,
      category: 'Supporting Evidence',
      category_zh: '支持证据',
      applicableCategories: ['I-130_IR1', 'I-130_IR2', 'I-130_IR5', 'I-130_F1', 'I-130_F2A']
    },
    
    // Special Category Documents
    {
      id: 'abuse_evidence',
      name: 'Evidence of Abuse',
      name_zh: '虐待证据',
      description: 'Police reports, medical records, court documents, affidavits',
      description_zh: '警察报告、医疗记录、法庭文件、宣誓书',
      required: true,
      category: 'Special Documents',
      category_zh: '特殊文件',
      applicableCategories: ['VAWA']
    },
    {
      id: 'persecution_evidence',
      name: 'Evidence of Persecution',
      name_zh: '迫害证据',
      description: 'Country condition reports, personal statements, witness affidavits',
      description_zh: '国家状况报告、个人陈述、证人宣誓书',
      required: true,
      category: 'Special Documents',
      category_zh: '特殊文件',
      applicableCategories: ['ASYLUM_REFUGEE']
    }
  ];
  
  // Get documents required for a specific visa category
  export function getRequiredDocuments(categoryValue: string): DocumentRequirement[] {
    return documentRequirements.filter(doc => 
      doc.applicableCategories.includes('ALL') || 
      doc.applicableCategories.includes(categoryValue)
    );
  }
  
  // Get visa categories by type
  export function getVisaCategoriesByType(type: string): VisaCategory[] {
    return visaCategories.filter(category => category.category === type);
  }
  
  // Get category groups for UI
  export const categoryGroups = [
    {
      id: 'family',
      name: 'Family-Based Immigration',
      name_zh: '家庭类移民',
      description: 'For family members of U.S. citizens and permanent residents',
      description_zh: '适用于美国公民和永久居民的家庭成员',
      icon: '👨‍👩‍👧‍👦'
    },
    {
      id: 'employment',
      name: 'Employment-Based Immigration',
      name_zh: '职业类移民',
      description: 'For workers with job offers or extraordinary abilities',
      description_zh: '适用于有工作邀请或杰出能力的工作者',
      icon: '💼'
    },
    {
      id: 'investment',
      name: 'Investment-Based Immigration',
      name_zh: '投资类移民',
      description: 'For qualified investors creating U.S. jobs',
      description_zh: '适用于在美国创造就业的合格投资者',
      icon: '💰'
    },
    {
      id: 'special',
      name: 'Special Categories',
      name_zh: '特殊类别',
      description: 'For refugees, asylees, and other special situations',
      description_zh: '适用于难民、庇护者和其他特殊情况',
      icon: '🛡️'
    }
  ];