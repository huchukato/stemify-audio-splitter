interface UpdateInfo {
  upToDate: boolean;
  current: string;
  latest: string;
  releaseUrl?: string;
  downloadUrl?: string;
  notes?: string;
  error?: string;
}

interface Window {
  stemify?: {
    platform: string;
    backendUrl: string;
    onBackendStatus: (cb: (msg: string) => void) => void;
    checkUpdate: () => Promise<UpdateInfo>;
    openExternal: (url: string) => void;
  };
}
