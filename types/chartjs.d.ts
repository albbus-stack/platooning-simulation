import { ChartType, Plugin } from "chart.js";

declare module "chart.js" {
  interface PluginOptionsByType<TType extends ChartType> {
    dragData?: {
      round?: number;
      onDragStart?: (
        e: MouseEvent,
        datasetIndex: number,
        index: number,
        value: number
      ) => void;
      onDrag?: (
        e: MouseEvent,
        datasetIndex: number,
        index: number,
        value: number
      ) => void;
      onDragEnd?: (
        e: MouseEvent,
        datasetIndex: number,
        index: number,
        value: number
      ) => void;
      magnet?: {
        to?: (value: number) => number;
      };
    };
  }
}
