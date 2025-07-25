'use client';

import React from 'react';
import { 
  DocumentTextIcon, 
  ClockIcon, 
  ExclamationTriangleIcon, 
  ChatBubbleLeftRightIcon,
  XCircleIcon,
  DocumentIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';
import { useAuth, useApi } from './AuthContext';
import { VisaCategorySelector } from './VisaCategorySelector';
import { EB1AToolsSuite } from './EB1AToolsSuite';

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
              user && typeof user.rfeRisk === 'number' && user.rfeRisk > 50
              ? 'bg-amber-50 border-amber-200' 
              : 'bg-green-50 border-green-200'
          }`}>
            <div className="flex items-start gap-3">
              <ExclamationTriangleIcon className={`w-6 h-6 mt-0.5 flex-shrink-0 ${
                  user && typeof user.rfeRisk === 'number' && user.rfeRisk > 50 ? 'text-amber-600' : 'text-green-600'
              }`} />
              <div className="flex-1">
                <h3 className={`font-medium mb-2 ${
                    user && typeof user.rfeRisk === 'number' && user.rfeRisk > 50 ? 'text-amber-800' : 'text-green-800'
                }`}>
                  {getText('RFE Risk Assessment', 'RFE风险评估')}
                </h3>
                
                {/* Risk Percentage Display */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${
                        user && typeof user.rfeRisk === 'number' && user.rfeRisk > 50 ? 'text-amber-700' : 'text-green-700'
                    }`}>
                      {getText('Current Risk Level', '当前风险水平')}
                    </span>
                    <span className={`text-lg font-bold ${
                        user && typeof user.rfeRisk === 'number' && user.rfeRisk > 50 ? 'text-amber-800' : 'text-green-800'
                    }`}>
                      {user?.rfeRisk || 0}%
                    </span>
                  </div>
                  <div className="w-full bg-white/50 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                          user && typeof user.rfeRisk === 'number' && user.rfeRisk > 50 ? 'bg-amber-600' : 'bg-green-600'
                      }`}
                      style={{ width: `${user?.rfeRisk || 0}%` }}
                    />
                  </div>
                </div>
                
                <p className={`text-sm mb-4 ${
                    user && typeof user.rfeRisk === 'number' && user.rfeRisk > 50 ? 'text-amber-700' : 'text-green-700'
                }`}>
                  <span data-lang-cn={user && typeof user.rfeRisk === 'number' && user.rfeRisk > 50 ? '上传更多文档以降低风险。' : '风险较低，继续保持！'}>
                    {getText(
                        user && typeof user.rfeRisk === 'number' && user.rfeRisk > 50 ? 'Upload more documents to reduce risk.' : 'Risk is low, keep it up!',
                        user && typeof user.rfeRisk === 'number' && user.rfeRisk > 50 ? '上传更多文档以降低风险。' : '风险较低，继续保持！'
                    )}
                  </span>
                </p>
                
                {user && typeof user.rfeRisk === 'number' && user.rfeRisk > 50 && (
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

        {/* EB1A Tools Suite - Show when EB1A is selected */}
        {(user?.visaCategory === 'EB-1A' || true) && (
          <EB1AToolsSuite language={language} onShowUploads={onShowUploads} />
        )}

        {/* Refresh data when upload modal closes */}
        <div style={{ display: 'none' }} />



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