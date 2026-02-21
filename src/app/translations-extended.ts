export type Language = 'ar' | 'fr' | 'darija';

export interface Translations {
  // Common
  common: {
    yes: string;
    no: string;
    next: string;
    back: string;
    submit: string;
    continue: string;
    cancel: string;
    save: string;
    loading: string;
    optional: string;
    required: string;
    backToHome: string;
  };
  
  // Accessibility (screen reader texts)
  accessibility: {
    close: string;
    more: string;
    morePages: string;
    previousSlide: string;
    nextSlide: string;
    toggleSidebar: string;
    sidebar: string;
  };
  
  // HomePage
  homePage: {
    headerTitle: string;
    badge: string;
    welcome: string;
    subtitle: string;
    description: string;
    kitchenTitle: string;
    kitchenDescription: string;
    kitchenButton: string;
    salonTitle: string;
    salonDescription: string;
    salonButton: string;
    infoNotice: string;
    whatsappContact: string;
    footerCopyright: string;
  };

  // Success Page
  successPage: {
    thankYou: string;
    thankYouMessage: string;
    priceCalculated: string;
    priceWillBeStudied: string;
    finalQuote: string;
    estimatedPrice: string;
    estimatedPriceNote: string;
    contactSoon: string;
    contactSoonMessage: string;
    importantNote: string;
    importantNoteText1: string;
    importantNoteText2: string;
    whyGraphitube: string;
    whyGraphitubeText1: string;
    whyGraphitubeText2: string;
    teamWillContact: string;
    backToHome: string;
  };

  // WhatsApp
  whatsapp: {
    buttonText: string;
    needHelp: string;
    helpMessage: string;
    contactUs: string;
    helpTemplate: string;
    generalHelpTemplate: string;
  };

  // Progress
  progress: {
    step: string;
    of: string;
    completed: string;
  };

  // Kitchen Wizard Steps
  kitchenSteps: {
    titles: string[];
    step1: {
      title: string;
      subtitle: string;
      fullName: string;
      fullNamePlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      address: string;
      addressPlaceholder: string;
      city: string;
      cityPlaceholder: string;
    };
    step2: {
      title: string;
      subtitle: string;
      designLabel: string;
      lShape: string;
      uShape: string;
      iShape: string;
      square: string;
      rectangularOpen: string;
      rectangularClosed: string;
    };
    step3: {
      title: string;
      subtitle: string;
      length: string;
      width: string;
      metersUnit: string;
      placeholder: string;
    };
    step4: {
      title: string;
      subtitle: string;
      question: string;
      heightLabel: string;
      heightPlaceholder: string;
    };
    step5: {
      title: string;
      subtitle: string;
      marble: string;
      tiles: string;
      electrical: string;
      plumbing: string;
      painting: string;
      gypsum: string;
      marbleDesc: string;
      tilesDesc: string;
      electricalDesc: string;
      plumbingDesc: string;
      paintingDesc: string;
      gypsumDesc: string;
    };
    step6: {
      title: string;
      subtitle: string;
      none: string;
      fromGraphitube: string;
      fromClient: string;
      noneDesc: string;
      fromGraphitubeDesc: string;
      fromClientDesc: string;
    };
    step7: {
      title: string;
      subtitle: string;
      none: string;
      basic: string;
      premium: string;
      noneDesc: string;
      basicDesc: string;
      premiumDesc: string;
    };
    step8: {
      title: string;
      subtitle: string;
      mdf: string;
      wood: string;
      customWood: string;
      mdfDesc: string;
      woodDesc: string;
      customWoodDesc: string;
      customWoodLabel: string;
      customWoodPlaceholder: string;
    };
    step9: {
      title: string;
      subtitle: string;
      none: string;
      blum: string;
      other: string;
      noneDesc: string;
      blumDesc: string;
      otherDesc: string;
      otherLabel: string;
      otherPlaceholder: string;
    };
    step10: {
      title: string;
      subtitle: string;
      none: string;
      basic: string;
      advanced: string;
      noneDesc: string;
      basicDesc: string;
      advancedDesc: string;
    };
    step11: {
      title: string;
      subtitle: string;
      materialSource: string;
      graphitubeOption: string;
      graphitubeDescription: string;
      customOption: string;
      customDescription: string;
      graphitubeRefLabel: string;
      graphitubeRefPlaceholder: string;
      customWarning: string;
      surfaceTypeLabel: string;
      surfaceTypePlaceholder: string;
      thicknessLabel: string;
      thicknessPlaceholder: string;
      edgeShapeLabel: string;
      edgeShapePlaceholder: string;
      colorLabel: string;
      colorPlaceholder: string;
      colorNote: string;
      colorReferenceLabel: string;
      uploadImage: string;
      addLink: string;
      imageUrlLabel: string;
      imageUrlPlaceholder: string;
      colorLinkLabel: string;
      colorLinkPlaceholder: string;
      openingsQuestion: string;
      notesLabel: string;
      notesPlaceholder: string;
    };
    step12: {
      title: string;
      subtitle: string;
      materialSource: string;
      graphitubeOption: string;
      graphitubeDescription: string;
      customOption: string;
      customDescription: string;
      graphitubeRefLabel: string;
      graphitubeRefPlaceholder: string;
      customWarning: string;
      scopeLabel: string;
      scopePlaceholder: string;
      typeLabel: string;
      typePlaceholder: string;
      sizeLabel: string;
      sizePlaceholder: string;
      colorLabel: string;
      colorPlaceholder: string;
      colorNote: string;
      colorReferenceLabel: string;
      uploadImage: string;
      addLink: string;
      imageUrlLabel: string;
      imageUrlPlaceholder: string;
      colorLinkLabel: string;
      colorLinkPlaceholder: string;
      notesLabel: string;
      notesPlaceholder: string;
    };
    step13: {
      title: string;
      subtitle: string;
      notesLabel: string;
      notesPlaceholder: string;
    };
    step14: {
      title: string;
      subtitle: string;
      notesLabel: string;
      notesPlaceholder: string;
    };
    step15: {
      title: string;
      subtitle: string;
      notesLabel: string;
      notesPlaceholder: string;
    };
    step16: {
      title: string;
      subtitle: string;
      notesLabel: string;
      notesPlaceholder: string;
    };
    step17: {
      title: string;
      subtitle: string;
      question: string;
      explanation: string;
    };
    step18: {
      title: string;
      subtitle: string;
      label: string;
      placeholder: string;
    };
    step19: {
      title: string;
      subtitle: string;
      reviewTitle: string;
      submitButton: string;
      editButton: string;
      confirmMessage: string;
      customerInfo: string;
      name: string;
      phone: string;
      city: string;
      projectType: string;
      dimensions: string;
      length: string;
      width: string;
      height: string;
      meters: string;
      workScope: string;
      completeProject: string;
      wood: string;
      marble: string;
      tiles: string;
      painting: string;
      gypsum: string;
      decorationAndColor: string;
      selectedPattern: string;
      selectedColor: string;
      linesCount: string;
      woodType: string;
      additionalNotes: string;
      readyToSendTitle: string;
      readyToSendDesc: string;
    };
  };

  // Salon Wizard Steps
  salonSteps: {
    titles: string[];
    step1: {
      title: string;
      subtitle: string;
      fullName: string;
      fullNamePlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      address: string;
      addressPlaceholder: string;
      city: string;
      cityPlaceholder: string;
    };
    step2: {
      title: string;
      subtitle: string;
      designLabel: string;
      lShape: string;
      uShape: string;
      iShape: string;
      square: string;
      rectangularOpen: string;
      rectangularClosed: string;
      customDesign: string;
      uploadImage: string;
      uploadImageDesc: string;
      customPriceNote: string;
    };
    step3: {
      title: string;
      subtitle: string;
      length: string;
      width: string;
      metersUnit: string;
      placeholder: string;
    };
    step4: {
      title: string;
      subtitle: string;
      largeTables: string;
      sundries: string;
      sidePanels: string;
      verticalShapes: string;
      verticalCorners: string;
      note: string;
    };
    step5: {
      title: string;
      subtitle: string;
      chene: string;
      noyer: string;
      laitre: string;
    };
    step6: {
      title: string;
      subtitle: string;
      selectPattern: string;
    };
    step7: {
      title: string;
      subtitle: string;
      selectColor: string;
    };
    step8: {
      title: string;
      subtitle: string;
      confirmMessage: string;
      customerInfo: string;
      name: string;
      phone: string;
      city: string;
      projectType: string;
      dimensions: string;
      length: string;
      width: string;
      height: string;
      meters: string;
      workScope: string;
      completeProject: string;
      wood: string;
      marble: string;
      tiles: string;
      painting: string;
      gypsum: string;
      decorationAndColor: string;
      selectedPattern: string;
      selectedColor: string;
      linesCount: string;
      woodType: string;
      additionalNotes: string;
      readyToSendTitle: string;
      readyToSendDesc: string;
    };
  };
}

