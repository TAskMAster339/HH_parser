import React from "react";
import VacancyItem from "./VacancyItem";
import { TableContainer, Table, TableCaption, Tr, Th, Thead, Tbody } from "@chakra-ui/react";

const VacancyTable = (props) => {
    const SearchedVacancy = props.data;
    return (
        <TableContainer whiteSpace={'prewrap'}>
            <Table variant="striped" colorScheme="pink">
                <TableCaption>Vacancy data</TableCaption>
                <Thead >
                <Tr>
                    <Th>id</Th>
                    <Th maxWidth={100}>url</Th>
                    <Th>name</Th>
                    <Th>area</Th>
                    <Th>salary</Th>
                    <Th>schedule</Th>
                    <Th>experience</Th>
                    <Th>employment</Th>
                    <Th>type</Th>
                    <Th>published_at</Th>
                    <Th>created_at</Th>
                    <Th>requirement</Th>
                    <Th>responsibility</Th>
                </Tr>
                </Thead>
                <Tbody> 
                {SearchedVacancy.map((data, index) => (
                        <VacancyItem key={index} data={data}/>
                    ))}
                </Tbody>
            </Table>
            </TableContainer>
    );
}

export default React.memo(VacancyTable);
