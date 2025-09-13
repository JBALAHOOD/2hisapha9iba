import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Plane, Package, Weight, Ruler, Info, CheckCircle, AlertCircle } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { searchAirlines, getAirlineById } from '../utils';

const BaggageChecker = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedAirline, setSelectedAirline] = useState(null);
  const [baggageDimensions, setBaggageDimensions] = useState({
    length: '',
    width: '',
    height: '',
    weight: ''
  });
  const [baggageScore, setBaggageScore] = useState(null);
  const [showScore, setShowScore] = useState(false);
  
  // Checked baggage dimensions state
  const [checkedBaggageDimensions, setCheckedBaggageDimensions] = useState({
    length: '',
    width: '',
    height: '',
    weight: ''
  });
  const [checkedBaggageResult, setCheckedBaggageResult] = useState(null);
  const [showCheckedResult, setShowCheckedResult] = useState(false);

  useEffect(() => {
    const airlineParam = searchParams.get('airline');
    if (airlineParam) {
      setSearchQuery(airlineParam);
      handleSearch(airlineParam);
    }

    // SEO: Update page title and meta description
    document.title = 'مدقق الأمتعة | فحص سياسات أمتعة أكثر من 100 شركة طيران';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'أداة مجانية شاملة للتحقق من سياسات أمتعة شركات الطيران. احسب نتيجة حقيبة اليد واحصل على توصيات ذكية قبل السفر.');
    }
  }, [searchParams]);

  const handleSearch = (query = searchQuery) => {
    if (!query.trim()) return;
    
    const results = searchAirlines(query);
    setSearchResults(results);
    setShowResults(true);
    setSelectedAirline(null);
    setBaggageScore(null);
    setShowScore(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleAirlineSelect = (airline) => {
    setSelectedAirline(airline);
    setShowResults(false);
    setBaggageScore(null);
    setShowScore(false);
  };

  const handleDimensionChange = (field, value) => {
    setBaggageDimensions(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckedDimensionChange = (field, value) => {
    setCheckedBaggageDimensions(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateBaggageScore = () => {
    if (!selectedAirline || !baggageDimensions.length || !baggageDimensions.width || !baggageDimensions.height || !baggageDimensions.weight) {
      return;
    }

    const { length, width, height, weight } = baggageDimensions;
    const dimensions = [parseFloat(length), parseFloat(width), parseFloat(height)];
    const totalWeight = parseFloat(weight);

    const carryOnLimits = selectedAirline.carryOnDimensions.split('×').map(d => parseFloat(d.trim()));
    const carryOnWeight = parseFloat(selectedAirline.carryOnWeight);
    
    const checkedLimits = selectedAirline.checkedDimensions.split('×').map(d => parseFloat(d.trim().replace(/[^0-9.]/g, '')));
    const checkedWeight = parseFloat(selectedAirline.checkedWeight);

    let score = 100;
    let category = '';
    let status = '';
    let recommendations = [];

    const carryOnFits = dimensions.every((dim, index) => dim <= carryOnLimits[index]) && totalWeight <= carryOnWeight;
    
    if (carryOnFits) {
      category = 'حقيبة يد';
      status = 'مقبولة';
      score = 95;
      recommendations.push('حقيبة اليد مناسبة كحقيبة يد');
    } else {
      const checkedFits = dimensions.every((dim, index) => dim <= (checkedLimits[index] || 200)) && totalWeight <= checkedWeight;
      
      if (checkedFits) {
        category = 'أمتعة مسجلة';
        status = 'مقبولة';
        score = 85;
        recommendations.push('حقيبة اليد تحتاج إلى تسجيل كحقائب شحن');
      } else {
        category = 'غير مقبولة';
        status = 'مرفوضة';
        score = 30;
        
        const weightExcess = Math.max(0, totalWeight - checkedWeight);
        const dimensionExcess = dimensions.map((dim, index) => Math.max(0, dim - (checkedLimits[index] || 200)));
        
        if (weightExcess > 0) {
          recommendations.push(`الوزن الزائد: ${weightExcess.toFixed(1)} كجم`);
          score -= Math.min(30, weightExcess * 2);
        }
        
        if (dimensionExcess.some(excess => excess > 0)) {
          recommendations.push('الأبعاد تتجاوز الحد المسموح');
          score -= 20;
        }
      }
    }

    setBaggageScore({
      score: Math.max(0, Math.round(score)),
      category,
      status,
      recommendations,
      details: {
        inputDimensions: `${length}×${width}×${height} سم`,
        inputWeight: `${weight} كجم`,
        carryOnLimits: selectedAirline.carryOnDimensions + ' سم',
        carryOnWeight: selectedAirline.carryOnWeight + ' كجم',
        checkedLimits: selectedAirline.checkedDimensions,
        checkedWeight: selectedAirline.checkedWeight + ' كجم'
      }
    });
    setShowScore(true);
  };

  const calculateCheckedBaggageScore = () => {
    if (!checkedBaggageDimensions.length || !checkedBaggageDimensions.width || !checkedBaggageDimensions.height || !checkedBaggageDimensions.weight) {
      return;
    }

    const { length, width, height, weight } = checkedBaggageDimensions;
    const dimensions = [parseFloat(length), parseFloat(width), parseFloat(height)];
    const totalWeight = parseFloat(weight);
    const dimensionsSum = dimensions.reduce((sum, dim) => sum + dim, 0);

    // Standard limits for checked baggage
    const maxDimensionsSum = 158; // cm
    const maxWeight = 23; // kg

    let status = '';
    let message = '';
    let warnings = [];
    let isAcceptable = true;

    // Check dimensions sum
    if (dimensionsSum > maxDimensionsSum) {
      const excess = dimensionsSum - maxDimensionsSum;
      isAcceptable = false;
      warnings.push(`تجاوزت الأبعاد بـ ${excess.toFixed(1)} سم`);
    }

    // Check weight
    if (totalWeight > maxWeight) {
      const excess = totalWeight - maxWeight;
      isAcceptable = false;
      warnings.push(`تجاوزت الوزن بـ ${excess.toFixed(1)} كجم – قد يتم فرض رسوم إضافية`);
    }

    if (isAcceptable) {
      status = 'مقبولة';
      message = 'مقبولة كأمتعة مسجّلة';
    } else {
      status = 'مرفوضة';
      message = warnings.join(' و ');
    }

    setCheckedBaggageResult({
      status,
      message,
      warnings,
      isAcceptable,
      details: {
        inputDimensions: `${length}×${width}×${height} سم`,
        dimensionsSum: `${dimensionsSum.toFixed(1)} سم`,
        inputWeight: `${weight} كجم`,
        maxDimensionsSum: `${maxDimensionsSum} سم`,
        maxWeight: `${maxWeight} كجم`
      }
    });
    setShowCheckedResult(true);
  };

  const BaggageInfoCard = ({ title, icon: Icon, children }) => (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3 space-x-reverse text-lg">
          <Icon className="w-6 h-6 text-blue-600" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );

  const InfoItem = ({ label, value, icon: Icon }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center space-x-3 space-x-reverse">
        {Icon && <Icon className="w-4 h-4 text-gray-500" />}
        <span className="text-gray-600">{label}</span>
      </div>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );

  return (
    <div className="min-h-screen py-8" itemScope itemType="https://schema.org/WebApplication">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12 slide-in" role="banner">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-sky-500 rounded-2xl shadow-lg mb-6 floating-animation">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4" itemProp="name">
            مدقق الأمتعة
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" itemProp="description">
            ابحث عن شركة الطيران للحصول على معلومات مفصلة حول سياسات الأمتعة
          </p>
        </header>

        <section className="max-w-2xl mx-auto mb-12" aria-labelledby="search-heading">
          <h2 id="search-heading" className="sr-only">البحث عن شركة الطيران</h2>
          <div className="glass-effect rounded-2xl p-4 shadow-lg">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="ابحث عن شركة الطيران (مثال: الطيران السعودي، Emirates)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pr-12 pl-6 h-12 border-0 bg-transparent focus:ring-0"
                />
              </div>
              <Button 
                onClick={() => handleSearch()}
                disabled={!searchQuery.trim()}
                className="px-8 h-12 bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600"
              >
                <Search className="w-5 h-5 ml-2" />
                بحث
              </Button>
            </div>
          </div>
        </section>

        {showResults && searchResults.length > 0 && (
          <section className="max-w-4xl mx-auto mb-12" aria-labelledby="results-heading">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center" id="results-heading">
              نتائج البحث ({searchResults.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((airline) => (
                <Card 
                  key={airline.id} 
                  hover 
                  onClick={() => handleAirlineSelect(airline)}
                  className="cursor-pointer"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 space-x-reverse mb-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-sky-100 rounded-lg flex items-center justify-center">
                        <Plane className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{airline.name}</h3>
                        <p className="text-sm text-gray-500">{airline.nameEn} ({airline.code})</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>حقيبة اليد: {airline.carryOnWeight} كجم</p>
                      <p>حقائب الشحن: {airline.checkedWeight} كجم</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {showResults && searchResults.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">لم يتم العثور على نتائج</h3>
            <p className="text-gray-600">جرب البحث بكلمات مختلفة أو تحقق من الإملاء</p>
          </div>
        )}

        {selectedAirline && (
          <section className="max-w-6xl mx-auto" itemScope itemType="https://schema.org/Airline">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-4 space-x-reverse bg-white rounded-2xl shadow-lg p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-sky-500 rounded-xl flex items-center justify-center">
                  <Plane className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <h2 className="text-2xl font-bold text-gray-900" itemProp="name">{selectedAirline.name}</h2>
                  <p className="text-gray-600" itemProp="alternateName">{selectedAirline.nameEn} (<span itemProp="iataCode">{selectedAirline.code}</span>)</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <BaggageInfoCard title="حقيبة اليد" icon={Package}>
                <div className="space-y-1">
                  <InfoItem 
                    label="الوزن المسموح" 
                    value={`${selectedAirline.carryOnWeight} كجم`}
                    icon={Weight}
                  />
                  <InfoItem 
                    label="الأبعاد المسموحة" 
                    value={`${selectedAirline.carryOnDimensions} سم`}
                    icon={Ruler}
                  />
                </div>
              </BaggageInfoCard>

              <BaggageInfoCard title="حقائب الشحن" icon={Package}>
                <div className="space-y-1">
                  <InfoItem 
                    label="الوزن المسموح" 
                    value={`${selectedAirline.checkedWeight} كجم`}
                    icon={Weight}
                  />
                  <InfoItem 
                    label="الأبعاد المسموحة" 
                    value={selectedAirline.checkedDimensions}
                    icon={Ruler}
                  />
                </div>
              </BaggageInfoCard>
            </div>

            <Card className="mb-8" itemScope itemType="https://schema.org/SoftwareApplication">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 space-x-reverse">
                  <Ruler className="w-6 h-6 text-green-600" />
                  <span itemProp="name">فحص أبعاد حقيبة اليد</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الطول (سم)</label>
                    <Input
                      type="number"
                      placeholder="مثال: 55"
                      value={baggageDimensions.length}
                      onChange={(e) => handleDimensionChange('length', e.target.value)}
                      className="text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">العرض (سم)</label>
                    <Input
                      type="number"
                      placeholder="مثال: 40"
                      value={baggageDimensions.width}
                      onChange={(e) => handleDimensionChange('width', e.target.value)}
                      className="text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الارتفاع (سم)</label>
                    <Input
                      type="number"
                      placeholder="مثال: 20"
                      value={baggageDimensions.height}
                      onChange={(e) => handleDimensionChange('height', e.target.value)}
                      className="text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الوزن (كجم)</label>
                    <Input
                      type="number"
                      placeholder="مثال: 7"
                      value={baggageDimensions.weight}
                      onChange={(e) => handleDimensionChange('weight', e.target.value)}
                      className="text-center"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <Button 
                    onClick={calculateBaggageScore}
                    disabled={!baggageDimensions.length || !baggageDimensions.width || !baggageDimensions.height || !baggageDimensions.weight}
                    className="px-8 py-3"
                  >
                    احسب النتيجة
                  </Button>
                </div>
              </CardContent>
            </Card>

            {showScore && baggageScore && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 space-x-reverse">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <span>نتيجة فحص الحقيبة</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-3xl font-bold text-white mb-4 ${
                      baggageScore.score >= 90 ? 'bg-green-500' :
                      baggageScore.score >= 70 ? 'bg-yellow-500' :
                      baggageScore.score >= 50 ? 'bg-orange-500' : 'bg-red-500'
                    }`}>
                      {baggageScore.score}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{baggageScore.category}</h3>
                    <p className={`text-lg font-semibold ${
                      baggageScore.status === 'مقبولة' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {baggageScore.status}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">أبعاد حقيبة اليد</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">الأبعاد:</span>
                          <span className="font-medium">{baggageScore.details.inputDimensions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">الوزن:</span>
                          <span className="font-medium">{baggageScore.details.inputWeight}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">حدود شركة الطيران</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">حقيبة اليد:</span>
                          <span className="font-medium">{baggageScore.details.carryOnLimits}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">وزن حقيبة اليد:</span>
                          <span className="font-medium">{baggageScore.details.carryOnWeight}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">حقائب الشحن:</span>
                          <span className="font-medium">{baggageScore.details.checkedLimits}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">وزن حقائب الشحن:</span>
                          <span className="font-medium">{baggageScore.details.checkedWeight}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {baggageScore.recommendations.length > 0 && (
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">التوصيات</h4>
                      <ul className="space-y-1">
                        {baggageScore.recommendations.map((rec, index) => (
                          <li key={index} className="text-blue-800 text-sm flex items-start space-x-2 space-x-reverse">
                            <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Checked Baggage Checker Section */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 space-x-reverse">
                  <Ruler className="w-6 h-6 text-green-600" />
                  <span>فحص أبعاد حقائب الشحن</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الطول (سم)</label>
                    <Input
                      type="number"
                      placeholder="مثال: 75"
                      value={checkedBaggageDimensions.length}
                      onChange={(e) => handleCheckedDimensionChange('length', e.target.value)}
                      className="text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">العرض (سم)</label>
                    <Input
                      type="number"
                      placeholder="مثال: 50"
                      value={checkedBaggageDimensions.width}
                      onChange={(e) => handleCheckedDimensionChange('width', e.target.value)}
                      className="text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الارتفاع (سم)</label>
                    <Input
                      type="number"
                      placeholder="مثال: 30"
                      value={checkedBaggageDimensions.height}
                      onChange={(e) => handleCheckedDimensionChange('height', e.target.value)}
                      className="text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الوزن (كجم)</label>
                    <Input
                      type="number"
                      placeholder="مثال: 20"
                      value={checkedBaggageDimensions.weight}
                      onChange={(e) => handleCheckedDimensionChange('weight', e.target.value)}
                      className="text-center"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <Button 
                    onClick={calculateCheckedBaggageScore}
                    disabled={!checkedBaggageDimensions.length || !checkedBaggageDimensions.width || !checkedBaggageDimensions.height || !checkedBaggageDimensions.weight}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    فحص حقائب الشحن
                  </Button>
                </div>
              </CardContent>
            </Card>

            {showCheckedResult && checkedBaggageResult && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 space-x-reverse">
                    {checkedBaggageResult.isAcceptable ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    )}
                    <span>نتيجة فحص حقائب الشحن</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full text-2xl font-bold text-white mb-4 ${
                      checkedBaggageResult.isAcceptable ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {checkedBaggageResult.isAcceptable ? '✅' : '❌'}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{checkedBaggageResult.status}</h3>
                    <p className={`text-lg font-semibold ${
                      checkedBaggageResult.isAcceptable ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {checkedBaggageResult.message}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">أبعاد حقائب الشحن</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">الأبعاد:</span>
                          <span className="font-medium">{checkedBaggageResult.details.inputDimensions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">مجموع الأبعاد:</span>
                          <span className="font-medium">{checkedBaggageResult.details.dimensionsSum}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">الوزن:</span>
                          <span className="font-medium">{checkedBaggageResult.details.inputWeight}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">الحدود المسموحة</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">مجموع الأبعاد المسموح:</span>
                          <span className="font-medium">{checkedBaggageResult.details.maxDimensionsSum}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">الوزن المسموح:</span>
                          <span className="font-medium">{checkedBaggageResult.details.maxWeight}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {checkedBaggageResult.warnings.length > 0 && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="font-semibold text-red-900 mb-2">تحذيرات</h4>
                      <ul className="space-y-1">
                        {checkedBaggageResult.warnings.map((warning, index) => (
                          <li key={index} className="text-red-800 text-sm flex items-start space-x-2 space-x-reverse">
                            <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                            <span>{warning}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start space-x-3 space-x-reverse">
                      <Info className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div className="text-yellow-800 text-sm">
                        <p className="font-semibold mb-1">تنبيهات إضافية:</p>
                        <p>قد تختلف السياسات حسب الوجهة أو نوع التذكرة. يُنصح بالتحقق من شركة الطيران قبل السفر.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 space-x-reverse">
                  <Info className="w-6 h-6 text-blue-600" />
                  <span>معلومات إضافية</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-blue-800">{selectedAirline.additionalInfo}</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm">
                    <strong>تنبيه:</strong> قد تختلف السياسات حسب نوع التذكرة ووجهة السفر. يُنصح بالتحقق من الموقع الرسمي لشركة الطيران قبل السفر.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        )}



        {!showResults && !selectedAirline && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">ابحث عن شركة الطيران</h3>
              <p className="text-gray-600">
                أدخل اسم شركة الطيران في مربع البحث أعلاه للحصول على معلومات مفصلة حول سياسات الأمتعة
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BaggageChecker;