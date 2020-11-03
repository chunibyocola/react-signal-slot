# react-signal-slot
A simple way to trigger the functions of other components.
## Install
```
npm i react-signal-slot
```
## Usage
```JavaScript
import { useSignal, useSlot } from 'react-signal-slot';
import { useCallback, useState, useRef } from 'react';

const A = () => {
    const [text, setText] = useState('');

    const fn = useCallback((text) => { setText(text); }, []);

    useSlot('signal', fn); // subscribe the signal of "signal"

    return (
        <span>{text}</span>
    );
};

const B = () => {
    const inputEle = useRef(null);

    const signal = useSignal();

    return (
        <>
            <input ref={inputEle} />
            <button onClick={() => signal('signal', inputEle.current.value)}>Signal</button>
        </>
    );
};
```
## API
```JavaScript
const signal = useSignal();
signal('type-of-signal', param0, param1, param2...);
```
This hook returns a function which can emit signal. The emit function can emit signal and params.
```JavaScript
useSlot('type-of-signal', fn);
```
This hook will subscribe to the signal you want. When the signal is emitted, the "fn" will be triggered.
## License
MIT