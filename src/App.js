import './App.css';
import React from "react";
const quotes = require('./quotes.json').quotes


class RandomQuoteComponent extends React.Component{
    constructor() {
        super();
        this.state = {
            quotes: [],
            quote: "",
            url: ""
        }
        this.new_quote = this.new_quote.bind(this)

    }
    componentDidMount() {
        let quotes = this.fetch_quotes()

        this.setState({
            quotes
        })
        let quote = this.get_random_quote(quotes)
        this.setState({
            quote,
        })
        this.set_tweet_url(quote)

    }

    fetch_quotes(){
        return quotes
    }

    get_random_quote (quotes) {
        let idx = parseInt(Math.random() * quotes.length)
        return quotes[idx]

    }

    new_quote(e){
        e.preventDefault()
        let quote = this.get_random_quote(this.state.quotes)
        this.setState({
            quote
        })
        this.set_tweet_url(quote)
    }

    set_tweet_url(quote){
        let q = quote.quote;
        let author = quote.author;
        let text = encodeURI(`"${q}" ${author}`)
        let encoded = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${text}`;
        // https://twitter.com/intent/tweet?hashtags=quotes&amp;related=freecodecamp&amp;text=%22I%20have%20learned%20over%20the%20years%20that%20when%20one%E2%80%99s%20mind%20is%20made%20up%2C%20this%20diminishes%20fear.%22%20Rosa%20Parks
        this.setState({
            url: encoded
        })

    }

    render(){
        return (
            <div className="container">
                <div className="row justify-content-md-center">
                    <div id="quote-box" className="col-5 card">
                        <div className="card-body">
                            <p id="text">{this.state.quote.quote}</p>
                        </div>
                        <em id="author">-{this.state.quote.author}</em>
                        <div className="btn-group">
                            <a className="btn btn-primary" id="new-quote" onClick={this.new_quote} href="#">new quote</a>
                            <a className="btn btn-success" id="tweet-quote"  target="_blank"  href={this.state.url}>tweet quote</a>
                        </div>


                    </div>
                </div>

            </div>

        )
    }
}



export default RandomQuoteComponent;
