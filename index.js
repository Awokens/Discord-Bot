
const { GatewayIntentBits } = require('discord.js')
const Discord = require('discord.js')
const client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers
    ]
})   

process.on('uncaughtException', async (exception) => {
    console.error(exception)
})

client.commands = new Discord.Collection()

client.once('ready', async () => {
            
    client.user.setActivity("Technoblade videos", {
        type: 'WATCHING'
    })

    console.log('Bot is starting...')
    
    try {
        await require('./library/handlers/events')(client)
        await require('./library/handlers/slash')(client)
        console.log('Bot is ready.')
    } catch (error) {
        console.error('Bot failed to start', error)
        process.exit(1) // means failed
    }
})

client.login(process.env.TOKEN)        