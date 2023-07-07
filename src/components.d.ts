/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { ExpenseData } from "./types";
export { ExpenseData } from "./types";
export namespace Components {
    interface AppRoot {
        "toggleTheme": () => Promise<void>;
    }
    interface ExpenseChart {
        "expenses": ExpenseData[];
    }
    interface ExpenseForm {
    }
    interface ExpenseList {
        "expenses": ExpenseData[];
    }
    interface WaveLoading {
    }
}
declare global {
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLExpenseChartElement extends Components.ExpenseChart, HTMLStencilElement {
    }
    var HTMLExpenseChartElement: {
        prototype: HTMLExpenseChartElement;
        new (): HTMLExpenseChartElement;
    };
    interface HTMLExpenseFormElement extends Components.ExpenseForm, HTMLStencilElement {
    }
    var HTMLExpenseFormElement: {
        prototype: HTMLExpenseFormElement;
        new (): HTMLExpenseFormElement;
    };
    interface HTMLExpenseListElement extends Components.ExpenseList, HTMLStencilElement {
    }
    var HTMLExpenseListElement: {
        prototype: HTMLExpenseListElement;
        new (): HTMLExpenseListElement;
    };
    interface HTMLWaveLoadingElement extends Components.WaveLoading, HTMLStencilElement {
    }
    var HTMLWaveLoadingElement: {
        prototype: HTMLWaveLoadingElement;
        new (): HTMLWaveLoadingElement;
    };
    interface HTMLElementTagNameMap {
        "app-root": HTMLAppRootElement;
        "expense-chart": HTMLExpenseChartElement;
        "expense-form": HTMLExpenseFormElement;
        "expense-list": HTMLExpenseListElement;
        "wave-loading": HTMLWaveLoadingElement;
    }
}
declare namespace LocalJSX {
    interface AppRoot {
    }
    interface ExpenseChart {
        "expenses"?: ExpenseData[];
    }
    interface ExpenseForm {
    }
    interface ExpenseList {
        "expenses"?: ExpenseData[];
    }
    interface WaveLoading {
    }
    interface IntrinsicElements {
        "app-root": AppRoot;
        "expense-chart": ExpenseChart;
        "expense-form": ExpenseForm;
        "expense-list": ExpenseList;
        "wave-loading": WaveLoading;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "expense-chart": LocalJSX.ExpenseChart & JSXBase.HTMLAttributes<HTMLExpenseChartElement>;
            "expense-form": LocalJSX.ExpenseForm & JSXBase.HTMLAttributes<HTMLExpenseFormElement>;
            "expense-list": LocalJSX.ExpenseList & JSXBase.HTMLAttributes<HTMLExpenseListElement>;
            "wave-loading": LocalJSX.WaveLoading & JSXBase.HTMLAttributes<HTMLWaveLoadingElement>;
        }
    }
}
