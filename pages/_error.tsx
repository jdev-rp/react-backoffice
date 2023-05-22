import {ReactElement} from "react";
import BlankLayout from "@/layouts/blank-layout";
import {Content} from "antd/lib/layout/layout";
import {Col, Result, Row} from "antd";
import Link from "next/link";

function Error({ statusCode }: { statusCode: number}) {
    return (
        <Content>
            <Result
                status="error"
                title={statusCode
                    ? `An error ${statusCode} occurred on server`
                    : 'An error occurred on client'}
                subTitle="로그인 페이지로 이동하시겠습니까?"
                extra={[
                    <Link key="login" href="/login">로그인 페이지 이동</Link>
                ]}
                style={{ marginTop: "15%" }}
            >

            </Result>
        </Content>
)
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

Error.getLayout = function getLayout(page: ReactElement) {
    return (
        <BlankLayout>{page}</BlankLayout>
    )
}

export default Error