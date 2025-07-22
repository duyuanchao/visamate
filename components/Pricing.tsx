'use client';

import React from 'react';
import { CheckIcon, XMarkIcon, StarIcon } from '@heroicons/react/24/outline';

interface PricingProps {
  language: 'en' | 'zh';
}

export function Pricing({ language }: PricingProps) {
  const [billingPeriod, setBillingPeriod] = React.useState<'monthly' | 'annual'>('annual');
  const [animatedPrices, setAnimatedPrices] = React.useState<{ [key: string]: number }>({});
  
  const getText = (en: string, zh: string) => language === 'zh' ? zh : en;

  const plans = [
    {
      id: 'free',
      name: getText('Free', '免费版'),
      description: getText('Get started with basic document review', '基础文档审核入门'),
      monthlyPrice: 0,
      annualPrice: 0,
      popular: false,
      features: [
        {
          included: true,
          text: getText('Upload up to 3 documents', '上传最多3个文档'),
        },
        {
          included: true,
          text: getText('Basic OCR scanning', '基础OCR扫描'),
        },
        {
          included: true,
          text: getText('Form completeness check', '表格完整性检查'),
        },
        {
          included: false,
          text: getText('AI form pre-filling', 'AI表格预填'),
        },
        {
          included: false,
          text: getText('Attorney review', '律师审核'),
        },
        {
          included: false,
          text: getText('RFE risk analysis', 'RFE风险分析'),
        },
      ],
      ctaText: getText('Get Started Free', '免费开始'),
      ctaVariant: 'secondary' as const,
    },
    {
      id: 'pro',
      name: getText('Pro', '专业版'),
      description: getText('Complete AI-powered document preparation', '完整的AI文档准备服务'),
      monthlyPrice: 349,
      annualPrice: 299,
      popular: true,
      features: [
        {
          included: true,
          text: getText('Unlimited document uploads', '无限文档上传'),
        },
        {
          included: true,
          text: getText('Advanced OCR with 99.5% accuracy', '高级OCR，99.5%准确率'),
        },
        {
          included: true,
          text: getText('AI form pre-filling', 'AI表格预填'),
        },
        {
          included: true,
          text: getText('Document completeness scoring', '文档完整性评分'),
        },
        {
          included: true,
          text: getText('RFE risk analysis', 'RFE风险分析'),
        },
        {
          included: false,
          text: getText('Attorney review & validation', '律师审核与验证'),
        },
      ],
      ctaText: getText('Choose Pro', '选择专业版'),
      ctaVariant: 'primary' as const,
    },
    {
      id: 'pro-plus',
      name: getText('Pro+', '专业增强版'),
      description: getText('Pro features plus attorney validation', '专业版功能加律师验证'),
      monthlyPrice: 699,
      annualPrice: 599,
      popular: false,
      features: [
        {
          included: true,
          text: getText('Everything in Pro', '包含专业版所有功能'),
        },
        {
          included: true,
          text: getText('Licensed attorney review', '持牌律师审核'),
        },
        {
          included: true,
          text: getText('Legal accuracy guarantee', '法律准确性保证'),
        },
        {
          included: true,
          text: getText('Priority support (24h response)', '优先支持（24小时响应）'),
        },
        {
          included: true,
          text: getText('Consultation call included', '包含咨询电话'),
        },
        {
          included: true,
          text: getText('Document revision support', '文档修订支持'),
        },
      ],
      ctaText: getText('Choose Pro+', '选择专业增强版'),
      ctaVariant: 'secondary' as const,
    },
  ];

  // Animate price changes
  React.useEffect(() => {
    plans.forEach(plan => {
      const targetPrice = billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
      const startPrice = animatedPrices[plan.id] || targetPrice;
      
      if (startPrice !== targetPrice) {
        const duration = 500;
        const startTime = Date.now();
        
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentPrice = Math.round(startPrice + (targetPrice - startPrice) * easeOut);
          
          setAnimatedPrices(prev => ({ ...prev, [plan.id]: currentPrice }));
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        
        animate();
      }
    });
  }, [billingPeriod]);

  const savings = (monthlyPrice: number, annualPrice: number) => {
    if (monthlyPrice === 0) return 0;
    return Math.round(((monthlyPrice * 12 - annualPrice) / (monthlyPrice * 12)) * 100);
  };

  return (
    <div className="bg-background py-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="mb-4">
            {getText('Simple, Transparent Pricing', '简单透明的定价')}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            <span data-lang-cn="选择适合您需求的计划。随时升级或取消。">
              {getText(
                'Choose the plan that fits your needs. Upgrade or cancel anytime.',
                '选择适合您需求的计划。随时升级或取消。'
              )}
            </span>
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-neutral p-1 rounded-lg border border-border">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              aria-pressed={billingPeriod === 'monthly'}
            >
              {getText('Monthly', '月付')}
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all relative ${
                billingPeriod === 'annual'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              aria-pressed={billingPeriod === 'annual'}
            >
              {getText('Annual', '年付')}
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                {getText('Save 20%', '省20%')}
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const currentPrice = animatedPrices[plan.id] ?? (billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice);
            const savingsPercent = savings(plan.monthlyPrice, plan.annualPrice);
            
            return (
              <div
                key={plan.id}
                className={`relative bg-card rounded-xl border p-8 transition-all duration-300 hover:shadow-lg ${
                  plan.popular 
                    ? 'border-primary ring-2 ring-primary/20 scale-105' 
                    : 'border-border hover:border-primary/30'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1">
                      <StarIcon className="w-4 h-4" />
                      {getText('Most Popular', '最受欢迎')}
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="font-medium mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-center">
                      <span className="text-4xl font-bold">
                        ${currentPrice}
                      </span>
                      {currentPrice > 0 && (
                        <span className="text-muted-foreground ml-2">
                          /{billingPeriod === 'monthly' ? getText('month', '月') : getText('year', '年')}
                        </span>
                      )}
                    </div>
                    
                    {billingPeriod === 'annual' && savingsPercent > 0 && (
                      <div className="mt-2">
                        <span className="text-sm text-accent font-medium">
                          {getText(`Save ${savingsPercent}% annually`, `年付省${savingsPercent}%`)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        feature.included 
                          ? 'bg-accent/20 text-accent' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {feature.included ? (
                          <CheckIcon className="w-3 h-3" />
                        ) : (
                          <XMarkIcon className="w-3 h-3" />
                        )}
                      </div>
                      <span className={`text-sm ${
                        feature.included ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all hover-scale ${
                    plan.ctaVariant === 'primary'
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                      : 'border border-border hover:bg-secondary text-foreground'
                  }`}
                  aria-label={`Choose ${plan.name} plan`}
                >
                  {plan.ctaText}
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            <span data-lang-cn="需要自定义解决方案？">
              {getText('Need a custom solution?', '需要自定义解决方案？')}
            </span>
          </p>
          <button className="text-primary hover:text-primary/80 font-medium transition-colors">
            {getText('Contact our team', '联系我们的团队')}
          </button>
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-neutral p-6 rounded-lg border border-border">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckIcon className="w-6 h-6 text-accent" />
            </div>
            <div className="text-left">
              <div className="font-medium">
                {getText('30-Day Money Back Guarantee', '30天退款保证')}
              </div>
              <div className="text-sm text-muted-foreground">
                <span data-lang-cn="不满意？获得全额退款，无需解释。">
                  {getText('Not satisfied? Get a full refund, no questions asked.', '不满意？获得全额退款，无需解释。')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}