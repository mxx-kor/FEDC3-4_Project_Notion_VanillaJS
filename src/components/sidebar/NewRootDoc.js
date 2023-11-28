import { validation } from '../../validation.js';

export default function NewRootDoc({ $target, onClick }) {
  validation(new.target, 'NewRootDoc');

  const $newRootDoc = document.createElement('div');
  $newRootDoc.className = 'newRootDoc';
  $newRootDoc.textContent = '+ 페이지 추가';
  $target.appendChild($newRootDoc);

  $newRootDoc.addEventListener('click', () => {
    onClick();
  });
}
