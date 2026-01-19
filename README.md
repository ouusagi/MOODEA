# MOODÉA <img src="./public/MOODEA.png" alt="MOODÉA logo" height="32" style="vertical-align: middle;" />

#### React と Supabase を用いたビューティーEC Webアプリケーション

---

## 🔗 Demo / Repository
**Deploy**: https://moodea-beauty.netlify.app/ <br>
**GitHub**: https://github.com/ouusagi/MOODEA 

> ⚠️ **注意事項**  
> - 本アプリケーションのデフォルト言語は韓国語です。  
>   画面右上の 🇯🇵 アイコンをクリックすることで日本語に切り替えることができます。  
>  
> - 言語切り替えには GTranslate プラグインを使用していますが、  
>   当該プラグインは DOM を直接操作する仕様のため、  
>   React（SPA）環境では以下の制約があります。  
>  
> 1. ログインページ遷移後、メイン画面に戻った際に  
>   言語切り替えウィジェットが一時的に表示されない場合があります。
>
> 2. ページをリロードすると再表示されますが、  
>   SPA 環境ではウィジェットの再初期化が困難なため、  
>   本挙動は外部プラグイン起因の制約として扱っています。  
>  
> - ※ レイアウト崩れおよび上記挙動については、  
>   技術的な原因を把握した上での既知の制約（Known Issue）です。

---

## 🧴 プロジェクト概要

**MOODÉA** は、スキンケア・ビューティー製品を扱う  
EC（E-Commerce）Webアプリケーションです。

実際のオンラインショップに近いユーザー体験を目指し、  
**フロントエンドエンジニアとして実務に近い設計・実装経験を積むこと**を目的として制作しました。

## 💻 **開発概要**
```
1. 開発目的
- 個人開発を通じた実践的なフロントエンド開発スキルの習得
- コンポーネント再利用性を重視した設計
- SPA環境におけるデータフローの理解
- 認証・決済を含む実サービス構成の実装経験

2. 開発期間
📅 開発期間：2025.08 ～ 2026.01 ( 約5ヶ月 )

3. 担当範囲
- 企画・設計・UI/UXデザイン
- フロントエンド実装（React）
- Supabaseを用いたデータ管理・認証処理
- デプロイおよび運用
 ```

## 🛠 技術スタック
### Frontend 🎨
>### Markup & Styling
>- HTML5
>- CSS3
>### Language
>- JavaScript (ES6)
>### Frontend Framework / Library
>- React
>- React Router
>- React-quill
>- React-loading-skeleton
>- Swiper.js
>### Build Tool
>- Vite


<hr>

### Backend / BaaS ⚙️
>### Supabase  
>- Auth  
>- Database  
>- Storage  
>- Edge Functions

<hr>

### External Services 🌐
>- Toss Payments API
>- GTranslate
<hr>


## ✨ 主な機能

### 👤 ユーザー機能
- 会員登録 / ログイン / 会員退会
- 商品一覧 / 商品詳細ページ
- カート / お気に入り機能
- 注文・決済（Toss Payments）
- マイページ（注文履歴、ポイント、クーポン）
- レビュー掲示板

### 🎨 UI / UX
- Skeleton UIによるローディング処理
- IntersectionObserverを用いたスクロールアニメーション
- レスポンシブ対応レイアウト

---

## 📝 企画
| Flowchart | Wireframe |
|---|---|
|<img width="540" alt="Flowchart" src="https://github.com/ouusagi/MOODEA/blob/main/src/assets/MOODEA_Flow%20Chart.png?raw=true" />|<img width="500" alt="Wireframe" src="https://github.com/ouusagi/MOODEA/blob/main/src/assets/MOODEA_Wireframe_UI.png?raw=true" />|

---

## 🧩 設計・実装で工夫した点

### 1. コンポーネント再利用を意識した設計

- ページ専用コンポーネントを**汎用コンポーネントへリファクタリング**
- `HeaderSectionCategory`、`ProductDetail` などを  
  **propsベースの構造**で設計
- データを差し替えるだけで複数ページから再利用可能に実装

---

### 2. データローディングUXの改善

- Supabaseからの非同期データ取得時に **Skeleton UI** を導入
- データ未取得状態で発生していた  「段階的レンダリング（ガタつき）」を  
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

### Toss Payments SDKの競合
- **問題**：Vite環境でSDK読み込みエラーが発生
- **解決**：SDKをCDN方式に変更し、正常動作を確認

---

