"use strict";

const Crawler = require("crawler");
const cron = require("node-cron");
const fs = require("fs");

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
        console.log("Items em are: ", itemText);
        writeLog(itemText);
      } else {
        // 走这里证明有库存了
        writeLog("有库存了，快来抢购");
      }
    }
    done();
  }
});

function writeLog(logText) {
  const logPath = "./public/project.log";

  try {
    const content = fs.readFileSync(logPath);

    const logDate = new Date();
    const textBuffer = Buffer.concat([
      content,
      Buffer.from(`\n${logDate.toString()}\n${logText}`)
    ]);

    fs.writeFile(logPath, textBuffer, error => {
      if (error) {
        console.error(error);
      }
    });
  } catch (err) {
    console.error("Error is ", err);
  }
}

c.queue("https://www.baidu.com");

// 定时任务 每天9点和21点执行一次
cron.schedule("* * 9,21 * * *", () => {
  c.queue("https://bwh88.net/cart.php");
});
