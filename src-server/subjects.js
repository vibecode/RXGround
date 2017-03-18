import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';

//===============================================
//Simple subject
const simple$ = new Rx.Subject();

simple$.subscribe(createSubscriber('simple$'));

simple$.next('HELLO');
simple$.next('WORLD');
simple$.complete();
//===============================================
const interval$ = Rx.Observable.interval(1000).take(5);
const intervalSubject$ = new Rx.Subject();

interval$.subscribe(intervalSubject$);

intervalSubject$.subscribe(createSubscriber('sub1'));
intervalSubject$.subscribe(createSubscriber('sub2'));
intervalSubject$.subscribe(createSubscriber('sub3'));

setTimeout(() => {
  intervalSubject$.subscribe(createSubscriber('Look at me'), 3000);
});

//===================================================
//BehaviorSubject
const currentUser$ = new Rx.BehaviorSubject({isLoggedIn: false});
const isLoggedIn$ = currentUser$.map(user => user.isLoggedIn);

currentUser$.next({ isLoggedIn: false});
isLoggedIn$.subscribe(createSubscriber('isLoggedIn'));

setTimeout(() => {
  currentUser$.next({isLoggedIn: true, name: 'floki'});
}, 3000);

setTimeout(() => {
  isLoggedIn$.subscribe(createSubscriber('delayed'));
}, 1500);

//========================================================
//ReplaySubject
const replay$ = new Rx.ReplaySubject(3);
replay$.next(1);
replay$.next(2);

replay$.subscribe(createSubscriber('one'));

replay$.next(3);
replay$.next(4);
replay$.next(5);

replay$.subscribe(createSubscriber('two'));

replay$.next(6);

//=====================================================
//AsyncSubject
const apiCall$ = new Rx.AsyncSubject();
apiCall$.next(1);

apiCall$.subscribe(createSubscriber('one'));
apiCall$.next(2);
apiCall$.complete();

setTimeout(() => {
  apiCall$.subscribe(createSubscriber('two'));
}, 2000);
