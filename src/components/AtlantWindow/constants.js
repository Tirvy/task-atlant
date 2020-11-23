export const edgeTrueWidth = 6;
export const edgeVisualWidth = 4;

let edgeDirectionsSource = [
  {
    name: 'ns',
    v: 0,
    h: 1,
  },
  {
    name: 'nesw',
    v: 0,
    h: 2,
  },
  {
    name: 'ew',
    v: 1,
    h: 2,
  },
  {
    name: 'nwse',
    v: 2,
    h: 2,
  },
  {
    name: 'ns',
    v: 2,
    h: 1,
  },
  {
    name: 'nesw',
    v: 2,
    h: 0,
  },
  {
    name: 'ew',
    v: 1,
    h: 0,
  },
  {
    name: 'nwse',
    v: 0,
    h: 0,
  },
];

const edgeOffsets = [
  `${edgeVisualWidth - edgeTrueWidth}px`,
  edgeVisualWidth + 'px',
  `calc(100% - ${edgeVisualWidth}px)`,
];
const edgeWidths = [edgeTrueWidth + 'px', `calc(100% - ${edgeVisualWidth * 2}px)`];
export const edgeDirections = edgeDirectionsSource.map(item => {
  const isHorizontal = item.h === 1;
  const isVertical = item.v === 1;
  return {
    cursor: `${item.name}-resize`,
    name: item.name,
    width: edgeWidths[+isHorizontal],
    height: edgeWidths[+isVertical],
    left: edgeOffsets[item.h],
    top: edgeOffsets[item.v],
  };
});
