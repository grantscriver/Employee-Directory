import React, { Component } from "react"
import API from "../utils/API";
import Nav from "../Components/Nav"
class Body extends Component {
    state = {
        users: [{}],
        filteredUsers: [{}]
    }
    headings = [
        { name: "Employee Name", width: "30%" },
        { name: "Employee Phone", width: "30%" },
        { name: "Employee Email", width: "30%" }
    ]
    newSearch = event => {
        console.log(event.target.value);
        const filter = event.target.value;
        const filteredList = this.state.users.filter(item => {
            let values = Object.values(item)
                .join("")
                .toLowerCase();
            return values.indexOf(filter.toLowerCase()) !== -1;
        });
        this.setState({ filteredUsers: filteredList });
    }
    componentDidMount() {
        API.searchUsers().then(results => {

            this.setState({
                users: results.data.results,
                filteredUsers: results.data.results
            });
        });
    }
    render() {

        return (
            <div>
                <Nav newSearch={this.newSearch} />
                <table id="table">
                    <thead>
                        <tr>
                            {this.headings.map(({ name, width }) => {
                                return (
                                    <th
                                        className="col"
                                        key={name}
                                        style={{ width }}


                                    >
                                        {name}
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.filteredUsers[0] !== undefined && this.state.filteredUsers[0].name !== undefined ? (
                            this.state.filteredUsers.map(({ login, name, picture, phone, email }) => {
                                return (
                                    <tr key={login.uuid}>
                                        <td data-th="Name" className="name-cell align-middle">
                                            {name.first} {name.last}
                                        </td>
                                        <td data-th="Phone" className="align-middle">
                                            {phone}
                                        </td>
                                        <td data-th="Email" className="align-middle">
                                            <a href={"mailto:" + email} target="__blank">
                                                {email}
                                            </a>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                                <></>
                            )}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Body