import { getItem, setItem } from '../utils/storage.js';
import DocumentList from './DocumentList.js';

export default function NavBar({ $container, initialState, onSelect }) {
  const $nav = document.createElement('nav');
  $container.appendChild($nav);
  const DOCUMENT_ISOEPN_LOCAL_KEY = 'isOpen';

  this.state = initialState;

  const addIsOpenState = (documents) => {
    const openDocuments = getItem(DOCUMENT_ISOEPN_LOCAL_KEY, []);
    return documents.map((document) => ({
      ...document,
      isOpen: openDocuments.includes(String(document.id)),
    }));
  };

  this.setState = (newState) => {
    this.state = addIsOpenState(newState);
    this.render();
  };

  this.render = () => {
    $nav.innerHTML = `
		<h4>suhwa Notion document</h4>
		<ul>
			${DocumentList(this.state)}
		</ul>
	`;
  };

  this.render();

  $nav.addEventListener('click', (e) => {
    const $document = e.target.closest('li');
    if (!$document) return;

    const { id } = $document.dataset;
    if (!id) return;

    const eventType = e.target.id;
    switch (eventType) {
      case 'toggle':
        $document.childNodes.forEach((node) => {
          if (node.nodeName === 'UL') {
            node.classList.toggle('hide');

            const currentIsOpenState = getItem(DOCUMENT_ISOEPN_LOCAL_KEY, []);
            if (node.className === 'hide') {
              // 닫혔으면 -> 로컬에서 빼기
              const newIsOpenState = currentIsOpenState.filter(
                (documentId) => documentId !== String(id)
              );
              setItem(DOCUMENT_ISOEPN_LOCAL_KEY, newIsOpenState);
            } else {
              // 열렸으면 -> 로컬에 넣기
              setItem(DOCUMENT_ISOEPN_LOCAL_KEY, [...currentIsOpenState, id]);
            }
          }
        });
        break;
      case 'add':
        console.log('추가예정', id);
        // onAdd(id);
        break;
      case 'delete':
        console.log('삭제예정', id);
        // onDelete(id);
        break;
      default:
        console.log('세부컨텐츠 보여줌', id);
        onSelect(id);
    }
  });
}
