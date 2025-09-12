import bb, { Chart, bar, line } from "billboard.js"
import "billboard.js/dist/billboard.css"  // default css
import { $, $$, render, useEffect, useMemo } from "woby"
import { BBChart, IChart } from "../src/BBChart"
// const BillboardJS = require("@billboard.js/react");  // for CJS

function App() {
    // to get the instance, create ref and pass it to the component
    const chartComponent = $<IChart>(null)
    const ref = $<Chart>()
    const value = $(100)
    const options = useMemo(() => {
        return {
            data: {
                columns: [
                    ["data1", 30, 200, $$(value), 400, 150, 250],
                    ["data2", 50, 20, 10, 40, 15, 25]
                ],
                type: line(), // for ESM specify as: line()
            },
        }
    })

    const options2 = {
        data: {
            columns: [
                ["data1", 30, 200, 100, 400, 150, 250],
                ["data2", 50, 20, 10, 40, 15, 25]
            ],
            type: bar(), // for ESM specify as: line()
        },
    }

    const barRadius = {
        data: {
            columns: [
                ["data1", 80, 250, -200, 200, 250, 150],
                ["data2", 170, -350, 240, 200, -250, 150],
                ["data3", -120, 100, 240, -300, 350, 350],
                ["data4", 180, 130, 340, 200, 250, -250]
            ],
            type: bar(), // for ESM specify as: bar()
        },
        bar: {
            radius: {
                ratio: 0.5
            }
        },
    }
    const test = $(true)

    useEffect(() => {
        // get the instance from ref
        const chart = ref()

        // call APIs
        if (chart)
            //@ts-ignore
            chart.load(...$$(options).data.columns)

    })

    return (
        <>
            <BBChart
                bb={bb}
                options={(() => $$(test) ? options : options2) as any}

                chartRef={ref}

                /* The values will be specified to the bound element as inlined styles */
                style={{
                    width: "100%"
                }}
                /* When class name doesn't contains `bb`,
                   then you also need to update the default CSS to be rendered correctly. */
                class={"bb my-classname"} />
            <button onClick={() => value(v => v * 2)}>change value</button >
            <button onClick={() => test(!test())}>change options</button >

            <BBChart
                bb={bb}
                options={barRadius}

                chartRef={ref}

                /* The values will be specified to the bound element as inlined styles */
                style={{
                    width: "100%"
                }}
                /* When class name doesn't contains `bb`,
                   then you also need to update the default CSS to be rendered correctly. */
                class={"bb my-classname"} />
        </>
    )
}

render(App, document.body)