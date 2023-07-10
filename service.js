const Service = require('node-windows').Service;
const path = require('path');

const svc = new Service({
  name: 'iplogger',
  description: 'papaip by warlock',
  script: path.join(__dirname, 'app.js'),
});

function installService() {
  svc.on('install', () => {
    console.log('Serviço instalado com sucesso.');
    console.log('Iniciando o serviço...');
    svc.start();
  });

  svc.install();
}

function uninstallService() {
  svc.on('uninstall', () => {
    console.log('Serviço desinstalado com sucesso.');
  });

  svc.uninstall();
}

function startService() {
  svc.start();
  console.log('Serviço iniciado.');
}

function stopService() {
  svc.stop();
  console.log('Serviço parado.');
}

const command = process.argv[2];

switch (command) {
  case 'install':
    installService();
    break;
  case 'uninstall':
    uninstallService();
    break;
  case 'start':
    startService();
    break;
  case 'stop':
    stopService();
    break;
  default:
    console.log('Comando inválido. Use "install", "uninstall", "start" ou "stop".');
}