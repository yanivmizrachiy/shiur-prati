// tools/verify-pwa.mjs
// Guard: PWA installability — manifest.webmanifest, sw.js, icon, and <link rel="manifest"> in index.html.
// Run: node tools/verify-pwa.mjs

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const generatorDir = resolve(__dir, '..', 'generator');

let fails = 0;
function fail(msg) { console.log('FAIL — ' + msg); fails++; }
function pass(msg) { console.log('PASS — ' + msg); }

// --- 1. manifest.webmanifest exists ---
const manifestPath = resolve(generatorDir, 'manifest.webmanifest');
if (!existsSync(manifestPath)) {
  fail('generator/manifest.webmanifest not found');
} else {
  let manifest;
  try {
    manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    pass('manifest.webmanifest exists and is valid JSON');
  } catch (e) {
    fail('manifest.webmanifest is not valid JSON: ' + e.message);
    manifest = null;
  }

  if (manifest) {
    // Required manifest fields
    const required = ['name', 'short_name', 'start_url', 'display', 'icons'];
    for (const field of required) {
      if (!manifest[field]) {
        fail(`manifest.webmanifest missing required field: "${field}"`);
      } else {
        pass(`manifest.webmanifest has "${field}": ${JSON.stringify(manifest[field]).slice(0, 60)}`);
      }
    }

    // icons must be non-empty array
    if (Array.isArray(manifest.icons) && manifest.icons.length > 0) {
      pass('manifest.webmanifest icons array is non-empty (' + manifest.icons.length + ' icon(s))');
      // Each icon must have src, sizes
      for (const icon of manifest.icons) {
        if (!icon.src) fail('manifest icon missing "src"');
        else if (!icon.sizes) fail('manifest icon missing "sizes"');
        else pass('manifest icon: src=' + icon.src + ' sizes=' + icon.sizes);
      }
    } else {
      fail('manifest.webmanifest icons array is missing or empty — PWA will not be installable');
    }

    // Must be RTL Hebrew
    if (manifest.dir !== 'rtl') fail('manifest.webmanifest dir should be "rtl" (is: ' + manifest.dir + ')');
    else pass('manifest.webmanifest dir=rtl ✓');
    if (manifest.lang !== 'he') fail('manifest.webmanifest lang should be "he" (is: ' + manifest.lang + ')');
    else pass('manifest.webmanifest lang=he ✓');

    // display must be standalone or fullscreen (not browser)
    if (!['standalone', 'fullscreen', 'minimal-ui'].includes(manifest.display)) {
      fail('manifest.webmanifest display should be standalone/fullscreen/minimal-ui (is: ' + manifest.display + ')');
    } else {
      pass('manifest.webmanifest display=' + manifest.display + ' ✓');
    }
  }
}

// --- 2. icon exists ---
// Accept any icon file referenced in manifest, plus default icon.svg
const iconPath = resolve(generatorDir, 'icon.svg');
if (!existsSync(iconPath)) {
  fail('generator/icon.svg not found');
} else {
  const iconContent = readFileSync(iconPath, 'utf8');
  if (!iconContent.includes('<svg') || iconContent.length < 100) {
    fail('generator/icon.svg appears malformed (too short or missing <svg tag)');
  } else {
    pass('generator/icon.svg exists and looks valid (' + iconContent.length + ' bytes)');
  }
}

// --- 3. sw.js exists ---
const swPath = resolve(generatorDir, 'sw.js');
if (!existsSync(swPath)) {
  fail('generator/sw.js not found');
} else {
  const swContent = readFileSync(swPath, 'utf8');
  const swChecks = [
    ['install event', /addEventListener\(\s*['"]install['"]/],
    ['activate event', /addEventListener\(\s*['"]activate['"]/],
    ['fetch event', /addEventListener\(\s*['"]fetch['"]/],
    ['cache name', /const CACHE/],
    ['caches.open', /caches\.open/],
    ['skipWaiting', /skipWaiting/],
  ];
  for (const [label, rx] of swChecks) {
    if (!rx.test(swContent)) fail('sw.js missing ' + label);
    else pass('sw.js has ' + label);
  }
}

// --- 4. index.html has <link rel="manifest"> ---
const indexPath = resolve(generatorDir, 'index.html');
if (!existsSync(indexPath)) {
  fail('generator/index.html not found');
} else {
  const indexContent = readFileSync(indexPath, 'utf8');

  if (!/rel=["']manifest["']/.test(indexContent)) {
    fail('generator/index.html missing <link rel="manifest"> — browser will not detect PWA');
  } else {
    pass('generator/index.html has <link rel="manifest">');
  }

  if (!/serviceWorker/.test(indexContent)) {
    fail('generator/index.html missing service worker registration script');
  } else {
    pass('generator/index.html has service worker registration');
  }

  // Check SW registration points to sw.js
  if (!indexContent.includes('sw.js')) {
    fail('generator/index.html SW registration does not reference sw.js');
  } else {
    pass('generator/index.html SW registration references sw.js');
  }

  // Check theme-color meta still present
  if (!/name=["']theme-color["']/.test(indexContent)) {
    fail('generator/index.html missing <meta name="theme-color"> (recommended for PWA)');
  } else {
    pass('generator/index.html has <meta name="theme-color">');
  }
}

// --- Summary ---
console.log('');
if (fails === 0) {
  console.log('verify:pwa PASS — manifest + sw.js + icon + index.html wiring all confirmed ✓');
  process.exit(0);
} else {
  console.log('verify:pwa FAIL — ' + fails + ' check(s) failed');
  process.exit(1);
}
