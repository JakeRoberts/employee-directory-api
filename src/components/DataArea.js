import React, { Component } from "react";

class DataArea extends Component {
    state = {
        employees: [],
        sortBy: null,
        filterBy: ""
    };
    componentDidMount () {
        fetch ("https://randomuser.me/api/?results=100")
        .then(res => res.json())
        .then(json => {
            const employees = json.results.map (emp => {
                return {
                    name: emp.name.last + ", " + emp.name.first,
                    city: emp.location.city,
                    img: emp.picture.thumbnail,
                    gender: emp.gender
                };
            });
            this.setState({employees});
        });
    }
    sortByName = () => {
        let employees = [...this.state.employees];
        //alphabatizes by name
        employees.sort((a,b) => a.name.localeCompare(b.name));
        this.setState({employees});
    }
    sortByCity = () => {
        let employees = [...this.state.employees];
        //alphabatizes by city
        employees.sort((a,b) => a.city.localeCompare(b.city));
        this.setState({employees});
    }
    filterByMale = () => {
        // issue with state? filtering properly
        let employees = [...this.state.employees];
        console.log("click");
        let filterEmployees = employees.filter(employee => employee.gender === "male")
        console.log(filterEmployees);
        this.setState({employees: filterEmployees});
        console.log(this.state);
    }

    filterByFemale = () => {

        let employees = [...this.state.employees];
        console.log("click");
        let filterEmployees = employees.filter(employee => employee.gender === "female")
        console.log(filterEmployees);
        this.setState({employees: filterEmployees});
        console.log(this.state);
    }

    filteredEmployees = () => {

    }
  render() {
    if (!this.state.employees.length) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <button onClick={this.sortByName}>Sort By Name</button>
            <button onClick={this.sortByCity}>Sort By City</button>
            <button onClick={this.filterByMale}>Filter by Male</button>
            <button onClick={this.filterByFemale}>Filter by Female</button>

            <table>
                <tr><th></th><th>Name:</th><th>City:</th><th>Gender:</th></tr>
                {this.state.employees.map(emp => (
                    <tr>
                        <td><img src={emp.img} alt={emp.name} /></td>
                        <td>{emp.name}</td>
                        <td>{emp.city}</td>
                        <td>{emp.gender}</td>
                    </tr>
                ))}
            </table>
        </div>
    )
  }
}
export default DataArea;