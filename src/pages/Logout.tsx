import React, { Component } from "react";
import { IonContent, IonPage } from "@ionic/react";
import Header from "../components/Header";

export default class Logout extends Component {
  componentDidMount() {
    this.logout();
  }

  logout = () => {
    window.localStorage.clear();
    window.location.href = "/login";
  };

  render() {
    return <></>;
  }
}
