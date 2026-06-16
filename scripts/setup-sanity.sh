#!/bin/bash
# TechPulse — Sanity Setup Script
# Chạy script này sau khi tạo Sanity project trên sanity.io

echo "🔧 TechPulse Sanity Setup"
echo "========================"

# Check if sanity CLI is installed
if ! command -v sanity &> /dev/null; then
    echo "📦 Installing Sanity CLI..."
    npm install -g @sanity/cli
fi

echo ""
echo "📋 Hướng dẫn:"
echo "1. Đăng nhập sanity.io: sanity login"
echo "2. Tạo project mới: sanity init"
echo "3. Chọn 'Create new project'"
echo "4. Project name: TechPulse CMS"
echo "5. Dataset: production"
echo "6. Template: Clean project"
echo "7. Copy Project ID vào file .env.local"
echo ""
echo "🔑 Sau khi tạo project:"
echo "1. Copy schemas từ sanity/schemas/ vào sanity/schemas/"
echo "2. Deploy Sanity Studio: sanity deploy"
echo "3. Mở Studio: sanity manage"
echo ""
echo "🚀 Deploy Frontend lên Vercel:"
echo "1. Tạo GitHub repo"
echo "2. Push code lên"
echo "3. Kết nối repo với Vercel"
echo "4. Thêm environment variables trên Vercel:"
echo "   - NEXT_PUBLIC_SANITY_PROJECT_ID"
echo "   - NEXT_PUBLIC_SANITY_DATASET"
echo ""
echo "✅ Done!"
