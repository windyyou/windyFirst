import MESSAGES_ZH from '../constants/messages_zh';

const MESSAGES = {
  zh: MESSAGES_ZH,
};

export default function message(key, lang = 'zh') {
  const language = Object.keys(MESSAGES).indexOf(lang) > -1 ? lang : 'zh';
  return MESSAGES[language][key] || key;
}
