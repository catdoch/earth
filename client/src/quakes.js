import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import App from './App';
import SelectComponent from './utils/select-component';
import './quakes.css';

const GET_QUAKE = gql`
    query allQuakes($mag: Int!) {
        getQuakes(mag: $mag) {
            mag
            place
            coords
            time
        }
    }
`;

class Quakes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mag: 4
        };

        this.updateValue = this.updateValue.bind(this);
    }

    updateValue(e, refetch) {
        this.setState({
            mag: parseInt(e.target.value, 10)
        }, () => {
            refetch();
        });
    }

    render() {
        const { mag } = this.state;
        return (
            <Query query={GET_QUAKE} variables={{ mag }} fetchPolicy="cache-first">
                {({ loading, error, data, refetch }) => {
                    return (
                        <div>
                            {loading ? (
                                <h3 className="loading-sign">Loading...</h3>
                            ) : (
                                <div>
                                    <SelectComponent name="magnitude" className="mag-changer" onChange={(e) => this.updateValue(e, refetch)} value={mag}>
                                        <option label="Magnitude > 3" value="3" />
                                        <option label="Magnitude > 4" value="4" />
                                        <option label="Magnitude > 5" value="5" />
                                        <option label="Magnitude > 6" value="6" />
                                        <option label="Magnitude > 7" value="7" />
                                    </SelectComponent>
                                    <App data={data} mag={mag} />
                                </div>
                            )}
                            {error && <h3 className="loading-sign">Error! {error.message}</h3>}
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default Quakes;