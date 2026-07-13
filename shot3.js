const puppeteer = require("puppeteer-core");

const EXEC_PATH =
  "/home/claude/.cache/puppeteer/chrome-headless-shell/linux-131.0.6778.204/chrome-headless-shell-linux64/chrome-headless-shell";

const targets = [
  { url: "http://localhost:4003/", name: "home", width: 1440, height: 1000 },
  { url: "http://localhost:4003/locais", name: "locais", width: 1440, height: 1000 },
  { url: "http://localhost:4003/locais/casa-jardim-do-recreio", name: "detalhe", width: 1440, height: 1300 },
  { url: "http://localhost:4003/anunciar", name: "anunciar", width: 1440, height: 1100 },
  { url: "http://localhost:4003/", name: "home-mobile", width: 390, height: 900 },
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: EXEC_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  for (const t of targets) {
    const page = await browser.newPage();
    await page.setViewport({ width: t.width, height: t.height });
    await page.goto(t.url, { waitUntil: "networkidle0", timeout: 30000 });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: `/home/claude/shots3/${t.name}.png`, fullPage: true });
    await page.close();
    console.log("captured", t.name);
  }

  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
