import { useContext } from 'react';

import AuthContext from 'context/AuthContext';

export default function useSession() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useSession must be used within an AuthProvider');
  }
  return context;
}
