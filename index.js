const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { execSync } = require('child_process');
const fs = require('fs');

// 1. Generar base de datos
console.log('⏳ Preparando base de datos (Prisma)...');
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Base de datos lista.');
} catch (error) {
  console.error('❌ Error generando Prisma:', error);
}

// 2. Construir la app si no existe .next
if (!fs.existsSync('.next')) {
  console.log('⏳ Carpeta .next no encontrada. Construyendo la web...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Construccion finalizada.');
  } catch (error) {
    console.error('❌ Error en el build:', error);
  }
}

// 3. Configurar Next.js
const dev = false;
const hostname = '0.0.0.0';
const port = parseInt(process.env.SERVER_PORT || process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// 4. Iniciar el servidor
app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error procesando la ruta', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  })
    .once('error', (err) => {
      console.error('Error fatal del servidor:', err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`🚀 Web funcionando perfectamente en el puerto ${port}`);
    });
});
