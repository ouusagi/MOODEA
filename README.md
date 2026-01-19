<p align="center">
  <img src="./public/MOODEA.png" alt="MOODÉA Logo" width="120" />
</p>

<h1 align="center">MOODÉA</h1>

<p align="center">
  React + Supabase 기반のビューティーEC Webアプリケーション
</p>

<p align="center">
  <a href="https://xxxx">🔗 Deploy</a> ·
  <a href="https://github.com/ouusagi/MOODEA">📦 GitHub</a>
</p>

---

## 🧴 プロジェクト概要

**MOODÉA** は、スキンケア・ビューティー製品を扱う  
EC（E-Commerce）Webアプリケーションです。

実際のオンラインショップに近いユーザー体験を目指し、  
**フロントエンドエンジニアとして実務に近い設計・実装経験を積むこと**を目的として制作しました。

- **開発期間**：2025.09 ～ 2026.01  
- **開発目的**
  - コンポーネント再利用性を重視した設計
  - SPA環境におけるデータフローの理解
  - 認証・決済を含む実サービス構成の実装経験

---

## 🛠 技術スタック

### Frontend
- React
- JavaScript (ES6)
- React Router
- Vite
- CSS / CSS Modules
- Swiper.js

### Backend / BaaS
- Supabase  
  - Auth  
  - Database  
  - Storage  
  - Edge Functions

### External Services
- Toss Payments API
- GTranslate

---

## ✨ 主な機能

### 👤 ユーザー機能
- 会員登録 / ログイン / セッション維持
- 商品一覧 / 商品詳細ページ
- カート / お気に入り機能
- 注文・決済（Toss Payments）
- マイページ（注文履歴、ポイント、クーポン）

### 🎨 UI / UX
- Skeleton UIによるローディング処理
- IntersectionObserverを用いたスクロールアニメーション
- レスポンシブ対応レイアウト

---

## 🧩 設計・実装で工夫した点（⭐ 重要）

### 1. コンポーネント再利用を意識した設計

- ページ専用コンポーネントを**汎用コンポーネントへリファクタリング**
- `HeaderSectionCategory`、`ProductDetail` などを  
  **propsベースの構造**で設計
- データを差し替えるだけで複数ページから再利用可能に実装

---

### 2. データローディングUXの改善

- Supabaseからの非同期データ取得時に **Skeleton UI** を導入
- データ未取得状態で発生していた  
  「段階的レンダリング（ガタつき）」を  
  **ローディング状態の分離**によって解消

---

### 3. 決済処理における安全性の担保

- 決済前に金額情報を **サーバー（DB）へ事前保存**
- 以下の **3点照合**による検証を実施
  - クライアント側金額
  - DBに保存された金額
  - Toss Paymentsから返却される金額
- クーポン・ポイント使用履歴も **サーバー基準で管理**

---

## ⚠️ 問題解決・トラブル対応経験

### GTranslate プラグインの問題
- **問題**：言語切り替え後、商品数量計算が崩れる
- **原因**：外部プラグインによるDOMの直接操作
- **対応**：構造的な解決が困難なため Known Issue として明示

---

### Toss Payments SDK の競合
- **問題**：Vite環境でSDK読み込みエラーが発生
- **解決**：SDKをCDN方式に変更し、正常動作を確認

---

## 📂 ディレクトリ構成（概要）

```text
src/
 ├─ components/
 │   ├─ common/
 │   ├─ main/
 │   ├─ Recycling/
 ├─ pages/
 ├─ utils/
