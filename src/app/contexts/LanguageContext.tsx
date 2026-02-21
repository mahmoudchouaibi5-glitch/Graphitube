import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'ar' | 'fr' | 'darija';

export interface Translations {
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
    tip: string;
    note: string;
    importantNote: string;
    currency: string;
    helpText: string;
    whatsappNumber: string;
  };
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
  successPage: {
    thankYou: string;
    thankYouMessage: string;
    requestReceived: string;
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
    orderSummary: string;
    projectType: string;
    kitchen: string;
    salon: string;
    customerName: string;
    yourNotes: string;
    whyGraphitube: string;
    whyGraphitubeSubtitle: string;
    whyGraphitubeText1: string;
    whyGraphitubeText2: string;
    quality: string;
    qualityDesc: string;
    experience: string;
    experienceDesc: string;
    guarantee: string;
    guaranteeDesc: string;
    team: string;
    teamDesc: string;
    customization: string;
    customizationDesc: string;
    pricing: string;
    pricingDesc: string;
    nextSteps: string;
    teamWillContact: string;
    within24Hours: string;
    backToHome: string;
    whatHappensNext: string;
    step1Title: string;
    step1Description: string;
    step2Title: string;
    step2Description: string;
    step3Title: string;
    step3Description: string;
    contactTitle: string;
    contactDescription: string;
  };
  whatsapp: {
    buttonText: string;
    needHelp: string;
    helpMessage: string;
    contactUs: string;
    helpTemplate: string;
    generalHelpTemplate: string;
  };
  progress: {
    step: string;
    of: string;
    completed: string;
  };
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
      straight: string;
      straightDesc: string;
      lShape: string;
      lShapeDesc: string;
      uShape: string;
      uShapeDesc: string;
      gShape: string;
      gShapeDesc: string;
      island: string;
      islandDesc: string;
      other: string;
      otherDesc: string;
      customLabel: string;
      customPlaceholder: string;
      customNote: string;
    };
    step3: {
      title: string;
      subtitle: string;
      note: string;
      straightLength: string;
      side1: string;
      side2: string;
      side3: string;
      side4: string;
      gExtension: string;
      kitchenLength: string;
      islandDimensions: string;
      islandLength: string;
      islandWidth: string;
      placeholder: string;
      meters: string;
    };
    step4: {
      title: string;
      subtitle: string;
      reachesCeilingQ: string;
      yesReaches: string;
      yesReachesDesc: string;
      noReaches: string;
      noReachesDesc: string;
      totalHeightLabel: string;
      totalHeightPlaceholder: string;
      heightNote: string;
      ceilingTypeQ: string;
      flat: string;
      flatDesc: string;
      uneven: string;
      unevenDesc: string;
      unevenNote: string;
      unevenTitle: string;
      unevenSubtitle: string;
      highestPoint: string;
      lowestPoint: string;
      generalNote: string;
    };
    step5: {
      title: string;
      subtitle: string;
      completeProject: string;
      completeProjectDesc: string;
      orChoose: string;
      wood: string;
      marble: string;
      tiles: string;
      electrical: string;
      plumbing: string;
      painting: string;
      gypsum: string;
    };
    step6: {
      title: string;
      subtitle: string;
      cooking: string;
      electricOven: string;
      electricOvenDesc: string;
      microwave: string;
      microwaveDesc: string;
      stove: string;
      stoveDesc: string;
      pizzaOven: string;
      pizzaOvenDesc: string;
      hood: string;
      hoodDesc: string;
      cooling: string;
      fridge: string;
      fridgeDesc: string;
      freezer: string;
      freezerDesc: string;
      others: string;
      waterHeater: string;
      waterHeaterDesc: string;
      coffeeMachine: string;
      coffeeMachineDesc: string;
      dishwasher: string;
      dishwasherDesc: string;
      washingMachine: string;
      washingMachineDesc: string;
      tapWithFilter: string;
      tapWithFilterDesc: string;
      singleSink: string;
      singleSinkDesc: string;
      doubleSink: string;
      doubleSinkDesc: string;
      faucet: string;
      faucetDesc: string;
      soapDispenser: string;
      soapDispenserDesc: string;
      waterAndSink: string;
      noteTitle: string;
      noteText: string;
    };
    step7: {
      title: string;
      subtitle: string;
      pullOutDrawers: string;
      pullOutDrawersDesc: string;
      softClose: string;
      softCloseDesc: string;
      cornerSolutions: string;
      cornerSolutionsDesc: string;
      tallUnitOrganizers: string;
      tallUnitOrganizersDesc: string;
      spiceRacks: string;
      spiceRacksDesc: string;
      binSystems: string;
      binSystemsDesc: string;
      cutleryTrays: string;
      cutleryTraysDesc: string;
      plateRacks: string;
      plateRacksDesc: string;
    };
    step8: {
      title: string;
      subtitle: string;
      melamine: string;
      melamineDesc: string;
      mdf: string;
      mdfDesc: string;
      hdf: string;
      hdfDesc: string;
      multiplex: string;
      multiplexDesc: string;
      natural: string;
      naturalDesc: string;
      tip: string;
    };
    step9: {
      title: string;
      subtitle: string;
      systemQ: string;
      inset: string;
      insetDesc: string;
      overlay: string;
      overlayDesc: string;
      finishType: string;
      finishTypeDesc: string;
      matte: string;
      matteDesc: string;
      glossy: string;
      glossyDesc: string;
      colorQ: string;
      colorQDesc: string;
      colorPlaceholder: string;
      colorNote: string;
      colorRef: string;
      colorRefDesc: string;
      uploadImage: string;
      addLink: string;
      imageLink: string;
      refLink: string;
      glassDoors: string;
      glassDoorsDesc: string;
      glassDoorsCount: string;
      example2: string;
      glassDoorsNote: string;
      finishTip: string;
    };
    step10: {
      title: string;
      subtitle: string;
      underCabinet: string;
      underCabinetDesc: string;
      insideCabinet: string;
      insideCabinetDesc: string;
      ledStrips: string;
      ledStripsDesc: string;
      spotlights: string;
      spotlightsDesc: string;
      tip: string;
    };
    step11: {
      title: string;
      subtitle: string;
      hasMarbleQ: string;
      providedByGraphitube: string;
      providedByClient: string;
      typeQ: string;
      typePlaceholder: string;
      colorQ: string;
      colorSubtitle: string;
      uploadImage: string;
      provideLink: string;
      colorLink: string;
      colorLinkPlaceholder: string;
      colorLinkNote: string;
      cancelColor: string;
      additionalNotes: string;
      additionalNotesPlaceholder: string;
    };
    step12: {
      title: string;
      subtitle: string;
      hasTilesQ: string;
      providedByGraphitube: string;
      providedByClient: string;
      typeQ: string;
      typePlaceholder: string;
      colorQ: string;
      colorSubtitle: string;
      uploadImage: string;
      provideLink: string;
      colorLink: string;
      colorLinkPlaceholder: string;
      colorLinkNote: string;
      cancelColor: string;
      additionalNotes: string;
      additionalNotesPlaceholder: string;
    };
    step13: {
      title: string;
      subtitle: string;
      includesQ: string;
      wiringLabel: string;
      wiringDesc: string;
      outletsLabel: string;
      outletsDesc: string;
      lightingLabel: string;
      lightingDesc: string;
      additionalNotes: string;
      additionalNotesPlaceholder: string;
    };
    step14: {
      title: string;
      subtitle: string;
      includesQ: string;
      pipesLabel: string;
      pipesDesc: string;
      sinkLabel: string;
      sinkDesc: string;
      faucetsLabel: string;
      faucetsDesc: string;
      additionalNotes: string;
      additionalNotesPlaceholder: string;
    };
    step15: {
      title: string;
      subtitle: string;
      includesQ: string;
      wallsLabel: string;
      wallsDesc: string;
      ceilingLabel: string;
      ceilingDesc: string;
      colorQ: string;
      colorSubtitle: string;
      uploadImage: string;
      provideLink: string;
      colorLink: string;
      colorLinkPlaceholder: string;
      colorLinkNote: string;
      cancelColor: string;
      additionalNotes: string;
      additionalNotesPlaceholder: string;
    };
    step16: {
      title: string;
      subtitle: string;
      includesQ: string;
      ceilingLabel: string;
      ceilingDesc: string;
      decorativeLabel: string;
      decorativeDesc: string;
      additionalNotes: string;
      additionalNotesPlaceholder: string;
    };
    step17: {
      title: string;
      subtitle: string;
      wants3DQ: string;
      yesWant: string;
      yesWantDesc: string;
      noWant: string;
      noWantDesc: string;
      note: string;
      noteText: string;
    };
    step18: {
      title: string;
      subtitle: string;
      placeholder: string;
      note: string;
    };
    step19: {
      title: string;
      subtitle: string;
      reviewTitle: string;
      reviewSubtitle: string;
      customerInfo: string;
      name: string;
      phone: string;
      address: string;
      city: string;
      kitchenDesign: string;
      dimensions: string;
      ceiling: string;
      workScope: string;
      appliances: string;
      equipment: string;
      woodType: string;
      doorSystem: string;
      lighting: string;
      marbleDetails: string;
      tilesDetails: string;
      electricalDetails: string;
      plumbingDetails: string;
      paintingDetails: string;
      gypsumDetails: string;
      design3D: string;
      additionalNotes: string;
      estimatedPrice: string;
      estimatedPriceNote: string;
      priceWillBeStudied: string;
      confirmButton: string;
      // Additional fields for Step19
      completeProject: string;
      installation: string;
      insetInstallation: string;
      overlayInstallation: string;
      finish: string;
      glossyFinish: string;
      matteFinish: string;
      kitchenColor: string;
      design3DRequested: string;
      design3DRequestedDesc: string;
      priceNoticeTitle: string;
      priceNoticeDesc: string;
      priceNoticeContact: string;
      pricingExplanationTitle: string;
      pricingExplanationSubtitle: string;
      standardOptionsTitle: string;
      standardOptionsDesc: string;
      standardOptionsNote: string;
      customOptionsTitle: string;
      customOptionsDesc: string;
      customOptionsMarble: string;
      customOptions3D: string;
      customOptionsMaterials: string;
      customOptionsDesigns: string;
      whyThisApproachTitle: string;
      whyThisApproachDesc: string;
      qualityGuaranteeTitle: string;
      qualityGuaranteeDesc: string;
      nextStepTitle: string;
      nextStepCustom: string;
      nextStepStandard: string;
      readyToSendTitle: string;
      readyToSendDesc: string;
    };
  };
  salonSteps: {
    titles: string[];
    step2: {
      title: string;
      subtitle: string;
      designLabel: string;
      lShape: string;
      uShape: string;
      gShape: string;
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
      wall1: string;
      wall2: string;
      wall3: string;
      wall4: string;
      wall2Middle: string;
      placeholder: string;
      note: string;
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
      choiceLabel: string;
      chene: string;
      cheneDesc: string;
      noyer: string;
      noyerDesc: string;
      laitre: string;
      laitreDesc: string;
      note: string;
    };
    step6: {
      title: string;
      subtitle: string;
      note: string;
    };
    step7: {
      title: string;
      subtitle: string;
      note: string;
    };
    step8: {
      title: string;
      subtitle: string;
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
      decorationAndColor: string;
      selectedPattern: string;
      selectedColor: string;
      linesCount: string;
      woodType: string;
      additionalNotes: string;
      readyToSendTitle: string;
      readyToSendDesc: string;
    };
    stepConfirmation: {
      title: string;
      subtitle: string;
      customerInfo: string;
      name: string;
      phone: string;
      address: string;
      city: string;
      salonDesign: string;
      type: string;
      wall1Label: string;
      wall2Label: string;
      wall3Label: string;
      meters: string;
      woodElements: string;
      largeTablesLabel: string;
      sundriesLabel: string;
      sidePanelsLabel: string;
      verticalShapesLabel: string;
      verticalCornersLabel: string;
      woodType: string;
      woodTypeLabel: string;
      finalNote: string;
    };
  };
}

