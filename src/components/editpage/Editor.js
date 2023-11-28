import { validation, resolveXSS, preventXSS } from '../../validation.js';

export default function Editor({ $target, initialState, onEdit }) {
  validation(new.target, 'Editor');
  const $editor = document.createElement('div');
  $editor.className = 'editor';
  $target.appendChild($editor);

  $editor.innerHTML = `
          <div style="display: flex; flex-direction: column">
            <input type="text" placeholder="제목 없음" name="title" style="height:100px" />
            <textarea name="content" placeholder="내용을 입력하세요" style="height:75vh;"></textarea>
          </div>
        `;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $editor.querySelector('[name=title]').value = resolveXSS(this.state.title);
    $editor.querySelector('[name=content]').value = resolveXSS(
      this.state.content
    );
  };

  this.render();

  $editor.addEventListener('keyup', (e) => {
    const { tagName: targetTag, value } = e.target;
    const preventValue = preventXSS(value);
    let nextState = {};
    if (targetTag === 'INPUT') {
      nextState = { ...this.state, title: preventValue };
    } else {
      nextState = {
        ...this.state,
        content: preventValue,
      };
    }

    this.setState(nextState);
    onEdit(this.state);
  });
}
