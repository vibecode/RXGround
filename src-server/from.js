import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';
import fs from 'fs';

//===================================================
//from bindNodeCallback
const readdir$ = Rx.Observable.bindNodeCallback(fs.readdir);

readdir$('./src-server')
    .mergeMap(files => Rx.Observable.from(files))
    .map(file => `MANIPULATED ${file}`)
    .subscribe(createSubscriber('readdir'));

//===================================================
//from Promise
function getItem() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('HELLO');
    }, 1000);
  });
}


Rx.Observable.fromPromise(getItem())
  .subscribe(createSubscriber('promise'));