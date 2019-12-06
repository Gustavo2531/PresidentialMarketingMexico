### Usando docker (Preferentemente)
1. Clonar el repositorio ``git clone git@git.nearshoremx.com:catedra-computo/CCM/Mercadotecnia_Personal.git``
2. Una vez clonado el repositorio, descargar los datasets proporcionados en el siguiente link: https://drive.google.com/open?id=10NRddRcqjX8v9GgJvIS7J10WpeA8eIYY
3. Una vez descargados los datasets, incluirlos dentro de la carpeta datasets
4. Descargar los modelos pre-entrenados de la siguiente direccion: https://drive.google.com/open?id=186bp5fggU8PrWvKM8Ory-n0aX4oe146b
5. Una vez descargados los modelos pre-entrenados incluirlos dentro de la carpeta models
6. Utilizamos dotenv para el manejo de credenciales y datos sensibles.
Por ende se deben de crear dos archivos con el nombre de .env dentro de : *backend/Node* y de : */api*, se incluyen archivos .env.example que sirven para ver la estructura de este archivo.
Adicionalmente se pueden bajar los .envs que utilizamos de la siguiente liga: https://drive.google.com/open?id=1hfnYUDMdaW3vw5QRQ8qx44uftLBUOKhr pedimos a los responsables utilizar las credenciales con medida y cuidado, se desactivaran al finalizar el semestre.
6. Instalar docker: https://docs.docker.com/install/ seguir las instrucciones oficiales
7. Una vez instalado docker, instalar docker-compose (La mayoria de instaladores instalan docker junto con docker-compose) https://docs.docker.com/compose/
8. Al tener instalado docker y docker-compose asegurarse que el daemon de docker esta corriendo.
9. Abrir una nueva terminal y navegar a la ubicacion del proyecto: ```cd ProyectoFinal```
10. Ejecutar ```docker compose up```, esto instalara todas las dependencias del proyecto para usar el frontend y la REST API
11. Una vez terminada la instalacion y con el contenedor corriendo es posible ejecutar ```docker exec -it REST-api bash``` para usar la terminal integrada del contenedor.
12. Dado que nuestro backend se conecta con python para ejecutar el predictor de tweets es necesario instalar las dependencias para ejecutar los scripts de python.
13. Para eso ejecutamos el comando ```docker exec -it REST-api bash``` para acceder a la terminal interactiva del contenedor.
14. Una vez dentro de la terminal activamos el env de conda que se creo al crear el contenedor de docker: ```source activate CognitivaProyFinal```
15. Navegamos a ```cd /usr/src/app/backend/Python```
16. Ejecutamos ```pip install -r requirements.txt``` y esperamos a que se instalen todas las dependencias del proyecto.
17. Descargar los archivos del frontend de aqui: https://drive.google.com/open?id=1QVEeOzXatetdoiLZQ4nurh7FqHn5-fbz , descomprimirlos y meterlos dentro de: frontend/public
17. El proyecto esta listo para utilizarse! Navegar a http://localhost:3000 para visualizarlo
18. Nota impotante: no encontramos la manera de guardar los cambios y hacerlos automaticos por lo que la instalacion de las dependencias con pip tiene que ser hecha cada vez que se inicia el contenedor de docker.

### Instalacion Manual
Si la instalacion de docker no funciona, es posible instalar todas las dependencias de manera manual y correr cada componente por separado
1. Instalar node.js (Preferentemente version > 6.x) https://nodejs.org/es/
2. Instalar python y pip
3. Instalar Anaconda https://www.anaconda.com/download/
4. Seguir los pasos de arriba para descargar e incluir los datasets envs y modelos pre-entrenados
4. Instalar mongodb y configurar una base de datos (opcional, se creo una base de datos remota para la facilidad de uso)  https://www.mongodb.com/
5. Una vez instaladas las dependencias requeridas es momento de crear un environment de conda que contiene todas las librerias utilizadas en el proyecto
6. Creamos un nuevo environment con el siguiente comando: ```conda create --name CognitivaProyFinal python=3.5.4 -y```
7. Una vez creado el environment debemos activarlo: ```source activate CognitivaProyFinal```
8. Navegamos al directorio de Python que contiene las dependencias requeridas: ```cd ProyectoFinal/backend/Python```
9. Dentro del directorio ejecutamos ```pip install -r requirements.txt```
10. Tomamos nota de el ejecutable de python de este environment corriendo: ```conda env list```, queremos guardar el path de el environment "CognitviaProyFinal"
11. Dentro del .env en */api/* cambiamos el path para que coincida con el env utilizado, tomando en cuenta llegar hasta el ejecutable python3.5
12. La aplicacion esta lista para utilizarse y consiste de 3 partes: El frontend, la restapi y todos los scripts dentro de Python.
13. Si se desea hacer uso de los scripts en Python es necesario activar el environment creado y ejecutar cualquier script que se requiera.
14. Para correr la aplicacion abrir una nueva terminal y navegar a /api ```cd api``` y ejecutar ```npm install``` (Solo es necesario en la primera ejecucion)
15. Una vez instaladas las depdencias ejecutar ```node server.js```
16. Una vez corriendo el backend podemos ir a /frontend ```cd frontend``` y ejecutar ```npm install```
17. Descargar los archivos del frontend de aqui: https://drive.google.com/open?id=1QVEeOzXatetdoiLZQ4nurh7FqHn5-fbz , descomprimirlos y meterlos dentro de: frontend/public
17. Ejecutar ```npm start``` una vez instaladas las dependencias
18. Navegar a http://localhost:3000
19. Listo!
