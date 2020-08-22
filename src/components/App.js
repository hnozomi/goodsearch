import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Display from './Display';

const axios = require('axios').default;




class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tweetData: [],
      searchWord: '',
      radio: 'content'
    }
    this.getTwitterData = this.getTwitterData.bind(this)
    this.clickSearchButton = this.clickSearchButton.bind(this)
    // this.getUserId = this.getUserId(this)
  }

  async clickSearchButton(userID) {
    console.log(userID, '検索開始')



    if (isNaN(userID)) {
      var param = {
        searchWord: this.state.searchWord,
        searchRadio: this.state.radio
      }
    } else {
      var param = {
        userID: userID,
        searchRadio: 'account'
      }
    }

    this.getLoadingFalse()

    await this.getTwitterData(param)

    this.getLoadingTrue()

  }

  async getTwitterData(param) {
    // const URL = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=nozo03234869&count=1"
    const URL = "https://k7v16hvrjj.execute-api.ap-northeast-1.amazonaws.com/lambda_test"
    const token = "AAAAAAAAAAAAAAAAAAAAAKhcGwEAAAAAfzmCghSvLicEU5NdtwA%2FC39bzSo%3DbHjdNmI4AqnECh8bshmXrfFGRIshe3MLjga8NsatzdQvR1D7dc"
    // const param = {
    //   searchWord: this.state.searchWord,
    //   searchRadio: this.state.radio
    // }

    await axios.get(URL, { params: param }).then(response => {
      console.log(response.config.params.searchRadio)
      const tweetImages = response.data.entities
      this.setState({
        tweetData: response.data,
        // tweetImages: response.data.entities
      })
    }
    )
      .catch(err => {
        console.log(err)
      }
      )
  }

  // ****************************************************************///
  // TwitterAPIから返答がくるのを待つ
  // ****************************************************************///

  getLoadingFalse() {
    this.setState({
      loading: false
    })
  }

  getLoadingTrue() {
    this.setState({
      loading: true
    })
  }

  // ****************************************************************///
  // 検索文字
  // ****************************************************************///

  filterSearchWord(e) {
    const value = e.target.value;
    this.setState({
      searchWord: value,
    })
  }

  // ****************************************************************///
  // 選択されるラジオボタンを取得
  // ****************************************************************///

  handleRadioButton(event) {
    this.setState({
      radio: event
    })
  }



  getUserId(userId) {
    console.log(userId, this.state)
  }




  render() {
    console.log(this.state.tweetData)

    const test = (
      <div className="App">
        <header className="app-header">
          いいね検索
      </header>
        <div className="search-form-wrapper">
          {/* <form className="search-form">
            <input value={this.state.searchWord} className="search-input input-area" onChange={e => this.filterSearchWord(e)} placeholder="検索"></input>
          </form> */}

          <div class="mt-4">
            <span class="text-gray-700">検索方法</span>
            <div class="mt-2">
              <label class="inline-flex items-center">
                <input type="radio" class="form-radio" name="check" value="content" onChange={() => this.handleRadioButton("content")} defaultChecked></input>
                <span class="ml-2">本文</span>
              </label>
              <label class="inline-flex items-center ml-6">
                <input type="radio" class="form-radio" name="check" value="name" onChange={() => this.handleRadioButton("name")}></input>
                <span class="ml-2">アカウント</span>
              </label>
            </div>
          </div>

          {/* <label><input type="radio" onChange={() => this.handleRadioButton("content")} value="content" name="check" defaultChecked ></input>内容</label>
          <label><input type="radio" onChange={() => this.handleRadioButton("name")} value="name" name="check" ></input>名前</label>
          <label><input type="radio" onChange={() => this.handleRadioButton("date")} value="date" name="check"></input>日付</label> */}

          <form class="w-5/6 max-w-sm container mx-auto">
            <div class="flex items-center border-b border-teal-500 py-2">
              <input value={this.state.searchWord} className="search-input input-area" onChange={e => this.filterSearchWord(e)} class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="ここに入力" aria-label="Full name"></input>
              <button onClick={this.clickSearchButton} class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                検索
              </button>
            </div>
          </form>

        </div>

        {/* <button onClick={this.clickSearchButton}>データ取得</button> */}

        {this.state.loading
          ? <Display
            tweetData={this.state.tweetData}
            radio={this.state.radio}
            clickSearchButton={this.clickSearchButton}

          />
          : <p>LOADING・・・</p>
        }

      </div>
    )

    return (
      <div>
        {test}
      </div>
    );
  }


}

export default App;