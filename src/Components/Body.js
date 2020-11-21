import React, { Component } from "react"
import API from "../utils/API";
import Nav from "../Components/Nav"
import "../Styles/body.css";
class Body extends Component {
    state = {
        users: [{}],
        filteredUsers: [{}],
        sortOrder: "ascend"
    }
    headings = [
        { name: "Employee Name", width: "25%" },
        { name: "Employee Phone", width: "25%" },
        { name: "Employee Email", width: "25%" },
        { name: "Employee Nationality", width: "25%" }
    ]
    newSort = event => {
        if (this.state.order === "ascend") {
            this.setState({
                order: "descend"
            })
        }
        else {
            this.setState({
                order: "ascend"
            })
        }
        // sort logic goes here
        const compareFunction = (a, b) => {
            if (this.state.order === "ascend") {
                if (a[event] === undefined) {
                    return 1;
                } else if (b[event] === undefined) {
                    return -1;
                }
                else if (event === "Employee Phone") {
                    return a[event].localeCompare(b[event]);
                } else {
                    return a[event] - b[event];
                }
            } else {
                if (a[event] === undefined) {
                    return 1;
                } else if (b[event] === undefined) {
                    return -1;
                }
                else if (event === "Employee Phone") {
                    return b[event].localeCompare(a[event]);
                } else {
                    return b[event] - a[event];
                }
            }

        }
        const sortedPhone = this.state.filteredUsers.sort(compareFunction)
        this.setState({ filteredUsers: sortedPhone })
    }
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
                <div className="datatable mt-5">
                    <table id="table"
                        className="table table-striped table-bordered table-sm"
                    >
                        <thead>
                            <tr>
                                {this.headings.map(({ name, width }) => {
                                    return (
                                        <th
                                            className="col"
                                            key={name}
                                            style={{ width }}
                                            onClick={() => {
                                                this.newSort(name)
                                            }}


                                        >
                                            {name}
                                            <span className="pointer"></span>
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.filteredUsers[0] !== undefined && this.state.filteredUsers[0].name !== undefined ? (
                                this.state.filteredUsers.map(({ login, name, picture, phone, email, nat }) => {
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
                                            <td data-th="Nat" className="align-middle">
                                                {nat}
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
            </div>
        )
    }
}
export default Body