### 非ログイン状態での会員専用機能実行時の挙動不安定
- **問題**：非ログイン状態で会員専用機能（購入・カート追加等）を実行した際、`confirm()` ダイアログが **間欠的に反応しない／遅延する現象**が発生
- **解決**：React の state 管理に基づいた **カスタムモーダル UI コンポーネントを実装**

---

### Supabase Auth によるメール重複確認の制限
- **問題**：Supabase Auth は認証機能のみを担当しており、 クライアント側から既存ユーザーのメールアドレスを  
直接参照・検索することができないため、**会員登録時にメールアドレスの重複確認が行えない**という制約が発生
- **解決**：
1. Supabase の独自 `users` テーブルに `email` カラムを追加 <br>
2. 会員登録前に `users` テーブルを直接 照会し、  メールアドレスの重複検証
- 重複している場合: alert を表示、 会員登録処理を中断
- 重複していない場合: 会員登録処理を続行 <br>
(メール重複確認は  **`users` テーブル 照会 + Check ボタンの状態管理（state）** により実装)

## 📂 ディレクトリ構成（概要）

```text
src/
 ├─ components/
 │    ├─ main/               # 메인 페이지 전용
 │    │   ├─ CarouselSlider.jsx
 │    │   ├─ NewProductList.jsx
 │    │   └─ ...
 │    ├─ HeaderSectionCategory/           # 헤더섹션 카테고리 컴포넌트 (컴포넌트 제작소)
 │    │   ├─ Skincare/
 │    │   │   └─ SkincareList.jsx
 │    │   └─ category.css
 │    │   
 │    ├─ common/             # 공용 UI
 │    │   ├─ AdPopup.jsx
 │    │   ├─ Footer.jsx
 │    │   └─ ...
 │    └─ Recycling/          # 재활용 컴포넌트
 │        └─ BestSlider.jsx
 │        └─ HeaderSectionCategory.jsx
 │        └─ ProductDetail.jsx   
 │        └─ ProductDetail.css 
 │        └─ ProductDetailPage.jsx <= url파라미터로 전달 받은 값 + props로 데이터를 전달받고 바인딩해줄 페이지인 ProductDetail.jsx 에게 전달
 │
 └─ pages/     # 카테고리 페이지 
     ├ Detail/        # 상품 상세 페이지 
     │      └─ NewProductListDetail.jsx
     │      └─ BestSellerDetail.jsx
     │      └─ index.js
     │     
     ├─Login # 로그인 페이지
     │   └─ LoginPage.jsx
     │   └─ LoginPage.css
     │
     ├─Signup # 회원가입 페이지
     │   └─ SignupPage.jsx
     │   └─ SignupPage.css
     │
     ├─ MainPage.jsx
     ├─ SkincarePage.jsx
     ├─ CleansingPage.jsx
     └─ MakeupPage.jsx
     └─ HaircarePage.jsx
     └─ SuncarePage.jsx

└─ utils/
     └─ cart.js    # 장바구니 커스텀 훅
```

## ♻ 再利用コンポーネントにおける React Router × Props データフロー
1. **ページコンポーネント（例：`SkincarePage.jsx`）** にて、 `HeaderSectionCategory` に渡すデータを定義

2. **`HeaderSectionCategory.jsx`** で、 props として受け取ったデータを各 UI 要素にバインディング

3. 商品クリック時、 props で受け取った値（`category` / `id`）を **URL パラメータとして `navigate()` に設定**

4. クリックにより、 以下のルーティング定義に基づき **`ProductDetailPage` へ遷移**

```jsx
<Route path="/product/:category/:id" element={<ProductDetailPage />}/>
```

5. `ProductDetailPage.jsx` にて、`useParams()` を使用し URL パラメータ（`category`）を取得

6. 取得したパラメータをprops として `ProductDetail` コンポーネントへ渡し、データ取得・表示を行う


---

## 🚀 実行方法
```bash
npm install ## パッケージのインストール
npm run dev ## 開発サーバーの起動
```

---

## 📘 プロジェクト振り返り

本プロジェクトを通して、React を用いた  
コンポーネント設計・状態管理・非同期データ処理から、
実際のサービスを想定したデプロイまで、  
フロントエンド開発の一連の流れを経験することができました。

特に、ページ専用として実装したコンポーネントを  
props ベースの汎用コンポーネントへリファクタリングする過程で、  
「なぜこの設計にするのか」を考える重要性を強く実感しました。

また、認証・決済・外部 API 連携など、  
実務に近い機能を実装する中で、  
技術的な制約やセキュリティを意識した設計の必要性も学びました。

単なる機能実装で終わらせるのではなく、  
課題点や改善点を整理し、  
次の開発につなげる意識を持てたことが  
本プロジェクトの大きな収穫だと感じています。
