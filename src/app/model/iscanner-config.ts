import { ImageFormat } from "./image-format.enum";
import { Page } from "./page.enum";
import { ImageIntent } from "./image-intent.enum";

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
  selectedDevice?: string;
}
