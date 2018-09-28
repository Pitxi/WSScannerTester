# WSScanTester
Aplicación web para testar el servicio de acceso a escáneres a través de WebSockets.

La aplicación permite digitar la URL del servicio de acceso a escáner que se desea testar, así como obtener información de los dispocitivos escáneres WIA que se encuentran instalados en el servidor tras la conexión.

## Comandos y parámetros:
* **Listar dispositivos:**

	Sintaxis del comando:
	```json
	{ "command": "list-devices" }
	```
	Obtiene una lista de los dispositivos disponibles en el servidor y sus propiedades.
		Sintaxis de la respuesta:
	```json
	{
	  "type": "devices-list",
	  "data": [
	    {
	      "id": "{6BDD1FC6-810F-11D0-BEC7-08002BE2092F}\\0001",
	      "name": "ScanSnap S1100 #2",
	      "description": "ScanSnap S1100",
	      "capabilities": 17
	    }
	  ]
	}
	```

	* **data**: Lista con la información de cada dispositivo disponible en el servidor.
		* `id`: Identificador único del escáner.
		* `name`: Nombre del escáner.
		* `description`: Descruipción del escáner,
		* `capabilities`: Flag con las capacidades del escáner. Su valor proviene de la siguiente enumeración:
			```typescript
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
			```
	* **Mostrar diálogo de escaneo:**

		Sintaxis del comando:
		```json
		{
		  "command": "scan-dialog",
		  "parameters": {
		    "format": "{B96B3CAB-0728-11D3-9D7B-0000F81EF32E}",
		    "dialogTitle": "Escaneando documentos...",
		    "ppi": 200,
		    "paper": 1,
		    "intent": 1,
		    "ppiSelectable": true,
		    "paperSelectable": true,
		    "intentSelectable": true
		  }
		}
		```

		Muestra el diálogo de escaneo de la utilidad y le proporciona los parámetros necesarios.

		* **Parámetros:**
			* `format`: El formato de las imágenes escaneadas. Su valor debe ser uno de los existentes en la siguiente enumeración:
				```typescript
				/**
				 * WIA Image format IDs.
				 */
				export enum ImageFormat {
				  BMP  = '{B96B3CAB-0728-11D3-9D7B-0000F81EF32E}',
				  PNG  = '{B96B3CAF-0728-11D3-9D7B-0000F81EF32E}',
				  GIF  = '{B96B3CB0-0728-11D3-9D7B-0000F81EF32E}',
				  JPEG = '{B96B3CAE-0728-11D3-9D7B-0000F81EF32E}',
				  TIFF = '{B96B3CB1-0728-11D3-9D7B-0000F81EF32E}'
				}
				```
			* `dialogTitle`: El título que mostrará el diálogo de escaneo de la utilidad en la barra de título.
			* `ppi`: La resolución en Puntos Por Pulgada de las imágenes escaneadas.
			* `paper`: Un valor entero que debe ser uno de los existentes en la siguiente enumeración, exceptuando los valores correspondientes a `Auto` y `CustomBase`:
				```typescript
				/**
				* WIA Page size values.
				*/
				export enum Page {
				  A4           = 0,     // 8267 x 11692
				  Letter       = 1,     // 8500 x 11000
				  Custom       = 2,     // Current extent settings
				  USLegal      = 3,     // 8500 x 14000
				  USLetter     = 1,     // 8500 x 11000
				  USLedger     = 4,     // 11000 x 17000
				  USStatement  = 5,     // 5500 x 8500
				  BusinessCard = 6,     // 3543 x 2165
				  ISO_A0       = 7,     // 33110 x 46811
				  ISO_A1       = 8,     // 23385 x 33110
				  ISO_A2       = 9,     // 16535 x 23385
				  ISO_A3       = 10,    // 11692 x 16535
				  ISO_A4       = 0,     // 8267 x 11692
				  ISO_A5       = 11,    // 5826 x 8267
				  ISO_A6       = 12,    // 4133 x 5826
				  ISO_A7       = 13,    // 2913 x 4133
				  ISO_A8       = 14,    // 2047 x 2913
				  ISO_A9       = 15,    // 1456 x 2047
				  ISO_A10      = 16,    // 1023 x 1456
				  ISO_B0       = 17,    // 39370 x 55669
				  ISO_B1       = 18,    // 27834 x 39370
				  ISO_B2       = 19,    // 19685 x 27834
				  ISO_B3       = 20,    // 13897 x 19685
				  ISO_B4       = 21,    // 9842 x 13897
				  ISO_B5       = 22,    // 6929 x 9842
				  ISO_B6       = 23,    // 4921 x 6929
				  ISO_B7       = 24,    // 3464 x 4921
				  ISO_B8       = 25,    // 2440 x 3464
				  ISO_B9       = 26,    // 1732 x 2440
				  ISO_B10      = 27,    // 1220 x 1732
				  ISO_C0       = 28,    // 36102 x 51062
				  ISO_C1       = 29,    // 25511 x 36102
				  ISO_C2       = 30,    // 18031 x 25511
				  ISO_C3       = 31,    // 12755 x 18031
				  ISO_C4       = 32,    // 9015 x 12755 (unfolded)
				  ISO_C5       = 33,    // 6377 x 9015 (folded once)
				  ISO_C6       = 34,    // 4488 x 6377 (folded twice)
				  ISO_C7       = 35,    // 3188 x 4488
				  ISO_C8       = 36,    // 2244 x 3188
				  ISO_C9       = 37,    // 1574 x 2244
				  ISO_C10      = 38,    // 1102 x 1574
				  JIS_B0       = 39,    // 40551 x 57322
				  JIS_B1       = 40,    // 28661 x 40551
				  JIS_B2       = 41,    // 20275 x 28661
				  JIS_B3       = 42,    // 14330 x 20275
				  JIS_B4       = 43,    // 10118 x 14330
				  JIS_B5       = 44,    // 7165 x 10118
				  JIS_B6       = 45,    // 5039 x 7165
				  JIS_B7       = 46,    // 3582 x 5039
				  JIS_B8       = 47,    // 2519 x 3582
				  JIS_B9       = 48,    // 1771 x 2519
				  JIS_B10      = 49,    // 1259 x 1771
				  JIS_2A       = 50,    // 46811 x 66220
				  JIS_4A       = 51,    // 66220 x 93622
				  DIN_2B       = 52,    // 55669 x 78740
				  DIN_4B       = 53,    // 78740 x 111338
				  Auto         = 100,   // Driver automatically detects page size.
				  CustomBase   = 0x8000 // Page size already known to driver and application.
				}
				```
			* `Intent`: El tipo de imagen que se desea obtener. Su valor debe ser uno de los existentes en la siguiente enumeración:
				```typescript
				/**
				 * Specify what type of data the image is meant to represent.
				 */
				export enum ImageIntent {
				  Unspecified = 0,
				  Color = 1,
				  Grayscale = 2,
				  Text = 4
				}
				```
			* `ppiSelectable`: Indica si al usuario se le permitirá cambiar la resolución de las imágenes escaneadas en el diálogo.
			* `paperSelectable`: Indica si al usuario se le permitirá cambiar el tamaño del papel en el diálogo.
			* `intentSelectable`: Indica si al usuario se le permitirá cambiar el tipo de imagen en el diálogo.
	* **Escanear documentos:**

		Sintaxis del comando:
		```json
		{
		  "command": "scan",
		    "parameters": {
		     "format": "{B96B3CAB-0728-11D3-9D7B-0000F81EF32E}",
		     "dialogTitle": "Escaneando documentos...",
		     "ppi": 200,
		     "paper": 1,
		     "intent": 1,
		     "selectedDevice": "{6BDD1FC6-810F-11D0-BEC7-08002BE2092F}\\0001",
		     "documentSource": 5
		  }
		}
		```
		Indica al dispositivo que inicie el escaneo de documentos con los parámetros indicados. El servicio enviará una respuesta por cada imagen escaneada.
		* **Parameters:**
			* `format`: Igual que en el comando `scan-dialog`.
			* `dialogTilte`: Igual que en el comando `scan-dialog`.
			* `ppi`: Igual que en el comando `scan-dialog`.
			* `paper`: Igual que en el comando `scan-dialog`.
			* `intent`: Igual que en el comando `scan-dialog`.
			* `selectedDevice`: El `id` del dispositivo que se usará para escanear los documentos, tal y como lo devuelve el comando `list-devices`.
			* `documentSource`: El origen y modo de obtención de los documentos en el dispositivo. Debe ser un valor válido conforme a las capacidades del dispositivo obtenidas con el comando `list-devices`, y debe ser una combinación de los flags contenidos en la siguiente enumeración:
				```typescript
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
				```
		Sintaxis de la respuesta:
		```json
		{
		  "type": "image",
		  "data": "Cadena con la imagen codificada en base 64."
		}
		```
		Se recibirá una respuesta por cada imagen escaneada, con la imagen en el formato especificado codificada como una cadena en base 64.
	
	Errores:**
	
	Sintaxis de las respuestas de error:
	```json
	{
	  "type": "error",
	  "data":
	  {
	    "code": -2145320957,
	    "message": "There are no documents in the document feeder."
	  }
	}
	```
	Cada vez que el dispositivo se quede sin documentos que escanear enviará el mensaje de ejemplo mostrado arriba.
	* `code`: El código del error. Será 0 o alguno de los códigos de error de dispositivo WIA existentes en la siguiente enumeración:
		```typescript
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
		```
	* `message`: Cadena con el mensaje de error correspondiente.
