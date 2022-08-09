
const { InteractionType } = require('discord.js')
const glob = require('glob')
const config = require('../library/utils/config.json')

module.exports = {
    name: 'interactionCreate',
    async run(interaction) {


        if (interaction.type === InteractionType.ApplicationCommand) {
            const command = interaction.client
                .commands
                .get(interaction.commandName)

            if (!command) return

            try {
                await command.run(interaction)
            } catch (error) {
                throw new Error(error)
            }
            return
        }

        if (!interaction.isButton()) return


        const buttonId = interaction.customId

        const button = require(`./buttons/${buttonId}.js`)

        console.log(button)
        interaction.reply({
            content: 'test'
        })
        
        // glob(`./buttons/${buttonId}.js`, async (error, file) => {

        //     if (error) throw new Error('Error occured')

        //     console.log(file)
        // })
    }
}