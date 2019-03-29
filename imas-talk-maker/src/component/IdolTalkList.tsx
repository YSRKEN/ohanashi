import * as React from 'react';
import { Button } from 'react-bootstrap';
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

	const dragstart = (event: React.DragEvent<HTMLDivElement>) => {
		if (event.target instanceof HTMLDivElement) {
			config.setDraggedTalkIndex(parseInt(event.target.id.replace('from-', ''), 10));
		}
	}

	const dragover = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	}

	const drop = (event: React.DragEvent<HTMLDivElement>) => {
		if (event.target instanceof HTMLDivElement) {
			const toTalkIndex = parseInt(event.target.id.replace('to-', ''), 10);
			// tslint:disable-next-line: no-console
			console.log(`${config.draggedTalkIndex}->${toTalkIndex}`);
			if (config.draggedTalkIndex !== toTalkIndex
				&& config.draggedTalkIndex + 1 !== toTalkIndex) {
				const newTalkList = [];
				for (let i = 0; i < config.idolTalkList.length; ++i) {
					if (i === config.draggedTalkIndex) {
						continue;
					}
					const cloneData = JSON.parse(JSON.stringify(config.idolTalkList[i]));
					newTalkList.push(cloneData);
				}
				const insertData = JSON.parse(JSON.stringify(config.idolTalkList[config.draggedTalkIndex]));
				// tslint:disable-next-line: no-console
				console.log(insertData);
				// tslint:disable-next-line: no-console
				console.log(newTalkList);
				if (config.draggedTalkIndex > toTalkIndex) {
					newTalkList.splice(toTalkIndex, 0, insertData);
				} else {
					newTalkList.splice(toTalkIndex - 1, 0, insertData);
				}
				// tslint:disable-next-line: no-console
				console.log(newTalkList);
				config.setIdolTalkList(newTalkList);
			}
		}
		event.preventDefault();
	}

	const dragend = (event: React.DragEvent<HTMLDivElement>) => {
		config.setDraggedTalkIndex(-1);
	}

	const deleteTalk = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (event.target instanceof HTMLButtonElement) {
			const index = parseInt(event.target.id.replace('delete-', ''), 10);
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
						<Button id={`edit-${i}`} className='px-1 py-0 mb-0'>編集</Button>
						<Button id={`overwrite-${i}`} className='px-1 py-0 mb-0'>上書</Button>
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
							<Button className='px-1 py-0 mb-0'>編集</Button>
							<Button className='px-1 py-0 mb-0'>上書</Button>
							<Button className='px-1 py-0 mb-0 ml-auto' variant='danger'>削除</Button>
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
