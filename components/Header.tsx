'use client';

import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { ChevronDownIcon, Bars3Icon, XMarkIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: any) => void;
  language: 'en' | 'zh';
  onLanguageChange: (lang: 'en' | 'zh') => void;
  onAuthAction: (action: 'signin' | 'signup') => void;
}

export function Header({ currentPage, onNavigate, language, onLanguageChange, onAuthAction }: HeaderProps) {
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  const getText = (en: string, zh: string) => language === 'zh' ? zh : en;

  const navigation = [
    { name: getText('Home', '首页'), href: 'home' },
    { name: getText('How It Works', '工作原理'), href: 'how-it-works' },
    { name: getText('Pricing', '价格'), href: 'pricing' },
  ];

  const userNavigation = user ? [
    { name: getText('Dashboard', '仪表板'), href: 'dashboard' },
    { name: getText('Document Builder', '文档构建器'), href: 'doc-builder' },
    { name: getText('RFE Report', 'RFE报告'), href: 'rfe-report' },
    { name: getText('Settings', '设置'), href: 'settings' },
  ] : [];

  const handleSignOut = () => {
    signOut();
    setUserMenuOpen(false);
    onNavigate('home');
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <button onClick={() => onNavigate('home')} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-bold">VM</span>
              </div>
              <span className="text-xl font-bold text-foreground">VisaMate</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => onNavigate(item.href)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Right side controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                aria-expanded={languageMenuOpen}
              >
                <GlobeAltIcon className="w-4 h-4" />
                <span>{language === 'zh' ? '中文' : 'English'}</span>
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              
              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-card border border-border rounded-md shadow-lg py-1 z-10">
                  <button
                    onClick={() => {
                      onLanguageChange('en');
                      setLanguageMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                      language === 'en' ? 'text-primary font-medium' : 'text-foreground'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      onLanguageChange('zh');
                      setLanguageMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                      language === 'zh' ? 'text-primary font-medium' : 'text-foreground'
                    }`}
                  >
                    中文
                  </button>
                </div>
              )}
            </div>

            {user ? (
              /* User Menu */
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  aria-expanded={userMenuOpen}
                >
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                    {user.firstName?.charAt(0) || 'U'}
                  </div>
                  <span className="hidden lg:inline">{user.firstName}</span>
                  <ChevronDownIcon className="w-4 h-4" />
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-md shadow-lg py-1 z-10">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-sm font-medium text-foreground">{user.firstName} {user.lastName}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    {userNavigation.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          onNavigate(item.href);
                          setUserMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        {item.name}
                      </button>
                    ))}
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      {getText('Sign Out', '退出登录')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Auth Buttons */
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onAuthAction('signin')}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {getText('Sign In', '登录')}
                </button>
                <button
                  onClick={() => onAuthAction('signup')}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  {getText('Get Started', '开始使用')}
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    onNavigate(item.href);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors ${
                    currentPage === item.href
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              
              {user ? (
                <>
                  <div className="border-t border-border mt-2 pt-2">
                    <div className="px-3 py-2">
                      <p className="text-base font-medium text-foreground">{user.firstName} {user.lastName}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    {userNavigation.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          onNavigate(item.href);
                          setMobileMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      >
                        {item.name}
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        handleSignOut();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      {getText('Sign Out', '退出登录')}
                    </button>
                  </div>
                </>
              ) : (
                <div className="border-t border-border mt-2 pt-2 space-y-1">
                  <button
                    onClick={() => {
                      onAuthAction('signin');
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    {getText('Sign In', '登录')}
                  </button>
                  <button
                    onClick={() => {
                      onAuthAction('signup');
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium bg-primary text-primary-foreground rounded-md transition-colors"
                  >
                    {getText('Get Started', '开始使用')}
                  </button>
                </div>
              )}
              
              {/* Language selector for mobile */}
              <div className="border-t border-border mt-2 pt-2">
                <button
                  onClick={() => onLanguageChange(language === 'en' ? 'zh' : 'en')}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  {language === 'zh' ? 'Switch to English' : '切换到中文'}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}