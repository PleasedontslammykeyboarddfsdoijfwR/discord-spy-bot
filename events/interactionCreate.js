const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		const embed = new EmbedBuilder()
			.setColor(0xFF0000)
			.setTitle('Error.')
			.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Noto_Emoji_Oreo_2757.svg/1200px-Noto_Emoji_Oreo_2757.svg.png')
			.setTimestamp()
			.setFooter({ text: 'Spy' });

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				embed.setDescription(`An error has occured while executing this command.\nCheck logs for more information.`);

				await interaction.followUp({ embeds: [embed], ephemeral: true });
			} else {
				embed.setDescription(`An error has occured while executing this command.\nCheck logs for more information.`);
				
				await interaction.reply({ embeds: [embed], ephemeral: true });
			}
		}
	},
};