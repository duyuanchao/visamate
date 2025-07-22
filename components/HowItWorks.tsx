'use client';

import React from 'react';
import { 
  UserPlusIcon,
  CloudArrowUpIcon,
  CpuChipIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  ArrowRightIcon,
  PlayCircleIcon
} from '@heroicons/react/24/outline';

interface HowItWorksProps {
  language: 'en' | 'zh';
  onNavigate: (page: string) => void;
}

export function HowItWorks({ language, onNavigate }: HowItWorksProps) {
  const [activeStep, setActiveStep] = React.useState(1);
  const [showFAQ, setShowFAQ] = React.useState<number | null>(null);

  const getText = (en: string, zh: string) => language === 'zh' ? zh : en;

  const steps = [
    {
      id: 1,
      title: getText('Create Account', '创建账户'),
      title_zh: '创建账户',
      subtitle: getText('Start your journey', '开始您的旅程'),
      subtitle_zh: '开始您的旅程',
      description: getText(
        'Sign up with your basic information and select your visa category (I-130, I-485, or both). Set up your secure profile in under 2 minutes.',
        '使用您的基本信息注册并选择您的签证类别（I-130、I-485或两者）。在不到2分钟内设置您的安全档案。'
      ),
      description_zh: '使用您的基本信息注册并选择您的签证类别（I-130、I-485或两者）。在不到2分钟内设置您的安全档案。',
      icon: UserPlusIcon,
      color: 'from-blue-500 to-primary',
      time: getText('2 min', '2分钟'),
      features: [
        getText('Secure registration', '安全注册'),
        getText('Visa category selection', '签证类别选择'),
        getText('Profile setup', '档案设置')
      ]
    },
    {
      id: 2,
      title: getText('Upload Documents', '上传文档'),
      title_zh: '上传文档',
      subtitle: getText('Simple drag & drop', '简单拖拽上传'),
      subtitle_zh: '简单拖拽上传',
      description: getText(
        'Upload your documents using our intuitive interface. Our AI automatically categorizes and validates each document for completeness and quality.',
        '使用我们直观的界面上传您的文档。我们的AI会自动分类并验证每个文档的完整性和质量。'
      ),
      description_zh: '使用我们直观的界面上传您的文档。我们的AI会自动分类并验证每个文档的完整性和质量。',
      icon: CloudArrowUpIcon,
      color: 'from-accent to-teal-600',
      time: getText('10 min', '10分钟'),
      features: [
        getText('Drag & drop interface', '拖拽界面'),
        getText('Auto document detection', '自动文档检测'),
        getText('Quality validation', '质量验证')
      ]
    },
    {
      id: 3,
      title: getText('AI Analysis', 'AI分析'),
      title_zh: 'AI分析',
      subtitle: getText('Smart processing', '智能处理'),
      subtitle_zh: '智能处理',
      description: getText(
        'Our advanced AI analyzes your documents, extracts key information, and identifies potential issues. Get real-time RFE risk assessment and recommendations.',
        '我们的高级AI分析您的文档，提取关键信息，并识别潜在问题。获得实时RFE风险评估和建议。'
      ),
      description_zh: '我们的高级AI分析您的文档，提取关键信息，并识别潜在问题。获得实时RFE风险评估和建议。',
      icon: CpuChipIcon,
      color: 'from-purple-500 to-violet-600',
      time: getText('2 min', '2分钟'),
      features: [
        getText('AI document analysis', 'AI文档分析'),
        getText('RFE risk assessment', 'RFE风险评估'),
        getText('Smart recommendations', '智能建议')
      ]
    },
    {
      id: 4,
      title: getText('Generate PDFs', '生成PDF'),
      title_zh: '生成PDF',
      subtitle: getText('Ready to submit', '准备提交'),
      subtitle_zh: '准备提交',
      description: getText(
        'Download your completed I-130/I-485 forms with all information pre-filled. Get a comprehensive submission checklist and filing instructions.',
        '下载您完成的I-130/I-485表格，所有信息均已预填。获得综合提交清单和申请说明。'
      ),
      description_zh: '下载您完成的I-130/I-485表格，所有信息均已预填。获得综合提交清单和申请说明。',
      icon: DocumentTextIcon,
      color: 'from-green-500 to-emerald-600',
      time: getText('1 min', '1分钟'),
      features: [
        getText('Pre-filled forms', '预填表格'),
        getText('Submission checklist', '提交清单'),
        getText('Filing instructions', '申请说明')
      ]
    }
  ];

  const benefits = [
    {
      icon: ClockIcon,
      title: getText('Save 40+ Hours', '节省40+小时'),
      title_zh: '节省40+小时',
      description: getText('Automate form filling and document preparation', '自动化表格填写和文档准备'),
      description_zh: '自动化表格填写和文档准备',
      stat: '40+'
    },
    {
      icon: ExclamationTriangleIcon,
      title: getText('Reduce RFE Risk', '降低RFE风险'),
      title_zh: '降低RFE风险',
      description: getText('AI-powered document validation and compliance checks', 'AI驱动的文档验证和合规检查'),
      description_zh: 'AI驱动的文档验证和合规检查',
      stat: '40%'
    },
    {
      icon: ShieldCheckIcon,
      title: getText('Bank-Level Security', '银行级安全'),
      title_zh: '银行级安全',
      description: getText('Your data is encrypted and secure at all times', '您的数据始终加密和安全'),
      description_zh: '您的数据始终加密和安全',
      stat: '256-bit'
    },
    {
      icon: ChartBarIcon,
      title: getText('Success Rate', '成功率'),
      title_zh: '成功率',
      description: getText('Higher approval rates with our comprehensive preparation', '通过我们全面的准备获得更高的批准率'),
      description_zh: '通过我们全面的准备获得更高的批准率',
      stat: '94%'
    }
  ];

  const faqs = [
    {
      question: getText('How does the AI analysis work?', 'AI分析是如何工作的？'),
      question_zh: 'AI分析是如何工作的？',
      answer: getText(
        'Our AI uses advanced OCR and machine learning to extract information from your documents, validate completeness, check for common errors, and assess RFE risk factors based on USCIS requirements.',
        '我们的AI使用先进的OCR和机器学习从您的文档中提取信息，验证完整性，检查常见错误，并根据USCIS要求评估RFE风险因素。'
      ),
      answer_zh: '我们的AI使用先进的OCR和机器学习从您的文档中提取信息，验证完整性，检查常见错误，并根据USCIS要求评估RFE风险因素。'
    },
    {
      question: getText('Is my personal information secure?', '我的个人信息安全吗？'),
      question_zh: '我的个人信息安全吗？',
      answer: getText(
        'Yes, we use bank-level 256-bit encryption, secure cloud storage, and comply with all data protection regulations. Your documents are processed securely and can be deleted at any time.',
        '是的，我们使用银行级256位加密、安全云存储，并遵守所有数据保护法规。您的文档安全处理，可随时删除。'
      ),
      answer_zh: '是的，我们使用银行级256位加密、安全云存储，并遵守所有数据保护法规。您的文档安全处理，可随时删除。'
    },
    {
      question: getText('What if I need help during the process?', '如果我在过程中需要帮助怎么办？'),
      question_zh: '如果我在过程中需要帮助怎么办？',
      answer: getText(
        'We provide 24/7 chat support, comprehensive guides, and attorney-reviewed resources. Our support team can help with any questions about document requirements or the application process.',
        '我们提供24/7聊天支持、综合指南和律师审查的资源。我们的支持团队可以帮助回答关于文档要求或申请流程的任何问题。'
      ),
      answer_zh: '我们提供24/7聊天支持、综合指南和律师审查的资源。我们的支持团队可以帮助回答关于文档要求或申请流程的任何问题。'
    },
    {
      question: getText('Can I use this for both I-130 and I-485?', '我可以同时用于I-130和I-485吗？'),
      question_zh: '我可以同时用于I-130和I-485吗？',
      answer: getText(
        'Yes, VisaMate supports both I-130 family-based petitions and I-485 adjustment of status applications. You can file them together or separately based on your specific situation.',
        '是的，VisaMate支持I-130家庭团聚申请和I-485身份调整申请。您可以根据具体情况一起申请或分别申请。'
      ),
      answer_zh: '是的，VisaMate支持I-130家庭团聚申请和I-485身份调整申请。您可以根据具体情况一起申请或分别申请。'
    }
  ];

  const totalTime = steps.reduce((sum, step) => {
    const timeNum = parseInt(step.time.match(/\d+/)?.[0] || '0');
    return sum + timeNum;
  }, 0);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="mb-6 animate-fade-in-up">
              {getText('How VisaMate Works', 'VisaMate如何工作')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <span data-lang-cn="通过4个简单步骤简化您的绿卡申请流程">
                {getText(
                  'Simplify your green card application process in 4 easy steps',
                  '通过4个简单步骤简化您的绿卡申请流程'
                )}
              </span>
            </p>
            
            <div className="flex items-center justify-center gap-8 mb-12 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{totalTime}</div>
                <div className="text-sm text-muted-foreground">
                  {getText('Minutes Total', '分钟总计')}
                </div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-1">40%</div>
                <div className="text-sm text-muted-foreground">
                  {getText('RFE Risk Reduction', 'RFE风险降低')}
                </div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">40+</div>
                <div className="text-sm text-muted-foreground">
                  {getText('Hours Saved', '节省小时')}
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('onboarding')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-medium transition-all hover-scale animate-fade-in-up flex items-center gap-2 mx-auto"
              style={{animationDelay: '0.3s'}}
            >
              <PlayCircleIcon className="w-5 h-5" />
              {getText('Start Your Application', '开始您的申请')}
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4">
              {getText('Step-by-Step Process', '分步流程')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              <span data-lang-cn="我们的简化流程让您专注于重要的事情——您的绿卡申请">
                {getText(
                  'Our streamlined process lets you focus on what matters – your green card application',
                  '我们的简化流程让您专注于重要的事情——您的绿卡申请'
                )}
              </span>
            </p>
          </div>

          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between mb-16">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <button
                    onClick={() => setActiveStep(step.id)}
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activeStep === step.id
                        ? `bg-gradient-to-r ${step.color} text-white shadow-lg scale-110`
                        : 'bg-muted text-muted-foreground hover:bg-secondary'
                    }`}
                  >
                    <step.icon className="w-8 h-8" />
                  </button>
                  
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-4 transition-colors duration-300 ${
                      activeStep > step.id ? 'bg-primary' : 'bg-border'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Active Step Content */}
            {steps.map((step) => (
              <div
                key={step.id}
                className={`transition-all duration-500 ${
                  activeStep === step.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute'
                }`}
                style={{ display: activeStep === step.id ? 'block' : 'none' }}
              >
                <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${step.color} flex items-center justify-center`}>
                          <step.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            {language === 'zh' ? step.title_zh : step.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {language === 'zh' ? step.subtitle_zh : step.subtitle}
                          </p>
                        </div>
                        <div className="ml-auto">
                          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                            {step.time}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-6">
                        {language === 'zh' ? step.description_zh : step.description}
                      </p>
                      
                      <div className="space-y-2">
                        {step.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircleIcon className="w-4 h-4 text-accent" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <div className={`w-48 h-48 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg`}>
                        <step.icon className="w-24 h-24 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center flex-shrink-0`}>
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="bg-card border border-border rounded-xl p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">
                          {language === 'zh' ? step.title_zh : step.title}
                        </h3>
                        <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                          {step.time}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        {language === 'zh' ? step.description_zh : step.description}
                      </p>
                      
                      <div className="space-y-1">
                        {step.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircleIcon className="w-4 h-4 text-accent" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="absolute left-6 top-12 w-px h-8 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24 bg-neutral">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4">
              {getText('Why Choose VisaMate', '为什么选择VisaMate')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              <span data-lang-cn="我们的平台专为简化移民文档准备而设计，确保准确性和合规性">
                {getText(
                  'Our platform is designed to streamline immigration document preparation while ensuring accuracy and compliance',
                  '我们的平台专为简化移民文档准备而设计，确保准确性和合规性'
                )}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-background border border-border rounded-xl p-6 text-center transition-all hover:shadow-md hover-scale"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                
                <div className="text-3xl font-bold text-primary mb-2">
                  {benefit.stat}
                </div>
                
                <h4 className="font-medium mb-2">
                  {language === 'zh' ? benefit.title_zh : benefit.title}
                </h4>
                
                <p className="text-sm text-muted-foreground">
                  {language === 'zh' ? benefit.description_zh : benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4">
              {getText('Frequently Asked Questions', '常见问题')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              <span data-lang-cn="获取关于我们流程和服务的答案">
                {getText(
                  'Get answers about our process and services',
                  '获取关于我们流程和服务的答案'
                )}
              </span>
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setShowFAQ(showFAQ === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-secondary transition-colors"
                >
                  <h4 className="font-medium">
                    {language === 'zh' ? faq.question_zh : faq.question}
                  </h4>
                  <ArrowRightIcon 
                    className={`w-5 h-5 text-muted-foreground transition-transform ${
                      showFAQ === index ? 'rotate-90' : ''
                    }`} 
                  />
                </button>
                
                {showFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-muted-foreground">
                      {language === 'zh' ? faq.answer_zh : faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="mb-4">
            {getText('Ready to Start Your Green Card Journey?', '准备开始您的绿卡之旅了吗？')}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            <span data-lang-cn="立即加入数千名使用VisaMate简化移民申请的用户">
              {getText(
                'Join thousands of users who have simplified their immigration application with VisaMate',
                '立即加入数千名使用VisaMate简化移民申请的用户'
              )}
            </span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('onboarding')}
              className="bg-white hover:bg-white/90 text-primary px-8 py-4 rounded-lg font-medium transition-all hover-scale flex items-center gap-2 justify-center"
            >
              {getText('Start Free Trial', '开始免费试用')}
              <ArrowRightIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className="border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-lg font-medium transition-all hover-scale"
            >
              {getText('View Pricing', '查看定价')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}