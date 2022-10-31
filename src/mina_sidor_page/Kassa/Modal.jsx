import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import style from "./BetalningStyle.module.css";


const Modal = ({ isShowing, hide, title, ...props }) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <div className={style.modaloverlay}>
            <div className={style.modalWrapper}>
              <div className="modal">
                  <button
                    type="button"
                    className={style.closeBtn}
                    onClick={hide}
                  >
                    <span>x</span>
                  </button>
            
                <div className="modal-body">{props.children}</div>
              </div>
            </div>
          </div>

          
        </>,
        document.body
      )
    : null;

Modal.propTypes = {
  isShowing: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default Modal;
