"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var telegraf_1 = require("telegraf");
// import { Update } from 'typegram';
require('dotenv').config();
var bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN);
bot.start(function (ctx) {
    ctx.reply('Hello ' + ctx.from.first_name + '!');
});
bot.help(function (ctx) {
    ctx.reply('Send /start to receive a greeting');
    ctx.reply('Send /keyboard to receive a message with a keyboard');
    ctx.reply('Send /quit to stop the bot');
});
bot.command('quit', function (ctx) {
    // Explicit usage
    ctx.telegram.leaveChat(ctx.message.chat.id);
    // Context shortcut
    ctx.leaveChat();
});
bot.command('keyboard', function (ctx) {
    ctx.reply('Keyboard', telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.button.callback('First option', 'first'),
        telegraf_1.Markup.button.callback('Second option', 'second'),
    ]));
});
bot.on('text', function (ctx) {
    ctx.reply('You choose the ' +
        (ctx.message.text === 'first' ? 'First' : 'Second') +
        ' Option!');
});
bot.launch();
process.once('SIGINT', function () { return bot.stop('SIGINT'); });
process.once('SIGTERM', function () { return bot.stop('SIGTERM'); });
