import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import authAxios from '@/utils/authAxios';
import hasRouteAccess from '@/utils/hasRouteAccess';

const NavbarContext = createContext({
  espacos: [],
  profile: null,
  isNavbarLoading: false,
  isSpacesCollapsed: false,
  setIsSpacesCollapsed: () => {},
  refreshEspacos: async () => {},
  refreshProfile: async () => {},
  refreshNavbarData: async () => {},
});

export const NavbarProvider = ({ children }) => {
  const [espacos, setEspacos] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loadingCount, setLoadingCount] = useState(0);
  const [isSpacesCollapsed, setIsSpacesCollapsed] = useState(false);
  const isNavbarLoading = loadingCount > 0;

  const runWithNavbarLoading = useCallback(async (callback) => {
    try {
      setLoadingCount((prev) => prev + 1);
      return await callback();
    } finally {
      setLoadingCount((prev) => Math.max(0, prev - 1));
    }
  }, []);

  const refreshEspacos = useCallback(async () => {
    return runWithNavbarLoading(async () => {
      if (!hasRouteAccess('/espacos')) {
        setEspacos([]);
        return [];
      }

      try {
        const res = await authAxios('get', '/api/espacos/listarEspacos');
        const responseData = res?.data?.data ?? res?.data ?? [];
        const list = Array.isArray(responseData) ? responseData : responseData?.data;
        const nextEspacos = Array.isArray(list) ? list : [];

        setEspacos(nextEspacos);
        return nextEspacos;
      } catch (error) {
        console.log(error?.response || error);
        setEspacos([]);
        return [];
      }
    });
  }, [runWithNavbarLoading]);

  const refreshProfile = useCallback(async () => {
    return runWithNavbarLoading(async () => {
      if (!hasRouteAccess('/usuarios/perfil')) {
        setProfile(null);
        return null;
      }

      try {
        const res = await authAxios('get', '/api/usuarios/perfil');
        const nextProfile = res?.data?.data ?? null;

        setProfile(nextProfile);
        return nextProfile;
      } catch (error) {
        console.log(error?.response || error);
        setProfile(null);
        return null;
      }
    });
  }, [runWithNavbarLoading]);

  const refreshNavbarData = useCallback(async () => {
    await Promise.all([
      refreshEspacos(),
      refreshProfile(),
    ]);
  }, [refreshEspacos, refreshProfile]);

  useEffect(() => {
    refreshNavbarData();
  }, [refreshNavbarData]);

  useEffect(() => {
    const handleProfileChange = () => {
      refreshProfile();
    };

    window.addEventListener('kanban-profile-change', handleProfileChange);

    return () => {
      window.removeEventListener('kanban-profile-change', handleProfileChange);
    };
  }, [refreshProfile]);

  const value = useMemo(() => ({
    espacos,
    profile,
    isNavbarLoading,
    isSpacesCollapsed,
    setIsSpacesCollapsed,
    refreshEspacos,
    refreshProfile,
    refreshNavbarData,
  }), [
    espacos,
    profile,
    isNavbarLoading,
    isSpacesCollapsed,
    refreshEspacos,
    refreshProfile,
    refreshNavbarData,
  ]);

  return (
    <NavbarContext.Provider value={value}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => useContext(NavbarContext);
