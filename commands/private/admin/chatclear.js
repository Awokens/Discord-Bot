const { SlashCommandBuilder } = require('@discordjs/builders')
const { PermissionFlagsBits } = require('discord-api-types/v10')

const fetch = (...args) => import('node-fetch')
    .then(({
        default: fetch
    }) => fetch(...args))


module.exports = {

    data: new SlashCommandBuilder()
        .setName('chatclear')
        .setDescription('clear a set amount of messages')
        .addIntegerOption(option => option
            .setName('amount')
            .setDescription('the amount of messages to clear')
            .setMinValue(1)
            .setMaxValue(100)
            .setRequired(true))
        .addBooleanOption(option => option
            .setName('confirmation')
            .setDescription('To validate that you\'re sure to execute this command')
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async run(interaction) {

        const amount = interaction.options.getInteger('amount') 

        const messages = await interaction.channel.messages.fetch({ 
                limit: amount, cache: true 
            }).then((msgs) => {
                return msgs.filter((msg) => msg.deletable)
            }).catch((error) => {
                interaction.reply({
                    content: 'Failed to filter deletable messages',
                    ephemeral: true
                })
                throw new Error(error)
            })

        try {
            await messages.forEach(msg => msg.delete())            
        } catch (error) {
            interaction.reply({
                content: 'Failed to delete (filtered) messages',
                ephemeral: true
            })
            throw new Error(error)
        } finally {
            interaction.reply({
                content: `Successfully deleted ${messages.size} out of ${amount} messages`,
                ephemeral: true
            })
        }

        
        

        
    }
}