import $ from 'jquery';
import Rx from 'rxjs/Rx';

const $title = $('#title');
const $results = $('#results');

Rx.Observable.fromEvent($title, 'keyup')
  .map(e => e.target.value)
  .distinctUntilChanged()
  .debounceTime(300)
  .switchMap(getItems)
  .subscribe(items => {
    $results.empty();
    $results.append(items.map(i => $(`<li />`).text(i)));
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
