// declare module 'react-table' {
//   import {
//     UseExpandedInstanceProps,
//     UseExpandedOptions,
//     UseFiltersColumnOptions,
//     UseFiltersColumnProps,
//     UseFiltersInstanceProps,
//     UseFiltersOptions,
//     UseFiltersState,
//     UseGlobalFiltersColumnOptions,
//     UseGlobalFiltersInstanceProps,
//     UseGlobalFiltersState,
//     UseGroupByOptions,
//     UsePaginationInstanceProps,
//     UsePaginationOptions,
//     UsePaginationState,
//     UseRowSelectOptions,
//     UseSortByOptions
//   } from 'react-table';
//
//   export interface TableOptions<D extends Record<string, unknown>>
//     extends UseExpandedOptions<D>,
//       UseFiltersOptions<D>,
//       UseGroupByOptions<D>,
//       UsePaginationOptions<D>,
//       UseRowSelectOptions<D>,
//       UseSortByOptions<D>,
//       UseFiltersOptions<D> {
//   }
//
//   export interface Hooks<D extends Record<string, unknown> = Record<string, unknown>>
//     extends UseExpandedHooks<D>,
//       UseGroupByHooks<D>,
//       UseRowSelectHooks<D>,
//       UseSortByHooks<D> {
//   }
//
//   export interface TableInstance<D extends Record<string, unknown> = Record<string, unknown>>
//     extends UsePaginationInstanceProps<D> {
//   }
//
//   export interface TableState<D extends Record<string, unknown> = Record<string, unknown>>
//     extends UseFiltersState<D>,
//       UseGlobalFiltersState<D>,
//       UsePaginationState<D> {
//   }
//
//   export interface ColumnInterface<D extends Record<string, unknown> = Record<string, unknown>>
//     extends UseFiltersColumnOptions<D>,
//       UseGlobalFiltersColumnOptions<D> {
//   }
//
//   export interface ColumnInstance<D extends Record<string, unknown> = Record<string, unknown>>
//     extends UseFiltersColumnProps<D> {
//   }
//
//   export interface Cell<D extends Record<string, unknown> = Record<string, unknown>, V = any> {
//   }
//
//   export interface Row<D extends Record<string, unknown> = Record<string, unknown>> {
//   }
// }
