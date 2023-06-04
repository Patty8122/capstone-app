import '../styles/global.css';
import 'bootstrap/dist/css/bootstrap.css'
import { SessionProvider } from "next-auth/react"


export default function App({ Component, pageProps }) {

  return <>
    <SessionProvider session={pageProps.session}>
    <Component {...pageProps} />
    </SessionProvider>
  </>
}
