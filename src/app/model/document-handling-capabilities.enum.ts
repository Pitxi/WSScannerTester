/**
 * The capabilities of a scanner.
 */
export enum DocumentHandlingCapabilities {
  /**
   * The scanner has a document feeder installed.
   */
  Feeder = 0x01,

  /**
   * The scanner has a flatbed platen.
   */
  Flatbed = 0x02,

  /**
   * The scanner has a duplexer.
   */
  Duplex = 0x04,

  /**
   * The scanner can detect a document on the flatbed platen.
   */
  DetectFlatbed = 0x08,

  /**
   * The scanner can detect a document in the feeder only by scanning.
   */
  DetectScan = 0x10,

  /**
   * The scanner can detect a document in the feeder.
   */
  DetectFeeder = 0x20,

  /**
   * The scanner can detect a duplex scan request from a user.
   */
  DetectDuplex = 0x40,

  /**
   * The scanner can detect when a document feeder is installed.
   */
  DetectFeederAvailable = 0x80,

  /**
   * The scanner can detect when a duplexer is installed.
   */
  DetectDuplexAvailable = 0x100,

  /**
   * The scanner has a transparency or film scanning adapter.
   */
  FilmTPA = 0x200,

  /**
   * The scanner can detect when the transparency or film scanning adapter is ready to scan.
   */
  DetectFilmTPA = 0x400,

  /**
   * The scanner is equipped with an internal storage device.
   */
  Storage = 0x800,

  /**
   * The scanner can detect when there is a document in the internal storage.
   */
  DetectStorage = 0x1000,

  /**
   * The device supports advanced duplex scan configuration, independently on each document size.
   */
  AdvancedDuplex = 0x2000,

  /**
   * The device supports auto-configured scanning.
   */
  AutoSource = 0x8000,

  /**
   * Imprinter.
   */
  Imprinter = 0x10000,

  /**
   * Endorser.
   */
  Endorser = 0x20000,

  /**
   * BarcodeReader.
   */
  BarcodeReader = 0x40000,

  /**
   * PatchCodeReader.
   */
  PatchCodeReader = 0x80000,

  /**
   * MICRReader.
   */
  MICRReader = 0x100000
}