// Inline minimal translations for now
const translations: Record<Language, Translations> = {
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
      tip: 'نصيحة',
      note: 'ملاحظة',
      importantNote: 'ملاحظة مهمة',
      currency: 'درهم',
      helpText: 'إذا لم تفهم شيئاً، تواصل معنا عبر واتساب',
      whatsappNumber: '0609394003',
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
      infoNotice: 'سيتم عرض جميع التفاصيل خطوة بخطوة بعد اختيار المشروع. إذا لم تفهم شيئاً، تواصل معنا عبر واتساب.',
      whatsappContact: 'للتواصل السريع:',
      footerCopyright: '© 2026 Graphitube - متخصصون في النجارة الخشبية حسب الطلب',
    },
    successPage: {
      thankYou: 'شكراً لثقتكم في Graphitube',
      thankYouMessage: 'نشكر لكم الوقت الذي خصصتموه لملء هذا النموذج',
      requestReceived: 'تم استلام طلبك بنجاح',
      priceCalculated: 'تم حساب',
      priceWillBeStudied: 'سيقوم فريق Graphitube بدراسة مشروعكم',
      finalQuote: 'عرض السعر النهائي',
      estimatedPrice: 'السعر التقديري',
      estimatedPriceNote: 'هذا السعر تقديري وقابل للتعديل حسب القياسات الدقيقة والمواد المختارة',
      contactSoon: 'سنتصل بك قريباً',
      contactSoonMessage: 'سيتواصل معك فريقنا لتأكيد التفاصيل وستشاهد السعر التقديري',
      importantNote: 'ملاحظة مهمة:',
      importantNoteText1: 'الثمن تقديري',
      importantNoteText2: 'قد يتغير السعر',
      orderSummary: 'ملخص الطلب',
      projectType: 'نوع المشروع',
      kitchen: 'مطبخ',
      salon: 'صالون',
      customerName: 'اسم العميل',
      yourNotes: 'ملاحظاتك',
      whyGraphitube: 'لماذا Graphitube؟',
      whyGraphitubeSubtitle: 'نحن نقدم أفضل الحلول في النجارة الخشبية',
      whyGraphitubeText1: 'جودة عالية',
      whyGraphitubeText2: 'متانة ودقة',
      quality: 'جودة عالية',
      qualityDesc: 'نستخدم أفضل أنواع الخشب والمواد المتينة لضمان منتج يدوم لسنوات طويلة',
      experience: 'خبرة واسعة',
      experienceDesc: 'فريق محترف بخبرة تزيد عن 15 سنة في مجال النجارة والتصميم الداخلي',
      guarantee: 'ضمان الجودة',
      guaranteeDesc: 'نقدم ضماناً شاملاً على جميع أعمالنا ونلتزم بأعلى معايير الجودة',
      team: 'فريق متخصص',
      teamDesc: 'فريق عمل محترف ومدرب يهتم بأدق التفاصيل لضمان رضاك التام',
      customization: 'تصميم حسب الطلب',
      customizationDesc: 'كل مشروع فريد من نوعه، نصمم ونصنع حسب احتياجاتك ومساحتك الخاصة',
      pricing: 'أسعار تنافسية',
      pricingDesc: 'نقدم أفضل قيمة مقابل المال مع جودة عالية وأسعار عادلة وشفافة',
      nextSteps: 'الخطوات القادمة',
      teamWillContact: 'سيتواصل معكم فريق Graphitube عبر الهاتف أو واتساب لتأكيد التفاصيل وجدولة زيارة ميدانية',
      within24Hours: 'خلال 24 ساعة',
      backToHome: 'العودة إلى الصفحة الرئيسية',
      whatHappensNext: 'ماذا يحدث الآن؟',
      step1Title: 'مراجعة الطلب',
      step1Description: 'سنقوم بمراجعة طلبك بعناية خلال 24 ساعة',
      step2Title: 'الاتصال بكم',
      step2Description: 'سيتصل بك فريقنا لتأكيد التفاصيل وترتيب موعد الزيارة',
      step3Title: 'الزيارة الميدانية',
      step3Description: 'سنقوم بزيارتك لأخذ القياسات الدقيقة ومناقشة التفاصيل',
      contactTitle: 'هل لديك استفسار؟',
      contactDescription: 'تواصل معنا الآن عبر واتساب أو الهاتف',
    },
    whatsapp: {
      buttonText: 'واتساب',
      needHelp: 'هل تحتاج مساعدة؟',
      helpMessage: 'إذا لم تفهم أي جزء، تواصل معنا',
      contactUs: 'تواصل معنا',
      helpTemplate: 'مرحباً، أحتاج مساعدة في: {stepName}',
      generalHelpTemplate: 'مرحباً، أحتاج مساعدة',
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
        'التأكيد',
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
        title: 'نوع تصميم المطبخ',
        subtitle: 'اختر نوع التصميم الذي يناسب مطبخك',
        straight: 'مطبخ مستقيم (I)',
        straightDesc: 'تصميم بسيط على خط مستقيم',
        lShape: 'مطبخ على شكل حرف L',
        lShapeDesc: 'يناسب الزوايا والمساحات المتوسطة',
        uShape: 'مطبخ على شكل حرف U',
        uShapeDesc: 'يستغل ثلاثة جدران',
        gShape: 'مطبخ على شكل حرف G',
        gShapeDesc: 'تصميم متقدم مع امتداد إضافي',
        island: 'مطبخ مستقيم مع جزيرة',
        islandDesc: 'يتضمن طاولة عمل في الوسط',
        other: 'تصميم آخر (مخصص)',
        otherDesc: 'لديك تصميم خاص ترغب فيه',
        customLabel: 'يرجى توضيح التصميم المطلوب',
        customPlaceholder: 'وصف تفصيلي للتصميم المخصص الذي ترغب فيه...',
        customNote: 'ملاحظة: التصميمات المخصصة تتطلب تواصل مباشر لتحديد الثمن بدقة',
      },
      step3: {
        title: 'الأبعاد التقريبية',
        subtitle: 'أدخل الأبعاد بالأمتار (القياسات التقريبية كافية)',
        note: 'لا تقلق بشأن الدقة ا��كاملة. سيتم أخذ القياسات الدقيقة من طرف فريق Graphitube عند الزيارة الميدانية.',
        straightLength: 'الطول الكلي (بالأمتار)',
        side1: 'الضلع الأول (بالأمتار)',
        side2: 'الضلع الثاني (بالأمتار)',
        side3: 'الضلع الثالث (بالأمتار)',
        side4: 'امتداد حرف G - الجزء الرابع (بالأمتار)',
        gExtension: 'امتداد حرف G',
        kitchenLength: 'الطول الكلي للمطبخ (بالأمتار)',
        islandDimensions: 'أبعاد الجزيرة',
        islandLength: 'طول الجزيرة (بالأمتار)',
        islandWidth: 'عرض الجزيرة (بالأمتار)',
        placeholder: 'مثال: 3.5',
        meters: 'بالأمتار',
      },
      step4: {
        title: 'ارتفاع المطبخ والسقف',
        subtitle: 'معلومات عن ارتفاع المطبخ ونوع السقف',
        reachesCeilingQ: 'هل المطبخ يصل إلى السقف؟',
        yesReaches: 'نعم',
        yesReachesDesc: 'يصل إلى السقف',
        noReaches: 'لا',
        noReachesDesc: 'لا يصل إلى السقف',
        totalHeightLabel: 'الارتفاع الإجمالي (بالأمتار)',
        totalHeightPlaceholder: 'مثال: 2.8',
        heightNote: '💡 القياس التقريبي كافٍ - سيتم أخذ القياسات الدقيقة لاحقاً',
        ceilingTypeQ: 'نوع السقف',
        flat: 'مستوٍ',
        flatDesc: 'سقف مستقيم',
        uneven: 'غير مستو',
        unevenDesc: 'فيه ميول أو انحناءات',
        unevenNote: 'نقاط الارتفاع المختلفة',
        unevenTitle: 'نقاط الارتفاع المختلفة',
        unevenSubtitle: 'نرجو تحديد أعلى وأدنى نقطة في السقف لحساب التصميم بدقة',
        highestPoint: 'أعلى نقطة',
        lowestPoint: 'أدنى نقطة',
        generalNote: '💡 ملاحظة: القياسات التقريبية كافية في هذه المرحلة. سيقوم فريق Graphitube بأخذ القياسات الدقيقة عند الزيارة الميدانية.',
      },
      step5: {
        title: 'نطاق الأشغال',
        subtitle: 'حدد الأشغال المطلوبة في المشروع',
        completeProject: 'مشروع متكامل (جميع الأشغال)',
        completeProjectDesc: 'يشمل جميع الأشغال: خشب، رخام، زليج، كهرباء، ماء، صباغة، وجبس',
        orChoose: 'أو اختر الأشغال المطلوبة:',
        wood: 'الخشب',
        marble: 'الرخام',
        tiles: 'الزليج',
        electrical: 'الكهرباء',
        plumbing: 'الماء',
        painting: 'الصباغة',
        gypsum: 'الجبس',
      },
      step6: {
        title: 'الأجهزة والمعدات المدمجة',
        subtitle: 'اختر الأجهزة التي تريد دمجها في تصميم المطبخ',
        cooking: 'أجهزة الطبخ',
        electricOven: 'فرن كهربائي',
        electricOvenDesc: 'فرن كهربائي مدمج',
        microwave: 'فرن ميكروويف',
        microwaveDesc: 'ميكروويف مدمج',
        stove: 'بوتاغاز',
        stoveDesc: 'طباخ بالغاز',
        pizzaOven: 'فرن بيتزا',
        pizzaOvenDesc: 'فرن بيتزا مدمج',
        hood: 'شفاط',
        hoodDesc: 'شفاط هواء',
        cooling: 'أجهزة التبريد',
        fridge: 'ثلاجة مدمجة',
        fridgeDesc: 'ثلاجة داخل المطبخ',
        freezer: 'فريزر مدمج',
        freezerDesc: 'فريزر داخل المطبخ',
        others: 'أجهزة أخرى',
        waterHeater: 'سخان ماء',
        waterHeaterDesc: 'سخان كهربائي',
        coffeeMachine: 'ماكينة قهوة',
        coffeeMachineDesc: 'ماكينة قهوة مدمجة',
        dishwasher: 'غسالة أطباق',
        dishwasherDesc: 'غسالة أطباق مدمجة',
        washingMachine: 'غسالة ملابس',
        washingMachineDesc: 'غسالة ملابس مدمجة',
        tapWithFilter: 'صنبور بفلتر',
        tapWithFilterDesc: 'صنبور ماء مع فلتر تنقية',
        singleSink: 'حوض مفرد',
        singleSinkDesc: 'حوض واحد للمطبخ',
        doubleSink: 'حوض مزدوج',
        doubleSinkDesc: 'حوض بحوضين',
        faucet: 'صنبور',
        faucetDesc: 'صنبور المطبخ',
        soapDispenser: 'موزع صابون',
        soapDispenserDesc: 'موزع صابون مدمج',
        waterAndSink: 'الحوض والماء',
        noteTitle: 'ملاحظة مهمة',
        noteText: 'يمكنك اختيار عدة أجهزة معاً. سيتم مراعاة جميع اختياراتك في تصميم المطبخ النهائي. الأجهزة المدمجة تعطي مظهراً أنيقاً وموحداً للمطبخ.',
      },
      step7: {
        title: 'التجهيزات الداخلية للخزانات',
        subtitle: 'اختر التجهيزات الداخلية التي تحتاجها',
        pullOutDrawers: 'أدراج سحب كاملة',
        pullOutDrawersDesc: 'أدراج قابلة للسحب الكامل',
        softClose: 'نظام الإغلاق الهادئ',
        softCloseDesc: 'أبواب وأدراج تغلق بهدوء',
        cornerSolutions: 'حلول الزوايا',
        cornerSolutionsDesc: 'أنظمة دوارة للزوايا',
        tallUnitOrganizers: 'منظمات الخزانات الطويلة',
        tallUnitOrganizersDesc: 'أرفف منظمة للخزانات الطويلة',
        spiceRacks: 'رفوف ��لتوابل',
        spiceRacksDesc: 'رفوف منظمة للتوابل',
        binSystems: 'أنظمة القمامة',
        binSystemsDesc: 'سلات قمامة مدمجة',
        cutleryTrays: 'صواني أدوات المائدة',
        cutleryTraysDesc: 'منظمات للملاعق والشوك',
        plateRacks: 'رفوف الصحون',
        plateRacksDesc: 'رفوف لتنظيم الصحون',
      },
      step8: {
        title: 'نوع الخشب',
        subtitle: 'اختر نوع الخشب المناسب لمطبخك',
        melamine: 'ميلامين',
        melamineDesc: 'اقتصادي ومتين، مقاوم للماء والخدوش',
        mdf: 'MDF',
        mdfDesc: 'ألواح خشبية مضغوطة - جودة متوسطة',
        hdf: 'HDF',
        hdfDesc: 'ألواح عالية الكثافة - جودة عالية',
        multiplex: 'موتيبلكس (Multiplex)',
        multiplexDesc: 'خشب رقائقي متعدد الطبقات - متانة عالية',
        natural: 'خشب طبيعي',
        naturalDesc: 'خشب طبيعي 100% - جودة فاخرة',
        tip: '💡 نصيحة: LATI المقاوم للرطوبة والحرارة هو الخيار الأفضل إذا كان استخدام المطبخ يومياً ومكثفاً.',
      },
      step9: {
        title: 'الأبواب والتشطيب',
        subtitle: 'اختر طريقة تركيب الأبواب ونوع التشطيب واللون المفضل',
        systemQ: 'نظام الأبواب:',
        inset: 'مدمج مع الأبواب',
        insetDesc: 'الباب داخل الإطار',
        overlay: 'ملصوق على الأبواب',
        overlayDesc: 'الباب فوق الإطار',
        finishType: 'نوع التشطيب',
        finishTypeDesc: 'مظهر سطح الأبواب',
        matte: 'مطفي',
        matteDesc: 'سطح ناعم غير لامع',
        glossy: 'لامع',
        glossyDesc: 'سطح براق وعاكس للضوء',
        colorQ: 'لون المطبخ',
        colorQDesc: 'اللون الأساسي للأبواب والخزائن',
        colorPlaceholder: 'مثال: أبيض، رمادي، بيج، خشبي طبيعي، أسود مطفي...',
        colorNote: 'اكتب اسم اللون أو وصفه، وسيقوم فريق Graphitube باقتراح اللون الأنسب من الكتالوج',
        colorRef: 'مرجع اللون (اختياري)',
        colorRefDesc: 'صورة أو رابط للون المطلوب',
        uploadImage: 'تحميل صورة',
        addLink: 'إضافة رابط',
        imageLink: 'رابط الصورة',
        refLink: 'رابط مرجع اللون',
        glassDoors: 'أبواب زجاج بإطار ألمنيوم',
        glassDoorsDesc: 'عدد الأبواب الزجاجية (اختياري)',
        glassDoorsCount: 'عدد الأبواب الزجاجية',
        example2: 'مثال: 2',
        glassDoorsNote: 'الأبواب الزجاجية تعطي مظهراً عصرياً وتسمح بعرض الأطباق والأواني الجميلة',
        finishTip: 'اختيار التشطيب المناسب يؤثر على سهولة التنظيف والمظهر العام. التشطيب اللامع يعطي مظهراً حديثاً لكنه يُظهر البصمات، بينما المطفي أسهل في الصيانة ويعطي مظهراً كلاسيكياً أنيقاً.',
      },
      step10: {
        title: 'الإضاءة المدمجة',
        subtitle: 'اختر نوع الإضاءة LED المدمجة في المطبخ',
        underCabinet: 'إضاء�� تحت الخزائن',
        underCabinetDesc: 'إضاءة LED أسفل الخزائن العلوية',
        insideCabinet: 'إضاءة داخل الخزائن',
        insideCabinetDesc: 'إضاءة تلقائية عند فتح الأبواب',
        ledStrips: 'شرائط LED ديكورية',
        ledStripsDesc: 'شرائط LED للديكور والإضاءة العامة',
        spotlights: 'أضواء نقطية (Spotlights)',
        spotlightsDesc: 'أضواء نقطية مدمجة في السقف أو الخزائن',
        tip: '💡 نصيحة: الإضاءة الدافئة (أصفر) مناسبة للأجواء الهادئة، بينما الإضاءة الباردة (أبيض) أفضل للعمل والطهي.',
      },
      step11: {
        title: 'معلومات عن الرخام / سطح العمل',
        subtitle: 'تفاصيل الرخام أو سطح العمل المطلوب',
        hasMarbleQ: 'من سيوفر الرخام / سطح العمل؟',
        providedByGraphitube: 'Graphitube يوفر الرخام',
        providedByClient: 'العميل يوفر الرخام',
        typeQ: 'نوع الرخام أو سطح العمل',
        typePlaceholder: 'مثال: رخام كرارة، جرانيت، كوارتز، خشب...',
        colorQ: 'لون أو نموذج الرخام',
        colorSubtitle: 'يمكنك رفع صورة أو إرسال رابط للون/النموذج المطلوب',
        uploadImage: 'رفع صورة',
        provideLink: 'إرسال رابط',
        colorLink: 'رابط اللون/النموذج',
        colorLinkPlaceholder: 'https://example.com/marble-type',
        colorLinkNote: '💡 يمكنك إرسال رابط لصورة الرخام أو النموذج المطلوب',
        cancelColor: 'إلغاء',
        additionalNotes: 'ملاحظات إضافية',
        additionalNotesPlaceholder: 'أي تفاصيل أخرى عن الرخام...',
      },
      step12: {
        title: 'معلومات عن الزليج',
        subtitle: 'تفاصيل الزليج المطلوب في المطبخ',
        hasTilesQ: 'من سيوفر الزليج؟',
        providedByGraphitube: 'Graphitube يوفر الزليج',
        providedByClient: 'العميل يوفر الزليج',
        typeQ: 'نوع الزليج',
        typePlaceholder: 'مثال: سيراميك، بورسلان، موزاييك...',
        colorQ: 'لون أو نموذج الزليج',
        colorSubtitle: 'يمكنك رفع صورة أو إرسال رابط للون/النموذج المطلوب',
        uploadImage: 'رفع صورة',
        provideLink: 'إرسال رابط',
        colorLink: 'رابط اللون/النموذج',
        colorLinkPlaceholder: 'https://example.com/tiles-type',
        colorLinkNote: '💡 يمكنك إرسال رابط لصورة الزليج أو النموذج المطلوب',
        cancelColor: 'إلغاء',
        additionalNotes: 'ملاحظات إضافية',
        additionalNotesPlaceholder: 'أي تفاصيل أخرى عن الزليج...',
      },
      step13: {
        title: 'تفاصيل الكهرباء',
        subtitle: 'الأشغال الكهربائ��ة',
        includesQ: 'ما الذي تشمله أشغال الكهرباء؟',
        wiringLabel: 'الأسلاك الكهربائية',
        wiringDesc: 'تمديد وتركيب الأسلاك',
        outletsLabel: 'المقابس والمفاتيح',
        outletsDesc: 'تركيب المقابس والمفاتيح',
        lightingLabel: 'الإضاءة الرئيسية',
        lightingDesc: 'نقاط الإضاءة',
        additionalNotes: 'ملاحظات إضافية',
        additionalNotesPlaceholder: 'أي تفاصيل أخرى عن الكهرباء...',
      },
      step14: {
        title: 'معلومات عن الماء',
        subtitle: 'تفاصيل أشغال السباكة المطلوبة',
        includesQ: 'ما الذي تشمله أشغال السباكة؟',
        pipesLabel: 'الأنابيب',
        pipesDesc: 'تمديد وتركيب أنابيب الماء',
        sinkLabel: 'الحوض (Évier)',
        sinkDesc: 'تركيب حوض المطبخ',
        faucetsLabel: 'الصنابير',
        faucetsDesc: 'تركيب الصنابير',
        additionalNotes: 'ملاحظات إضافية',
        additionalNotesPlaceholder: 'أي تفاصيل أخرى عن السباكة...',
      },
      step15: {
        title: 'معلومات عن الصباغة',
        subtitle: 'تفاصيل أشغال الصباغة المطلوبة',
        includesQ: 'ما الذي تشمله أشغال الصباغة؟',
        wallsLabel: 'طلاء الجدران',
        wallsDesc: 'صباغة جدران المطبخ',
        ceilingLabel: 'طلاء السقف',
        ceilingDesc: 'صباغة سقف المطبخ',
        colorQ: 'لون الصباغة المفضل',
        colorSubtitle: 'يمكنك رفع صورة أو إرسال رابط للون المطلوب',
        uploadImage: 'رفع صورة',
        provideLink: 'إرسال رابط',
        colorLink: 'رابط اللون',
        colorLinkPlaceholder: 'https://example.com/paint-color',
        colorLinkNote: '💡 يمكنك إرسال رابط لصورة اللون المطلوب',
        cancelColor: 'إلغاء',
        additionalNotes: 'ملاحظات إضافية',
        additionalNotesPlaceholder: 'أي تفاصيل أخرى عن الصباغة...',
      },
      step16: {
        title: 'معلومات ��ن الجبس',
        subtitle: 'تفاصيل أشغال الجبس المطلوبة',
        includesQ: 'ما الذي تشمله أشغال الجبس؟',
        ceilingLabel: 'سقف جبس (Faux Plafond)',
        ceilingDesc: 'تركيب سقف جبس معلق',
        decorativeLabel: 'ديكورات جبسية',
        decorativeDesc: 'إضافات وديكورات من الجبس',
        additionalNotes: 'ملاحظات إضافية',
        additionalNotesPlaceholder: 'أي تفاصيل أخرى عن الجبس...',
      },
      step17: {
        title: 'التصميم ثلاثي الأبعاد (3D)',
        subtitle: 'شاهد مطبخك بشكل واقعي قبل البدء في التنفيذ',
        wants3DQ: 'هل تريد تصميم ثلاثي الأبعاد (3D) لمطبخك؟',
        yesWant: 'نعم',
        yesWantDesc: 'أريد تصميم 3D',
        noWant: 'لا',
        noWantDesc: 'لا أريد تصميم 3D',
        note: '💡 ملاحظة مهمة:',
        noteText: 'التصميم ثلاثي الأبعاد يساعدك على رؤية المطبخ بشكل واقعي قبل البدء في التنفيذ. الخدمة مدفوعة ويتم تحديد سعرها بعد دراسة المشروع.',
      },
      step18: {
        title: 'ملاحظات إضافية',
        subtitle: 'أي معلومات أو طلبات خاصة ��ود إضافتها',
        placeholder: 'اكتب أي ملاحظات أ�� طلبات خاصة هنا...',
        note: '💡 هذا المكان مخصص لأي تفاصيل إضافية لم يتم ذكرها في الخطوات السابقة',
      },
      step19: {
        title: 'التأكيد',
        subtitle: 'مراجعة جميع التفاصيل قبل الإرسال',
        reviewTitle: 'ملخص طلبك',
        reviewSubtitle: 'تأكد ��ن صحة جميع المعلومات قبل الإرسال',
        customerInfo: 'معلومات العميل',
        name: 'الاسم',
        phone: 'الهاتف',
        address: 'العنوان',
        city: 'المدينة',
        kitchenDesign: 'تصميم المطبخ',
        dimensions: 'الأبعاد',
        ceiling: 'السقف',
        workScope: 'نطاق العمل',
        appliances: 'الأجهزة',
        equipment: 'المعدات',
        woodType: 'نوع الخشب',
        doorSystem: 'نظام الأبواب',
        lighting: 'الإضاءة',
        marbleDetails: 'تفاصيل الرخام',
        tilesDetails: 'تفاصيل الزليج',
        electricalDetails: 'تفاصيل الكهرباء',
        plumbingDetails: 'تفاصيل السباكة',
        paintingDetails: 'تفاصيل الصباغة',
        gypsumDetails: 'تفاصيل الجبس',
        design3D: 'تصميم 3D',
        additionalNotes: 'ملاحظات إضافية',
        estimatedPrice: 'السعر التقديري',
        estimatedPriceNote: 'هذا السعر تقديري وقد يتغير بعد الزيارة الميدانية',
        priceWillBeStudied: 'سيتم دراسة المشروع وإرسال عرض السعر النهائي',
        confirmButton: 'تأكيد وإرسال الطلب',
        // Additional fields
        completeProject: 'مشروع متكامل',
        installation: 'التركيب',
        insetInstallation: 'مدمج',
        overlayInstallation: 'ملصوق',
        finish: 'التشطيب',
        glossyFinish: 'لامع',
        matteFinish: 'مطفي',
        kitchenColor: 'لون المطبخ',
        design3DRequested: '✅ تم طلب تصميم ثلاثي الأبعاد',
        design3DRequestedDesc: 'سيتم إعداد تصميم 3D للمطبخ قبل التنفيذ',
        priceNoticeTitle: 'ملاحظة بخصوص التسعير',
        priceNoticeDesc: 'لا يمكن تحديد السعر مباشرة عبر الموقع للأسباب التالية:',
        priceNoticeContact: 'سيتم التواصل معكم هاتفياً لتأكيد التفاصيل وتقديم عرض الثمن المناسب.',
        pricingExplanationTitle: 'كيف تعمل آلية التسعير في Graphitube؟',
        pricingExplanationSubtitle: 'نريد أن نكون واضحين وشفافين معكم',
        standardOptionsTitle: 'خيارات قياسية = سعر فوري',
        standardOptionsDesc: 'إذا اخترت خيارات قياسية فقط من الـ Catalogue (خشب، معدات، تشطيب عادي...)، سيتم عرض السعر مباشرة في الموقع بعد إكمال جميع الخطوات.',
        standardOptionsNote: '💰 هذا هو الهدف الرئيسي من الموقع: تسعير فوري للخيارات القياسية',
        customOptionsTitle: 'خيارات مخصصة = تواصل شخصي',
        customOptionsDesc: 'لكن إذا اخترت خيارات مخصصة أو مواد خارجية غير موجودة في خياراتنا القياسية، لا يمكن عرض السعر مباشرة. مثل:',
        customOptionsMarble: 'الرخام أو الزليج - يحتاج دراسة توفر ونوعية',
        customOptions3D: 'تصميم 3D مخصص - يحتاج وقت وتكلفة إضافية',
        customOptionsMaterials: 'مواد خارج الكتالوج - أسعارها متغيرة في السوق',
        customOptionsDesigns: 'تصاميم خاصة - تحتاج دراسة هندسية',
        whyThisApproachTitle: 'لماذا هذه الطريقة؟',
        whyThisApproachDesc: 'لأننا نريد أن نعطيك سعراً حقيقياً ودقيقاً، وليس رقماً تقريبياً قد يتغير لاحقاً. أسعار المواد الخارجية والتصاميم المخصصة تتغير حسب السوق والجودة المطلوبة.',
        qualityGuaranteeTitle: 'معايير الجودة في Graphitube',
        qualityGuaranteeDesc: 'سواء سعر فوري أو بالتواصل، نحن نلتزم بجودة عالية في الخشب، التجهيزات، التشطيب، وطريقة التنفيذ. قد تجد عروضاً بأسعار أقل، لكن الفرق يكون في الجودة والمتانة.',
        nextStepTitle: '⏰ الخطوة القادمة:',
        nextStepCustom: 'بما أنك اخترت خيارات مخصصة، سيتصل بك فريق Graphitube في أقرب وقت لتأكيد التفاصيل، الإجابة عن استفساراتك، وإعطائك عرض ثمن دقيق ومفصل يناسب مشروعك.',
        nextStepStandard: 'بما أنك اخترت خيارات قياسية، سيتم عرض السعر التقديري في الخطوة التالية. وسيتواصل معك الفريق لتأكيد التفاصيل النهائية.',
        readyToSendTitle: 'جاهز للإرسال؟',
        readyToSendDesc: 'بالضغط على "إرسال الطلب" أدناه، سيتم إرسال جميع المعلومات إلى فريق Graphitube. سنتواصل معكم في أقرب وقت ممكن عبر الهاتف أو واتساب.',
      },
    },
    salonSteps: {
      titles: ['معلومات العميل', 'نوع الصالون', 'الأبعاد', 'عناصر الخشب', 'نوع الخشب', 'الزخرفة', 'اللون', 'التأكيد'],
      step2: {
        title: 'نوع الصالون',
        subtitle: 'اختر تصميم الصالون الذي يناسب مساحتك',
        designLabel: 'التصميم المطلوب',
        lShape: 'صالون على شكل حرف L',
        uShape: 'صالون على شكل حرف U',
        gShape: 'صالون على شكل حرف G',
        square: 'صالون مربع',
        rectangularOpen: 'صالون مستطيل مفتوح رقم 1',
        rectangularClosed: 'صالون مستطيل مفتوح رقم 2',
        customDesign: 'تصميم مخصص',
        uploadImage: 'تحميل صورة التصميم',
        uploadImageDesc: 'ارفع صورة أو رسم توضيحي للتصميم الذي تريده',
        customPriceNote: 'ملاحظة: التصاميم المخصصة تتطلب تواصل مباشر مع فريق Graphitube لتحديد السعر بدقة بناءً على التفاصيل المحددة.',
      },
      step3: {
        title: 'الأبعاد التقريبية',
        subtitle: 'أدخل طول الجدران بالمتر',
        wall1: 'طول الجدار الأول (متر)',
        wall2: 'طول الجدار الثاني (متر)',
        wall3: 'طول الجدار الثالث (متر)',
        wall4: 'طول الجدار الرابع (متر)',
        wall2Middle: 'طول الجدار الثاني (الوسط) (متر)',
        placeholder: 'مثال: 4.5',
        note: '💡 القياسات التقريبية كافية في هذه المرحلة. سيتم أخذ القياسات الدقيقة من طرف فريقنا عند الزيارة الميدانية.',
      },
      step4: {
        title: 'عناصر الخشب',
        subtitle: 'حدد العناصر الخشبية التي تريدها في الصالون',
        largeTables: 'عدد الطاولات الكبيرة (طبلة)',
        sundries: 'عدد الطاولات الصغيرة (سوندريات)',
        sidePanels: 'عدد الجوانب الجانبية (كوطي)',
        verticalShapes: 'عدد الأشكال العمودية (كوان)',
        verticalCorners: 'عدد الزوايا العمودية (فرمجة)',
        note: '💡 يمكنك ترك العدد صفر (0) للعناصر التي لا تحتاجها.',
      },
      step5: {
        title: 'نوع الخشب',
        subtitle: 'اختر نوع الخشب المناسب لصالونك',
        choiceLabel: 'اختيار الخشب',
        chene: 'خشب الشان',
        cheneDesc: 'خشب قوي ومتين بلون طبيعي',
        noyer: 'خشب الجوز (النوايي)',
        noyerDesc: 'لون داكن وفخم',
        laitre: 'خشب الليدر (الليطر)',
        laitreDesc: 'خشب عالي الجودة ومقاوم',
        note: '💡 نستخدم خشب عالي الجودة من موردين معتمدين لضمان المتانة والجمال.',
      },
      step6: {
        title: 'اختيار الزخرفة',
        subtitle: 'اختر نمط الزخرفة المناسب لجدران صالونك',
        note: '💡 اختر أحد الأنماط المتاحة. يمكنك التواصل معنا ل��ض��فة أنماط جديدة.',
      },
      step7: {
        title: 'اختيار اللون',
        subtitle: 'اختر اللون المناسب للزخرفة التي اخترتها',
        note: '💡 جميع الألوان متوفرة. يمكنك طلب ألوان مخصصة عبر التواصل معنا.',
      },
      step8: {
        title: 'التأكيد',
        subtitle: 'مراجعة جميع التفاصيل قبل الإرسال',
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
        completeProject: 'مشروع متكامل',
        decorationAndColor: 'الزخرفة واللون',
        selectedPattern: 'الزخرفة المختارة',
        selectedColor: 'اللون المختار',
        linesCount: 'خطوط',
        woodType: 'نوع الخشب',
        additionalNotes: 'ملاحظات إضافية',
        readyToSendTitle: 'جاهز للإرسال!',
        readyToSendDesc: 'بعد النقر على "إرسال"، سيقوم فريق Graphitube بمراجعة طلبك والتواصل معك لتأكيد التفاصيل وستشاهد السعر التقديري.',
        estimatedPrice: 'السعر المقدر',
        totalPrice: 'السعر الإجمالي',
        priceNote: 'هذا السعر تقديري ويمكن أن يتغير حسب التفاصيل النهائية',
        priceBreakdown: 'تفاصيل السعر:',
        noPriceTitle: 'السعر غير متوفر',
        noPriceDesc: 'السعر التلقائي غير متوفر للتصاميم المخصصة',
      },
      stepConfirmation: {
        title: 'مراجعة المعلومات',
        subtitle: 'تحقق من المعلومات قبل الإرسال',
        customerInfo: 'معلومات العميل',
        name: 'الاسم:',
        phone: 'الهاتف:',
        address: 'العنوان:',
        city: 'المدينة:',
        salonDesign: 'تصميم الصالون',
        type: 'النوع:',
        wall1Label: 'طول الجدار الأول:',
        wall2Label: 'طول الجدار الثاني:',
        wall3Label: 'طول الجدار الثالث:',
        meters: 'متر',
        woodElements: 'عناصر الخشب',
        largeTablesLabel: 'الطاولات الكبيرة:',
        sundriesLabel: 'الطاولات الصغيرة (سوندريات):',
        sidePanelsLabel: 'الجوانب الجانبية:',
        verticalShapesLabel: 'الأشكال العمودية:',
        verticalCornersLabel: 'الزوايا العمودية:',
        woodType: 'نوع الخشب',
        woodTypeLabel: 'الخشب المختار:',
        finalNote: 'بعد إرسال هذا الطلب، سيقوم فريق Graphitube بمراجعة جميع التفاصيل والتواصل معكم لتأكيد المعلومات وتقديم عرض الثمن النهائي.',
      },
    },
  },
  fr: {
    common: {
      yes: 'Oui',
      no: 'Non',
      next: 'Suivant',
      back: 'Retour',
      submit: 'Envoyer',
      continue: 'Continuer',
      cancel: 'Annuler',
      save: 'Enregistrer',
      loading: 'Chargement...',
      optional: 'Facultatif',
      required: 'Requis',
      backToHome: 'Retour',
      tip: 'Conseil',
      note: 'Note',
      importantNote: 'Note importante',
      currency: 'DH',
      helpText: 'Si vous ne comprenez pas quelque chose, contactez-nous via WhatsApp',
      whatsappNumber: '0609394003',
    },
    homePage: {
      headerTitle: 'Graphitube',
      badge: 'Menuiserie sur mesure',
      welcome: 'Bienvenue chez Graphitube',
      subtitle: 'Concevez votre projet',
      description: 'Choisissez le type de projet',
      kitchenTitle: 'Cuisine',
      kitchenDescription: 'Conception de cuisine sur mesure',
      kitchenButton: 'Commencer',
      salonTitle: 'Salon',
      salonDescription: 'Conception de salon sur mesure',
      salonButton: 'Commencer',
      infoNotice: 'Tous les détails seront affichés étape par étape après avoir choisi le projet. Si vous ne comprenez pas quelque chose, contactez-nous via WhatsApp.',
      whatsappContact: 'Pour un contact rapide:',
      footerCopyright: '© 2026 Graphitube',
    },
    successPage: {
      thankYou: 'Merci pour votre confiance',
      thankYouMessage: 'Merci du temps consacré',
      requestReceived: 'Demande reçue avec succès',
      priceCalculated: 'calculé',
      priceWillBeStudied: 'L\'équipe étudiera votre projet',
      finalQuote: 'devis final',
      estimatedPrice: 'Prix estimatif',
      estimatedPriceNote: 'Prix estimatif et modifiable selon mesures précises et matériaux choisis',
      contactSoon: 'Contact bientôt',
      contactSoonMessage: 'Notre équipe vous contactera pour confirmer les détails et vous verrez le prix estimatif',
      importantNote: 'Note importante:',
      importantNoteText1: 'Prix estimatif',
      importantNoteText2: 'Le prix peut changer',
      orderSummary: 'Résumé de la demande',
      projectType: 'Type de projet',
      kitchen: 'Cuisine',
      salon: 'Salon',
      customerName: 'Nom du client',
      yourNotes: 'Vos notes',
      whyGraphitube: 'Pourquoi Graphitube?',
      whyGraphitubeSubtitle: 'Nous offrons les meilleures solutions en menuiserie',
      whyGraphitubeText1: 'Haute qualité',
      whyGraphitubeText2: 'Durabilité et précision',
      quality: 'Haute qualité',
      qualityDesc: 'Nous utilisons les meilleurs bois et matériaux durables pour un produit qui dure des années',
      experience: 'Expérience étendue',
      experienceDesc: 'Équipe professionnelle avec plus de 15 ans d\'expérience en menuiserie et design intérieur',
      guarantee: 'Garantie qualité',
      guaranteeDesc: 'Nous offrons une garantie complète sur tous nos travaux et respectons les plus hauts standards',
      team: 'Équipe spécialisée',
      teamDesc: 'Équipe professionnelle formée qui s\'occupe des moindres détails pour votre satisfaction totale',
      customization: 'Design sur mesure',
      customizationDesc: 'Chaque projet est unique, nous concevons et fabriquons selon vos besoins et votre espace',
      pricing: 'Prix compétitifs',
      pricingDesc: 'Nous offrons le meilleur rapport qualité-prix avec des tarifs justes et transparents',
      nextSteps: 'Prochaines étapes',
      teamWillContact: 'L\'équipe Graphitube vous contactera par téléphone ou WhatsApp pour confirmer détails et planifier visite sur site',
      within24Hours: 'Sous 24 heures',
      backToHome: 'Retour à l\'accueil',
      whatHappensNext: 'Que se passe-t-il maintenant?',
      step1Title: 'Révision de la demande',
      step1Description: 'Nous réviserons votre demande soigneusement sous 24 heures',
      step2Title: 'Vous contacter',
      step2Description: 'Notre équipe vous contactera pour confirmer les détails et fixer un rendez-vous',
      step3Title: 'Visite sur site',
      step3Description: 'Nous vous visiterons pour prendre les mesures précises et discuter des détails',
      contactTitle: 'Vous avez une question?',
      contactDescription: 'Contactez-nous maintenant via WhatsApp ou téléphone',
    },
    whatsapp: {
      buttonText: 'WhatsApp',
      needHelp: 'Besoin d\'aide?',
      helpMessage: 'Si vous ne comprenez pas, contactez-nous',
      contactUs: 'Contactez-nous',
      helpTemplate: 'Bonjour, aide pour: {stepName}',
      generalHelpTemplate: 'Bonjour, besoin d\'aide',
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
        'Appareils',
        'Équipements',
        'Type bois',
        'Système portes',
        'Éclairage',
        'Détails marbre',
        'Détails carrelage',
        'Détails électricité',
        'Détails plomberie',
        'Détails peinture',
        'Détails plâtre',
        'Design 3D',
        'Notes',
        'Confirmation',
      ],
      step1: {
        title: 'Informations client',
        subtitle: 'Entrez vos informations',
        fullName: 'Nom complet',
        fullNamePlaceholder: 'Ex: Ahmed Mohamed',
        phone: 'Téléphone',
        phonePlaceholder: '0612345678',
        address: 'Adresse',
        addressPlaceholder: 'Rue, Quartier',
        city: 'Ville',
        cityPlaceholder: 'Ex: Casablanca',
      },
      // Copy the same structure from Arabic but translate to French - abbreviated for file size
      step2: { title: 'Design cuisine', subtitle: 'Choisissez le type', straight: 'Cuisine droite (I)', straightDesc: 'Design simple', lShape: 'Cuisine en L', lShapeDesc: 'Pour les coins', uShape: 'Cuisine en U', uShapeDesc: 'Trois murs', gShape: 'Cuisine en G', gShapeDesc: 'Design avancé', island: 'Avec îlot', islandDesc: 'Table au centre', other: 'Autre (personnalisé)', otherDesc: 'Design spécial', customLabel: 'Précisez le design', customPlaceholder: 'Description détaillée...', customNote: 'Les designs personnalisés nécessitent contact direct' },
      step3: { title: 'Dimensions', subtitle: 'En mètres (approximatif)', note: 'Mesures précises lors visite terrain', straightLength: 'Longueur totale', side1: 'Côté 1', side2: 'Côté 2', side3: 'Côté 3', side4: 'Extension G', gExtension: 'Extension G', kitchenLength: 'Longueur cuisine', islandDimensions: 'Dimensions îlot', islandLength: 'Longueur îlot', islandWidth: 'Largeur îlot', placeholder: 'Ex: 3.5', meters: 'en mètres' },
      step4: { title: 'Hauteur plafond', subtitle: 'Informations hauteur', reachesCeilingQ: 'Atteint le plafond?', yesReaches: 'Oui', yesReachesDesc: 'Atteint plafond', noReaches: 'Non', noReachesDesc: "N'atteint pas", totalHeightLabel: 'Hauteur totale', totalHeightPlaceholder: 'Ex: 2.8', heightNote: '💡 Approximatif suffisant', ceilingTypeQ: 'Type plafond', flat: 'Plat', flatDesc: 'Plafond droit', uneven: 'Irrégulier', unevenDesc: 'Avec pentes', unevenNote: 'Points différents', unevenTitle: 'Hauteurs différentes', unevenSubtitle: 'Précisez points haut/bas', highestPoint: 'Point haut', lowestPoint: 'Point bas', generalNote: '💡 Note: Mesures approximatives suffisantes' },
      step5: { title: 'Portée travaux', subtitle: 'Sélectionnez travaux', completeProject: 'Projet complet', completeProjectDesc: 'Tous les travaux inclus', orChoose: 'Ou choisissez:', wood: 'Bois', marble: 'Marbre', tiles: 'Carrelage', electrical: 'Électricité', plumbing: 'Plomberie', painting: 'Peinture', gypsum: 'Plâtre' },
      step6: { title: 'Appareils intégrés', subtitle: 'Appareils à intégrer', cooking: 'Cuisson', electricOven: 'Four électrique', electricOvenDesc: 'Four intégré', microwave: 'Micro-ondes', microwaveDesc: 'Micro-ondes intégré', stove: 'Cuisinière', stoveDesc: 'Cuisinière gaz', pizzaOven: 'Four à pizza', pizzaOvenDesc: 'Four pizza intégré', hood: 'Hotte', hoodDesc: 'Hotte aspirante', cooling: 'Refroidissement', fridge: 'Réfrigérateur', fridgeDesc: 'Frigo intégré', freezer: 'Congélateur', freezerDesc: 'Congélateur intégré', others: 'Autres', waterHeater: 'Chauffe-eau', waterHeaterDesc: 'Chauffe-eau', coffeeMachine: 'Machine à café', coffeeMachineDesc: 'Machine café intégrée', dishwasher: 'Lave-vaisselle', dishwasherDesc: 'Lave-vaisselle intégré', washingMachine: 'Lave-linge', washingMachineDesc: 'Lave-linge intégré', tapWithFilter: 'Robinet filtrant', tapWithFilterDesc: 'Robinet avec filtre', singleSink: 'Évier simple', singleSinkDesc: 'Un bac', doubleSink: 'Évier double', doubleSinkDesc: 'Deux bacs', faucet: 'Robinet', faucetDesc: 'Robinet cuisine', soapDispenser: 'Distributeur savon', soapDispenserDesc: 'Distributeur intégré', waterAndSink: 'Évier et eau', noteTitle: 'Note importante', noteText: 'Vous pouvez choisir plusieurs appareils. Tous vos choix seront pris en compte dans le design final. Les appareils intégrés donnent un look élégant et uniforme à la cuisine.' },
      step7: { title: 'Équipements armoires', subtitle: 'Équipements intérieurs', pullOutDrawers: 'Tiroirs coulissants', pullOutDrawersDesc: 'Tiroirs entiers', softClose: 'Fermeture douce', softCloseDesc: 'Portes douces', cornerSolutions: 'Solutions angles', cornerSolutionsDesc: 'Systèmes tournants', tallUnitOrganizers: 'Organiseurs hauts', tallUnitOrganizersDesc: 'Étagères organisées', spiceRacks: 'Porte-épices', spiceRacksDesc: 'Rangement épices', binSystems: 'Poubelles', binSystemsDesc: 'Poubelles intégrées', cutleryTrays: 'Range-couverts', cutleryTraysDesc: 'Organiseurs couverts', plateRacks: 'Porte-assiettes', plateRacksDesc: 'Rangement assiettes' },
      step8: { title: 'Type bois', subtitle: 'Choisissez le bois', melamine: 'Mélamine', melamineDesc: 'Économique et résistant', mdf: 'MDF', mdfDesc: 'Panneaux compressés', hdf: 'HDF', hdfDesc: 'Haute densité', multiplex: 'Multiplex', multiplexDesc: 'Multi-couches', natural: 'Bois naturel', naturalDesc: 'Bois 100% naturel', tip: '💡 Conseil: Le LATI résistant à l\'humidité et à la chaleur est le meilleur choix pour une utilisation quotidienne intensive.' },
      step9: { title: 'Portes et finition', subtitle: 'Système et finition', systemQ: 'Système portes:', inset: 'Encastré', insetDesc: 'Porte dans cadre', overlay: 'Appliqué', overlayDesc: 'Porte sur cadre', finishType: 'Type finition', finishTypeDesc: 'Aspect surface', matte: 'Mat', matteDesc: 'Surface lisse non brillante', glossy: 'Brillant', glossyDesc: 'Surface réfléchissante', colorQ: 'Couleur cuisine', colorQDesc: 'Couleur principale', colorPlaceholder: 'Ex: blanc, gris, beige, bois naturel...', colorNote: 'Écrivez nom/description, Graphitube proposera couleur du catalogue', colorRef: 'Référence couleur (optionnel)', colorRefDesc: 'Image ou lien couleur', uploadImage: 'Télécharger image', addLink: 'Ajouter lien', imageLink: 'Lien image', refLink: 'Lien référence', glassDoors: 'Portes vitrées aluminium', glassDoorsDesc: 'Nombre portes vitrées', glassDoorsCount: 'Nombre de portes', example2: 'Ex: 2', glassDoorsNote: 'Portes vitrées donnent look moderne', finishTip: 'Le choix de finition affecte entretien et apparence. Brillant est moderne mais montre traces, mat est plus facile à entretenir.' },
      step10: { title: 'Éclairage intégré', subtitle: 'Éclairage LED', underCabinet: 'Sous armoires', underCabinetDesc: 'LED sous armoires', insideCabinet: 'Dans armoires', insideCabinetDesc: 'Éclairage automatique', ledStrips: 'Bandes LED', ledStripsDesc: 'LED décoratives', spotlights: 'Spots', spotlightsDesc: 'Spots intégrés', tip: '💡 Conseil: L\'éclairage chaud (jaune) convient aux ambiances calmes, tandis que l\'éclairage froid (blanc) est meilleur pour le travail et la cuisine.' },
      step11: { title: 'Détails marbre', subtitle: 'Surface de travail', hasMarbleQ: 'Qui fournit?', providedByGraphitube: 'Graphitube fournit', providedByClient: 'Client fournit', typeQ: 'Type marbre', typePlaceholder: 'Ex: Carrare, granit...', colorQ: 'Couleur/modèle', colorSubtitle: 'Image ou lien', uploadImage: 'Télécharger', provideLink: 'Envoyer lien', colorLink: 'Lien', colorLinkPlaceholder: 'https://...', colorLinkNote: '💡 Lien image', cancelColor: 'Annuler', additionalNotes: 'Notes', additionalNotesPlaceholder: 'Détails...' },
      step12: { title: 'Détails carrelage', subtitle: 'Carrelage cuisine', hasTilesQ: 'Qui fournit?', providedByGraphitube: 'Graphitube fournit', providedByClient: 'Client fournit', typeQ: 'Type carrelage', typePlaceholder: 'Ex: céramique...', colorQ: 'Couleur/modèle', colorSubtitle: 'Image ou lien', uploadImage: 'Télécharger', provideLink: 'Envoyer lien', colorLink: 'Lien', colorLinkPlaceholder: 'https://...', colorLinkNote: '💡 Lien image', cancelColor: 'Annuler', additionalNotes: 'Notes', additionalNotesPlaceholder: 'Détails...' },
      step13: { title: 'Détails électricité', subtitle: 'Travaux électriques', includesQ: 'Inclut quoi?', wiringLabel: 'Câblage', wiringDesc: 'Installation câbles', outletsLabel: 'Prises/interrupteurs', outletsDesc: 'Installation prises', lightingLabel: 'Éclairage principal', lightingDesc: "Points d'éclairage", additionalNotes: 'Notes', additionalNotesPlaceholder: 'Détails...' },
      step14: { title: 'Détails plomberie', subtitle: 'Travaux plomberie', includesQ: 'Inclut quoi?', pipesLabel: 'Tuyaux', pipesDesc: 'Installation tuyaux', sinkLabel: 'Évier', sinkDesc: 'Installation évier', faucetsLabel: 'Robinets', faucetsDesc: 'Installation robinets', additionalNotes: 'Notes', additionalNotesPlaceholder: 'Détails...' },
      step15: { title: 'Détails peinture', subtitle: 'Travaux peinture', includesQ: 'Inclut quoi?', wallsLabel: 'Murs', wallsDesc: 'Peinture murs', ceilingLabel: 'Plafond', ceilingDesc: 'Peinture plafond', colorQ: 'Couleur peinture', colorSubtitle: 'Image ou lien', uploadImage: 'Télécharger', provideLink: 'Envoyer lien', colorLink: 'Lien', colorLinkPlaceholder: 'https://...', colorLinkNote: '💡 Lien couleur', cancelColor: 'Annuler', additionalNotes: 'Notes', additionalNotesPlaceholder: 'Détails...' },
      step16: { title: 'Détails plâtre', subtitle: 'Travaux plâtre', includesQ: 'Inclut quoi?', ceilingLabel: 'Faux plafond', ceilingDesc: 'Installation faux plafond', decorativeLabel: 'Décorations plâtre', decorativeDesc: 'Éléments décoratifs', additionalNotes: 'Notes', additionalNotesPlaceholder: 'Détails...' },
      step17: { title: 'Design 3D', subtitle: 'Visualisation 3D', wants3DQ: 'Voulez-vous design 3D?', yesWant: 'Oui', yesWantDesc: 'Je veux 3D', noWant: 'Non', noWantDesc: 'Pas de 3D', note: '💡 Note importante:', noteText: 'Le design 3D permet visualisation réaliste. Service payant, prix après étude.' },
      step18: { title: 'Notes supplémentaires', subtitle: 'Informations spéciales', placeholder: 'Écrivez notes...', note: '💡 Pour détails supplémentaires' },
      step19: { 
        title: 'Confirmation', 
        subtitle: 'Révision avant envoi', 
        reviewTitle: 'Résumé demande', 
        reviewSubtitle: 'Vérifiez informations', 
        customerInfo: 'Infos client', 
        name: 'Nom', 
        phone: 'Téléphone', 
        address: 'Adresse', 
        city: 'Ville', 
        kitchenDesign: 'Design cuisine', 
        dimensions: 'Dimensions', 
        ceiling: 'Plafond', 
        workScope: 'Portée', 
        appliances: 'Appareils', 
        equipment: 'Équipements', 
        woodType: 'Type bois', 
        doorSystem: 'Système portes', 
        lighting: 'Éclairage', 
        marbleDetails: 'Détails marbre', 
        tilesDetails: 'Détails carrelage', 
        electricalDetails: 'Détails électricité', 
        plumbingDetails: 'Détails plomberie', 
        paintingDetails: 'Détails peinture', 
        gypsumDetails: 'Détails plâtre', 
        design3D: 'Design 3D', 
        additionalNotes: 'Notes', 
        estimatedPrice: 'Prix estimatif', 
        estimatedPriceNote: 'Prix approximatif', 
        priceWillBeStudied: 'Étude projet et devis final', 
        confirmButton: 'Confirmer et envoyer',
        completeProject: 'Projet complet',
        installation: 'Installation',
        insetInstallation: 'Encastré',
        overlayInstallation: 'Appliqué',
        finish: 'Finition',
        glossyFinish: 'Brillant',
        matteFinish: 'Mat',
        kitchenColor: 'Couleur cuisine',
        design3DRequested: '✅ Design 3D demandé',
        design3DRequestedDesc: 'Un design 3D sera préparé avant exécution',
        priceNoticeTitle: 'Note sur le prix',
        priceNoticeDesc: 'Prix non disponible directement pour ces raisons:',
        priceNoticeContact: 'Nous vous contacterons par téléphone pour confirmer les détails et fournir un devis adapté.',
        pricingExplanationTitle: 'Comment fonctionne la tarification chez Graphitube?',
        pricingExplanationSubtitle: 'Nous voulons être clairs et transparents',
        standardOptionsTitle: 'Options standard = Prix immédiat',
        standardOptionsDesc: 'Si vous choisissez uniquement des options standard du catalogue (bois, équipements, finition standard...), le prix sera affiché directement sur le site après avoir complété toutes les étapes.',
        standardOptionsNote: '💰 C\'est l\'objectif principal du site: prix immédiat pour options standard',
        customOptionsTitle: 'Options personnalisées = Contact personnel',
        customOptionsDesc: 'Mais si vous choisissez des options personnalisées ou des matériaux externes non disponibles dans nos options standard, le prix ne peut pas être affiché directement. Par exemple:',
        customOptionsMarble: 'Marbre ou carrelage - nécessite étude de disponibilité et qualité',
        customOptions3D: 'Design 3D personnalisé - nécessite temps et coût supplémentaire',
        customOptionsMaterials: 'Matériaux hors catalogue - prix variables sur le marché',
        customOptionsDesigns: 'Designs spéciaux - nécessitent étude technique',
        whyThisApproachTitle: 'Pourquoi cette approche?',
        whyThisApproachDesc: 'Parce que nous voulons vous donner un prix réel et précis, pas une estimation qui pourrait changer plus tard. Les prix des matériaux externes et designs personnalisés varient selon le marché et la qualité demandée.',
        qualityGuaranteeTitle: 'Standards de qualité Graphitube',
        qualityGuaranteeDesc: 'Que ce soit prix immédiat ou sur contact, nous nous engageons à une haute qualité dans le bois, les équipements, la finition et la méthode d\'exécution. Vous trouverez peut-être des offres moins chères, mais la différence sera dans la qualité et la durabilité.',
        nextStepTitle: '⏰ Prochaine étape:',
        nextStepCustom: 'Comme vous avez choisi des options personnalisées, l\'équipe Graphitube vous contactera dès que possible pour confirmer les détails, répondre à vos questions et vous fournir un devis précis et détaillé adapté à votre projet.',
        nextStepStandard: 'Comme vous avez choisi des options standard, le prix estimatif sera affiché à l\'étape suivante. L\'équipe vous contactera pour confirmer les détails finaux.',
        readyToSendTitle: 'Prêt à envoyer?',
        readyToSendDesc: 'En cliquant sur "Envoyer la demande" ci-dessous, toutes les informations seront envoyées à l\'équipe Graphitube. Nous vous contacterons dans les plus brefs délais par téléphone ou WhatsApp.',
      },
    },
    salonSteps: {
      titles: ['Informations client', 'Type de salon', 'Dimensions', 'Éléments en bois', 'Type de bois', 'Décoration', 'Couleur', 'Confirmation'],
      step2: {
        title: 'Type de salon',
        subtitle: 'Choisissez le design qui correspond à votre espace',
        designLabel: 'Design souhaité',
        lShape: 'Salon en forme de L',
        uShape: 'Salon en forme de U',
        gShape: 'Salon en forme de G',
        square: 'Salon carré',
        rectangularOpen: 'Salon rectangulaire ouvert N°1',
        rectangularClosed: 'Salon rectangulaire ouvert N°2',
        customDesign: 'Design personnalisé',
        uploadImage: 'Télécharger image du design',
        uploadImageDesc: 'Téléchargez une photo ou un croquis du design que vous souhaitez',
        customPriceNote: 'Note: Les designs personnalisés nécessitent un contact direct avec l\'équipe Graphitube pour déterminer le prix précisément selon les détails spécifiques.',
      },
      step3: {
        title: 'Dimensions approximatives',
        subtitle: 'Entrez la longueur des murs en mètres',
        wall1: 'Longueur du premier mur (mètres)',
        wall2: 'Longueur du deuxième mur (mètres)',
        wall3: 'Longueur du troisième mur (mètres)',
        wall4: 'Longueur du quatrième mur (mètres)',
        wall2Middle: 'Longueur du deuxième mur (milieu) (mètres)',
        placeholder: 'Exemple: 4.5',
        note: '💡 Les mesures approximatives sont suffisantes à ce stade. Des mesures précises seront prises par notre équipe lors de la visite sur site.',
      },
      step4: {
        title: 'Éléments en bois',
        subtitle: 'Spécifiez les éléments en bois souhaités pour le salon',
        largeTables: 'Nombre de grandes tables (طبلة)',
        sundries: 'Nombre de petites tables (Sundries/سوندريات)',
        sidePanels: 'Nombre de panneaux latéraux (كوطي)',
        verticalShapes: 'Nombre de formes verticales (كوان)',
        verticalCorners: 'Nombre de coins verticaux (فرمجة)',
        note: '💡 Vous pouvez laisser le nombre à zéro (0) pour les éléments dont vous n\'avez pas besoin.',
      },
      step5: {
        title: 'Type de bois',
        subtitle: 'Choisissez le type de bois adapté à votre salon',
        choiceLabel: 'Choix du bois',
        chene: 'Bois de Chêne',
        cheneDesc: 'Bois solide et durable de couleur naturelle',
        noyer: 'Bois de Noyer',
        noyerDesc: 'Couleur foncée et luxueuse',
        laitre: 'Bois Le Laitre',
        laitreDesc: 'Bois de haute qualité et résistant',
        note: '💡 Nous utilisons du bois de haute qualité provenant de fournisseurs agréés pour garantir durabilité et beauté.',
      },
      step6: {
        title: 'Choix de décoration',
        subtitle: 'Choisissez le motif de décoration pour les murs de votre salon',
        note: '💡 Sélectionnez l\'un des motifs disponibles. Vous pouvez nous contacter pour ajouter de nouveaux motifs.',
      },
      step7: {
        title: 'Choix de couleur',
        subtitle: 'Choisissez la couleur pour la décoration sélectionnée',
        note: '💡 Toutes les couleurs sont disponibles. Vous pouvez demander des couleurs personnalisées en nous contactant.',
      },
      step8: {
        title: 'Confirmation',
        subtitle: 'Révision de tous les détails avant l\'envoi',
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
        decorationAndColor: 'Décoration et couleur',
        selectedPattern: 'Motif sélectionné',
        selectedColor: 'Couleur sélectionnée',
        linesCount: 'lignes',
        woodType: 'Type de bois',
        additionalNotes: 'Notes supplémentaires',
        readyToSendTitle: 'Prêt à envoyer!',
        readyToSendDesc: 'En cliquant sur "Envoyer", l\'équipe Graphitube examinera votre demande et vous contactera pour confirmer les détails et vous verrez le prix estimatif.',
        estimatedPrice: 'Prix estimatif',
        totalPrice: 'Prix total',
        priceNote: 'Ce prix est estimatif et peut changer selon les détails finaux',
        priceBreakdown: 'Détails du prix:',
        noPriceTitle: 'Prix non disponible',
        noPriceDesc: 'Le prix automatique n\'est pas disponible pour les designs personnalisés',
      },
      stepConfirmation: {
        title: 'Révision des informations',
        subtitle: 'Vérifiez les informations avant l\'envoi',
        customerInfo: 'Informations client',
        name: 'Nom:',
        phone: 'Téléphone:',
        address: 'Adresse:',
        city: 'Ville:',
        salonDesign: 'Design du salon',
        type: 'Type:',
        wall1Label: 'Longueur du premier mur:',
        wall2Label: 'Longueur du deuxième mur:',
        wall3Label: 'Longueur du troisième mur:',
        meters: 'mètres',
        woodElements: 'Éléments en bois',
        largeTablesLabel: 'Grandes tables:',
        sundriesLabel: 'Petites tables (Sundries):',
        sidePanelsLabel: 'Panneaux latéraux:',
        verticalShapesLabel: 'Formes verticales:',
        verticalCornersLabel: 'Coins verticaux:',
        woodType: 'Type de bois',
        woodTypeLabel: 'Bois sélectionné:',
        finalNote: 'Après l\'envoi de cette demande, l\'équipe Graphitube examinera tous les détails et vous contactera pour confirmer les informations et fournir le devis final.',
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
      tip: 'نصيحة',
      note: 'ملاحظة',
      importantNote: 'ملاحظة مهمة',
      currency: 'درهم',
      helpText: 'إلا ما فهمتيش شي حاجة، تواصل معانا فـ واتساب',
      whatsappNumber: '0609394003',
    },
    homePage: {
      headerTitle: 'Graphitube',
      badge: 'نجارة ديال لخشب',
      welcome: 'مرحبا بيك فـ Graphitube',
      subtitle: 'صمّم البروجي ديالك',
      description: 'اختار نوع البروجي',
      kitchenTitle: 'كوزينة',
      kitchenDescription: 'تصميم كوزينة على القياس',
      kitchenButton: 'ابدا تصميم الكوزينة',
      salonTitle: 'صالون',
      salonDescription: 'تصميم صالون على القياس',
      salonButton: 'ابدا ��صميم الصالون',
      infoNotice: 'غادي نبيّنو جميع التفاصيل خطوة ب خطوة من بعد ما تختار البروجي. إلا ما فهمتيش شي حاجة، تواصل معانا فـ واتساب.',
      whatsappContact: 'باش تتواصل معانا بزربة:',
      footerCopyright: '© 2026 Graphitube',
    },
    successPage: {
      thankYou: 'شكراً على الثقة ديالكم فـ Graphitube',
      thankYouMessage: 'كنشكروكوم على الوقت لي خصصتوه باش تعمرو هاد الفورمة',
      requestReceived: 'تسجّل الطلب ديالكم بنجاح',
      priceCalculated: 'تحسب',
      priceWillBeStudied: 'ليكيب ديال Graphitube غادي يدرس البروجي ديالكم',
      finalQuote: 'عرض الثمن النهائي',
      estimatedPrice: 'الثمن التقديري',
      estimatedPriceNote: 'هاد الثمن تقديري وممكن يتبدل حسب القياسات الدقيقة والمواد لي غادي تختارو',
      contactSoon: 'غادي نتصلو بيك قريب',
      contactSoonMessage: 'ليكيب ديالنا غادي يتواصل معاكم باش نأكدو التفاصيل وغادي تشوفو الثمن التقديري',
      importantNote: 'ملاحظة مهمة:',
      importantNoteText1: 'الثمن تقديري',
      importantNoteText2: 'ممكن يتبدل الثمن',
      orderSummary: 'ملخص الطلب',
      projectType: 'نوع البروجي',
      kitchen: 'كوزينة',
      salon: 'صالون',
      customerName: 'سمية الكليان',
      yourNotes: 'الملاحظات ديالك',
      whyGraphitube: 'علاش Graphitube؟',
      whyGraphitubeSubtitle: 'حنا كنقدمو أحسن الحلول فالنجارة الخشبية',
      whyGraphitubeText1: 'جودة عالية',
      whyGraphitubeText2: 'متانة ودقة',
      quality: 'جودة عالية',
      qualityDesc: 'كنستعملو أحسن أنواع لخشب والمواد المتينة باش نضمنو منتج كيدوم سنين',
      experience: 'خبرة واسعة',
      experienceDesc: 'ليكيب محترف بخبرة كتر من 15 عام فالنجارة والتصميم الداخلي',
      guarantee: 'ضمان الجودة',
      guaranteeDesc: 'كنقدمو ضمان كامل على جميع الخدمات ديالنا وكنلتازمو بأعلى معايير الجودة',
      team: 'ليكيب متخصص',
      teamDesc: 'ليكيب محترف ومدرّب كيهتم بأدق التفاصيل باش نضمنو رضاكم الكامل',
      customization: 'تصميم على حسب الطلب',
      customizationDesc: 'كل بروجي فريد، كنصممو ونصنعو على حسب احتياجاتكم والمساحة ديالكم',
      pricing: 'أثمنة تنافسية',
      pricingDesc: 'كنقدمو أحسن قيمة مقابل الفلوس مع جودة عالية وأثمنة عادلة وواضحة',
      nextSteps: 'الخطوات الجاية',
      teamWillContact: 'غادي يتواصل معاكم ليكيب ديال Graphitube عبر التيليفون ولا الواتساب باش نأكدو التفاصيل ونحددو موعد الزيارة',
      within24Hours: 'فـ 24 ساعة',
      backToHome: 'رجع للصفحة الرئيسية',
      whatHappensNext: 'شنو غادي يوقع دابا؟',
      step1Title: 'مراجعة الطلب',
      step1Description: 'غادي نراجعو الطلب ديالكم بعناية فـ 24 ساعة',
      step2Title: 'نتصلو بيكوم',
      step2Description: 'ليكيب ديالنا غادي يتصل بيكوم باش يأكد التفاصيل وينظم الموعد',
      step3Title: 'الزيارة الميدانية',
      step3Description: 'غادي نزوروكوم باش ناخذو القياسات الدقيقة ونتناقشو فالتفاصيل',
      contactTitle: 'عندكوم شي سؤال؟',
      contactDescription: 'تواصلو معانا دابا عبر الواتساب ولا التيليفون',
    },
    whatsapp: {
      buttonText: 'واتساب',
      needHelp: 'بغيتي مساعدة؟',
      helpMessage: 'إلا ما فهمتيش، تواصل معانا',
      contactUs: 'تواصل معانا',
      helpTemplate: 'ا��سلام، بغيت مساعدة فـ: {stepName}',
      generalHelpTemplate: 'السلام، بغيت مساعدة',
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
        'التأكيد',
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
      // Darija translations abbreviated
      step2: { title: 'تصميم الكوزينة', subtitle: 'اختار النوع', straight: 'كوزينة مستقيمة (I)', straightDesc: 'تصميم بسيط', lShape: 'كوزينة على شكل L', lShapeDesc: 'ديال الزوايا', uShape: 'كوزينة على شكل U', uShapeDesc: 'ثلاثة حيوط', gShape: 'كوزينة على شكل G', gShapeDesc: 'تصميم متقدم', island: 'مع جزيرة', islandDesc: 'طابلة فالوسط', other: 'تصميم آخر', otherDesc: '��صميم خاص', customLabel: 'وضّح التصميم', customPlaceholder: 'وصف مفصّل...', customNote: 'التصاميم المخصصة خاصهم اتصال مباشر' },
      step3: { title: 'القياسات', subtitle: 'بالمترو (تقريبي)', note: 'ماتقلقش، القياسات الدقيقة غادي يديروها ليكيب', straightLength: 'الطول الكامل', side1: 'الضلع الأول', side2: 'الضلع الثاني', side3: 'الضلع الثالث', side4: 'امتداد G', gExtension: 'امتداد G', kitchenLength: 'طول الكوزينة', islandDimensions: 'قياسات الجزيرة', islandLength: 'طول الجزيرة', islandWidth: 'عرض الجزيرة', placeholder: 'مثلاً: 3.5', meters: 'بالمترو' },
      step4: { title: 'طول السقف', subtitle: 'معلومات على الطول', reachesCeilingQ: 'واش كتوصل للسقف؟', yesReaches: 'آه', yesReachesDesc: 'كتوصل', noReaches: 'لا', noReachesDesc: 'ماكتوصلش', totalHeightLabel: 'الطول الكامل', totalHeightPlaceholder: 'مثلاً: 2.8', heightNote: '💡 القياس التقريبي كافي', ceilingTypeQ: 'نوع السقف', flat: 'مستو', flatDesc: 'سقف مستقيم', uneven: 'مامستويش', unevenDesc: 'فيه ميلان', unevenNote: 'نقاط مختلفة', unevenTitle: 'الطول المختلف', unevenSubtitle: 'حدد أعلى وأدنى نقطة', highestPoint: 'أعلى نقطة', lowestPoint: 'أدنى نقطة', generalNote: '💡 ملاحظة: القياسات التقريبية كافية' },
      step5: { title: 'الخدمات', subtitle: 'اختار الخدمات', completeProject: 'بروجي كامل', completeProjectDesc: 'جميع الخدمات', orChoose: 'ولا اختار:', wood: 'لخشب', marble: 'الرخام', tiles: 'الزليج', electrical: 'الضو', plumbing: 'الما', painting: 'الصباغة', gypsum: 'الجبس' },
      step6: { title: 'الأجهزة', subtitle: 'الأجهزة المدمجة', cooking: 'الطياب', electricOven: 'فرن كهربائي', electricOvenDesc: 'فرن مدمج', microwave: 'ميكرو', microwaveDesc: 'ميكروويف', stove: 'بوطاكاز', stoveDesc: 'طباخ', pizzaOven: 'فرن بيتزا', pizzaOvenDesc: 'فرن بيتزا', hood: 'شفاط', hoodDesc: 'شفاط', cooling: 'التبريد', fridge: 'فريكو', fridgeDesc: 'فريكو مدمج', freezer: 'كونجيلا', freezerDesc: 'كونجيلاتور', others: 'أخرى', waterHeater: 'سخان', waterHeaterDesc: 'سخان الما', coffeeMachine: 'ماكينة القهوة', coffeeMachineDesc: 'ماكينة', dishwasher: 'ماشين الطواجن', dishwasherDesc: 'غسالة الصحون', washingMachine: 'ماشين الحوايج', washingMachineDesc: 'غسالة', tapWithFilter: 'روبيني بفلتر', tapWithFilterDesc: 'روبيني مع فلتر', singleSink: 'إيفيي واحد', singleSinkDesc: 'إيفيي فرد', doubleSink: 'إيفيي زوج', doubleSinkDesc: 'إيفيي بجوج', faucet: 'روبيني', faucetDesc: 'روبيني الكوزينة', soapDispenser: 'موزع الصابون', soapDispenserDesc: 'موزع مدمج', waterAndSink: 'الإيفيي والما', noteTitle: 'ملاحظة مهمة', noteText: 'تقدر تختار بزاف ديال الأجهزة. كلشي غادي يتحط فالتصميم النهائي. الأجهزة المدمجة كيعطيو منظر زوين وموحد للكوزينة.' },
      step7: { title: 'معدات الخزانات', subtitle: 'التجهيزات الداخلية', pullOutDrawers: 'طيارات', pullOutDrawersDesc: 'طيارات كاملة', softClose: 'إغلاق هادئ', softCloseDesc: 'بيبان هادئة', cornerSolutions: 'حلول الزوايا', cornerSolutionsDesc: 'أنظمة دوارة', tallUnitOrganizers: 'منظمات', tallUnitOrganizersDesc: 'رفوف منظمة', spiceRacks: 'رفوف', spiceRacksDesc: 'رفوف التوابل', binSystems: 'الزبالة', binSystemsDesc: 'سلة مدمجة', cutleryTrays: 'صواني', cutleryTraysDesc: 'منظمات', plateRacks: 'رفوف الصحون', plateRacksDesc: 'تنظيم الصحون' },
      step8: { title: 'نوع لخشب', subtitle: 'اختار لخشب', melamine: 'ميلامين', melamineDesc: 'اقتصادي', mdf: 'MDF', mdfDesc: 'متوسط', hdf: 'HDF', hdfDesc: 'عالي', multiplex: 'موتيبلكس', multiplexDesc: 'متعدد الطبقات', natural: 'خشب طبيعي', naturalDesc: 'خشب 100%', tip: '💡 نصيحة: LATI المقاوم للرطوبة والحرارة هو الخيار المزيان إلا كانت الكوزينة تخدم كل نهار.' },
      step9: { title: 'البيبان والتشطيب', subtitle: 'النظام والتشطيب', systemQ: 'نظام البيبان:', inset: 'مدمج', insetDesc: 'الباب داخل', overlay: 'ملصوق', overlayDesc: 'الباب فوق', finishType: 'التشطيب', finishTypeDesc: 'مظهر السطح', matte: 'مطفي', matteDesc: 'سطح ناعم', glossy: 'لامع', glossyDesc: 'سطح براق', colorQ: 'لون الكوزينة', colorQDesc: 'اللون الأساسي', colorPlaceholder: 'مثلاً: أبيض، رمادي، بيج...', colorNote: 'كتب السمية ديال اللون، Graphitube غادي يقترح اللون', colorRef: 'مرجع اللون (اختياري)', colorRefDesc: 'صورة ولا رابط', uploadImage: 'تحميل صورة', addLink: 'زيد رابط', imageLink: 'رابط الصورة', refLink: 'رابط المرجع', glassDoors: 'بيبان الزجاج', glassDoorsDesc: 'عدد البيبان الزجاجية', glassDoorsCount: 'عدد البيبان', example2: '��ثال: 2', glassDoorsNote: 'البيبان الزجاجية كيعطيو مظهر عصري', finishTip: 'التشطيب كيأثر على التنظيف. اللامع عصري لكن كيبان الصباع، المطفي سهل التنظيف.' },
      step10: { title: 'الضو', subtitle: 'إضاءة LED', underCabinet: 'تحت الخزانات', underCabinetDesc: 'LED تحت', insideCabinet: 'داخل الخزانات', insideCabinetDesc: 'ضو أوتوماتيك', ledStrips: 'شرائط LED', ledStripsDesc: 'LED ديكور', spotlights: 'سبوتات', spotlightsDesc: 'سبوتات مدمجة', tip: '💡 نصيحة: الضو الدافي (أصفر) مزيان للجو الهادي، والضو البارد (أبيض) أحسن للخدمة والطياب.' },

      step11: { title: 'تفاصيل الرخام', subtitle: 'سطح العمل', hasMarbleQ: 'شكون غادي يجيب الرخام؟', providedByGraphitube: 'Graphitube', providedByClient: 'الكليان', typeQ: 'نوع الرخام', typePlaceholder: 'مثلاً: كرارة...', colorQ: 'اللون', colorSubtitle: 'صورة ولا رابط', uploadImage: 'رفع', provideLink: 'رابط', colorLink: 'رابط', colorLinkPlaceholder: 'https://...', colorLinkNote: '💡 رابط', cancelColor: 'إلغاء', additionalNotes: 'ملاحظات', additionalNotesPlaceholder: 'تفاصيل...' },
      step12: { title: 'تفاصيل الزليج', subtitle: 'الزليج', hasTilesQ: 'شكون غادي يجيب الزليج؟', providedByGraphitube: 'Graphitube', providedByClient: 'الكليان', typeQ: 'نوع الزليج', typePlaceholder: 'مثلاً: سيراميك...', colorQ: 'اللون', colorSubtitle: 'صورة ولا رابط', uploadImage: 'رفع', provideLink: 'رابط', colorLink: 'رابط', colorLinkPlaceholder: 'https://...', colorLinkNote: '💡 رابط', cancelColor: 'إلغاء', additionalNotes: 'ملاحظات', additionalNotesPlaceholder: 'تفاصيل...' },
      step13: { title: 'تفاصيل الكهرباء', subtitle: 'الأشغال الكهربائية', includesQ: 'ما الذي تشمله أشغال الكهرباء؟', wiringLabel: 'الأسلاك', wiringDesc: 'تمديد الأسلاك', outletsLabel: 'البريزات', outletsDesc: 'تركيب البريزات', lightingLabel: 'الإضاءة', lightingDesc: 'نقاط الضو', additionalNotes: 'ملاحظات', additionalNotesPlaceholder: 'تفاصيل...' },
      step14: { title: 'تفاصيل الما', subtitle: 'السباكة', includesQ: 'ما الذي تشمله أشغال السباكة؟', pipesLabel: 'القصبات', pipesDesc: 'تركيب القصبات', sinkLabel: 'الحوض', sinkDesc: 'تركيب الحوض', faucetsLabel: 'الروبينيات', faucetsDesc: 'تركيب الروبينيات', additionalNotes: 'ملاحظات', additionalNotesPlaceholder: 'تفاصيل...' },
      step15: { title: 'تفاصيل الصباغة', subtitle: 'الصباغة', includesQ: 'ما الذي تشمله أشغال الصباغة؟', wallsLabel: 'الحيوط', wallsDesc: 'صباغة الحيوط', ceilingLabel: 'السقف', ceilingDesc: 'صباغة السقف', colorQ: 'اللون', colorSubtitle: 'صورة ولا رابط', uploadImage: 'رفع', provideLink: 'رابط', colorLink: 'رابط', colorLinkPlaceholder: 'https://...', colorLinkNote: '💡 رابط', cancelColor: 'إلغاء', additionalNotes: 'ملاحظات', additionalNotesPlaceholder: 'تفاصيل...' },
      step16: { title: 'تفاصيل الجبس', subtitle: 'الجبس', includesQ: 'ما الذي تشمله أشغال الجبس؟', ceilingLabel: 'فوبلافون', ceilingDesc: 'تركيب فوبلافون', decorativeLabel: 'ديكور جبس', decorativeDesc: 'عناصر ديكورية', additionalNotes: 'ملاحظات', additionalNotesPlaceholder: 'تفاصيل...' },
      step17: { title: 'التصميم 3D', subtitle: 'تصميم ثلاثي الأبعاد', wants3DQ: 'بغيتي تصميم 3D؟', yesWant: 'آه', yesWantDesc: 'بغيت 3D', noWant: 'لا', noWantDesc: 'مابغيتش', note: '💡 ملاحظة:', noteText: 'التصميم 3D غادي يعاونك تشوف الكوزينة قبل ماتبدا. الخدمة مخلصة.' },
      step18: { title: 'ملاحظات زايدة', subtitle: 'معلومات خاصة', placeholder: 'كتب الملاحظات...', note: '💡 باش تزيد تفاصيل' },
      step19: { 
        title: 'التأكيد', 
        subtitle: 'مراجعة قبل الإرسال', 
        reviewTitle: 'ملخص', 
        reviewSubtitle: 'تأكد من المعلومات', 
        customerInfo: 'معلومات الكليان', 
        name: 'السمية', 
        phone: 'التيليفون', 
        address: 'العنوان', 
        city: 'المدينة', 
        kitchenDesign: 'التصميم', 
        dimensions: 'القياسات', 
        ceiling: 'السقف', 
        workScope: 'الخدمات', 
        appliances: 'الأجهزة', 
        equipment: 'المعدات', 
        woodType: 'نوع لخشب', 
        doorSystem: 'البيبان', 
        lighting: 'الضو', 
        marbleDetails: 'الرخام', 
        tilesDetails: 'الزليج', 
        electricalDetails: 'الضو', 
        plumbingDetails: 'الما', 
        paintingDetails: 'الصباغة', 
        gypsumDetails: 'الجبس', 
        design3D: 'تصميم 3D', 
        additionalNotes: 'ملاحظات', 
        estimatedPrice: 'الثمن التقديري', 
        estimatedPriceNote: 'الثمن تقديري', 
        priceWillBeStudied: 'غادي يتدرس البروجي', 
        confirmButton: 'أكّد وصيفط',
        completeProject: 'بروجي كامل',
        installation: 'التركيب',
        insetInstallation: 'مدمج',
        overlayInstallation: 'ملصوق',
        finish: 'التشطيب',
        glossyFinish: 'لامع',
        matteFinish: 'مطفي',
        kitchenColor: 'لون الكوزينة',
        design3DRequested: '✅ طلبتي تصميم 3D',
        design3DRequestedDesc: 'غادي يتعمل ليك تصميم 3D قبل مايبداو',
        priceNoticeTitle: 'ملاحظة على الثمن',
        priceNoticeDesc: 'ماقدرناش نعطيوك الثمن دابا لهاد الأسباب:',
        priceNoticeContact: 'غادي نتصلو بيك باش نأكدو التفاصيل ونعطيوك الثمن المناسب.',
        pricingExplanationTitle: 'كيفاش كتخدم التسعيرة عند Graphitube؟',
        pricingExplanationSubtitle: 'بغينا نكونو واضحين معاكم',
        standardOptionsTitle: 'خيارات عادية = ثمن فوري',
        standardOptionsDesc: 'إلا اختارتي خيارات عادية فقط من الكتالوك (لخشب، المعدات، التشطيب عادي...)، غادي يتعرض الثمن مباشرة فالموقع من بعد ماتكمل جميع الخطوات.',
        standardOptionsNote: '💰 هاذا هو الهدف الأساسي من الموقع: ثمن فوري للخيارات العادية',
        customOptionsTitle: 'خيارات خاصة = اتصال شخصي',
        customOptionsDesc: 'لكن إلا اختارتي خيارات خاصة ولا مواد من برا ماشي موجودة فخياراتنا العادية، ماغاديش يتعرض الثمن مباشرة. بحال:',
        customOptionsMarble: 'الرخام ولا الزليج - خاصو دراسة ديال التوفر والجودة',
        customOptions3D: 'تصميم 3D خاص - خاصو وقت وتكلفة زايدة',
        customOptionsMaterials: 'مواد خارج الكتالوك - الثمن ديالهم كيتبدل فالسوق',
        customOptionsDesigns: 'تصاميم خاصة - خاصهم دراسة هندسية',
        whyThisApproachTitle: 'علاش هادشي؟',
        whyThisApproachDesc: 'حيت بغينا نعطيوك ثمن حقيقي ودقيق، ماشي رقم تقريبي ممكن يتبدل من بعد. الثمن ديال المواد البرانية والتصاميم الخاصة كيتبدل حسب السوق والجودة لي بغيتي.',
        qualityGuaranteeTitle: 'معايير الجودة عند Graphitube',
        qualityGuaranteeDesc: 'سواء ثمن فوري ولا بالاتصال، حنا كنلتازمو بجودة عالية فلخشب، المعدات، التشطيب، وطريقة التنفيذ. ممكن تلقى عروض برخص، لكن الفرق غادي يكون فالجودة والمتانة.',
        nextStepTitle: '⏰ الخطوة الجاية:',
        nextStepCustom: 'بما أنك اختارتي خيارات خاصة، غادي يتصلو بيك لإكيب ديال Graphitube فأسرع وقت باش يأكدو التفاصيل، يجاوبو على الأسئلة ديالك، ويعطيوك عرض ثمن دقيق ومفصل كيناسب البروجي ديالك.',
        nextStepStandard: 'بما أنك اختارتي خيارات عادية، غادي يتعرض الثمن التقديري فالخطوة الجاية. ولإكيب غادي يتصلو بيك باش يأكدو التفاصيل النهائية.',
        readyToSendTitle: 'واجد باش تصيفط؟',
        readyToSendDesc: 'بالضغط على "صيفط الطلب" من تحت، جميع المعلومات غادي يتصيفطو للإكيب ديال Graphitube. غادي نتصلو بيكم فأسرع وقت ممكن عبر التيليفون ولا الواتساب.',
      },
    },
    salonSteps: {
      titles: ['معلومات الكليان', 'نوع الصالون', 'القياسات', 'عن��صر لخشب', 'نوع لخشب', 'الزخرفة', 'اللون', 'التأكيد'],
      step2: {
        title: 'نوع الصالون',
        subtitle: 'اختار التصميم لي كيناسبك',
        designLabel: 'التصميم لي بغيتي',
        lShape: 'صالون على شكل حرف L',
        uShape: 'صالون على شكل حرف U',
        gShape: 'صالون على شكل حرف G',
        square: 'صالون مربع',
        rectangularOpen: 'صالون مستطيل مفتوح رقم 1',
        rectangularClosed: 'صالون مستطيل مفتوح رقم 2',
        customDesign: 'تصميم خاص',
        uploadImage: 'ارفع صورة التصميم',
        uploadImageDesc: 'ارفع تصويرة ولا رسم ديال التصميم لي بغيتي',
        customPriceNote: 'ملاحظة: التصاميم الخاصة خاصهم اتصال مباشر مع لإكيب ديال Graphitube باش نحددو الثمن بدقة حسب التفاصيل.',
      },
      step3: {
        title: 'القياسات التقريبية',
        subtitle: 'دخّل طول الحيوط بالميترو',
        wall1: 'طول الحيط الأول (ميترو)',
        wall2: 'طول الحيط الثاني (ميترو)',
        wall3: 'طول الحيط الثالث (ميترو)',
        wall4: 'طول الحيط الرابع (ميترو)',
        wall2Middle: 'طول الحيط الثاني (الوسط) (ميترو)',
        placeholder: 'مثال: 4.5',
        note: '💡 القياسات التقريبية كافيين دابا. غادي ناخدو القياسات الدقيقة فالزيارة.',
      },
      step4: {
        title: 'عناصر لخشب',
        subtitle: 'حدّد العناصر ديال لخشب لي بغيتي فالصالون',
        largeTables: 'عدد الطبلات الكبيرة (طبلة)',
        sundries: 'عدد الطبلات الصغيرة (سوندريات)',
        sidePanels: 'عدد الجوانب الجانبية (كوطي)',
        verticalShapes: 'عدد الأشكال العمودية (كوان)',
        verticalCorners: 'عدد الزوايا العمودية (فرمجة)',
        note: '💡 تقدر تخلّي العدد صفر (0) للحوايج لي ماحتاجهمش.',
      },
      step5: {
        title: 'نوع لخشب',
        subtitle: 'اختار نوع لخشب المناسب للصالون ديالك',
        choiceLabel: 'اختيار لخشب',
        chene: 'خشب الشان',
        cheneDesc: 'خشب قوي ومتين بلون طبيعي',
        noyer: 'خشب الجوز (النوايي)',
        noyerDesc: 'لون غامق وفخم',
        laitre: 'خشب الليدر (الليطر)',
        laitreDesc: 'خشب عالي الجودة ومقاوم',
        note: '💡 كنستعملو خشب عالي الجودة من موردين معتمدين باش نضمنو المتانة والزين.',
      },
      step6: {
        title: 'اختيار الزخرفة',
        subtitle: 'اختار الموديل ديال الزخرفة لحيوط الصالون ديالك',
        note: '💡 اختار واحد من الموديلات. تقدر تواصل معانا باش نزيدو موديلات جديدة.',
      },
      step7: {
        title: 'اختيار اللون',
        subtitle: 'اختار اللون المناسب للزخرفة لي اخترتي',
        note: '💡 كاملين اللوان موجودين. تقدر تطلب ألوان خاصة عبر التواصل معانا.',
      },
      step8: {
        title: 'التأكيد',
        subtitle: 'مراجعة جميع التفاصيل قبل الإرسال',
        customerInfo: 'معلومات الكليان',
        name: 'السمية',
        phone: 'التيليفون',
        city: 'المدينة',
        projectType: 'نوع البروجي',
        dimensions: 'القياسات',
        length: 'الطول',
        width: 'العرض',
        height: 'الارتفاع',
        meters: 'ميترو',
        workScope: 'الخدمات',
        completeProject: 'بروجي كامل',
        decorationAndColor: 'الزخرفة واللون',
        selectedPattern: 'الزخرفة المختارة',
        selectedColor: 'اللون المختار',
        linesCount: 'خطوط',
        woodType: 'نوع لخشب',
        additionalNotes: 'ملاحظات زايدة',
        readyToSendTitle: 'واجد للإرسال!',
        readyToSendDesc: 'بعد النقر على "صيفط"، فريق Graphitube غادي يراجع الطلب ديالك ويتواصل معاك باش يأكد التفاصيل وغادي تشوف الثمن التقديري.',
        estimatedPrice: 'الثمن المقدر',
        totalPrice: 'الثمن الإجمالي',
        priceNote: 'هاد الثمن تقديري وممكن يتبدل حسب التفاصيل النهائية',
        priceBreakdown: 'تفاصيل الثمن:',
        noPriceTitle: 'الثمن مامتوفرش',
        noPriceDesc: 'الثمن الأوتوماتيكي مامتوفرش للتصاميم المخصصة',
      },
      stepConfirmation: {
        title: 'مراجعة المعلومات',
        subtitle: 'تأكد من المعلومات قبل الإرسال',
        customerInfo: 'معلومات الكليان',
        name: 'السمية:',
        phone: 'التيليفون:',
        address: 'العنوان:',
        city: 'المدينة:',
        salonDesign: 'تصميم الصالون',
        type: 'النوع:',
        wall1Label: 'طول الحيط الأول:',
        wall2Label: 'طول الحيط الثاني:',
        wall3Label: 'طول الحيط الثالث:',
        meters: 'ميترو',
        woodElements: 'عناصر لخشب',
        largeTablesLabel: 'الطبلات الكبيرة:',
        sundriesLabel: 'الطبلات الصغيرة (سوندريات):',
        sidePanelsLabel: 'الجوانب الجانبية:',
        verticalShapesLabel: 'الأشكال العمودية:',
        verticalCornersLabel: 'الزوايا العمودية:',
        woodType: 'نوع لخشب',
        woodTypeLabel: 'لخشب لي اختارتي:',
        finalNote: 'من بعد ما تصيفط هاد الطلب، الإكيب ديال Graphitube غادي يراجع جميع التفاصيل ويتصل بيك باش يأكد المعلومات ويعطيك الثمن النهائي.',
      },
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  console.log('🌍 [LanguageProvider] Initializing...');
  
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('graphitube_language');
      console.log('🌍 [LanguageProvider] Saved language:', saved);
      if (saved && (saved === 'ar' || saved === 'fr' || saved === 'darija')) {
        return saved as Language;
      }
    } catch (e) {
      console.error('Failed to load language:', e);
    }
    return 'ar';
  });
  
  console.log('🌍 [LanguageProvider] Current language:', language);

  useEffect(() => {
    try {
      localStorage.setItem('graphitube_language', language);
    } catch (e) {
      console.error('Failed to save language:', e);
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const dir = language === 'fr' ? 'ltr' : 'rtl';
  
  console.log('🌍 [LanguageProvider] Providing context with dir:', dir);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
        dir,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}