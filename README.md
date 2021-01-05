# @halka/react-medium-zoom

![Bundle Size](https://badgen.net/bundlephobia/minzip/@halka/react-medium-zoom) ![npm version](https://badgen.net/npm/v/@halka/react-medium-zoom) ![types](https://badgen.net/npm/types/@halka/react-medium-zoom) ![license](https://badgen.net/github/license/halka-org/react-medium-zoom)

A thin wrapper on top of the amazing [Medium Zoom](https://github.com/francoischalifour/medium-zoom)

---

## Why the wrapper?

Got tired of re-writing this component everywhere. It tried to strike the right balance between the declarative goodness and imperative power.

> Feel free to star the repo, fork the repo and raise issues

---

## Installation

```sh
npm i @halka/react-medium-zoom
```

---

## API Reference

### `<MediumZoom>` component

The easiest way to consume this package is using the MediumZoom component

```jsx
import { MediumZoom } from '@halka/react-medium-zoom';

function App() {
  return (
    <div>
      <OtherComponents >
      <MediumZoom
        /** you can also attach a ref and it will be refer to the <img> element underneath
        /** any valid <img /> props **/
        src={imgUrl}
        alt="image"
        style={{ width: 'auto', height: 400 }}
        /** anything you can pass to medium zoom options **/
        options={{ background: 'black', margin: 20 }}
      />
      <OtherComponents >
    </div>
  );
}
```

#### **Props**

- All the base `<img />` props like `src`, `alt` (don't forget `alt`), etc.
- You can also use `ref` to attach a `ref` to the original `<img>` component
- `options` - An object that accepts all the options accepted by `medium-zoom`. [Reference docs](https://github.com/francoischalifour/medium-zoom#options)
- You can also add `data-zoom-src` to add a higher quality image for the zoomed view. [Reference docs](https://github.com/francoischalifour/medium-zoom#data-zoom-src)

#### **Supported Options**

| Property       | Type                                  | Default  | Description                                                                 |
| -------------- | ------------------------------------- | -------- | --------------------------------------------------------------------------- |
| `margin`       | `number`                              | `0`      | The space outside the zoomed image                                          |
| `background`   | `string`                              | `"#fff"` | The background of the overlay                                               |
| `scrollOffset` | `number`                              | `40`     | The number of pixels to scroll to close the zoom                            |
| `container`    | `string` \| `HTMLElement` \| `object` | `null`   | The viewport to render the zoom in<br> [Read more →](docs/container.md)     |
| `template`     | `string` \| `HTMLTemplateElement`     | `null`   | The template element to display on zoom<br> [Read more →](docs/template.md) |

---

---

### `useMediumZoom` hook

If you want more control over the interaction, you can use the hook as well.

```jsx
import { useMediumZoom } from '@halka/react-medium-zoom';

function Image(props) {
  const ref = React.useRef();
  const handler = useMediumZoom(ref, {
    background: 'black',
  });

  return (
    <div>
      <button
        onClick={() => {
          handler.open();
        }}
      >
        Open Image
      </button>
      <img ref={ref} src={imgUrl} alt="image" />
    </div>
  );
}
```

---

#### Arguments

- `ref` - first arguments is the `ref` object of the `<img>` element to attach to.
- `options` - second is the options object accepted by `medium-zoom`. [Reference docs](https://github.com/francoischalifour/medium-zoom#options)

The hook returns the `handler` object which exposes a subset of the methods present on `zoom` instance.

---

#### `handler` object

We strongly recommend not using the imperative methods on the `zoom` instance directly and use the methods exposed on the `handler` object instead.

---

##### `open(): Promise<void>`

Opens the zoom and returns a promise resolving with the zoom.

```jsx
handler.open();
```

Emits an event `open` on animation start and `opened` when completed.

[Reference docs](https://github.com/francoischalifour/medium-zoom#open-target-htmlelement--promisezoom)

> Note: the return type is `void` instead of the zoom instance and it **doesn't** accept a `target`

---

##### `close(): Promise<void>`

Closes the zoom and returns a promise resolving with the zoom.

```jsx
handler.close();
```

Emits an event `close` on animation start and `closed` when completed.

[Reference docs](https://github.com/francoischalifour/medium-zoom#close-promisezoom)

> Note: the return type is `void` instead of the zoom instance

---

##### `toggle(): Promise<void>`

Opens the zoom when closed / dismisses the zoom when opened, and returns a promise resolving with the zoom.

```jsx
handler.toggle();
```

[Reference docs](https://github.com/francoischalifour/medium-zoom#toggle-target-htmlelement--promisezoom)

> Note: the return type is `void` instead of the zoom instance and it **doesn't** accept a `target`.

---

##### `on(type: string, listener: () => void, options?: boolean | AddEventListenerOptions): void`

Registers the listener on each target of the zoom.

The same `options` as `addEventListener` are used.

```jsx
handler.on('closed', event => {
  // the image has been closed
});

handler.on(
  'open',
  event => {
    // the image has been opened (tracked only once)
  },
  { once: true }
);
```

[Reference docs](https://github.com/francoischalifour/medium-zoom#ontype-string-listener---void-options-boolean--addeventlisteneroptions-zoom)

> Note: the return type is `void` instead of the zoom instance

---

##### `off(type: string, listener: () => void, options?: boolean | AddEventListenerOptions): void`

Removes the previously registered listener on each target of the zoom.

The same `options` as `removeEventListener` are used.

```jsx
function listener(event) {
  // ...
}

handler.on('open', listener);
// ...
handler.off('open', listener);
```

[Reference docs](https://github.com/francoischalifour/medium-zoom#offtype-string-listener---void-options-boolean--addeventlisteneroptions-zoom)

> Note: the return type is `void` instead of the zoom instance

---

### Supported Events

| Event  | Description                                         |
| ------ | --------------------------------------------------- |
| open   | Fired immediately when the `open` method is called  |
| opened | Fired when the zoom has finished being animated     |
| close  | Fired immediately when the `close` method is called |
| closed | Fired when the zoom out has finished being animated |
| detach | Fired when the `detach` method is called            |
| update | Fired when the `update` method is called            |

[Reference docs](https://github.com/francoischalifour/medium-zoom#events)

## Example and Advance Usage

- [`/examples/Image.tsx`](./example/Image.tsx) - showcases some advance usecases using the `useMediumZoom` hook. It shows usage of `handler` object, adding custom `event` listeners and using `template`.

> You can also refer to [examples in `medium-zoom` repo](https://github.com/francoischalifour/medium-zoom/tree/master/examples) and try to implement using them the ways shown in the example component mentioned above.
