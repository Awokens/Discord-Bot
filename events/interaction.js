module.exports = {
    name: 'interactionCreate',
    async run(interaction) {

        if (interaction.isCommand()) {
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

        switch (interaction.component.label) {
            case 'nerd':
            case 'Updates':

                const role = interaction.guild.roles
                    .cache.get(interaction.component.customId)

                if (!role) {
                    return interaction.reply({
                        content: "This role doesn't exist.",
                        ephemeral: true
                    })
                }

                const member = interaction.member


                if (member.roles.cache.has(role.id)) {
                    member.roles.remove(role).catch(console.error)
                } else {
                    member.roles.add(role).catch(console.error)
                }

                interaction.reply({
                    content: 'Updated your roles, double-check your roles if anything is missing or was suppose to be removed.',
                    ephemeral: true
                })


                break;
            default:
                interaction.reply({
                    content: 'This button either unknown or outdated.',
                    ephemeral: true
                })
        }

    }
}