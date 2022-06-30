
const glob = require('glob')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v10')

const path = require('path')
require('dotenv').config({
    path: path.resolve(__dirname, '../../.env')
})

const GUILDID = process.env.GUILDID
const CLIENTID = process.env.CLIENTID


module.exports = async (client) => {
    
    glob(path.resolve('./', './commands/**/*.js'), async (error, files) => {

        if (error) return console.error('Error occured during retrieval of command files.\n\n ', error)
        
        for (const file of files) {
            const cmd = require(path.resolve('./', file))
            client.commands.set(cmd.data.name, cmd)
        }

        const rest = new REST({ 
            version: '10' 
        }).setToken(process.env.TOKEN);

        const commands = Array.from(client.commands.values())
            .map((cmd) => cmd.data.toJSON())

        if (!commands) return console.error()
        
        console.log('Refreshing application (/) commands:', files); 
        await rest.put(Routes.applicationGuildCommands(CLIENTID, GUILDID), { 
            body: commands
        }).catch((error) => {
            return console.error('Failed to refresh application (/) commands', error)
        })
        console.info('Successfully reloaded application (/) commands.');
    })
}