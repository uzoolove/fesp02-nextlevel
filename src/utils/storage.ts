export const setObject = (key: string, value: Record<string, any>) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const getObject = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || '{}');
};

export const setCurrentTimeStorage = (time: number) => {
  return localStorage.setItem('currentTime', String(time));
}

export const getCurrentTimeStorage = () => {
  return Number(localStorage.getItem('currentTime') || 0);
}

export const setCurrentIndexStorage = (index: number) => {
  return localStorage.setItem('currentIndex', String(index));
}

export const getCurrentIndexStorage = () => {
  return Number(localStorage.getItem('currentIndex') || 0);
}

export const setCurrentTimeDJStorage = (time: number) => {
  return localStorage.setItem('currentTimeDJ', String(time));
}

export const getCurrentTimeDJStorage = () => {
  return Number(localStorage.getItem('currentTimeDJ') || 0);
}

export const setCurrentIndexDJStorage = (index: number) => {
  return localStorage.setItem('currentIndexDJ', String(index));
}

export const getCurrentIndexDJStorage = () => {
  return Number(localStorage.getItem('currentIndexDJ') || 0);
}
