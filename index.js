const Discord = require('discord.js');
const client = new Discord.Client();
const Librus = require("librus-api");
let lclient = new Librus();
require('dotenv').config()
client.login(process.env.BOT_TOKEN);

setInterval(() => {
    
    lclient.authorize(process.env.LIBRUS_LOGIN,process.env.LIBRUS_PASSWORD).then(()=>{
        console.log('logged')
    
        client.on('ready', () => {
            console.log(`Logged in as ${client.user.tag}!`);
          });
          
          client.on('message', msg => {
            if (msg.content === '!zad') {
    
                lclient.homework.listHomework().then(data => {
                    data.forEach(el => {
                        msg.reply(`Od: **${el['user']}** Treść: ${el['title']}. Deadline: **${el['to']}**, Link do podglądu: https://synergia.librus.pl/moje_zadania/podglad/${el['id']}`)
                    });
                });
            }
            else if (msg.content === '!oglo'){
                lclient.inbox.listAnnouncements().then(data => {
                    msg.reply(data[0])
                });
            }
            else if (msg.content === '!wiad'){
                lclient.inbox.listInbox(5).then(data => {
                    for (let i = 0; i<5; i++)
                        msg.reply(`Od: **${data[i]['user']}**, Temat: **${data[i]['title']}**`)
                });
            }
            else if (msg.content === '!koronahelp'){
                msg.reply("**Dostepne komendy**");
                msg.reply("**!wiad** - wyświetl 5 ostatnich wiadomości");
                msg.reply("**!oglo** - wyświetl ogłoszenia");
                msg.reply("**!zad** - wyświetl zadania");
            }
          });
    })
}, 600000);
