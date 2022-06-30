
const Discord = require('discord.js')
const client = new Discord.Client({
    intents: [
        'GUILD_MEMBERS',
        'GUILD_MESSAGES',
        'GUILDS',
        'GUILD_VOICE_STATES'
    ]
})
client.commands = new Discord.Collection()

client.once('ready', async () => {

    client.user.setActivity("Don't Stop Me Now", {
        type: 'Watching'
    })

    console.log('Bot is starting...')
    try {
        await require('./library/handlers/events')(client)
        await require('./library/handlers/slash')(client)
    } catch (error) {
        console.error('Bot failed to start', error)
        process.exit(1)
    }
    console.log('Bot is ready.')
})
client.login(process.env.TOKEN)        