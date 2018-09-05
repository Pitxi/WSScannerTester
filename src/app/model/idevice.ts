import { DocumentHandlingCapabilities } from "./document-handling-capabilities.enum";

export interface IDevice {
  id: string;
  name: string;
  description: string;
  capabilities: DocumentHandlingCapabilities
}
