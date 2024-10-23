export type HexColorCode = `#${string}`;
export type RGBAColorCode = `rgba(${number}, ${number}, ${number}, ${number})`;

export type ColorKey = 'white' | 'black' | 'primary';

export type ColorValue = HexColorCode | RGBAColorCode;

export type Colors = Record<ColorKey, ColorValue>;

export type Palette = Record<ColorKey, ColorValue>;

export const palette: Palette = {
  white: '#ffffff',
  black: 'rgba(10, 10, 10, 100)',
  primary: '#5aa0d4',
};

export const colors: Colors = {
  white: '#ffffff',
  black: 'rgba(10, 10, 10, 100)',
  primary: '#5aa0d4',
};
