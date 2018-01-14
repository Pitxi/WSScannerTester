# WSScanTester

Aplicación web para testar el servicio de scaneo a través de WebSockets.

## Conexión al servicio de escaneo.

El servidor escucha en la dirección de loopback, siendo el puerto por defecto el *8001*, y espera recibir un comando y sus parámetros en un objeto JSON.

## Comandos y parámetros:

Por el momento el único comando admitido es **scan**, que muestra el diálogo de escaneo y manipulación de imagen encargado de conectar con los dispositivos de escaneo disponibles y hacer uso de los mismos para obtener las imágenes, que serán enviadas al cliente al aceptar el diálogo o desechadas si se cancela.

Ejemplo de objeto JSON para el comando scan:
```json
{
  "command"         : "scan",
  "format"          : "tiff",
  "dialogTitle"     : "Título del diálogo",
  "ppi"             : 200,
  "paper"           : "letter",
  "intent"          : "color",
  "ppiSelectable"   : true,
  "paperSelectable" : true,
  "intentSelectable": true
}
```
* **`command [string]`**: El comando que se enviará al servicio desde el cliente. El comando admitido hasta el momento es `scan`.
* **`format [string]`**: El formato de la imagen entregada al cliente. Si se omite se aumirá que el formato de imagen es `PNG`. El valor no distingue entre mayúsculas y minúsculas y debe ser uno de los siguientes:
	* **`'bmp'`**: Imagen BMP.
	* **`'gif'`**: Imagen GIF.
	* **`'png'`**: Imagen PNG.
	* **`'jpeg'`**: Imagen JPEG.
	* **`'tiff'`**: Imagen TIFF.
* **`dialogTitle [string]`**: El título que mostrará el diálogo de escaneo en su barra de título. Si se omite se usará el título por defecto.
* **`ppi [int]`**: La densidad en Píxeles Por Pulgada. Si se omite se empleará un valor por defecto de 200.
* **`paper [string]`**: El tipo de papel para el escaneo. El valor no distingue entre mayúsculas y minúsculas y debe ser uno de los siguientes:
	* **`'letter'`**: Tipo Letter o ANSI A (8.5" x 11").
	* **`'legal'`**:  Tipo Legal (8.5" x 14").
	* **`'statement'`**: Tipo Statement o Half Legal (5.5" x 8.5").
	* **`'tabloid'`**: Tipo Tabloid (11.0" x 17.0").
	* **`'ledger'`**: Tipo Ledger, o Tabloid volteado (17.0" x 11.0").
	* **`'a3'`**: Tipo ISO A3 (297mm x 420mm).
	* **`'a4'`**: Tipo ISO A4 (210mm x  297mm).
* **`intent [string]`**: El tipo de imagen que se desea obtener, que podrá ser a color, en escala de grises o en blanco y negro. Si se omite se asumirá que el tipo de imagen es **a color**.
	* `'color'`: Imagen a color.
	* `'grayscale'`: Imagen en escala de grises.
	* `'text'`: Imagen en blanco y negro, preferible para documentos de texto.
* **`ppiSelectable [boolean]`**: Si el cuadro numérico de la densidad de imagen (PPI) será o no editable por el usuario. El valor por defecto es `true`.
* **`paperSelectable [boolean]`**: Si el usuario puede o no usar la caja de selección para el tipo de papel. El valor por defecto es `true`.
* **`intentSelectable [boolean]`**: Si el usuario puede o no usar la caja de selección para el tipo de imagen. El valor por defecto es `true`.

