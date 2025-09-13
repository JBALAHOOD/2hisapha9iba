// Utility functions for the Arabic Baggage Checker App

// Create page URL with parameters
export const createPageUrl = (pageName, params = {}) => {
  const queryString = Object.keys(params).length > 0 
    ? '?' + new URLSearchParams(params).toString() 
    : '';
  return `/${pageName}${queryString}`;
};

// Format airline name for display
export const formatAirlineName = (name) => {
  return name.trim();
};

// Check if text contains Arabic characters
export const isArabic = (text) => {
  return /[\u0600-\u06FF]/.test(text);
};

// Mock airlines data with over 100 airlines
export const mockAirlines = [
  {
    id: 1,
    name: 'الخطوط السعودية',
    nameEn: 'Saudi Arabian Airlines',
    code: 'SV',
    carryOnWeight: '7',
    carryOnDimensions: '56 × 45 × 25',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'يُسمح بحقيبة يد واحدة وحقيبة شخصية صغيرة'
  },
  {
    id: 2,
    name: 'طيران الإمارات',
    nameEn: 'Emirates',
    code: 'EK',
    carryOnWeight: '7',
    carryOnDimensions: '55 × 38 × 22',
    checkedWeight: '30',
    checkedDimensions: '150 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'وزن إضافي مسموح للدرجة الأولى ودرجة الأعمال'
  },
  {
    id: 3,
    name: 'طيران ناس',
    nameEn: 'Flynas',
    code: 'XY',
    carryOnWeight: '7',
    carryOnDimensions: '56 × 45 × 25',
    checkedWeight: '20',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'رسوم إضافية للأمتعة الزائدة'
  },
  {
    id: 4,
    name: 'الخطوط التركية',
    nameEn: 'Turkish Airlines',
    code: 'TK',
    carryOnWeight: '8',
    carryOnDimensions: '55 × 40 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'حقيبة إضافية مجانية للرحلات الطويلة'
  },
  {
    id: 5,
    name: 'الاتحاد للطيران',
    nameEn: 'Etihad Airways',
    code: 'EY',
    carryOnWeight: '7',
    carryOnDimensions: '56 × 45 × 25',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'خدمات إضافية متاحة مقابل رسوم'
  },
  {
    id: 6,
    name: 'طيران قطر',
    nameEn: 'Qatar Airways',
    code: 'QR',
    carryOnWeight: '7',
    carryOnDimensions: '55 × 37 × 25',
    checkedWeight: '30',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'خدمة عملاء ممتازة وطعام فاخر'
  },
  {
    id: 7,
    name: 'طيران الكويت',
    nameEn: 'Kuwait Airways',
    code: 'KU',
    carryOnWeight: '7',
    carryOnDimensions: '55 × 40 × 20',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة الطيران الوطنية للكويت'
  },
  {
    id: 8,
    name: 'طيران البحرين',
    nameEn: 'Gulf Air',
    code: 'GF',
    carryOnWeight: '7',
    carryOnDimensions: '56 × 45 × 25',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة طيران إقليمية رائدة'
  },
  {
    id: 9,
    name: 'طيران عُمان',
    nameEn: 'Oman Air',
    code: 'WY',
    carryOnWeight: '7',
    carryOnDimensions: '56 × 45 × 25',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة الطيران الوطنية لسلطنة عُمان'
  },
  {
    id: 10,
    name: 'طيران الأردن',
    nameEn: 'Royal Jordanian',
    code: 'RJ',
    carryOnWeight: '7',
    carryOnDimensions: '56 × 45 × 25',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني للمملكة الأردنية الهاشمية'
  },
  {
    id: 11,
    name: 'مصر للطيران',
    nameEn: 'EgyptAir',
    code: 'MS',
    carryOnWeight: '8',
    carryOnDimensions: '55 × 40 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'أقدم شركة طيران في العالم العربي'
  },
  {
    id: 12,
    name: 'طيران المغرب',
    nameEn: 'Royal Air Maroc',
    code: 'AT',
    carryOnWeight: '10',
    carryOnDimensions: '55 × 35 × 25',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني للمملكة المغربية'
  },
  {
    id: 13,
    name: 'الخطوط التونسية',
    nameEn: 'Tunisair',
    code: 'TU',
    carryOnWeight: '8',
    carryOnDimensions: '55 × 40 × 20',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة الطيران الوطنية لتونس'
  },
  {
    id: 14,
    name: 'الخطوط الجزائرية',
    nameEn: 'Air Algérie',
    code: 'AH',
    carryOnWeight: '8',
    carryOnDimensions: '55 × 35 × 25',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني للجمهورية الجزائرية'
  },
  {
    id: 15,
    name: 'طيران لبنان',
    nameEn: 'Middle East Airlines',
    code: 'ME',
    carryOnWeight: '7',
    carryOnDimensions: '55 × 40 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني للجمهورية اللبنانية'
  },
  {
    id: 16,
    name: 'طيران العراق',
    nameEn: 'Iraqi Airways',
    code: 'IA',
    carryOnWeight: '7',
    carryOnDimensions: '56 × 45 × 25',
    checkedWeight: '20',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة الطيران الوطنية للعراق'
  },
  {
    id: 17,
    name: 'طيران سوريا',
    nameEn: 'Syrian Air',
    code: 'RB',
    carryOnWeight: '7',
    carryOnDimensions: '55 × 40 × 20',
    checkedWeight: '20',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني للجمهورية العربية السورية'
  },
  {
    id: 18,
    name: 'طيران ليبيا',
    nameEn: 'Libyan Airlines',
    code: 'LN',
    carryOnWeight: '7',
    carryOnDimensions: '55 × 40 × 20',
    checkedWeight: '20',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة الطيران الوطنية لليبيا'
  },
  {
    id: 19,
    name: 'طيران السودان',
    nameEn: 'Sudan Airways',
    code: 'SD',
    carryOnWeight: '7',
    carryOnDimensions: '55 × 40 × 20',
    checkedWeight: '20',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لجمهورية السودان'
  },
  {
    id: 20,
    name: 'طيران اليمن',
    nameEn: 'Yemenia',
    code: 'IY',
    carryOnWeight: '7',
    carryOnDimensions: '55 × 40 × 20',
    checkedWeight: '20',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني للجمهورية اليمنية'
  },
  {
    id: 21,
    name: 'الخطوط الأمريكية',
    nameEn: 'American Airlines',
    code: 'AA',
    carryOnWeight: '10',
    carryOnDimensions: '56 × 36 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'إحدى أكبر شركات الطيران في العالم'
  },
  {
    id: 22,
    name: 'دلتا للطيران',
    nameEn: 'Delta Air Lines',
    code: 'DL',
    carryOnWeight: '10',
    carryOnDimensions: '56 × 35 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة طيران أمريكية رائدة'
  },
  {
    id: 23,
    name: 'يونايتد للطيران',
    nameEn: 'United Airlines',
    code: 'UA',
    carryOnWeight: '10',
    carryOnDimensions: '56 × 35 × 22',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة طيران أمريكية كبرى'
  },
  {
    id: 24,
    name: 'ساوث ويست',
    nameEn: 'Southwest Airlines',
    code: 'WN',
    carryOnWeight: '10',
    carryOnDimensions: '61 × 41 × 28',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة طيران أمريكية منخفضة التكلفة'
  },
  {
    id: 25,
    name: 'جيت بلو',
    nameEn: 'JetBlue Airways',
    code: 'B6',
    carryOnWeight: '10',
    carryOnDimensions: '56 × 36 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة طيران أمريكية منخفضة التكلفة'
  },
  {
    id: 26,
    name: 'الخطوط الكندية',
    nameEn: 'Air Canada',
    code: 'AC',
    carryOnWeight: '10',
    carryOnDimensions: '56 × 23 × 56',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لكندا'
  },
  {
    id: 27,
    name: 'ويست جيت',
    nameEn: 'WestJet',
    code: 'WS',
    carryOnWeight: '10',
    carryOnDimensions: '53 × 38 × 21',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة طيران كندية منخفضة التكلفة'
  },
  {
    id: 28,
    name: 'أيروميكسيكو',
    nameEn: 'Aeromexico',
    code: 'AM',
    carryOnWeight: '10',
    carryOnDimensions: '56 × 40 × 25',
    checkedWeight: '25',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني للمكسيك'
  },
  {
    id: 29,
    name: 'فولاريس',
    nameEn: 'Volaris',
    code: 'Y4',
    carryOnWeight: '10',
    carryOnDimensions: '55 × 40 × 25',
    checkedWeight: '25',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة طيران مكسيكية منخفضة التكلفة'
  },
  {
    id: 30,
    name: 'إنتر جيت',
    nameEn: 'Interjet',
    code: '4O',
    carryOnWeight: '10',
    carryOnDimensions: '55 × 40 × 25',
    checkedWeight: '25',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة طيران مكسيكية'
  },
  {
    id: 31,
    name: 'لوفتهانزا',
    nameEn: 'Lufthansa',
    code: 'LH',
    carryOnWeight: '8',
    carryOnDimensions: '55 × 40 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لألمانيا'
  },
  {
    id: 32,
    name: 'الخطوط الفرنسية',
    nameEn: 'Air France',
    code: 'AF',
    carryOnWeight: '12',
    carryOnDimensions: '55 × 35 × 25',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لفرنسا'
  },
  {
    id: 33,
    name: 'الخطوط البريطانية',
    nameEn: 'British Airways',
    code: 'BA',
    carryOnWeight: '23',
    carryOnDimensions: '56 × 45 × 25',
    checkedWeight: '23',
    checkedDimensions: '90 × 75 × 43',
    additionalInfo: 'الناقل الوطني للمملكة المتحدة'
  },
  {
    id: 34,
    name: 'كيه إل إم',
    nameEn: 'KLM',
    code: 'KL',
    carryOnWeight: '12',
    carryOnDimensions: '55 × 35 × 25',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لهولندا'
  },
  {
    id: 35,
    name: 'إيبيريا',
    nameEn: 'Iberia',
    code: 'IB',
    carryOnWeight: '10',
    carryOnDimensions: '56 × 40 × 25',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لإسبانيا'
  },
  {
    id: 36,
    name: 'أليتاليا',
    nameEn: 'Alitalia',
    code: 'AZ',
    carryOnWeight: '8',
    carryOnDimensions: '55 × 35 × 25',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني السابق لإيطاليا'
  },
  {
    id: 37,
    name: 'سويس',
    nameEn: 'Swiss International Air Lines',
    code: 'LX',
    carryOnWeight: '8',
    carryOnDimensions: '55 × 40 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لسويسرا'
  },
  {
    id: 38,
    name: 'النمسا',
    nameEn: 'Austrian Airlines',
    code: 'OS',
    carryOnWeight: '8',
    carryOnDimensions: '55 × 40 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني للنمسا'
  },
  {
    id: 39,
    name: 'بروكسل',
    nameEn: 'Brussels Airlines',
    code: 'SN',
    carryOnWeight: '8',
    carryOnDimensions: '55 × 40 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لبلجيكا'
  },
  {
    id: 40,
    name: 'فنلندا',
    nameEn: 'Finnair',
    code: 'AY',
    carryOnWeight: '8',
    carryOnDimensions: '56 × 45 × 25',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لفنلندا'
  },
  {
    id: 41,
    name: 'الصين الجنوبية',
    nameEn: 'China Southern Airlines',
    code: 'CZ',
    carryOnWeight: '5',
    carryOnDimensions: '56 × 36 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'أكبر شركة طيران في آسيا'
  },
  {
    id: 42,
    name: 'الصين الشرقية',
    nameEn: 'China Eastern Airlines',
    code: 'MU',
    carryOnWeight: '5',
    carryOnDimensions: '56 × 36 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'إحدى أكبر شركات الطيران الصينية'
  },
  {
    id: 43,
    name: 'الخطوط الصينية',
    nameEn: 'Air China',
    code: 'CA',
    carryOnWeight: '5',
    carryOnDimensions: '56 × 36 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني للصين'
  },
  {
    id: 44,
    name: 'هاينان',
    nameEn: 'Hainan Airlines',
    code: 'HU',
    carryOnWeight: '5',
    carryOnDimensions: '56 × 36 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة طيران صينية كبرى'
  },
  {
    id: 45,
    name: 'اليابان',
    nameEn: 'Japan Airlines',
    code: 'JL',
    carryOnWeight: '10',
    carryOnDimensions: '56 × 36 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لليابان'
  },
  {
    id: 46,
    name: 'أنا',
    nameEn: 'All Nippon Airways',
    code: 'NH',
    carryOnWeight: '10',
    carryOnDimensions: '56 × 36 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'أكبر شركة طيران في اليابان'
  },
  {
    id: 47,
    name: 'كوريا',
    nameEn: 'Korean Air',
    code: 'KE',
    carryOnWeight: '12',
    carryOnDimensions: '56 × 36 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لكوريا الجنوبية'
  },
  {
    id: 48,
    name: 'أسيانا',
    nameEn: 'Asiana Airlines',
    code: 'OZ',
    carryOnWeight: '10',
    carryOnDimensions: '56 × 36 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة طيران كورية جنوبية'
  },
  {
    id: 49,
    name: 'سنغافورة',
    nameEn: 'Singapore Airlines',
    code: 'SQ',
    carryOnWeight: '7',
    carryOnDimensions: '56 × 36 × 23',
    checkedWeight: '30',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لسنغافورة'
  },
  {
    id: 50,
    name: 'تايلاند',
    nameEn: 'Thai Airways',
    code: 'TG',
    carryOnWeight: '7',
    carryOnDimensions: '56 × 45 × 25',
    checkedWeight: '30',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لتايلاند'
  },
  {
    id: 51,
    name: 'ماليزيا',
    nameEn: 'Malaysia Airlines',
    code: 'MH',
    carryOnWeight: '7',
    carryOnDimensions: '56 × 36 × 23',
    checkedWeight: '30',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لماليزيا'
  },
  {
    id: 52,
    name: 'إندونيسيا',
    nameEn: 'Garuda Indonesia',
    code: 'GA',
    carryOnWeight: '7',
    carryOnDimensions: '56 × 36 × 23',
    checkedWeight: '30',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لإندونيسيا'
  },
  {
    id: 53,
    name: 'الفلبين',
    nameEn: 'Philippine Airlines',
    code: 'PR',
    carryOnWeight: '7',
    carryOnDimensions: '56 × 36 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني للفلبين'
  },
  {
    id: 54,
    name: 'فيتنام',
    nameEn: 'Vietnam Airlines',
    code: 'VN',
    carryOnWeight: '7',
    carryOnDimensions: '56 × 36 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لفيتنام'
  },
  {
    id: 55,
    name: 'الهند',
    nameEn: 'Air India',
    code: 'AI',
    carryOnWeight: '8',
    carryOnDimensions: '56 × 36 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني للهند'
  },
  {
    id: 56,
    name: 'إنديغو',
    nameEn: 'IndiGo',
    code: '6E',
    carryOnWeight: '7',
    carryOnDimensions: '55 × 35 × 25',
    checkedWeight: '15',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'أكبر شركة طيران منخفضة التكلفة في الهند'
  },
  {
    id: 57,
    name: 'سبايس جيت',
    nameEn: 'SpiceJet',
    code: 'SG',
    carryOnWeight: '7',
    carryOnDimensions: '55 × 35 × 25',
    checkedWeight: '15',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة طيران هندية منخفضة التكلفة'
  },
  {
    id: 58,
    name: 'جيت إيرويز',
    nameEn: 'Jet Airways',
    code: '9W',
    carryOnWeight: '7',
    carryOnDimensions: '55 × 35 × 25',
    checkedWeight: '20',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة طيران هندية سابقة'
  },
  {
    id: 59,
    name: 'باكستان',
    nameEn: 'Pakistan International Airlines',
    code: 'PK',
    carryOnWeight: '7',
    carryOnDimensions: '56 × 36 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لباكستان'
  },
  {
    id: 60,
    name: 'بنغلاديش',
    nameEn: 'Biman Bangladesh Airlines',
    code: 'BG',
    carryOnWeight: '7',
    carryOnDimensions: '56 × 36 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لبنغلاديش'
  },
  {
    id: 61,
    name: 'سريلانكا',
    nameEn: 'SriLankan Airlines',
    code: 'UL',
    carryOnWeight: '7',
    carryOnDimensions: '56 × 36 × 23',
    checkedWeight: '20',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لسريلانكا'
  },
  {
    id: 62,
    name: 'أستراليا',
    nameEn: 'Qantas',
    code: 'QF',
    carryOnWeight: '7',
    carryOnDimensions: '56 × 36 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لأستراليا'
  },
  {
    id: 63,
    name: 'فيرجن أستراليا',
    nameEn: 'Virgin Australia',
    code: 'VA',
    carryOnWeight: '7',
    carryOnDimensions: '56 × 36 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'ثاني أكبر شركة طيران في أستراليا'
  },
  {
    id: 64,
    name: 'جيت ستار',
    nameEn: 'Jetstar Airways',
    code: 'JQ',
    carryOnWeight: '7',
    carryOnDimensions: '56 × 36 × 23',
    checkedWeight: '20',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة طيران أسترالية منخفضة التكلفة'
  },
  {
    id: 65,
    name: 'نيوزيلندا',
    nameEn: 'Air New Zealand',
    code: 'NZ',
    carryOnWeight: '7',
    carryOnDimensions: '56 × 36 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لنيوزيلندا'
  },
  {
    id: 66,
    name: 'جنوب أفريقيا',
    nameEn: 'South African Airways',
    code: 'SA',
    carryOnWeight: '8',
    carryOnDimensions: '56 × 36 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لجنوب أفريقيا'
  },
  {
    id: 67,
    name: 'إثيوبيا',
    nameEn: 'Ethiopian Airlines',
    code: 'ET',
    carryOnWeight: '7',
    carryOnDimensions: '56 × 36 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لإثيوبيا'
  },
  {
    id: 68,
    name: 'كينيا',
    nameEn: 'Kenya Airways',
    code: 'KQ',
    carryOnWeight: '8',
    carryOnDimensions: '56 × 36 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لكينيا'
  },
  {
    id: 69,
    name: 'المغرب إكسبريس',
    nameEn: 'Air Arabia Maroc',
    code: '3O',
    carryOnWeight: '10',
    carryOnDimensions: '55 × 40 × 20',
    checkedWeight: '20',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة طيران مغربية منخفضة التكلفة'
  },
  {
    id: 70,
    name: 'نايجيريا',
    nameEn: 'Arik Air',
    code: 'W3',
    carryOnWeight: '7',
    carryOnDimensions: '56 × 36 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'أكبر شركة طيران في نيجيريا'
  },
  {
    id: 71,
    name: 'غانا',
    nameEn: 'Africa World Airlines',
    code: 'AW',
    carryOnWeight: '7',
    carryOnDimensions: '56 × 36 × 23',
    checkedWeight: '20',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة طيران غانية'
  },
  {
    id: 72,
    name: 'روسيا',
    nameEn: 'Aeroflot',
    code: 'SU',
    carryOnWeight: '10',
    carryOnDimensions: '56 × 36 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لروسيا'
  },
  {
    id: 73,
    name: 'أوكرانيا الدولية',
    nameEn: 'Ukraine International Airlines',
    code: 'PS',
    carryOnWeight: '7',
    carryOnDimensions: '55 × 40 × 20',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لأوكرانيا'
  },
  {
    id: 74,
    name: 'إسرائيل',
    nameEn: 'El Al',
    code: 'LY',
    carryOnWeight: '8',
    carryOnDimensions: '56 × 45 × 25',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لإسرائيل'
  },
  {
    id: 75,
    name: 'قبرص',
    nameEn: 'Cyprus Airways',
    code: 'CY',
    carryOnWeight: '8',
    carryOnDimensions: '55 × 40 × 23',
    checkedWeight: '20',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لقبرص'
  },
  {
    id: 76,
    name: 'مالطا',
    nameEn: 'Air Malta',
    code: 'KM',
    carryOnWeight: '10',
    carryOnDimensions: '55 × 40 × 20',
    checkedWeight: '20',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لمالطا'
  },
  {
    id: 77,
    name: 'أيسلندا',
    nameEn: 'Icelandair',
    code: 'FI',
    carryOnWeight: '10',
    carryOnDimensions: '55 × 40 × 20',
    checkedWeight: '20',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لأيسلندا'
  },
  {
    id: 78,
    name: 'النرويج',
    nameEn: 'Norwegian Air',
    code: 'DY',
    carryOnWeight: '10',
    carryOnDimensions: '55 × 40 × 23',
    checkedWeight: '20',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة طيران نرويجية منخفضة التكلفة'
  },
  {
    id: 79,
    name: 'الدنمارك',
    nameEn: 'Danish Air Transport',
    code: 'DX',
    carryOnWeight: '8',
    carryOnDimensions: '55 × 40 × 23',
    checkedWeight: '20',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة طيران دنماركية'
  },
  {
    id: 80,
    name: 'السويد',
    nameEn: 'Scandinavian Airlines',
    code: 'SK',
    carryOnWeight: '8',
    carryOnDimensions: '55 × 40 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة طيران إسكندنافية'
  },
  {
    id: 81,
    name: 'بولندا',
    nameEn: 'LOT Polish Airlines',
    code: 'LO',
    carryOnWeight: '8',
    carryOnDimensions: '55 × 40 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لبولندا'
  },
  {
    id: 82,
    name: 'التشيك',
    nameEn: 'Czech Airlines',
    code: 'OK',
    carryOnWeight: '8',
    carryOnDimensions: '55 × 45 × 25',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني للتشيك'
  },
  {
    id: 83,
    name: 'المجر',
    nameEn: 'Wizz Air',
    code: 'W6',
    carryOnWeight: '10',
    carryOnDimensions: '56 × 45 × 25',
    checkedWeight: '20',
    checkedDimensions: '149 × 119 × 171',
    additionalInfo: 'شركة طيران منخفضة التكلفة مجرية'
  },
  {
    id: 84,
    name: 'رومانيا',
    nameEn: 'TAROM',
    code: 'RO',
    carryOnWeight: '8',
    carryOnDimensions: '55 × 40 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لرومانيا'
  },
  {
    id: 85,
    name: 'بلغاريا',
    nameEn: 'Bulgaria Air',
    code: 'FB',
    carryOnWeight: '10',
    carryOnDimensions: '55 × 40 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لبلغاريا'
  },
  {
    id: 86,
    name: 'صربيا',
    nameEn: 'Air Serbia',
    code: 'JU',
    carryOnWeight: '8',
    carryOnDimensions: '55 × 40 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لصربيا'
  },
  {
    id: 87,
    name: 'كرواتيا',
    nameEn: 'Croatia Airlines',
    code: 'OU',
    carryOnWeight: '8',
    carryOnDimensions: '55 × 40 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لكرواتيا'
  },
  {
    id: 88,
    name: 'سلوفينيا',
    nameEn: 'Adria Airways',
    code: 'JP',
    carryOnWeight: '8',
    carryOnDimensions: '55 × 40 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني السابق لسلوفينيا'
  },
  {
    id: 89,
    name: 'اليونان',
    nameEn: 'Aegean Airlines',
    code: 'A3',
    carryOnWeight: '8',
    carryOnDimensions: '56 × 45 × 25',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'أكبر شركة طيران في اليونان'
  },
  {
    id: 90,
    name: 'البرتغال',
    nameEn: 'TAP Air Portugal',
    code: 'TP',
    carryOnWeight: '8',
    carryOnDimensions: '55 × 40 × 20',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني للبرتغال'
  },
  {
    id: 91,
    name: 'أيرلندا',
    nameEn: 'Aer Lingus',
    code: 'EI',
    carryOnWeight: '10',
    carryOnDimensions: '55 × 40 × 24',
    checkedWeight: '20',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لأيرلندا'
  },
  {
    id: 92,
    name: 'رايان إير',
    nameEn: 'Ryanair',
    code: 'FR',
    carryOnWeight: '10',
    carryOnDimensions: '55 × 40 × 20',
    checkedWeight: '20',
    checkedDimensions: '81 × 119 × 119',
    additionalInfo: 'أكبر شركة طيران منخفضة التكلفة في أوروبا'
  },
  {
    id: 93,
    name: 'إيزي جيت',
    nameEn: 'easyJet',
    code: 'U2',
    carryOnWeight: '10',
    carryOnDimensions: '56 × 45 × 25',
    checkedWeight: '20',
    checkedDimensions: '275 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة طيران بريطانية منخفضة التكلفة'
  },
  {
    id: 94,
    name: 'فيولينغ',
    nameEn: 'Vueling',
    code: 'VY',
    carryOnWeight: '10',
    carryOnDimensions: '55 × 40 × 20',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة طيران إسبانية منخفضة التكلفة'
  },
  {
    id: 95,
    name: 'يورووينغز',
    nameEn: 'Eurowings',
    code: 'EW',
    carryOnWeight: '8',
    carryOnDimensions: '55 × 40 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة طيران ألمانية منخفضة التكلفة'
  },
  {
    id: 96,
    name: 'ترانسافيا',
    nameEn: 'Transavia',
    code: 'HV',
    carryOnWeight: '10',
    carryOnDimensions: '55 × 40 × 25',
    checkedWeight: '20',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة طيران هولندية منخفضة التكلفة'
  },
  {
    id: 97,
    name: 'بيغاسوس',
    nameEn: 'Pegasus Airlines',
    code: 'PC',
    carryOnWeight: '8',
    carryOnDimensions: '55 × 40 × 20',
    checkedWeight: '20',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة طيران تركية منخفضة التكلفة'
  },
  {
    id: 98,
    name: 'أونور إير',
    nameEn: 'Onur Air',
    code: '8Q',
    carryOnWeight: '8',
    carryOnDimensions: '55 × 40 × 20',
    checkedWeight: '20',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة طيران تركية'
  },
  {
    id: 99,
    name: 'أطلس جيت',
    nameEn: 'AtlasGlobal',
    code: 'KK',
    carryOnWeight: '8',
    carryOnDimensions: '55 × 40 × 20',
    checkedWeight: '20',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة طيران تركية'
  },
  {
    id: 100,
    name: 'صن إكسبريس',
    nameEn: 'SunExpress',
    code: 'XQ',
    carryOnWeight: '8',
    carryOnDimensions: '55 × 40 × 20',
    checkedWeight: '20',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة طيران تركية-ألمانية'
  },
  {
    id: 101,
    name: 'فلاي دبي',
    nameEn: 'flydubai',
    code: 'FZ',
    carryOnWeight: '7',
    carryOnDimensions: '55 × 38 × 22',
    checkedWeight: '20',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة طيران إماراتية منخفضة التكلفة'
  },
  {
    id: 102,
    name: 'العربية للطيران',
    nameEn: 'Air Arabia',
    code: 'G9',
    carryOnWeight: '7',
    carryOnDimensions: '55 × 40 × 20',
    checkedWeight: '20',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'أول شركة طيران منخفضة التكلفة في الشرق الأوسط'
  },
  {
    id: 103,
    name: 'جزيرة الطيران',
    nameEn: 'Jazeera Airways',
    code: 'J9',
    carryOnWeight: '7',
    carryOnDimensions: '55 × 40 × 20',
    checkedWeight: '20',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة طيران كويتية منخفضة التكلفة'
  },
  {
    id: 104,
    name: 'سالام إير',
    nameEn: 'SalamAir',
    code: 'OV',
    carryOnWeight: '7',
    carryOnDimensions: '56 × 45 × 25',
    checkedWeight: '20',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة طيران عُمانية منخفضة التكلفة'
  },
  {
    id: 105,
    name: 'فلاي دبي',
    nameEn: 'flydubai',
    code: 'FZ',
    carryOnWeight: '7',
    carryOnDimensions: '55 × 38 × 22',
    checkedWeight: '20',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة طيران إماراتية منخفضة التكلفة'
  },
  {
    id: 106,
    name: 'العربية للطيران',
    nameEn: 'Air Arabia',
    code: 'G9',
    carryOnWeight: '7',
    carryOnDimensions: '55 × 40 × 20',
    checkedWeight: '20',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'أول شركة طيران منخفضة التكلفة في الشرق الأوسط'
  },
  {
    id: 107,
    name: 'جزيرة الطيران',
    nameEn: 'Jazeera Airways',
    code: 'J9',
    carryOnWeight: '7',
    carryOnDimensions: '55 × 40 × 20',
    checkedWeight: '20',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'شركة طيران كويتية منخفضة التكلفة'
  },
  {
    id: 108,
    name: 'إيران',
    nameEn: 'Iran Air',
    code: 'IR',
    carryOnWeight: '8',
    carryOnDimensions: '55 × 40 × 23',
    checkedWeight: '30',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لإيران'
  },
  {
    id: 109,
    name: 'أفغانستان',
    nameEn: 'Ariana Afghan Airlines',
    code: 'FG',
    carryOnWeight: '7',
    carryOnDimensions: '55 × 40 × 20',
    checkedWeight: '20',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لأفغانستان'
  },
  {
    id: 110,
    name: 'أوزبكستان',
    nameEn: 'Uzbekistan Airways',
    code: 'HY',
    carryOnWeight: '8',
    carryOnDimensions: '55 × 40 × 23',
    checkedWeight: '23',
    checkedDimensions: '158 سم (الطول + العرض + الارتفاع)',
    additionalInfo: 'الناقل الوطني لأوزبكستان'
  }
];

// Search function for airlines
export const searchAirlines = (query) => {
  if (!query || query.trim() === '') return mockAirlines;
  
  const searchTerm = query.toLowerCase().trim();
  return mockAirlines.filter(airline => 
    airline.name.toLowerCase().includes(searchTerm) ||
    airline.nameEn.toLowerCase().includes(searchTerm) ||
    airline.code.toLowerCase().includes(searchTerm)
  );
};

// Get airline by ID
export const getAirlineById = (id) => {
  return mockAirlines.find(airline => airline.id === parseInt(id));
};