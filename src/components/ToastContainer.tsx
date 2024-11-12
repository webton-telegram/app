import { useTheme } from 'next-themes';
import { Flip, ToastContainer as RTContainer } from 'react-toastify';

const ToastContainer = () => {
  const { resolvedTheme } = useTheme();

  return (
    <RTContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme={resolvedTheme}
      transition={Flip}
    />
  );
};

export default ToastContainer;
