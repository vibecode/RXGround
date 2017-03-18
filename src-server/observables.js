import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';

//=============================================================
const simple$ = new Rx.Observable(observer => {
  console.log('generating observable');
  setTimeout(() => {
    observer.next('an item');
    setTimeout(() => {
      observer.next('another item');
      observer.complete();
    }, 1000);
  }, 1000);
});

// simple$.subscribe(
//     item => console.log(`one.next ${item}`),
//     error => console.log(`one.error ${error}`),
//     () => console.log('one.complete')
// );
//
// setTimeout(() => {
//   simple$.subscribe({
//     next: item => console.log(`two.next ${item}`),
//     error(error) {
//       console.log(`two.error ${error}`)
//     },
//     complete: function() {
//       console.log(`two.complete`);
//     }
//   })
// }, 3000);

//==============================================================
//EXAMPLE2


function createInterval$(time) {
  return new Rx.Observable(observer => {
    let index = 0;
    let interval = setInterval(() => {
      console.log(`Generating ${index}`);
      observer.next(index++);
    }, time);

    return () => {
      clearInterval(interval);
    }
  });
}
//Example of Rx operator implementation
function take$(sourceOvservable$, amount) {
  return new Rx.Observable(observer => {
    let count = 0;

    const subscription = sourceOvservable$.subscribe({
      next(item) {
        observer.next(item);
        if (++count >= amount) {
          observer.complete();
        }
      },
      error(error) {
        observer.error(error);
      },
      complete() {
        observer.complete();
      }
    });

    return () => subscription.unsubscribe();
  });
}

const everySecond$ = createInterval$(1000);
const firstFiveSeconds$ = take$(everySecond$, 5);
const subscription = firstFiveSeconds$.subscribe(createSubscriber('one'));
