/**
 * Image formats.
 */
export enum Format {
  BMP  = 'bmp',
  GIF  = 'gif',
  PNG  = 'png',
  JPEG = 'jpeg',
  TIFF = 'tiff'
}

/**
 * Paper sizes.
 */
export enum PaperSize {
  Letter    = 'letter',
  Legal     = 'legal',
  Statement = 'statement',
  A3        = 'a3',
  A4        = 'a4'
}

/**
 * Scanning intent.
 */
export enum Intent {
  Color     = 'color',
  GrayScale = 'grayscale',
  Text      = 'text'
}

/**
 * Available PPIs.
 */
export const AVAILABLE_PPI  = [ 100, 200, 300, 600, 1200 ];

/**
 * Scan parameters
 */
export interface ScanCommand {
  command         : 'scan',
  format          : Format,
  dialogTitle     : string,
  ppi             : number,
  paper           : PaperSize,
  intent          : Intent,
  ppiSelectable   : boolean,
  paperSelectable : boolean,
  intentSelectable: boolean
}
