# 環境整理

更新日時: 2026-04-03

## Git

- 現在ブランチ: `master`
- upstream: `origin/master`
- リモート: `origin https://github.com/YSRKEN/ohanashi`
- 対応: `git config --global http.sslbackend openssl`
- 状態: `git fetch origin master` と `git pull --ff-only` は成功

## GitHub リポジトリ情報

- pull 後に `.github/dependabot.yml` が存在することを確認した
- `SECURITY.md` も存在することを確認した
- Dependabot ブランチが `imas-talk-maker` と `imas-talk-maker-v3` に対して複数作成されている

## GitHub CLI

- コマンド: `gh.exe`
- フルアクセス化後: `gh auth status` が成功
- 認証状態: `GH_TOKEN` と keyring の両方で `YSRKEN` にログイン済み
- 補足: 以前必要だった `GH_CONFIG_DIR` の退避なしでも、現セッションでは既定構成で利用できる

## Node.js / npm / yarn

- `node`: `v24.12.0`
- `npm`: `npm-cli.js` の参照不整合で起動失敗
- 回避確認: `C:\Program Files\nodejs\npm.cmd --version` は成功
- `yarn`: 未導入
- `corepack --version`: 成功
- `corepack yarn --version`: `1.22.22`
- `corepack yarn install`: フルアクセス化後はキャッシュ破損で止まらず再実行できた

## Python

- `python` 既定参照: 壊れている
- `where python`: `H:\project\twitter-downloader\.venv\Scripts\python.exe`
- 方針: 利用可能な Python 実体を確定し、複雑な補助処理は Python で実行する
- `uv`: `0.8.4`
- フルアクセス化後: `uv python list` が成功
- フルアクセス化後: `uv run --python 3.12 python -c ...` が成功し、`C:\Users\ysrke\AppData\Roaming\uv\python\cpython-3.12.11-windows-x86_64-none\python.exe` を利用できた
- 補足: `python` コマンド既定参照は依然として壊れているため、Python 実行は当面 `uv run --python ...` を優先する
- 補足: フルアクセス化前に見えていた `AppData` 配下の権限差は、Codex 側の制約が主因だった可能性が高い

## 対象サブプロジェクト

- `imas-talk-maker`
- `imas-talk-maker-v3`
- `OhanashiGen`

## 追加検証メモ

- `imas-talk-maker` は `browserslist` の resolution を `4.28.1` に補正すると Jest 実行が復帰した
- `imas-talk-maker-v3` も同様に `browserslist` を `4.28.1` に補正した
- `react-scripts.cmd build` は両 React プロジェクトで依然として異常終了し、標準出力に有効なエラーが残らない
- `OhanashiGen` の `npm install` は npm 11 の peer dependency 厳格化により素のままでは失敗した
- `OhanashiGen` は `npm.cmd install --package-lock=false --legacy-peer-deps` で依存解決できた
- `OhanashiGen` の `npm run build` は Node 24 上で `loader-runner` の `callback(): The callback was already called.` により失敗した
- `imas-talk-maker` の dev server 起動試験ログは `docs/imas-talk-maker-start.log` に保存した
- `imas-talk-maker-v3` の dev server 起動試験ログは `docs/imas-talk-maker-v3-start.log` に保存した
- `imas-talk-maker` は `PORT=3100` で起動試験し、`src/css/OhanashiView.css` の `/asset/background.png` などの参照解決に失敗した
- `imas-talk-maker-v3` は `PORT=3101` で起動試験し、`@babel/helper-function-name` 欠落により Babel で失敗した
- `imas-talk-maker` は背景画像参照を TSX 側の `process.env.PUBLIC_URL` へ移したことで、`/asset/*.png` の compile error を解消した
- `imas-talk-maker-v3` は `@babel/helper-function-name@7.24.7` を直接追加したことで、Babel の欠落依存を解消した
- 現時点の残課題は、両 React プロジェクトで共通して起きる `react-scripts build` の `exit code 3221226505` の切り分け
- 2026-03-28 の仕切り直し後、`git status --short --branch` は `master...origin/master` のクリーン状態に戻っていることを確認した
- 2026-03-28 の仕切り直し後、`git fetch origin` は成功した
- 2026-03-28 の仕切り直し後、`gh auth status` は既定設定だと `C:\Users\ysrke\AppData\Roaming\GitHub CLI\config.yml` のアクセス拒否で失敗した
- 上記に対して `GH_CONFIG_DIR` をワークスペース内へ退避すると、`gh auth status` は再び成功した
- 2026-03-28 の仕切り直し後、`node -v` は `v24.12.0`、`npm.cmd -v` は `11.6.2`、`corepack --version` は `0.34.5`、`corepack yarn --version` は `1.22.22`、`uv --version` は `0.8.4` だった
- `OhanashiGen` は現時点で Angular 6 系の `package.json` に戻っており、`package-lock.json` は存在しない
- `OhanashiGen` の `ng version` は Node 24 では `angular.json` を不正設定として扱ったため、Angular 段階更新では旧 Node を別途再用意する前提に戻した
- `npx -p node@10 -p npm@6` は現セッションでも成功し、Node `10.24.1` と npm `6.14.18` を一時的に呼び出せた
- `OhanashiGen` の Angular 7 更新作業では、常設の Node バージョン管理ツールではなく、上記 `npx` 経路を更新用ランタイムとして使える
- `git push` は既定の credential helper 経由だと `git-remote-https.exe` のアプリケーションエラーや認証待ちで止まる場合がある
- 上記に対して、`GH_TOKEN` から生成した Basic 認証ヘッダーを `http.https://github.com/.extraheader` で一時指定すると、credential helper を経由せずに push できた
- Angular 8 でも、更新用ランタイムは `npx -p node@10 -p npm@6` で十分に動作した
- Angular 8 の `ng version` は CLI `8.3.29`、Angular `8.2.14`、build-angular `0.803.29`、TypeScript `3.5.3` を示した
- Angular 8 で `ng update ... --migrate-only` を実行すると、一時的に最新 CLI を取りに行って Node 20 以上を要求したため、旧バージョン更新ではこの経路を使わない方が安定する
- 2026-04-03 時点の `OhanashiGen/package.json` は Angular 10 系で、`@angular/core` は `10.2.5`、`@angular/cli` は `10.2.4`、`typescript` は `3.9.10`
- `OhanashiGen/.nvmrc` に `12.22.12` を追加し、Angular 10 のベースライン確認用 Node を明示した
- `C:\Program Files\nodejs\npx.cmd -p node@12 -p npm@6` 経由で Node `12.22.12` と npm `6.14.18` を呼び出せた
- 上記ランタイムで `OhanashiGen` の `npm ci` は成功した
- 上記ランタイムで `npx ng version` は Angular CLI `10.2.4` / Angular `10.2.5` / build-angular `0.1002.4` / TypeScript `3.9.10` を示した
- 上記ランタイムで `npm run build`、`ng run OhanashiGen:server`、`ng run OhanashiGen:app-shell` はいずれも成功した
- したがって、Angular 10 から 11 への更新前提となるフェーズ 0 の再現環境は確保できた
