export async function api<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const res = await fetch(`http://localhost:4000/api${url}`, {
      headers: { "Content-Type": "application/json" },
      ...options
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    // Handle 204 No Content responses
    if (res.status === 204) {
      return undefined as T;
    }

    return res.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
