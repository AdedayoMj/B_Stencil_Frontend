# app-root

<!-- Auto Generated Below -->

## Methods

### `toggleTheme() => Promise<void>`

#### Returns

Type: `Promise<void>`

## Dependencies

### Depends on

- [expense-form](../expense-form)
- [expense-list](../expense-list)
- [expense-chart](../expense-chart)

### Graph

```mermaid
graph TD;
  app-root --> expense-form
  app-root --> expense-list
  app-root --> expense-chart
  expense-chart --> skeleton-loading
  style app-root fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
