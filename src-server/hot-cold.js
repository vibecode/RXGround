//=================================================================================
// COLD is when your observable creates the producer

/*An observable is “cold” if its underlying producer is created and activated during subscription. This means, that if observables are functions, then the producer is created and activated by
 calling that function.

   1. creates the producer
   2. activates the producer
   3. starts listening to the producer
   4. unicast

 The example below is “cold” because it creates and listens to the WebSocket inside of the subscriber function that is called when you subscribe to the Observable:*/

const source = new Observable((observer) => {
  const socket = new WebSocket('ws://someurl');
  socket.addEventListener('message', (e) => observer.next(e));
  return () => socket.close();
});

//=================================================================================
// HOT is when your observable closes over the producer.

/* Hot Observables: Producers created *outside*
 An observable is “hot” if its underlying producer is either created or activated outside of subscription.

   1. shares a reference to a producer
   2. starts listening to the producer
   3. multicast (usually²)

 If we were to take our example above and move the creation of the WebSocket outside of our observable it would become “hot”:*/

const socket = new WebSocket('ws://someurl');

const source = new Observable((observer) => {
  socket.addEventListener('message', (e) => observer.next(e));
});
