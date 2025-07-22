'use client';

import React from 'react';

interface FooterProps {
  language?: 'en' | 'zh';
}

export function Footer({ language = 'en' }: FooterProps) {
  const getText = (en: string, zh: string) => language === 'zh' ? zh : en;

  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: getText('Product', '产品'),
      links: [
        { name: getText('How It Works', '工作原理'), href: '#' },
        { name: getText('Pricing', '价格'), href: '#' },
        { name: getText('Features', '功能特色'), href: '#' },
      ]
    },
    {
      title: getText('Support', '支持'),
      links: [
        { name: getText('Documentation', '文档'), href: '#' },
        { name: getText('Help Center', '帮助中心'), href: '#' },
        { name: getText('Contact Us', '联系我们'), href: '#' },
      ]
    },
    {
      title: getText('Legal', '法律'),
      links: [
        { name: getText('Privacy Policy', '隐私政策'), href: '#' },
        { name: getText('Terms of Service', '服务条款'), href: '#' },
        { name: getText('Disclaimer', '免责声明'), href: '#' },
      ]
    }
  ];

  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-bold">VM</span>
              </div>
              <span className="text-xl font-bold text-foreground">VisaMate</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4" data-lang-cn="智能签证文档助手，让您的绿卡申请更轻松、更准确。">
              Intelligent visa document assistant making your green card application easier and more accurate.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Footer sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground" data-lang-cn={`© ${currentYear} VisaMate. 版权所有。`}>
              © {currentYear} VisaMate. All rights reserved.
            </p>
            
            {/* Legal disclaimer */}
            <div className="mt-4 md:mt-0 text-center md:text-right">
              <p className="text-xs text-muted-foreground max-w-md" data-lang-cn="VisaMate仅提供信息服务，不提供法律建议。如需法律建议，请咨询持证律师。">
                VisaMate provides informational services only and does not provide legal advice. 
                Consult with a licensed attorney for legal advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}