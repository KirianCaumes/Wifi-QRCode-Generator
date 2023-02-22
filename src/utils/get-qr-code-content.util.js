/**
 * Clean
 * @param {string} input Input
 * @returns {string} Result
 */
function clean(input) {
    return input
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/;/g, '\\;')
        .replace(/,/g, '\\,')
        .replace(/:/g, '\\:')
}

/**
 * Get qr code content
 * @param {DataType} data data
 * @returns {string} String
 */
export default function getQrCodeContent(data) {
    let value = 'WIFI:'

    if (data.ssid)
        value += `S:${clean(data.ssid)};`

    if (data.password)
        value += `P:${clean(data.password)};`

    if (data.isHidden)
        value += `H:${data.isHidden === true};`

    if (data.encryption && data.encryption !== 'None')
        value += `T:${data.encryption};`

    return value
}
