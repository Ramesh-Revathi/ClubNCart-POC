const StorageService = {
    lStorage: {
      clearAll: (): void => {
        localStorage.clear();
      },
      setTokenCsrf: (token: string): void => {
        localStorage.setItem('njvfnbf', token);
      },
      getTokenCsrf: (): string | null => {
        return localStorage.getItem('njvfnbf');
      }
    },
    sStorage: {}
  };
  
  export default StorageService;
  