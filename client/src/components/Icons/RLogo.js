import React from 'react';
import logoImg from "../../assets/navbarMenus/logo.png";
import s from "./Icon.module.scss";

class RLogo extends React.Component {

  render() {
    return (
      <img src={logoImg} alt="Real-Estate" className={s.logoImg} />
    );
  }
}

export default RLogo;
