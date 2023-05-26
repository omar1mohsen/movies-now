import { Alert, AlertTitle } from "@mui/material";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import MuiModal from "@mui/material/Modal";
import { Link } from "react-router-dom";


const Message = ({ message }) => {

  const [showMsg,setShowMsg]= useState(true)
  const handleClose = () => {
    setShowMsg(false);
  };

  return (
    <MuiModal
    open={showMsg}
    onClose={handleClose}
    >
      <>
    <div className="message">
      <Alert severity="info" >
        <AlertTitle className="flex items-center justify-between">
          Info
        <RxCross1 className="!h-4 !w-4  cursor-pointer space-y-2 " onClick={handleClose}/>
        </AlertTitle>
         {message} — <strong><Link  to='/login'>Login</Link></strong>
      </Alert>
    </div>
    </>
    </MuiModal>
  );
};

export default Message;
