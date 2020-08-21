import React from 'react';

import './styles.css';


class Display extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tweetData: this.props.tweetData,
            radio: this.props.radio
        }
        console.log(this.props.tweetData)
    }
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
                            return (
                                // <div className="tweet-card" key={tweet_key}>
                                //     <img className="tweet-icon" src={tweet.user.profile_image_url}></img>
                                //     <p className="tweet-name">{tweet.user.name}</p>
                                //     <p className="tweet-text">{tweet.user.description}</p>

                                // </div>
                                <div class="flex justify-center items-center h-screen"  key={tweet_key}>
                                    <div class="max-w-sm rounded overflow-hidden shadow-lg">
                                        {/* <img class="w-full" src={tweet.user.profile_image_url} alt="Sunset in the mountains"></img> */}
                                        <img class="w-2/3 mx-14" src={tweet.user.profile_image_url} alt="Sunset in the mountains"></img>
                                        <div class="px-6 py-4">
                                            <div class="font-bold text-xl mb-2">{tweet.user.name}</div>
                                            <p class="text-gray-700 text-base">
                                                {tweet.user.description}
                                            </p>
                                        </div>
                                        <div class="px-6 py-4">
                                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                                #photography
                                            </span>
                                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#travel</span>
                                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#winter</span>
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