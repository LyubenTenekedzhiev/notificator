import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Notification from "./../Notification/Notification";
import Logo from "../../assets/red-logo.png";
import AnimatedVisibility from "./../UI/AnimatedComponent";
import { setIngredients } from "../../store/actions/notifications";
import classes from "./NotificationList.module.css";

const API = [
  {
    id: 1321,
    type: "text",
    title: "Test notification",
    text: "Test text notification",
    expires: 4090,
  },
  {
    id: 4322,
    type: "bonus",
    title: "You win a bonus!",
    requirement: "Deposit $50 to win",
    expires: 310,
  },
  {
    id: 5453,
    type: "Promotion",
    image: "https://www.freeiconspng.com/uploads/leistungen-promotion-icon-png-0.png",
    title: "%30 off on sports betting",
    link: "https://www.google.com/",
  },
  {
    id: 5236,
    type: "text",
    title: "Test notification",
    text: "Test text notification",
    expires: 10,
  },
];

function NotificationList({ onSetNotifications, notifications }) {
  const [openNotifications, setOpenNotifications] = useState(true);
  useEffect(() => {
    onSetNotifications(API);
  }, [onSetNotifications]);

  let content;
  if (notifications) {
    content = notifications.map((notification) => {
      return <Notification key={notification.id} {...notification} />;
    });
  }

  const openNotificationsHandler = () => {
    setOpenNotifications(!openNotifications);
  };

  return (
    <div className={classes.NotificationList}>
      <div className={classes.NotificationList_LogoWhite} onClick={openNotificationsHandler}>
        <img className={classes.NotificationList_Logo} src={Logo} alt='dopamine logo' />
        <h6 className={classes.NotificationList_Badge}>{notifications.filter((msg) => msg.type !== "bonus").length}</h6>
      </div>
      <AnimatedVisibility visible={openNotifications} animationOut='fadeOutDown' animationIn='fadeInUp'>
        <div className={classes.NotificationList_Logos}>
          <div className={classes.NotificationList_LogoBlack}>
            <img className={classes.NotificationList_Logo} src={Logo} alt='dopamine logo' />
            <h3 className={classes.NotificationList_Count}>{notifications.length}</h3>
          </div>
        </div>
        {content}
      </AnimatedVisibility>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetNotifications: (data) => dispatch(setIngredients(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationList);
