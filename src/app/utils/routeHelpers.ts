// Kitchen step URL mappings
export const kitchenStepUrls: Record<number, string> = {
  1: 'معلومات-العميل',
  2: 'نوع-التصميم',
  3: 'الأبعاد',
  4: 'الارتفاع-والسقف',
  5: 'نطاق-الأعمال',
  6: 'الأجهزة-المدمجة',
  7: 'معدات-الخزانات',
  8: 'نوع-الخشب',
  9: 'نظام-الأبواب',
  10: 'الإضاءة',
  11: 'الرخام',
  12: 'السيراميك',
  13: 'الكهرباء',
  14: 'السباكة',
  15: 'الدهان',
  16: 'الجبس',
  17: 'تصميم-3d',
  18: 'الملخص',
};

// Salon step URL mappings
export const salonStepUrls: Record<number, string> = {
  1: 'معلومات-العميل',
  2: 'نوع-الصالون',
  3: 'الأبعاد',
  4: 'العناصر-الخشبية',
  5: 'نوع-الخشب',
  6: 'الزخرفة',
  7: 'اللون',
  8: 'الملخص',
};

// Reverse mappings for URL to step number
export const kitchenUrlToStep: Record<string, number> = Object.fromEntries(
  Object.entries(kitchenStepUrls).map(([step, url]) => [url, Number(step)])
);

export const salonUrlToStep: Record<string, number> = Object.fromEntries(
  Object.entries(salonStepUrls).map(([step, url]) => [url, Number(step)])
);

// Helper to get step from URL path
export function getStepFromPath(path: string, type: 'kitchen' | 'salon'): number {
  const urlMap = type === 'kitchen' ? kitchenUrlToStep : salonUrlToStep;
  const parts = path.split('/').filter(Boolean);
  const lastPart = decodeURIComponent(parts[parts.length - 1]); // ✅ Decode URL-encoded Arabic characters
  const stepNumber = urlMap[lastPart] || 1;
  
  console.log('🔍 [getStepFromPath]', {
    type,
    path,
    parts,
    lastPart,
    decoded: lastPart,
    stepNumber,
    urlMap
  });
  
  return stepNumber;
}

// Helper to get URL from step
export function getUrlFromStep(step: number, type: 'kitchen' | 'salon'): string {
  const urlMap = type === 'kitchen' ? kitchenStepUrls : salonStepUrls;
  const baseUrl = type === 'kitchen' ? '/المطبخ' : '/الصالون';
  return `${baseUrl}/${urlMap[step] || urlMap[1]}`;
}