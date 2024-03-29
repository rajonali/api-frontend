import React, {Component} from 'react'
import Router from 'next/router'
import AuthService from './AuthService'

export default function withAuth(AuthComponent) {
    const Auth = new AuthService()
    return class Authenticated extends Component {

      static async getInitialProps(ctx) {
        // Ensures material-ui renders the correct css prefixes server-side
        let userAgent
        if (typeof window === 'undefined') {
          userAgent = navigator.userAgent
        } else {
          userAgent = ctx.req.headers['user-agent']
        }

        // Check if Page has a `getInitialProps`; if so, call it.
        const pageProps = AuthComponent.getInitialProps && await AuthComponent.getInitialProps(ctx);
        // Return props.
        return { ...pageProps, userAgent }
      }

      constructor(props) {
        super(props)
        this.state = {
          isLoading: true
        };
      }

      async componentDidMount () {

        const myReq = await fetch('/api/authToken', {
          method: "post",
          headers : {
            "Content-Type": "application/json"
          },
          body: ''
        })
        if (myReq.status == 500) {
          Router.push('/login')
        }
        this.setState({ isLoading: false })
      }

      render() {
        return (
          <div>
          {this.state.isLoading ? (
              <div>LOADING....</div>
            ) : (
              <AuthComponent {...this.props}  auth={Auth} />
            )}
          </div>
        )
      }
    }
}