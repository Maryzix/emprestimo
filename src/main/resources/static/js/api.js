
const API_BASE_URL = '';

const API = {
    async request(endpoint, options = {}) {
        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        };

        try {
            const response = await fetch(
                `${API_BASE_URL}${endpoint}`,
                config
            );

            const contentType = response.headers.get('content-type') || '';

            let data = null;

            if (contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            if (!response.ok) {
                let message = 'Não foi possível realizar a operação.';

                if (typeof data === 'string' && data.trim()) {
                    message = data;
                } else if (data) {
                    message =
                        data.message ||
                        data.detail ||
                        data.title ||
                        data.error ||
                        message;
                }

                throw new Error(message);
            }

            return data;

        } catch (error) {
            console.error('Erro na comunicação com a API:', error);
            throw error;
        }
    },

    get(endpoint) {
        return this.request(endpoint, {
            method: 'GET'
        });
    },

    post(endpoint, body) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body)
        });
    },

    put(endpoint, body) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body)
        });
    },

    delete(endpoint) {
        return this.request(endpoint, {
            method: 'DELETE'
        });
    }
};
