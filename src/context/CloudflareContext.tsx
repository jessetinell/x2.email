import React, { useContext, useEffect, useState } from 'react';
import { CloudflareApiClient } from '@/services/cloudflare';
import { UserContext } from './UserContext';

type CloudflareContextType = {
    cloudflareApi: CloudflareApiClient | null;
};

export const CloudflareContext = React.createContext<CloudflareContextType>({
    cloudflareApi: null,
});


const CloudflareProvider = ({ children }: any) => {
    const [cloudflareApi, setClient] = useState<CloudflareApiClient | null>(null);

    const { accessToken } = useContext(UserContext);


    useEffect(() => {

        if (accessToken) {
            // Initialize the client
            const apiClient = new CloudflareApiClient(accessToken);

            // Set the client in the state
            setClient(apiClient);

        }
    }, [accessToken]);

    return (
        <CloudflareContext.Provider value={{
            cloudflareApi
        }}>
            {children}
        </CloudflareContext.Provider>
    );
};

export default CloudflareProvider;
