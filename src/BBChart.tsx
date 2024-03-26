import { $, $$, useEffect, type JSX, ObservableMaybe, FunctionMaybe, isObservable } from "woby"
import type { bb, Chart, ChartOptions } from "billboard.js"

export { ChartOptions as IChartOptions }

export interface IProp extends Pick<JSX.VoidHTMLAttributes<HTMLDivElement>, "className" | "style"> {
    bb: typeof bb
    options: ObservableMaybe<ChartOptions>
    chartRef: JSX.Ref
}

export interface IChart {
    instance: Chart
}


export const BBChart = (props: IProp) => {

    const container = $<HTMLDivElement>()
    const instance = $<Chart | null>()
    const { bb, options: ops, ...htmlDivProps } = props
    const options = isObservable(ops) ? ops : $$(ops)

    useEffect(() => {
        if (!$$(container)) return

        $$(options).bindto = $$(container)
        bb.generate($$(options))

        // cleanup
        return () => {
            if ($$(instance)) {
                $$(instance).unload()
            }
        }
    })

    props.chartRef(instance())

    return <div ref={container} {...htmlDivProps} />

}