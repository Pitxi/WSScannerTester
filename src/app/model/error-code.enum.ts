/**
 * WIA Error codes.
 */
export enum ErrorCode {
  /**
   * The device is busy. Close any apps that are using this device or wait for it to finish and then try again.
   */
  Busy = 0x80210006,

  /**
   * One or more of the device’s cover is open.
   */
  CoverOpen = 0x80210016,

  /**
   * Communication with the WIA device failed. Make sure that the device is powered on and connected to the PC. If
   * the problem persists, disconnect and reconnect the device.
   */
  DeviceCommunicationError = 0x8021000A,

  /**
   * The device is locked. Close any apps that are using this device or wait for it to finish and then try again.
   */
  DeviceLocked = 0x8021000D,

  /**
   * The device driver threw an exception.
   */
  ExceptionInDriver = 0x8021000E,

  /**
   * An unknown error has occurred with the WIA device.
   */
  GeneralError = 0x80210001,

  /**
   * There is an incorrect setting on the WIA device.
   */
  IncorrectHardwareSetting = 0x8021000C,

  /**
   * The device doesn't support this command.
   */
  InvalidCommand = 0x8021000B,

  /**
   * The response from the driver is invalid.
   */
  InvalidDriverResponse = 0x8021000F,

  /**
   * The WIA device was deleted. It's no longer available.
   */
  ItemDeleted = 0x80210009,

  /**
   * The scanner's lamp is off.
   */
  LampOff = 0x80210017,

  /**
   * A scan job was interrupted because an Imprinter/Endorser item reached the maximum valid value for
   * WIA_IPS_PRINTER_ENDORSER_COUNTER, and was reset to 0. This feature is available with Windows 8 and later
   * versions of Windows.
   */
  MaximumPrinterEndorserCounter = 0x80210021,

  /**
   * A scan error occurred because of a multiple page feed condition. This feature is available with Windows 8 and
   * later versions of Windows.
   */
  MultiFeed = 0x80210020,

  /**
   * The device is offline. Make sure the device is powered on and connected to the PC.
   */
  Offline = 0x80210005,

  /**
   * There are no documents in the document feeder.
   */
  PaperEmpty = 0x80210003,

  /**
   * Paper is jammed in the scanner's document feeder.
   */
  PaperJam = 0x80210002,

  /**
   * An unspecified problem occurred with the scanner's document feeder.
   */
  PaperProblem = 0x80210004,

  /**
   * The device is warming up.
   */
  WarmingUp = 0x80210007,

  /**
   * There is a problem with the WIA device. Make sure that the device is turned on, online, and any cables are
   * properly connected.
   */
  UserIntervention = 0x80210008,

  /**
   * No scanner device was found. Make sure the device is online, connected to the PC, and has the correct driver
   * installed on the PC.
   */
  NoDeviceAvailable = 0x80210015
}
