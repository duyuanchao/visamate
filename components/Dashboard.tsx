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

// 懒加载大型组件
const VisaCategorySelector = React.lazy(() => import('./VisaCategorySelector').then(module => ({ default: module.VisaCategorySelector })));
const EB1AToolsSuite = React.lazy(() => import('./EB1AToolsSuite').then(module => ({ default: module.EB1AToolsSuite })));

interface DashboardProps {
  onShowUploads: () => void;
  language: 'en' | 'zh';
}

// API缓存机制
const API_CACHE = new Map<string, { data: any; timestamp: number; expiry: number }>();
const CACHE_EXPIRY = 5 * 60 * 1000; // 5分钟缓存

const getCachedData = (key: string) => {
  const cached = API_CACHE.get(key);
  if (cached && Date.now() < cached.timestamp + cached.expiry) {
    return cached.data;
  }
  return null;
};

const setCachedData = (key: string, data: any, expiry = CACHE_EXPIRY) => {
  API_CACHE.set(key, {
    data,
    timestamp: Date.now(),
    expiry
  });
};

// 健康检查缓存（更长的缓存时间）
let healthCheckCache: { status: boolean; timestamp: number } | null = null;
const HEALTH_CHECK_CACHE_EXPIRY = 2 * 60 * 1000; // 2分钟

