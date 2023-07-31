"use client"
import { Box, Skeleton, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from "react";
import CustomAddress from './CustomAddress';
import { UserContext } from '@/context/UserContext';
import CloudflareService from '@/services/cloudflare';
import { ICustomAddress } from '@/types';

export default function CloudflareEmailRouterSettings() {

    const {
        accessToken,
        zoneId,
        isAuthenticated,
    } = useContext(UserContext);

    const [isFetchingCustomAddresses, setIsFetchingCustomAddresses] = useState(true);
    const [customAddresses, setCustomAddresses] = useState<ICustomAddress[]>([]);

    const fetchCloudflareAccountData = async () => {

        const rulesResponse = await CloudflareService.get(`/zones/${zoneId}/email/routing/rules`, accessToken)
        if (rulesResponse.status === 200) {
            // Map response
            const _customAddresses = rulesResponse.data.result.map((result: any) => {
                return CloudflareService.utils.mapResultToCustomAddress(result);
            })
                .filter((customAddress: any) => customAddress !== null)

            setCustomAddresses(_customAddresses);
        }

        setIsFetchingCustomAddresses(false);

    }

    useEffect(() => {

        if (isAuthenticated) {
            // Fetch initial account data
            fetchCloudflareAccountData();
        }

    }, [isAuthenticated]);

    const handleCustomAddressChange = (customAddress: ICustomAddress, action: string) => {
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
            <TableContainer>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Alias</Th>
                            <Th>Destination</Th>
                            <Th textAlign={'center'}>Enabled</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <CustomAddress
                            onChange={handleCustomAddressChange}
                        />
                        {customAddresses.map((customAddress: ICustomAddress, index) => (
                            <CustomAddress
                                key={customAddress.tag}
                                customAddress={customAddress}
                                onChange={handleCustomAddressChange}
                            />
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}
