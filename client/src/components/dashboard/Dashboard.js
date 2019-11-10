import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getAllEmployeesStatus,
  fetchStatusesToDisplay,
  updateStatus
} from '../../actions/profile';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import EmployeesTable from './EmployeesTable';

import CircularProgress from '@material-ui/core/CircularProgress';

class Dashboard extends Component {
  state = { currentStatus: '', searchTerm: '', statusFilterTerm: '' };
  componentDidMount() {
    this.props.fetchStatusesToDisplay();
    this.props.getAllEmployeesStatus();
  }

  // componentWillUnmount() {
  //   const values = {
  //     email: this.props.auth.email,
  //     name: this.props.auth.name,
  //     status: this.state.currentStatus
  //   };
  //   this.props.updateStatus(values);
  // }

  onSelectFieldChange(e) {
    const values = {
      email: this.props.auth.email,
      name: this.props.auth.name,
      status: e.target.value !== '' ? e.target.value : 'Working'
    };
    this.setState({ currentStatus: e.target.value });
    this.props.updateStatus(values);
  }

  renderFields() {
    let selectFlag =
      this.props.profile.statusData && this.props.profile.statusData.length > 0;

    return (
      <div>
        Update My Current Status
        <FormControl>
          <Select
            value={this.state.currentStatus}
            onChange={e => this.onSelectFieldChange(e)}
          >
            <MenuItem classes={{ root: 'empty-select' }} value='' />
            {selectFlag
              ? this.props.profile.statusData.map((value, index) => (
                  <MenuItem value={value} key={index}>
                    {value}
                  </MenuItem>
                ))
              : null}
          </Select>
        </FormControl>
        <div className='form-group'>
          <input
            placeholder='Search By Name...'
            name='Search'
            value={this.state.searchTerm}
            onChange={e => this.setState({ searchTerm: e.target.value })}
          />
        </div>
        <Select
          value={this.state.statusFilterTerm}
          onChange={e => this.setState({ statusFilterTerm: e.target.value })}
        >
          <MenuItem MenuItem classes={{ root: 'empty-select' }} value='' />
          {selectFlag
            ? this.props.profile.statusData.map((value, index) => (
                <MenuItem value={value} key={index}>
                  {value}
                </MenuItem>
              ))
            : null}
        </Select>
      </div>
    );
  }

  render() {
    console.log(this.state);
    let selectFlag =
      this.props.profile.statusData || this.props.profile.statusData.length > 0;
    if (!selectFlag || !this.props.profile.allUsers || !this.props.auth.name) {
      return <CircularProgress />;
    }
    return (
      <div>
        <h4>{`Hello ${this.props.auth.name}, You are ${this.props.auth.status} `}</h4>
        {this.renderFields()}
        <EmployeesTable
          employeesData={this.props.profile.allUsers}
          currentEmployeeMail={this.props.auth.email}
          searchTerm={
            this.state.searchTerm !== '' ? this.state.searchTerm : null
          }
          statusFilterTerm={
            this.state.statusFilterTerm !== ''
              ? this.state.statusFilterTerm
              : null
          }
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getAllEmployeesStatus, fetchStatusesToDisplay, updateStatus }
)(Dashboard);
