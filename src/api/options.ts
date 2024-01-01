export interface IOptions {
  front: {
    path: string,
    port: number,
  },
  back: {
    path: string,
    port: number,
  }

}

const options = {
  front: {
    path: 'localhost',
    port: 3000,
  },
  back: {
    // path: 'localhost',
    path: 'calendarplaner.cloud',
    port: 8001,
  }
};

export default options;