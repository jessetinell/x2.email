"use client"
import React, { useEffect, useState } from 'react';
import encryption from '@/utils/encryption';
import { CloudflareApiClient } from '@/services/cloudflare';
import { CloudflareListEmailDestinationsResponse } from '@/services/cloudflare/cloudflare.types';

const LOCAL_STORAGE_ACCOUNT_ID = "x2-email-cloudflare_account_identifier";
const LOCAL_STORAGE_ZONE_ID = "x2-email-cloudflare_zone_identifier";
const LOCAL_STORAGE_ACCESS_TOKEN = "x2-email-cloudflare_access_token";

export const UserContext = React.createContext({

  isAuthenticated: false,
  isLoading: false,

  accountId: "",
  zoneId: "",
  accessToken: "",

  destinationAddresses: [] as string[],
  domain: "",

  authorize: (accountId: string, zoneId: string, accessToken: string) => { },
  clearAllValues: () => { }

});

export function UserProvider({ children }: any) {

  const [accountId, setAccountId] = useState<string>("");
  const [zoneId, setZoneId] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");
  const [domain, setDomain] = useState<string>("");
  const [destinationAddresses, setDestinationAddresses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const fetchInitialData = async (accountId: string, zoneId: string, accessToken: string): Promise<boolean> => {

    setIsLoading(true);

    const apiClient = new CloudflareApiClient(accessToken);

    // Fetch the domain. This domain is used to create aliases.
    // const routingResponse = await CloudflareService.get(`/zones/${zoneId}/email/routing`, accessToken)
    const routingResponse = await apiClient.getEmailRouting(zoneId);

    if (routingResponse.success) {
      setDomain(routingResponse.result.name);
    }


    // Fetch the destination addresses. Emails will be forwarded to these addresses.
    const destinationAddressesResponse: CloudflareListEmailDestinationsResponse = await apiClient.getDestinations(accountId);

    if (routingResponse.success) {
      setDestinationAddresses(destinationAddressesResponse.result?.map((result: any) => result.email) || [])
    }

    setIsLoading(false);

    return routingResponse.success && destinationAddressesResponse.success;

  }

  useEffect(() => {

    async function checkIfAuthenticated() {

      // Get decrypted data from Local Storage on the client-side and set the state
      const decryptedAccountId = encryption.getItem(LOCAL_STORAGE_ACCOUNT_ID);
      const decryptedZoneId = encryption.getItem(LOCAL_STORAGE_ZONE_ID);
      const decryptedAccessToken = encryption.getItem(LOCAL_STORAGE_ACCESS_TOKEN);

      if (decryptedAccountId && decryptedZoneId && decryptedAccessToken) {

        fetchInitialData(decryptedAccountId, decryptedZoneId, decryptedAccessToken)

        setAccountId(decryptedAccountId || "");
        setZoneId(decryptedZoneId || "");
        setAccessToken(decryptedAccessToken || "");
        setIsAuthenticated(true);

      }
    }

    checkIfAuthenticated();

  }, []);

  return (
    <UserContext.Provider value={{

      isLoading,
      isAuthenticated,

      accountId,
      zoneId,
      accessToken,

      domain,
      destinationAddresses,

      authorize: async (accountId, zoneId, accessToken) => {

        // Fetch initial data
        const success = await fetchInitialData(accountId, zoneId, accessToken);

        if (success) {
          setAccountId(accountId);
          setZoneId(zoneId);
          setAccessToken(accessToken);
          setIsAuthenticated(true);

          // Save encrypted data to Local Storage on the client-side
          encryption.setItem(LOCAL_STORAGE_ACCOUNT_ID, accountId);
          encryption.setItem(LOCAL_STORAGE_ZONE_ID, zoneId);
          encryption.setItem(LOCAL_STORAGE_ACCESS_TOKEN, accessToken);
        }

      },
      clearAllValues: () => {
        setIsAuthenticated(false)
        setAccessToken("")
        setZoneId("")
        setAccountId("")
        setDomain("")
        setDestinationAddresses([])
      }

    }}>
      {children}
    </UserContext.Provider>
  )
}