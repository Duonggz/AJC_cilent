import { QRCodeCanvas } from 'qrcode.react'

const QrCodeBox = () => {
  let url = location.href
  if (url.endsWith('/')) {
    url = url.slice(0, -1)
  }
  return (
    <div>
      <QRCodeCanvas
        value={`${url}/queue`}
        size={240}
        bgColor={'#ffffff'}
        fgColor={'#000000'}
        level={'L'}
      />
    </div>
  )
}

export default QrCodeBox
