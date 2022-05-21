import PubSub, { Subscriber } from '../src/mod';

type events = {
  CreatedPerson: { id: string; name: string };
  DeletedPerson: { personId: string; reason: string };
};

const pubSub = new PubSub<events>();
const subscriber = new Subscriber();
pubSub.subscribe('CreatedPerson', subscriber, async (message) => {
  console.log(message.name);
});
pubSub.subscribe('DeletedPerson', subscriber, (data) => {
  console.log(data.personId);
});

pubSub.publish('CreatedPerson', { id: '1', name: 'cory' });

setTimeout(() => {
  pubSub.unsubscribe('CreatedPerson');
  pubSub.publish('CreatedPerson', { id: '2', name: 'jane' });
  pubSub.publish('DeletedPerson', { personId: '111', reason: '' });
}, 200);
