import { useEffect, useState } from 'react';
import { auth } from 'service/api/auth';
import useTelegramAuth from 'hooks/useTelegramAuth';
import { ResultAuthData } from 'types/auth';

const AuthUpdater = () => {
  const { telegramAuthData } = useTelegramAuth();

  // TODO: store to auth result
  const [, setResAuth] = useState<ResultAuthData>();

  useEffect(() => {
    let ignore = false;

    const autorize = async () => {
      if (
        telegramAuthData &&
        telegramAuthData.authDate &&
        telegramAuthData.user
      ) {
        const { id, firstName, lastName, username, photoUrl } =
          telegramAuthData.user;

        const res = await auth({
          id,
          first_name: firstName,
          last_name: lastName,
          username,
          photo_url: photoUrl || '',
          auth_date: Math.floor(telegramAuthData.authDate.getTime() / 1000),
          hash: telegramAuthData.hash,
        });

        if (!ignore) {
          setResAuth(res);
        }
      }
    };

    if (telegramAuthData) {
      autorize();
    }

    return () => {
      ignore = true;
    };
  }, [telegramAuthData]);

  return <div />;
};

export default AuthUpdater;
