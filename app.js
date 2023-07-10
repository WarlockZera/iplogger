require('dotenv').config();
const http = require('http');
const axios = require('axios');

const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

function getPublicIPAddress() {
    return new Promise((resolve, reject) => {
      http.get('http://ipinfo.io/json', (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            const ipInfo = JSON.parse(data);
            resolve(ipInfo.ip);
          } catch (error) {
            reject(error);
          }
        });
      }).on('error', (error) => {
        reject(error);
      });
    });
  }
  
  function sendDiscordNotification(ipAddress) {
    axios.post(webhookUrl, { content: `Novo endereço IP público: ${ipAddress}` })
      .then(() => {
        console.log('Notificação enviada com sucesso.');
      })
      .catch((error) => {
        console.error('Erro ao enviar a notificação:', error);
      });
  }
  
  function onIPAddressChange(ipAddress) {
    console.log('Endereço IP público alterado:', ipAddress);
    sendDiscordNotification(ipAddress);
  }
  
  let lastIPAddress = '';
  
  function checkIPAddress() {
    getPublicIPAddress()
      .then((ipAddress) => {
        if (ipAddress !== lastIPAddress) {
          onIPAddressChange(ipAddress);
          lastIPAddress = ipAddress;
        }
      })
      .catch((error) => {
        console.error('Erro ao obter o endereço IP público:', error);
      });
  }
  
  checkIPAddress();
  
  setInterval(checkIPAddress, 5 * 60 * 1000);