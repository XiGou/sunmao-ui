import { Type } from '@sinclair/typebox';
import { StringUnion } from '../../sunmao-helper';
import { EventHandlerSpec } from '@sunmao-ui/runtime';
import { Category } from '../../constants/category';

const moduleSpec = Type.Object(
  {
    id: Type.String({
      title: 'Module ID',
    }),
    type: Type.String({
      title: 'Module Type',
    }),
    properties: Type.Record(Type.String(), Type.Any(), {
      title: 'Module Properties',
      category: 'Basic',
      widget: 'core/v1/record',
    }),
    handlers: Type.Array(EventHandlerSpec, {
      title: 'Events',
    }),
  },
  {
    title: 'Module Config',
    conditions: [
      {
        key: 'type',
        value: 'module',
      },
    ],
  }
);

export const ColumnSpec = Type.Object({
  title: Type.String({
    title: 'Title',
    category: Category.Basic,
  }),
  type: Type.KeyOf(
    Type.Object({
      text: Type.String(),
      image: Type.String(),
      link: Type.String(),
      button: Type.String(),
      module: Type.String(),
    }),
    {
      title: 'Type',
      category: Category.Basic,
    }
  ),
  dataIndex: Type.String({
    title: 'Key',
    category: Category.Basic,
    description:
      'The key corresponding to the column data in the data item is used to display the value',
  }),
  displayValue: Type.String({
    title: 'Display Value',
    category: Category.Basic,
    description: 'The text you want to display instead of raw text.',
  }),
  width: Type.Optional(
    Type.Number({
      title: 'Width',
    })
  ),
  ellipsis: Type.Optional(
    Type.Boolean({
      title: 'Ellipsis',
      description:
        'If the cell content exceeds the length, whether it is automatically omitted and displays ...,After setting this property, the table-layout of the table will automatically become fixed.',
    })
  ),
  sorter: Type.Optional(
    Type.Boolean({
      title: 'Enable Sort',
      conditions: [
        {
          key: 'type',
          value: 'text',
        },
      ],
    })
  ),
  filter: Type.Boolean({
    title: 'Enable Filter',
  }),
  sortDirections: Type.Optional(
    Type.Array(StringUnion(['descend', 'ascend']), {
      conditions: [
        {
          key: 'sorter',
          value: true,
        },
      ],
      widget: 'core/v1/expression',
    })
  ),
  btnCfg: Type.Optional(
    Type.Object(
      {
        text: Type.String({
          title: 'Text',
        }),
        handlers: Type.Array(
          {
            ...EventHandlerSpec,
            widgetOptions: {
              componentType: 'arco/v1/button',
            },
          },
          {
            title: 'Events',
          }
        ),
      },
      {
        title: 'Button Config',
        conditions: [
          {
            key: 'type',
            value: 'button',
          },
        ],
      }
    )
  ),
  module: Type.Optional(moduleSpec),
});

export const TablePropsSpec = Type.Object({
  data: Type.Array(Type.Any(), {
    title: 'Data',
    category: Category.Data,
    weight: 0,
    widget: 'core/v1/expression',
  }),
  columns: Type.Array(ColumnSpec, {
    title: 'Columns',
    description: '',
    category: Category.Columns,
    widgetOptions: {
      displayedKeys: ['title'],
    },
    weight: 0,
  }),
  tableLayoutFixed: Type.Boolean({
    title: 'Layout Fixed',
    description:
      "The table's table-layout property is set to fixed. After set to fixed, the width of the table will not be stretched by the content beyond 100%",
    category: Category.Layout,
    weight: 1,
  }),
  border: Type.Boolean({
    title: 'Show Border',
    category: Category.Style,
    weight: 2,
  }),
  borderCell: Type.Boolean({
    title: 'Show Cell Border',
    description: 'Whether to display the table cell border',
    category: Category.Style,
    weight: 1,
  }),
  stripe: Type.Boolean({
    title: 'Show Stripe',
    description: 'Whether to show stripe style',
    category: Category.Style,
    weight: 2,
  }),
  pagination: Type.Object(
    {
      pageSize: Type.Number({
        title: 'Page Size',
      }),
    },
    {
      title: 'Pagination',
      category: Category.Layout,
    }
  ),
  size: StringUnion(['default', 'middle', 'small', 'mini'], {
    title: 'Size',
    description: 'table size',
    category: Category.Style,
    weight: 0,
  }),
  pagePosition: StringUnion(['br', 'bl', 'tr', 'tl', 'topCenter', 'bottomCenter'], {
    title: 'Page Position',
    description: '',
    category: Category.Layout,
    weight: 10,
  }),
  rowSelectionType: StringUnion(['multiple', 'single', 'disable'], {
    title: 'Row Selection Type',
    category: Category.Basic,
  }),
  rowClick: Type.Boolean({
    title: 'Row Click',
    category: Category.Basic,
    description: 'If on, the table can be selected without setting the rowSelectionType',
  }),
  loading: Type.Boolean({
    title: 'Show Loading',
    category: Category.Basic,
  }),
});
