import React from "react";
import { Row, Col, Image } from "antd";
import EditUserForm from "./EditUserForm";

const Profile: React.FC = () => {
  return (
    <Row>
      <Col span={12}>
        <Image
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      </Col>
      <Col span={12}>
        <EditUserForm />
      </Col>
    </Row>
  );
};

export default Profile;