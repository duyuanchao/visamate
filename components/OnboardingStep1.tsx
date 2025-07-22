'use client';

import React from 'react';
import { ChevronRightIcon, CheckIcon } from '@heroicons/react/24/outline';

interface OnboardingStep1Props {
  onNavigate: (page: string) => void;
  language: 'en' | 'zh';
}

export function OnboardingStep1({ onNavigate, language }: OnboardingStep1Props) {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    birthCountry: '',
    visaCategory: '',
    agreeToTerms: false,
  });
  
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  
  const getText = (en: string, zh: string) => language === 'zh' ? zh : en;

  const steps = [
    {
      number: 1,
      title: getText('Basic Information', '基本信息'),
      description: getText('Tell us about yourself', '告诉我们您的信息'),
      active: true,
    },
    {
      number: 2,
      title: getText('Document Upload', '文档上传'),
      description: getText('Upload required documents', '上传所需文档'),
      active: false,
    },
    {
      number: 3,
      title: getText('Review & Submit', '审核提交'),
      description: getText('Review and submit application', '审核并提交申请'),
      active: false,
    },
    {
      number: 4,
      title: getText('Processing', '处理中'),
      description: getText('AI analysis and form generation', 'AI分析和表格生成'),
      active: false,
    },
  ];

  const countries = [
    { value: '', label: getText('Select your birth country', '选择您的出生国家') },
    { value: 'CN', label: getText('China', '中国') },
    { value: 'IN', label: getText('India', '印度') },
    { value: 'MX', label: getText('Mexico', '墨西哥') },
    { value: 'PH', label: getText('Philippines', '菲律宾') },
    { value: 'VN', label: getText('Vietnam', '越南') },
    { value: 'OTHER', label: getText('Other', '其他') },
  ];

  const visaCategories = [
    { value: '', label: getText('Select visa category', '选择签证类别') },
    { value: 'I-130', label: 'I-130 (Family-based petition)' },
    { value: 'I-485', label: 'I-485 (Adjustment of status)' },
    { value: 'BOTH', label: getText('Both I-130 and I-485', 'I-130和I-485') },
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = getText('First name is required', '请输入名字');
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = getText('Last name is required', '请输入姓氏');
    }

    if (!formData.birthCountry) {
      newErrors.birthCountry = getText('Birth country is required', '请选择出生国家');
    }

    if (!formData.visaCategory) {
      newErrors.visaCategory = getText('Visa category is required', '请选择签证类别');
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = getText('You must agree to the terms', '必须同意条款');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      // In a real app, this would save the data and move to step 2
      onNavigate('dashboard'); // For demo purposes, go to dashboard
    }
  };

  return (
    <div className="bg-background min-h-screen py-8">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Progress Stepper */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center min-w-0 flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all mb-3 ${
                    step.active
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'border-border text-muted-foreground bg-background'
                  }`}>
                    {step.active ? (
                      <span className="font-medium">{step.number}</span>
                    ) : (
                      <span className="font-medium">{step.number}</span>
                    )}
                  </div>
                  <div className="text-center">
                    <div className={`text-sm font-medium mb-1 ${
                      step.active ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-muted-foreground hidden sm:block">
                      {step.description}
                    </div>
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="flex-1 max-w-24 mx-4">
                    <div className="h-0.5 bg-border relative">
                      <div className="absolute inset-0 bg-primary w-0 transition-all duration-500" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-8">
            <div className="mb-8">
              <h1 className="mb-2">
                {getText('Let\'s Get Started', '让我们开始吧')}
              </h1>
              <p className="text-muted-foreground">
                <span data-lang-cn="请提供一些基本信息来开始您的移民申请流程。">
                  {getText(
                    'Please provide some basic information to begin your immigration application process.',
                    '请提供一些基本信息来开始您的移民申请流程。'
                  )}
                </span>
              </p>
            </div>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleContinue(); }}>
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label 
                    htmlFor="firstName" 
                    className="block text-sm font-medium mb-2"
                  >
                    {getText('First Name', '名字')} *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                      errors.firstName ? 'border-error' : 'border-border'
                    }`}
                    placeholder={getText('Enter your first name', '输入您的名字')}
                    aria-invalid={!!errors.firstName}
                    aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                  />
                  {errors.firstName && (
                    <p id="firstName-error" className="mt-1 text-sm text-error">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label 
                    htmlFor="lastName" 
                    className="block text-sm font-medium mb-2"
                  >
                    {getText('Last Name', '姓氏')} *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                      errors.lastName ? 'border-error' : 'border-border'
                    }`}
                    placeholder={getText('Enter your last name', '输入您的姓氏')}
                    aria-invalid={!!errors.lastName}
                    aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                  />
                  {errors.lastName && (
                    <p id="lastName-error" className="mt-1 text-sm text-error">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Birth Country */}
              <div>
                <label 
                  htmlFor="birthCountry" 
                  className="block text-sm font-medium mb-2"
                >
                  {getText('Country of Birth', '出生国家')} *
                </label>
                <select
                  id="birthCountry"
                  value={formData.birthCountry}
                  onChange={(e) => handleInputChange('birthCountry', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                    errors.birthCountry ? 'border-error' : 'border-border'
                  }`}
                  aria-invalid={!!errors.birthCountry}
                  aria-describedby={errors.birthCountry ? 'birthCountry-error' : undefined}
                >
                  {countries.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>
                {errors.birthCountry && (
                  <p id="birthCountry-error" className="mt-1 text-sm text-error">
                    {errors.birthCountry}
                  </p>
                )}
              </div>

              {/* Visa Category */}
              <div>
                <label 
                  htmlFor="visaCategory" 
                  className="block text-sm font-medium mb-2"
                >
                  {getText('Visa Category', '签证类别')} *
                </label>
                <select
                  id="visaCategory"
                  value={formData.visaCategory}
                  onChange={(e) => handleInputChange('visaCategory', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                    errors.visaCategory ? 'border-error' : 'border-border'
                  }`}
                  aria-invalid={!!errors.visaCategory}
                  aria-describedby={errors.visaCategory ? 'visaCategory-error' : undefined}
                >
                  {visaCategories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                {errors.visaCategory && (
                  <p id="visaCategory-error" className="mt-1 text-sm text-error">
                    {errors.visaCategory}
                  </p>
                )}
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                  className="mt-1 w-4 h-4 text-primary focus:ring-primary border-border rounded"
                  aria-invalid={!!errors.agreeToTerms}
                  aria-describedby={errors.agreeToTerms ? 'terms-error' : undefined}
                />
                <label htmlFor="agreeToTerms" className="text-sm text-muted-foreground leading-relaxed">
                  <span data-lang-cn="我同意">
                    {getText('I agree to the', '我同意')}
                  </span>{' '}
                  <button type="button" className="text-primary hover:underline">
                    {getText('Terms of Service', '服务条款')}
                  </button>{' '}
                  <span data-lang-cn="和">
                    {getText('and', '和')}
                  </span>{' '}
                  <button type="button" className="text-primary hover:underline">
                    {getText('Privacy Policy', '隐私政策')}
                  </button>
                </label>
              </div>
              {errors.agreeToTerms && (
                <p id="terms-error" className="text-sm text-error">
                  {errors.agreeToTerms}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6">
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {getText('Back to Home', '返回首页')}
                </button>

                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-all hover-scale flex items-center gap-2"
                >
                  {getText('Continue', '继续')}
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Help Section */}
        <div className="max-w-2xl mx-auto mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            <span data-lang-cn="需要帮助？">
              {getText('Need help?', '需要帮助？')}
            </span>
          </p>
          <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
            {getText('Contact Support', '联系支持')}
          </button>
        </div>
      </div>
    </div>
  );
}