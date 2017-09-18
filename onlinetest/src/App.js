import React, { Component } from 'react';
import './App.css';
import $ from "jquery";

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      username:"",
      allquestion:[],
      answers:[0,0,0],
      login:false,
      submitted:false,
      grade:0,
      footerheight:0
    };
    this.changeFooterHeight = this.changeFooterHeight.bind(this);
  }

  componentWillMount(){
    // change footer top height
    this.changeFooterHeight();
  }

  changeFooterHeight(){
    var height = document.documentElement.scrollHeight || document.body.scrollHeight;
    this.setState({footerheight : height});
  }

  findQuestion(){
    $.ajax({
      url:"http://localhost:3000/questionData.json",
      dataType:"json",
      success:function(data){
        this.setState({
          allquestion:this.state.allquestion.concat(data)   // get all questions
        });
        
        // change footer top height
        this.changeFooterHeight();
      }.bind(this),
      error:function(xhr, status, err){
        console.log(err);
        alert(err);
      }
    });
  }

  findData(username, password){
    $.ajax({
      url:"http://localhost:3000/userData.json",
      dataType:"json",
      success:function(data){
        for (var i = 0; i < data.length; i++){
          var tempuser = data[i];
          if (username === tempuser.username && password === tempuser.password){
            // load get data function first
            this.findQuestion();
            // setState
            this.setState({
              username:username,
              login:true  // already log in
            });
          }
        }
      }.bind(this),  // have to do this, otherwise you can't use setState()
      error:function(xhr, status, err){
        console.log(err);
        alert(err);
      }
    });
  }

  getGrade(){
    var grade = 0;
    $.ajax({
      url:"http://localhost:3000/answerData.json",
      dataType:"json",
      success:function(data){
        var useranswer = this.state.answers;
        for (var i = 0; i < useranswer.length; i++){
          if (useranswer[i] === data[0][""+(i+1)]){
            grade++;
          }
        }
        this.setState({    // change grade
          grade:grade
        });
      }.bind(this),
      error:function(xhr, status, err){
        console.log(err);
        alert(err);
      }
    });

  }

  handleFormSubmit(event){
    var username = this.refs.username.value + "";
    var password = this.refs.password.value + "";
    this.findData(username, password);
    
      
    if (this.state.username === ""){
      this.refs.password.value = "";
      event.preventDefault();
    }
  }

  handleAnswerSubmit(event){

    if (this.state.answers.indexOf(0) === -1){   // all questions have been selected
      // get grade first
      this.getGrade();
      // change the state
      this.setState({
        submitted:true
      });
    }else{
      alert("Please answer all questions");
    }

    event.preventDefault();
  }

  handleRadioChange(event){
    var temp = this.state.answers;
    var value =  event.target.value;
    switch (event.target.name){
      case "1":temp[0] = value;break;
      case "2":temp[1] = value;break;
      case "3":temp[2] = value;break;
    }
    this.setState({
      answers:temp
    });
  }

  render() {
    var showdiv = null;
    var questions = "";
    var height = this.state.footerheight;
    if (this.state.username === "" && this.state.login === false){
      showdiv = <form id="userform" onSubmit={this.handleFormSubmit.bind(this)}>
          <span className="spandiv">Welcome, Please Sign In</span><br />
          <input type="text" ref="username" placeholder="Enter your name" /><br />
          <input type="password" ref="password" placeholder="Password" /><br />
          <input type="submit" ref="submit" value="Submit" />
      </form>
    }else if (this.state.login === true && this.state.submitted === false){
      showdiv = <span className="spandiv">Hi, {this.state.username}! Please begin your test</span>
      questions = <div className="questiondiv">
        <form onSubmit={this.handleAnswerSubmit.bind(this)} >
          {this.state.allquestion.map((item) => {
            return (
              <div key={item.id}>
                <label key={item.id} >{item.title}</label><br />
                {item.items.map((sub)=>{
                  return (
                    <div key={sub}>
                      <input type="radio" name={item.id} value={sub} onChange={this.handleRadioChange.bind(this)} /><span>{sub}</span><br />
                    </div>
                  )
                })}
              </div>
            );
          })}
          <input type="submit" value="Get Grade" />
        </form>
      </div>
    }else if (this.state.login === true && this.state.submitted === true){
      // has submitted the question form
      showdiv = <span className="spandiv">
        Your answer has been submitted.<br />
        Your grade : {this.state.grade}
      </span>
      document.querySelector(".App-header").scrollIntoView();
    }
    return (
      <div className="App">
        <div className="App-header">
          Online Test
        </div>
        <div className="App-body">
          {showdiv}
          {questions}
        </div>
        <footer style={{ top:height }}></footer>
      </div>
    );
  }
}

export default App;
