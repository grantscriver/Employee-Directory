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
    render() {

        return (
            <div>
                <table id="table">
                    <thead>
                        <tr>
                            {this.headings.map(({ name, width }) => {
                                return (
                                    <th
                                    // className="col"
                                    // key={name}
                                    // style={{ width }}


                                    >
                                        {name}
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {/* {this.state.users[0] !== undefined && this.state.users[0].name !== undefined ? (
                            this.state.users.map(({ login, name, phone, email }))
                        )
                        } */}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Body