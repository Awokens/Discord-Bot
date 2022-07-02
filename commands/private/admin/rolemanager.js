const { SlashCommandBuilder } = require('@discordjs/builders')
const { PermissionFlagsBits } = require('discord-api-types/v10')

module.exports = {

    data: new SlashCommandBuilder()
        .setName('rolemanage')
        .setDescription('manage roles of users')
        .addUserOption(option => option
            .setName('user')
            .setDescription('The user to manage roles')
            .setRequired(true))
        .addRoleOption(option => option
            .setName('role')
            .setDescription('The role to modify with the user')
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
    async run(interaction) {

        const user = interaction.options.getUser('user')
        const member = interaction.guild.members.cache.get(user.id)

        if (!member) {
            return interaction.reply({
                content: 'Failed to recieve info of user.',
                ephemeral: true
            })
        }
        
        if (!member.manageable) {
            return interaction.reply({
                content: `Unable to modify roles of ${user}`,
                ephemeral: true
            })
        }

        const role = interaction.options.getRole('role')
        
        if (member.roles.cache.has(role.id)) {
            await member.roles.remove(role).catch(console.error)
        } else {
            await member.roles.add(role).catch(console.error)
        }
        
        interaction.reply({
            content: `Modified ${user}'s roles`,
            ephemeral: true
        })

        
    }
}