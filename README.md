# @woby/billboard

Voby component for billboard.js

## Installation

```bash
# Install billboard.js together if you don't have it already
$ pnpm install billboard.js
$ pnpm install @woby/billboard
```

## How to use

> ℹ️ The component will create a `<div>` element and append it to the parent element

### Basic Usage

```jsx
Refer to attached demo project folder

```

### Using `props` passed to the component

When the options are passed to the "chart" component.

```js
// index.tsx
import App from "./App.tsx";

const options = {
    data: {
        columns: [
            ["data1", 300, 350, 300]
        ],
        type: "bar"
    }
};

<App {...options} />

// or
// <App data={
//     columns: [
//         ["data1", 300, 350, 300]
//     ],
//     type: "bar"
// } />

// App.tsx
import * as Chart from "billboard.js";
import "billboard.js/dist/billboard.css";  // default css
import BillboardJS, {IChart, IChartOptions} from "../src/index";

export function App(props: IChartOptions) {
    const chartComponent = $<IChart>(null);

    // when chart "type" is passed from props, chart types need to be initialized separately.
    // in this scenario, can't be "tree-shaken" only used chart type modules.
    Chart[props.data.type]();

    useEffect(() => {
        const chart = chartComponent.current?.instance;

        if (chart) {
            chart.load( ... );
        }
    })

    return <BillboardJS
        bb={Chart.bb}
        options={props}
        ref={chartComponent}
     />;
}
```

### TypeScript Interfaces

```ts
// chart options
interface IChartOptions;

interface IProp extends Pick<JSX.ViewAttributes<HTMLDivElement>, "className" | "style"> {
    bb: typeof bb;
    options: ChartOptions;
    chartRef: JSX.Ref
}
// Chart instance
interface IChart {
	instance: Chart;
}
```
