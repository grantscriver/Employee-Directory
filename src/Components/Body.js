import React, { Component } from "react"
import API from "../utils/API";
class Body extends Component {
    state = {
        users: [{}]
    }
    headings = [
        { name: "EmployeeName", width: "30%" },
        { name: "EmployeePhone", width: "30%" },
        { name: "EmployeeEmail", width: "30%" }
    ]
    componentDidMount() {
        API.searchUsers().then(results => {

            this.setState({
                users: results.data.results
            });
        });
    }
    render() {

        return (
            <div>
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
                        {this.state.users[0] !== undefined && this.state.users[0].name !== undefined ? (
                            this.state.users.map(({ login, name, picture, phone, email }) => {
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