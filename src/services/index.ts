export const cachingFetch = async (url: string) => {
    const cachedData = localStorage.getItem(url);
  
    if (cachedData && ((Date.now() - JSON.parse(cachedData).time) < 3600000)) {
      return Promise.resolve(JSON.parse(cachedData).data);
    } else {
      const response = await fetch(url).then(res => res.json());
  
      localStorage.setItem(url, JSON.stringify({
        data: response,
        time: Date.now(),
      }));
      
      return response;
    }
  }