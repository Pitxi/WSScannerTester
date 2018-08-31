/**
 * The current scanner acquisition source and mode.
 */
export enum DocumentHandlingSelect {
  /**
   * Scan by using the document feeder.
   */
  Feeder = 0x001,

  /**
   * Scan by using the flatbed.
   */
  Flatbed = 0x002,

  /**
   * Scan by using duplexer operations.
   */
  Duplex = 0x004,

  /**
   * Scan the front of the document first. This value is valid only when DUPLEX is set.
   */
  FrontFirst = 0x008,

  /**
   * Scan the back of the document first. This value is valid only when DUPLEX is set.
   */
  BackFirst = 0x010,

  /**
   * Scan the front only. This value is valid only when DUPLEX is set.
   */
  FrontOnly = 0x020,

  /**
   * Scan the back only. This value is valid only when DUPLEX is set.
   */
  BackOnly = 0x040,

  /**
   * Scan the next page of the document.
   */
  NextPage = 0x080,

  /**
   * Enable pre-feed mode. Preposition the next document while scanning.
   */
  Prefeed = 0x100,

  /**
   * Enable automatic feeding of the next document after a scan.
   */
  AutoAdvance = 0x200,

  /**
   * Scan by using individual configuration settings for each child feeder item (WIA_CATEGORY_FEEDER_FRONT and WIA_CATEGORY_FEEDER_BACK). This flag cannot be set together with DUPLEX. A device that supports different scan settings for the front and back items should implement the optional ADF front and back items and it should support both DUPLEX and ADVANCED_DUPLEX.
   */
  AdvancedDuplex = 0x400
}
