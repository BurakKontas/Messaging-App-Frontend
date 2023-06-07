export type Result = {
  data: any;
  error: boolean;
  code: number;
};

export const generateResult = (data: any, error: boolean, code: number): Result => {
  return {
    data,
    error,
    code,
  };
};
