import React from 'react';

const RestContest = React.createContext();

export const { Provider } = RestContest;

export function withHttpClient(Component) {
    return function wrappedComponend(props) {
        return (
            <RestContest.Consumer>
                { (httpClient) => (
                    <Component {...props} httpClient={httpClient} />
                )}
            </RestContest.Consumer>
        );
    };
}
