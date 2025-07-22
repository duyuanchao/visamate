import React from 'react';
import { ShieldCheckIcon, UserGroupIcon, ChartBarIcon, ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline';

interface HomeProps {
  onNavigate: (page: string) => void;
  language: 'en' | 'zh';
}

export function Home({ onNavigate, language }: HomeProps) {
  const getText = (en: string, zh: string) => language === 'zh' ? zh : en;

  const trustBadges = [
    {
      icon: ShieldCheckIcon,
      title: getText('Secure Encryption', '安全加密'),
      description: getText('Bank-level security for your documents', '银行级文档安全保护'),
    },
    {
      icon: UserGroupIcon,
      title: getText('Attorney Partnership', '律师合作'),
      description: getText('Reviewed by licensed immigration lawyers', '持牌移民律师审核'),
    },
    {
      icon: ChartBarIcon,
      title: getText('40% RFE Reduction', 'RFE降低40%'),
      description: getText('Significantly lower rejection rates', '显著降低拒绝率'),
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: getText('Upload Documents', '上传文档'),
      description: getText('Drag and drop your immigration documents for instant processing', '拖放您的移民文档进行即时处理'),
    },
    {
      step: '02',
      title: getText('AI Analysis', 'AI分析'),
      description: getText('Our OCR technology extracts and validates all required information', '我们的OCR技术提取并验证所有必需信息'),
    },
    {
      step: '03',
      title: getText('Expert Review', '专家审核'),
      description: getText('Licensed attorneys verify accuracy and completeness', '持牌律师验证准确性和完整性'),
    },
  ];

  const faqItems = [
    {
      question: getText('How secure is my personal information?', '我的个人信息有多安全？'),
      answer: getText(
        'We use bank-level encryption and never store sensitive documents after processing. All data is handled in compliance with GDPR and US privacy laws.',
        '我们使用银行级加密，处理后不存储敏感文档。所有数据处理均符合GDPR和美国隐私法律。'
      ),
    },
    {
      question: getText('What forms does VisaMate support?', 'VisaMate支持哪些表格？'),
      answer: getText(
        'Currently supporting I-130 and I-485 forms with I-864 and supporting evidence processing. More forms coming soon.',
        '目前支持I-130和I-485表格，以及I-864和支持证据处理。更多表格即将推出。'
      ),
    },
    {
      question: getText('How long does the process take?', '处理过程需要多长时间？'),
      answer: getText(
        'Most users complete document upload and receive AI-filled forms within 15 minutes. Attorney review adds 1-2 business days.',
        '大多数用户在15分钟内完成文档上传并收到AI填写的表格。律师审核需要1-2个工作日。'
      ),
    },
  ];

  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null);

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden" role="banner">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {getText('Your Green Card, Simplified', '您的绿卡，简化办理')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              <span data-lang-cn="使用AI技术在15分钟内完成移民文档准备，减少RFE风险40%">
                {getText(
                  'Complete your immigration paperwork in 15 minutes with AI-powered document preparation. Reduce RFE risk by 40%.',
                  '使用AI技术在15分钟内完成移民文档准备，减少RFE风险40%'
                )}
              </span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button 
                onClick={() => onNavigate('onboarding')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-medium hover-scale transition-all flex items-center justify-center gap-2"
                aria-label={getText('Start your green card application for free', '免费开始您的绿卡申请')}
              >
                {getText('Get Started Free', '免费开始')}
                <ArrowRightIcon className="w-5 h-5" />
              </button>
              <button 
                onClick={() => onNavigate('how-it-works')}
                className="border border-border hover:bg-secondary text-foreground px-8 py-4 rounded-lg font-medium transition-all"
              >
                {getText('See How It Works', '了解工作原理')}
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex flex-col items-center p-6 rounded-lg bg-neutral border border-border hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <badge.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">{badge.title}</h3>
                  <p className="text-sm text-muted-foreground text-center">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-neutral" role="region" aria-labelledby="how-it-works-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="how-it-works-heading" className="mb-4">
              {getText('How VisaMate Works', 'VisaMate如何工作')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              <span data-lang-cn="简化的三步流程，让您的移民申请变得轻松">
                {getText(
                  'A simplified three-step process that makes your immigration application effortless',
                  '简化的三步流程，让您的移民申请变得轻松'
                )}
              </span>
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Connector Line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary to-accent transform -translate-x-4 z-0" />
                  )}
                  
                  <div className="relative bg-background p-8 rounded-xl border border-border hover:shadow-lg transition-shadow z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-6 mx-auto lg:mx-0">
                      <span className="text-white font-bold text-lg">{step.step}</span>
                    </div>
                    <h3 className="font-medium mb-4 text-center lg:text-left">{step.title}</h3>
                    <p className="text-muted-foreground text-center lg:text-left">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20" role="region" aria-labelledby="faq-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 id="faq-heading" className="mb-4">
                {getText('Frequently Asked Questions', '常见问题')}
              </h2>
              <p className="text-muted-foreground">
                <span data-lang-cn="获取有关VisaMate如何简化您的移民流程的答案">
                  {getText(
                    'Get answers about how VisaMate simplifies your immigration process',
                    '获取有关VisaMate如何简化您的移民流程的答案'
                  )}
                </span>
              </p>
            </div>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="border border-border rounded-lg overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left font-medium hover:bg-neutral transition-colors flex items-center justify-between"
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    aria-expanded={openFaqIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span>{item.question}</span>
                    <ChevronDownIcon 
                      className={`w-5 h-5 transition-transform ${
                        openFaqIndex === index ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  {openFaqIndex === index && (
                    <div 
                      id={`faq-answer-${index}`}
                      className="px-6 pb-4 text-muted-foreground border-t border-border bg-neutral/50"
                    >
                      <p className="pt-4">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white" role="region" aria-labelledby="cta-heading">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 id="cta-heading" className="text-white mb-4">
            {getText('Ready to Simplify Your Green Card Process?', '准备简化您的绿卡申请流程？')}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            <span data-lang-cn="今天就开始，15分钟内上传文档并获得AI填写的表格">
              {getText(
                'Get started today and have your documents uploaded and AI-filled forms ready in just 15 minutes',
                '今天就开始，15分钟内上传文档并获得AI填写的表格'
              )}
            </span>
          </p>
          <button 
            onClick={() => onNavigate('onboarding')}
            className="bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-lg font-medium hover-scale transition-all inline-flex items-center gap-2"
          >
            {getText('Start Your Application', '开始申请')}
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}

// Import ChevronDownIcon
import { ChevronDownIcon } from '@heroicons/react/24/outline';