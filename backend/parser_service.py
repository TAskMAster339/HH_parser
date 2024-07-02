import requests 
from bs4 import BeautifulSoup 
import fake_useragent 
import json
import time

def get_links(text: str, start_page: int = 0, end_page: int = 5):
    """Getting a link to resume from hh.ru"""
    ua = fake_useragent.UserAgent()
    data = requests.get(
        url=f'https://hh.ru/search/resume?text={text}&area=1&isDefaultArea=true&ored_clusters=true&order_by=relevance&search_period=0&logic=normal&pos=full_text&exp_period=all_time&page=1', 
        headers={"user-agent": ua.random}
    )

    if data.status_code != 200:
        return
    soup = BeautifulSoup(data.content, 'lxml')
    try:
        max_page = int(soup.find("div", attrs={"class": "pager"}).find_all("span", recursive=False)[-1].find("a").find("span").text)
        if ((end_page - start_page) > 0 and ((end_page - start_page) < max_page)):
            for page in range(start_page, end_page, 1): 
                try:
                    data = requests.get(
                        url=f'https://hh.ru/search/resume?text={text}&area=1&isDefaultArea=true&ored_clusters=true&order_by=relevance&search_period=0&logic=normal&pos=full_text&exp_period=all_time&page={page}',
                        headers={"user-agent": ua.random}
                    )
                    if data.status_code != 200:
                        continue

                    soup = BeautifulSoup(data.content, "lxml")
                    links = soup.find_all("a", attrs={"class": "bloko-link"})

                    for a in links:
                        if (len(a["class"]) == 1 and len(a.attrs['href'].split('?')[0]) > 20):  
                            yield f'https://hh.ru{a.attrs['href'].split('?')[0]}'

                except Exception as e:
                    print(f"{e}") 
    except:
        return
    
    

def get_resume(link: str) -> dict | None:
    """ Getting resume data from link
        Packs result data in JSON
    """
    ua = fake_useragent.UserAgent()
    data = requests.get(
        url=link,
        headers={"user-agent": ua.random}
    )

    if data.status_code != 200:
        return
    
    soup = BeautifulSoup(data.content, "lxml")

    try:
        name = soup.find(attrs={"class": "resume-block__title-text"}).text
    except:
        name = ""
    try:
        salary = soup.find(attrs={"class": "resume-block__salary"}).text.replace("\u2009", "").replace("\xa0", " ")
    except:
        salary = "undefined"
    try:
        tags = [tag.text for tag in soup.find(attrs={"class": "bloko-tag-list"}).find_all(attrs={"class": "bloko-tag__section_text"})]
    except:
        tags = []
    try:
        education = soup.find(attrs={"data-qa": "resume-block-education-name"}).text + " " +soup.find(attrs={"data-qa": "resume-block-education-organization"}).text
    except:
        education = "undefined"
    try:
        experience = soup.find(attrs={"data-qa": "resume-block-experience"}).find(attrs={"class": "resume-block__title-text resume-block__title-text_sub"}).text.replace("\xa0", " ")
    except:
        experience = "undefined"
    try:
        languages = [language.text for language in soup.find(attrs={"data-qa": "resume-block-languages"}).find_all(attrs={"class": "bloko-tag__section_text"})]
    except:
        languages = []
    try:
        about = soup.find(attrs={"data-qa": "resume-block-skills"}).find(attrs={"data-qa": "resume-block-skills-content"}).text.replace("\n", " ")
    except:
        about = "undefined"

    resume = {
        "name": name,
        "salary": salary,
        "tags": tags,
        "education": education,
        "experience": experience,
        "languages": languages,
        "about": about,
        "link": link
    }
    return resume

def parse_all_resumes(name:str, number: int = 0) -> list[dict]:
    """ Parsing all resumes from n pages
        by name
    """
    result = []
    for link in get_links(name, number):
        result.append(get_resume(link))
    return result

def parse_all_vacancies(query_params: dict = {}) -> list[dict]:
    """ Parsing all vacancies
        using query params from https://api.hh.ru/vacancies
    """
    url = "https://api.hh.ru/vacancies?"
    if (query_params): #adding query_params to url
        first_flag: bool = True
        for key in query_params:
            if query_params[key] == None or query_params[key] == "":
                continue
            if (first_flag):
                first_flag = False
            else:
                url+='&'
            url += f'{key}={query_params[key]}'
    req = requests.get(
        url=url,
    )
    if req.status_code != 200:
        raise Exception("Some request error")
    data = json.loads(req.text) #bytes -> UTF-8
    return data