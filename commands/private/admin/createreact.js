const { SlashCommandBuilder } = require('@discordjs/builders')
const { PermissionFlagsBits } = require('discord-api-types/v10')
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../../../library/utils/config.json')

module.exports = {

    data: new SlashCommandBuilder()
        .setName('createreact')
        .setDescription('Creates a post with buttons that assign a role on click')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async run(interaction) {


        const channel = interaction.channel

        if (!channel) {
            return interaction.reply({
                content: 'Cannot find reaction channel.',
                ephemeral: true
            })
        }

        const roles = config.roles

        if (!roles || roles.size < 1) {
            return interaction.reply({
                content: 'There are no roles, therefore no point in making this.',
                ephemeral: true
            })
        }
        
        const row = new ActionRowBuilder()

        for (const id of roles) {

            let role = interaction.guild.roles.cache.get(id)
            if (!role) {
                return interaction.reply({
                    content: 'Failed to create reaction message.',
                    ephemeral: true
                })
            }
            row.addComponents(new ButtonBuilder()
                .setCustomId()
                .setLabel(role.name)
                .setStyle(ButtonStyle.Primary))            
        }

        await channel.send({
            content: 'Click a button below to receive or remove a role.',
            components: [row]
        })

        interaction.reply({
            content: 'Completed your role react post.',
            ephemeral: true
        })

    }
}