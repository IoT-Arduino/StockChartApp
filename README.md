
<h1 align="center">
  米国株四半期株価・業績チャートアプリ「TenQ.cc」
</h1>

## 🪙 Siteのアドレス

アプリurl : [https://www.tenq.cc/ja-JP](https://www.tenq.cc/ja-JP)


## 🎓 技術スタック
- TypeScript
- Next.js
- Supabase
- TanStack Query(React Query)
- zustand
- GoogleApis
- Apache ECharts
- TailWindCSS
- mantine
- React-DatePicker
- Jest
- Playwright

## 💫 コード解説関連記事
[react-datepickerをカスタマイズ、i18n対応。ChatGPT4がカスタマイズコード作成。](https://zenn.dev/satoshi_tech/articles/20230446-react-datepicker-i18n-customize)

[supabaseでAuthのUserを削除、公式だけではわからなかったのでいろいろ調べた件](https://zenn.dev/satoshi_tech/articles/20220714-supabase-deleteuser)

[PlaywrightでNext.js＋supabaseアプリの会員機能をテストする。(会員ランクに応じた登録数制限テスト)](https://zenn.dev/satoshi_tech/articles/20220717-playwright-test-next-supabase)


## 😺 プログラム・フォルダ構成(概要)

components/  
const/  
data/               
　├ edgar/  
　├ marker/  
　├ stock/  
　├ stockCode/  
functions/          
hooks/              
locales/            
　├ en/  
　├ jp/ 
pages/  
store/              
types/              
utils/              


1. functions/  ・・・・  *ユーティリティ関数*  
2. hooks/  ・・・・・   *バックエンド（Supabase）と連携する為のTanStackQueryのコード*
3. locales/ ・・・・・   *i18nの為の言語ファイル*  
4. store/ ・・・・・   *zustandのコード*  
5. types/ ・・・・・   *型定義ファイル*  
6. utils/  ・・・・・   *API関連ユーティリティ関数*  

## 💠 テーブル構成(Supabase)
- bookmark (id,ticker,bookmark,user_id)--RLS Enabled  
- comments (id,ticker,user_id,date,memo)--RLS Enabled  
- marker  (id,ticker,user_id,date,memo)--RLS Enabled  
- profiles (id,user_id,rank)--RLS Enabled  


## 👨‍👨‍👧 会員専用機能概要

<img src="https://user-images.githubusercontent.com/45728258/235041253-1eb19d7d-cabd-4b89-bc14-12f0ca5bd625.png" alt="enQ-Stock" width="400">

### サインアップ、サインイン機能
SupabaseのAuth機能を利用しています。サインアップ時に、Supabase Functionsの機能を使用して、会員登録時に、profilesテーブルに会員情報を登録しています。

### マーカー入力機能
登録会員は、株価チャートにマーカーを入力することができます。マーカーは、日付、メモを入力することができます。
入力したマーカー情報は即座に、株価チャート上に反映されます。
ユーザー独自のマーカーが登録されていない銘柄の場合は、システム規定のマーカー情報がデフォルト表示されます。

### コメント入力機能
登録会員は、コメント情報を入力することができます。コメントは、日付、メモを入力することができます。

### ブックマーク機能
登録会員は、気になる銘柄のブックマークを登録することができます。登録したブックマークは、会員専用のブックマークページで確認することができます。

### 会員ページ機能
会員ごとのマイページを用意しています。コメント、マーカー、ブックマークの登録済み情報を確認することができます。

### 登録数制限機能
会員ランクにおうじて、マーカー入力及びコメント入力の登録数を制限しています。


### Tickerページング機能
ページング機能（前後）をクリックすることで、株価チャートページを切り替えることができます。
紙の四季報をパラパラとページをめくって銘柄探しをするのと同じような感覚で銘柄探しする為の機能です。  
<a href="https://www.youtube.com/watch?v=l4Hcax6pXPE" target="_blank">
  <img src="https://img.youtube.com/vi/l4Hcax6pXPE/maxresdefault.jpg" alt="US-StockChart with Price and EPS" width="500">
</a>


## 📈 株価・業績データチャート概要

### 企業財務データの取得と加工

米国企業の決算情報はSECのEDGARサイトに集約されています。「TenQ.cc」のシステム的には、EDGARから入手したデータをPythonで事前加工しjson形式でレポジトリに登録、そのデータを、チャートや表形式で表示しています。
ちなみに、データ加工というのは、科目の変換や株式分割、Ticker変更対応、第四単独四半期計算処理（第四単独四半期の数値は開示されていないので、年間決算から第三四半期累計値を差し引きする処理）等の処理を行っています。

### 株価データの取得
株価データの取得は、無料の米国株価APIを使用しています。
株価データも、Pythonで事前加工しています。


## 🌐 国際化対応(i18n)

ブラウザの言語設定により、日本語、英語表示を自動的に切り替えます。
フッターにある、プルダウンメニューにより、ユーザー側での切り替えも可能です。
 
## 📄 ライセンス
このソフトウェアは、 Apache 2.0ライセンスで配布されている製作物が含まれています。
GNU General Public License v3.0

<h1 align="center">
  米国株四半期株価・業績チャートアプリ「TenQ.cc」
</h1>

## 🪙 Siteのアドレス

アプリurl : [https://www.tenq.cc/ja-JP](https://www.tenq.cc/ja-JP)


## 🎓 技術スタック
- TypeScript
- Next.js
- Supabase
- TanStack Query(React Query)
- zustand
- GoogleApis
- Apache ECharts
- TailWindCSS
- mantine
- React-DatePicker
- Jest
- Playwright

## 💫 コード解説関連記事
[react-datepickerをカスタマイズ、i18n対応。ChatGPT4がカスタマイズコード作成。](https://zenn.dev/satoshi_tech/articles/20230446-react-datepicker-i18n-customize)

[supabaseでAuthのUserを削除、公式だけではわからなかったのでいろいろ調べた件](https://zenn.dev/satoshi_tech/articles/20220714-supabase-deleteuser)

[PlaywrightでNext.js＋supabaseアプリの会員機能をテストする。(会員ランクに応じた登録数制限テスト)](https://zenn.dev/satoshi_tech/articles/20220717-playwright-test-next-supabase)


## 😺 プログラム・フォルダ構成(概要)

components/  
const/  
data/               
　├ edgar/  
　├ marker/  
　├ stock/  
　├ stockCode/  
functions/          
hooks/              
locales/            
　├ en/  
　├ jp/ 
pages/  
store/              
types/              
utils/              


1. functions/  ・・・・  *ユーティリティ関数*  
2. hooks/  ・・・・・   *バックエンド（Supabase）と連携する為のTanStackQueryのコード*
3. locales/ ・・・・・   *i18nの為の言語ファイル*  
4. store/ ・・・・・   *zustandのコード*  
5. types/ ・・・・・   *型定義ファイル*  
6. utils/  ・・・・・   *API関連ユーティリティ関数*  

## 💠 テーブル構成(Supabase)
- bookmark (id,ticker,bookmark,user_id)--RLS Enabled  
- comments (id,ticker,user_id,date,memo)--RLS Enabled  
- marker  (id,ticker,user_id,date,memo)--RLS Enabled  
- profiles (id,user_id,rank)--RLS Enabled  


## 👨‍👨‍👧 会員専用機能概要

<img src="https://user-images.githubusercontent.com/45728258/235041253-1eb19d7d-cabd-4b89-bc14-12f0ca5bd625.png" alt="enQ-Stock" width="400">

### サインアップ、サインイン機能
SupabaseのAuth機能を利用しています。サインアップ時に、Supabase Functionsの機能を使用して、会員登録時に、profilesテーブルに会員情報を登録しています。

### マーカー入力機能
登録会員は、株価チャートにマーカーを入力することができます。マーカーは、日付、メモを入力することができます。
入力したマーカー情報は即座に、株価チャート上に反映されます。
ユーザー独自のマーカーが登録されていない銘柄の場合は、システム規定のマーカー情報がデフォルト表示されます。

### コメント入力機能
登録会員は、コメント情報を入力することができます。コメントは、日付、メモを入力することができます。

### ブックマーク機能
登録会員は、気になる銘柄のブックマークを登録することができます。登録したブックマークは、会員専用のブックマークページで確認することができます。

### 会員ページ機能
会員ごとのマイページを用意しています。コメント、マーカー、ブックマークの登録済み情報を確認することができます。

### 登録数制限機能
会員ランクにおうじて、マーカー入力及びコメント入力の登録数を制限しています。


### Tickerページング機能
ページング機能（前後）をクリックすることで、株価チャートページを切り替えることができます。
紙の四季報をパラパラとページをめくって銘柄探しをするのと同じような感覚で銘柄探しする為の機能です。  
<a href="https://www.youtube.com/watch?v=l4Hcax6pXPE" target="_blank">
  <img src="https://img.youtube.com/vi/l4Hcax6pXPE/maxresdefault.jpg" alt="US-StockChart with Price and EPS" width="500">
</a>


## 📈 株価・業績データチャート概要

### 企業財務データの取得と加工

米国企業の決算情報はSECのEDGARサイトに集約されています。「TenQ.cc」のシステム的には、EDGARから入手したデータをPythonで事前加工しjson形式でレポジトリに登録、そのデータを、チャートや表形式で表示しています。
ちなみに、データ加工というのは、科目の変換や株式分割、Ticker変更対応、第四単独四半期計算処理（第四単独四半期の数値は開示されていないので、年間決算から第三四半期累計値を差し引きする処理）等の処理を行っています。

### 株価データの取得
株価データの取得は、YahooUSの株価APIを使用していますが、今後変更するかもしれません。
株価データも、Pythonで事前加工しています。


## 🌐 国際化対応(i18n)

ブラウザの言語設定により、日本語、英語表示を自動的に切り替えます。
フッターにある、プルダウンメニューにより、ユーザー側での切り替えも可能です。
 
## 📄 ライセンス
このソフトウェアは、 Apache 2.0ライセンスで配布されている製作物が含まれています。
GNU General Public License v3.0


## 💫 株価及び企業財務データ確認リソース

https://stocks.finance.yahoo.co.jp/us/annual/AAPL  
https://us.kabutan.jp/stocks/MSFT/finance  

業績チャート 米国  
https://us-chart.srbrnote.work/cik/320193/  

SEC  
https://www.sec.gov/Archives/edgar/data/320193/000032019321000056/aapl-20210327.htm  
https://www.sec.gov/edgar/browse/?CIK=320193&owner=exclude  
https://www.sec.gov/Archives/edgar/data/320193/000032019320000096/aapl-20200926.htm  

EDGAR Search Results  
https://www.sec.gov/cgi-bin/browse-edgar?CIK=0000320193  

