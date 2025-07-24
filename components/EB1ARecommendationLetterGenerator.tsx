import React, { useState } from 'react';
import {
  UserIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  StarIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  SparklesIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface EB1ARecommendationLetterGeneratorProps {
  language: 'en' | 'zh';
  onShowUploads: () => void;
}

interface RecommenderInfo {
  name: string;
  title: string;
  organization: string;
  relationship: string;
  expertise: string;
  yearsKnown: string;
  email: string;
  phone: string;
}

interface PetitionerInfo {
  name: string;
  field: string;
  achievements: string[];
  collaboration: string;
}

export function EB1ARecommendationLetterGenerator({ language, onShowUploads }: EB1ARecommendationLetterGeneratorProps) {
  const [recommenderInfo, setRecommenderInfo] = useState<RecommenderInfo>({
    name: '',
    title: '',
    organization: '',
    relationship: '',
    expertise: '',
    yearsKnown: '',
    email: '',
    phone: ''
  });

  const [petitionerInfo, setPetitionerInfo] = useState<PetitionerInfo>({
    name: '',
    field: '',
    achievements: [''],
    collaboration: ''
  });

  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([]);
  const [letterStyle, setLetterStyle] = useState('academic');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const getText = (en: string, zh: string) => language === 'zh' ? zh : en;

  const eb1aCriteria = [
    {
      id: 'awards',
      name: getText('Awards and Recognition', '奖项和认可'),
      description: getText('National or international awards for excellence', '国内或国际卓越奖项')
    },
    {
      id: 'membership',
      name: getText('Professional Membership', '专业会员资格'),
      description: getText('Membership in associations requiring outstanding achievement', '要求杰出成就的协会会员资格')
    },
    {
      id: 'published_material',
      name: getText('Published Material', '发表材料'),
      description: getText('Published material about the person in professional publications', '在专业出版物中发表的关于该人的材料')
    },
    {
      id: 'judging',
      name: getText('Judging Others\' Work', '评判他人工作'),
      description: getText('Judging the work of others in the field', '在该领域评判他人的工作')
    },
    {
      id: 'original_contribution',
      name: getText('Original Contributions', '原创贡献'),
      description: getText('Original scientific, scholarly, or business contributions', '原创的科学、学术或商业贡献')
    },
    {
      id: 'scholarly_articles',
      name: getText('Scholarly Articles', '学术文章'),
      description: getText('Authorship of scholarly articles in professional publications', '在专业出版物中撰写学术文章')
    },
    {
      id: 'critical_role',
      name: getText('Critical Role', '关键作用'),
      description: getText('Critical role for organizations with distinguished reputation', '在声誉卓著的组织中发挥关键作用')
    },
    {
      id: 'high_salary',
      name: getText('High Salary', '高薪'),
      description: getText('High salary or remuneration compared to others in the field', '与该领域其他人相比的高薪或报酬')
    },
    {
      id: 'commercial_success',
      name: getText('Commercial Success', '商业成功'),
      description: getText('Commercial success in performing arts', '表演艺术的商业成功')
    },
    {
      id: 'artistic_exhibition',
      name: getText('Artistic Exhibition', '艺术展览'),
      description: getText('Display of work at artistic exhibitions or showcases', '在艺术展览或展示中展示作品')
    }
  ];

  const letterStyles = [
    {
      id: 'academic',
      name: getText('Academic Style', '学术风格'),
      description: getText('Formal academic tone with scholarly language', '正式的学术语调和学术语言')
    },
    {
      id: 'professional',
      name: getText('Professional Style', '专业风格'),
      description: getText('Business professional tone', '商务专业语调')
    },
    {
      id: 'personal',
      name: getText('Personal Style', '个人风格'),
      description: getText('Personal but professional tone showing close collaboration', '个人但专业的语调，显示密切合作')
    }
  ];

  const addAchievement = () => {
    setPetitionerInfo(prev => ({
      ...prev,
      achievements: [...prev.achievements, '']
    }));
  };

  const removeAchievement = (index: number) => {
    setPetitionerInfo(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  const updateAchievement = (index: number, value: string) => {
    setPetitionerInfo(prev => ({
      ...prev,
      achievements: prev.achievements.map((achievement, i) => 
        i === index ? value : achievement
      )
    }));
  };

  const handleCriteriaChange = (criteriaId: string) => {
    setSelectedCriteria(prev => 
      prev.includes(criteriaId)
        ? prev.filter(id => id !== criteriaId)
        : [...prev, criteriaId]
    );
  };

  const generateLetter = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const letterTemplate = `[${getText('Date', '日期')}]

${getText('To Whom It May Concern', '致相关人员')}:

${getText('I am writing this letter to provide my strongest recommendation for', '我写这封信是为了为')} ${petitionerInfo.name} ${getText('in support of their EB-1A petition for permanent residence in the United States', '提供最强烈的推荐，以支持他们在美国的EB-1A永久居留申请')}. ${getText('As', '作为')} ${recommenderInfo.title} ${getText('at', '在')} ${recommenderInfo.organization}, ${getText('I have had the privilege of knowing and working with', '我有幸认识并与')} ${petitionerInfo.name} ${getText('for', '合作了')} ${recommenderInfo.yearsKnown} ${getText('years', '年')}.

${getText('Professional Background', '专业背景')}:
${getText('I hold the position of', '我担任')} ${recommenderInfo.title} ${getText('at', '在')} ${recommenderInfo.organization}. ${getText('My expertise lies in', '我的专业知识在于')} ${recommenderInfo.expertise}. ${getText('This background allows me to properly evaluate', '这一背景使我能够正确评估')} ${petitionerInfo.name}${getText('\'s exceptional abilities and contributions to the field', '在该领域的杰出能力和贡献')}.

${getText('Petitioner\'s Extraordinary Abilities', '申请人的杰出能力')}:
${petitionerInfo.achievements.filter(a => a.trim()).map(achievement => 
  `• ${achievement}`
).join('\n')}

${selectedCriteria.map(criteriaId => {
  const criteria = eb1aCriteria.find(c => c.id === criteriaId);
  return getText(`Based on my professional assessment, ${petitionerInfo.name} clearly meets the criterion for ${criteria?.name.toLowerCase()}.`, 
                `根据我的专业评估，${petitionerInfo.name}明显符合${criteria?.name}的标准。`);
}).join('\n\n')}

${getText('In conclusion, I wholeheartedly recommend', '总之，我全心全意推荐')} ${petitionerInfo.name} ${getText('for the EB-1A extraordinary ability classification. Their contributions to', '获得EB-1A杰出能力分类。他们对')} ${petitionerInfo.field} ${getText('are truly exceptional and warrant recognition at the national and international level', '的贡献确实是杰出的，值得在国内和国际层面得到认可')}.

${getText('Please feel free to contact me if you require any additional information', '如果您需要任何额外信息，请随时联系我')}.

${getText('Sincerely', '此致敬礼')},

${recommenderInfo.name}
${recommenderInfo.title}
${recommenderInfo.organization}
${getText('Email', '邮箱')}: ${recommenderInfo.email}
${getText('Phone', '电话')}: ${recommenderInfo.phone}`;

      setGeneratedLetter(letterTemplate);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <DocumentTextIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {getText('EB1A Recommendation Letter Generator', 'EB1A推荐信生成器')}
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {getText(
            'Generate professional recommendation letters tailored to EB1A criteria with AI assistance',
            '通过AI助手生成符合EB1A标准的专业推荐信'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Input Forms */}
        <div className="space-y-6">
          {/* Recommender Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <UserIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
              {getText('Recommender Information', '推荐人信息')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {getText('Full Name', '姓名')} *
                </label>
                <input
                  type="text"
                  value={recommenderInfo.name}
                  onChange={(e) => setRecommenderInfo(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder={getText('Dr. John Smith', '约翰·史密斯博士')}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {getText('Professional Title', '职业头衔')} *
                </label>
                <input
                  type="text"
                  value={recommenderInfo.title}
                  onChange={(e) => setRecommenderInfo(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder={getText('Professor of Computer Science', '计算机科学教授')}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {getText('Organization', '组织')} *
                </label>
                <input
                  type="text"
                  value={recommenderInfo.organization}
                  onChange={(e) => setRecommenderInfo(prev => ({ ...prev, organization: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder={getText('Stanford University', '斯坦福大学')}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {getText('Years Known', '认识年数')} *
                </label>
                <input
                  type="text"
                  value={recommenderInfo.yearsKnown}
                  onChange={(e) => setRecommenderInfo(prev => ({ ...prev, yearsKnown: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="5"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {getText('Email', '邮箱')} *
                </label>
                <input
                  type="email"
                  value={recommenderInfo.email}
                  onChange={(e) => setRecommenderInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="john.smith@stanford.edu"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {getText('Phone', '电话')}
                </label>
                <input
                  type="tel"
                  value={recommenderInfo.phone}
                  onChange={(e) => setRecommenderInfo(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {getText('Area of Expertise', '专业领域')} *
              </label>
              <textarea
                value={recommenderInfo.expertise}
                onChange={(e) => setRecommenderInfo(prev => ({ ...prev, expertise: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder={getText('Artificial Intelligence, Machine Learning, Computer Vision', '人工智能、机器学习、计算机视觉')}
              />
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {getText('Professional Relationship', '专业关系')} *
              </label>
              <textarea
                value={recommenderInfo.relationship}
                onChange={(e) => setRecommenderInfo(prev => ({ ...prev, relationship: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder={getText('Collaborated on research projects, served as thesis advisor, worked together at conferences', '合作研究项目，担任论文导师，在会议上合作')}
              />
            </div>
          </div>

          {/* Petitioner Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <StarIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
              {getText('Petitioner Information', '申请人信息')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {getText('Petitioner Name', '申请人姓名')} *
                </label>
                <input
                  type="text"
                  value={petitionerInfo.name}
                  onChange={(e) => setPetitionerInfo(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder={getText('Jane Doe', '简·多伊')}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {getText('Field of Expertise', '专业领域')} *
                </label>
                <input
                  type="text"
                  value={petitionerInfo.field}
                  onChange={(e) => setPetitionerInfo(prev => ({ ...prev, field: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder={getText('Artificial Intelligence', '人工智能')}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {getText('Key Achievements', '主要成就')} *
              </label>
              {petitionerInfo.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) => updateAchievement(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder={getText('Published 50+ papers in top-tier journals', '在顶级期刊发表50+篇论文')}
                  />
                  {petitionerInfo.achievements.length > 1 && (
                    <button
                      onClick={() => removeAchievement(index)}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addAchievement}
                className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                {getText('Add Achievement', '添加成就')}
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {getText('Collaboration Details', '合作详情')}
              </label>
              <textarea
                value={petitionerInfo.collaboration}
                onChange={(e) => setPetitionerInfo(prev => ({ ...prev, collaboration: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder={getText('Describe specific projects, publications, or professional interactions', '描述具体项目、出版物或专业互动')}
              />
            </div>
          </div>

          {/* EB1A Criteria Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <ClipboardDocumentCheckIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
              {getText('EB1A Criteria to Address', '要涉及的EB1A标准')}
            </h3>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {getText('Select the criteria that this recommendation letter should address', '选择此推荐信应涉及的标准')}
            </p>
            
            <div className="space-y-3">
              {eb1aCriteria.map((criteria) => (
                <div key={criteria.id} className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id={criteria.id}
                    checked={selectedCriteria.includes(criteria.id)}
                    onChange={() => handleCriteriaChange(criteria.id)}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={criteria.id} className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {criteria.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {criteria.description}
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Letter Style */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {getText('Letter Style', '信函风格')}
            </h3>
            
            <div className="space-y-3">
              {letterStyles.map((style) => (
                <div key={style.id} className="flex items-start space-x-3">
                  <input
                    type="radio"
                    id={style.id}
                    name="letterStyle"
                    value={style.id}
                    checked={letterStyle === style.id}
                    onChange={(e) => setLetterStyle(e.target.value)}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor={style.id} className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {style.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {style.description}
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateLetter}
            disabled={isGenerating || !recommenderInfo.name || !petitionerInfo.name || selectedCriteria.length === 0}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            {isGenerating ? (
              <>
                <SparklesIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                {getText('Generating Letter...', '正在生成信函...')}
              </>
            ) : (
              <>
                <SparklesIcon className="h-5 w-5 mr-2" />
                {getText('Generate Recommendation Letter', '生成推荐信')}
              </>
            )}
          </button>
        </div>

        {/* Right Column - Generated Letter */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <DocumentTextIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
              {getText('Generated Recommendation Letter', '生成的推荐信')}
            </h3>
            
            {generatedLetter ? (
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-gray-900 dark:text-white font-mono">
                    {generatedLetter}
                  </pre>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => navigator.clipboard.writeText(generatedLetter)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    {getText('Copy to Clipboard', '复制到剪贴板')}
                  </button>
                  
                  <button
                    onClick={() => {
                      const blob = new Blob([generatedLetter], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `recommendation-letter-${petitionerInfo.name.replace(/\s+/g, '-').toLowerCase()}.txt`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    {getText('Download Letter', '下载信函')}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  {getText('No letter generated yet', '尚未生成信函')}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {getText('Fill out the forms and click generate to create your recommendation letter', '填写表格并点击生成以创建您的推荐信')}
                </p>
              </div>
            )}
          </div>

          {/* Tips */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
              {getText('💡 Tips for Strong Recommendation Letters', '💡 强有力推荐信的技巧')}
            </h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• {getText('Choose recommenders who know your work well', '选择熟悉您工作的推荐人')}</li>
              <li>• {getText('Include specific examples and achievements', '包含具体例子和成就')}</li>
              <li>• {getText('Address multiple EB1A criteria when possible', '尽可能涉及多个EB1A标准')}</li>
              <li>• {getText('Ensure recommender credentials are clearly stated', '确保推荐人资历清楚说明')}</li>
              <li>• {getText('Use professional letterhead when printing', '打印时使用专业信头')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}