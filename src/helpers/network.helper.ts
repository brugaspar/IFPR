import os from "os"

export function getIPv4Address() {
  const nets = os.networkInterfaces()

  for (const key of Object.keys(nets)) {
    if (key === "Ethernet" || key === "Wi-Fi") {
      const ethernet = nets[key]

      if (!ethernet) {
        return
      }

      for (const net of ethernet) {
        if (net.family === "IPv4") {
          return net.address
        }
      }
    }
  }
}
