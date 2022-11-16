import { request } from "../utils/api.js";
import { initRoute } from "../utils/router.js";
import DocumentList from "./DocumentList.js";
import Header from "./Header.js";
import { clickRootAdd, clickRemove, clickAdd } from "../utils/router.js";
import { isNew } from "../utils/isNew.js";
import { setItem, getItem, removeItem } from "../utils/storage.js";

export default function DocumentPage({ $target, onClickTitle }) {
  isNew(DocumentPage, this);

  const $page = document.createElement("div");
  $page.className = "document-page";
  const documentList = new DocumentList({
    $target: $page,
    initialState: [],
    onClickRootAdd: () => {
      clickRootAdd();
    },
    onClickRemove: (id) => {
      clickRemove(id);
    },
    onClickAdd: (id) => {
      clickAdd(id);
    },
  });

  new Header({
    $target: $page,
    initialState: "김민우",
  });

  const fetchDocument = async () => {
    const posts = await request("/documents");
    posts.map((el) => {
      if (el.title === "") {
        el.title = "제목 없음";
      }
    });
    documentList.setState(posts);
  };

  this.render = async () => {
    await fetchDocument();
  };

  this.route = () => {
    this.setState();
  };

  initRoute(() => fetchDocument());

  $page.addEventListener("click", (e) => {
    const { target } = e;
    const element = target.closest("li");
    if (element) {
      const { id } = element.dataset;
      if (target.className === "list-title") {
        onClickTitle(id);
        const listClicked = `isClicked`;
        if (getItem(listClicked)) {
          removeItem(listClicked);
          setItem(listClicked, `${id}-clicked`);
        } else {
          setItem(listClicked, `${id}-clicked`);
        }
      }
    }
  });

  $target.prepend($page);
}
