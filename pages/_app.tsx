import { AppPropsType } from "next/dist/next-server/lib/utils"
import "../styles/globals.scss"

function MyApp({ Component, pageProps }: AppPropsType) {
  return <Component {...pageProps} />
}

export default MyApp
