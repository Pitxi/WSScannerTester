/**
 * The current state of a scanner's installed flatbed, document feeder, or duplexer.
 */
export enum DocumentHandlingStatus {

  /**
   * The document feeder has a page loaded and is ready for use.
   */
  FeederReady = 0x01,

  /**
   * The flatbed is ready for use.
   */
  FlatbedReady = 0x02,

  /**
   * The duplexer is enabled and ready to use.
   */
  DuplexReady = 0x04,

  /**
   * The flatbed cover is up.
   */
  FlatbedCoverUp = 0x08,

  /**
   * The paper path is covered and is preventing proper operation.
   */
  PathCoverUp = 0x10,

  /**
   * A document is stuck in the document feeder.
   */
  PaperJam = 0x20,

  /**
   * A transparency adapter is installed and ready for use.
   */
  FilmTPAReady = 0x40,

  /**
   * A storage device is installed and ready for use.
   */
  StorageReady = 0x80,

  /**
   * The storage is full; no upload operations are possible.
   */
  StorageFull = 0x100,

  /**
   * A multiple feed occurred; this type of feed usually occurs with a PAPER_JAM value.
   */
  MultipleFeeder = 0x200,

  /**
   * There is an error that requires user intervention on the scanner.
   */
  DeviceAttention = 0x400,

  /**
   * The scanner has a problem with the lamp and is not ready.
   */
  LampError = 0x800,

  /**
   * The imprinter capabilities of an imprinter/endorser are enabled and ready for use.
   */
  ImprinterReady = 0x1000,

  /**
   * The endorser capabilities of an imprinter/endorser are enabled and ready for use.
   */
  EndorserReady = 0x2000,

  /**
   * The barcode reader is enabled and ready for use.
   */
  BarcodeReaderReady = 0x4000,

  /**
   * The patch code reader is enabled and ready for use.
   */
  PatchCodeReaderReady = 0x8000,

  /**
   * The MICR reader is enabled and ready for use.
   */
  MICRReaderReady = 0x10000
}
