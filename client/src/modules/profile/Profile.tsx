import React from "react";
import { Row, Col } from "antd";
import EditUserForm from "./EditUserForm";

const Profile: React.FC = () => {
  return (
    <Row>
      <Col span={12} style={{
        maxWidth: "50%",
      }}>
        <EditUserForm />
      </Col>

      <Col
        span={6}
        style={{
          margin: "0 auto",
        }}>
        {/* <Image
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        /> */}
      </Col>
    </Row>
  );
};

export default Profile;