import * as anchor from '@project-serum/anchor';
import { PublicKey } from "@solana/web3.js";
import styled from "styled-components";
import { useEffect, useState, useMemo } from "react"
import { useWallet } from "@solana/wallet-adapter-react";
import {
    WalletModalProvider,
    WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { TextField } from '@material-ui/core';
import { Table,
    Paper,
    Stack,
    SxProps,
    TableBody, 
    TableCell, 
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

interface Attribute{
    Value: String;
}
const attributes: Array<Attribute> = [];

const tableContainerSx = {}

type TableProps = {
    activeAcceptableAttributes: Array<String>;
    userAvailableAttributes: Array<Object>;
};

const boolUserHasAttribute = (attributeToCheck: String, userAvailableAttributes: Array<Object>) => {
    const result = userAvailableAttributes.filter((nft: Object) => {
        return nft.attributes.some((item: Object) => {
            return item.value === attributeToCheck;
        })
    })

    return result.length > 0;
}

const getTableRows = (activeAcceptableAttributes: Array<String>, userAvailableAttributes: Array<Object>) => {
    return activeAcceptableAttributes.map((attribute) => {
        return (
            <TableRow>
                <TableCell scope="header">
                    {attribute}
                </TableCell>
                <TableCell>
                    {boolUserHasAttribute(attribute, userAvailableAttributes) ? "✔" : "❌"}
                </TableCell>
            </TableRow>
        )
    })
}

export default function TutorialTable({ activeAcceptableAttributes, userAvailableAttributes }: TableProps){
    return (
        <TableContainer 
        component={Paper}
        sx={tableContainerSx}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell scope="header">
                            Attribute
                        </TableCell>
                        <TableCell>
                            Obtained
                        </TableCell>
                    </TableRow>
                    {getTableRows(activeAcceptableAttributes, userAvailableAttributes)}
                </TableHead>
            </Table>
        </TableContainer>
    );
}

