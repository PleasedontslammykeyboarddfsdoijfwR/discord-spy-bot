import { Events, EmbedBuilder, WebhookClient } from 'discord.js';
import { eventReminder } from '../function.js';

const whUrl = process.env.WH_URL;
const guildId = process.env.GUILD_ID;

export const name = Events.ClientReady;
export const once = true;
export async function execute(client) {
	const webhookClient = new WebhookClient({ url: whUrl });

	console.log(`Ready! Logged in as ${client.user.tag}`);
	client.user.setPresence({ activities: [{ name: `on 47-AK's nerves` }], status: 'dnd' });

	const embed = new EmbedBuilder()
		.setTitle('Spy is now working.')
		.setColor(0x00FF00)
		.setDescription(`Websocket heartbeat: ${client.ws.ping} ms.`)
		.setThumbnail('https://gas-kvas.com/grafic/uploads/posts/2024-01/gas-kvas-com-p-znak-serdtsa-na-prozrachnom-fone-44.png')
		.setTimestamp()
		.setFooter({ text: 'Spy' });

	webhookClient.send({
		embeds: [embed],
	});
	try {
		const guild = await client.guilds.cache.get(guildId);
		await guild.channels.cache.each(async (channel) => {
			if (channel.type === 0) {
				const fetchedChannel = await channel.fetch(channel.id);
				await fetchedChannel.messages.fetch();
			}
		});
	} catch (error) {
		console.error(error);
	}

	while (true) {
		await eventReminder(client);

		await new Promise(resolve => setTimeout(resolve, 1_000));
	};
}