import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";
import { removeAlert } from "../../actions/alert";

const Alert = ({ alerts, removeAlert }) => {
  return (
    <div className="alertContainer">
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <Message key={alert.id} color={alert.alertType} className="alert">
            <Message.Header>
              <p>{alert.msg}</p>
              <i className="fas fa-times" onClick={() => removeAlert(alert.id)}></i>
            </Message.Header>
          </Message>
        ))}
    </div>
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, { removeAlert })(Alert);
