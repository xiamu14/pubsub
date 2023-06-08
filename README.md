# pubsub

使用 typescript 开发的事件订阅/发布，支持事件名和事件参数类型描述。

## 安装

`pnpm install @redchili/pubsub`

[Live Demo](https://codesandbox.io/s/dreamy-grass-6dukim?file=/src/index.ts:36-52)

## 示例

基本使用方式

```ts
import PubSub, { Subscriber } from '@redchili/pubsub';

// 定义事件和事件传递的数据类型
interface EventType {
  click: { value: string };
}

const pubsub = new PubSub<EventType>();

// 订阅者实例，用于订阅和解除订阅
const subscriber = new Subscriber();

// subscriber 订阅 click 事件
pubsub.subscribe('click', subscriber, (event) => {
  console.log(event.value);
});

// 发布 click 事件
pubsub.publish('click', { value: 'click event' });

// 取消 subscriber 的所有订阅
pubsub.unsubscribe(subscriber);
```

取消某个事件的所有订阅

```ts
pubsub.unsubscribe('click');
```

取消订阅者的所有订阅

```ts
pubsub.unsubscribe(subscriber);
```

取消全部订阅

```ts
pubsub.unsubscribe();
```

## 其他

定义不传递参数的事件

```ts
interface EventType {
  reset: undefined;
}

const pubsub = new PubSub<EventType>();

pubsub.publish(reset, undefined);
```

## 在 React-Native 中使用
本项目使用了 nanoid 作为事件回调函数唯一 ID，所以在 React-Native 中使用请先安装 nanoid 的使用指南配置 polyfill 库，具体参考如下：
https://github.com/ai/nanoid/blob/main/README.zh-CN.md#react-native
