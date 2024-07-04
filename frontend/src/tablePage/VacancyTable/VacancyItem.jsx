import React from "react";
import { Th, Tr } from "@chakra-ui/react";
const VacancyItem = (props) => {
    const data = props.data;
    return (
        <Tr key={data.id} >
            <Th color={'black'} maxWidth={10}>{data.id}</Th>
            <Th maxWidth={100}><a href={data.url} target='_blank'>{data.url}</a></Th>
            <Th color={'black'}>{data.name}</Th>
            <Th color={'black'}>{data.area}</Th>
            <Th color={'black'}>{data.salary}</Th>
            <Th color={'black'}>{data.schedule}</Th>
            <Th color={'black'}>{data.experience}</Th>
            <Th color={'black'}>{data.employment}</Th>
            <Th color={'black'}>{data.type}</Th>
            <Th color={'black'}>{data.published_at.slice(0, 10)}</Th>
            <Th color={'black'}>{data.created_at.slice(0, 10)}</Th>
            <Th color={'black'}>{data.requirement}</Th>
            <Th color={'black'}>{data.responsibility}</Th>
        </Tr>
    );
};

export default React.memo(VacancyItem);
