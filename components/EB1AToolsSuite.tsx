import React, { useState } from 'react';
import {
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  WrenchScrewdriverIcon,
  DocumentDuplicateIcon,
  SparklesIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { EB1ACoverLetterSection } from './EB1ACoverLetterSection';
import { EB1AApplicationChecklist } from './EB1AApplicationChecklist';
import { EB1AOptimizedWorkflow } from './EB1AOptimizedWorkflow';
import { EB1AMockMaterialsGenerator } from './EB1AMockMaterialsGenerator';
import { EB1ARecommendationLetterGenerator } from './EB1ARecommendationLetterGenerator';

interface EB1AToolsSuiteProps {
  language: 'en' | 'zh';
  onShowUploads: () => void;
}

interface Tab {
  id: string;
  name: string;
  name_zh: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  description_zh: string;
}

export function EB1AToolsSuite({ language, onShowUploads }: EB1AToolsSuiteProps) {
  const [activeTab, setActiveTab] = useState('workflow');

  const getText = (en: string, zh: string) => language === 'zh' ? zh : en;

  const tabs: Tab[] = [
    {
      id: 'workflow',
      name: 'Optimized Workflow',
      name_zh: '优化工作流程',
      icon: WrenchScrewdriverIcon,
      description: 'Step-by-step guide based on successful petitions',
      description_zh: '基于成功申请的分步指南'
    },
    {
      id: 'checklist',
      name: 'Application Checklist',
      name_zh: '申请清单',
      icon: ClipboardDocumentListIcon,
      description: 'Comprehensive checklist for all required materials',
      description_zh: '所有必需材料的综合清单'
    },
    {
      id: 'cover-letter',
      name: 'Cover Letter Generator',
      name_zh: '申请信生成器',
      icon: DocumentTextIcon,
      description: 'AI-powered petition letter writing assistant',
      description_zh: 'AI驱动的申请书写作助手'
    },
    {
      id: 'recommendation-letter',
      name: 'Recommendation Letter',
      name_zh: '推荐信生成器',
      icon: UserGroupIcon,
      description: 'Generate professional recommendation letters',
      description_zh: '生成专业推荐信'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'workflow':
        return <EB1AOptimizedWorkflow language={language} />;
      case 'checklist':
        return <EB1AApplicationChecklist language={language} onShowUploads={onShowUploads} />;
      case 'cover-letter':
        return <EB1ACoverLetterSection language={language} onShowUploads={onShowUploads} />;
      case 'recommendation-letter':
        return <EB1ARecommendationLetterGenerator language={language} onShowUploads={onShowUploads} />;
      default:
        return <EB1AOptimizedWorkflow language={language} />;
    }
  };

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <SparklesIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {getText('EB1A Application Suite', 'EB1A申请套件')}
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {getText(
            'Comprehensive tools and guidance for preparing your EB1A extraordinary ability petition',
            '准备EB1A杰出人才申请的综合工具和指导'
          )}
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group inline-flex items-center py-4 px-6 border-b-2 font-medium text-sm transition-colors ${
                    isActive
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <Icon 
                    className={`-ml-0.5 mr-2 h-5 w-5 ${
                      isActive 
                        ? 'text-blue-500 dark:text-blue-400' 
                        : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                    }`}
                  />
                  <div className="text-left">
                    <div>{getText(tab.name, tab.name_zh)}</div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 font-normal hidden sm:block">
                      {getText(tab.description, tab.description_zh)}
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <WrenchScrewdriverIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                {getText('Optimized Process', '优化流程')}
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                {getText('Based on successful cases', '基于成功案例')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ClipboardDocumentListIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-900 dark:text-green-100">
                {getText('Complete Checklist', '完整清单')}
              </p>
              <p className="text-xs text-green-700 dark:text-green-300">
                {getText('All 10 criteria covered', '涵盖所有10项标准')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DocumentTextIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-purple-900 dark:text-purple-100">
                {getText('AI-Powered Writing', 'AI驱动写作')}
              </p>
              <p className="text-xs text-purple-700 dark:text-purple-300">
                {getText('Smart petition drafting', '智能申请书起草')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserGroupIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-indigo-900 dark:text-indigo-100">
                {getText('Recommendation Letters', '推荐信')}
              </p>
              <p className="text-xs text-indigo-700 dark:text-indigo-300">
                {getText('Professional references', '专业推荐')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mock Materials Section */}
      <div className="mt-8">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <DocumentDuplicateIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {getText('Mock Materials & Templates', '模拟材料和模板')}
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {getText(
              'Download professional templates and sample documents for your EB1A petition',
              '下载EB1A申请所需的专业模板和示例文档'
            )}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <EB1AMockMaterialsGenerator language={language} />
        </div>
      </div>
    </div>
  );
}