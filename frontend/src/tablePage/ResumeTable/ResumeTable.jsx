import React from "react";
import TableItem from "./TableItem";
import { TableContainer, Table, TableCaption, Tr, Th, Thead, Tbody } from "@chakra-ui/react";

const ResumeTable = (props) => {
    const SearchedResumes = props.data;
    return (
        <TableContainer whiteSpace={'prewrap'}>
            <Table variant="striped" colorScheme="pink">
                <TableCaption>Resume data</TableCaption>
                <Thead >
                <Tr>
                    <Th>id</Th>
                    <Th maxWidth={100}>link</Th>
                    <Th>name</Th>
                    <Th>experience</Th>
                    <Th>salary</Th>
                    <Th>education</Th>
                    <Th>languages</Th>
                    <Th>tags</Th>
                    <Th>about</Th>
                </Tr>
                </Thead>
                <Tbody> 
                {SearchedResumes.map((data, index) => (
                        <TableItem key={index} data={data}/>
                    ))}
                </Tbody>
            </Table>
            </TableContainer>
    );
}

export default React.memo(ResumeTable);
