import React from 'react';
import { 
  DocumentTextIcon, 
  PencilIcon, 
  CheckIcon, 
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';
import { useAuth, useApi } from './AuthContext';
import { visaCategories, categoryGroups, VisaCategory, CategoryGroup } from '../utils/supabase/visaCategories';

interface VisaCategorySelectorProps {
  language: 'en' | 'zh';
}

export function VisaCategorySelector({ language }: VisaCategorySelectorProps) {
  const { user, refreshUser } = useAuth();
  const api = useApi();
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

  const getCurrentCategory = (): VisaCategory | undefined => {
    return visaCategories.find(cat => cat.value === (user?.visaCategory || selectedCategory));
  };

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

    if (selectedCategory === user?.visaCategory) {
      setIsEditing(false);
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Update user profile
      await api.put('/make-server-54a8f580/user/profile', {
        visaCategory: selectedCategory
      });

      // Add timeline event for visa category change
      const selectedCategoryObj = visaCategories.find(cat => cat.value === selectedCategory);
      if (selectedCategoryObj) {
        await api.post('/make-server-54a8f580/user/timeline', {
          title: getText('Visa Category Updated', '签证类别已更新'),
          title_zh: '签证类别已更新',
          description: getText(
            `Changed to ${selectedCategoryObj.label} - ${selectedCategoryObj.subtitle}`,
            `更改为 ${selectedCategoryObj.label} - ${selectedCategoryObj.subtitle_zh}`
          ),
          description_zh: `更改为 ${selectedCategoryObj.label} - ${selectedCategoryObj.subtitle_zh}`,
          type: 'category_updated'
        });
      }

      await refreshUser();
      setIsEditing(false);

    } catch (error: any) {
      console.error('Error updating visa category:', error);
      setError(error.message || getText('Failed to update visa category', '更新签证类别失败'));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setSelectedCategory(user?.visaCategory || '');
    setIsEditing(false);
    setError('');
  };

  // Update selected category when user data changes
  React.useEffect(() => {
    setSelectedCategory(user?.visaCategory || '');
  }, [user?.visaCategory]);

  const currentCategory = getCurrentCategory();

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
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2">
          <DocumentTextIcon className="w-5 h-5 text-primary" />
          {getText('Visa Category', '签证类别')}
        </h3>
        
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-secondary"
            aria-label={getText('Edit visa category', '编辑签证类别')}
          >
            <PencilIcon className="w-4 h-4" />
            {getText('Edit', '编辑')}
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-lg">
          <p className="text-error text-sm">{error}</p>
        </div>
      )}

      {!isEditing ? (
        // Display Mode
        <div>
          {currentCategory ? (
            <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <DocumentTextIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-primary">{currentCategory.label}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getComplexityColor(currentCategory.complexity as string)}`}>
                          {getComplexityText(currentCategory.complexity as string)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {language === 'zh' ? currentCategory.subtitle_zh : currentCategory.subtitle}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {currentCategory.estimatedTime}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground ml-13">
                    {language === 'zh' ? currentCategory.description_zh : currentCategory.description}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-6 text-muted-foreground">
              <DocumentTextIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm mb-3">
                {getText('No visa category selected', '未选择签证类别')}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
              >
                {getText('Select Category', '选择类别')}
              </button>
            </div>
          )}
        </div>
      ) : (
        // Edit Mode
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
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
                <div key={group.id} className="border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className="w-full px-4 py-3 bg-secondary/50 hover:bg-secondary transition-colors flex items-center justify-between"
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
                      <ChevronUpIcon className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div className="p-4 space-y-3 bg-background">
                      {groupCategories.map((category) => (
                        <label
                          key={category.value}
                          className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all hover:shadow-sm ${
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
                            className="mt-1 w-4 h-4 text-primary focus:ring-primary border-border"
                          />
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="font-medium">{category.label}</span>
                              <span className="text-sm text-muted-foreground">•</span>
                              <span className="text-sm text-muted-foreground">
                                {language === 'zh' ? category.subtitle_zh : category.subtitle}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getComplexityColor(category.complexity as string)}`}>
                                {getComplexityText(category.complexity as string)}
                              </span>
                              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium ml-auto">
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
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-all hover-scale"
            >
              {loading ? (
                <div className="animate-spin w-4 h-4 border border-primary-foreground border-t-transparent rounded-full" />
              ) : (
                <CheckIcon className="w-4 h-4" />
              )}
              {getText('Save Changes', '保存更改')}
            </button>
            
            <button
              onClick={handleCancel}
              disabled={loading}
              className="flex items-center gap-2 border border-border hover:bg-secondary text-foreground px-4 py-2 rounded-lg text-sm font-medium transition-all"
            >
              <XMarkIcon className="w-4 h-4" />
              {getText('Cancel', '取消')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}