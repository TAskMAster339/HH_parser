import React, { useEffect, useMemo, useRef, useState } from "react";
import classes from "./tablePage.module.css";
import { Button, Tabs, TabList, TabPanels, Tab, TabPanel,
    Input, Spinner, Select

} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import back from "../API/back";
import ResumeTable from "./ResumeTable/ResumeTable";
import VacancyTable from "./VacancyTable/VacancyTable";


const TablePage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [resumeData, setResumeData] = useState([]);
    const [searchedResumeData, setSearchedResumeData] = useState([]);

    const [vacancyData, setVacancyData] = useState([]);
    const [searchedVacancyData, setSearchedVacancyData] = useState([]);

    const [firstInputData, setFirstInputData] = useState({column: 'name', string: ""});
    const [secondInputData, setSecondInputData] = useState({column: 'name', string: ""});
    const inputRef = useRef(null);

    useEffect(() => {getResumes()}, []);
    useEffect(() => {getVacancy()}, [])
    async function getResumes(){
        try{
            setIsLoading(true);
            const data = await back.getAllResumes();
            setResumeData(data.result);
            setSearchedResumeData(data.result);
            setIsLoading(false);
        }catch(e){
            console.log(e)
        }
    }
    async function getVacancy(){
        try{
            setIsLoading(true);
            const data = await back.getAllVacancies();
            setVacancyData(data.result);
            setSearchedVacancyData(data.result);
            setIsLoading(false);
        }catch(e){
            console.log(e)
        }
    }
    let SearchedResumes = resumeData.map((elem) => elem);
    SearchedResumes = useMemo(() => { //очень не отптимизированно, аккуратно с большыми данными
        return SearchedResumes.filter(resume => {  
            return String((resume[firstInputData.column])).toLowerCase().includes(firstInputData.string.toLowerCase())}); 
    }, [firstInputData.string, SearchedResumes])
    let SearchedVacancies = vacancyData.map((elem) => elem);
    SearchedVacancies = useMemo(() => { //очень не отптимизированно, аккуратно с большыми данными
        return SearchedVacancies.filter(vacancy => {  
            return String((vacancy[secondInputData.column])).toLowerCase().includes(secondInputData.string.toLowerCase())}); 
    }, [secondInputData.string, SearchedVacancies])
    function updateResumeTable(){
        setIsLoading(true);
        setSearchedResumeData(SearchedResumes);
        setTimeout(() => setIsLoading(false), 500);
    }
    function updateVacancyTable(){
        setIsLoading(true);
        setSearchedVacancyData(SearchedVacancies);
        setTimeout(() => setIsLoading(false), 500);
    }
    return (
        <div>
            <Button 
            className={classes.goBtn}
            colorScheme='pink'
            variant='outline'
            position={'fixed'}
            onClick={() => {navigate("/")}}
            >Go to parsing page</Button>
            <h1 className={classes.h1}>Table page</h1>
            <Tabs size='lg' colorScheme='pink' isFitted variant='enclosed'>
                <TabList>
                    <Tab _selected={{ color: 'white', bg: 'pink.400' }}>Resume table</Tab>
                    <Tab _selected={{ color: 'white', bg: 'pink.400' }}>Vacancy table</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel paddingLeft={1} paddingRight={1}>
                        <div className={classes.inputclass}>
                            <Input
                            ref={inputRef}
                            placeholder='Search in ' 
                            focusBorderColor='pink.400'
                            value={firstInputData.string}
                            borderColor={'pink'} 
                            width={'100vw'}
                            display={'block'}
                            onChange={(e) => {e.preventDefault(); setFirstInputData({...firstInputData, string: inputRef.current.value})}}
                            />
                            <Select focusBorderColor='pink.400' width={'50vw'} colorScheme="pink"
                            value={firstInputData.column} onChange={(e) => {e.preventDefault(); setFirstInputData({...firstInputData, column: e.target.value})}}
                            >
                                <option value='id'>id</option>
                                <option value='link'>link</option>
                                <option value='name'>name</option>
                                <option value='experience'>experience</option>
                                <option value='salary'>salary</option>
                                <option value='education'>education</option>
                                <option value='languages'>languages</option>
                                <option value='tags'>tags</option>
                                <option value='about'>about</option>
                            </Select>
                            <Button 
                                colorScheme='pink'
                                variant='outline'
                                onClick={updateResumeTable}
                                >Submit</Button>
                        </div>
                    { (!isLoading) ?
                        <ResumeTable data={searchedResumeData}/>
                            :
                            <Spinner
                                thickness='4px'
                                speed='0.65s'
                                emptyColor='gray.200'
                                color='pink.500'
                                margin={'auto'}
                                display={"block"}
                                size='xl'/>
                        }
                    </TabPanel>

                    <TabPanel paddingLeft={1} paddingRight={1}>
                        <div className={classes.inputclass}>
                                <Input
                                placeholder='Search in ' 
                                focusBorderColor='pink.400'
                                value={secondInputData.string}
                                borderColor={'pink'} 
                                width={'100vw'}
                                display={'block'}
                                onChange={(e) => {e.preventDefault(); setSecondInputData({...secondInputData, string: e.target.value})}}
                                />
                                <Select focusBorderColor='pink.400' width={'50vw'} colorScheme="pink"
                                value={secondInputData.column} onChange={(e) => {e.preventDefault(); setSecondInputData({...secondInputData, column: e.target.value})}}
                                >
                                    <option value='id'>id</option>
                                    <option value='url'>url</option>
                                    <option value='name'>name</option>
                                    <option value='area'>area</option>
                                    <option value='salary'>salary</option>
                                    <option value='schedule'>schedule</option>
                                    <option value='experience'>experience</option>
                                    <option value='employment'>employment</option>
                                    <option value='type'>type</option>
                                    <option value='published_at'>published_at</option>
                                    <option value='created_at'>created_at</option>
                                    <option value='requirement'>requirement</option>
                                    <option value='responsibility'>responsibility</option>
                                </Select>
                                <Button 
                                    colorScheme='pink'
                                    variant='outline'
                                    onClick={updateVacancyTable}
                                    >Submit</Button>
                            </div>
                        { (!isLoading) ?
                            <VacancyTable data={searchedVacancyData}/>
                                :
                                <Spinner
                                    thickness='4px'
                                    speed='0.65s'
                                    emptyColor='gray.200'
                                    color='pink.500'
                                    margin={'auto'}
                                    display={"block"}
                                    size='xl'/>
                            }
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
};

export default TablePage;