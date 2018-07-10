# おはなしジェネレーター製作キット
Ohanashi Generator's Generator by Angular

## 概要

　**や　れ　ば　わ　か　る**

## 実行するための手順

- `git clone`する
- `cd OhanashiGen`してから`npm i`する
- `ng serve`で[http://localhost:4200/](http://localhost:4200/)上にライブ実行
- `ng run OhanashiGen:app-shell:production`でリリースビルド
- `npx pushstate-server ./dist/OhanashiGen`で[http://localhost:9000/](http://localhost:9000/)上に本番実行
- ビルドしてから`firebase deploy`でデプロイ、`firebase open`→`Hosting: Deployed Site`でデプロイ先を表示
