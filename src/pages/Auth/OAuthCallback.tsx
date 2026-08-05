import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/Authcontext';
import { apiFetch } from '../../lib/api';

export default function OAuthCallback() {
  const [params] = useSearchParams();
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get('token');
    if (!token) {
      navigate('/sign-up?error=oauth_failed');
      return;
    }
    (async () => {
      try {
        const { user } = await apiFetch<{ user: any }>('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAuth(token, user);
        navigate('/');
      } catch {
        navigate('/sign-up?error=oauth_failed');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-sm text-gray-400">
      Signing you in…
    </div>
  );
}