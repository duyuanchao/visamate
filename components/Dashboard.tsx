'use client';

import React from 'react';
import { 
  DocumentTextIcon, 
  ClockIcon, 
  ExclamationTriangleIcon, 
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';
import { useAuth, useApi } from './AuthContext';
import { VisaCategorySelector } from './VisaCategorySelector';

interface DashboardProps {
  onShowUploads: () => void;
  language: 'en' | 'zh';
}

export function Dashboard({ onShowUploads, language }: DashboardProps) {
  const { user, refreshUser } = useAuth();
  const api = useApi();
  const [showChat, setShowChat] = React.useState(false);
  const [timeline, setTimeline] = React.useState<any[]>([]);
  const [checklist, setChecklist] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  
  const getText = (en: string, zh: string) => language === 'zh' ? zh : en;

  // Check if we have a valid session
  const hasValidSession = () => {
    const token = localStorage.getItem('visaMate_accessToken');
    return user && token && token.length > 0;
  };

  // Load user data on component mount
  React.useEffect(() => {
    const loadUserData = async () => {
      console.log('Dashboard useEffect triggered');
      console.log('User:', !!user);
      console.log('Valid session:', hasValidSession());
      
      if (!hasValidSession()) {
        console.log('No valid session, skipping data load');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        console.log('Loading user data for user:', user?.email);
        
        // Test server connectivity first
        try {
          console.log('Testing server health...');
          await api.get('/make-server-54a8f580/health', false); // false = no auth required
          console.log('Server health check passed');
        } catch (healthError) {
          console.error('Server health check failed:', healthError);
          setError(getText('Unable to connect to server. Please try again later.', '无法连接到服务器。请稍后再试。'));
          return;
        }
        
        // Load timeline with detailed error handling
        try {
          console.log('Loading timeline...');
          const timelineData = await api.get('/make-server-54a8f580/user/timeline');
          console.log('Timeline data loaded successfully:', timelineData);
          setTimeline(timelineData.timeline || []);
        } catch (timelineError) {
          console.error('Error loading timeline:', timelineError);
          // Continue with empty timeline instead of failing completely
          setTimeline([]);
        }
        
        // Load checklist with detailed error handling
        try {
          console.log('Loading checklist...');
          const checklistData = await api.get('/make-server-54a8f580/user/checklist');
          console.log('Checklist data loaded successfully:', checklistData);
          setChecklist(checklistData.checklist || []);
        } catch (checklistError) {
          console.error('Error loading checklist:', checklistError);
          // Continue with empty checklist instead of failing completely
          setChecklist([]);
        }
        
        console.log('All user data loaded successfully');
        
      } catch (error: any) {
        console.error('Error loading user data:', error);
        setError(error.message || getText('Failed to load dashboard data', '加载仪表板数据失败'));
        // Set empty states so the UI doesn't break
        setTimeline([]);
        setChecklist([]);
      } finally {
        setLoading(false);
      }
    };

    // Add a small delay to ensure token is set
    const timer = setTimeout(loadUserData, 100);
    return () => clearTimeout(timer);
  }, [user]); // Only depend on user, check session validity inside

  const handleChecklistItemUpdate = async (itemId: string, updates: any) => {
    if (!hasValidSession()) {
      console.error('No valid session for checklist update');
      return;
    }

    try {
      const response = await api.put(`/make-server-54a8f580/user/checklist/${itemId}`, updates);
      setChecklist(response.checklist);
      
      // Refresh user data to get updated stats
      await refreshUser();
      
    } catch (error) {
      console.error('Error updating checklist item:', error);
    }
  };

  const calculateProgress = () => {
    const totalItems = checklist.reduce((sum, category) => sum + category.items.length, 0);
    const completedItems = checklist.reduce(
      (sum, category) => sum + category.items.filter((item: any) => item.completed).length, 
      0
    );
    return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  };

  // Show loading state
  if (loading) {
    return (
      <div className="bg-background min-h-screen py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">
              {getText('Loading your dashboard...', '正在加载您的仪表板...')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-background min-h-screen py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center py-12">
            <ExclamationTriangleIcon className="w-12 h-12 text-error mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-error">
              {getText('Error Loading Dashboard', '加载仪表板出错')}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-all hover-scale"
            >
              {getText('Retry', '重试')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show sign-in prompt if no valid session
  if (!hasValidSession()) {
    return (
      <div className="bg-background min-h-screen py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center py-12">
            <h1 className="mb-4">
              {getText('Please Sign In', '请登录')}
            </h1>
            <p className="text-muted-foreground mb-6">
              {getText('You need to sign in to access your dashboard.', '您需要登录才能访问仪表板。')}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-all hover-scale"
            >
              {getText('Refresh Page', '刷新页面')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-8">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <UserIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="mb-1">
                {getText(`Welcome back, ${user?.firstName}`, `欢迎回来，${user?.firstName}`)}
              </h1>
              <p className="text-muted-foreground">
                <span data-lang-cn="跟踪您的移民申请进度并管理所需文档">
                  {getText('Track your immigration application progress and manage required documents', '跟踪您的移民申请进度并管理所需文档')}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Top Section - User Info and RFE Risk */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Visa Category Selector */}
          <VisaCategorySelector language={language} />

          {/* RFE Risk Alert */}
          <div className={`border rounded-xl p-6 ${
            user && user.rfeRisk > 50 
              ? 'bg-amber-50 border-amber-200' 
              : 'bg-green-50 border-green-200'
          }`}>
            <div className="flex items-start gap-3">
              <ExclamationTriangleIcon className={`w-6 h-6 mt-0.5 flex-shrink-0 ${
                user && user.rfeRisk > 50 ? 'text-amber-600' : 'text-green-600'
              }`} />
              <div className="flex-1">
                <h3 className={`font-medium mb-2 ${
                  user && user.rfeRisk > 50 ? 'text-amber-800' : 'text-green-800'
                }`}>
                  {getText('RFE Risk Assessment', 'RFE风险评估')}
                </h3>
                
                {/* Risk Percentage Display */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${
                      user && user.rfeRisk > 50 ? 'text-amber-700' : 'text-green-700'
                    }`}>
                      {getText('Current Risk Level', '当前风险水平')}
                    </span>
                    <span className={`text-lg font-bold ${
                      user && user.rfeRisk > 50 ? 'text-amber-800' : 'text-green-800'
                    }`}>
                      {user?.rfeRisk || 0}%
                    </span>
                  </div>
                  <div className="w-full bg-white/50 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        user && user.rfeRisk > 50 ? 'bg-amber-600' : 'bg-green-600'
                      }`}
                      style={{ width: `${user?.rfeRisk || 0}%` }}
                    />
                  </div>
                </div>
                
                <p className={`text-sm mb-4 ${
                  user && user.rfeRisk > 50 ? 'text-amber-700' : 'text-green-700'
                }`}>
                  <span data-lang-cn={user && user.rfeRisk > 50 ? '上传更多文档以降低风险。' : '风险较低，继续保持！'}>
                    {getText(
                      user && user.rfeRisk > 50 ? 'Upload more documents to reduce risk.' : 'Risk is low, keep it up!',
                      user && user.rfeRisk > 50 ? '上传更多文档以降低风险。' : '风险较低，继续保持！'
                    )}
                  </span>
                </p>
                
                {user && user.rfeRisk > 50 && (
                  <button 
                    onClick={onShowUploads}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {getText('Upload Documents', '上传文档')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Timeline */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="mb-6 flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-primary" />
                {getText('Case Timeline', '案例时间轴')}
              </h2>

              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        item.status === 'completed' 
                          ? 'bg-accent text-accent-foreground' 
                          : item.status === 'pending'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <CheckCircleIconSolid className="w-5 h-5" />
                      </div>
                      {index < timeline.length - 1 && (
                        <div className={`w-0.5 h-6 mt-2 ${
                          item.status === 'completed' ? 'bg-accent' : 'bg-border'
                        }`} />
                      )}
                    </div>
                    
                    <div className="flex-1 pb-6">
                      <h4 className="font-medium mb-1">
                        {language === 'zh' 
                          ? (item.title_zh || item.title)
                          : item.title
                        }
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {language === 'zh' 
                          ? (item.description_zh || item.description)
                          : item.description
                        }
                      </p>
                      {item.date && (
                        <p className="text-xs text-muted-foreground">
                          {new Date(item.date).toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US')}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                
                {timeline.length === 0 && (
                  <div className="text-center py-8">
                    <ClockIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {getText('No timeline events yet', '暂无时间轴事件')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Document Checklist */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="flex items-center gap-2">
                  <DocumentTextIcon className="w-5 h-5 text-primary" />
                  {getText('Document Checklist', '文档清单')}
                </h2>
                <div className="text-sm text-muted-foreground">
                  {calculateProgress()}% {getText('Complete', '已完成')}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    {getText('Overall Progress', '总体进度')}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {checklist.reduce((sum, cat) => sum + cat.items.filter((item: any) => item.completed).length, 0)} / {checklist.reduce((sum, cat) => sum + cat.items.length, 0)}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-primary to-accent h-3 rounded-full animate-progress transition-all duration-500"
                    style={{ width: `${calculateProgress()}%` }}
                  />
                </div>
              </div>

              {/* Checklist Categories */}
              <div className="space-y-8">
                {checklist.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h3 className="font-medium mb-4 flex items-center gap-2">
                      {language === 'zh' 
                        ? (category.category_zh || category.category)
                        : category.category
                      }
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                        {category.items.filter((item: any) => item.completed).length}/{category.items.length}
                      </span>
                    </h3>
                    
                    <div className="space-y-3">
                      {category.items.map((item: any, itemIndex: number) => (
                        <div key={itemIndex} className={`flex items-start gap-3 p-4 rounded-lg border transition-all hover:shadow-sm ${
                          item.completed ? 'bg-accent/10 border-accent/20' : 'bg-background border-border'
                        }`}>
                          <div className="flex-shrink-0 mt-1">
                            <button
                              onClick={() => handleChecklistItemUpdate(item.id, { completed: !item.completed })}
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                                item.completed 
                                  ? 'bg-accent border-accent text-accent-foreground' 
                                  : item.required 
                                    ? 'border-primary hover:border-primary/80' 
                                    : 'border-border hover:border-primary/50'
                              }`}
                            >
                              {item.completed && <CheckCircleIconSolid className="w-3 h-3" />}
                            </button>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className={`font-medium ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                                {language === 'zh' 
                                  ? (item.name_zh || item.name)
                                  : item.name
                                }
                              </h4>
                              {item.required && !item.completed && (
                                <span className="text-xs bg-error text-error-foreground px-2 py-0.5 rounded-full">
                                  {getText('Required', '必需')}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {language === 'zh' 
                                ? (item.description_zh || item.description)
                                : item.description
                              }
                            </p>
                            
                            {!item.completed && (
                              <button 
                                onClick={onShowUploads}
                                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                              >
                                {getText('Upload Document', '上传文档')}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State CTA */}
              {checklist.length === 0 && (
                <div className="text-center mt-12 p-8 bg-neutral rounded-lg border-2 border-dashed border-border">
                  <DocumentIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">
                    {getText('Ready to Upload Documents?', '准备上传文档了吗？')}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    <span data-lang-cn="开始上传您的文档以降低RFE风险并加快处理速度。">
                      {getText(
                        'Start uploading your documents to reduce RFE risk and speed up processing.',
                        '开始上传您的文档以降低RFE风险并加快处理速度。'
                      )}
                    </span>
                  </p>
                  <button 
                    onClick={onShowUploads}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-all hover-scale"
                  >
                    {getText('Upload Documents', '上传文档')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* AI Chat Sidepanel Button */}
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setShowChat(!showChat)}
            className="bg-accent hover:bg-accent/90 text-accent-foreground w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all hover-scale flex items-center justify-center"
            aria-label={getText('Open AI assistant', '打开AI助手')}
          >
            <ChatBubbleLeftRightIcon className="w-6 h-6" />
          </button>
        </div>

        {/* AI Chat Sidepanel */}
        {showChat && (
          <div className="fixed inset-0 z-50 lg:inset-y-0 lg:right-0 lg:left-auto lg:w-96">
            <div 
              className="absolute inset-0 bg-black/50 lg:hidden"
              onClick={() => setShowChat(false)}
            />
            <div className="relative bg-background border-l border-border h-full shadow-xl transform transition-transform duration-200 ease-in-out">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-medium">
                  {getText('AI Assistant', 'AI助手')}
                </h3>
                <button
                  onClick={() => setShowChat(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors p-2"
                  aria-label={getText('Close chat', '关闭聊天')}
                >
                  <XCircleIcon className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-4 flex items-center justify-center h-64">
                <div className="text-center">
                  <ChatBubbleLeftRightIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    <span data-lang-cn="AI聊天助手将在此处提供实时帮助">
                      {getText('AI chat assistant would provide real-time help here', 'AI聊天助手将在此处提供实时帮助')}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}