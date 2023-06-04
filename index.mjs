import Discord from 'discord.js'
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

async function test123() {
    console.log('fetching')
    const html = await (await fetch('https://soundcloud.com/nimda_uk/nimda-not-bothered')).text();
    console.log(html)
    const dom = new JSDOM(html);
    console.log(dom)
    const doc = dom.window.document;
    console.log(doc)
    const cfg = eval([...doc.querySelectorAll('script')].find(x => /^\s*window\.__sc_hydration/.test(x.innerText)).innerText.replace(/^\s*window\.__sc_hydration\s*=\s*/, ''));
    console.log(cfg)
    const hdrTbl = cfg.find(x => x.hydratable == 'sound');
    console.log(hdrTbl)
    const cds = hdrTbl.data.media.transcodings;
    console.log(cds)
    const cd = cds.find(x => x.format.protocol == 'hls' && x.format.mime_type == 'audio/mpeg');
    console.log(cd)
    const json = await (await fetch(cd.url + '?client_id=LBCcHmRB8XSStWL6wKH2HPACspQlXg2P')).json();
    console.log(json)
    return json.url;
}

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildMessageReactions,
        Discord.GatewayIntentBits.DirectMessages,
        Discord.GatewayIntentBits.DirectMessageReactions,
        Discord.GatewayIntentBits.DirectMessageTyping,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildVoiceStates,
    ],
    partials: [
        Discord.Partials.Channel,
        Discord.Partials.GuildMember,
        Discord.Partials.Message,
        Discord.Partials.User,
    ],
})

client.on('ready', async () => {
    const guildId = '847486242010693652'
    const guild = await client.guilds.fetch(guildId)
    guild.commands.create({
        name: 'greet',
        description: 'Greet a user',
    })
    console.log('Bot is ready')
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return

    const { commandName, options } = interaction

    try {
        if (commandName === 'greet') {
            // Handle greet command
            interaction.deferReply()
            interaction.reply(`Hello, ${await test123()}!`)
        }
    }
    catch {
        interaction.reply(`Command Failed`)
    }
})

client.on('message', (message) => {
    // Check if the message author is a bot
    if (message.author.bot) return

    // Check if the message starts with a specific command prefix
    if (message.content.startsWith('!hello')) {
        // Reply to the user with a greeting
        message.channel.send('Hello, there!')
    } else if (message.content.startsWith('!ping')) {
        // Reply to the user with a "Pong!" message and the bot's latency
        message.channel.send(`Pong! Latency: ${client.ws.ping}ms`)
    }
})

// Replace 'YOUR_DISCORD_BOT_TOKEN' with your actual bot token
client.login(
    'NDgwMTIwNzQ4NzA3NTQ1MDg4.GIJucG.I9AB6fMQ4PSb-4MW-Q4Yyre6Dr0RuimySEh_rY'
)
