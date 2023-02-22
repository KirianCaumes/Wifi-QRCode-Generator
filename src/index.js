import QRCode from 'qrcode'
import { chromium as playwright } from 'playwright-chromium'
import { readFile } from 'fs/promises'
import ask from './utils/ask.util'
import getQrCodeContent from './utils/get-qr-code-content.util'

/** @type {DataType} */
const data = {
    ssid: (await ask('SSID: ') || ''),
    password: (await ask('Password: ') || ''),
    isHidden: (await ask('Is hidden (true/false) [default: false]: ') || false),
    encryption: (await ask('Encryption (WPA/WEP/None) [default: WPA]: ') || 'WPA'),
}

try {
    const value = getQrCodeContent(data)
    const qrCode = await QRCode.toDataURL(value, { width: 500 })

    const html = (await readFile('./src/templates/main.template.html'))
        .toString()
        .replace('{{qrCode}}', qrCode)
        .replace('{{ssid}}', data.ssid)
        .replace('{{password}}', data.password)

    const browser = await playwright.launch()
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.setViewportSize({ width: 500, height: 500 })
    await page.goto('about:blank')
    await page.setContent(html)
    await page.screenshot({ path: `./${data.ssid?.replace(/[/|\\:*?"<>]/g, '_') || 'result'}.png`, fullPage: true })
    await browser.close()

    // eslint-disable-next-line no-console
    console.log('Done')
} catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
}
