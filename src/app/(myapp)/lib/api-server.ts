'use server';

export interface ErrorResponse extends Error {
  title: string;
  status: number;
  details: string;
  error: string
}

interface ExtendedRequestInit extends RequestInit {
  isTextResponse?: boolean;
}

export async function callApi<T>(endpoint: string, options: ExtendedRequestInit = {}): Promise<T> {
    console.log({ endpoint, options });
 

  const baseHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
     Accept: 'application/json',
    //Authorization: `Bearer ${session.accessToken}`,
    ...((options.headers as Record<string, string>) || {}),
  };

  // Remove Content-Type for FormData
  if (options.body instanceof FormData) {
    delete baseHeaders['Content-Type'];
  }

  const response = await fetch(endpoint, {
    ...options,
    headers: baseHeaders,
  });

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as ErrorResponse;
    console.log("erro",errorData)
    const errorMessage = `API Error (${errorData.title} ${errorData.status} ${errorData.error})`;
    throw new Error(errorData.details || errorMessage || errorData.error);
  }

  if (options.isTextResponse) {
    return (await response.text()) as unknown as T;
  }

  // Handle 204 No Content (delete operations) or empty responses
  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return {} as T;
  }

  return (await response.json()) as T;
}
