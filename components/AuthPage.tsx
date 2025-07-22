import React from 'react';
import { EyeIcon, EyeSlashIcon, ArrowRightIcon, ExclamationTriangleIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { useAuth } from './AuthContext';
import { visaCategories, categoryGroups } from '../utils/visaCategories';

interface AuthPageProps {
  mode: 'signin' | 'signup';
  onNavigate: (page: string) => void;
  language: 'en' | 'zh';
  onSwitchMode: (mode: 'signin' | 'signup') => void;
}

export function AuthPage({ mode, onNavigate, language, onSwitchMode }: AuthPageProps) {
  const { signIn, signUp, loading } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const [expandedGroups, setExpandedGroups] = React.useState<{ [key: string]: boolean }>({
    family: true,
    employment: false,
    investment: false,
    special: false
  });
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    visaCategory: '',
  });
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const [submitError, setSubmitError] = React.useState('');

  const getText = (en: string, zh: string) => language === 'zh' ? zh : en;



  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    if (submitError) {
      setSubmitError('');
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = getText('Email is required', '请输入邮箱');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = getText('Please enter a valid email', '请输入有效邮箱');
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = getText('Password is required', '请输入密码');
    } else if (formData.password.length < 6) {
      newErrors.password = getText('Password must be at least 6 characters', '密码至少需要6个字符');
    }

    // Additional validation for signup
    if (mode === 'signup') {
      if (!formData.firstName.trim()) {
        newErrors.firstName = getText('First name is required', '请输入名字');
      }

      if (!formData.lastName.trim()) {
        newErrors.lastName = getText('Last name is required', '请输入姓氏');
      }



      if (!formData.visaCategory) {
        newErrors.visaCategory = getText('Visa category is required', '请选择签证类别');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getErrorMessage = (error: string) => {
    // Map common error messages to user-friendly ones
    const errorMap: { [key: string]: { en: string; zh: string } } = {
      'Invalid login credentials': {
        en: 'Invalid email or password. Please check your credentials and try again.',
        zh: '邮箱或密码无效。请检查您的凭据并重试。'
      },
      'User not found': {
        en: 'No account found with this email address. Please sign up first.',
        zh: '未找到使用此邮箱的账户。请先注册。'
      },
      'Email already registered': {
        en: 'An account with this email already exists. Please sign in instead.',
        zh: '此邮箱已注册账户。请直接登录。'
      },
      'Weak password': {
        en: 'Password is too weak. Please use at least 6 characters.',
        zh: '密码过于简单。请使用至少6个字符。'
      },
      'Invalid email': {
        en: 'Please enter a valid email address.',
        zh: '请输入有效的邮箱地址。'
      }
    };

    const mapped = errorMap[error];
    if (mapped) {
      return getText(mapped.en, mapped.zh);
    }

    // Return original error if no mapping found
    return error;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    console.log('Form submitted with mode:', mode, 'email:', formData.email);
    setSubmitError(''); // Clear any previous errors

    if (mode === 'signin') {
      console.log('Attempting signin...');
      const result = await signIn(formData.email, formData.password);
      console.log('Signin result:', result);
      
      if (result.success) {
        console.log('Signin successful, navigating to dashboard');
        onNavigate('dashboard');
      } else {
        console.log('Signin failed:', result.error);
        setSubmitError(getErrorMessage(result.error || 'Authentication failed'));
      }
    } else {
      console.log('Attempting signup...');
      const result = await signUp(
        formData.email, 
        formData.password, 
        formData.firstName, 
        formData.lastName, 
        formData.visaCategory
      );
      console.log('Signup result:', result);
      
      if (result.success) {
        console.log('Signup successful, switching to signin mode');
        onSwitchMode('signin');
        setSubmitError('');
        // Show success message or automatically signin
      } else {
        console.log('Signup failed:', result.error);
        setSubmitError(getErrorMessage(result.error || 'Registration failed'));
      }
    }
  };



  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-amber-600 bg-amber-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getComplexityText = (complexity: string) => {
    switch (complexity) {
      case 'low': return getText('Low', '低');
      case 'medium': return getText('Medium', '中');
      case 'high': return getText('High', '高');
      default: return complexity;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Hero/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-accent p-12 text-white flex-col justify-center">
        <div className="max-w-md">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">VM</span>
            </div>
            <span className="font-bold text-2xl">VisaMate</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-6">
            {getText('Your Green Card Journey Starts Here', '您的绿卡之旅从这里开始')}
          </h1>
          
          <p className="text-xl text-white/90 mb-8">
            <span data-lang-cn="使用AI技术简化移民文档准备，减少RFE风险40%">
              {getText(
                'Simplify immigration document preparation with AI technology and reduce RFE risk by 40%',
                '使用AI技术简化移民文档准备，减少RFE风险40%'
              )}
            </span>
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>{getText('Support for all green card types', '支持所有绿卡类型')}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>{getText('Attorney-reviewed process', '律师审核流程')}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>{getText('15-minute setup', '15分钟快速设置')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">VM</span>
            </div>
            <span className="font-bold text-xl">VisaMate</span>
          </div>

          <div className="mb-8">
            <h2 className="mb-2">
              {mode === 'signin' 
                ? getText('Welcome Back', '欢迎回来')
                : getText('Create Your Account', '创建您的账户')
              }
            </h2>
            <p className="text-muted-foreground">
              {mode === 'signin' 
                ? getText('Sign in to continue your green card journey', '登录继续您的绿卡申请之旅')
                : getText('Get started with your immigration document preparation', '开始您的移民文档准备')
              }
            </p>
          </div>



          {submitError && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
              <div className="flex items-start gap-3">
                <ExclamationTriangleIcon className="w-5 h-5 text-error mt-0.5 flex-shrink-0" />
                <p className="text-error text-sm">{submitError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name fields for signup */}
            {mode === 'signup' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
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
                    placeholder={getText('Enter first name', '输入名字')}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-error">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
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
                    placeholder={getText('Enter last name', '输入姓氏')}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-error">{errors.lastName}</p>
                  )}
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                {getText('Email Address', '邮箱地址')} *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                  errors.email ? 'border-error' : 'border-border'
                }`}
                placeholder={getText('Enter your email', '输入您的邮箱')}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-error">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                {getText('Password', '密码')} *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                    errors.password ? 'border-error' : 'border-border'
                  }`}
                  placeholder={getText('Enter your password', '输入您的密码')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-error">{errors.password}</p>
              )}
            </div>

            {/* Additional fields for signup */}
            {mode === 'signup' && (
              <>


                <div>
                  <label htmlFor="visaCategory" className="block text-sm font-medium mb-2">
                    {getText('Green Card Category', '绿卡类别')} *
                  </label>
                  
                  <div className={`border rounded-lg ${errors.visaCategory ? 'border-error' : 'border-border'}`}>
                    {categoryGroups.map((group) => {
                      const groupCategories = visaCategories.filter(cat => cat.category === group.id);
                      const isExpanded = expandedGroups[group.id];
                      
                      return (
                        <div key={group.id} className="border-b border-border last:border-b-0">
                          <button
                            type="button"
                            onClick={() => toggleGroup(group.id)}
                            className="w-full px-4 py-3 bg-secondary/30 hover:bg-secondary/50 transition-colors flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-sm">{group.icon}</span>
                              <div className="text-left">
                                <span className="text-sm font-medium">
                                  {language === 'zh' ? group.name_zh : group.name}
                                </span>
                              </div>
                            </div>
                            {isExpanded ? (
                              <ChevronUpIcon className="w-4 h-4 text-muted-foreground" />
                            ) : (
                              <ChevronDownIcon className="w-4 h-4 text-muted-foreground" />
                            )}
                          </button>
                          
                          {isExpanded && (
                            <div className="p-2 space-y-2 bg-background">
                              {groupCategories.map((category) => (
                                <label
                                  key={category.value}
                                  className={`flex items-start gap-3 p-3 rounded border cursor-pointer transition-all hover:shadow-sm ${
                                    formData.visaCategory === category.value
                                      ? 'border-primary bg-primary/5'
                                      : 'border-border hover:border-primary/30'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="visaCategory"
                                    value={category.value}
                                    checked={formData.visaCategory === category.value}
                                    onChange={(e) => handleInputChange('visaCategory', e.target.value)}
                                    className="mt-0.5 w-4 h-4 text-primary focus:ring-primary border-border"
                                  />
                                  
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                      <span className="text-sm font-medium">{category.label}</span>
                                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getComplexityColor(category.complexity)}`}>
                                        {getComplexityText(category.complexity)}
                                      </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                      {language === 'zh' ? category.subtitle_zh : category.subtitle}
                                    </p>
                                  </div>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  {errors.visaCategory && (
                    <p className="mt-1 text-sm text-error">{errors.visaCategory}</p>
                  )}
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground py-3 rounded-lg font-medium transition-all hover-scale flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin w-5 h-5 border border-primary-foreground border-t-transparent rounded-full" />
                  {getText('Processing...', '处理中...')}
                </>
              ) : (
                <>
                  {mode === 'signin' 
                    ? getText('Sign In', '登录')
                    : getText('Create Account', '创建账户')
                  }
                  <ArrowRightIcon className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Switch Mode */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              {mode === 'signin' 
                ? getText("Don't have an account?", '还没有账户？')
                : getText('Already have an account?', '已有账户？')
              }{' '}
              <button
                onClick={() => onSwitchMode(mode === 'signin' ? 'signup' : 'signin')}
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                {mode === 'signin' 
                  ? getText('Sign up', '注册')
                  : getText('Sign in', '登录')
                }
              </button>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <button
              onClick={() => onNavigate('home')}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {getText('← Back to Home', '← 返回首页')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}