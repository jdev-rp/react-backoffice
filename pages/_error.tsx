import {ReactElement} from "react";
import BlankLayout from "@/components/blank-layout";
import {Content} from "antd/lib/layout/layout";
import {Col, Row} from "antd";

function Error({ statusCode }) {
    return (
        <Content>
            <Row>
                <Col span={8} offset={8} style={{ marginTop: "20%", fontSize: 20, textAlign: "center" }}>
                    {statusCode
                        ? `An error ${statusCode} occurred on server`
                        : 'An error occurred on client'}
                </Col>
            </Row>
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