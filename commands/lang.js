'use strict';

const Discord = require('discord.js');
const db = require('../database/db.js');

exports.info = {
    command: 'lang',
    help: {
        command: 'lang <pl/en>',
        description: 'changes the bot language',
        category: 'mod'
    },
    show: false
};

exports.function = async (parameters) => {
    const args = parameters.args;
    const message = parameters.message;
    const prefix = parameters.prefix;

    let guildID;
    if(!message.guild) {
        guildID = '0';
    } else {
        guildID = message.guild.id;
    }
    await db.check(guildID);

    const lang = args[1];

    if(!message.guild) {
        await message.reply(await db.getTrans(guildID, 'onlyText'));
    } else {
        if (!message.member.hasPermission('MANAGE_GUILD')) {
            await message.reply(await db.getTrans(guildID, 'perms'));
        } else {
            if (lang == 'pl' || lang == 'en') {
                await db.update('guilds', guildID, 'lang', lang);
                await message.reply('👌');
            } else {
                await message.reply(`${await db.getTrans(guildID, 'usage')} \`${prefix}lang <pl/en>\`!`);
            }
        }
    }
};