import React from 'react';

import './styles.css';


class Display extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tweetData: this.props.tweetData,
            radio: this.props.radio
        }
    }


    // getTest(userId) {
    //     this.props.getUserId(userId)
    // }


    render() {

        const values = [];
        let cutUser = this.state.tweetData.filter(e => {
            if (values.indexOf(e["user"]["id"]) === -1) {
                // values に値が存在しない要素のみをフィルタリング
                values.push(e["user"]["id"]);
                return e;
            }
        });

        return (
            <React.Fragment>
                {this.state.tweetData && (
                    this.state.radio === "content"
                        ? (this.state.tweetData.map((tweet, tweet_key) => {
                            return (
                                <div className="tweet-card" key={tweet_key}>
                                    <img className="tweet-icon" src={tweet.user.profile_image_url}></img>
                                    <p className="tweet-name">{tweet.user.name}</p>
                                    <p className="tweet-text">{tweet.text}</p>

                                </div>
                            )
                        })
                        )

                        // : (this.state.tweetData.map((tweet, tweet_key) => {
                        : (cutUser.map((tweet, tweet_key) => {
                            console.log(tweet,'tweet')
                            return (
                                <div onClick={() => this.props.clickSearchButton(tweet.user.id)} class="flex justify-center items-center h-auto m-8"  key={tweet_key}>
                                    <div class="max-w-sm rounded overflow-hidden shadow-lg">
                                        {/* <img class="w-full" src={tweet.user.profile_image_url} alt="Sunset in the mountains"></img> */}
                                        <img class="w-10 m-auto" src={tweet.user.profile_image_url} alt="Sunset in the mountains"></img>
                                        <div class="px-6 py-4">
                                            <div class="font-bold text-xl mb-2">{tweet.user.name}</div>
                                            <p class="text-gray-700 text-base">
                                                {tweet.user.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            )
                        })
                        )

                )
                }


            </React.Fragment>

        );
    }


}

export default Display;