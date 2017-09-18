# onlinetest/Reactjs


This small project is developed for school online test by using JQuery and Reactjs.

It's easy to code and easy to use. Ok, please download the files.

First you should have npm. If not, you can download [node.js](https://nodejs.org/en/), and you will have the npm.
Ok, next step you should use "cd"(in Windows) to get to the folder, then input "npm start" like below:


![image](https://github.com/liyulinnyu/Myimg/blob/master/2017_918_1.png)


(1)
-----
Without any question, you will see the main page of this project in your browser.


![image](https://github.com/liyulinnyu/Myimg/blob/master/2017_918_3.png)


In the login page, I use Ajax of JQuery to get the data from "userData.json" file. So you should input the right name
and password to login. I will show your all the files below, you can also search the content of "userData.json" in your
downloaded folder.


![image](https://github.com/liyulinnyu/Myimg/blob/master/2017_918_2.png)


(2)
-----
If you have logined in, you can see the main page which contains several questions, and I also use Ajax to get the data
from "questionData.json".



![image](https://github.com/liyulinnyu/Myimg/blob/master/2017_918_4.png)
![image](https://github.com/liyulinnyu/Myimg/blob/master/2017_918_6.png)


(3)
-----
After finished all questions, you can click submit button.
And the program will use "getGrade()" function to check every answer whether it is right or not. And finially it will 
compute a grade for you. The answer data is in the "answerData.json".


![image](https://github.com/liyulinnyu/Myimg/blob/master/2017_918_5.png)


All files you may use
------
? App.js: The main page contains most Reactjs codes
? App.css: Style layout
? questionData: Contains question
? userData: Users information
? answerData: All answers for questions

The project is easy to extend and to give an online test to student.

