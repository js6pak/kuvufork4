'use strict';

const Discord = require('discord.js');

exports.info = {
    command: 'bot',
    help: {
        command: 'bot',
        description: 'zwraca informacje o bocie',
        category: 'gen'
    }
};

exports.function = async (parameters) => {
    const config = parameters.config;
    const message = parameters.message;
    const lang = parameters.lang;    
    const db = parameters.db;
    const version = parameters.packageInfo.version;

    const bot = message.client;

    const embed = new Discord.RichEmbed();
    embed.setAuthor(await db.get('trans', lang, 'bot_title'), bot.user.displayAvatarURL);
    embed.setColor(config.colors.default);
    embed.setThumbnail(bot.user.displayAvatarURL);
    embed.addField(await db.get('trans', lang, 'bot_name'), bot.user.tag, true);
    embed.addField(await db.get('trans', lang, 'bot_version'), `v${version}`, true);
    embed.addField(await db.get('trans', lang, 'bot_servers'), bot.guilds.size, true);
    embed.addField(await db.get('trans', lang, 'bot_channels'), bot.channels.size, true);
    embed.addField('Github', `[${await db.get('trans', lang, 'check')}](https://github.com/kuvuBot/kuvuBot4)`, true);
    embed.addField(await db.get('trans', lang, 'bot_site'), `[${await db.get('trans', lang, 'check')}](https://bot.kuvus.pl/)`, true);
    embed.addField('Support', `[${await db.get('trans', lang, 'check')}](https://discord.gg/7jwyFdn)`, true);

    const guildsNames = [];

    for(const guild of bot.guilds.array()) {
        guildsNames.push(guild.name);
    }

    embed.addField(await db.get('trans', lang, 'bot_srvs'), guildsNames.slice(0, 9).join(', ') + (guildsNames.length > 10 ? `, ${guildsNames.length - 10} ${await db.get('trans', lang, 'bot_other')}` : ''), true);
    embed.setFooter(`kuvuBot ${version}`);
    embed.setTimestamp();

    await message.channel.send(embed);
};
