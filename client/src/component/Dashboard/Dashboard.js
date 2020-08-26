import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { logout } from "../../_actions/auth";
import { Menu, Button, Divider } from "antd";
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  LogoutOutlined,
  MailOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

function Dash({ isAuthenticated, logout }) {
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div style={{ width: 255 }}>
        <Menu
          style={{ height: "100vh" }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={window.innerWidth < "760" ? true : false}
        >
          <div
            className="animated zoomIn"
            style={{
              height: "10vh",
              fontSize: "30px",
              textAlign: "center",
              marginTop: "15%",
              marginBottom: "-5%",
            }}
          >
            LOGO
          </div>
          <Menu.Item
            style={{
              height: "10vh",
              fontSize: "20px",
            }}
            className="animated slideInLeft "
            key="1"
            icon={
              <PieChartOutlined
                style={{
                  fontSize: "20px",
                }}
              />
            }
          >
            Buy
          </Menu.Item>

          <Menu.Item
            style={{
              height: "10vh",
              fontSize: "20px",
            }}
            className="animated fadeIn delay-1s"
            key="2"
            icon={
              <DesktopOutlined
                style={{
                  fontSize: "20px",
                }}
              />
            }
          >
            Sell
          </Menu.Item>
          <Menu.Item
            style={{
              height: "10vh",
              fontSize: "20px",
            }}
            className="animated fadeIn delay-2s"
            key="3"
            icon={
              <ContainerOutlined
                style={{
                  fontSize: "20px",
                }}
              />
            }
          >
            Loan
          </Menu.Item>
          <Divider
            style={{
              backgroundColor: "black",
              color: "white",
            }}
          />
          <Menu.Item
            style={{
              height: "10vh",
              fontSize: "30px",
              fontWeight: "bolder",
            }}
            className="animated fadeIn delay-3s"
            key="4"
            onClick={(e) => logout(e)}
            icon={
              <LogoutOutlined
                size="large"
                style={{
                  fontSize: "25px",
                }}
              />
            }
          >
            LOG OUT
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
}

Dash.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps,{logout})(Dash);
