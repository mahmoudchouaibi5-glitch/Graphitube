# Netlify Headers Configuration for Graphitube PWA

# PWA Manifest
/manifest.json
  Content-Type: application/json
  Cache-Control: public, max-age=0, must-revalidate

# Service Worker
/sw.js
  Content-Type: application/javascript; charset=utf-8
  Cache-Control: public, max-age=0, must-revalidate

# Digital Asset Links for TWA
/.well-known/*
  Content-Type: application/json
  Access-Control-Allow-Origin: *
  Cache-Control: public, max-age=31536000

# Static Assets - Long cache
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# Images - Long cache
/*.png
  Cache-Control: public, max-age=31536000, immutable

/*.jpg
  Cache-Control: public, max-age=31536000, immutable

/*.svg
  Cache-Control: public, max-age=31536000, immutable

/*.webp
  Cache-Control: public, max-age=31536000, immutable

# Security Headers - All pages
/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
