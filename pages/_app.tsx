import '@/styles/globals.css'
import 'antd/dist/reset.css'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import DefaultLayout from "@/components/default-layout";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
      getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
      Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {

    const getLayout = Component.getLayout;
    const components = <Component {...pageProps} />;

      return getLayout
          ? getLayout(components)
          : <DefaultLayout>
              {components}
          </DefaultLayout>
}