/**
 * Available PPIs.
 */
import { ImageFormat } from "./image-format.enum";
import { Page } from "./page.enum";
import { ImageIntent } from "./image-intent.enum";

export const AVAILABLE_PPI = [ 100, 200, 300, 600, 1200 ];

/**
 * Interface for all scanner commands.
 */
export interface IScannerCommand {
  command: string,
  parameters?: any
}

/**
 * Interface for scan commands.
 */
export interface IScanCommand extends IScannerCommand {
  command: 'scan-dialog' | 'scan';
  parameters: IScannerConfig
}

/**
 * Interface for scanner configuration parameters.
 */
export interface IScannerConfig {
  format?: ImageFormat;
  dialogTitle?: string;
  ppi?: number;
  paper?: Page;
  intent?: ImageIntent;
  ppiSelectable?: boolean;
  paperSelectable?: boolean;
  intentSelectable?: boolean;
  selectedDevice?: number;
}
