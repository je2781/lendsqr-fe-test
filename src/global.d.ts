export interface Window {
    localeStorage: {
      getItem: (key: string) => void,
      setItem: (key: string, value: string) => void,
      remove: (key: string) => void
    }
  }
  
  
  