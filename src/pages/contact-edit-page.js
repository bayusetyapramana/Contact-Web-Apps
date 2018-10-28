import React, { Component} from 'react';
import { Redirect } from 'react-router';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { newContact, saveContact, fetchContact, updateContact } from '../actions/contact-actions';
import ContactEdit from '../components/contact-edit';


class ContactFormPage extends Component {

  state = {
    redirect: false
  }

  componentDidMount = () => {
    const { _id } = this.props.match.params;
    if(_id){
      this.props.fetchContact(_id)
    } else {
      this.props.newContact();
    }
  }

  submit = (contact, id, message) => {
    this.setState = ({redirect:true})
    const { _id } = this.props.match.params;
      return this.props.updateContact(contact, _id)
        .catch(err => {
           throw new SubmissionError(this.props.errors)
         })
  }

  render() {
    const message = this.props;
    console.log('ini data contact', message);
    this.setState = ({redirect:true});
    return (
      <div>
        {
          this.state.redirect ?
          <Redirect to="/" /> :
          <ContactEdit  contact={this.props.contact} loading={this.props.loading} onSubmit={this.submit} />
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    contact: state.contactStore.contact,
    errors: state.contactStore.errors
  }
}

export default connect(mapStateToProps, {newContact, saveContact, fetchContact, updateContact})(ContactFormPage);
