import $ from 'jquery';

const $title = $('#title');
const $results = $('#results');

let lastQuery = null;
let lastTimeout = null;
let nextQueryId = 0;

$title.on('keyup', e => {
  const title = e.target.value;

  //prevents query on nonchanging keys
  if (title === lastQuery) {
    return;
  }

  lastQuery = title;

  if (lastTimeout) {
    clearTimeout(lastTimeout);
  }

  let ourQueryId = ++nextQueryId;

  //prevents query on every letter change
  lastTimeout = setTimeout(() => {
    getItems(title)
        .then(items => {

          //prevents unordered responses from uppearing
          if(ourQueryId !== nextQueryId) {
            return;
          }
          $results.empty();

          const $items = items.map(item => $(`<li />`).text(item));
          $results.append($items);
        })
  }, 500);
});

//==========================================================================
//Dummy Library
function getItems(title) {
  console.log(`Quering ${title}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([title, "Item 2", `Another Item ${Math.random() }`]);
    }, 500 + (Math.random() * 1000));
  });
}
