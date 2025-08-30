import httpClient from './httpClient';

export default {
  getUsers: (
    setData: (param: any[]) => any,
    setLoading: (param: boolean) => any,
  ) => {
    httpClient
      .request('GET /users', {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      })
      .then(resp => {
        setData(
          resp.data.map(item => {
            return {
              name: item.login,
              gitLink: item.url,
              avatarUrl: item.avatar_url,
            };
          }),
        );
        setLoading(false);
      })
      .catch(e => {
        console.log(e);

        setLoading(false);
      });
  },

  getUserByName: (
    name: string,
    setDetails: (param: any) => any,
    setLoading: (param: boolean) => any,
  ) => {
    httpClient
      .request(`GET /users/${name}`, {
        username: name,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      })
      .then(resp => {
        setDetails(resp.data);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  },
};
