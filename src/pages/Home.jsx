import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Plane, CheckCircle, Users, Globe, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // SEO: Update document title and meta description
  useEffect(() => {
    document.title = 'مدقق الأمتعة | فحص سياسات أمتعة أكثر من 100 شركة طيران';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'مدقق الأمتعة - أداة مجانية شاملة للتحقق من سياسات أمتعة أكثر من 100 شركة طيران عالمية. احسب نتيجة حقيبة اليد واحصل على توصيات ذكية قبل السفر.');
    }
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/baggage-checker?airline=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/baggage-checker');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const features = [
    {
      icon: Search,
      title: 'بحث سريع',
      description: 'ابحث عن أي شركة طيران واحصل على معلومات الأمتعة فوراً'
    },
    {
      icon: CheckCircle,
      title: 'معلومات دقيقة',
      description: 'بيانات محدثة ودقيقة لسياسات الأمتعة لجميع شركات الطيران'
    },
    {
      icon: Users,
      title: 'سهل الاستخدام',
      description: 'واجهة بسيطة وسهلة الاستخدام باللغة العربية'
    },
    {
      icon: Globe,
      title: 'شركات عالمية',
      description: 'يغطي جميع شركات الطيران المحلية والعالمية'
    }
  ];

  const popularAirlines = [
    'الخطوط السعودية',
    'طيران الإمارات',
    'طيران ناس',
    'الخطوط التركية',
    'الاتحاد للطيران'
  ];

  return (
    <main className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32" itemScope itemType="https://schema.org/WebApplication">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-sky-500/5 to-blue-400/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center slide-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-sky-500 rounded-3xl shadow-2xl mb-8 floating-animation">
              <Plane className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black gradient-text mb-6 leading-tight" itemProp="name">
              مدقق الأمتعة
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed" itemProp="description">
              تحقق من سياسات الأمتعة لأكثر من 100 شركة طيران عالمية في ثوانٍ معدودة. احسب نتيجة حقيبة اليد واحصل على توصيات ذكية.
            </p>
            
            <div className="max-w-2xl mx-auto mb-12">
              <div className="glass-effect rounded-2xl p-2 shadow-xl hover-lift">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="ابحث عن شركة الطيران (مثال: الطيران السعودي، Emirates، Turkish Airlines)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pr-12 pl-6 h-14 text-lg border-0 bg-transparent focus:ring-0 placeholder:text-gray-500"
                    />
                  </div>
                  <Button 
                    size="lg" 
                    onClick={handleSearch}
                    className="w-full sm:w-auto h-14 px-8 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-bold rounded-xl shadow-lg hover-lift"
                  >
                    تحقق الآن
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Popular Airlines */}
            <div className="mb-16">
              <h2 className="text-gray-600 mb-4 text-lg font-semibold">شركات الطيران الأكثر بحثاً:</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {popularAirlines.map((airline, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(airline);
                      navigate(`/baggage-checker?airline=${encodeURIComponent(airline)}`);
                    }}
                    className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all duration-200 hover-lift"
                  >
                    {airline}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white" itemScope itemType="https://schema.org/ItemList">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" itemProp="name">
              لماذا تختار مدقق الأمتعة؟
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" itemProp="description">
              الأداة الأكثر شمولية ودقة للتحقق من سياسات أمتعة الطيران. يغطي أكثر من 100 شركة طيران عالمية مع نظام تقييم ذكي.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center p-6 hover-lift" itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
                  <CardContent className="p-0">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-sky-100 rounded-2xl mb-6">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed" itemProp="description">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-sky-600" itemScope itemType="https://schema.org/Action">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" itemProp="name">
              ابدأ التحقق من أمتعتك الآن
            </h2>
            <p className="text-xl text-blue-100 mb-8" itemProp="description">
              تجنب المفاجآت في المطار واستمتع برحلة مريحة. فحص مجاني وسريع لسياسات الأمتعة.
            </p>
            <Link to="/baggage-checker">
              <Button 
                size="xl"
                className="bg-white text-blue-600 hover:bg-gray-100 font-bold shadow-xl hover-lift"
              >
                <span className="ml-2">ابدأ الآن</span>
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* SEO: Additional structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "كيف يعمل مدقق الأمتعة؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "ابحث عن شركة الطيران، أدخل أبعاد ووزن حقيبة اليد، واحصل على نتيجة رقمية مع توصيات ذكية حول سياسات الأمتعة."
              }
            },
            {
              "@type": "Question",
              "name": "كم عدد شركات الطيران المدعومة؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "يدعم مدقق الأمتعة أكثر من 100 شركة طيران عالمية ومحلية بما في ذلك الخطوط السعودية وطيران الإمارات وطيران ناس."
              }
            },
            {
              "@type": "Question",
              "name": "هل الخدمة مجانية؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "نعم، مدقق الأمتعة خدمة مجانية بالكامل للتحقق من سياسات أمتعة جميع شركات الطيران."
              }
            }
          ]
        })
      }} />
    </main>
  );
};

export default Home;