// Visa categories and related data for VisaMate

export interface VisaCategory {
  code: string;
  name: string;
  category: string;
  description: string;
  description_zh?: string;
  value?: string;
  label?: string;
  subtitle?: string;
  subtitle_zh?: string;
  complexity?: 'low' | 'medium' | 'high';
  estimatedTime?: string;
}

export interface CategoryGroup {
  id: string;
  name: string;
  name_zh: string;
  description?: string;
  description_zh?: string;
  icon?: string;
}

export const visaCategories: VisaCategory[] = [
  {
    code: 'I-130',
    name: 'Family-based Immigration',
    category: 'family',
    description: 'Petition for alien relative',
    description_zh: '亲属移民申请',
    value: 'I-130',
    label: 'Family-based Immigration (I-130)',
    subtitle: 'For spouses, children, parents, and siblings of US citizens/residents',
    subtitle_zh: '适用于美国公民/居民的配偶、子女、父母和兄弟姐妹',
    complexity: 'medium',
    estimatedTime: '12-24 months',
  },
  {
    code: 'I-485',
    name: 'Adjustment of Status',
    category: 'employment',
    description: 'Application to register permanent residence',
    description_zh: '身份调整申请',
    value: 'I-485',
    label: 'Employment-based Immigration (I-485)',
    subtitle: 'For employment-based permanent residence applications',
    subtitle_zh: '适用于基于就业的永久居民申请',
    complexity: 'high',
    estimatedTime: '18-36 months',
  },
  {
    code: 'EB-1',
    name: 'Priority Workers',
    category: 'employment',
    description: 'For extraordinary ability workers',
    description_zh: '杰出人才移民',
    value: 'EB-1',
    label: 'Priority Workers (EB-1)',
    subtitle: 'For individuals with extraordinary abilities',
    subtitle_zh: '适用于具有杰出能力的个人',
    complexity: 'high',
    estimatedTime: '15-30 months',
  },
  {
    code: 'EB-5',
    name: 'Investor Visa',
    category: 'investment',
    description: 'For immigrant investors',
    description_zh: '投资移民',
    value: 'EB-5',
    label: 'Investor Immigration (EB-5)',
    subtitle: 'For immigrant investors creating jobs',
    subtitle_zh: '适用于创造就业的移民投资者',
    complexity: 'high',
    estimatedTime: '24-48 months',
  },
];

export const categoryGroups: CategoryGroup[] = [
  {
    id: 'family',
    name: 'Family-based Immigration',
    name_zh: '家庭移民',
    description: 'Immigration through family relationships',
    description_zh: '通过家庭关系移民',
    icon: '👨‍👩‍👧‍👦',
  },
  {
    id: 'employment',
    name: 'Employment-based Immigration',
    name_zh: '就业移民',
    description: 'Immigration through job offers or skills',
    description_zh: '通过工作或技能移民',
    icon: '💼',
  },
  {
    id: 'investment',
    name: 'Investment Immigration',
    name_zh: '投资移民',
    description: 'Immigration through investment',
    description_zh: '通过投资移民',
    icon: '💰',
  },
  {
    id: 'asylum',
    name: 'Asylum and Refugee',
    name_zh: '庇护和难民',
    description: 'Protection for those facing persecution',
    description_zh: '为面临迫害的人提供保护',
    icon: '🛡️',
  },
];
