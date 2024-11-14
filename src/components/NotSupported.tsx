import { brand } from 'assets/images';

const NotSupported = () => (
  <div className="flex flex-col justify-center items-start gap-8 w-full max-w-[500px] h-screen mx-auto py-16 px-6 text-black dark:text-white">
    <h2 className="text-xl font-semibold">FAIL TO LOAD</h2>

    <section className="flex flex-col gap-3">
      <h3 className="text-default-800">Please check the following</h3>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-default-700">
          WebTON is only accessible through the Telegram Mini App.
          <br />
          Please ensure you are running it in the WebTON Bot.
        </p>
        <p className="text-sm text-default-700">
          Access may not be possible if the service is currently under
          maintenance. Please check the community announcements.
        </p>
      </div>
    </section>

    <div className="flex flex-col justify-center items-center gap-2 select-none w-full">
      <img src={brand} alt="WebTON" className="w-[90px]" />
    </div>
  </div>
);

export default NotSupported;
