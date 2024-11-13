import { cssTransition, ToastContainer as RTContainer } from 'react-toastify';

const Fade = cssTransition({
  collapseDuration: 500,
  enter: 'toast-fade-in',
  exit: 'toast-fade-out',
});

const ToastContainer = () => {
  return (
    <RTContainer
      position="bottom-center"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme="light"
      transition={Fade}
    />
  );
};

export default ToastContainer;
