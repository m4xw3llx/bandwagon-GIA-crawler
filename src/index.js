"use strict";

// 引用
const Crawler = require("crawler");
const cron = require("node-cron");
const fs = require("fs");
const axios = require("axios");

// 静态变量
const LOG_PATH = "./public/project.log";
const WEBHOOK_URL = "https://discordapp.com/api/webhooks/";
const WEBHOOK_ID = "687255557689966621";
const WEBHOOK_TOKEN =
  "3Vll1V_ZBnfKCZuuibaFK4FFaEvopESLug1adww0_i9FsOAzBmyI_R14RL-3JrkDZJ2-";

// 初始化爬虫
const c = new Crawler({
  maxConnections: 10,
  callback: function(error, res, done) {
    if (error) {
      writeLog("Web crawler run error");
    } else {
      const $ = res.$;

      const outStockItems = $(
        "td:contains('SPECIAL 10G KVM PROMO V5 - LOS ANGELES - CN2 GIA LIMITED EDITION')"
      ).has("em");

      if (outStockItems.length > 0) {
        // 写日志
        const itemText = outStockItems.text();
        // console.log("Items em are: ", itemText);
        writeLog(itemText);
        sendMessage(itemText);
      } else {
        // 走这里证明有库存了

        const notiMessage = "搬瓦工终于有货了，快来抢啊！！！";

        writeLog(notiMessage);
        sendMessage(notiMessage);
      }
    }
    done();
  }
});

/**
 * 写日志
 *
 * @param {*} logText
 */
function writeLog(logText) {
  try {
    const content = fs.readFileSync(LOG_PATH);

    const logDate = new Date();
    const textBuffer = Buffer.concat([
      content,
      Buffer.from(`\n${logDate.toString()}\n${logText}`)
    ]);

    fs.writeFile(LOG_PATH, textBuffer, error => {
      if (error) {
        console.error(error);
      }
    });
  } catch (err) {
    console.error("Error is ", err);
  }
}

/**
 * 发送消息
 *
 */
function sendMessage(messageContent) {
  axios({
    method: "POST",
    url: `${WEBHOOK_URL}${WEBHOOK_ID}/${WEBHOOK_TOKEN}`,
    data: {
      content: messageContent
    },
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      console.log("sendMessage -> res", res);
    })
    .catch(err => {
      console.log("sendMessage -> err", err);
    });
}

// c.queue("https://www.baidu.com");

// 定时任务 每天9点和21点执行一次
cron.schedule("* * 9,15,21 * * *", () => {
  c.queue("https://bwh88.net/cart.php");
});
