import BlankLayout from "@/layouts/blank-layout";
import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement} from "react";
import {Result} from "antd";
import {Content} from "antd/lib/layout/layout";
import Link from "next/link";

const Page: NextPageWithLayout = () => {

    return (
        <main>
            <Result
                status="success"
                title="회원가입완료!"
                subTitle="회원가입 완료후 로그인 페이지 이동하시겠습니까?"
                extra={[
                    <Link href="/login">로그인 페이지 이동</Link>
                ]}
                style={{ marginTop: "15%" }}
            >

            </Result>
        </main>
    )
}

Page.getLayout = function getLayout(page: ReactElement) {
    return (
        <BlankLayout>{page}</BlankLayout>
    )
}

export default Page
