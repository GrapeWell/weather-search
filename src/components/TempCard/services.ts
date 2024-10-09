import { load } from 'jinrishici-ts';
export const getSentence = async (cb) => {
  const result = await load();
  cb(result.data.content);
};
