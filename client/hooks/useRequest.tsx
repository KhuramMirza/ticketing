import axios from 'axios';
import { ReactNode, useState } from 'react';

interface RequestConfig {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  body?: Record<string, any>;
  onSuccess?: (response: any) => void;
}

export default ({ url, method, body, onSuccess }: RequestConfig) => {
  const [errors, setErrors] = useState<ReactNode | null>(null);
  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      if (onSuccess) {
        onSuccess(response.data);
        console.log(response);
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors(
          <div className="flex flex-col text-red-600 mt-2">
            <ul className="list-disc pl-5">
              {error.response?.data?.errors?.map((err: any, index: number) => (
                <li key={index}>{err.message}</li>
              ))}
            </ul>
          </div>,
        );

        throw error;
      }
    }
  };

  return { doRequest, errors };
};
