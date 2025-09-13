import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plane, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Layout = ({ children }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = 'ar';
    document.title = 'مدقق الأمتعة | تحقق من سياسات أمتعة الطيران';

    // Remove old meta tags to prevent duplicates on navigation
    document.querySelector('meta[name="description"]')?.remove();
    document.querySelector('meta[name="keywords"]')?.remove();

    const description = document.createElement('meta');
    description.name = 'description';
    description.content = 'مدقق الأمتعة هو أداة مجانية للتحقق من سياسات أبعاد ووزن الحقائب المحمولة والمسجلة لجميع شركات الطيران. سافر بثقة وتجنب الرسوم الإضافية في المطار.';
    document.head.appendChild(description);

    const keywords = document.createElement('meta');
    keywords.name = 'keywords';
    keywords.content = 'مدقق الأمتعة, سياسات الطيران, حجم الحقيبة, وزن الحقيبة, أمتعة الطائرة, حقيبة يد, أمتعة مسجلة, الخطوط السعودية, طيران الإمارات, طيران ناس, فحص الامتعة, سياسة الحقائب';
    document.head.appendChild(keywords);

    // Cleanup function
    return () => {
      description.remove();
      keywords.remove();
    };
  }, [location]);

  const navigation = [
    { name: 'الرئيسية', href: '/', icon: Plane },
    { name: 'مدقق الأمتعة', href: '/baggage-checker', icon: Search },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-sky-600 rounded-lg flex items-center justify-center">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">مدقق الأمتعة</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 space-x-reverse">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 space-x-reverse px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                        isActive
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 space-x-reverse mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-sky-600 rounded-lg flex items-center justify-center">
                <Plane className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">مدقق الأمتعة</span>
            </div>
            <p className="text-gray-600 mb-4">
              أداة مجانية للتحقق من سياسات أمتعة جميع شركات الطيران
            </p>
            <p className="text-sm text-gray-500">
              © 2024 مدقق الأمتعة. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;