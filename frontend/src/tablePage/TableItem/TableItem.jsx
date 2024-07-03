import React from "react";
import { Th, Tr } from "@chakra-ui/react";
const TableItem = (props) => {
    const data = props.data;
    return (
        <Tr key={data.id} >
            <Th color={'black'} maxWidth={10}>{data.id}</Th>
            <Th maxWidth={100}><a href={data.link} target='_blank'>{data.link}</a></Th>
            <Th color={'black'}>{data.name}</Th>
            <Th color={'black'}>{data.experience}</Th>
            <Th color={'black'}>{data.salary}</Th>
            <Th color={'black'}>{data.education}</Th>
            <Th color={'black'}>{data.languages}</Th>
            <Th color={'black'}>{data.tags}</Th>
            <Th color={'black'}>{data.about}</Th>
        </Tr>
    );
};

export default React.memo(TableItem);
