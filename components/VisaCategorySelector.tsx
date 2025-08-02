"use client";
import React from 'react';
import { 
  DocumentTextIcon, 
  PencilIcon, 
  CheckIcon, 
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';

import { visaCategories, categoryGroups, VisaCategory, CategoryGroup } from '@/utils/visaCategories';
// import { getCurrentUser } from "@/lib/session";
import {getCurrentUser} from "@/lib/session_mock";
import type { AppUser } from '@/lib/session_mock';

interface VisaCategorySelectorProps {
  language: 'en' | 'zh';
}

export function VisaCategorySelector({ language }: VisaCategorySelectorProps) {
  // const { user, refreshUser } = useAuth();
  const [user, setUser] = React.useState<AppUser | null>(null);

  const [isEditing, setIsEditing] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState(user?.visaCategory || '');
  const [expandedGroups, setExpandedGroups] = React.useState<{ [key: string]: boolean }>({
    family: true,
    employment: false,
    investment: false,
    special: false
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const getText = (en: string, zh: string) => language === 'zh' ? zh : en;


  // fetch once on mount
  React.useEffect(() => {
    (async () => {
      const u = await getCurrentUser();
      setUser(u);
      setSelectedCategory(u?.visaCategory ?? '');   // pre-fill once we have the user
    })();
  }, []);

  // helper now safe: user may still be null first render
  const currentCategory = React.useMemo(
    () => visaCategories.find(c => c.value === (user?.visaCategory ?? selectedCategory)),
    [user?.visaCategory, selectedCategory]
  );

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const handleSave = async () => {
    if (!selectedCategory) {
      setError(getText('Please select a visa category', '请选择签证类别'));
      return;
    }

    // if (selectedCategory === user?.visaCategory) {
    //   setIsEditing(false);
    //   return;
    // }

    try {
      setLoading(true);
      setError('');

      // Update user profile
      // await api.put('/make-server-54a8f580/user/profile', {
      //   visaCategory: selectedCategory
      // });

      // Add timeline event for visa category change
      const selectedCategoryObj = visaCategories.find(cat => cat.value === selectedCategory);
      // if (selectedCategoryObj) {
      //   await api.post('/make-server-54a8f580/user/timeline', {
      //     title: getText('Visa Category Updated', '签证类别已更新'),
      //     title_zh: '签证类别已更新',
      //     description: getText(
      //       `Changed to ${selectedCategoryObj.label} - ${selectedCategoryObj.subtitle}`,
      //       `更改为 ${selectedCategoryObj.label} - ${selectedCategoryObj.subtitle_zh}`
      //     ),
      //     description_zh: `更改为 ${selectedCategoryObj.label} - ${selectedCategoryObj.subtitle_zh}`,
      //     type: 'category_updated'
      //   });
      // }
      //
      // await refreshUser();
      setIsEditing(false);

    } catch (error: any) {
      console.error('Error updating visa category:', error);
      setError(error.message || getText('Failed to update visa category', '更新签证类别失败'));
    } finally {
      setLoading(false);
    }
  };

  // const handleCancel = () => {
  //   setSelectedCategory(user?.visaCategory || '');
  //   setIsEditing(false);
  //   setError('');
  // };

  // Update selected category when user data changes
  // React.useEffect(() => {
  //   setSelectedCategory(user?.visaCategory || '');
  // }, [user?.visaCategory]);

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
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2">
          <DocumentTextIcon className="size-5 text-primary" />
          {getText('Visa Category', '签证类别')}
        </h3>
        
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label={getText('Edit visa category', '编辑签证类别')}
          >
            <PencilIcon className="size-4" />
            {getText('Edit', '编辑')}
          </button>
        )}
      </div>

      {error && (
        <div className="bg-error/10 border-error/20 mb-4 rounded-lg border p-3">
          <p className="text-error text-sm">{error}</p>
        </div>
      )}

      {!isEditing ? (
        // Display Mode
        <div>
          {currentCategory ? (
            <div className="rounded-lg border border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      <DocumentTextIcon className="size-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <h4 className="font-medium text-primary">{currentCategory.label}</h4>
                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${getComplexityColor(currentCategory.complexity as string)}`}>
                          {getComplexityText(currentCategory.complexity as string)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {language === 'zh' ? currentCategory.subtitle_zh : currentCategory.subtitle}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                        {currentCategory.estimatedTime}
                      </div>
                    </div>
                  </div>
                  <p className="ml-13 text-sm text-muted-foreground">
                    {language === 'zh' ? currentCategory.description_zh : currentCategory.description}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-muted-foreground">
              <DocumentTextIcon className="mx-auto mb-2 size-8 opacity-50" />
              <p className="mb-3 text-sm">
                {getText('No visa category selected', '未选择签证类别')}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                {getText('Select Category', '选择类别')}
              </button>
            </div>
          )}
        </div>
      ) : (
        // Edit Mode
        <div className="space-y-4">
          <p className="mb-4 text-sm text-muted-foreground">
            {getText(
              'Select the type of green card application that matches your situation:',
              '选择符合您情况的绿卡申请类型：'
            )}
          </p>
          
          <div className="space-y-4">
            {categoryGroups.map((group) => {
              const groupCategories = visaCategories.filter(cat => cat.category === group.id);
              const isExpanded = expandedGroups[group.id];
              
              return (
                <div key={group.id} className="overflow-hidden rounded-lg border border-border">
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className="flex w-full items-center justify-between bg-secondary/50 px-4 py-3 transition-colors hover:bg-secondary"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{group.icon}</span>
                      <div className="text-left">
                        <h4 className="font-medium">
                          {language === 'zh' ? group.name_zh : group.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {language === 'zh' ? group.description_zh : group.description}
                        </p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUpIcon className="size-5 text-muted-foreground" />
                    ) : (
                      <ChevronDownIcon className="size-5 text-muted-foreground" />
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div className="space-y-3 bg-background p-4">
                      {groupCategories.map((category) => (
                        <label
                          key={category.value}
                          className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-all hover:shadow-sm ${
                            selectedCategory === category.value
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/30'
                          }`}
                        >
                          <input
                            type="radio"
                            name="visaCategory"
                            value={category.value}
                            checked={selectedCategory === category.value}
                            onChange={(e) => {
                              setSelectedCategory(e.target.value);
                              setError('');
                            }}
                            className="mt-1 size-4 border-border text-primary focus:ring-primary"
                          />
                          
                          <div className="min-w-0 flex-1">
                            <div className="mb-1 flex flex-wrap items-center gap-2">
                              <span className="font-medium">{category.label}</span>
                              <span className="text-sm text-muted-foreground">•</span>
                              <span className="text-sm text-muted-foreground">
                                {language === 'zh' ? category.subtitle_zh : category.subtitle}
                              </span>
                              <span className={`rounded-full px-2 py-1 text-xs font-medium ${getComplexityColor(category.complexity as string)}`}>
                                {getComplexityText(category.complexity as string)}
                              </span>
                              <span className="ml-auto rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                {category.estimatedTime}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {language === 'zh' ? category.description_zh : category.description}
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

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={loading || !selectedCategory}
              className="hover-scale flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:bg-primary/50"
            >
              {loading ? (
                <div className="size-4 animate-spin rounded-full border border-primary-foreground border-t-transparent" />
              ) : (
                <CheckIcon className="size-4" />
              )}
              {getText('Save Changes', '保存更改')}
            </button>
            
            <button
              // onClick={handleCancel}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-secondary"
            >
              <XMarkIcon className="size-4" />
              {getText('Cancel', '取消')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}