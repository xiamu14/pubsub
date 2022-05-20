import { nanoid } from 'nanoid';

export default class Subscriber {
  private id = nanoid();
  constructor() {}
  /**
   * getId
   */
  public getId() {
    return this.id;
  }
}
