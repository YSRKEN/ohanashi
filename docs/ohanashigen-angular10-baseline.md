# OhanashiGen Angular 10 ベースライン

更新日時: 2026-04-03

## 目的

- Angular 10 からの段階移行を始める前に、現行環境で再現できる Node と検証結果を固定する
- 以後の `10 -> 11` 更新で、依存問題と実装修正を切り分けやすくする

## 使用したランタイム

- Node: `12.22.12`
- npm: `6.14.18`
- 呼び出し方法: `C:\Program Files\nodejs\npx.cmd -p node@12 -p npm@6 ...`

補足:

- 既定の `node` は `v24.12.0`
- 既定の `npm` は壊れているが、`npm.cmd` と `npx.cmd` は利用できる
- Angular 10 の検証では、既定ランタイムではなく上記の一時ランタイムを使う

## 確認したコマンド

1. `C:\Program Files\nodejs\npx.cmd -p node@12 -p npm@6 npm ci`
2. `C:\Program Files\nodejs\npx.cmd -p node@12 -p npm@6 npx ng version`
3. `C:\Program Files\nodejs\npx.cmd -p node@12 -p npm@6 npm run build`
4. `C:\Program Files\nodejs\npx.cmd -p node@12 -p npm@6 npx ng run OhanashiGen:server`
5. `C:\Program Files\nodejs\npx.cmd -p node@12 -p npm@6 npx ng run OhanashiGen:app-shell`

## 結果

- `npm ci`: 成功
- `ng version`: 成功
- `build`: 成功
- `server`: 成功
- `app-shell`: 成功

## 確認できたバージョン

- Angular CLI: `10.2.4`
- Angular: `10.2.5`
- `@angular-devkit/build-angular`: `0.1002.4`
- TypeScript: `3.9.10`
- RxJS: `6.6.7`

## 次の作業

- このベースラインを起点に `@angular/core` と `@angular/cli` の `10 -> 11` 更新へ進む
- 更新時も同様に、各段階で `build` と `server` ビルドを確認する
