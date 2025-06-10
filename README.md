# 藍新金流一頁式付款網站

這是一個使用 Next.js、React、Tailwind CSS 和 Shadcn UI 構建的一頁式付款網站，整合了台灣的藍新金流服務。

## 功能特點

- 響應式設計，支援各種裝置大小
- 使用 Zod 進行表單驗證
- 藍新金流整合（信用卡付款）
- 付款結果頁面
- 錯誤處理和通知

## 技術堆疊

- [Next.js 15](https://nextjs.org/) - React 框架
- [React 19](https://react.dev/) - 前端函式庫
- [Tailwind CSS 4](https://tailwindcss.com/) - CSS 工具框架
- [Shadcn UI](https://ui.shadcn.com/) - UI 元件庫
- [React Hook Form](https://react-hook-form.com/) - 表單處理
- [Zod](https://zod.dev/) - 類型驗證
- [CryptoJS](https://cryptojs.gitbook.io/docs/) - 加密函式庫

## 開始使用

### 前置需求

- Node.js 20+
- pnpm 10+

### 安裝步驟

1. 克隆專案

```bash
git clone https://github.com/yourusername/gddao-newebpay.git
cd gddao-newebpay
```

2. 安裝依賴

```bash
pnpm install
```

3. 設定環境變數

複製 `.env.example` 檔案並命名為 `.env.local`，然後填寫以下資訊：

```bash
# 藍新金流參數
NEWEBPAY_MERCHANT_ID=你的商店代號
NEWEBPAY_HASH_KEY=你的HashKey
NEWEBPAY_HASH_IV=你的HashIV
NEXT_PUBLIC_NEWEBPAY_URL=https://ccore.newebpay.com/MPG/mpg_gateway

# 網站URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. 執行開發環境

```bash
pnpm dev
```

5. 打開瀏覽器訪問 [http://localhost:3000](http://localhost:3000)

## 部署步驟

### 使用 Nginx 部署

1. 建置生產版本

```bash
pnpm build
```

2. 設定 Nginx 配置

```nginx
server {
    listen 80;
    server_name ecommerce.gddao.com;

    location / {
        root /var/www/html/ecommerce;
        try_files $uri $uri/ /index.html;
        index index.html;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. 將生成的 `out` 目錄內容複製到 `/var/www/html/ecommerce`

```bash
cp -r out/* /var/www/html/ecommerce/
```

## 藍新金流測試資訊

### 測試卡號

- 信用卡號：4000-2211-1111-1111
- 到期日：任一未到期日期
- 安全碼：任意三碼

### 測試流程

1. 填寫付款表單
2. 點擊「前往付款」按鈕
3. 在藍新金流測試頁面輸入測試卡號
4. 完成測試付款流程
5. 系統將導回付款結果頁面

## 注意事項

- 本專案使用了藍新金流測試環境，上線前需要更換正式環境的參數
- 正式環境上線前，請務必完成各種付款情境的測試
- 請確保伺服器能夠接收藍新金流的回調通知
