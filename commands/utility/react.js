import { SlashCommandBuilder, EmbedBuilder, Colors, MessageFlags } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('react')
    .setDescription('[DEV] React to a certain message. Please run the command in the same channel as the desired message.')
    .addStringOption(option => option
        .setName('message_id')
        .setDescription('ID of the message you want to react to.')
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName('reaction')
        .setDescription('The reaction itself.')
        .setRequired(true)
    );
export async function execute(interaction) {
    const ownerId = process.env.OWNER_ID;

    if (interaction.user.id === ownerId) {
        const id = interaction.options.getString('message_id', true);
        const reaction = interaction.options.getString('reaction', true);
        const message = interaction.channel.messages.cache.get(id);

        await message.react(reaction);
        await interaction.reply({ content: 'Reacted!', flags: MessageFlags.Ephemeral });
    } else {
        const mbed = new EmbedBuilder()
            .setColor(Colors.Red)
            .setTitle(`Error.`)
            .setDescription(`You are not authorized to run this command.`)
            .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Noto_Emoji_Oreo_2757.svg/1200px-Noto_Emoji_Oreo_2757.svg.png')
            .setTimestamp()
            .setFooter({ text: 'Spy' });

        await interaction.reply({ embeds: [mbed], flags: MessageFlags.Ephemeral });
    }
}