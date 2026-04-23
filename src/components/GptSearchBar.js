import openai from "../utils/openai";
import { useRef } from "react";
import { useSelector } from "react-redux";
import  lang from "../utils/languageConstants";



const GptSearchBar = () => {
  const langKey = useSelector((store)=> store.config.lang);
  const searchText = useRef(null);

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);
    //MAKE an api call to gpt api to get movie results

    const gptQuery= "Act as a Movie Reccomendation System and suggest some movie for the query : " 
    + searchText.current.value +
     " only give me names of 5 movies , comma separated. like the example result given ahead Example Result: Gadar , Sholley , Don , Jab We Met , Golmaal";

     const gptResults = await openai.chat.completions.create({

  model: 'gpt-3.5-turbo',
  messages: [
    
    { role: 'user', content: gptQuery },
  ],
});

console.log(gptResults.choices[0].message.content);

};

  return (
    <div className="pt-[10%] flex justify-center">
        <form 
          className=" w-1/2 bg-black grid grid-cols-12" 
          onSubmit= {(e) => e.preventDefault()}
          >
            <input 
            ref = {searchText} 
            className="p-4 m-4 col-span-9 " 
            placeholder={lang[langKey].gptSearchPlaceholder}

            />

            <button className =" col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
              onClick = {handleGptSearchClick}>
              {lang[langKey].search}</button>

        </form>
      
    </div>
  )
}

export default GptSearchBar
