interface IParams {
  method?: string;
}

export const customFetch = async (url: string, data: Record<string, unknown>, params?: IParams): Promise<Record<string, unknown>> => {
  const response = await fetch(url, {
    method: params && params.method || "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.status > 201) {
    const errMessage = await response.text();
    throw new Error(errMessage || "Произошла непредвиденная ошибка.");
  }
  const res = await response.json();
  return res;
};