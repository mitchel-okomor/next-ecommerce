import React from 'react';

function Toast({ msg, handleShow, bgColor }) {
  return (
    <div
      className={`toast show position-fixed text-light ${bgColor}`}
      style={{ top: '5px', right: '5px', zIndex: 9, minWidth: '280px' }}
      aria-live='assertive'
      aria-atomic='true'
      data-delay='10000'
    >
      <div className={`toast-header ${bgColor} text-light`}>
        <strong className='mr-auto text-white'>{msg.title}</strong>
        <button
          type='button'
          className='ml-2 mb-1 close text-white'
          data-dismiss='toast'
          style={{
            outline: 'none'
          }}
          onClick={handleShow}
        >
          &times;
        </button>
      </div>
      <div className='toast-body'>{msg.body}</div>
    </div>
  );
}

export default Toast;
