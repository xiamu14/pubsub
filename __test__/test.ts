import PubSub from '../src/mod';

type events = {
  CreatedPerson: { id: string; name: string };
  DeletedPerson: { personId: string; reason: string };
};

const pubSub = new PubSub<events>();

// TS should error because "reason" doesn't exist on Key=CreatedPerson

// TS should error because "reason" doesn't exist on Key=CreatedPerson
const id = pubSub.subscribe(
  'CreatedPerson',
  async (message) => {
    console.log(message.name);
  },
  true,
);

pubSub.publish('CreatedPerson', { id: '1', name: 'cory' });

console.log(id);

setTimeout(() => {
  // pubSub.unsubscribe(id);
  // pubSub.unsubscribeAll();
  pubSub.publish('CreatedPerson', { id: '2', name: 'jane' });
}, 200);
