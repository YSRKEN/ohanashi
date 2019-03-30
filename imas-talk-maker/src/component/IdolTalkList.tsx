import * as React from 'react';
import { Button } from 'react-bootstrap';
import { ITalkData } from 'src/constant';
import { ConfigContext } from 'src/context';
import '../css/IdolTalkList.css';
import ViewComponent from './ViewComponent';

const IdolTalkList: React.FC<{className?: string}> = ({className = ""}) => {
	const config = React.useContext(ConfigContext);
	if (config === null) {
		return (<></>);
	}
	if (config.idolTalkList.length === 0) {
		return (<></>);
	}

	// ドラッグ開始時の動き
	const dragstart = (event: React.DragEvent<HTMLDivElement>) => {
		if (event.target instanceof HTMLDivElement) {
			// ドラッグ中のTalkの番号を記憶する
			config.setDraggedTalkIndex(parseInt(event.target.id.replace('from-', ''), 10));
		}
	}

	// ドラッグ中の動き
	const dragover = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	}

	// ドラッグ完了時の動き
	const drop = (event: React.DragEvent<HTMLDivElement>) => {
		if (config.draggedTalkIndex >= 0 && event.target instanceof HTMLDivElement && event.target.id.includes('to-')) {
			// ドラッグ先の番号を記録する
			const toTalkIndex = parseInt(event.target.id.replace('to-', ''), 10);
			
			// ドラッグによって「移動」する場合
			if (config.draggedTalkIndex !== toTalkIndex
				&& config.draggedTalkIndex + 1 !== toTalkIndex) {
				// 会話を再作成するため、まずドラッグされていない既存の会話を吸い出す
				const newTalkList = [];
				for (let i = 0; i < config.idolTalkList.length; ++i) {
					if (i === config.draggedTalkIndex) {
						continue;
					}
					const cloneData = JSON.parse(JSON.stringify(config.idolTalkList[i]));
					newTalkList.push(cloneData);
				}
				
				// 次に、ドラッグ中の対象を吸い出す
				const insertData = JSON.parse(JSON.stringify(config.idolTalkList[config.draggedTalkIndex]));

				// 挿入処理
				if (config.draggedTalkIndex > toTalkIndex) {
					newTalkList.splice(toTalkIndex, 0, insertData);
				} else {
					newTalkList.splice(toTalkIndex - 1, 0, insertData);
				}
				
				// 上書きして完了
				config.setIdolTalkList(newTalkList);
			}
		}
		event.preventDefault();
	}

	// ドラッグ完了時の動き
	const dragend = (event: React.DragEvent<HTMLDivElement>) => {
		// ドラッグ中オブジェクトの状態を無効化する
		config.setDraggedTalkIndex(-1);
	}

	// 編集ボタン
	const editTalk = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (event.target instanceof HTMLButtonElement) {
			// 選択した会話の情報を取り出す
			const index = parseInt(event.target.id.replace('edit-', ''), 10);
			const talk = config.idolTalkList[index];

			// 入力欄に上書き
			config.setCharaName(talk.name);
			config.setIconName(talk.name);
			config.setIconURL(talk.url);
			config.setSecondIconURL(talk.url2);
			config.setSecondIconFlg(talk.secondIconFlg);
			config.setMessage(talk.message);
			config.setFavs(talk.favs);
			config.setMyFavFlg(talk.myFavFlg);
			config.setDatetime(talk.datetime);
		}
	}

	// 上書ボタン
	const overwriteTalk = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (event.target instanceof HTMLButtonElement) {
			// 選択した会話の情報を取り出す
			const index = parseInt(event.target.id.replace('overwrite-', ''), 10);

			// 上書き用データを生成
			const talk: ITalkData = {
				name: config.previewName,
				url: config.iconURL,
				// tslint:disable-next-line: object-literal-sort-keys
				message: config.message,
				favs: config.favs,
				datetime: config.datetime,
				myFavFlg: config.myFavFlg,
				url2: config.secondIconURL,
				secondIconFlg: config.secondIconFlg
			};

			// 上書き処理
			const newTalkList = [];
			for (let i = 0; i < config.idolTalkList.length; ++i) {
				if (i === index) {
					newTalkList.push(talk);
				} else {
					const cloneData = JSON.parse(JSON.stringify(config.idolTalkList[i]));
					newTalkList.push(cloneData);
				}
			}
			config.setIdolTalkList(newTalkList);
		}
	}

	// ↑↑ボタン
	const liftUpTalk = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (event.target instanceof HTMLButtonElement) {
			// 選択した会話の情報を取り出す
			const index = parseInt(event.target.id.replace('delete-', ''), 10);

			// 移動処理
			if (index === 0) {
				return;
			} else {
				const newTalkList = [];
				for (let i = 0; i < config.idolTalkList.length; ++i) {
					if (i === index - 1) {
						const cloneData = JSON.parse(JSON.stringify(config.idolTalkList[i + 1]));
						newTalkList.push(cloneData);
					} else if (i === index) {
						const cloneData = JSON.parse(JSON.stringify(config.idolTalkList[i - 1]));
						newTalkList.push(cloneData);
					} else {
						const cloneData = JSON.parse(JSON.stringify(config.idolTalkList[i]));
						newTalkList.push(cloneData);
					}
				}
				config.setIdolTalkList(newTalkList);
			}
		}
	}

	// ↓↓ボタン
	const liftDownTalk = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (event.target instanceof HTMLButtonElement) {
			// 選択した会話の情報を取り出す
			const index = parseInt(event.target.id.replace('delete-', ''), 10);

			// 移動処理
			if (index === config.idolTalkList.length - 1) {
				return;
			} else {
				const newTalkList = [];
				for (let i = 0; i < config.idolTalkList.length; ++i) {
					if (i === index + 1) {
						const cloneData = JSON.parse(JSON.stringify(config.idolTalkList[i - 1]));
						newTalkList.push(cloneData);
					} else if (i === index) {
						const cloneData = JSON.parse(JSON.stringify(config.idolTalkList[i + 1]));
						newTalkList.push(cloneData);
					} else {
						const cloneData = JSON.parse(JSON.stringify(config.idolTalkList[i]));
						newTalkList.push(cloneData);
					}
				}
				config.setIdolTalkList(newTalkList);
			}
		}
	}

	// 削除ボタン
	const deleteTalk = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (event.target instanceof HTMLButtonElement) {
			// 選択した会話の情報を取り出す
			const index = parseInt(event.target.id.replace('delete-', ''), 10);

			// 削除処理
			const newTalkList = [];
			for (let i = 0; i < config.idolTalkList.length; ++i) {
				if (i === index) {
					continue;
				}
				const cloneData = JSON.parse(JSON.stringify(config.idolTalkList[i]));
				newTalkList.push(cloneData);
			}
			config.setIdolTalkList(newTalkList);
		}
	}

	// JSX
	if (config.talkType === 'おはなし') {
		return (<div className={`border p-3 ${className}`}>
			<div id={`to-0`} style={{height: 10}} onDragOver={dragover} onDrop={drop}/>
			{config.idolTalkList.map((idolTalk, i) => (
				<div key={i}>
					<div draggable={true} id={`from-${i}`} onDragStart={dragstart} onDragEnd={dragend}>
						<ViewComponent talkType={config.talkType} talkData={idolTalk}
							firstFlg={i === 0}/>
					</div>
					<div className='flex'>
						<Button id={`edit-${i}`} className='px-1 py-0 mb-0'
							onClick={editTalk}>編集</Button>
						<Button id={`overwrite-${i}`} className='px-1 py-0 mb-0'
							onClick={overwriteTalk}>上書</Button>
						<Button id={`delete-${i}`} className='px-1 py-0 mb-0 ml-auto' variant='info'
							onClick={liftUpTalk}>↑↑</Button>
						<Button id={`delete-${i}`} className='px-1 py-0 mb-0 ml-auto' variant='info'
							onClick={liftDownTalk}>↓↓</Button>
						<Button id={`delete-${i}`} className='px-1 py-0 mb-0 ml-auto' variant='danger'
							onClick={deleteTalk}>削除</Button>
					</div>
					<div id={`to-${i+1}`} style={{height: 10}} onDragOver={dragover} onDrop={drop}/>
				</div>
				))
			}
		</div>);
	} else {
		return (<div className={`border p-3 ${className}`}>
			<div className='border p-3 d-inline-block derepo'>
				<div id={`to-0`} style={{height: 10}} onDragOver={dragover} onDrop={drop}/>
				{config.idolTalkList.map((idolTalk, i) => (
					<div key={i}>
						<div draggable={true} id={`from-${i}`} onDragStart={dragstart}>
							<ViewComponent talkType={config.talkType} talkData={idolTalk}
								firstFlg={i === 0}/>
						</div>
						<div className='flex'>
							<Button id={`edit-${i}`} className='px-1 py-0 mb-0'
								onClick={editTalk}>編集</Button>
							<Button id={`overwrite-${i}`} className='px-1 py-0 mb-0'
								onClick={overwriteTalk}>上書</Button>
							<Button id={`delete-${i}`} className='px-1 py-0 mb-0 ml-auto' variant='info'
							onClick={liftUpTalk}>↑↑</Button>
							<Button id={`delete-${i}`} className='px-1 py-0 mb-0 ml-auto' variant='info'
							onClick={liftDownTalk}>↓↓</Button>
							<Button id={`delete-${i}`} className='px-1 py-0 mb-0 ml-auto' variant='danger'
								onClick={deleteTalk}>削除</Button>
						</div>
						<div id={`to-${i+1}`} style={{height: 10}} onDragOver={dragover} onDrop={drop}/>
					</div>
					))
				}
			</div>
		</div>);
	}

}

export default IdolTalkList;
