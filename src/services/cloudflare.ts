import { ICustomAddress } from '@/types';
import axios from 'axios';

const api = axios.create({
    baseURL: '/api/cloudflare',
    headers: {
        'Content-Type': 'application/json'
    },
    validateStatus: () => {
        return true;
    }
});

const CloudflareService = {

    utils: {
        mapResultToCustomAddress: (result: any): ICustomAddress | null => {
            const action = result.actions[0];
            if (action?.type === "forward") {

                const customAddress: ICustomAddress = {
                    tag: result.tag,
                    from: result.matchers[0]?.value,
                    to: action.value[0],
                    enabled: result.enabled
                }

                return customAddress;
            }
            return null;
        }
    },

    get: async (path: string, token: string) => {
        const response = await api.get(path, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return { status: response.status, data: response.data };
    },
    post: async (path: string, token: string, body: any) => {
        const response = await api.post(path, body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return { status: response.status, data: response.data };
    },
    put: async (path: string, token: string, body: any) => {
        const response = await api.put(path, body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return { status: response.status, data: response.data };
    },
    delete: async (path: string, token: string) => {
        const response = await api.delete(path, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return { status: response.status, data: response.data };
    },
};

export default CloudflareService;
