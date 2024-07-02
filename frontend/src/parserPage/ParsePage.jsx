import React, { useState } from "react";
import { Input, RadioGroup, Radio, Stack,
    Slider, SliderTrack, SliderFilledTrack, SliderThumb,
    Button, Select, NumberInput, NumberInputField,
    NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
    Checkbox
 } from '@chakra-ui/react';
import classes from "./parserPage.module.css";
import parser from "../API/parser";


const ParsePage = () => {
    const [text, setText] = useState("");
    const [target, setTarget] = useState('resume')
    const [startPage, setStartPage] = useState(0)
    const [endPage, setEndPage] = useState(5)
    const [parsingProcess, setParsingProcess] = useState(false)
    const [parsingResult, setParsingResult] = useState(false)
    const [vacancyData, setVacancyData] = useState({
        number_of_pages: 1, 
        per_page: 1, 
        salary: "1", 
        only_with_salary: false,
        date_from: "",
        date_to: "",
        text: text,
        search_field: "",
        experience: "",
        employment: "",
        schedule: "",
        currency: ""
    })

    async function parseResume(){
        console.log("parsing has been started")
        setParsingResult(false);
        const data = {
            text: text,
            start_page: startPage,
            end_page: endPage,
        }
        setParsingProcess(true);
        const res = await parser.parseResume(data);
        console.log(res, "succsess");
        if (res.code === 200){
            setParsingResult(true);
        }
        else if (res.code === 400){
            console.log("Some parsing error")
        }
        setParsingProcess(false);
    }
    async function parseVacancy(){
        console.log("parsing has been started")
        setParsingResult(false);
        setParsingProcess(true);
        if (vacancyData.salary == 0){
            setVacancyData({...vacancyData, salary: ""})
        }
        const res = await parser.parseVacancy(vacancyData);
        console.log(res, "succsess");
        if (res.code === 200){
            setParsingResult(true);
        }
        else if (res.code === 400){
            console.log("Some parsing error")
        }
        setParsingProcess(false);
    }
    async function parseTest(){
        console.log("parsing has been started")
        setParsingResult(false);
        setParsingProcess(true);
        const res = await parser.parseVacancy({
            text: "Python",
            per_page: 1,
            number_of_pages: 1,
            only_with_salary: true,
            salary: "100000"

        });
        console.log(res, "succsess");
        if (res.code === 200){
            setParsingResult(true);
        }
        else if (res.code === 400){
            console.log("Some parsing error")
        }
        setParsingProcess(false);
    }
    return (
        <div>
            <h1 className={classes.h1}>Parsing page</h1>
            <div className={classes.Input}>
                <Input
                placeholder='ParsingText' 
                value={text}
                onChange={(e) => {setText(e.target.value); setVacancyData({...vacancyData, text:e.target.value})}}
                focusBorderColor='pink.400'
                borderColor={'pink'} 
                width='300px'/>
                <RadioGroup onChange={setTarget} value={target} className={classes.Radio}>
                    <Stack direction='row'>
                        <Radio value='resume'>Parse resumes</Radio>
                        <Radio value='vacancy'>Parse vanacies</Radio>
                    </Stack>
                </RadioGroup>
                <div>
                    {
                        (target == 'resume') 
                            ? 
                                <div>
                                    <h2 className={classes.h2}>Choose the number of the first page and the number of the second</h2>
                                        <p>First page number</p>
                                        <Slider
                                            flex='1'
                                            focusThumbOnChange={false}
                                            value={startPage}
                                            onChange={(value) => {
                                                if (value >= endPage){
                                                    setEndPage((value+5 <= 100) ? (value+5) : value)
                                                }
                                                setStartPage(value)
                                            }}>
                                            <SliderTrack>
                                                <SliderFilledTrack />
                                            </SliderTrack>
                                            <SliderThumb fontSize='sm' boxSize='32px' children={startPage} />
                                        </Slider>
                                        <p>Second page number</p>
                                        <Slider
                                            flex='1'
                                            focusThumbOnChange={false}
                                            value={(endPage > startPage) ? endPage : startPage}
                                            onChange={(value) => {setEndPage((value > startPage) ? value : (startPage+1))}}>
                                            <SliderTrack>
                                                <SliderFilledTrack />
                                            </SliderTrack>
                                            <SliderThumb fontSize='sm' boxSize='32px' children={endPage} />
                                        </Slider>
                                        <p>Attention, for a large number of pages it will take a long time to parse</p>
                                        <Button 
                                            isLoading={parsingProcess}
                                            colorScheme='pink'
                                            variant='outline'
                                            className={classes.btn}
                                            onClick={parseResume}
                                        >
                                            Parse
                                        </Button>
                                        {
                                            (parsingResult) ?
                                            <p>
                                                Parsing completed
                                            </p>
                                            :
                                            <p></p>
                                        }
                                </div>
                            :
                                <div>
                                    <h2 className={classes.h2}>Choose vacancy parsing parameters</h2>
                                        <p>Choose the number of pages</p>
                                        <Slider
                                                flex='1'
                                                min={1}
                                                focusThumbOnChange={false}
                                                value={vacancyData.number_of_pages}
                                                onChange={(value) => {
                                                    setVacancyData({...vacancyData, number_of_pages:value})
                                                }}>
                                                <SliderTrack>
                                                    <SliderFilledTrack />
                                                </SliderTrack>
                                                <SliderThumb fontSize='sm' boxSize='32px' children={vacancyData.number_of_pages} />
                                        </Slider>
                                        <p>Choose the number of vacancies per page</p>
                                        <Slider
                                                flex='1'
                                                min={1}
                                                focusThumbOnChange={false}
                                                value={vacancyData.per_page}
                                                onChange={(value) => {
                                                    setVacancyData({...vacancyData, per_page:value})
                                                }}>
                                                <SliderTrack>
                                                    <SliderFilledTrack />
                                                </SliderTrack>
                                                <SliderThumb fontSize='sm' boxSize='32px' children={vacancyData.per_page} />
                                        </Slider>
                                        <p className={classes.attention}>Attention! For best parsing it is recommended that the number  |{vacancyData.per_page * vacancyData.number_of_pages}| be less than 2000</p>
                                        <div>
                                            <h3>Select search field</h3>
                                            <Select focusBorderColor='pink.400' value={vacancyData.search_field} onChange={(e) => {setVacancyData({...vacancyData, search_field: e.target.value})}}>
                                                <option value=''>---</option>
                                                <option value='name'>в названии вакансии</option>
                                                <option value='company_name'>в названии компании</option>
                                                <option value='description'>в описании вакансии</option>
                                            </Select>
                                        </div>
                                        <div>
                                            <h3>Select experience</h3>
                                            <Select focusBorderColor='pink.400' value={vacancyData.experience} onChange={(e) => {setVacancyData({...vacancyData, experience: e.target.value})}}>
                                                <option value=''>---</option>
                                                <option value='noExperience'>Нет опыта</option>
                                                <option value='between1And3'>От 1 года до 3 лет</option>
                                                <option value='between3And6'>От 3 до 6 лет</option>
                                                <option value='moreThan6'>Более 6 лет</option>
                                            </Select>
                                        </div>
                                        <div>
                                            <h3>Select employment</h3>
                                            <Select focusBorderColor='pink.400' value={vacancyData.employment} onChange={(e) => {setVacancyData({...vacancyData, employment: e.target.value})}}>
                                                <option value=''>---</option>
                                                <option value='full'>Полная занятость</option>
                                                <option value='part'>Частичная занятость</option>
                                                <option value='project'>Проектная работа</option>
                                                <option value='volunteer'>Волонтерство</option>
                                                <option value='probation'>Стажировка</option>
                                            </Select>
                                        </div>
                                        <div>
                                            <h3>Select schedule</h3>
                                            <Select focusBorderColor='pink.400' value={vacancyData.schedule} onChange={(e) => {setVacancyData({...vacancyData, schedule: e.target.value})}}>
                                                <option value=''>---</option>
                                                <option value='fullDay'>Полный день</option>
                                                <option value='shift'>Сменный график</option>
                                                <option value='flexible'>Гибкий график</option>
                                                <option value='remote'>Удаленная работа</option>
                                                <option value='flyInFlyOut'>Вахтовый метод</option>
                                            </Select>
                                        </div>
                                        <div>
                                            <h3>Select currency</h3>
                                            <Select focusBorderColor='pink.400' value={vacancyData.currency} onChange={(e) => {setVacancyData({...vacancyData, currency: e.target.value})}}>
                                                <option value=''>---</option>
                                                <option value='RUR'>₽ Рубли</option>
                                                <option value='EUR'>€ Евро</option>
                                                <option value='USD'>$ Доллары</option>
                                            </Select>
                                        </div>
                                        <div>
                                            <h3>Select salary</h3>
                                            <div className={classes.salary}>
                                                <NumberInput value={vacancyData.salary}
                                                allowMouseWheel
                                                 onChange={(value) => setVacancyData({...vacancyData, salary: value})} min={1} step={1000}>
                                                    <NumberInputField></NumberInputField>
                                                    <NumberInputStepper>
                                                        <NumberIncrementStepper />
                                                        <NumberDecrementStepper />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                                <Checkbox margin={5} spacing='1rem'
                                                iconColor='pink.400'
                                                borderColor='pink.400' 
                                                size='md' colorScheme='green'
                                                isChecked={vacancyData.only_with_salary}
                                                onChange={(e) => setVacancyData({...vacancyData, only_with_salary: e.target.checked})}
                                                >only with salary
                                                </Checkbox>
                                            </div>
                                        </div>
                                        <div>
                                            <h3>Select date</h3>
                                            <p>from</p>
                                            <Input placeholder='Select Date and Time' size='md' type='date' value={vacancyData.date_from}
                                            onChange={(e) => {setVacancyData({...vacancyData, date_from: e.target.value})}}
                                            />
                                            <p>to</p>
                                            <Input placeholder='Select Date and Time' size='md' type='date' value={vacancyData.date_to}
                                            onChange={(e) => {setVacancyData({...vacancyData, date_to: e.target.value})}}/>
                                        </div>
                                        <Button 
                                            isLoading={parsingProcess}
                                            colorScheme='pink'
                                            variant='outline'
                                            className={classes.btn}
                                            onClick={parseVacancy}
                                            marginBottom={"20px"}
                                        >
                                            Parse
                                        </Button>
                                        {
                                            (parsingResult) ?
                                            <p>
                                                Parsing completed
                                            </p>
                                            :
                                            <p></p>
                                        }
                                </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default ParsePage;