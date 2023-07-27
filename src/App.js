import React,{useEffect,useState} from 'react'
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import wordsToNumbers from 'words-to-numbers';
import {
  Typography
} from "@material-ui/core";

import logo from './images/logo.png';
import useStyles from './styles';
const alanKey ='c9e04475493cb1d4ed0fafeeecb740452e956eca572e1d8b807a3e2338fdd0dc/stage'
const App = () => {
  
  const [newsArticles,setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
 

  useEffect(()=>{
    alanBtn({
      key:alanKey,
      onCommand: ({command,articles,number})=>{
        if(command==='newsHeadlines')
        {
          setNewsArticles(articles);
          console.log(articles);
          setActiveArticle(-1);
        }
        else if(command === 'highlight')
        {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        }
        else if(command === 'open')
        {
          console.log(number)
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          console.log(parsedNumber, typeof parsedNumber)
          const parsedNum = parseInt(parsedNumber,10)
          console.log(parsedNum,typeof parsedNum)
          console.log(articles[parsedNum-1].url)
          
          window.open(articles[parsedNum-1].url,'_blank')
         
        }
      },
    })
  },[]);
const classes = useStyles();
  return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </div>
        ) : null}
        <img src={logo} className={classes.alanLogo} alt="logo" />
      </div>
      
      <NewsCards articles = {newsArticles} activeArticle={activeArticle}/>
    </div>
  )
}

export default App