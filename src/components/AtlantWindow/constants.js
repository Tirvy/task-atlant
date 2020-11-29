export const edgeTrueWidth = 6;
export const edgeVisualWidth = 4;

let edgeDirectionsSource = [
  {
    name: 'ns',
    v: -1,
    h: 0,
  },
  {
    name: 'nesw',
    v: -1,
    h: 1,
  },
  {
    name: 'ew',
    v: 0,
    h: 1,
  },
  {
    name: 'nwse',
    v: 1,
    h: 1,
  },
  {
    name: 'ns',
    v: 1,
    h: 0,
  },
  {
    name: 'nesw',
    v: 1,
    h: -1,
  },
  {
    name: 'ew',
    v: 0,
    h: -1,
  },
  {
    name: 'nwse',
    v: -1,
    h: -1,
  },
];

const edgeOffsets = [
  `${edgeVisualWidth - edgeTrueWidth}px`,
  edgeVisualWidth + 'px',
  `calc(100% - ${edgeVisualWidth}px)`,
];
const edgeWidths = [edgeTrueWidth + 'px', `calc(100% - ${edgeVisualWidth * 2}px)`];
export const edgeDirections = edgeDirectionsSource.map(item => {
  const isHorizontal = item.h === 0;
  const isVertical = item.v === 0;
  return {
    cursor: `${item.name}-resize`,
    name: item.name,
    width: edgeWidths[+isHorizontal],
    height: edgeWidths[+isVertical],
    left: edgeOffsets[item.h + 1],
    top: edgeOffsets[item.v + 1],
    direction: item,
  };
});
