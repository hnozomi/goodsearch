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
  }

  async clickSearchButton() {
    this.getLoadingFalse()

    await this.getTwitterData()

    this.getLoadingTrue()

  }

  async getTwitterData() {
    // const URL = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=nozo03234869&count=1"
    const URL = "https://k7v16hvrjj.execute-api.ap-northeast-1.amazonaws.com/lambda_test"
    const token = "AAAAAAAAAAAAAAAAAAAAAKhcGwEAAAAAfzmCghSvLicEU5NdtwA%2FC39bzSo%3DbHjdNmI4AqnECh8bshmXrfFGRIshe3MLjga8NsatzdQvR1D7dc"
    const param = {
      searchWord: this.state.searchWord,
      searchRadio: this.state.radio
    }

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

  filterSearchWord(e) {
    const value = e.target.value;
    this.setState({
      searchWord: value,
    })
  }

  handleRadioButton(event) {
    this.setState({
      radio: event
    })
  }

  render() {
    console.log(this.state.tweetData)

    const test = (
      <div className="App">
        <header className="app-header">
          いいね検索
      </header>
        <div className="search-form-wrapper">
          <form className="search-form">
            <input value={this.state.searchWord} className="search-input input-area" onChange={e => this.filterSearchWord(e)} placeholder="検索"></input>
          </form>

            <label><input type="radio" onChange={() => this.handleRadioButton("content")} value="content" name="check" defaultChecked ></input>内容</label>
            <label><input type="radio" onChange={() => this.handleRadioButton("name")} value="name" name="check" ></input>名前</label>
            <label><input type="radio" onChange={() => this.handleRadioButton("date")} value="date" name="check"></input>日付</label>

          {/* <form class="w-5/6 max-w-sm container mx-auto">
            <div class="flex items-center border-b border-teal-500 py-2">
              <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="ここに入力" aria-label="Full name"></input>
              <button onClick={this.clickSearchButton} class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                検索
              </button>
            </div>
          </form> */}

        </div>

        <button onClick={this.clickSearchButton}>データ取得</button>

        {this.state.loading
          ? <Display
            tweetData={this.state.tweetData}
            radio={this.state.radio}

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