
const glob = require('glob')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v10')

const path = require('path')


const GUILDID = process.env.GUILDID
const CLIENTID = process.env.CLIENTID


module.exports = async (client) => {
    
    glob(path.resolve('./', './commands/**/*.js'), async (error, files) => {

        if (error) return console.error('Error occured during retrieval of command files.\n\n ', error)
        
        for (const file of files) {
            const cmd = require(path.resolve('./', file))
            if (!cmd.data) continue
            client.commands.set(cmd.data.name, cmd)
        }

        const rest = new REST({ 
            version: '10' 
        }).setToken(process.env.TOKEN);

        const commands = Array.from(client.commands.values())
            .map((cmd) => cmd.data.toJSON())

        if (!commands) return console.error()

        console.log('Refreshing application (/) commands', Array.from(client.commands.keys()));
        await rest.put(Routes.applicationGuildCommands(CLIENTID, GUILDID), { 
            body: commands
        }).catch((error) => {
            return console.error('Failed to refresh application (/) commands', error)
        })
        console.info('Successfully reloaded application (/) commands.');
    })
}