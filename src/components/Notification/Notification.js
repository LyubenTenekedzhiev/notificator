import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import AnimatedVisibility from "./../UI/AnimatedComponent";
import { filterNotifications } from "../../store/actions/notifications";
import classes from "./Notification.module.css";

function Notification({ title, expires, text, id, onFilterNotifications }) {
  const [minutes, setMinutes] = useState(Math.floor(Number(expires) / 60));
  const [seconds, setSeconds] = useState(Number(expires) % 60);
  const [visible, setVisible] = useState(true);
  const [almostExpired, setAlmostExpired] = useState(false);

  useEffect(() => {
    let interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
        setVisible(true);
      }
      if (minutes < 5) setAlmostExpired(true);

      if (seconds === 0) {
        if (minutes === 0) {
          setVisible(false);
          setTimeout(() => {
            onFilterNotifications(id);
          }, 500);
          clearInterval(interval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [minutes, seconds, id, onFilterNotifications]);

  return (
    <>
      {minutes === 0 && seconds === 0 ? (
        <AnimatedVisibility visible={visible} animationOut='fadeOutLeft' animationIn=''>
          <div className={classes.Notification}>
            <h3 className={classes.Notification_Title}>{title}</h3>
            <h3 className={classes.Notification_Description}>{text}</h3>
            {!expires ? (
              <div></div>
            ) : (
              <h3>
                {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
              </h3>
            )}
          </div>
        </AnimatedVisibility>
      ) : (
        <div className={classes.Notification}>
          <h3 className={classes.Notification_Title}>{title}</h3>
          <h3 className={classes.Notification_Description}>{text}</h3>
          {!expires ? (
            <div></div>
          ) : (
            <>
              {almostExpired ? (
                <h3 style={{ color: "red" }}>
                  {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
                </h3>
              ) : (
                <h3>
                  {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
                </h3>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFilterNotifications: (id) => dispatch(filterNotifications(id)),
  };
};

export default connect(null, mapDispatchToProps)(Notification);
