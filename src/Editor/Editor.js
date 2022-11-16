import { createElement } from '../utils/dom.js';
import { isObject } from '../utils/errorHandler.js';
import { request } from '../utils/api.js';
import PostTitle from './PostTitle.js';
import { putContentMethod, putTitleMethod } from '../utils/optionsMethod.js';
import PostContent from './PostContent.js';

function Editor({ target, initialState }) {
    const page = createElement('section');
    page.className = 'content';

    const editor = createElement('div');
    editor.className = 'editor';

    page.appendChild(editor);
    target.appendChild(page);

    const postTitle = new PostTitle({
        div: editor,
        initialState: initialState,

        onChangeTitle: async ({ id, title }) => {
            setTimeout(await putTitleMethod(id, title), 2000);
        },
    });

    const postContent = new PostContent({
        div: editor,
        initialState: initialState,

        onChangeContent: async ({ id, content }) => {
            setTimeout(await putContentMethod(id, content), 2000);
        },
    });

    this.setState = async (nextState) => {
        console.log(nextState);
        // refactor
        const post = await request(`/documents/${nextState.postId}`);
        isObject(post);
        postTitle.setState(post);
        postContent.setState(post);
        this.render();
    };

    this.render = () => {
        target.appendChild(page);
    };

    this.render();
}

export default Editor;
