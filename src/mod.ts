import Subscriber from './subscriber';
import { MessageFn, PubTypeFn, SubTypeFn, UnSubTypeFn } from './type';

export { default as Subscriber } from './subscriber';
export default class PubSub<E> {
  private handlers: {
    event: string;
    id: string;
    callback: MessageFn<any>;
    once?: boolean;
  }[] = [];

  // 发布事件
  public publish: PubTypeFn<E> = (event, msg) => {
    const list = this.handlers ?? [];

    const handlers = list.filter((h) => h.event === event);

    handlers.forEach((h) => {
      h.callback(msg);
      if (h.once) {
        const index = list.findIndex((it) => h.id === it.id);
        list.splice(index, 1);
      }
    });
  };

  // 订阅事件
  public subscribe: SubTypeFn<E> = (event, subscriber, callback) => {
    const list = this.handlers ?? [];
    const id = subscriber.getId();
    list.push({ id, event, callback });
    this.handlers = list;
  };

  /**
   * 取消订阅
   * @param key undefined: 取消全部订阅； EventName: 取消事件订阅；Subscriber： 取消订阅者
   */
  public unsubscribe: UnSubTypeFn<E> = (key) => {
    let list = this.handlers ?? [];

    if (key instanceof Subscriber) {
      const id = key.getId();
      list = list.filter((h) => h.id !== id);
    } else if (typeof key === 'string') {
      list = list.filter((it) => it.event !== key);
    } else {
      list = [];
    }
    this.handlers = list;
  };

  /**
   * @deprecated
   * 取消全部订阅
   */
  public unsubscribeAll() {
    this.handlers = [];
  }
}