export const translations: Record<Language, Translations> = {
  ar: {
    common: {
      yes: 'نعم',
      no: 'لا',
      next: 'التالي',
      back: 'رجوع',
      submit: 'إرسال الطلب',
      continue: 'متابعة',
      cancel: 'إلغاء',
      save: 'حفظ',
      loading: 'جاري التحميل...',
      optional: 'اختياري',
      required: 'مطلوب',
      backToHome: 'العودة للصفحة الرئيسية',
    },
    accessibility: {
      close: 'إغلاق',
      more: 'المزيد',
      morePages: 'صفحات إضافية',
      previousSlide: 'الشريحة السابقة',
      nextSlide: 'الشريحة التالية',
      toggleSidebar: 'تبديل الشريط الجانبي',
      sidebar: 'الشريط الجانبي',
    },
    homePage: {
      headerTitle: 'Graphitube',
      badge: 'نجارة خشبية حسب الطلب',
      welcome: 'مرحبًا بك في Graphitube',
      subtitle: 'صمم مشروعك حسب ذوقك',
      description: 'اختر نوع المشروع الذي ترغب فيه، ثم تابع معنا خطوة بخطوة لإكمال التفاصيل',
      kitchenTitle: 'مطبخ',
      kitchenDescription: 'اختر هذا الخيار إذا كنت تريد تصميم مطبخ خشبي حسب الطلب',
      kitchenButton: 'ابدأ تصميم المطبخ',
      salonTitle: 'صالون',
      salonDescription: 'اختر هذا الخيار إذا كنت تريد تصميم صالون خشبي حسب الطلب',
      salonButton: 'ابدأ تصميم الصالون',
      infoNotice: 'سيتم عرض جميع التفاصيل خطوة بخطوة بعد اختيار المشروع، ولا يتم عرض السعر النهائي مباشرة.',
      whatsappContact: 'للتواصل السريع:',
      footerCopyright: '© 2026 Graphitube - متخصصون في النجارة الخشبية حسب الطلب',
    },
    successPage: {
      thankYou: 'شكراً لثقتكم في Graphitube',
      thankYouMessage: 'نشكر لكم الوقت الذي خصصتموه لملء هذا النموذج.',
      priceCalculated: 'تم حساب',
      priceWillBeStudied: 'سيقوم فريق Graphitube بدراسة مشروعكم بعناية وإعداد',
      finalQuote: 'عرض السعر النهائي',
      estimatedPrice: 'السعر التقديري',
      estimatedPriceNote: 'هذا السعر تقديري بناءً على الخيارات القياسية المختارة',
      contactSoon: 'سنتصل بك قريباً',
      contactSoonMessage: 'بما أنك اخترت خيارات مخصصة أو مواد خارج الكتالوج، سيتواصل معك فريقنا لتقديم عرض سعر دقيق ومفصل.',
      importantNote: 'ملاحظة مهمة:',
      importantNoteText1: 'الثمن الذي سيتم اقتراحه هو ثمن تقديري، مبني على المعطيات الحالية، مع احترام معايير الجودة والمواد والعلامات المعتمدة من طرف Graphitube.',
      importantNoteText2: 'أي تغيير في القياسات، المواد، الألوان، أو نطاق الأشغال قد يؤدي إلى تغيير في عرض الثمن ا��نهائي.',
      whyGraphitube: 'لماذا Graphitube؟',
      whyGraphitubeText1: 'نحن في Graphitube نعتمد جودة عالية في الخشب، التجهيزات، التشطيب، وطريقة التنفيذ.',
      whyGraphitubeText2: 'قد تجدون عروضاً بأثمنة أقل، لكن الفرق يكون في الجودة، المتانة، والدقة في الإنجاز. هدفنا هو تقديم عمل يدوم ويعكس قيمة استثماركم.',
      teamWillContact: 'سيتواصل معكم أحد أعضاء فريق Graphitube عبر الهاتف أو واتساب لتأكيد التفاصيل، الإجابة عن استفساراتكم، وتحديد المدة التقريبية لإنجاز المشروع.',
      backToHome: 'العودة إلى الصفحة الرئيسية',
    },
    whatsapp: {
      buttonText: 'واتساب',
      needHelp: 'هل تحتاج مساعدة؟',
      helpMessage: 'إذا لم تفهم أي جزء من هذا النموذج، تواصل معنا عبر واتساب لنوضح لك التفاصيل.',
      contactUs: 'تواصل معنا',
      helpTemplate: 'مرحباً، أحتاج مساعدة في: {stepName}',
      generalHelpTemplate: 'مرحباً، أحتاج مساعدة في ملء النموذج',
    },
    progress: {
      step: 'الخطوة',
      of: 'من',
      completed: 'مكتمل',
    },
    kitchenSteps: {
      titles: [
        'معلومات العميل',
        'تصميم المطبخ',
        'الأبعاد',
        'ارتفاع السقف',
        'نطاق العمل',
        'أجهزة كهربائية',
        'معدات الخزائن',
        'نوع الخشب',
        'نظام الأبواب',
        'الإضاءة',
        'تفاصيل الرخام',
        'تفاصيل الزليج',
        'تفاصيل الكهرباء',
        'تفاصيل السباكة',
        'تفاصيل الطلاء',
        'تفاصيل الجبس',
        'تصميم ثلاثي الأبعاد',
        'ملاحظات إضافية',
        'التأكيد النهائي',
      ],
      step1: {
        title: 'معلومات العميل',
        subtitle: 'من فضلك أدخل معلوماتك الشخصية',
        fullName: 'الاسم الكامل',
        fullNamePlaceholder: 'مثال: أحمد محمد',
        phone: 'رقم الهاتف',
        phonePlaceholder: '0612345678',
        address: 'العنوان',
        addressPlaceholder: 'الشارع، الحي',
        city: 'المدينة',
        cityPlaceholder: 'مثال: الدار البيضاء',
      },
      step2: {
        title: 'تصميم المطبخ',
        subtitle: 'اختر الشكل الذي تفضله لمطبخ��',
        designLabel: 'التصميم',
        lShape: 'على شكل L',
        uShape: 'على شكل U',
        iShape: 'مع جزيرة',
        square: 'مربع',
        rectangularOpen: 'مستطيل مفتوح',
        rectangularClosed: 'مستطيل مغلق',
        customDesign: 'تصميم مخصص',
        uploadImage: 'تحميل صورة',
        uploadImageDesc: 'تحميل صورة لتصميمك المخصص',
        customPriceNote: 'سيتم التواصل معك لتحديد الثمن المخصص',
      },
      step3: {
        title: 'الأبعاد',
        subtitle: 'أدخل أبعاد مطبخك (بالمتر)',
        length: 'الطول',
        width: 'العرض',
        metersUnit: 'متر',
        placeholder: 'مثال: 4.5',
      },
      step4: {
        title: 'ارتفاع السقف',
        subtitle: 'هل ستصل الخزائن إلى السقف؟',
        question: 'هل تري أن تصل الخزائن إلى السقف؟',
        heightLabel: 'ارتفاع السقف (متر)',
        heightPlaceholder: 'مثال: 2.8',
      },
      step5: {
        title: 'نطاق العمل',
        subtitle: 'حدد الأعمال الإضافية المطلوبة',
        marble: 'رخام / حجر',
        tiles: 'زليج',
        electrical: 'كهرباء',
        plumbing: 'سباكة',
        painting: 'لاء',
        gypsum: 'جبس',
        marbleDesc: 'ركيب وتوريد الرخام أو الحجر',
        tilesDesc: 'تركيب وتوريد الزليج',
        electricalDesc: 'أعمال كهربائية',
        plumbingDesc: 'أعمال السباكة',
        paintingDesc: 'أعمال الطلاء',
        gypsumDesc: 'أعمال الجبس',
      },
      step6: {
        title: 'الأجهزة الكهربائية',
        subtitle: 'هل تريد توريد الأجهزة الكهربائية؟',
        none: 'لا توريد',
        fromGraphitube: 'من Graphitube',
        fromClient: 'من العميل',
        noneDesc: 'لن أحتاج أجهزة كهربائية',
        fromGraphitubeDesc: 'سيقوم Graphitube بتوريد الأجهزة',
        fromClientDesc: 'سأوفر الأجهزة بنفسي',
      },
      step7: {
        title: 'معدات الخزائن',
        subtitle: 'اختر نوع المعدات الداخلية للخزائن',
        none: 'بدون معدات',
        basic: 'معدات أساسية',
        premium: 'معدات متقدمة',
        noneDesc: 'خزائن فارغة بدون إضافات',
        basicDesc: 'معدات بسيطة (رفوف، سلال)',
        premiumDesc: 'معدات متقدمة (أدراج ذكية، آليات حديثة)',
      },
      step8: {
        title: 'نوع الخشب',
        subtitle: 'اختر المادة المفضلة للمطبخ',
        mdf: 'MDF',
        wood: 'خشب طبيعي',
        customWood: 'خشب مخصص',
        mdfDesc: 'خشب مضغوط عالي الجودة',
        woodDesc: 'خشب طبيعي صلب',
        customWoodDesc: 'نوع خشب خاص حسب اختيارك',
        customWoodLabel: 'حدد نوع الخشب المطلوب',
        customWoodPlaceholder: 'مثال: خشب الزان، البلوط...',
      },
      step9: {
        title: 'نظام الأبواب',
        subtitle: 'اختر نظام فتح وإغلاق الخزائن',
        none: 'عادي',
        blum: 'Blum',
        other: 'نظام آخر',
        noneDesc: 'مفصلات عادية',
        blumDesc: 'نظام Blum النمساوي (إغلاق ناعم)',
        otherDesc: 'نظام مخصص من اختيارك',
        otherLabel: 'حدد النظام المطلوب',
        otherPlaceholder: 'مثال: Hettich, Hafele...',
      },
      step10: {
        title: 'الإضاءة',
        subtitle: 'هل تريد إضافة إضاءة LED؟',
        none: 'بدون إضاءة',
        basic: 'إضاءة أساسية',
        advanced: 'إضاءة متقدمة',
        noneDesc: 'بدون إضاءة داخلية',
        basicDesc: 'إضاءة LED بسيطة',
        advancedDesc: 'إضاءة LED ذكية مع تحكم',
      },
      step11: {
        title: 'تفاصيل الرخام',
        subtitle: 'حدد نوع الرخام المطلوب',
        materialSource: 'مصدر المادة',
        graphitubeOption: 'من كتالوج Graphitube',
        graphitubeDescription: 'الرخام من كتالوج Graphitube',
        customOption: 'مادة مخصصة (من اختيارك)',
        customDescription: 'رخام مخصص من اختيارك',
        graphitubeRefLabel: 'رمز المادة من كتالوج Graphitube',
        graphitubeRefPlaceholder: 'مثال: REF-001',
        customWarning: 'بما أن الرخام مختار من طرفكم، لا يمكن تحديد الثمن مباشرة عبر الموقع. سيتم التواصل معكم هاتفياً لتأكيد الاختيار وتقديم عرض الثمن المناسب.',
        surfaceTypeLabel: 'نوع السطح',
        surfaceTypePlaceholder: 'مثال: رخام، كوارتز، جرانيت...',
        thicknessLabel: 'سمك السطح',
        thicknessPlaceholder: 'مثال: 2 سم، 3 سم...',
        edgeShapeLabel: 'شكل الحواف',
        edgeShapePlaceholder: 'مثال: مستقيم، دائري، مشطوف...',
        colorLabel: 'لون الرخام / السطح',
        colorPlaceholder: 'مثال: أبيض كرارا، رمادي، أسو...',
        colorNote: 'اكتب اسم اللون و المرجع فقط، وسيتم اقتراح اللون المناسب من طرف Graphitube.',
        colorReferenceLabel: 'مرجع اللون (صورة أو رابط – اختياري)',
        uploadImage: 'تحميل صورة',
        addLink: 'إضافة رابط',
        imageUrlLabel: 'رابط الصورة',
        imageUrlPlaceholder: 'https://example.com/marble-image.jpg',
        colorLinkLabel: 'رابط مرجع اللون',
        colorLinkPlaceholder: 'https://example.com/marble-reference',
        openingsQuestion: 'فتحات للحوض / البوتاغاز؟',
        notesLabel: 'ملاحظات إضافية',
        notesPlaceholder: 'أي ملاحظات إضافية...',
      },
      step12: {
        title: 'تفاصيل الزليج',
        subtitle: 'حدد نوع الزليج المطلوب',
        materialSource: 'مصدر المادة',
        graphitubeOption: 'من كتالوج Graphitube',
        graphitubeDescription: 'الزليج من كتالوج Graphitube',
        customOption: 'مادة مخصصة (من اختيارك)',
        customDescription: 'زليج مخصص من اختيارك',
        graphitubeRefLabel: 'رمز المادة من كتالوج Graphitube',
        graphitubeRefPlaceholder: 'مثال: REF-001',
        customWarning: 'بما أن الزليج مختار من طرفكم، لا يمكن تحديد الثمن مباشرة عبر الموقع. سيتم التواصل معكم هاتفياً لتأكيد الاختيار وتقديم عرض الثمن المناسب.',
        scopeLabel: 'نطاق الاستخدام',
        scopePlaceholder: 'مثال: غرف الاستقبال، المطبخ...',
        typeLabel: 'نوع الزليج',
        typePlaceholder: 'مثال: زليج مائي، زليج صلبي...',
        sizeLabel: 'حجم الزليج',
        sizePlaceholder: 'مثال: 30x30 سم، 40x40 سم...',
        colorLabel: 'لون الزليج',
        colorPlaceholder: 'مثال: أبيض كرارا، رمادي، أسود...',
        colorNote: 'اكتب اسم اللون أو المرجع فقط، وسيتم اقتراح اللون المناسب من طرف Graphitube.',
        colorReferenceLabel: 'مرجع اللون (صورة أو رابط – اختياري)',
        uploadImage: 'تحميل صورة',
        addLink: 'إضافة رابط',
        imageUrlLabel: 'رابط الصورة',
        imageUrlPlaceholder: 'https://example.com/marble-image.jpg',
        colorLinkLabel: 'رابط مرجع اللون',
        colorLinkPlaceholder: 'https://example.com/marble-reference',
        notesLabel: 'ملاحظات إضافية',
        notesPlaceholder: 'أي ملاحظات إضافية...',
      },
      step13: {
        title: 'تفاصيل الكهربء',
        subtitle: 'أدخل تفاصيل الأعمال الكهربائية المطلوبة',
        notesLabel: 'التفاصيل',
        notesPlaceholder: 'مثال: عدد المآخذ، نقاط الإضاءة...',
      },
      step14: {
        title: 'تفاصيل السباكة',
        subtitle: 'أدخل تفاصيل أعمال السباكة المطلوبة',
        notesLabel: 'التفاصيل',
        notesPlaceholder: 'مثال: موقع الحوض، أنابيب المياه...',
      },
      step15: {
        title: 'تفاصيل الطلاء',
        subtitle: 'أدخل تفاصيل أعمال الطلاء المطلوبة',
        notesLabel: 'التفاصيل',
        notesPlaceholder: 'مثال: الألوان المفضلة، نوع الطلاء...',
      },
      step16: {
        title: 'تفاصيل الجبس',
        subtitle: 'أدخل تفاصيل أعمال الجبس المطلوبة',
        notesLabel: 'التفاصيل',
        notesPlaceholder: 'مثال: الأسقف المستعارة، ديكورات...',
      },
      step17: {
        title: 'تصميم ثلاثي الأبعاد',
        subtitle: 'هل تريد تصميم 3D لمطبخك؟',
        question: 'هل تريد تصميم ثلاثي الأبعاد؟',
        explanation: 'التصميم الثلاثي الأبعاد يساعدك على رؤية المطبخ قبل التنفيذ',
      },
      step18: {
        title: 'ملاحظات إضافية',
        subtitle: 'هل لديك أي طلبات أو ملاحظات خاصة؟',
        label: 'ملاحظاتك',
        placeholder: 'أي تفاصيل إضافية تريد إضافتها...',
      },
      step19: {
        title: 'التأكيد النهائي',
        subtitle: 'راجع جميع المعلومات قبل الإرسال',
        reviewTitle: 'ملخص الطلب',
        submitButton: 'إرسال الطلب',
        editButton: 'تعديل',
        confirmMessage: 'تأكد من صحة جميع المعلومات قبل الإرسال',
        customerInfo: 'معلومات العميل',
        name: 'الاسم',
        phone: 'الهاتف',
        city: 'المدينة',
        projectType: 'نوع المشروع',
        dimensions: 'الأبعاد',
        length: 'الطول',
        width: 'العرض',
        height: 'الارتفاع',
        meters: 'متر',
        workScope: 'نطاق العمل',
        completeProject: 'مشروع كامل',
        wood: 'الخشب',
        marble: 'الرخام',
        tiles: 'الزليج',
        painting: 'الصباغة',
        gypsum: 'الجبس',
        decorationAndColor: 'الزخرفة واللون',
        selectedPattern: 'النمط المختار',
        selectedColor: 'اللون المختار',
        linesCount: 'خطوط',
        woodType: 'نوع الخشب',
        additionalNotes: 'ملاحظات إضافية',
        readyToSendTitle: 'جاهز للإرسال',
        readyToSendDesc: 'تأكد من مراجعة جميع المعلومات قبل إرسال الطلب. فريقنا سيتواصل معك قريباً',
      },
    },
    salonSteps: {
      titles: [
        'معلومات العميل',
        'شكل الصالون',
        'الأبعاد',
        'عناصر الخشب',
        'نوع الخشب',
        'الزخرفة',
        'اللون',
        'الملخص',
      ],
      step1: {
        title: 'معلومات العميل',
        subtitle: 'من فضلك أدخل معلوماتك الشخصية',
        fullName: 'الاسم الكامل',
        fullNamePlaceholder: 'مثال: أحمد محمد',
        phone: 'رقم الهاتف',
        phonePlaceholder: '0612345678',
        address: 'العنوان',
        addressPlaceholder: 'الشارع، الحي',
        city: 'المدينة',
        cityPlaceholder: 'مثال: الدار البيضاء',
      },
      step2: {
        title: 'شكل الصالون',
        subtitle: 'اختر الشكل الذي تفضله لصالونك',
        designLabel: 'الشكل',
        lShape: 'على شكل L',
        uShape: 'على شكل U',
        iShape: 'على شكل G',
        square: 'مربع',
        rectangularOpen: 'مستطيل مفتوح',
        rectangularClosed: 'مستطيل مغلق',
        customDesign: 'تصميم مخصص',
        uploadImage: 'تحميل صورة',
        uploadImageDesc: 'حمّل صورة لتصميمك المخصص',
        customPriceNote: 'سيتم التواصل معك لتحديد الثمن المخصص',
      },
      step3: {
        title: 'الأبعاد',
        subtitle: 'أدخل أبعاد الصالون (بالمتر)',
        length: 'الطول',
        width: 'العرض',
        metersUnit: 'متر',
        placeholder: 'مثال: 5.5',
      },
      step4: {
        title: 'عناصر الخشب',
        subtitle: 'حدد عدد القطع الخشبية المطلوبة',
        largeTables: 'طاولات كبيرة',
        sundries: 'سوندريات',
        sidePanels: 'لوحات جانبية',
        verticalShapes: 'أشكال عمودية',
        verticalCorners: 'زوايا عمودية',
        note: 'ملاحظة: تأكد من دقة العدد لتجنب أي مشاكل أثناء التنفيذ',
      },
      step5: {
        title: 'نوع الخشب',
        subtitle: 'اختر نوع الخشب ا��مفضل',
        chene: 'شين (Chêne)',
        noyer: 'نوير (Noyer)',
        laitre: 'ليتر (Laitre)',
      },
      step6: {
        title: 'الزخرفة',
        subtitle: 'اختر نمط الزخرفة المفضل',
        selectPattern: 'اختر نمط الزخرفة',
      },
      step7: {
        title: 'اللون',
        subtitle: 'اختر اللون المفضل',
        selectColor: 'اختر اللون',
      },
      step8: {
        title: 'ملخص الطلب',
        subtitle: 'راجع المعلومات قبل الإرسال',
        confirmMessage: 'تأكد من صحة جميع المعلومات قبل الإرسال',
        customerInfo: 'معلومات العميل',
        name: 'الاسم',
        phone: 'الهاتف',
        city: 'المدينة',
        projectType: 'نوع المشروع',
        dimensions: 'الأبعاد',
        length: 'الطول',
        width: 'العرض',
        height: 'الارتفاع',
        meters: 'متر',
        workScope: 'نطاق العمل',
        completeProject: 'مشروع كامل',
        wood: 'الخشب',
        marble: 'الرخام',
        tiles: 'الزليج',
        painting: 'الصباغة',
        gypsum: 'الجبس',
        decorationAndColor: 'الزخرفة واللون',
        selectedPattern: 'النمط المختار',
        selectedColor: 'اللون المختار',
        linesCount: 'خطوط',
        woodType: 'نوع الخشب',
        additionalNotes: 'ملاحظات إضافية',
        readyToSendTitle: 'جاهز للإرسال',
        readyToSendDesc: 'تأكد من مراجعة جميع المعلومات قبل إرسال الطلب. فريقنا سيتواصل معك قريباً',
      },
    },
  },

  fr: {
    common: {
      yes: 'Oui',
      no: 'Non',
      next: 'Suivant',
      back: 'Retour',
      submit: 'Envoyer la demande',
      continue: 'Continuer',
      cancel: 'Annuler',
      save: 'Enregistrer',
      loading: 'Chargement...',
      optional: 'Facultatif',
      required: 'Requis',
      backToHome: 'Retour à l\'accueil',
    },
    accessibility: {
      close: 'Fermer',
      more: 'Plus',
      morePages: 'Pages supplémentaires',
      previousSlide: 'Diapositive précédente',
      nextSlide: 'Diapositive suivante',
      toggleSidebar: 'Basculer le menu latéral',
      sidebar: 'Menu latéral',
    },
    homePage: {
      headerTitle: 'Graphitube',
      badge: 'Menuiserie sur mesure',
      welcome: 'Bienvenue chez Graphitube',
      subtitle: 'Concevez votre projet selon vos goûts',
      description: 'Choisissez le type de projet que vous souhaitez, puis suivez-nous étape par étape pour compléter les détails',
      kitchenTitle: 'Cuisine',
      kitchenDescription: 'Choisissez cette option si vous souhaitez concevoir une cuisine en bois sur mesure',
      kitchenButton: 'Commencer la conception',
      salonTitle: 'Salon',
      salonDescription: 'Choisissez cette option si vous souhaitez concevoir un salon en bois sur mesure',
      salonButton: 'Commencer la conception',
      infoNotice: 'Tous les détails seront affichés étape par étape après avoir choisi le projet, et le prix final ne sera pas affiché directement.',
      whatsappContact: 'Pour un contact rapide:',
      footerCopyright: '© 2026 Graphitube - Spécialistes en menuiserie sur mesure',
    },
    successPage: {
      thankYou: 'Merci pour votre confiance en Graphitube',
      thankYouMessage: 'Nous vous remercions du temps que vous avez consacré à remplir ce formulaire.',
      priceCalculated: 'a été calculé',
      priceWillBeStudied: 'L\'équipe Graphitube étudiera votre projet avec soin et préparera',
      finalQuote: 'le devis final',
      estimatedPrice: 'Prix estimatif',
      estimatedPriceNote: 'Ce prix est estimatif basé sur les options standard sélectionnées',
      contactSoon: 'Nous vous contacterons bientôt',
      contactSoonMessage: 'Puisque vous avez choisi des options personnalisées ou des matériaux hors catalogue, notre équipe vous contactera pour vous fournir un devis précis et détaillé.',
      importantNote: 'Note importante:',
      importantNoteText1: 'Le prix qui sera proposé est un prix estimatif, basé sur les données actuelles, tout en respectant les normes de qualité, les matériaux et les marques approuvées par Graphitube.',
      importantNoteText2: 'Tout changement dans les mesures, les matériaux, les couleurs ou la portée des travaux peut entraîner un changement du devis final.',
      whyGraphitube: 'Pourquoi Graphitube?',
      whyGraphitubeText1: 'Chez Graphitube, nous adoptons une haute qualité dans le bois, les équipements, les finitions et la méthode d\'exécution.',
      whyGraphitubeText2: 'Vous pouvez trouver des offres à des prix inférieurs, mais la différence réside dans la qualité, la durabilité et la précision de réalisation. Notre objectif est de fournir un travail durable qui reflète la valeur de votre investissement.',
      teamWillContact: 'Un membre de l\'équipe Graphitube vous contactera par téléphone ou WhatsApp pour confirmer les détails, répondre à vos questions et déterminer le délai approximatif de réalisation du projet.',
      backToHome: 'Retour à l\'accueil',
    },
    whatsapp: {
      buttonText: 'WhatsApp',
      needHelp: 'Besoin d\'aide?',
      helpMessage: 'Si vous ne comprenez pas une partie de ce formulaire, contactez-nous via WhatsApp pour vous expliquer les détails.',
      contactUs: 'Contactez-nous',
      helpTemplate: 'Bonjour, j\'ai besoin d\'aide pour: {stepName}',
      generalHelpTemplate: 'Bonjour, j\'ai besoin d\'aide pour remplir le formulaire',
    },
    progress: {
      step: 'Étape',
      of: 'sur',
      completed: 'Complété',
    },
    kitchenSteps: {
      titles: [
        'Informations client',
        'Design cuisine',
        'Dimensions',
        'Hauteur plafond',
        'Portée travaux',
        'Appareils électroménagers',
        'Équipements armoires',
        'Type de bois',
        'Système portes',
        'Éclairage',
        'Détails marbre',
        'Détails carrelage',
        'Détails électricité',
        'Détails plomberie',
        'Détails peinture',
        'Détails plâtre',
        'Design 3D',
        'Notes additionnelles',
        'Confirmation finale',
      ],
      step1: {
        title: 'Informations client',
        subtitle: 'Veuillez entrer vos informations personnelles',
        fullName: 'Nom complet',
        fullNamePlaceholder: 'Ex: Ahmed Mohamed',
        phone: 'Numéro de téléphone',
        phonePlaceholder: '0612345678',
        address: 'Adresse',
        addressPlaceholder: 'Rue, Quartier',
        city: 'Ville',
        cityPlaceholder: 'Ex: Casablanca',
      },
      step2: {
        title: 'Design de la cuisine',
        subtitle: 'Choisissez la forme que vous préférez pour votre cuisine',
        designLabel: 'Design',
        lShape: 'En L',
        uShape: 'En U',
        iShape: 'Avec îlot',
        square: 'Carré',
        rectangularOpen: 'Rectangulaire ouvert',
        rectangularClosed: 'Rectangulaire fermé',
        customDesign: 'Design personnalisé',
        uploadImage: 'Télécharger une image',
        uploadImageDesc: 'Télécharger une image pour votre design personnalisé',
        customPriceNote: 'Nous vous contacterons pour confirmer le prix personnalisé',
      },
      step3: {
        title: 'Dimensions',
        subtitle: 'Entrez les dimensions de votre cuisine (en mètres)',
        length: 'Longueur',
        width: 'Largeur',
        metersUnit: 'mètres',
        placeholder: 'Ex: 4.5',
      },
      step4: {
        title: 'Hauteur du plafond',
        subtitle: 'Les armoires atteindront-elles le plafond?',
        question: 'Voulez-vous que les armoires atteignent le plafond?',
        heightLabel: 'Hauteur du plafond (mètres)',
        heightPlaceholder: 'Ex: 2.8',
      },
      step5: {
        title: 'Portée des travaux',
        subtitle: 'Sélectionnez les travaux supplémentaires requis',
        marble: 'Marbre / Pierre',
        tiles: 'Carrelage',
        electrical: 'Électricité',
        plumbing: 'Plomberie',
        painting: 'Peinture',
        gypsum: 'Plâtre',
        marbleDesc: 'Installation et fourniture de marbre ou pierre',
        tilesDesc: 'Installation et fourniture de carrelage',
        electricalDesc: 'Travaux électriques',
        plumbingDesc: 'Travaux de plomberie',
        paintingDesc: 'Travaux de peinture',
        gypsumDesc: 'Travaux de plâtre',
      },
      step6: {
        title: 'Appareils électroménagers',
        subtitle: 'Voulez-vous la fourniture d\'appareils électroménagers?',
        none: 'Pas de fourniture',
        fromGraphitube: 'Par Graphitube',
        fromClient: 'Par le client',
        noneDesc: 'Je n\'aurai pas besoin d\'appareils',
        fromGraphitubeDesc: 'Graphitube fournira les appareils',
        fromClientDesc: 'Je fournirai les appareils moi-même',
      },
      step7: {
        title: 'Équipements des armoires',
        subtitle: 'Choisissez le type d\'équipements intérieurs pour les armoires',
        none: 'Sans équipements',
        basic: 'Équipements basiques',
        premium: 'Équipements avancés',
        noneDesc: 'Armoires vides sans ajouts',
        basicDesc: 'Équipements simples (étagères, paniers)',
        premiumDesc: 'Équipements avancés (tiroirs intelligents, mécanismes modernes)',
      },
      step8: {
        title: 'Type de bois',
        subtitle: 'Choisissez le matériau préféré pour la cuisine',
        mdf: 'MDF',
        wood: 'Bois naturel',
        customWood: 'Bois personnalisé',
        mdfDesc: 'Bois compressé haute qualité',
        woodDesc: 'Bois naturel massif',
        customWoodDesc: 'Type de bois spécial selon votre choix',
        customWoodLabel: 'Spécifiez le type de bois requis',
        customWoodPlaceholder: 'Ex: Hêtre, Chêne...',
      },
      step9: {
        title: 'Système de portes',
        subtitle: 'Choisissez le système d\'ouverture et de fermeture des armoires',
        none: 'Standard',
        blum: 'Blum',
        other: 'Autre système',
        noneDesc: 'Charnières standard',
        blumDesc: 'Système Blum autrichien (fermeture douce)',
        otherDesc: 'Système personnalisé de votre choix',
        otherLabel: 'Spécifiez le système requis',
        otherPlaceholder: 'Ex: Hettich, Hafele...',
      },
      step10: {
        title: 'Éclairage',
        subtitle: 'Voulez-vous ajouter un éclairage LED?',
        none: 'Sans éclairage',
        basic: 'Éclairage basique',
        advanced: 'Éclairage avancé',
        noneDesc: 'Sans éclairage intérieur',
        basicDesc: 'Éclairage LED simple',
        advancedDesc: 'Éclairage LED intelligent avec contrôle',
      },
      step11: {
        title: 'Détails marbre',
        subtitle: 'Spécifiez le type de marbre requis',
        materialSource: 'Source du matériau',
        graphitubeOption: 'De Graphitube',
        graphitubeDescription: 'Graphitube fournira le marbre spécifié',
        customOption: 'Personnalisé',
        customDescription: 'Le client fournira le marbre spécifié',
        graphitubeRefLabel: 'Référence du marbre de Graphitube',
        graphitubeRefPlaceholder: 'Ex: Marbre Carrare, Granit...',
        customWarning: 'Assurez-vous que le marbre spécifié est disponible si vous choisissez personnalisé',
        surfaceTypeLabel: 'Type de surface',
        surfaceTypePlaceholder: 'Ex: Surface lisse, surface boisée...',
        thicknessLabel: 'Épaisseur',
        thicknessPlaceholder: 'Ex: 20 mm, 30 mm...',
        edgeShapeLabel: 'Forme de bord',
        edgeShapePlaceholder: 'Ex: Bord droit, bord arrondi...',
        colorLabel: 'Couleur',
        colorPlaceholder: 'Ex: Blanc, Noir...',
        colorNote: 'Vous pouvez choisir une autre couleur si la couleur spécifiée n\'est pas disponible',
        colorReferenceLabel: 'Référence de couleur',
        uploadImage: 'Télécharger une image',
        addLink: 'Ajouter un lien',
        imageUrlLabel: 'Lien de l\'image',
        imageUrlPlaceholder: 'Ex: https://example.com/image.jpg',
        colorLinkLabel: 'Lien de couleur',
        colorLinkPlaceholder: 'Ex: https://example.com/color.jpg',
        openingsQuestion: 'Avez-vous des ouvertures spéciales?',
        notesLabel: 'Notes additionnelles',
        notesPlaceholder: 'Détails supplémentaires sur le marbre',
      },
      step12: {
        title: 'Détails carrelage',
        subtitle: 'Spécifiez le type de carrelage requis',
        materialSource: 'Source du matériau',
        graphitubeOption: 'De Graphitube',
        graphitubeDescription: 'Graphitube fournira le carrelage spécifié',
        customOption: 'Personnalisé',
        customDescription: 'Le client fournira le carrelage spécifié',
        graphitubeRefLabel: 'Référence du carrelage de Graphitube',
        graphitubeRefPlaceholder: 'Ex: Carrelage espagnol, marocain...',
        customWarning: 'Assurez-vous que le carrelage spécifié est disponible si vous choisissez personnalisé',
        scopeLabel: 'Portée d\'utilisation',
        scopePlaceholder: 'Ex: Salles d\'attente, cuisines...',
        typeLabel: 'Type de carrelage',
        typePlaceholder: 'Ex: Carrelage en céramique, carrelage en pierre...',
        sizeLabel: 'Taille du carrelage',
        sizePlaceholder: 'Ex: 30x30 cm, 40x40 cm...',
        colorLabel: 'Couleur du carrelage',
        colorPlaceholder: 'Ex: Blanc, Gris, Noir...',
        colorNote: 'Vous pouvez choisir une autre couleur si la couleur spécifiée n\'est pas disponible',
        colorReferenceLabel: 'Référence de couleur',
        uploadImage: 'Télécharger une image',
        addLink: 'Ajouter un lien',
        imageUrlLabel: 'Lien de l\'image',
        imageUrlPlaceholder: 'Ex: https://example.com/image.jpg',
        colorLinkLabel: 'Lien de couleur',
        colorLinkPlaceholder: 'Ex: https://example.com/color.jpg',
        notesLabel: 'Notes additionnelles',
        notesPlaceholder: 'Détails supplémentaires sur le carrelage',
      },
      step13: {
        title: 'Détails électricité',
        subtitle: 'Entrez les détails des travaux électriques requis',
        notesLabel: 'Détails',
        notesPlaceholder: 'Ex: Nombre de prises, points lumineux...',
      },
      step14: {
        title: 'Détails plomberie',
        subtitle: 'Entrez les détails des travaux de plomberie requis',
        notesLabel: 'Détails',
        notesPlaceholder: 'Ex: Emplacement évier, tuyaux eau...',
      },
      step15: {
        title: 'Détails peinture',
        subtitle: 'Entrez les détails des travaux de peinture requis',
        notesLabel: 'Détails',
        notesPlaceholder: 'Ex: Couleurs préférées, type peinture...',
      },
      step16: {
        title: 'Détails plâtre',
        subtitle: 'Entrez les détails des travaux de plâtre requis',
        notesLabel: 'Détails',
        notesPlaceholder: 'Ex: Faux plafonds, décorations...',
      },
      step17: {
        title: 'Design 3D',
        subtitle: 'Voulez-vous un design 3D de votre cuisine?',
        question: 'Voulez-vous un design en trois dimensions?',
        explanation: 'Le design 3D vous aide à visualiser la cuisine avant l\'exécution',
      },
      step18: {
        title: 'Notes additionnelles',
        subtitle: 'Avez-vous des demandes ou notes spéciales?',
        label: 'Vos notes',
        placeholder: 'Détails supplémentaires à ajouter...',
      },
      step19: {
        title: 'Confirmation finale',
        subtitle: 'Vérifiez toutes les informations avant l\'envoi',
        reviewTitle: 'Résumé de la demande',
        submitButton: 'Envoyer la demande',
        editButton: 'Modifier',
        confirmMessage: 'Assurez-vous de l\'exactitude de toutes les informations avant l\'envoi',
        customerInfo: 'Informations client',
        name: 'Nom',
        phone: 'Téléphone',
        city: 'Ville',
        projectType: 'Type de projet',
        dimensions: 'Dimensions',
        length: 'Longueur',
        width: 'Largeur',
        height: 'Hauteur',
        meters: 'mètres',
        workScope: 'Portée des travaux',
        completeProject: 'Projet complet',
        wood: 'Bois',
        marble: 'Marbre',
        tiles: 'Carrelage',
        painting: 'Peinture',
        gypsum: 'Plâtre',
        decorationAndColor: 'Décoration et couleur',
        selectedPattern: 'Motif sélectionné',
        selectedColor: 'Couleur sélectionnée',
        linesCount: 'Lignes',
        woodType: 'Type de bois',
        additionalNotes: 'Notes supplémentaires',
        readyToSendTitle: 'Prêt à envoyer',
        readyToSendDesc: 'Assurez-vous de vérifier toutes les informations avant d\'envoyer la demande. Notre équipe vous contactera bientôt',
      },
    },
    salonSteps: {
      titles: [
        'Informations client',
        'Forme du salon',
        'Dimensions',
        'Éléments bois',
        'Type de bois',
        'Décoration',
        'Couleur',
        'Résumé',
      ],
      step1: {
        title: 'Informations client',
        subtitle: 'Veuillez entrer vos informations personnelles',
        fullName: 'Nom complet',
        fullNamePlaceholder: 'Ex: Ahmed Mohamed',
        phone: 'Numéro de téléphone',
        phonePlaceholder: '0612345678',
        address: 'Adresse',
        addressPlaceholder: 'Rue, Quartier',
        city: 'Ville',
        cityPlaceholder: 'Ex: Casablanca',
      },
      step2: {
        title: 'Forme du salon',
        subtitle: 'Choisissez la forme que vous préférez pour votre salon',
        designLabel: 'Forme',
        lShape: 'En forme L',
        uShape: 'En forme U',
        iShape: 'Droit (I)',
        square: 'Carré',
        rectangularOpen: 'Rectangulaire ouvert',
        rectangularClosed: 'Rectangulaire fermé',
        customDesign: 'Design personnalisé',
        uploadImage: 'Télécharger image',
        uploadImageDesc: 'Téléchargez une image de votre design personnalisé',
        customPriceNote: 'Nous vous contacterons pour déterminer le prix personnalisé',
      },
      step3: {
        title: 'Dimensions',
        subtitle: 'Entrez les dimensions du salon (en mètres)',
        length: 'Longueur',
        width: 'Largeur',
        metersUnit: 'mètres',
        placeholder: 'Ex: 5.5',
      },
      step4: {
        title: 'Éléments en bois',
        subtitle: 'Déterminez le nombre de pièces en bois requises',
        largeTables: 'Grandes tables',
        sundries: 'Accessoires',
        sidePanels: 'Panneaux latéraux',
        verticalShapes: 'Formes verticales',
        verticalCorners: 'Coins verticaux',
        note: 'Note: Assurez-vous de l\\'exactitude du nombre pour éviter tout problème lors de la réalisation',
      },
      step5: {
        title: 'Type de bois',
        subtitle: 'Choisissez le type de bois préféré',
        chene: 'Chêne',
        noyer: 'Noyer',
        laitre: 'Hêtre',
      },
      step6: {
        title: 'Décoration',
        subtitle: 'Choisissez le motif de décoration préféré',
        selectPattern: 'Sélectionnez le motif de décoration',
      },
      step7: {
        title: 'Couleur',
        subtitle: 'Choisissez la couleur préférée',
        selectColor: 'Sélectionnez la couleur',
      },
      step8: {
        title: 'Résumé de la demande',
        subtitle: 'Vérifiez les informations avant l\\'envoi',
        confirmMessage: 'Assurez-vous de l\\'exactitude de toutes les informations avant l\\'envoi',
        customerInfo: 'Informations client',
        name: 'Nom',
        phone: 'Téléphone',
        city: 'Ville',
        projectType: 'Type de projet',
        dimensions: 'Dimensions',
        length: 'Longueur',
        width: 'Largeur',
        height: 'Hauteur',
        meters: 'mètres',
        workScope: 'Portée des travaux',
        completeProject: 'Projet complet',
        wood: 'Bois',
        marble: 'Marbre',
        tiles: 'Carrelage',
        painting: 'Peinture',
        gypsum: 'Plâtre',
        decorationAndColor: 'Décoration et couleur',
        selectedPattern: 'Motif sélectionné',
        selectedColor: 'Couleur sélectionnée',
        linesCount: 'Lignes',
        woodType: 'Type de bois',
        additionalNotes: 'Notes supplémentaires',
        readyToSendTitle: 'Prêt à envoyer',
        readyToSendDesc: 'Assurez-vous de vérifier toutes les informations avant d\\'envoyer la demande. Notre équipe vous contactera bientôt',
      },
    },
  },

  darija: {
    common: {
      yes: 'آه',
      no: 'لا',
      next: 'التالي',
      back: 'رجع',
      submit: 'صيفط الطلب',
      continue: 'كمّل',
      cancel: 'إلغاء',
      save: 'سجّل',
      loading: 'كيتحمّل...',
      optional: 'اختياري',
      required: 'مطلوب',
      backToHome: 'رجع للصفحة الرئيسية',
    },
    accessibility: {
      close: 'إغلاق',
      more: 'المزيد',
      morePages: 'صفحات إضافية',
      previousSlide: 'الشريحة السبقة',
      nextSlide: 'الشريحة التالية',
      toggleSidebar: 'تبديل الشريط الجانبي',
      sidebar: 'الشريط الجانبي',
    },
    homePage: {
      headerTitle: 'Graphitube',
      badge: 'نجارة ديال لخشب على القياس',
      welcome: 'مرحبا بيك فـ Graphitube',
      subtitle: 'صمّم البروجي ديالك على ذوقك',
      description: 'اختار نوع البروجي اللي بغيتي، ومن بعد كمّل معانا خطوة ب خطوة باش نكملو التفاصيل',
      kitchenTitle: 'كوزينة',
      kitchenDescription: 'اختار هاد الشي إلا بغيتي تصمم كوزينة ديال لخشب على القياس',
      kitchenButton: 'ابدا تصميم الكوزينة',
      salonTitle: 'صالون',
      salonDescription: 'اختار هاد الشي إلا بغيتي تصمم صالون ديال لخشب على القياس',
      salonButton: 'ابدا تصميم الصالون',
      infoNotice: 'غادي نبيّنو جميع التفاصيل خطوة ب خطوة من بعد ما تختار البروجي، وماغاديش نبيّنو الثمن النهائي مباشرة.',
      whatsappContact: 'باش تتواصل معانا بزربة:',
      footerCopyright: '© 2026 Graphitube - متخصصين فالنجارة ديال لخشب على القياس',
    },
    successPage: {
      thankYou: 'شكراً على الثقة ديالكوم فـ Graphitube',
      thankYouMessage: 'كنشكروكوم على الوقت اللي خصصتوه باش تعمرو هاد الفورميلير.',
      priceCalculated: 'تحسب',
      priceWillBeStudied: 'ليكيب ديال Graphitube غادي يدرس البروجي ديالك مزيان وغادي يوجّد',
      finalQuote: 'عرض الثمن النهائي',
      estimatedPrice: 'الثمن التقديري',
      estimatedPriceNote: 'هاد الثمن تقديري بناءً على الخيارات القياسية اللي اخترتي',
      contactSoon: 'غادي نتصلو بيك قريب',
      contactSoonMessage: 'بما أنك اخترتي خيارات مخصصة أو مواد من برّا الكاطالوك، ليكيب ديالنا غادي يتواصل معاك باش يعطيك عرض ثمن دقيق ومفصّل.',
      importantNote: 'ملاحظة مهمة:',
      importantNoteText1: 'الثمن اللي غادي يتقترح هو ثمن تقديري، مبني على المعطيات الحالية، مع احترام معايير الجودة والمواد والماركات المعتمدة من طرف Graphitube.',
      importantNoteText2: 'أي تبديل فالقياسات، المواد، الألوان، أو نطاق الخدمة ممكن يؤدي لتبديل فعرض الثمن النهائي.',
      whyGraphitube: 'علاش Graphitube؟',
      whyGraphitubeText1: 'حنا فـ Graphitube كنعتمدو جودة عالية فلخشب، التجهيزات، التشطيب، وطريقة التنفيذ.',
      whyGraphitubeText2: 'ممكن تلقى عروض بثمن أقل، لكن الفرق كيكون فالجودة، المتانة، والدقة فالإنجاز. الهدف ديالنا هو نقدمو خدمة اللي تدوم وكتعكس القيمة ديال الاستثمار ديالك.',
      teamWillContact: 'غادي يتواصل معاكوم واحد من ليكيب ديال Graphitube عبر التيليفون أو واتساب باش يأكد التفاصيل، يجاوب على الأسئلة ديالكوم، ويحدد المدة التقريبية ديال إنجاز البروجي.',
      backToHome: 'رجع للصفحة الرئيسية',
    },
    whatsapp: {
      buttonText: 'واتساب',
      needHelp: 'بغيتي مساعدة؟',
      helpMessage: 'إلا ما فهمتيش شي حاجة فهاد الفورميلير، تواصل معانا عبر واتساب باش نوضحو ليك التفاصيل.',
      contactUs: 'تواصل معانا',
      helpTemplate: 'السلام، بغيت مساعدة فـ: {stepName}',
      generalHelpTemplate: 'السلام، بغيت مساعدة باش نعمر الفورميلير',
    },
    progress: {
      step: 'الخطوة',
      of: 'من',
      completed: 'كمل',
    },
    kitchenSteps: {
      titles: [
        'معلومات الكليان',
        'تصميم الكوزينة',
        'القياسات',
        'طول السقف',
        'الخدمات',
        'الأجهزة',
        'معدات الخزانات',
        'نوع لخشب',
        'نظام البيبان',
        'الضو',
        'تفاصيل الرخام',
        'تفاصيل الزليج',
        'تفاصيل الضو',
        'تفاصيل الما',
        'تفاصيل الصباغة',
        'تفاصيل الجبس',
        'التصميم 3D',
        'ملاحظات زايدة',
        'التأكيد النهائي',
      ],
      step1: {
        title: 'معلومات الكليان',
        subtitle: 'عافاك دخّل المعلومات ديالك',
        fullName: 'السمية الكاملة',
        fullNamePlaceholder: 'مثلاً: أحمد محمد',
        phone: 'رقم التيليفون',
        phonePlaceholder: '0612345678',
        address: 'العنوان',
        addressPlaceholder: 'الزنقة، الحي',
        city: 'المدينة',
        cityPlaceholder: 'مثلاً: الدار البيضاء',
      },
      step2: {
        title: 'تصميم الكوزينة',
        subtitle: 'اختر الشكل اللي بغيتي للكوزينة ديالك',
        designLabel: 'التصميم',
        lShape: 'على شكل L',
        uShape: 'على شكل U',
        iShape: 'مع جزيرة',
        square: 'مربع',
        rectangularOpen: 'مستطيل مفتوح',
        rectangularClosed: 'مستطيل مغلق',
        customDesign: 'تصميم مخصص',
        uploadImage: 'تحميل صورة',
        uploadImageDesc: 'تحميل صورة لتصميمك المخصص',
        customPriceNote: 'سيتم التواصل معك لتحديد الثمن المخصص',
      },
      step3: {
        title: 'القياسات',
        subtitle: 'دخّل القياسات ديال الكوزينة (بالمترو)',
        length: 'الطول',
        width: 'العرض',
        metersUnit: 'مترو',
        placeholder: 'مثلاً: 4.5',
      },
      step4: {
        title: 'طول السقف',
        subtitle: 'واش الخزانات غادي يوصلو للسقف؟',
        question: 'واش بغيتي الخزانات يوصلو للسقف؟',
        heightLabel: 'طول السقف (مترو)',
        heightPlaceholder: 'مثلاً: 2.8',
      },
      step5: {
        title: 'الخدمات',
        subtitle: 'اختار الخدمات الزايدة اللي بغيتي',
        marble: 'رخام / حجر',
        tiles: 'زليج',
        electrical: 'ضو (كهرباء)',
        plumbing: 'ما (سباكة)',
        painting: 'صباغة',
        gypsum: 'جبس',
        marbleDesc: 'تركيب وتوريد الرخام أو الحجر',
        tilesDesc: 'تركيب وتوريد الزليج',
        electricalDesc: 'خدمة الضو والكهرباء',
        plumbingDesc: 'خدمة الما والسباكة',
        paintingDesc: 'خدمة الصباغة',
        gypsumDesc: 'خدمة الجبس',
      },
      step6: {
        title: 'الأجهزة',
        subtitle: 'واش بغيتي توريد الأجهزة الكهربائية؟',
        none: 'بلا توريد',
        fromGraphitube: 'من Graphitube',
        fromClient: 'من الكليان',
        noneDesc: 'ماغاديش نحتاج أجهزة',
        fromGraphitubeDesc: 'Graphitube غادي يوفر الأجهزة',
        fromClientDesc: 'أنا غادي نجيب الأجهزة',
      },
      step7: {
        title: 'معدات الخزانات',
        subtitle: 'اختار نوع المعدات اللي بغيتي داخل الخزانات',
        none: 'بلا معدات',
        basic: 'معدات بسيطة',
        premium: 'معدات متقدمة',
        noneDesc: 'خزانات فارغين بلا زيادة',
        basicDesc: 'معدات بسيطة (رفوف، سلال)',
        premiumDesc: 'معدات متقدمة (أدراج ذكية، آليات حديثة)',
      },
      step8: {
        title: 'نوع لخشب',
        subtitle: 'اختار المادة اللي بغيتي للكوزينة',
        mdf: 'MDF',
        wood: 'خشب طبيعي',
        customWood: 'خشب خاص',
        mdfDesc: 'خشب مضغوط جودة عالية',
        woodDesc: 'خشب طبيعي صلب',
        customWoodDesc: 'نوع خشب خاص على حساب ذوقك',
        customWoodLabel: 'حدد نوع لخشب اللي بغيتي',
        customWoodPlaceholder: 'مثلاً: خشب الزان، البلوط...',
      },
      step9: {
        title: 'نظام البيبان',
        subtitle: 'اختار نظام فتح وسد الخزانات',
        none: 'عادي',
        blum: 'Blum',
        other: 'نظام آخر',
        noneDesc: 'مفصلات عادية',
        blumDesc: 'نظام Blum النمساوي (إغلاق ناعم)',
        otherDesc: 'نظام خاص على حساب اختيارك',
        otherLabel: 'حدد النظام اللي بغيتي',
        otherPlaceholder: 'مثلاً: Hettich, Hafele...',
      },
      step10: {
        title: 'الضو',
        subtitle: 'واش بغيتي تزيد ضو LED؟',
        none: 'بلا ضو',
        basic: 'ضو بسيط',
        advanced: 'ضو متقدم',
        noneDesc: 'بلا ضو من الداخل',
        basicDesc: 'ضو LED بسيط',
        advancedDesc: 'ضو LED ذكي مع تحكم',
      },
      step11: {
        title: 'تفاصيل الرخام',
        subtitle: 'حدد نوع الرخام المطلوب',
        materialSource: 'مصدر المادة',
        graphitubeOption: 'من كتالوج Graphitube',
        graphitubeDescription: 'الرخام من كتالوج Graphitube',
        customOption: 'مادة مخصصة (من اختيارك)',
        customDescription: 'رخام مخصص من اختيارك',
        graphitubeRefLabel: 'رمز المادة من كتالوج Graphitube',
        graphitubeRefPlaceholder: 'مثال: REF-001',
        customWarning: 'بما أن الرخام مختار من طرفكم، لا يمكن تحديد الثمن مباشرة عبر الموقع. سيتم التواصل معكم هاتفياً لتأكيد الاختيار وتقديم عرض الثمن المناسب.',
        surfaceTypeLabel: 'نوع السطح',
        surfaceTypePlaceholder: 'مثال: رخام، كوارتز، جرانيت...',
        thicknessLabel: 'سمك السطح',
        thicknessPlaceholder: 'مثال: 2 سم، 3 سم...',
        edgeShapeLabel: 'شكل الحواف',
        edgeShapePlaceholder: 'مثال: مستقيم، دائري، مشطوف...',
        colorLabel: 'لون الرخام / السطح',
        colorPlaceholder: 'مثال: أبيض كرارا، رمادي، أسود...',
        colorNote: 'اكتب اسم اللون أو المرجع فقط، وسيتم اقتراح اللون المناسب من طرف Graphitube.',
        colorReferenceLabel: 'مرجع اللون (صورة أو رابط – اختياري)',
        uploadImage: 'تحميل صورة',
        addLink: 'إضافة رابط',
        imageUrlLabel: 'رابط الصورة',
        imageUrlPlaceholder: 'https://example.com/marble-image.jpg',
        colorLinkLabel: 'رابط مرجع اللون',
        colorLinkPlaceholder: 'https://example.com/marble-reference',
        openingsQuestion: 'فتحات للحوض / البوتاغاز؟',
        notesLabel: 'ملاحظات إضافية',
        notesPlaceholder: 'أي ملاحظات إضافية...',
      },
      step12: {
        title: 'تفاصيل الزليج',
        subtitle: 'حدد نوع الزليج المطلوب',
        materialSource: 'مصدر المادة',
        graphitubeOption: 'من كتالوج Graphitube',
        graphitubeDescription: 'الزليج من كتالوج Graphitube',
        customOption: 'مادة مخصصة (من اختيارك)',
        customDescription: 'زليج مخصص من اختيارك',
        graphitubeRefLabel: 'رمز المادة من كتالوج Graphitube',
        graphitubeRefPlaceholder: 'مثال: REF-001',
        customWarning: 'بما أن الزليج مختار من طرفكم، لا يمكن تحديد الثمن مباشرة عبر الموقع. سيتم التواصل معكم هاتفياً لتأكيد الاختيار وتقديم عرض الثمن المناسب.',
        scopeLabel: 'نطاق الاستخدام',
        scopePlaceholder: 'مثال: غرف الاستقبال، المطبخ...',
        typeLabel: 'نوع الزليج',
        typePlaceholder: 'مثال: زليج مائي، زليج صلبي...',
        sizeLabel: 'حجم الزليج',
        sizePlaceholder: 'مثال: 30x30 سم، 40x40 سم...',
        colorLabel: 'لون الزليج',
        colorPlaceholder: 'مثال: أبيض كرارا، رمادي، أسود...',
        colorNote: 'اكتب اسم اللون أو المرجع فقط، وسيتم اقتراح اللون المناسب من طرف Graphitube.',
        colorReferenceLabel: 'مرجع اللون (صورة أو رابط – اختياري)',
        uploadImage: 'تحميل صورة',
        addLink: 'إضافة رابط',
        imageUrlLabel: 'رابط الصورة',
        imageUrlPlaceholder: 'https://example.com/marble-image.jpg',
        colorLinkLabel: 'رابط مرجع اللون',
        colorLinkPlaceholder: 'https://example.com/marble-reference',
        notesLabel: 'ملاحظات إضافية',
        notesPlaceholder: 'أي ملاحظات إضافية...',
      },
      step13: {
        title: 'تفاصيل الكهربء',
        subtitle: 'أدخل تفاصيل الأعمال الكهربائية المطلوبة',
        notesLabel: 'التفاصيل',
        notesPlaceholder: 'مثال: عدد المآخذ، نقاط الإضاءة...',
      },
      step14: {
        title: 'تفاصيل السباكة',
        subtitle: 'أدخل تفاصيل أعمال السباكة المطلوبة',
        notesLabel: 'التفاصيل',
        notesPlaceholder: 'مثال: موقع الحوض، أنابيب المياه...',
      },
      step15: {
        title: 'تفاصيل الطلاء',
        subtitle: 'أدخل تفاصيل أعمال الطلاء المطلوبة',
        notesLabel: 'التفاصيل',
        notesPlaceholder: 'مثال: الألوان المفضلة، نوع الطلاء...',
      },
      step16: {
        title: 'تفاصيل الجبس',
        subtitle: 'أدخل تفاصيل أعمال الجبس المطلوبة',
        notesLabel: 'التفاصيل',
        notesPlaceholder: 'مثال: الأسقف المستعارة، ديكورات...',
      },
      step17: {
        title: 'التصميم 3D',
        subtitle: 'واش بغيتي تصميم 3D للكوزينة ديالك؟',
        question: 'اش بغيتي تصميم ثلاثي الأبعاد؟',
        explanation: 'التصميم 3D كيعاونك تشوف الكوزينة قبل ما تبدا',
      },
      step18: {
        title: 'ملاحظات زايدة',
        subtitle: 'واش عندك شي طلبات أو ملاحظات خاصة؟',
        label: 'الملاحظات ديالك',
        placeholder: 'أي تفاصيل زايدة بغيتي تزيدها...',
      },
      step19: {
        title: 'التأكيد النهائي',
        subtitle: 'راجع جميع المعلومات قبل ما تصيفط',
        reviewTitle: 'ملخص الطلب',
        submitButton: 'صيفط الطلب',
        editButton: 'بدّل',
        confirmMessage: 'تأكد من صحة جميع المعلومات قبل ما تصيفط',
        customerInfo: 'معلومات العميل',
        name: 'الاسم',
        phone: 'الهاتف',
        city: 'المدينة',
        projectType: 'نوع المشروع',
        dimensions: 'الأبعاد',
        length: 'الطول',
        width: 'العرض',
        height: 'الارتفاع',
        meters: 'متر',
        workScope: 'نطاق العمل',
        completeProject: 'مشروع كامل',
        wood: 'الخشب',
        marble: 'الرخام',
        tiles: 'الزليج',
        painting: 'الصباغة',
        gypsum: 'الجبس',
        decorationAndColor: 'الزخرفة واللون',
        selectedPattern: 'النمط المختار',
        selectedColor: 'اللون المختار',
        linesCount: 'خطوط',
        woodType: 'نوع الخشب',
        additionalNotes: 'ملاحظات إضافية',
        readyToSendTitle: 'جاهز للإرسال',
        readyToSendDesc: 'تأكد من مراجعة جميع المعلومات قبل إرسال الطلب. فريقنا سيتواصل معك قريباً',
      },
    },
    salonSteps: {
      titles: [
        'معلومات الكليان',
        'شكل الصالون',
        'القياسات',
        'عناصر لخشب',
        'نوع لخشب',
        'الزخرفة',
        'اللون',
        'الملخص',
      ],
      step1: {
        title: 'معلومات الكليان',
        subtitle: 'عافاك دخّل المعلومات ديالك',
        fullName: 'السمية الكاملة',
        fullNamePlaceholder: 'مثلاً: أحمد محمد',
        phone: 'رقم التيليفون',
        phonePlaceholder: '0612345678',
        address: 'العنوان',
        addressPlaceholder: 'الزنقة، الحي',
        city: 'المدينة',
        cityPlaceholder: 'مثلاً: الدار البيضاء',
      },
      step2: {
        title: 'شكل الصالون',
        subtitle: 'اختار الشكل اللي بغيتي للصالون ديالك',
        designLabel: 'الشكل',
        lShape: 'على شكل L',
        uShape: 'على شكل U',
        iShape: 'على شكل G',
        square: 'مربع',
        rectangularOpen: 'مستطيل مفتوح',
        rectangularClosed: 'مستطيل مغلق',
        customDesign: 'تصميم خاص',
        uploadImage: 'تحميل صورة',
        uploadImageDesc: 'حمّل صورة للتصميم ديالك',
        customPriceNote: 'غادي نتواصلو معاك باش نحددو الثمن',
      },
      step3: {
        title: 'القياسات',
        subtitle: 'دخّل القياسات ديال الصالون (بالمتر)',
        length: 'الطول',
        width: 'العرض',
        metersUnit: 'متر',
        placeholder: 'مثلاً: 5.5',
      },
      step4: {
        title: 'عناصر لخشب',
        subtitle: 'حدد شحال من القطع ديال لخشب بغيتي',
        largeTables: 'طاولات كبيرة',
        sundries: 'سوندريات',
        sidePanels: 'لوحات جانبية',
        verticalShapes: 'أشكال واقفة',
        verticalCorners: 'زوايا واقفة',
        note: 'ملاحظة: تأكد من العدد مزيان باش ماتكونش مشاكل فالتنفيذ',
      },
      step5: {
        title: 'نوع لخشب',
        subtitle: 'اختار نوع لخشب الل�� بغيتي',
        chene: 'شين (Chêne)',
        noyer: 'نوير (Noyer)',
        laitre: 'ليتر (Laitre)',
      },
      step6: {
        title: 'الزخرفة',
        subtitle: 'اختار النموذج ديال الزخرفة اللي بغيتي',
        selectPattern: 'اختار نموذج الزخرفة',
      },
      step7: {
        title: 'اللون',
        subtitle: 'اختار اللون اللي بغيتي',
        selectColor: 'اختار اللون',
      },
      step8: {
        title: 'ملخص الطلب',
        subtitle: 'راجع المعلومات قبل الإرسال',
        confirmMessage: 'تأكد من صحة جميع المعلومات قبل الإرسال',
        customerInfo: 'معلومات الكليان',
        name: 'الاسم',
        phone: 'التيليفون',
        city: 'المدينة',
        projectType: 'نوع البروجي',
        dimensions: 'القياسات',
        length: 'الطول',
        width: 'العرض',
        height: 'الارتفاع',
        meters: 'مترو',
        workScope: 'الخدمات',
        completeProject: 'بروجي كامل',
        wood: 'لخشب',
        marble: 'الرخام',
        tiles: 'الزليج',
        painting: 'الصباغة',
        gypsum: 'الجبس',
        decorationAndColor: 'الزخرفة واللون',
        selectedPattern: 'النموذج المختار',
        selectedColor: 'اللون المختار',
        linesCount: 'خطوط',
        woodType: 'نوع لخشب',
        additionalNotes: 'ملاحظات زايدة',
        readyToSendTitle: 'جاهز للإرسال',
        readyToSendDesc: 'تأكد من مراجعة جميع المعلومات قبل ما تصيفط الطلب. ليكيب ديالنا غادي يتواصل معاك قريب',
      },
    },
  },
};