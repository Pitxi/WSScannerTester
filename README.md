# WSScanTester

Aplicación web para testar el servicio de scaneo a través de WebSockets.

## Conexión al servicio de escaneo.

El servidor escucha en la dirección de loopback, siendo el puerto por defecto el *8001*, y espera recibir un comando y sus parámetros en un objeto JSON.

## Comandos y parámetros:

Por el momento el único comando admitido es **scan**, que muestra el diálogo de escaneo y manipulación de imagen encargado de conectar con los dispositivos de escaneo disponibles y hacer uso de los mismos para obtener las imágenes, que serán enviadas al cliente al aceptar el diálogo o desechadas si se cancela.

Estructura de un comando:
```text
{
  "command": <comando>,
  "parameters": <parámetros del comando>
}
```
