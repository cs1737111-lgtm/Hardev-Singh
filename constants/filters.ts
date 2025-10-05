export interface Filter {
  id: string;
  name: string;
  style: string;
}

export const FILTERS: Filter[] = [
  { id: 'none', name: 'None', style: 'none' },
  { id: 'grayscale', name: 'Grayscale', style: 'grayscale(100%)' },
  { id: 'sepia', name: 'Sepia', style: 'sepia(100%)' },
  { id: 'invert', name: 'Invert', style: 'invert(100%)' },
  { id: 'contrast', name: 'Contrast', style: 'contrast(160%)' },
  { id: 'saturate', name: 'Saturate', style: 'saturate(2)' },
];

export const filterStyleMap: { [key: string]: string } = FILTERS.reduce((acc, filter) => {
    acc[filter.id] = filter.style;
    return acc;
}, {} as { [key: string]: string });