const Dashboard = React.memo(function Dashboard({ onShowUploads, language }: DashboardProps) {
  const { user, refreshUser } = useAuth();
  const api = useApi();
  const [showChat, setShowChat] = React.useState(false);
  const [timeline, setTimeline] = React.useState<any[]>([]);
  const [checklist, setChecklist] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  
  const getText = React.useCallback((en: string, zh: string) => language === 'zh' ? zh : en, [language]);

  // 调试信息
  console.log('Dashboard render - user:', !!user, 'loading:', loading, 'error:', error);

  // Check if we have a valid session
  const hasValidSession = React.useCallback(() => {
    const token = localStorage.getItem('visaMate_accessToken');
    return user && token && token.length > 0;
  }, [user]);

  // 优化后的健康检查函数
  const performHealthCheck = React.useCallback(async () => {
    // 检查缓存
    if (healthCheckCache && Date.now() < healthCheckCache.timestamp + HEALTH_CHECK_CACHE_EXPIRY) {
      return healthCheckCache.status;
    }

    try {
      console.log('Testing server health...');
      const healthPromise = api.get('/make-server-54a8f580/health', false);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Health check timeout')), 8000)
      );
      
      await Promise.race([healthPromise, timeoutPromise]);
      console.log('Server health check passed');
      
      // 缓存成功的健康检查
      healthCheckCache = { status: true, timestamp: Date.now() };
      return true;
    } catch (healthError) {
      console.log('Health check failed:', healthError);
      healthCheckCache = { status: false, timestamp: Date.now() };
      return false;
    }
  }, [api]);

  // 优化后的数据加载函数
  const loadDashboardData = React.useCallback(async () => {
    if (!hasValidSession()) {
      console.log('No valid session, using basic mode');
      setLoading(false);
      setTimeline([]);
      setChecklist([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log('Loading user data for user:', user?.email);
      
      // 检查健康状态
      const isHealthy = await performHealthCheck();
      if (!isHealthy) {
        console.log('Server not healthy, continuing with basic functionality');
        setTimeline([]);
        setChecklist([]);
        setLoading(false);
        return;
      }
      
      // 并行加载timeline和checklist数据，使用缓存
      const cacheKeyTimeline = `timeline_${user?.userId}`;
      const cacheKeyChecklist = `checklist_${user?.userId}`;
      
      const promises = [];
      
      // Timeline数据
      const cachedTimeline = getCachedData(cacheKeyTimeline);
      if (cachedTimeline) {
        setTimeline(cachedTimeline);
        console.log('Timeline loaded from cache');
      } else {
        promises.push(
          api.get('/make-server-54a8f580/user/timeline')
            .then(data => {
              const timeline = data.timeline || [];
              setTimeline(timeline);
              setCachedData(cacheKeyTimeline, timeline);
              console.log('Timeline data loaded and cached');
            })
            .catch(error => {
              console.error('Error loading timeline:', error);
              setTimeline([]);
            })
        );
      }
      
      // Checklist数据
      const cachedChecklist = getCachedData(cacheKeyChecklist);
      if (cachedChecklist) {
        setChecklist(cachedChecklist);
        console.log('Checklist loaded from cache');
      } else {
        promises.push(
          api.get('/make-server-54a8f580/user/checklist')
            .then(data => {
              const checklist = data.checklist || [];
              setChecklist(checklist);
              setCachedData(cacheKeyChecklist, checklist);
              console.log('Checklist data loaded and cached');
            })
            .catch(error => {
              console.error('Error loading checklist:', error);
              setChecklist([]);
            })
        );
      }
      
      // 等待所有未缓存的数据加载完成
      if (promises.length > 0) {
        await Promise.allSettled(promises);
      }
      
      console.log('All user data loaded successfully');
      
    } catch (error: any) {
      console.error('Error loading user data:', error);
      setError(error.message || getText('Failed to load dashboard data', '加载仪表板数据失败'));
      setTimeline([]);
      setChecklist([]);
    } finally {
      setLoading(false);
    }
  }, [user?.userId, user?.email, hasValidSession, api, performHealthCheck, getText]);

  // Load user data on component mount - 优化依赖
  React.useEffect(() => {
    if (!user) {
      console.log('No user available, setting loading to false');
      setLoading(false);
      return;
    }

    // 添加短暂延迟确保token已设置
    const timer = setTimeout(loadDashboardData, 100);
    return () => clearTimeout(timer);
  }, [user?.userId, loadDashboardData]); // 只依赖userId，避免user对象变化导致的重复加载

  // 预加载关键页面资源
  React.useEffect(() => {
    // 在页面加载完成后的空闲时间预加载其他页面
    const preloadPages = () => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => {
          // 预加载关键路由
          const router = require('next/router');
          if (router && router.prefetch) {
            router.prefetch('/settings');
            router.prefetch('/doc-builder');
            router.prefetch('/rfe-report');
          }
        }, { timeout: 2000 });
      } else {
        // 降级处理：延迟预加载
        setTimeout(() => {
          const linkPrefetch = document.createElement('link');
          linkPrefetch.rel = 'prefetch';
          linkPrefetch.href = '/settings';
          document.head.appendChild(linkPrefetch);
        }, 3000);
      }
    };

    // 只在dashboard完全加载后执行
    if (!loading && user) {
      preloadPages();
    }
  }, [loading, user]);

  // 优化文件上传事件监听
  React.useEffect(() => {
    const handleFileUpload = (event: CustomEvent) => {
      console.log('File upload event received:', event.detail);
      
      if (hasValidSession()) {
        // 清除相关缓存
        const cacheKeyTimeline = `timeline_${user?.userId}`;
        const cacheKeyChecklist = `checklist_${user?.userId}`;
        API_CACHE.delete(cacheKeyTimeline);
        API_CACHE.delete(cacheKeyChecklist);
        
        // 刷新用户数据
        refreshUser();
        
        // 重新加载dashboard数据
        loadDashboardData();
      }
    };

    window.addEventListener('fileUploaded', handleFileUpload as EventListener);
    
    return () => {
      window.removeEventListener('fileUploaded', handleFileUpload as EventListener);
    };
  }, [hasValidSession, user?.userId, refreshUser, loadDashboardData]);

  // 性能监控
  React.useEffect(() => {
    const performanceMetrics = {
      startTime: performance.now(),
      loadStart: Date.now()
    };

    const measurePerformance = () => {
      const loadTime = performance.now() - performanceMetrics.startTime;
      console.log(`📊 Dashboard load time: ${loadTime.toFixed(2)}ms`);
      
      // 记录性能指标到localStorage（用于调试）
      if (typeof window !== 'undefined') {
        const metrics = {
          dashboardLoadTime: loadTime,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          viewportSize: `${window.innerWidth}x${window.innerHeight}`
        };
        
        try {
          const existingMetrics = JSON.parse(localStorage.getItem('dashboard_performance_metrics') || '[]');
          existingMetrics.push(metrics);
          // 只保留最近10次的记录
          const recentMetrics = existingMetrics.slice(-10);
          localStorage.setItem('dashboard_performance_metrics', JSON.stringify(recentMetrics));
        } catch (error) {
          console.warn('Failed to save performance metrics:', error);
        }
      }
    };

    // 当组件完全加载后测量性能
    if (!loading) {
      measurePerformance();
    }
  }, [loading]);

  const handleChecklistItemUpdate = React.useCallback(async (itemId: string, updates: any) => {
    if (!hasValidSession()) {
      console.error('No valid session for checklist update');
      return;
    }

    try {
      const response = await api.put(`/make-server-54a8f580/user/checklist/${itemId}`, updates);
      setChecklist(response.checklist);
      
      // 更新缓存
      const cacheKey = `checklist_${user?.userId}`;
      setCachedData(cacheKey, response.checklist);
      
      // Refresh user data to get updated stats
      await refreshUser();
      
    } catch (error) {
      console.error('Error updating checklist item:', error);
    }
  }, [hasValidSession, api, user?.userId, refreshUser]);

  const calculateProgress = React.useCallback(() => {
    const totalItems = checklist.reduce((sum, category) => sum + category.items.length, 0);
    const completedItems = checklist.reduce(
      (sum, category) => sum + category.items.filter((item: any) => item.completed).length, 
      0
    );
    return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  }, [checklist]);

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
          <React.Suspense fallback={
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="animate-pulse">
                <div className="h-6 bg-muted rounded mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            </div>
          }>
            <VisaCategorySelector language={language} />
          </React.Suspense>

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
          <React.Suspense fallback={
            <div className="text-center py-8">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Loading tools...</p>
            </div>
          }>
            <EB1AToolsSuite language={language} onShowUploads={onShowUploads} />
          </React.Suspense>
        )}

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
});

export { Dashboard };