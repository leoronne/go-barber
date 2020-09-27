import React from 'react';
import { toast } from 'react-toastify';
import { FaExclamationTriangle, FaCheck } from 'react-icons/fa';

const notify = (msg: string, type: string): void => {
  const content = (
    <div className="toast-card">
      {type === 'error' ? <FaExclamationTriangle color="#fff" size={18} /> : <FaCheck color="#fff" size={18} />}
      <p className="toast-message text--justify">{msg}</p>
    </div>
  );

  if (type === 'error') {
    toast.error(content, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  } else if (type === 'success') {
    toast.success(content, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  }
};

export default notify;
