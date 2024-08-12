export const setObject = (key: string, value: Record<string, any>) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const getObject = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || '{}');
};

export const setCurrentTimeStorage = (id: string, time: number) => {
  const post = getObject(id);
  post.currentTime = time;
  return setObject(id, post);
}

export const getCurrentTimeStorage = (id: string) => {
  const post = getObject(id);
  return post.currentTime || 0;
}

export const setCurrentIndexStorage = (id: string, index: number) => {
  const post = getObject(id);
  post.currentIndex = index;
  return setObject(id, post);
}

export const getCurrentIndexStorage = (id: string) => {
  const post = getObject(id);
  return post.currentIndex || 0;
}

export const setCurrentTimeDJStorage = (id: string, time: number) => {
  const post = getObject(id);
  post.currentTimeDJ = time;
  return setObject(id, post);
}

export const getCurrentTimeDJStorage = (id: string) => {
  const post = getObject(id);
  return post.currentTimeDJ || 0;
}

export const setCurrentIndexDJStorage = (id: string, index: number) => {
  const post = getObject(id);
  post.currentIndexDJ = index;
  return setObject(id, post);
}

export const getCurrentIndexDJStorage = (id: string) => {
  const post = getObject(id);
  return post.currentIndexDJ || 0;
}
