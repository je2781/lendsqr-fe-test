interface Window {
    checkout: (callback: (response: any) => Promise<void>, path: string) => void;
    localeStorage: {
      getItem: (key: string) => void,
      setItem: (key: string, value: string) => void,
      remove: (key: string) => void
    }
  }
  
  
  