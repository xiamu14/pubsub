import Subscriber from './subscriber';

/**
 * Defines the function type of the publish function.
 *
 * Extracts the keys from `E` as valid event types, and the matching
 * property as the payload.
 */
export type PubTypeFn<E> = <Key extends string & keyof E>(
  event: Key,
  message: E[Key],
) => void;

/**
 * Defines the function type for the subscribe function.
 *
 * Extracts the keys from `E` as valid event types, and the matching
 * property as the payload to the callback function.
 */
export type SubTypeFn<E> = <Key extends string & keyof E>(
  event: Key,
  // fn: MessageFn<E>
  // This passes through the 'message' type to .subscribe()
  subscriber: Subscriber,
  fn: (message: E[Key]) => void,
) => void;

export type UnSubTypeFn<E> = <Key extends string & keyof E>(
  key?: Key | Subscriber,
) => void;

/**
 * Defines the function type for the subscription callback. Ensures
 * the message payload is a valid property of the event being used.
 */
export type MessageFn<E> = <Key extends string & keyof E>(
  message: E[Key],
) => void;
