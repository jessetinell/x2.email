"use client"
import { Box, Skeleton } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from "react";
import CustomAddressRow from './CustomAddressRow';
import { UserContext } from '@/context/UserContext';
import { CloudflareUtils } from '@/utils';
import { CustomAddress } from '@/types';
import { CloudflareContext } from '@/context/CloudflareContext';

export default function CloudflareEmailRouterSettings() {

    const {
        zoneId,
        isAuthenticated,
    } = useContext(UserContext);

    const { cloudflareApi } = useContext(CloudflareContext);

    const [isFetchingCustomAddresses, setIsFetchingCustomAddresses] = useState(true);
    const [customAddresses, setCustomAddresses] = useState<CustomAddress[]>([]);

    const fetchCloudflareAccountData = async () => {

        if (!cloudflareApi) return;

        const response = await cloudflareApi.getEmailRules(zoneId);

        const customAddresses = CloudflareUtils.mapEmailRulesResponseToCustomAddressList(response)

        setCustomAddresses(customAddresses);

        setIsFetchingCustomAddresses(false);

    }

    useEffect(() => {

        if (isAuthenticated && cloudflareApi) {
            // Fetch initial account data
            fetchCloudflareAccountData();
        }

    }, [isAuthenticated, cloudflareApi]);

    const handleCustomAddressChange = (customAddress: CustomAddress, action: string) => {
        if (action === "insert") {
            setCustomAddresses([customAddress, ...customAddresses])
        } else if (action === "update") {
            setCustomAddresses(customAddresses.map((ca, i) => (ca.tag === customAddress.tag ? customAddress : ca)));
        }
        else if (action === "delete") {
            setCustomAddresses(customAddresses.filter((ca, i) => ca.tag !== customAddress.tag));
        }
    }

    if (isFetchingCustomAddresses) {
        return <>
            <Skeleton w={'100%'} h={50} mb={2} />
            <Skeleton w={'100%'} h={50} mb={2} />
            <Skeleton w={'100%'} h={50} mb={2} />
        </>
    }

    return (

        <Box>
            <Box mb={6}>
                <CustomAddressRow
                    onChange={handleCustomAddressChange}
                    isCreateComponent={true}
                />
            </Box>

            {customAddresses.map((customAddress: CustomAddress, index) => (
                <CustomAddressRow
                    key={customAddress.tag}
                    customAddress={customAddress}
                    onChange={handleCustomAddressChange}
                />
            ))}
        </Box>
    )
}
