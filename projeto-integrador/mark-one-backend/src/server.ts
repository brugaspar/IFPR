import { app } from "./app"
import { getIPv4Address } from "./helpers/network.helper"
import appInfo from "../package.json"

const port = Number(process.env.PORT) || 3000

const ipAddress = getIPv4Address()

const serverAddress = ipAddress ? `${ipAddress}:${port}` : `${port} - Unavailable IP address`

app.listen(port, () => {
  console.log(`\n▶ Server running on ${serverAddress}`)
  console.log(`▶ Application name: ${appInfo.name}`)
  console.log(`▶ Application version: ${appInfo.version}\n`)
})
