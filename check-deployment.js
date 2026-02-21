#!/usr/bin/env node

/**
 * Check Deployment Status
 * يشوف واش الملفات منشورة على GitHub Pages
 */

const baseUrl = 'https://mahmoudchouaibi5-glitch.github.io/Graphitube/';

const filesToCheck = [
  '',
  'index.html',
  'manifest.webmanifest',
  'test-page.html',
  'debug.html',
  'clear-sw.html',
  'icon-192.png',
  'icon-512.png',
  '404.html',
];

console.log('═══════════════════════════════════════════════════════');
console.log('🔍 Checking Deployment Status');
console.log('═══════════════════════════════════════════════════════\n');

async function checkFile(path) {
  const url = baseUrl + path;
  const displayPath = path || 'index.html (root)';
  
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const status = response.status;
    const icon = status === 200 ? '✅' : '❌';
    
    console.log(`${icon} ${displayPath.padEnd(30)} [${status}]`);
    
    return { path: displayPath, status, ok: response.ok };
  } catch (error) {
    console.log(`❌ ${displayPath.padEnd(30)} [ERROR: ${error.message}]`);
    return { path: displayPath, status: 'ERROR', ok: false, error: error.message };
  }
}

async function main() {
  const results = [];
  
  for (const file of filesToCheck) {
    const result = await checkFile(file);
    results.push(result);
  }
  
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('📊 Summary');
  console.log('═══════════════════════════════════════════════════════\n');
  
  const successful = results.filter(r => r.ok).length;
  const failed = results.filter(r => !r.ok).length;
  
  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📁 Total: ${results.length}`);
  
  if (successful === 0) {
    console.log('\n🚨 CRITICAL: No files found!');
    console.log('   → GitHub Pages might not be deployed yet');
    console.log('   → Check: https://github.com/mahmoudchouaibi5-glitch/Graphitube/actions\n');
  } else if (failed > 0) {
    console.log('\n⚠️  WARNING: Some files are missing');
    console.log('   → Run: npm run build');
    console.log('   → Then: git push origin main\n');
  } else {
    console.log('\n🎉 SUCCESS: All files deployed!');
    console.log('   → Try clearing Service Worker cache');
    console.log('   → Open: ' + baseUrl + 'clear-sw.html\n');
  }
  
  console.log('═══════════════════════════════════════════════════════\n');
}

main();
