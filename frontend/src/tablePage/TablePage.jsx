import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import classes from "./tablePage.module.css";
import { Button, Tabs, TabList, TabPanels, Tab, TabPanel,
    Input, Spinner, Select

} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import back from "../API/back";
import ResumeTable from "./TableItem/ResumeTable";


const TablePage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [resumeData, setResumeData] = useState([]);
    const [searchedResumeData, setSearchedResumeData] = useState([])
    const [inputData, setInputData] = useState({column: 'name', string: ""});
    const inputRef = useRef(null);

    useEffect(() => {getResumes()}, []);
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
    let SearchedResumes = resumeData.map((elem) => elem);
    SearchedResumes = useMemo(() => { //очень не отптимизированно, аккуратно с большыми данными
        return SearchedResumes.filter(resume => {  
            return String((resume[inputData.column])).toLowerCase().includes(inputData.string)}); 
    }, [inputData.string, SearchedResumes])
    function updateTable(){
        setIsLoading(true);
        setSearchedResumeData(SearchedResumes);
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
                            value={inputData.string}
                            borderColor={'pink'} 
                            width={'100vw'}
                            display={'block'}
                            onChange={(e) => {e.preventDefault(); setInputData({...inputData, string: inputRef.current.value})}}
                            />
                            <Select focusBorderColor='pink.400' width={'50vw'} colorScheme="pink"
                            value={inputData.column} onChange={(e) => {e.preventDefault(); setInputData({...inputData, column: e.target.value})}}
                            >
                                <option value='id'>id</option>
                                <option value='link'>link</option>
                                <option value='name'>name</option>
                                <option value='experience'>experience</option>
                                <option value='education'>education</option>
                                <option value='languages'>languages</option>
                                <option value='tags'>tags</option>
                                <option value='about'>about</option>
                            </Select>
                            <Button 
                                colorScheme='pink'
                                variant='outline'
                                onClick={updateTable}
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

                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
};

export default TablePage;