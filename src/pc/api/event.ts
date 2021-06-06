import { apiCreator } from './index';

const http = {
  login: () => {
    const url = 'login';
    return apiCreator().post(url);
  },
}

export default {...http}
