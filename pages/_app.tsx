// import '@/styles/globals.css'
import 'antd/dist/reset.css'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import DefaultLayout from "@/layouts/default-layout";
import {message} from "antd";
import Head from "next/head";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
      getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
      Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const [contextHolder] = message.useMessage();
    const getLayout = Component.getLayout;
    const components = <>
            <Head>
                <title>리액트-백오피스</title>
            </Head>
            <Component {...pageProps}/>
        </>;

      return getLayout
          ? getLayout(components)
          : <DefaultLayout>
              {components}
          </DefaultLayout>
}