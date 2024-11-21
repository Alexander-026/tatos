export default interface ApiError {
    status: number;
    data: {
      message: string;
      [key: string]: any;
    };
  }