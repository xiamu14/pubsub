import { nanoid } from 'nanoid';
import { MessageFn, PubTypeFn, SubTypeFn } from './type';

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
  public subscribe: SubTypeFn<E> = (event, callback, once = false) => {
    const list = this.handlers ?? [];
    const id = nanoid();
    list.push({ id, event, callback, once });
    this.handlers = list;
    return id;
  };

  // 取消订阅
  public unsubscribe(id: string) {
    let list = this.handlers ?? [];
    list = list.filter((h) => h.id !== id);
    this.handlers = list;
  }

  // 取消全部订阅
  public unsubscribeAll() {
    this.handlers = [];
  }
}
